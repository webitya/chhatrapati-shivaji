import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

export default function NoticeCard({ title, content, date, category, priority = "normal", className = "" }) {
  const priorityColors = {
    low: "bg-secondary/10 text-secondary",
    normal: "bg-primary/10 text-primary",
    high: "bg-destructive/10 text-destructive",
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 border-border bg-card ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <Badge className={priorityColors[priority]}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(date)}</span>
          </div>
          {category && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{category}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground leading-relaxed">{content}</p>
      </CardContent>
    </Card>
  )
}
