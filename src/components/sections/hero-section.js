"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function SchoolBuilding3D() {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[0, -1, 0]}>
        {/* Main Building */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[3, 2, 1.5]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>

        {/* Roof */}
        <mesh position={[0, 2.2, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[2, 0.8, 4]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>

        {/* Windows */}
        <mesh position={[-0.8, 1.2, 0.76]}>
          <boxGeometry args={[0.4, 0.4, 0.02]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
        <mesh position={[0, 1.2, 0.76]}>
          <boxGeometry args={[0.4, 0.4, 0.02]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
        <mesh position={[0.8, 1.2, 0.76]}>
          <boxGeometry args={[0.4, 0.4, 0.02]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>

        {/* Door */}
        <mesh position={[0, 0.4, 0.76]}>
          <boxGeometry args={[0.6, 0.8, 0.02]} />
          <meshStandardMaterial color="#4b5563" />
        </mesh>

        {/* Flag Pole */}
        <mesh position={[2, 1.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 3]} />
          <meshStandardMaterial color="#4b5563" />
        </mesh>

        {/* Flag */}
        <mesh position={[2.3, 2.5, 0]}>
          <boxGeometry args={[0.6, 0.4, 0.01]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
      </group>
    </Float>
  )
}

function FloatingBooks() {
  return (
    <>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8} position={[-3, 1, -2]}>
        <mesh>
          <boxGeometry args={[0.3, 0.4, 0.05]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6} position={[3, 2, -1]}>
        <mesh>
          <boxGeometry args={[0.3, 0.4, 0.05]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
      </Float>
      <Float speed={2.2} rotationIntensity={0.2} floatIntensity={0.7} position={[-2, -1, 1]}>
        <mesh>
          <boxGeometry args={[0.3, 0.4, 0.05]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
      </Float>
    </>
  )
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <SchoolBuilding3D />
      <FloatingBooks />
      <Environment preset="sunset" />
    </>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene3D />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm">Excellence in Education Since 1985</span>
            </div>

            <h1 className="font-serif font-black text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight">
              Building
              <span className="text-primary"> Bright </span>
              Futures
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Nurturing young minds through innovative education, character development, and holistic growth in a
              supportive learning environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/admission">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
                >
                  Apply for Admission
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-3 text-lg font-semibold bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
