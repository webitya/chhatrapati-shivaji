import ContentSection from "@/components/ui/content-section"
import SectionHeader from "@/components/ui/section-header"
import FeatureCard from "@/components/ui/feature-card"
import { BookOpen, Users, Award, Microscope, Palette, Music, Calculator, Globe } from "lucide-react"

export default function FeaturesSection() {
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

  return (
    <ContentSection background="muted" padding="lg">
      <div className="space-y-16">
        <SectionHeader
          title="Why Choose Bright Future School?"
          subtitle="Discover what makes our educational approach unique and effective for student success."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </ContentSection>
  )
}
