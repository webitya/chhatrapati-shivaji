import Link from "next/link"
import { School, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <School className="h-8 w-8 text-blue-600" />
              <span className="font-serif font-bold text-xl text-gray-900">Chhatrapati Shivaji +2 High School</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nurturing young minds and building bright futures through quality education, character development, and
              holistic growth since 1985.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-gray-900">Quick Links</h3>
            <div className="space-y-2">
              {[
                { name: "About Us", href: "/about" },
                { name: "Admission Process", href: "/admission" },
                { name: "Academic Programs", href: "/academics" },
                { name: "Student Life", href: "/student-life" },
                { name: "Faculty", href: "/faculty" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-gray-900">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-600">
                  <p>Chhatrapati Shivaji +2 High School</p>
                  <p>Education District, India</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-600">+91 86512 86714</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-600">chatrapatishivaji4321@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-gray-900">Stay Updated</h3>
            <p className="text-sm text-gray-600">Subscribe to our newsletter for latest updates and announcements.</p>
            <div className="space-y-2">
              <Input type="email" placeholder="Enter your email" className="bg-white border-gray-300" />
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">© 2024 Chhatrapati Shivaji +2 High School. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/admin">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
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
