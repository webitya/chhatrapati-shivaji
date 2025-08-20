"use client"

import { Button } from "@/components/ui/button"

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  backgroundImage,
  children,
}) {
  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
          : {}
      }
    >
      {backgroundImage && <div className="absolute inset-0 bg-black/40" />}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {subtitle && (
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm">{subtitle}</span>
            </div>
          )}

          <h1 className="font-serif font-black text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight">
            {title}
          </h1>

          {description && (
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{description}</p>
          )}

          {(primaryButton || secondaryButton) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {primaryButton && (
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
                  onClick={primaryButton.onClick}
                >
                  {primaryButton.text}
                </Button>
              )}
              {secondaryButton && (
                <Button
                  variant="outline"
                  size="lg"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-3 text-lg font-semibold bg-transparent"
                  onClick={secondaryButton.onClick}
                >
                  {secondaryButton.text}
                </Button>
              )}
            </div>
          )}

          {children}
        </div>
      </div>
    </section>
  )
}
