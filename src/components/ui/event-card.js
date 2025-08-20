import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock } from "lucide-react"
import Image from "next/image"

export default function EventCard({ title, description, date, time, location, category, image, className = "" }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card
      className={`group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card ${className}`}
    >
      {image && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground">{category}</Badge>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <h3 className="font-serif font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(date)}</span>
          </div>
          {time && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{time}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
