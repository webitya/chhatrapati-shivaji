"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

// --- 3D Elements --- //
function SchoolBuilding3D() {
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={[0, -1, 0]} scale={[1, 1, 1]}>
        {/* Ground Floor */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[3, 1.2, 1.5]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        {/* First Floor */}
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[3, 1.2, 1.5]} />
          <meshStandardMaterial color="#fde68a" />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 3.2, 0]}>
          <coneGeometry args={[2.5, 1, 4]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        {/* Door */}
        <mesh position={[0, 0.2, 0.76]}>
          <boxGeometry args={[0.6, 0.8, 0.05]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        {/* Windows */}
        {[-1, 0, 1].map((x) => (
          <mesh key={`g-${x}`} position={[x, 1.2, 0.76]}>
            <boxGeometry args={[0.4, 0.4, 0.05]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
        ))}
        {[-1, 0, 1].map((x) => (
          <mesh key={`f-${x}`} position={[x, 2.6, 0.76]}>
            <boxGeometry args={[0.4, 0.4, 0.05]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
        ))}
        {/* Flag Pole */}
        <mesh position={[0, 4.2, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        <mesh position={[0.4, 4.6, 0]}>
          <boxGeometry args={[0.8, 0.4, 0.05]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>
      </group>
    </Float>
  )
}

function Trees() {
  return (
    <>
      {[-4, -2, 4, 6].map((x, i) => (
        <group key={i} position={[x, -1, -2]}>
          <mesh>
            <cylinderGeometry args={[0.1, 0.1, 1]} />
            <meshStandardMaterial color="#8b5a2b" />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial color="#228b22" />
          </mesh>
        </group>
      ))}
    </>
  )
}

function SchoolBus() {
  return (
    <group position={[3, -0.5, 2]} scale={[1, 1, 1]}>
      <mesh>
        <boxGeometry args={[3, 1, 1]} />
        <meshStandardMaterial color="#facc15" />
      </mesh>
      {[-1, 1].map((x) =>
        [-0.4, 0.4].map((z, i) => (
          <mesh key={`${x}-${i}`} position={[x, -0.6, z]}>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
            <meshStandardMaterial color="black" />
          </mesh>
        ))
      )}
      {[ -1, 0, 1 ].map((x, i) => (
        <mesh key={i} position={[x, 0.2, 0.52]}>
          <boxGeometry args={[0.8, 0.5, 0.05]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
      ))}
    </group>
  )
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <SchoolBuilding3D />
      <Trees />
      <SchoolBus />
      <Environment preset="sunset" />
    </>
  )
}

// --- Hero Section --- //
export default function HeroSection() {
  return (
    <section
      className="relative h-[90vh] w-full flex flex-col md:flex-row items-center justify-center px-6 md:px-12 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/modern-school-students.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

      {/* Left Text (40%) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col justify-center items-start text-left w-full md:basis-2/5 md:pr-8"
      >
        <span className="block text-yellow-400 text-sm md:text-base mb-2 uppercase tracking-widest">
          Excellence in Education Since 1985
        </span>

        <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-white leading-tight">
          Chhatrapati Shivaji High School
        </h1>

        <p className="text-sm sm:text-base text-gray-200 mt-3">
          Nurturing young minds through innovative education, character
          development, and holistic growth in a supportive learning environment.
        </p>

        <div className="flex gap-3 mt-5">
          <Link href="/admission">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-5 py-2 text-sm font-bold rounded-md shadow-md">
              Apply Now
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-900 px-5 py-2 text-sm font-bold rounded-md shadow-md"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Right 3D (60%) */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center justify-center w-full md:basis-3/5 h-[50vh] md:h-[70vh] mt-6 md:mt-0"
      >
        <Canvas camera={{ position: [0, 2, 10], fov: 50 }} className="w-full h-full">
          <Suspense fallback={null}>
            <Scene3D />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </motion.div>
    </section>
  )
}
