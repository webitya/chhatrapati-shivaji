import ContentSection from "@/components/ui/content-section"
import { Users, GraduationCap, Award, BookOpen } from "lucide-react"

export default function StatsSection() {
  const stats = [
    { number: "1,200+", label: "Active Students", icon: Users },
    { number: "98%", label: "Graduation Rate", icon: GraduationCap },
    { number: "50+", label: "Awards Won", icon: Award },
    { number: "25+", label: "Programs Offered", icon: BookOpen },
  ]

  return (
    <ContentSection background="muted" padding="lg">
      <div className="text-center space-y-1">
        {/* Heading */}
        <div className="space-y-3">
          <h2 className="font-serif font-extrabold text-3xl md:text-5xl text-blue-900">
            Our Achievements
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Numbers that showcase our legacy of excellence and dedication to student success.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-400 text-blue-900 mb-4">
                <stat.icon className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{stat.number}</h3>
              <p className="mt-2 text-sm md:text-base text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </ContentSection>
  )
}
