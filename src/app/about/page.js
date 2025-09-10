import MainLayout from "@/components/layout/main-layout"
import Image from "next/image"
import { Groups, TrackChanges, Favorite, EmojiEvents, MenuBook, Public } from "@mui/icons-material"

export const metadata = {
  title: "About Us - Bright Future School",
  description: "Learn about our mission, vision, and commitment to educational excellence at Bright Future School.",
}

export default function AboutPage() {
  const values = [
    {
      icon: <TrackChanges className="text-blue-600 w-8 h-8" />,
      title: "Excellence",
      description: "We strive for the highest standards in education, character development, and personal growth.",
    },
    {
      icon: <Favorite className="text-red-500 w-8 h-8" />,
      title: "Compassion",
      description: "We foster a caring environment where every student feels valued, supported, and understood.",
    },
    {
      icon: <Groups className="text-green-600 w-8 h-8" />,
      title: "Community",
      description: "We build strong partnerships between students, families, faculty, and the broader community.",
    },
    {
      icon: <EmojiEvents className="text-yellow-500 w-8 h-8" />,
      title: "Integrity",
      description: "We uphold the highest ethical standards and teach our students to do the same.",
    },
    {
      icon: <MenuBook className="text-purple-600 w-8 h-8" />,
      title: "Innovation",
      description: "We embrace new ideas, technologies, and teaching methods to enhance learning experiences.",
    },
    {
      icon: <Public className="text-teal-600 w-8 h-8" />,
      title: "Global Citizenship",
      description: "We prepare students to be responsible, engaged citizens in an interconnected world.",
    },
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">About Bright Future School</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Nurturing minds, building character, creating tomorrow s leaders
        </p>
        <div className="mt-8 max-w-4xl mx-auto">
          <p className="text-base leading-relaxed text-white/90">
            For nearly four decades, Bright Future School has been a beacon of educational
            excellence, committed to developing well-rounded individuals who are prepared to make
            meaningful contributions to society.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide a comprehensive, innovative education that challenges students academically,
              develops their character, and prepares them to be confident, compassionate, and capable
              leaders in an ever-changing world.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be the premier educational institution that inspires lifelong learning, fosters
              creativity and critical thinking, and graduates students who are equipped to solve
              complex global challenges with integrity and innovation.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/school-mission-vision.png"
              alt="Our Mission and Vision"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Core Values</h2>
          <p className="text-gray-600 mt-2">
            The principles that guide everything we do
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* History */}
      <section className="py-16 px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/placeholder-9nsjm.png"
              alt="School History"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Rich History</h2>
          <p className="text-gray-600 mb-8">
            Building excellence since 1985
          </p>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="font-semibold text-lg mb-1">1985 - Foundation</h3>
              <p className="text-gray-600 text-sm">
                Bright Future School was founded with a vision to provide quality education that
                nurtures both academic excellence and character development.
              </p>
            </div>
            <div className="border-l-4 border-green-600 pl-6">
              <h3 className="font-semibold text-lg mb-1">1995 - Expansion</h3>
              <p className="text-gray-600 text-sm">
                Added state-of-the-art science laboratories and expanded our campus to accommodate
                growing enrollment.
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-6">
              <h3 className="font-semibold text-lg mb-1">2010 - Innovation</h3>
              <p className="text-gray-600 text-sm">
                Introduced cutting-edge technology integration and launched our award-winning STEM
                program.
              </p>
            </div>
            <div className="border-l-4 border-purple-600 pl-6">
              <h3 className="font-semibold text-lg mb-1">2024 - Excellence</h3>
              <p className="text-gray-600 text-sm">
                Celebrating nearly 40 years of educational excellence with over 5,000 successful
                graduates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
