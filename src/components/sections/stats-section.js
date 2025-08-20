import ContentSection from "@/components/ui/content-section"
import StatsCard from "@/components/ui/stats-card"
import { Users, GraduationCap, Award, BookOpen } from "lucide-react"

export default function StatsSection() {
  const stats = [
    {
      number: "1,200+",
      label: "Active Students",
      icon: Users,
      color: "primary",
    },
    {
      number: "98%",
      label: "Graduation Rate",
      icon: GraduationCap,
      color: "secondary",
    },
    {
      number: "50+",
      label: "Awards Won",
      icon: Award,
      color: "accent",
    },
    {
      number: "25+",
      label: "Programs Offered",
      icon: BookOpen,
      color: "primary",
    },
  ]

  return (
    <ContentSection background="primary" padding="lg">
      <div className="text-center space-y-16">
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-white">Our Achievements</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Numbers that reflect our commitment to educational excellence and student success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} number={stat.number} label={stat.label} icon={stat.icon} color={stat.color} />
          ))}
        </div>
      </div>
    </ContentSection>
  )
}
