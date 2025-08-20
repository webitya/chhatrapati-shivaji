import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function ImageCard({ src, alt, title, description, className = "", aspectRatio = "aspect-video" }) {
  return (
    <Card
      className={`group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card ${className}`}
    >
      <div className={`relative ${aspectRatio} overflow-hidden`}>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      {(title || description) && (
        <CardContent className="p-6 space-y-2">
          {title && <h3 className="font-serif font-semibold text-lg text-foreground">{title}</h3>}
          {description && <p className="text-muted-foreground leading-relaxed">{description}</p>}
        </CardContent>
      )}
    </Card>
  )
}
