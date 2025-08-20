"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import ContentSection from "@/components/ui/content-section"
import SectionHeader from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["Chhatrapati Shivaji +2 High School", "Education District, India"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 86512 86714", "+91 86512 86714 (Admissions)"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["chatrapatishivaji4321@gmail.com", "chatrapatishivaji4321@gmail.com"],
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 8:00 AM - 5:00 PM", "Saturday: 9:00 AM - 2:00 PM"],
    },
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <ContentSection background="bg-blue-50" padding="py-16">
        <div className="text-center space-y-4">
          <SectionHeader
            title="Contact Us"
            subtitle="We're here to help and answer any questions you may have"
            centered
          />
        </div>
      </ContentSection>

      {/* Contact Information */}
      <ContentSection padding="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="text-center bg-white border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="pb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                  <info.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-gray-900">{info.title}</h3>
              </CardHeader>
              <CardContent className="pt-0">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-sm">
                    {detail}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <SectionHeader title="Send Us a Message" subtitle="We'll get back to you within 24 hours" />

            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-white border-gray-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white border-gray-300"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-white border-gray-300"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="bg-white border-gray-300"
                        placeholder="What is this regarding?"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-white border-gray-300"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm">
                        Thank you for your message! We will get back to you within 24 hours.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">
                        Sorry, there was an error sending your message. Please try again or contact us directly.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Map and Additional Info */}
          <div className="space-y-8">
            <SectionHeader title="Visit Our Campus" subtitle="Come see what makes our school special" />

            {/* Map Placeholder */}
            <Card className="bg-white border-gray-200">
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="h-12 w-12 text-blue-600 mx-auto" />
                    <p className="text-gray-600">Interactive Map</p>
                    <p className="text-sm text-gray-600">
                      Chhatrapati Shivaji +2 High School, Education District, India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <h3 className="font-serif font-semibold text-xl text-gray-900">Campus Tours</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We offer guided campus tours every Tuesday and Thursday at 10:00 AM and 2:00 PM. Weekend tours are
                  available by appointment.
                </p>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">Schedule a Tour</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </ContentSection>
    </MainLayout>
  )
}
