import MainLayout from "@/components/layout/main-layout"
import HeroSection from "@/components/sections/hero-section"
import FeaturesSection from "@/components/sections/features-section"
import StatsSection from "@/components/sections/stats-section"
import AboutSection from "@/components/sections/about-section"
import CTASection from "@/components/sections/cta-section"

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <AboutSection />
      <CTASection />
    </MainLayout>
  )
}
