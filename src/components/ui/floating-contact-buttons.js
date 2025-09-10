"use client"

import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import PhoneIcon from "@mui/icons-material/Phone"

export default function FloatingContactButtons() {
  const phoneNumber = "+918651286714"
  const whatsappNumber = "918651286714"

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`, "_self")
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello! I would like to know more about Chhatrapati Shivaji +2 High School."
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  return (
    <div className="fixed bottom-4 right-4 z-[99999] flex flex-col gap-2">
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-full shadow-md text-sm transition-all duration-300 hover:scale-105"
      >
        <WhatsAppIcon fontSize="small" />
        <span>WhatsApp</span>
      </button>

      {/* Call Button */}
      <button
        onClick={handleCall}
        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full shadow-md text-sm transition-all duration-300 hover:scale-105"
      >
        <PhoneIcon fontSize="small" />
        <span>Call Now</span>
      </button>
    </div>
  )
}
