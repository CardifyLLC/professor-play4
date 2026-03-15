'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { ImagePlus, List, FileCode, Crop, Copy, ArrowRight, Scissors, RotateCcw, CheckCircle, AlertTriangle, X, Megaphone, ExternalLink, Info, ChevronDown } from 'lucide-react'
import { DEFAULT_GLOBAL_BACK_SRC, useApp, type BleedSource } from '@/contexts/AppContext'
import { processImage } from '@/utils/imageProcessing'
import { handleFiles as processFiles } from '@/utils/fileHandling'
import { handleXMLFile } from '@/utils/xmlHandling'
import { openImportModal } from '@/utils/modalHelpers'

export default function Sidebar() {
  const {
    currentStep,
    setCurrentStep,
    globalBack,
    setGlobalBack,
    setUploadedXmlFile,
    deck,
    setDeck,
    currentCardIndex,
    setCurrentCardIndex,
    setInspectorIndex,
    setActiveVersionIndex,
    setMaskingColors,
    setMaskingTolerance,
    setCurrentZoomLevel
  } = useApp()
  const [processing, setProcessing] = useState(false)
  const [processingPercent, setProcessingPercent] = useState(0)
  const [processingText, setProcessingText] = useState('Processing...')
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const xmlInputRef = useRef<HTMLInputElement>(null)
  const sequentialBacksInputRef = useRef<HTMLInputElement>(null)
  const [sequentialProcessing, setSequentialProcessing] = useState(false)
  const [sequentialPercent, setSequentialPercent] = useState(0)
  const [showXmlBleedNotification, setShowXmlBleedNotification] = useState(false)
  const [showBleedPrompt, setShowBleedPrompt] = useState(false)
  const [bleedProcessing, setBleedProcessing] = useState(false)
  const [bleedProcessingPercent, setBleedProcessingPercent] = useState(0)
  const [showBleedCompleteNotification, setShowBleedCompleteNotification] = useState(false)
  const [bleedCompleteType, setBleedCompleteType] = useState<'added' | 'removed'>('added')
  const [showBackBleedPrompt, setShowBackBleedPrompt] = useState(false)
  const [pendingBackOriginal, setPendingBackOriginal] = useState<string | null>(null)
  const [showSequentialBacksPrompt, setShowSequentialBacksPrompt] = useState(false)
  const pendingXmlBleedApply = useRef(false)
  const shouldShowCornerWarning = deck.some(card => card.bleedSource === 'added')

  // Auto-apply -1.0mm bleed after XML import once deck state is updated
  useEffect(() => {
    if (pendingXmlBleedApply.current && deck.length > 0 && !bleedProcessing) {
      pendingXmlBleedApply.current = false
      // Small delay to ensure React state is fully settled
      setTimeout(() => {
        handleBleedChoice('has-bleed')
      }, 100)
    }
  }, [deck]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    if (currentStep === 2) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const original = (e.target?.result as string) || ''
        // Store the original and show bleed prompt
        const newBack = { ...globalBack, original, trimMm: 2.5, bleedMm: 2.0, hasBleed: false, bleedSource: 'none' as const }
        setGlobalBack(newBack)

        processImage(original, 2.5, 2.0, false, (processed) => {
          setGlobalBack({ ...newBack, processed })
          // After initial processing, show the bleed prompt
          setPendingBackOriginal(original)
          setShowBackBleedPrompt(true)
        })
      }
      reader.readAsDataURL(file)
    } else {
      await processFiles(files, deck, setDeck, setCurrentCardIndex, currentCardIndex, setProcessing, setProcessingPercent, setProcessingText, () => {
        setShowBleedPrompt(true)
      })
    }
  }

  const handleSequentialBacksUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || deck.length === 0) return

    setSequentialProcessing(true)
    setSequentialPercent(0)

    // Sort files alphabetically by name for correct sequential order
    const fileArray = Array.from(files).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    const total = Math.min(fileArray.length, deck.length)

    for (let i = 0; i < total; i++) {
      const file = fileArray[i]

      await new Promise<void>((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const backDataUrl = (e.target?.result as string) || ''

          // Get the card's current bleed settings
          const card = deck[i]
          const cardTrim = card.backTrimMm ?? card.trimMm ?? 2.5
          const cardBleed = card.bleedMm !== undefined ? card.bleedMm : 2.0
          const cardHasBleed = card.hasBleed || false

          // Process the back image with the card's settings
          processImage(backDataUrl, cardTrim, cardBleed, cardHasBleed, (processedBack) => {
            setDeck(prev => {
              const newDeck = [...prev]
              if (i < newDeck.length) {
                newDeck[i] = {
                  ...newDeck[i],
                  originalBack: backDataUrl,
                  back: processedBack
                }
              }
              return newDeck
            })
            resolve()
          })
        }
        reader.readAsDataURL(file)
      })

      setSequentialPercent(Math.round(((i + 1) / total) * 100))
    }

    setTimeout(() => {
      setSequentialProcessing(false)
      setSequentialPercent(0)
    }, 500)

    setCurrentStep(3)
  }

  const handleReset = () => {
    setShowResetConfirm(true)
  }

  const confirmReset = () => {
    // Reset all state to initial values
    setDeck([])
    setGlobalBack({
      original: DEFAULT_GLOBAL_BACK_SRC,
      processed: DEFAULT_GLOBAL_BACK_SRC,
      trimMm: 2.5,
      bleedMm: 2.0,
      hasBleed: false,
      bleedSource: 'none',
    })
    setUploadedXmlFile(null)
    setCurrentCardIndex(-1)
    setCurrentStep(1)
    setInspectorIndex(-1)
    setActiveVersionIndex(-1)
    setMaskingColors([])
    setMaskingTolerance(15)
    setCurrentZoomLevel(1)
    setShowResetConfirm(false)
    // Reset file inputs
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    if (xmlInputRef.current) {
      xmlInputRef.current.value = ''
    }
    if (sequentialBacksInputRef.current) {
      sequentialBacksInputRef.current.value = ''
    }
  }

  const cancelReset = () => {
    setShowResetConfirm(false)
  }

  const applyDefaultBack = () => {
    setPendingBackOriginal(null)
    setShowBackBleedPrompt(false)
    const nextBack = {
      original: DEFAULT_GLOBAL_BACK_SRC,
      processed: DEFAULT_GLOBAL_BACK_SRC,
      trimMm: globalBack.trimMm,
      bleedMm: globalBack.bleedMm,
      hasBleed: globalBack.hasBleed,
      bleedSource: globalBack.bleedSource ?? 'none',
    }

    setGlobalBack(nextBack)
    processImage(nextBack.original, nextBack.trimMm, nextBack.bleedMm, nextBack.hasBleed, (processed) => {
      setGlobalBack(prev => ({ ...prev, processed: processed || DEFAULT_GLOBAL_BACK_SRC }))
    })
  }

  const handleBackBleedChoice = (choice: 'no-bleed' | 'has-bleed') => {
    setShowBackBleedPrompt(false)
    const original = pendingBackOriginal
    if (!original) return

    const targetBleed = choice === 'no-bleed' ? 2.0 : -1.0
    const targetHasBleed = true
    const currentTrim = 2.5
    const bleedSource: BleedSource = choice === 'no-bleed' ? 'added' : 'existing'

    const newBack = { ...globalBack, original, trimMm: currentTrim, bleedMm: targetBleed, hasBleed: targetHasBleed, bleedSource }
    setGlobalBack(newBack)

    processImage(original, currentTrim, targetBleed, targetHasBleed, (processed) => {
      setGlobalBack(prev => ({ ...prev, processed, trimMm: currentTrim, bleedMm: targetBleed, hasBleed: targetHasBleed, bleedSource }))
      setPendingBackOriginal(null)
      setBleedCompleteType(choice === 'no-bleed' ? 'added' : 'removed')
      setShowBleedCompleteNotification(true)
    })
  }

  const handleBleedChoice = async (choice: 'no-bleed' | 'has-bleed') => {
    setShowBleedPrompt(false)
    setBleedProcessing(true)
    setBleedProcessingPercent(0)

    const targetBleed = choice === 'no-bleed' ? 2.0 : -1.0
    const targetHasBleed = true
    const currentTrim = 2.5
    const bleedSource: BleedSource = choice === 'no-bleed' ? 'added' : 'existing'

    const total = deck.length
    if (total === 0) {
      setBleedProcessing(false)
      return
    }

    const originalGlobalBack = globalBack.original

    const BATCH_SIZE = 5
    const updatedDeck = new Array(total)
    let completed = 0

    const processCard = async (card: any, index: number) => {
      const updatedCard = {
        ...card,
        trimMm: currentTrim,
        frontTrimMm: currentTrim,
        backTrimMm: currentTrim,
        bleedMm: targetBleed,
        hasBleed: targetHasBleed,
        bleedSource
      }

      const pFront = card.originalFront ? new Promise<string | null>((resolve) => {
        processImage(card.originalFront!, currentTrim, targetBleed, targetHasBleed, (res) => {
          resolve(res)
        })
      }) : Promise.resolve(null)

      const pBack = card.originalBack ? new Promise<string | null>((resolve) => {
        processImage(card.originalBack!, currentTrim, targetBleed, targetHasBleed, (res) => {
          resolve(res)
        })
      }) : Promise.resolve(null)

      const [processedFront, processedBack] = await Promise.all([pFront, pBack])

      updatedDeck[index] = {
        ...updatedCard,
        front: processedFront || card.front,
        back: processedBack || card.back
      }
    }

    try {
      const currentDeck = deck
      const chunks = []
      for (let i = 0; i < total; i += BATCH_SIZE) {
        chunks.push(currentDeck.slice(i, i + BATCH_SIZE).map((card, offset) => ({ card, index: i + offset })))
      }

      for (const chunk of chunks) {
        await Promise.all(chunk.map(item => processCard(item.card, item.index)))
        completed += chunk.length
        setBleedProcessingPercent(Math.round((completed / total) * 100))
        await new Promise(resolve => setTimeout(resolve, 10))
      }

      setDeck(updatedDeck)
      if (originalGlobalBack) {
        processImage(originalGlobalBack, currentTrim, targetBleed, targetHasBleed, (processed) => {
          setGlobalBack(prev => ({
            ...prev,
            original: originalGlobalBack,
            processed,
            trimMm: currentTrim,
            bleedMm: targetBleed,
            hasBleed: targetHasBleed,
            bleedSource
          }))
        })
      }
      setBleedCompleteType(choice === 'no-bleed' ? 'added' : 'removed')
      setShowBleedCompleteNotification(true)
    } catch (error) {
      console.error('Error applying bleed settings:', error)
    } finally {
      setTimeout(() => {
        setBleedProcessing(false)
        setBleedProcessingPercent(0)
      }, 500)
    }
  }

  return (
    <>
      {/* Bleed Prompt Modal - shown after batch image upload */}
      {showBleedPrompt && (
        <div className="fixed inset-0 bg-slate-900/90 z-[100] flex items-center justify-center backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-white dark:bg-slate-850 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-modal">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-blue-50 dark:bg-slate-900">
              <h3 className="font-bold text-base sm:text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <Info className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                Do Your Images Have Print Bleed?
              </h3>
              <button
                onClick={() => setShowBleedPrompt(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 active:text-slate-700 transition-colors p-1 touch-manipulation"
                aria-label="Close"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 bg-white dark:bg-slate-850">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                Print bleed is extra image area beyond the cut line that ensures no white edges after cutting. Images from XML files or professional print sources typically already include bleed.
              </p>
              <Link
                href="/guide/bleed"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 group mb-4"
                target="_blank"
              >
                Learn more about print bleed
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <div className="space-y-3">
                <button
                  onClick={() => handleBleedChoice('no-bleed')}
                  className="w-full border-2 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:border-blue-400 dark:hover:border-blue-500 text-slate-800 dark:text-slate-200 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center gap-3 touch-manipulation min-h-[52px]"
                >
                  <div className="bg-blue-100 dark:bg-blue-800 p-1.5 rounded-full shrink-0">
                    <Crop className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="text-left">
                    <span className="block">No Print Bleed</span>
                    <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400">We&apos;ll add +2.0mm bleed to your images</span>
                  </div>
                </button>
                <button
                  onClick={() => handleBleedChoice('has-bleed')}
                  className="w-full border-2 border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40 hover:border-amber-400 dark:hover:border-amber-500 text-slate-800 dark:text-slate-200 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center gap-3 touch-manipulation min-h-[52px]"
                >
                  <div className="bg-amber-100 dark:bg-amber-800 p-1.5 rounded-full shrink-0">
                    <Scissors className="w-4 h-4 text-amber-600 dark:text-amber-300" />
                  </div>
                  <div className="text-left">
                    <span className="block">Bleed Is Already Added</span>
                    <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400">We&apos;ll trim -1.0mm to match our spec</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bleed Processing Progress */}
      {bleedProcessing && (
        <div className="fixed inset-0 bg-slate-900/90 z-[100] flex items-center justify-center backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-white dark:bg-slate-850 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden p-6">
            <h3 className="font-bold text-base text-slate-800 dark:text-white mb-4 text-center">Applying Bleed Settings...</h3>
            <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              <span>Processing cards</span>
              <span>{bleedProcessingPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${bleedProcessingPercent}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Bleed Complete Notification Modal */}
      {showBleedCompleteNotification && (
        <div className="fixed inset-0 bg-slate-900/90 z-[100] flex items-center justify-center backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-white dark:bg-slate-850 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-modal">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-green-50 dark:bg-slate-900">
              <h3 className="font-bold text-base sm:text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                {bleedCompleteType === 'added' ? 'Bleed Added Successfully' : 'Bleed Trimmed Successfully'}
              </h3>
              <button
                onClick={() => setShowBleedCompleteNotification(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 active:text-slate-700 transition-colors p-1 touch-manipulation"
                aria-label="Close"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 bg-white dark:bg-slate-850">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg mb-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {bleedCompleteType === 'added'
                    ? 'We\'ve added +2.0mm of bleed to all your cards.'
                    : 'We\'ve trimmed -1.0mm of bleed from all your cards to match our printing spec.'}
                </p>
              </div>
              {bleedCompleteType === 'added' && (
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <strong className="text-slate-900 dark:text-white">Next Step:</strong> Please cycle through each card and adjust the <strong className="text-slate-900 dark:text-white">Corner Trim</strong> in the <strong className="text-slate-900 dark:text-white">Print Prep</strong> section so there are no visual imperfections in the corners.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex justify-end">
              <button
                onClick={() => setShowBleedCompleteNotification(false)}
                className="px-6 py-2.5 rounded-lg font-medium text-sm transition-colors bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm touch-manipulation min-h-[44px]"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Back Bleed Prompt Modal - shown after single back upload */}
      {showBackBleedPrompt && (
        <div className="fixed inset-0 bg-slate-900/90 z-[100] flex items-center justify-center backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-white dark:bg-slate-850 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-modal">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-blue-50 dark:bg-slate-900">
              <h3 className="font-bold text-base sm:text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <Info className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                Does Your Card Back Have Print Bleed?
              </h3>
              <button
                onClick={() => setShowBackBleedPrompt(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 active:text-slate-700 transition-colors p-1 touch-manipulation"
                aria-label="Close"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 bg-white dark:bg-slate-850">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                Print bleed is extra image area beyond the cut line that ensures no white edges after cutting. Images from XML files or professional print sources typically already include bleed.
              </p>
              <Link
                href="/guide/bleed"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 group mb-4"
                target="_blank"
              >
                Learn more about print bleed
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <div className="space-y-3">
                <button
                  onClick={() => handleBackBleedChoice('no-bleed')}
                  className="w-full border-2 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:border-blue-400 dark:hover:border-blue-500 text-slate-800 dark:text-slate-200 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center gap-3 touch-manipulation min-h-[52px]"
                >
                  <div className="bg-blue-100 dark:bg-blue-800 p-1.5 rounded-full shrink-0">
                    <Crop className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="text-left">
                    <span className="block">No Print Bleed</span>
                    <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400">We&apos;ll add +2.0mm bleed to your card back</span>
                  </div>
                </button>
                <button
                  onClick={() => handleBackBleedChoice('has-bleed')}
                  className="w-full border-2 border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40 hover:border-amber-400 dark:hover:border-amber-500 text-slate-800 dark:text-slate-200 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center gap-3 touch-manipulation min-h-[52px]"
                >
                  <div className="bg-amber-100 dark:bg-amber-800 p-1.5 rounded-full shrink-0">
                    <Scissors className="w-4 h-4 text-amber-600 dark:text-amber-300" />
                  </div>
                  <div className="text-left">
                    <span className="block">Bleed Is Already Added</span>
                    <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400">We&apos;ll trim -1.0mm to match our spec</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sequential Backs Info Prompt */}
      {showSequentialBacksPrompt && (
        <div className="fixed inset-0 bg-slate-900/90 z-[100] flex items-center justify-center backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-white dark:bg-slate-850 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-modal">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-purple-50 dark:bg-slate-900">
              <h3 className="font-bold text-base sm:text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <Info className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                Sequential Backs Info
              </h3>
              <button
                onClick={() => setShowSequentialBacksPrompt(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 active:text-slate-700 transition-colors p-1 touch-manipulation"
                aria-label="Close"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 bg-white dark:bg-slate-850">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Sequential card backs must be the same size and bleed amounts as the fronts as the bleed settings will be applied from the front card settings.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
              <button
                onClick={() => setShowSequentialBacksPrompt(false)}
                className="px-4 py-2.5 rounded-lg font-medium text-sm transition-colors bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 touch-manipulation min-h-[44px]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSequentialBacksPrompt(false)
                  sequentialBacksInputRef.current?.click()
                }}
                className="px-6 py-2.5 rounded-lg font-medium text-sm transition-colors bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white shadow-sm touch-manipulation min-h-[44px]"
              >
                I Understand, Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* XML Bleed Notification Modal */}
      {showXmlBleedNotification && (
        <div className="fixed inset-0 bg-slate-900/90 z-[100] flex items-center justify-center backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-white dark:bg-slate-850 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-modal">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-amber-50 dark:bg-slate-900">
              <h3 className="font-bold text-base sm:text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
                Important: Bleed Adjustment Needed
              </h3>
              <button
                onClick={() => setShowXmlBleedNotification(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 active:text-slate-700 transition-colors p-1 touch-manipulation"
                aria-label="Close"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 bg-white dark:bg-slate-850">
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  XML Files usually have 3mm Bleed, which is too much for our cutting process. Please use the <strong className="text-slate-900 dark:text-white">Bleed Tool</strong> in the <strong className="text-slate-900 dark:text-white">Print Prep</strong> Section to remove 1.0mm of bleed prior to completing your order to ensure proper sizing.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex justify-end">
              <button
                onClick={() => setShowXmlBleedNotification(false)}
                className="px-6 py-2.5 rounded-lg font-medium text-sm transition-colors bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm touch-manipulation min-h-[44px]"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-900/90 z-[100] flex items-center justify-center backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-white dark:bg-slate-850 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-modal">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
              <h3 className="font-bold text-base sm:text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
                Reset Project
              </h3>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="text-slate-400 hover:text-red-500 active:text-red-600 transition-colors p-1 touch-manipulation"
                aria-label="Close"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 bg-white dark:bg-slate-850">
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium mb-2">
                  Are you sure you want to reset the project?
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  This will permanently clear all cards, settings, and start fresh. This action cannot be undone.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <RotateCcw className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <p className="font-semibold mb-1">What will be reset:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-500">
                    <li>All card images and data</li>
                    <li>Card backs and finishes</li>
                    <li>Trim and bleed settings</li>
                    <li>All customizations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2.5 rounded-lg font-medium text-sm transition-colors bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 touch-manipulation min-h-[44px]"
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                className="px-4 py-2.5 rounded-lg font-medium text-sm transition-colors bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm touch-manipulation min-h-[44px]"
              >
                Yes, Reset Project
              </button>
            </div>
          </div>
        </div>
      )}

      <div id="main-sidebar" className="w-full md:w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-20 shadow-lg md:shadow-none transition-colors h-full">
        <div className="flex-grow overflow-y-auto custom-scrollbar min-h-0">
          <div id="upload-panel" className="p-4 sm:p-6 flex-grow">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <ImagePlus className="w-4 h-4" />
              {currentStep === 2 ? 'Upload Back' : 'Upload Fronts'}
            </h3>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4 sm:p-6 text-center hover:bg-blue-50 dark:hover:bg-slate-800 active:bg-blue-100 dark:active:bg-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer mb-4 sm:mb-6 group touch-manipulation"
            >
              <ImagePlus className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400 dark:text-slate-500 mx-auto mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {currentStep === 2 ? 'Click to set Card Back' : 'Click to upload'}
              </p>
              <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 mt-1">JPG, PNG (Max 32MB)</p>
            </div>

            <p className="text-[10px] text-amber-600 dark:text-amber-400 leading-relaxed mb-4">
              Images with copyright markings or obvious copyrighted material may be denied and your order refunded.
            </p>

            {processing && (
              <div className="mb-6">
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  <span>{processingText}</span>
                  <span>{processingPercent}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${processingPercent}%` }}
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="mb-6 space-y-2">


                <input
                  ref={xmlInputRef}
                  type="file"
                  accept=".xml"
                  className="hidden"
                  onChange={(e) => handleXMLFile(e.target.files, deck, setDeck, setCurrentCardIndex, currentCardIndex, globalBack, setGlobalBack, currentStep, setProcessing, setProcessingPercent, setProcessingText, setUploadedXmlFile, () => { pendingXmlBleedApply.current = true })}
                />

                <button
                  onClick={() => xmlInputRef.current?.click()}
                  className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-2 rounded-md text-xs font-medium hover:bg-white dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-center gap-2"
                >
                  <FileCode className="w-3 h-3" /> Upload XML (3mm bleed added)
                </button>

                {deck.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="w-full border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-2 rounded-md text-xs font-medium hover:bg-red-100 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-700 transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Project
                  </button>
                )}


                {shouldShowCornerWarning && (
                  <div className="mt-6 mb-2 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-800 p-1.5 rounded-full shrink-0">
                        <Megaphone className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-1">
                          Action Required: Check Corner Trim
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                          To fix corner defects, review each card and adjust <span className="font-bold">Corner Trim</span> as needed.
                        </p>
                        <div className="bg-white dark:bg-slate-900/50 rounded p-2 mb-3 border border-blue-100 dark:border-blue-800/50">
                          <ol className="list-decimal list-inside text-xs text-slate-600 dark:text-slate-300 space-y-1.5 ml-1">
                            <li>Go to <strong className="text-slate-800 dark:text-slate-200">Print Prep</strong> (below)</li>
                            <li>Adjust <strong className="text-slate-800 dark:text-slate-200">Corner Trim</strong> until corner defects are removed</li>
                            <li>Check each card individually and fine-tune if needed</li>
                            <li className="font-bold text-amber-600 dark:text-amber-500 pt-1 border-t border-slate-100 dark:border-slate-800 mt-1">Cycle through every card to ensure the corners are free of defects.</li>
                          </ol>
                        </div>
                        <Link href="/guide/bleed" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 group">
                          What is corner trim?
                          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Instructions</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {currentStep === 2
                  ? 'Upload your own back above, or use the single built-in TCGPlaytest back below.'
                  : 'Upload your card art here. Each image will create a new card in your deck.'}
              </p>
            </div>
          </div>

          {/* Sequential Backs Upload - Only show in step 2 */}
          {currentStep === 2 && deck.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-purple-50/50 dark:bg-slate-850">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 text-sm">
                <ImagePlus className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Sequential Backs
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                Upload multiple back images to assign them to your cards in order. The first image will be assigned to card 1, the second to card 2, etc.
              </p>

              <input
                ref={sequentialBacksInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleSequentialBacksUpload(e.target.files)}
              />

              {sequentialProcessing ? (
                <div className="w-full bg-purple-100 dark:bg-purple-900/30 rounded-md p-3">
                  <div className="flex justify-between text-xs font-bold text-purple-700 dark:text-purple-400 mb-1">
                    <span>Applying backs...</span>
                    <span>{sequentialPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${sequentialPercent}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowSequentialBacksPrompt(true)}
                  className="w-full border border-purple-300 dark:border-purple-700 bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-400 py-2.5 rounded-md text-xs font-bold hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-400 dark:hover:border-purple-600 transition-all flex items-center justify-center gap-2"
                >
                  <ImagePlus className="w-3.5 h-3.5" />
                  Upload Sequential Backs ({deck.length} cards)
                </button>
              )}

              <p className="text-[10px] text-amber-600 dark:text-amber-400 leading-relaxed mt-2">
                Note: Files will be sorted alphabetically. Name them 01.jpg, 02.jpg, etc. for correct order.
              </p>
            </div>
          )}

          <PrintPrepPanel />
        </div>

        {/* Background Image Selector - Only show in step 2 */}
        {currentStep === 2 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Choose Background
            </h4>
            <button
              type="button"
              onClick={applyDefaultBack}
              className={`w-full overflow-hidden rounded-lg border text-left transition-all ${globalBack.original === DEFAULT_GLOBAL_BACK_SRC
                ? 'border-blue-500 ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
            >
              <div className="aspect-[63/88] w-full bg-slate-950">
                <img
                  src={DEFAULT_GLOBAL_BACK_SRC}
                  alt="Default TCGPlaytest card back"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-3 bg-white px-3 py-2 dark:bg-slate-900">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">TCGPlaytest Default</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">The only built-in back option</p>
                </div>
                {globalBack.original === DEFAULT_GLOBAL_BACK_SRC && (
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                    Selected
                  </span>
                )}
              </div>
            </button>
          </div>
        )}

        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shrink-0">
          <button
            onClick={() => setCurrentStep(currentStep === 1 ? 2 : 3)}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 sm:py-3 rounded-lg font-bold text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-colors touch-manipulation min-h-[48px]"
          >
            {currentStep === 1 ? (
              <>
                Next: Customize Back <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Next: Preview Deck <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  )
}


function PrintPrepPanel() {
  const { currentStep, deck, currentCardIndex, setDeck, globalBack, setGlobalBack } = useApp()
  const [trimMm, setTrimMm] = useState(2.5)
  const [bleedMm, setBleedMm] = useState(2.0)
  const [hasBleed, setHasBleed] = useState(false)
  const [isApplied, setIsApplied] = useState(false) // Persistent state for button
  const [showNotificationBanner, setShowNotificationBanner] = useState(false) // Temporary banner
  const [showApplyEmphasis, setShowApplyEmphasis] = useState(false) // Red emphasis when bleed is first activated
  const [showAdvancedPrep, setShowAdvancedPrep] = useState(false)

  // Progress Bar State
  const [prepProcessing, setPrepProcessing] = useState(false)
  const [prepProcessingPercent, setPrepProcessingPercent] = useState(0)

  const target = currentStep === 2 ? globalBack : deck[currentCardIndex]
  const getBleedSource = (nextHasBleed: boolean, previousSource?: BleedSource): BleedSource => {
    if (!nextHasBleed) return 'none'
    return previousSource === 'existing' ? 'existing' : 'added'
  }

  // Reset applied state when deck length changes (new cards added)
  useEffect(() => {
    setIsApplied(false)
  }, [deck.length])

  useEffect(() => {
    if (target) {
      // Only sync if values are actually different to avoid resetting during updates
      const targetTrim = target.trimMm || 2.5
      const targetBleed = target.bleedMm !== undefined ? target.bleedMm : 2.0
      const targetHasBleed = target.hasBleed || false

      if (Math.abs(targetTrim - trimMm) > 0.01) {
        setTrimMm(targetTrim)
        setIsApplied(false) // Reset when settings change
      }
      if (Math.abs(targetBleed - bleedMm) > 0.01) {
        setBleedMm(targetBleed)
        setIsApplied(false) // Reset when settings change
      }
      if (targetHasBleed !== hasBleed) {
        setHasBleed(targetHasBleed)
        setIsApplied(false) // Reset when settings change
      }
    }
  }, [target, currentStep, currentCardIndex])

  // Update cut line overlay visually (without processing image)
  const updateCutLineOverlay = (newTrim?: number, newBleedMm?: number, newHasBleed?: boolean) => {
    const finalTrim = newTrim !== undefined ? newTrim : trimMm
    const finalBleedMm = newBleedMm !== undefined ? newBleedMm : bleedMm
    const finalHasBleed = newHasBleed !== undefined ? newHasBleed : hasBleed
    const finalBleedSource = getBleedSource(finalHasBleed, target?.bleedSource)

    // Update state to trigger cut line overlay update in EditorView
    if (currentStep === 2) {
      setGlobalBack(prev => ({
        ...prev,
        trimMm: finalTrim,
        bleedMm: finalBleedMm,
        hasBleed: finalHasBleed,
        bleedSource: finalBleedSource
      }))
    } else {
      if (currentCardIndex < 0) return
      const cardIdx = currentCardIndex
      setDeck(prevDeck => {
        if (cardIdx >= prevDeck.length || !prevDeck[cardIdx]) return prevDeck
        const newDeck = [...prevDeck]
        newDeck[cardIdx] = {
          ...newDeck[cardIdx],
          trimMm: finalTrim,
          frontTrimMm: finalTrim,
          backTrimMm: finalTrim,
          bleedMm: finalBleedMm,
          hasBleed: finalHasBleed,
          bleedSource: finalBleedSource
        }
        return newDeck
      })
    }
  }

  // Process image with current settings (called when bleed is toggled)
  const updatePrepSettings = (source?: 'slider' | 'input', newTrim?: number, newBleedMm?: number, newHasBleed?: boolean) => {
    // Use provided values or fall back to state
    const finalTrim = newTrim !== undefined ? newTrim : trimMm
    const finalBleedMm = newBleedMm !== undefined ? newBleedMm : bleedMm
    const finalHasBleed = newHasBleed !== undefined ? newHasBleed : hasBleed
    const finalBleedSource = getBleedSource(finalHasBleed, target?.bleedSource)

    if (currentStep === 2) {
      // Update global back
      setGlobalBack(prev => {
        const originalSrc = prev.original
        if (!originalSrc) return prev

        const newBack = {
          ...prev,
          trimMm: finalTrim,
          bleedMm: finalBleedMm,
          hasBleed: finalHasBleed,
          bleedSource: finalBleedSource
        }

        // Process image and update when done
        processImage(originalSrc, finalTrim, finalBleedMm, finalHasBleed, (processed) => {
          setGlobalBack(prevBack => ({ ...prevBack, processed, trimMm: finalTrim, bleedMm: finalBleedMm, hasBleed: finalHasBleed, bleedSource: finalBleedSource }))
        })

        return newBack
      })
    } else {
      // Update current card
      if (currentCardIndex < 0) return

      // Capture currentCardIndex to avoid closure issues
      const cardIdx = currentCardIndex

      setDeck(prevDeck => {
        if (cardIdx >= prevDeck.length || !prevDeck[cardIdx]) return prevDeck

        const card = prevDeck[cardIdx]
        const originalSrc = card.originalFront
        if (!originalSrc) return prevDeck

        const updatedCard = {
          ...card,
          trimMm: finalTrim,
          frontTrimMm: finalTrim,
          backTrimMm: finalTrim,
          bleedMm: finalBleedMm,
          hasBleed: finalHasBleed,
          bleedSource: finalBleedSource
        }

        // Process front image
        processImage(originalSrc, finalTrim, finalBleedMm, finalHasBleed, (processed) => {
          setDeck(prev => {
            const newDeck = [...prev]
            if (cardIdx < newDeck.length) {
              newDeck[cardIdx] = {
                ...newDeck[cardIdx],
                front: processed,
                trimMm: finalTrim,
                frontTrimMm: finalTrim,
                bleedMm: finalBleedMm,
                hasBleed: finalHasBleed,
                bleedSource: finalBleedSource
              }
            }
            return newDeck
          })
        })

        // Also process back if it exists
        if (card.originalBack) {
          processImage(card.originalBack, finalTrim, finalBleedMm, finalHasBleed, (processedBack) => {
            setDeck(prev => {
              const newDeck = [...prev]
              if (cardIdx < newDeck.length) {
                newDeck[cardIdx] = {
                  ...newDeck[cardIdx],
                  back: processedBack,
                  trimMm: finalTrim,
                  backTrimMm: finalTrim,
                  bleedMm: finalBleedMm,
                  hasBleed: finalHasBleed,
                  bleedSource: finalBleedSource
                }
              }
              return newDeck
            })
          })
        }

        // Return updated card immediately (without processed image, which will come in callback)
        const newDeck = [...prevDeck]
        newDeck[cardIdx] = updatedCard
        return newDeck
      })
    }
  }

  const toggleBleed = () => {
    const newHasBleed = !hasBleed
    setHasBleed(newHasBleed)
    setIsApplied(false) // Reset applied state when user toggles bleed
    // Show red emphasis when bleed is activated
    if (newHasBleed && !isApplied) {
      setShowApplyEmphasis(true)
    }
    // Update cut line overlay first
    updateCutLineOverlay(undefined, undefined, newHasBleed)
    // Then process the image with the new bleed state
    updatePrepSettings(undefined, undefined, undefined, newHasBleed)
  }

  const applyPrepToAll = async () => {
    if (deck.length === 0) return

    setPrepProcessing(true)
    setPrepProcessingPercent(0)

    // Capture current state values at the time of execution
    const currentTrim = trimMm
    const currentBleed = bleedMm
    const currentHasBleed = hasBleed
    const currentBleedSource = getBleedSource(currentHasBleed, target?.bleedSource)
    const total = deck.length
    let completed = 0

    // Process in chunks to allow UI updates and avoid freezing
    const BATCH_SIZE = 5
    const updatedDeck = new Array(total)

    // Helper to process a single card
    const processCard = async (card: any, index: number) => {
      const updatedCard = {
        ...card,
        trimMm: currentTrim,
        frontTrimMm: currentTrim,
        backTrimMm: currentTrim,
        bleedMm: currentBleed,
        hasBleed: currentHasBleed,
        bleedSource: currentBleedSource
      }

      const pFront = card.originalFront ? new Promise<string | null>((resolve) => {
        processImage(card.originalFront!, currentTrim, currentBleed, currentHasBleed, (res) => {
          resolve(res)
        })
      }) : Promise.resolve(null)

      const pBack = card.originalBack ? new Promise<string | null>((resolve) => {
        processImage(card.originalBack!, currentTrim, currentBleed, currentHasBleed, (res) => {
          resolve(res)
        })
      }) : Promise.resolve(null)

      const [processedFront, processedBack] = await Promise.all([pFront, pBack])

      updatedDeck[index] = {
        ...updatedCard,
        front: processedFront || card.front,
        back: processedBack || card.back
      }
    }

    try {
      // Create chunks
      const chunks = []
      for (let i = 0; i < total; i += BATCH_SIZE) {
        chunks.push(deck.slice(i, i + BATCH_SIZE).map((card, offset) => ({ card, index: i + offset })))
      }

      for (const chunk of chunks) {
        // Process chunk in parallel
        await Promise.all(chunk.map(item => processCard(item.card, item.index)))

        completed += chunk.length
        setPrepProcessingPercent(Math.round((completed / total) * 100))

        // Yield to event loop to allow UI to repaint
        await new Promise(resolve => setTimeout(resolve, 10))
      }

      setDeck(updatedDeck)
      setIsApplied(true)
      setShowNotificationBanner(true)
      setTimeout(() => {
        setShowNotificationBanner(false)
      }, 3000)
    } catch (error) {
      console.error('Error applying prep settings to all cards:', error)
    } finally {
      // Small delay before hiding progress bar so user sees 100%
      setTimeout(() => {
        setPrepProcessing(false)
        setPrepProcessingPercent(0)
      }, 500)
    }
  }

  return (
    <div id="print-prep-panel" className="p-6 border-t border-slate-100 dark:border-slate-800 bg-blue-50/50 dark:bg-slate-850 relative">
      {/* Success Notification */}
      {showNotificationBanner && (
        <div className="absolute top-4 left-4 right-4 bg-green-500 dark:bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs font-semibold">Settings applied to all {deck.length} card{deck.length !== 1 ? 's' : ''}!</span>
        </div>
      )}

      <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Crop className="w-4 h-4" /> Print Prep
      </h3>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400">Corner Trim</label>
            <span className="text-xs font-mono text-slate-700 dark:text-slate-300">{trimMm}mm</span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="0.25"
            value={trimMm}
            onChange={(e) => {
              const newTrim = parseFloat(e.target.value)
              setTrimMm(newTrim)
              setIsApplied(false) // Reset applied state when user changes settings
              // Update cut line overlay visually
              updateCutLineOverlay(newTrim)
              // If bleed is active, reprocess image with new trim value
              if (hasBleed) {
                updatePrepSettings('slider', newTrim)
              }
            }}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Adjusts bleed start point (removes white corners)</p>
        </div>

        <button
          type="button"
          onClick={() => setShowAdvancedPrep(prev => !prev)}
          className="w-full flex items-center justify-between rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-left text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          <span>Advanced</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedPrep ? 'rotate-180' : ''}`} />
        </button>

        {showAdvancedPrep && (
          <div className="space-y-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 p-3">

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400">Bleed Adjustment</label>
                <div className="flex items-center gap-1">
                  <input
                    id="bleed-fine-tune"
                    type="number"
                    step="0.05"
                    value={bleedMm}
                    onChange={(e) => {
                      const newBleed = parseFloat(e.target.value)
                      setBleedMm(newBleed)
                      setIsApplied(false) // Reset applied state when user changes settings
                      // Sync slider
                      const bleedSlider = document.getElementById('bleed-slider') as HTMLInputElement
                      if (bleedSlider) {
                        const clampedValue = Math.max(-4, Math.min(4, newBleed))
                        bleedSlider.value = clampedValue.toString()
                      }
                      // Update cut line overlay visually
                      updateCutLineOverlay(undefined, newBleed)
                      // If bleed is active, reprocess image with new bleed value
                      if (hasBleed) {
                        updatePrepSettings('input', undefined, newBleed)
                      }
                    }}
                    className="w-16 text-right text-xs font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-1 py-0.5 focus:outline-none focus:border-blue-500 text-slate-700 dark:text-slate-300"
                  />
                  <span className="text-[10px] text-slate-400 font-mono">mm</span>
                </div>
              </div>
              <input
                id="bleed-slider"
                type="range"
                min="-4"
                max="4"
                step="0.25"
                value={bleedMm}
                onChange={(e) => {
                  const newBleed = parseFloat(e.target.value)
                  setBleedMm(newBleed)
                  setIsApplied(false) // Reset applied state when user changes settings
                  // Sync input field
                  const bleedInput = document.getElementById('bleed-fine-tune') as HTMLInputElement
                  if (bleedInput) bleedInput.value = newBleed.toString()
                  // Update cut line overlay visually
                  updateCutLineOverlay(undefined, newBleed)
                  // If bleed is active, reprocess image with new bleed value
                  if (hasBleed) {
                    updatePrepSettings('slider', undefined, newBleed)
                  }
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-medium px-1 mt-1">
                <span>Trim (-4mm)</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">Target (+2.0mm)</span>
                <span>Extend (+4mm)</span>
              </div>
            </div>

            <button
              onClick={toggleBleed}
              className={`w-full border py-2 rounded-md text-xs font-bold transition-colors flex items-center justify-center gap-2 ${hasBleed
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                }`}
            >
              <Crop className="w-3 h-3" /> {hasBleed ? 'Bleed Active' : 'Add Bleed'}
            </button>

            {prepProcessing ? (
              <div className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-md p-2 mt-2">
                <div className="flex justify-between text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">
                  <span>Applying...</span>
                  <span>{prepProcessingPercent}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${prepProcessingPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="mt-2">
                <button
                  onClick={() => {
                    setShowApplyEmphasis(false)
                    applyPrepToAll()
                  }}
                  disabled={deck.length === 0}
                  className={`w-full py-2 rounded-md text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${showApplyEmphasis && !isApplied
                    ? 'bg-red-600 hover:bg-red-700 text-white border border-red-600 animate-pulse'
                    : isApplied
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                      : 'bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                    }`}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle className="w-3 h-3" /> Applied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Apply to All Cards
                    </>
                  )}
                </button>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center mt-1">
                  Copies current trim/bleed settings to entire deck
                </p>
              </div>
            )}

            <div className="bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-2.5 space-y-2">
              <div className="flex gap-2 items-start">
                <Crop className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <p className="text-[10px] leading-tight text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-800 dark:text-slate-200">Standard (+2.0mm):</strong> We need a{' '}
                  <strong>2.0mm bleed</strong> extension past the cut line for reliable borderless printing.
                </p>
              </div>
              <div className="flex gap-2 items-start pt-1 border-t border-blue-200 dark:border-blue-800">
                <Scissors className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-[10px] leading-tight text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-800 dark:text-slate-200">3mm bleed added (-1.0mm):</strong> These images often have large bleeds. Set adjustment to <strong>-1.0mm</strong> to trim them to our spec.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

