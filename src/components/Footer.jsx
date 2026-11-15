// Footer: provider attribution and a privacy/clear-data control (PRD §13:
// "Provide a way to clear saved locations and preferences").

export default function Footer({ onClearData }) {
  return (
    <footer className="mx-auto w-full max-w-5xl px-4 pb-6 pt-2 sm:px-6">
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-white/55">
        <span>
          Weather data by{' '}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline decoration-white/30 underline-offset-2 hover:text-white/80"
          >
            Open-Meteo
          </a>
        </span>
        <span aria-hidden>·</span>
        <span>Your city list and preferences stay on this device only.</span>
        <span aria-hidden>·</span>
        <button
          type="button"
          onClick={onClearData}
          className="font-semibold underline decoration-white/30 underline-offset-2 transition hover:text-white/80"
        >
          Clear my data
        </button>
      </div>
    </footer>
  )
}
