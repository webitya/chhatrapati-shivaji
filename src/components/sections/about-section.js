import ContentSection from "@/components/ui/content-section"
import SectionHeader from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function AboutSection() {
  return (
    <ContentSection padding="lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <SectionHeader
            title="About Bright Future School"
            subtitle="A legacy of educational excellence spanning nearly four decades."
          />

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Founded in 1985, Bright Future School has been at the forefront of innovative education, nurturing young
              minds and preparing them for the challenges of tomorrow. Our commitment to academic excellence, character
              development, and holistic growth has made us a trusted choice for families in our community.
            </p>

            <p>
              We believe that every child is unique and deserves an education that recognizes their individual
              strengths, interests, and learning style. Our dedicated faculty and staff work tirelessly to create an
              environment where students can explore, discover, and achieve their full potential.
            </p>

            <p>
              With state-of-the-art facilities, innovative teaching methods, and a comprehensive curriculum that
              balances academics with arts, athletics, and character education, we prepare our students not just for
              academic success, but for life success.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/about">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Learn More About Us</Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
              >
                Schedule a Visit
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Image src="/modern-school-students.png" alt="Bright Future School Campus" fill className="object-cover" />
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-xl"></div>
        </div>
      </div>
    </ContentSection>
  )
}
