import { Card, CardContent } from "@/components/ui/card"

export default function FeatureCard({ icon: Icon, title, description, className = "" }) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 border-border bg-card ${className}`}>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-serif font-semibold text-xl text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
