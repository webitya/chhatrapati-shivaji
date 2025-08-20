import ContentSection from "@/components/ui/content-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTASection() {
  return (
    <ContentSection background="secondary" padding="lg">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-white">Ready to Join Our Community?</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Take the first step towards your child s bright future. Our admissions team is here to guide you through the
            process and answer any questions you may have.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/admission">
            <Button size="lg" className="bg-white text-secondary hover:bg-white/90 px-8 py-3 text-lg font-semibold">
              Start Application
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-secondary px-8 py-3 text-lg font-semibold bg-transparent"
            >
              Contact Admissions
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20">
          <div className="text-center">
            <h3 className="font-serif font-semibold text-xl text-white mb-2">Visit Our Campus</h3>
            <p className="text-white/80 text-sm">
              Schedule a personalized tour to see our facilities and meet our faculty.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-serif font-semibold text-xl text-white mb-2">Meet Our Team</h3>
            <p className="text-white/80 text-sm">Connect with our admissions counselors and educational experts.</p>
          </div>
          <div className="text-center">
            <h3 className="font-serif font-semibold text-xl text-white mb-2">Apply Today</h3>
            <p className="text-white/80 text-sm">
              Begin your application process and secure your child s place with us.
            </p>
          </div>
        </div>
      </div>
    </ContentSection>
  )
}
