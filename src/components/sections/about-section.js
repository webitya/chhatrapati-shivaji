import Image from "next/image"
import Link from "next/link"

export default function AboutSection() {
  return (
    <section className="py-16 px-6 lg:px-32 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              About Chhatrapati Shivaji +2 High School
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              A legacy of educational excellence spanning nearly four decades.
            </p>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Founded in 1985, Chhatrapati Shivaji +2 High School has been at the forefront of innovative education, nurturing young
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

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/about" className="inline-block">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                Learn More About Us
              </button>
            </Link>
            <Link href="/contact" className="inline-block">
              <button className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition">
                Schedule a Visit
              </button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/modern-school-students.png"
              alt="Chhatrapati Shivaji +2 High School Campus"
              fill
              className="object-cover"
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200 rounded-full blur-xl"></div>
        </div>
      </div>
    </section>
  )
}
