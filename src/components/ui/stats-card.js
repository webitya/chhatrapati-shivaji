import { Card, CardContent } from "@/components/ui/card"

export default function StatsCard({ number, label, icon: Icon, color = "primary" }) {
  const colorClasses = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary bg-secondary/10",
    accent: "text-accent bg-accent/10",
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border bg-card">
      <CardContent className="p-6 text-center space-y-4">
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colorClasses[color]} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <div className="font-serif font-bold text-3xl text-foreground">{number}</div>
          <div className="text-muted-foreground font-medium">{label}</div>
        </div>
      </CardContent>
    </Card>
  )
}
