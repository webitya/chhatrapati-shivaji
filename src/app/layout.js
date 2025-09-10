import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"
import FloatingContactButtons from "@/components/ui/floating-contact-buttons"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata = {
  title: "Chhatrapati Shivaji High School - Excellence in Education",
  description:
    "Chhatrapati Shivaji High School nurtures young minds through innovative learning, character development, and holistic growth in a supportive environment. Join our vibrant school community and build a bright future for your child.",
  keywords: "School, Education, Holistic Development, Academic Excellence, Chhatrapati Shivaji High School",
  author: "Chhatrapati Shivaji High School",
  generator: "Next.js",
  openGraph: {
    title: "Chhatrapati Shivaji High School",
    description:
      "Nurturing young minds with quality education, character development, and holistic growth.",
    url: "https://www.cshs.edu.in",
    siteName: "Chhatrapati Shivaji High School",
    images: [
      {
        url: "/school-og-image.png",
        width: 1200,
        height: 630,
        alt: "Chhatrapati Shivaji High School",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chhatrapati Shivaji High School",
    description:
      "Excellence in Education: Nurturing young minds through innovative learning and holistic growth.",
    images: ["/school-og-image.png"],
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} antialiased scroll-smooth bg-white`}
    >
      <body className="font-sans text-gray-900">
        {children}
        <FloatingContactButtons />
      </body>
    </html>
  )
}
