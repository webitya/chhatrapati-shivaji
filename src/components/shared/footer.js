"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import {
  School,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [dateTime, setDateTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedDate = dateTime.toLocaleDateString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const hours = dateTime.getHours().toString().padStart(2, "0")
  const minutes = dateTime.getMinutes().toString().padStart(2, "0")
  const seconds = dateTime.getSeconds().toString().padStart(2, "0")

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section: 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* About School */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <School className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-semibold">Our School</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Chhatrapati Shivaji +2 High School is dedicated to academic
              excellence and holistic development of students with values,
              discipline, and knowledge.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-yellow-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/notices"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Notices
                </Link>
              </li>
              <li>
                <Link
                  href="/admission"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Admission
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-yellow-400" />
                <span>Daru Hazaribagh, Jharkhand, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-yellow-400" />
                <span>+91 8651286714 </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-yellow-400" />
                <span>chatrapatishivaji4321@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <form className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-blue-900 placeholder:text-gray-500"
              />
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900">
                Subscribe
              </Button>
            </form>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="hover:text-yellow-400">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-yellow-400">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-yellow-400">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-yellow-400">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            © 2025 Chhatrapati Shivaji +2 High School. All rights reserved.
          </p>

          {/* ✅ Live Date & Time */}
          <div className="mt-4 sm:mt-0 text-sm font-mono">
            <span className="text-gray-300">{formattedDate} </span>
            <span className="ml-2">
              <span className="text-yellow-400">{hours}</span>:
              <span className="text-yellow-400">{minutes}</span>:
              <span className="text-red-400">{seconds}</span>
            </span>
          </div>

          {/* Policies + Admin */}
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-gray-300 hover:text-yellow-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-300 hover:text-yellow-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link href="/admin">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-yellow-400 flex items-center space-x-1"
              >
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
