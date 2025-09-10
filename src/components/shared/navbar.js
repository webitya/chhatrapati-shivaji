"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import MenuIcon from "@mui/icons-material/Menu"   // ✅ MUI Hamburger
import { usePathname } from "next/navigation"
import NavbarDrawer from "./navbar-drawer"

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const pathname = usePathname()

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
      <nav className="bg-blue-900/95 backdrop-blur-sm border-b border-blue-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo + School Name */}
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="Chhatrapati Shivaji +2 High School"
                width={48}
                height={48}
                className="rounded-full border border-white"
              />
              <span className="font-serif font-bold leading-tight text-white">
                <span className="block sm:inline">Chhatrapati Shivaji</span>
                <span className="block sm:inline sm:ml-2">+2 High School</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`transition-colors duration-200 font-medium ${
                      isActive
                        ? "text-yellow-300 border-b-2 border-yellow-400 pb-1"
                        : "text-white hover:text-yellow-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
              <Link href="/contact">
                <Button
                  className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    pathname === "/contact"
                      ? "bg-yellow-500 text-blue-900"
                      : "bg-yellow-400 hover:bg-yellow-500 text-blue-900"
                  }`}
                >
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
       {/* Mobile Menu Button */}
<div className="md:hidden flex items-center">
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setIsDrawerOpen(true)}
    className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 rounded-lg text-white"
  >
    <MenuIcon sx={{ fontSize: 36 }} /> {/* ✅ Square + Centered */}
  </Button>
</div>

          </div>
        </div>
      </nav>

      {/* Drawer */}
      <NavbarDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  )
}
