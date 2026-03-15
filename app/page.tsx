'use client'

import { useState, useEffect } from 'react'
import { useApp } from '@/contexts/AppContext'
import Navigation from '@/components/Navigation'
import LandingView from '@/components/LandingView'
import HowItWorksView from '@/components/HowItWorksView'
import PricingView from '@/components/PricingView'
import WhyUsView from '@/components/WhyUsView'
import TutorialView from '@/components/TutorialView'
import DesignStepper from '@/components/DesignStepper'
import InspectorModal from '@/components/InspectorModal'
import VersionsModal from '@/components/VersionsModal'
import DisclaimerModal from '@/components/DisclaimerModal'
import CheckoutModal from '@/components/CheckoutModal'
import ImportModal from '@/components/ImportModal'
import SiteFooter from '@/components/SiteFooter'

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'how-it-works' | 'tutorial' | 'pricing' | 'why-us' | 'design'>('landing')
  const [showDesignStepper, setShowDesignStepper] = useState(false)
  const { deck } = useApp()

  useEffect(() => {
    const requestedView = typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('view')
      : null

    if (requestedView === 'design') {
      setCurrentView('design')
      setShowDesignStepper(true)
      return
    }

    if (
      requestedView === 'landing' ||
      requestedView === 'how-it-works' ||
      requestedView === 'tutorial' ||
      requestedView === 'pricing' ||
      requestedView === 'why-us'
    ) {
      setCurrentView(requestedView)
      setShowDesignStepper(false)
      return
    }

    if (deck.length > 0) {
      setCurrentView('design')
      setShowDesignStepper(true)
      return
    }

    setCurrentView('landing')
    setShowDesignStepper(false)
  }, [])

  useEffect(() => {
    if (deck.length > 0) {
      setCurrentView('design')
      setShowDesignStepper(true)
    }
  }, [deck.length])

  const startDesign = () => {
    setCurrentView('design')
    setShowDesignStepper(true)
  }

  const showLanding = () => {
    setCurrentView('landing')
    setShowDesignStepper(false)
  }

  const showHowItWorks = () => {
    setCurrentView('how-it-works')
    setShowDesignStepper(false)
  }

  const showPricing = () => {
    setCurrentView('pricing')
    setShowDesignStepper(false)
  }

  const showTutorial = () => {
    setCurrentView('tutorial')
    setShowDesignStepper(false)
  }

  const showWhyUs = () => {
    setCurrentView('why-us')
    setShowDesignStepper(false)
  }

  return (
    <main className="flex-grow relative">
      <Navigation
        currentView={currentView}
        showDesignStepper={showDesignStepper}
        onStartDesign={startDesign}
        onShowLanding={showLanding}
        onShowHowItWorks={showHowItWorks}
        onShowTutorial={showTutorial}
        onShowPricing={showPricing}
        onShowWhyUs={showWhyUs}
      />

      {currentView === 'landing' && !showDesignStepper && (
        <LandingView onStartDesign={startDesign} />
      )}

      {currentView === 'how-it-works' && !showDesignStepper && (
        <HowItWorksView onStartDesign={startDesign} />
      )}

      {currentView === 'pricing' && !showDesignStepper && (
        <PricingView onStartDesign={startDesign} />
      )}

      {currentView === 'tutorial' && !showDesignStepper && (
        <TutorialView onStartDesign={startDesign} />
      )}

      {currentView === 'why-us' && !showDesignStepper && (
        <WhyUsView onStartDesign={startDesign} />
      )}

      {showDesignStepper && (
        <DesignStepper onExit={showLanding} />
      )}

      {!showDesignStepper && <SiteFooter />}

      <InspectorModal />
      <VersionsModal />
      <ImportModal />
      <DisclaimerModal />
      <CheckoutModal />
    </main>
  )
}

