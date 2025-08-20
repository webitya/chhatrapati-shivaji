import MainLayout from "@/components/layout/main-layout"
import ContentSection from "@/components/ui/content-section"
import SectionHeader from "@/components/ui/section-header"
import FeatureCard from "@/components/ui/feature-card"
import { Users, Target, Heart, Award, BookOpen, Globe } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "About Us - Bright Future School",
  description: "Learn about our mission, vision, and commitment to educational excellence at Bright Future School.",
}

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest standards in education, character development, and personal growth.",
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "We foster a caring environment where every student feels valued, supported, and understood.",
    },
    {
      icon: Users,
      title: "Community",
      description: "We build strong partnerships between students, families, faculty, and the broader community.",
    },
    {
      icon: Award,
      title: "Integrity",
      description: "We uphold the highest ethical standards and teach our students to do the same.",
    },
    {
      icon: BookOpen,
      title: "Innovation",
      description: "We embrace new ideas, technologies, and teaching methods to enhance learning experiences.",
    },
    {
      icon: Globe,
      title: "Global Citizenship",
      description: "We prepare students to be responsible, engaged citizens in an interconnected world.",
    },
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <ContentSection background="primary" padding="lg">
        <div className="text-center space-y-8">
          <SectionHeader
            title="About Bright Future School"
            subtitle="Nurturing minds, building character, creating tomorrow's leaders"
            centered
          />
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-white/90 leading-relaxed">
              For nearly four decades, Bright Future School has been a beacon of educational excellence, committed to
              developing well-rounded individuals who are prepared to make meaningful contributions to society.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Mission & Vision */}
      <ContentSection padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="font-serif font-bold text-3xl text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To provide a comprehensive, innovative education that challenges students academically, develops their
                character, and prepares them to be confident, compassionate, and capable leaders in an ever-changing
                world.
              </p>
            </div>
            <div>
              <h2 className="font-serif font-bold text-3xl text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be the premier educational institution that inspires lifelong learning, fosters creativity and
                critical thinking, and graduates students who are equipped to solve complex global challenges with
                integrity and innovation.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image src="/school-mission-vision.png" alt="Our Mission and Vision" fill className="object-cover" />
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Core Values */}
      <ContentSection background="muted" padding="lg">
        <div className="space-y-16">
          <SectionHeader title="Our Core Values" subtitle="The principles that guide everything we do" centered />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <FeatureCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
                className="h-full"
              />
            ))}
          </div>
        </div>
      </ContentSection>

      {/* History */}
      <ContentSection padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
              <Image src="/placeholder-9nsjm.png" alt="School History" fill className="object-cover" />
            </div>
          </div>
          <div className="space-y-8">
            <SectionHeader title="Our Rich History" subtitle="Building excellence since 1985" />
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="font-serif font-semibold text-xl text-foreground mb-2">1985 - Foundation</h3>
                <p className="text-muted-foreground">
                  Bright Future School was founded with a vision to provide quality education that nurtures both
                  academic excellence and character development.
                </p>
              </div>
              <div className="border-l-4 border-secondary pl-6">
                <h3 className="font-serif font-semibold text-xl text-foreground mb-2">1995 - Expansion</h3>
                <p className="text-muted-foreground">
                  Added state-of-the-art science laboratories and expanded our campus to accommodate growing enrollment.
                </p>
              </div>
              <div className="border-l-4 border-accent pl-6">
                <h3 className="font-serif font-semibold text-xl text-foreground mb-2">2010 - Innovation</h3>
                <p className="text-muted-foreground">
                  Introduced cutting-edge technology integration and launched our award-winning STEM program.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="font-serif font-semibold text-xl text-foreground mb-2">2024 - Excellence</h3>
                <p className="text-muted-foreground">
                  Celebrating nearly 40 years of educational excellence with over 5,000 successful graduates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>
    </MainLayout>
  )
}
