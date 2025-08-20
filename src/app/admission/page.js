import MainLayout from "@/components/layout/main-layout"
import ContentSection from "@/components/ui/content-section"
import SectionHeader from "@/components/ui/section-header"
import FeatureCard from "@/components/ui/feature-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FileText, Calendar, Users, CheckCircle, Clock, DollarSign } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Admission - Bright Future School",
  description: "Learn about our admission process, requirements, and how to apply to Bright Future School.",
}

export default function AdmissionPage() {
  const admissionSteps = [
    {
      icon: FileText,
      title: "Submit Application",
      description: "Complete and submit the online application form with all required documents and information.",
    },
    {
      icon: Calendar,
      title: "Schedule Interview",
      description: "Schedule a personal interview with our admissions team to discuss your child's needs and goals.",
    },
    {
      icon: Users,
      title: "Campus Visit",
      description: "Take a guided tour of our facilities and meet with teachers and current students.",
    },
    {
      icon: CheckCircle,
      title: "Admission Decision",
      description: "Receive your admission decision and enrollment information within 2-3 weeks.",
    },
  ]

  const requirements = [
    "Completed application form",
    "Birth certificate or passport copy",
    "Previous school transcripts (if applicable)",
    "Immunization records",
    "Two passport-size photographs",
    "Application fee payment",
  ]

  const tuitionFees = [
    { grade: "Pre-K (Ages 3-4)", fee: "$8,500", description: "Half-day program with extended care options" },
    { grade: "Kindergarten - Grade 2", fee: "$12,000", description: "Full-day program with lunch included" },
    { grade: "Grades 3-5", fee: "$13,500", description: "Enhanced curriculum with specialist teachers" },
    { grade: "Grades 6-8", fee: "$15,000", description: "Middle school program with advanced courses" },
    { grade: "Grades 9-12", fee: "$17,500", description: "High school with AP courses and college prep" },
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <ContentSection background="primary" padding="lg">
        <div className="text-center space-y-8">
          <SectionHeader
            title="Join Our School Community"
            subtitle="Begin your child's journey to academic excellence and personal growth"
            centered
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg font-semibold">
                Start Application
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg font-semibold bg-transparent"
            >
              Schedule Visit
            </Button>
          </div>
        </div>
      </ContentSection>

      {/* Admission Process */}
      <ContentSection padding="lg">
        <div className="space-y-16">
          <SectionHeader
            title="Admission Process"
            subtitle="A simple, straightforward process designed to help us get to know your child"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {admissionSteps.map((step, index) => (
              <div key={index} className="relative">
                <FeatureCard icon={step.icon} title={step.title} description={step.description} className="h-full" />
                {index < admissionSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-primary"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* Requirements */}
      <ContentSection background="muted" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <SectionHeader title="Admission Requirements" subtitle="Documents and information needed for application" />
            <Card className="bg-card border-border">
              <CardHeader>
                <h3 className="font-serif font-semibold text-xl text-foreground">Required Documents</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <SectionHeader title="Important Dates" subtitle="Key deadlines and dates to remember" />
            <div className="space-y-4">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Application Deadline</h4>
                  </div>
                  <p className="text-muted-foreground">March 15, 2025 for Fall 2025 enrollment</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <Clock className="h-5 w-5 text-secondary" />
                    <h4 className="font-semibold text-foreground">Decision Notification</h4>
                  </div>
                  <p className="text-muted-foreground">April 1, 2025</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <DollarSign className="h-5 w-5 text-accent" />
                    <h4 className="font-semibold text-foreground">Enrollment Deposit Due</h4>
                  </div>
                  <p className="text-muted-foreground">April 15, 2025</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Tuition & Fees */}
      <ContentSection padding="lg">
        <div className="space-y-16">
          <SectionHeader
            title="Tuition & Fees"
            subtitle="Transparent pricing for quality education (Annual tuition for 2024-2025)"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tuitionFees.map((item, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <h3 className="font-serif font-semibold text-lg text-foreground">{item.grade}</h3>
                  <div className="text-3xl font-bold text-primary">{item.fee}</div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Financial aid and scholarship opportunities are available. Contact our admissions office for more
              information.
            </p>
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Inquire About Financial Aid
              </Button>
            </Link>
          </div>
        </div>
      </ContentSection>
    </MainLayout>
  )
}
