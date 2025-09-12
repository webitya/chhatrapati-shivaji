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
<section className="py-16 px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
  <div className="space-y-8">
    <h2 className="text-4xl font-extrabold mb-6 text-blue-700 border-l-4 border-blue-500 pl-3">
      About Us
    </h2>
    <p className="text-gray-700 leading-relaxed text-lg">
      At <span className="font-bold text-blue-600">Chhatrapati Shivaji School</span>, we believe
      education is the foundation of a strong and progressive society. Guided by the leadership of our
      Principal, <span className="font-bold text-green-600">Mr. Sikandar Kumar Yadav</span>, the school is
      committed to nurturing young minds with knowledge, discipline, and values that prepare them for the
      challenges of tomorrow.
    </p>
    <p className="text-gray-700 leading-relaxed text-lg">
      Our institution emphasizes both academic excellence and holistic development. Along with a robust
      curriculum, we encourage participation in{" "}
      <span className="font-semibold text-yellow-600">sports</span>,{" "}
      <span className="font-semibold text-purple-600">cultural programs</span>, and{" "}
      <span className="font-semibold text-pink-600">community service</span>, ensuring our students grow
      into confident, responsible, and compassionate individuals.
    </p>
    <p className="text-gray-700 leading-relaxed text-lg">
      With a team of dedicated educators and modern learning resources,{" "}
      <span className="font-bold text-blue-600">Chhatrapati Shivaji School</span> continues to inspire
      students to dream big, think critically, and lead with integrity—just as the great Maratha leader,
      Chhatrapati Shivaji Maharaj, envisioned for a strong and enlightened nation.
    </p>

    {/* Highlight Principal Card */}
    <div className="mt-8 p-6 bg-gray-100 rounded-2xl shadow-md">
      <h3 className="text-xl font-bold text-green-700">Principal s Message</h3>
      <p className="text-gray-700 mt-2">
        <span className="font-semibold text-green-600">Mr. Sikandar Kumar Yadav</span> leads with a
        vision to shape disciplined, knowledgeable, and value-driven students who are prepared for a
        brighter future.
      </p>
    </div>
  </div>

  {/* Smaller Image */}
  <div className="relative w-160 h-160 mx-auto">
    <div className="rounded-2xl overflow-hidden shadow-xl">
      <Image
        src="/about-us.png"
        alt="About Chhatrapati Shivaji School"
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
              src="/award.jpg"
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
