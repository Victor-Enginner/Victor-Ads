const tools = [
  'ChatGPT', 'Claude', 'Gemini', 'Make', 'Zapier', 'n8n',
  'ManyChat', 'ElevenLabs', 'Midjourney', 'HeyGen', 'Runway', 'Notion', 'Airtable',
]

export default function TrustMarquee() {
  return (
    <section className="bg-ink border-y border-white/5 py-10 overflow-hidden">
      <p className="text-center text-white/30 text-[11px] uppercase tracking-[0.25em] mb-8">
        Built on a best-in-class AI &amp; automation stack
      </p>
      <div className="marquee-mask">
        <div className="flex w-max animate-marquee">
          {[...tools, ...tools].map((tool, i) => (
            <div
              key={i}
              className="flex items-center gap-2 mx-6 shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-lime to-mint" />
              <span className="font-mono text-base md:text-lg text-white/35 hover:text-lime transition-colors">
                {tool}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
