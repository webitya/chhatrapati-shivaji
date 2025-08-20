export default function ContentSection({ children, className = "", background = "default", padding = "default" }) {
  const backgroundClasses = {
    default: "bg-background",
    muted: "bg-muted",
    card: "bg-card",
    primary: "bg-primary/5",
    secondary: "bg-secondary/5",
  }

  const paddingClasses = {
    none: "",
    sm: "py-8",
    default: "py-16",
    lg: "py-24",
  }

  return (
    <section className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
