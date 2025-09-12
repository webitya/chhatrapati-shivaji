import MainLayout from "@/components/layout/main-layout"
import Link from "next/link"
import { FileText, Calendar, Users, CheckCircle } from "lucide-react"

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

  const images = [
    "/campus1.jpg",
    "/campus2.jpg",
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Join Our School Community</h1>
        <p className="text-lg mb-8">Begin your child s journey to academic excellence and personal growth</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/contact">
            <button className="px-8 py-3 text-lg font-semibold bg-white text-primary rounded hover:bg-white/90 transition">
              Start Application
            </button>
          </Link>
          <button className="px-8 py-3 text-lg font-semibold border border-white text-white rounded hover:bg-white hover:text-primary transition">
            Schedule Visit
          </button>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Admission Process</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A simple, straightforward process designed to help us get to know your child
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {admissionSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
                <Icon className="mx-auto mb-4 text-primary w-10 h-10" />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Requirements & Image Gallery */}
    <section className="relative bg-gradient-to-r from-yellow-400 to-[rgb(240,177,0)] py-24 px-6 lg:px-12">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    
    {/* Left: Admission Requirements */}
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Admission Requirements</h2>
      <p className="text-gray-700 mb-6">
        Documents and information needed for application
      </p>
      <ul className="space-y-3">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-blue-700 flex-shrink-0" />
            <span className="text-gray-900">{req}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Right: Campus Life & Facilities */}
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Campus Life & Facilities</h2>
      <p className="text-gray-700">
        Explore our vibrant campus and state-of-the-art facilities
      </p>
      <div className="grid grid-cols-2 gap-4">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-xl shadow-md">
            <img
              src={src}
              alt={`Campus image ${index + 1}`}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


    </MainLayout>
  )
}
