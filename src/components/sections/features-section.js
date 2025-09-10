"use client"

import { motion } from "framer-motion"
import ContentSection from "@/components/ui/content-section"
import SectionHeader from "@/components/ui/section-header"
import { BookOpen, Users, Award, Microscope, Palette, Music, Calculator, Globe } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Academic Excellence",
    description:
      "Comprehensive curriculum designed to challenge and inspire students across all grade levels with innovative teaching methods.",
  },
  {
    icon: Users,
    title: "Small Class Sizes",
    description:
      "Personalized attention with low student-to-teacher ratios ensuring every child receives the support they need to thrive.",
  },
  {
    icon: Award,
    title: "Award-Winning Programs",
    description:
      "Nationally recognized programs in academics, arts, and athletics that prepare students for future success.",
  },
  {
    icon: Microscope,
    title: "STEM Focus",
    description:
      "State-of-the-art science labs and technology integration to prepare students for the digital future.",
  },
  {
    icon: Palette,
    title: "Creative Arts",
    description:
      "Comprehensive arts program including visual arts, theater, and creative writing to nurture artistic expression.",
  },
  {
    icon: Music,
    title: "Music Program",
    description:
      "Full music curriculum with band, choir, and individual instruction to develop musical talents and appreciation.",
  },
  {
    icon: Calculator,
    title: "Advanced Mathematics",
    description:
      "Rigorous math curriculum from foundational concepts to advanced calculus and statistics preparation.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description:
      "International programs and cultural exchange opportunities to develop global citizenship and awareness.",
  },
]

export default function FeaturesSection() {
  return (
    <ContentSection background="muted" padding="lg">
      <div className="space-y-16">
    <SectionHeader
  title="Why Choose Bright Future School?"
  subtitle="Discover what makes our educational approach unique and effective for student success."
  centered
  className="text-center max-w-3xl mx-auto"
/>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-start p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition"
              >
                {/* Icon */}
                <div className="mb-4 p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-50/50 to-transparent transition pointer-events-none" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </ContentSection>
  )
}
