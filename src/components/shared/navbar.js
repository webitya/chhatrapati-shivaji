"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, School } from "lucide-react"
import NavbarDrawer from "./navbar-drawer"

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Notices", href: "/notices" },
    { name: "Admission", href: "/admission" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
  ]

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <School className="h-8 w-8 text-blue-600" />
              <span className="font-serif font-bold text-xl text-gray-900">Chhatrapati Shivaji +2 High School</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-900 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                  Contact Us
                </Button>
              </Link>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsDrawerOpen(true)} className="text-gray-900">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <NavbarDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  )
}
