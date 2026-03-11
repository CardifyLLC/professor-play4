'use client'

interface TutorialViewProps {
  onStartDesign: () => void
}

export default function TutorialView({ onStartDesign }: TutorialViewProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.2),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_30%)]" />

      <div className="relative container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
              Tutorial
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Watch the full walkthrough before you build your deck.
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base">
              This tutorial covers the workflow inside the editor so users can move from upload to checkout without guesswork.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-[0_30px_100px_rgba(15,23,42,0.6)] backdrop-blur">
            <div className="border-b border-white/10 px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-400 sm:px-6">
              Video guide
            </div>
            <div className="bg-black">
              <video
                className="aspect-video w-full"
                controls
                preload="metadata"
                playsInline
              >
                <source src="/tutorial.mp4" type="video/mp4" />
                Your browser does not support the tutorial video.
              </video>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onStartDesign}
              className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400"
            >
              Start Your Design
            </button>
            <a
              href="/tutorial.mp4"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              Open video in a new tab
            </a>
          </div>

          <div className="mt-4 flex flex-col gap-2 text-sm text-slate-400">
            <p>
              The tutorial now plays from the local video file in your `public` folder, so it works directly inside the page.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
