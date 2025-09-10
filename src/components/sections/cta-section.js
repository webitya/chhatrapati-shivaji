import Link from "next/link"

export default function CTASection() {
  return (
    <section className="bg-secondary py-16 px-6 md:px-12">
      <div className="text-center max-w-4xl mx-auto space-y-6">
        {/* Heading */}
        <h2 className="font-serif font-bold text-3xl md:text-4xl text-white">
          Ready to Join Our Community?
        </h2>
        <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
          Take the first step towards your child’s bright future. Our admissions team is here to
          guide you through the process and answer any questions you may have.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <Link href="/admission">
            <button className="bg-white text-secondary font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Start Application
            </button>
          </Link>
          <Link href="/contact">
            <button className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-secondary transition">
              Contact Admissions
            </button>
          </Link>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
          <div>
            <h3 className="font-semibold text-lg text-white mb-2">Visit Our Campus</h3>
            <p className="text-white/70 text-sm">Schedule a personalized tour to see our facilities and meet our faculty.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white mb-2">Meet Our Team</h3>
            <p className="text-white/70 text-sm">Connect with our admissions counselors and educational experts.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white mb-2">Apply Today</h3>
            <p className="text-white/70 text-sm">Begin your application process and secure your child’s place with us.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
