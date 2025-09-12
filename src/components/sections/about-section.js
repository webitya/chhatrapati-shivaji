"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutSection() {
  return (
    <section className="py-20 px-6 lg:px-32 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-snug">
              About{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Chhatrapati Shivaji +2 High School
              </span>
            </h2>
            <p className="mt-3 text-lg text-gray-700 italic">
              A legacy of educational excellence spanning nearly four decades.
            </p>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Founded in <span className="font-semibold text-blue-700">1985</span>, 
              Chhatrapati Shivaji +2 High School has been at the forefront of{" "}
              <span className="underline decoration-blue-400">innovative education</span>, 
              nurturing young minds and preparing them for the challenges of tomorrow.
            </p>

            <p>
              We believe that every child is unique and deserves an education that
              recognizes their individual strengths, interests, and learning style.
              Our dedicated faculty and staff create an environment where students
              can <span className="font-medium text-indigo-700">explore, discover, and achieve</span>
              their full potential.
            </p>

            <p>
              With state-of-the-art facilities, innovative teaching methods, and a
              comprehensive curriculum balancing{" "}
              <span className="text-blue-700 font-semibold">academics, arts, athletics,</span> 
              and <span className="text-indigo-700 font-semibold">character education</span>, 
              we prepare our students not just for academic success, but for{" "}
              <span className="font-bold">life success</span>.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 mt-6"
          >
            <Link href="/about" className="inline-block">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300">
                Learn More About Us
              </button>
            </Link>
            <Link href="/contact" className="inline-block">
              <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 hover:scale-105 transition-transform duration-300">
                Schedule a Visit
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src="/modern-school-students.png"
              alt="Chhatrapati Shivaji +2 High School Campus"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Subtle Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
