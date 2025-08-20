"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"

export default function NavbarDrawer({ isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Notices", href: "/notices" },
    { name: "Admission", href: "/admission" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
  ]

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-serif font-bold text-gray-900">Menu</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-6">
          <div className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 px-4 text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium border-l-4 border-transparent hover:border-blue-600"
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}

            {/* Contact Button */}
            <Link
              href="/contact"
              className="block mt-6 py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 text-center font-medium shadow-lg"
              onClick={onClose}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
