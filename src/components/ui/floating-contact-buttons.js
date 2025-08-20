"use client"

import { FaWhatsapp, FaPhone } from "react-icons/fa"

export default function FloatingContactButtons() {
  const phoneNumber = "+918651286714"
  const whatsappNumber = "918651286714"

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`, "_self")
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I would like to know more about Chhatrapati Shivaji +2 High School.")
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-[99999] flex flex-col gap-2"
      style={{ position: "fixed", bottom: "16px", right: "16px", zIndex: 99999 }}
    >
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-4 h-4" />
      </button>

      {/* Call Button */}
      <button
        onClick={handleCall}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        title="Call Us"
      >
        <FaPhone className="w-4 h-4" />
      </button>
    </div>
  )
}
