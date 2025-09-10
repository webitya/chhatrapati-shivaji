export default function SectionHeader({ title, subtitle, centered = false, className = "" }) {
  return (
    <div className={`${centered ? "text-center" : "text-left"} ${className}`}>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mt-4 text-lg text-gray-600">{subtitle}</p>
    </div>
  )
}
