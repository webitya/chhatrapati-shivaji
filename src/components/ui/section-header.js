export default function SectionHeader({ title, subtitle, centered = false }) {
  return (
    <div className={`space-y-4 ${centered ? "text-center" : ""}`}>
      <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground">{title}</h2>
      {subtitle && <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{subtitle}</p>}
    </div>
  )
}
