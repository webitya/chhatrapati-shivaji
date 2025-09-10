"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"

export default function NavbarDrawer({ isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

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
        className={`fixed top-0 right-0 h-full w-4/5 sm:w-2/5 bg-blue-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-700 bg-blue-800">
          <h2 className="text-xl font-serif font-bold text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <X className="h-7 w-7 text-white" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-6">
          <div className="space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block py-3 px-4 rounded-lg transition-all duration-200 font-medium border-l-4 ${
                    isActive
                      ? "text-yellow-300 bg-blue-800 border-yellow-400"
                      : "text-white hover:text-yellow-300 hover:bg-blue-800/60 border-transparent hover:border-yellow-400"
                  }`}
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              )
            })}

            {/* Contact Button */}
            <Link
              href="/contact"
              className={`block mt-6 py-3 px-4 rounded-lg text-center font-bold shadow-lg transition-colors duration-200 ${
                pathname === "/contact"
                  ? "bg-yellow-500 text-blue-900"
                  : "bg-yellow-400 hover:bg-yellow-500 text-blue-900"
              }`}
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
