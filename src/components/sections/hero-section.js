"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Text } from "@react-three/drei"
import Link from "next/link"
import { motion } from "framer-motion"

// --- Enhanced 3D Campus Elements --- //

// Main Academic Building with more realistic details
function MainBuilding({ position = [0, 0, 0] }) {
  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group position={position}>
        {/* Ground Floor */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[8, 2, 4]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>
        {/* Second Floor */}
        <mesh position={[0, 3.5, 0]}>
          <boxGeometry args={[8, 2, 4]} />
          <meshStandardMaterial color="#f3f4f6" />
        </mesh>
        {/* Third Floor */}
        <mesh position={[0, 6, 0]}>
          <boxGeometry args={[8, 2, 4]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 7.8, 0]}>
          <boxGeometry args={[8.2, 0.4, 4.2]} />
          <meshStandardMaterial color="#374151" />
        </mesh>

        {/* Enhanced Windows - Multiple floors with detailed frames */}
        {[1, 3.5, 6].map((y, floor) =>
          [-3, -2, -1, 0, 1, 2, 3].map((x, i) => (
            <group key={`window-group-${floor}-${i}`}>
              <mesh position={[x, y, 2.01]}>
                <boxGeometry args={[0.7, 1, 0.05]} />
                <meshStandardMaterial color="#3b82f6" />
              </mesh>
              {/* Window frames */}
              <mesh position={[x, y, 2.02]}>
                <boxGeometry args={[0.75, 1.05, 0.03]} />
                <meshStandardMaterial color="#1f2937" />
              </mesh>
            </group>
          )),
        )}

        {/* Main Entrance with pillars */}
        <mesh position={[0, 0.5, 2.01]}>
          <boxGeometry args={[2, 2, 0.1]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        {/* Entrance pillars */}
        {[-1.2, 1.2].map((x, i) => (
          <mesh key={`pillar-${i}`} position={[x, 1.5, 2.2]}>
            <cylinderGeometry args={[0.15, 0.15, 3]} />
            <meshStandardMaterial color="#f3f4f6" />
          </mesh>
        ))}

        <Text position={[0, 8.5, 2.1]} fontSize={0.4} color="#1f2937" anchorX="center" anchorY="middle">
          CHHATRAPATI SHIVAJI+2 HIGH SCHOOL
        </Text>
        <Text position={[0, 8, 2.1]} fontSize={0.2} color="#6b7280" anchorX="center" anchorY="middle">
          MAIN ACADEMIC BUILDING
        </Text>
      </group>
    </Float>
  )
}

// Library Building with reading areas
function LibraryBuilding({ position = [-8, 0, -2] }) {
  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.15}>
      <group position={position}>
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[5, 3, 3]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        {/* Dome roof for library */}
        <mesh position={[0, 3.5, 0]}>
          <sphereGeometry args={[2.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        {/* Reading room extension */}
        <mesh position={[3, 0.8, 0]}>
          <boxGeometry args={[2, 1.6, 2.5]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
        {/* Library windows */}
        {[-2, -1, 0, 1, 2].map((x, i) => (
          <mesh key={`lib-window-${i}`} position={[x, 1.5, 1.51]}>
            <boxGeometry args={[0.5, 1.2, 0.05]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
        ))}
        {/* Book shelves visible through windows */}
        {[-1.5, 0, 1.5].map((x, i) => (
          <mesh key={`shelf-${i}`} position={[x, 1.2, 1.4]}>
            <boxGeometry args={[0.3, 0.8, 0.1]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
        ))}
        <Text position={[0, 4.2, 1.6]} fontSize={0.22} color="#ffffff" anchorX="center" anchorY="middle">
          DIGITAL LIBRARY
        </Text>
      </group>
    </Float>
  )
}

// Science Laboratory Building with chemistry and physics labs
function ScienceLabBuilding({ position = [8, 0, -1] }) {
  return (
    <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.2}>
      <group position={position}>
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[5, 2.4, 2.5]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        {/* Chemistry lab */}
        <mesh position={[-1.5, 3, 0]}>
          <boxGeometry args={[2, 1.2, 2]} />
          <meshStandardMaterial color="#059669" />
        </mesh>
        {/* Physics lab */}
        <mesh position={[1.5, 3, 0]}>
          <boxGeometry args={[2, 1.2, 2]} />
          <meshStandardMaterial color="#047857" />
        </mesh>
        {/* Lab equipment on roof */}
        <mesh position={[-1, 3.8, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 1.2]} />
          <meshStandardMaterial color="#6b7280" />
        </mesh>
        <mesh position={[1, 3.8, 0]}>
          <boxGeometry args={[0.6, 1, 0.6]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        {/* Satellite dish */}
        <mesh position={[0, 4, 0]}>
          <cylinderGeometry args={[0.8, 0.1, 0.1]} />
          <meshStandardMaterial color="#9ca3af" />
        </mesh>
        {/* Lab windows with safety glass */}
        {[-2, -1, 0, 1, 2].map((x, i) => (
          <mesh key={`lab-window-${i}`} position={[x, 1.2, 1.26]}>
            <boxGeometry args={[0.7, 0.8, 0.05]} />
            <meshStandardMaterial color="#22d3ee" />
          </mesh>
        ))}
        <Text position={[0, 3.2, 1.3]} fontSize={0.18} color="#ffffff" anchorX="center" anchorY="middle">
          SCIENCE LABORATORIES
        </Text>
      </group>
    </Float>
  )
}

// Auditorium with stage details
function Auditorium({ position = [0, 0, -8] }) {
  return (
    <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.1}>
      <group position={position}>
        {/* Main auditorium structure */}
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[10, 4, 5]} />
          <meshStandardMaterial color="#7c3aed" />
        </mesh>
        {/* Curved roof */}
        <mesh position={[0, 4.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[2.8, 2.8, 10, 16, 1, true, 0, Math.PI]} />
          <meshStandardMaterial color="#5b21b6" />
        </mesh>
        {/* Stage area with curtains */}
        <mesh position={[0, 0.4, -2.3]}>
          <boxGeometry args={[8, 0.8, 1]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        {/* Stage curtains */}
        <mesh position={[0, 2, -2.3]}>
          <boxGeometry args={[8, 3, 0.2]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        {/* Entrance columns */}
        {[-3, -1, 1, 3].map((x, i) => (
          <mesh key={`column-${i}`} position={[x, 2, 2.7]}>
            <cylinderGeometry args={[0.25, 0.25, 4]} />
            <meshStandardMaterial color="#f3f4f6" />
          </mesh>
        ))}
        {/* Seating area indication */}
        {[-2, 0, 2].map((x, i) =>
          [-1, 0, 1].map((z, j) => (
            <mesh key={`seat-${i}-${j}`} position={[x, 0.2, z]}>
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial color="#4f46e5" />
            </mesh>
          )),
        )}
        <Text position={[0, 5.5, 2.8]} fontSize={0.28} color="#ffffff" anchorX="center" anchorY="middle">
          MULTIPURPOSE AUDITORIUM
        </Text>
      </group>
    </Float>
  )
}

// Cafeteria with kitchen
function Cafeteria({ position = [-6, 0, 4] }) {
  return (
    <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group position={position}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[6, 2, 4]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
        {/* Kitchen area */}
        <mesh position={[-2, 1, -1.5]}>
          <boxGeometry args={[2, 2, 1]} />
          <meshStandardMaterial color="#ea580c" />
        </mesh>
        {/* Chimney */}
        <mesh position={[-2, 3, -1.5]}>
          <cylinderGeometry args={[0.3, 0.3, 2]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        {/* Outdoor seating area */}
        <mesh position={[4, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 4]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        {/* Tables and benches */}
        {[3, 5].map((x, i) =>
          [-1, 1].map((z, j) => (
            <group key={`table-group-${i}-${j}`}>
              <mesh position={[x, 0.4, z]}>
                <cylinderGeometry args={[0.5, 0.5, 0.05]} />
                <meshStandardMaterial color="#8b5cf6" />
              </mesh>
              {/* Benches */}
              {[-0.8, 0.8].map((zOffset, k) => (
                <mesh key={`bench-${k}`} position={[x, 0.2, z + zOffset]}>
                  <boxGeometry args={[1, 0.1, 0.3]} />
                  <meshStandardMaterial color="#6b7280" />
                </mesh>
              ))}
            </group>
          )),
        )}
        <Text position={[0, 2.8, 2.1]} fontSize={0.22} color="#ffffff" anchorX="center" anchorY="middle">
          CAFETERIA & KITCHEN
        </Text>
      </group>
    </Float>
  )
}

// Sports Complex with multiple facilities
function SportsComplex({ position = [6, 0, 6] }) {
  return (
    <Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.15}>
      <group position={position}>
        {/* Main gym building */}
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[8, 4, 5]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        {/* Swimming pool area */}
        <mesh position={[-4, 0.2, 0]}>
          <boxGeometry args={[3, 0.4, 6]} />
          <meshStandardMaterial color="#06b6d4" />
        </mesh>
        {/* Basketball court markings */}
        <mesh position={[2, 0.05, 3]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6, 4]} />
          <meshStandardMaterial color="#f97316" />
        </mesh>
        {/* Basketball hoops */}
        {[0, 4].map((z, i) => (
          <group key={`hoop-group-${i}`}>
            <mesh position={[2, 3.2, z]}>
              <torusGeometry args={[0.35, 0.05, 8, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[2, 3.2, z]}>
              <cylinderGeometry args={[0.05, 0.05, 3.2]} />
              <meshStandardMaterial color="#6b7280" />
            </mesh>
          </group>
        ))}
        {/* Volleyball net */}
        <mesh position={[0, 1.5, -2]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[3, 1]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
        <Text position={[0, 5, 2.6]} fontSize={0.24} color="#ffffff" anchorX="center" anchorY="middle">
          SPORTS & RECREATION CENTER
        </Text>
      </group>
    </Float>
  )
}

// Administrative Building with clock tower
function AdministrativeBuilding({ position = [-12, 0, -6] }) {
  return (
    <Float speed={0.9} rotationIntensity={0.08} floatIntensity={0.12}>
      <group position={position}>
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[4, 3, 2.5]} />
          <meshStandardMaterial color="#6366f1" />
        </mesh>
        {/* Clock tower */}
        <mesh position={[0, 3.5, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 2]} />
          <meshStandardMaterial color="#4f46e5" />
        </mesh>
        {/* Clock face */}
        <mesh position={[0, 4, 0.81]}>
          <cylinderGeometry args={[0.5, 0.5, 0.1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Clock hands */}
        <mesh position={[0, 4, 0.86]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.3, 0.02, 0.02]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0, 4, 0.86]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.2, 0.02, 0.02]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* Office windows */}
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
          <mesh key={`admin-window-${i}`} position={[x, 1.5, 1.26]}>
            <boxGeometry args={[0.4, 0.8, 0.05]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
        ))}
        <Text position={[0, 5.2, 1.3]} fontSize={0.18} color="#ffffff" anchorX="center" anchorY="middle">
          ADMINISTRATION
        </Text>
      </group>
    </Float>
  )
}

// Computer Lab Building
function ComputerLabBuilding({ position = [-10, 0, 2] }) {
  return (
    <Float speed={0.9} rotationIntensity={0.1} floatIntensity={0.18}>
      <group position={position}>
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[5, 3, 3]} />
          <meshStandardMaterial color="#06b6d4" />
        </mesh>
        {/* Server room on top */}
        <mesh position={[0, 3.5, 0]}>
          <boxGeometry args={[3, 1, 2]} />
          <meshStandardMaterial color="#0891b2" />
        </mesh>
        {/* AC units */}
        {[-1, 1].map((x, i) => (
          <mesh key={`ac-${i}`} position={[x, 3.5, 1.6]}>
            <boxGeometry args={[0.8, 0.4, 0.3]} />
            <meshStandardMaterial color="#374151" />
          </mesh>
        ))}
        {/* Computer lab windows */}
        {[-2, -1, 0, 1, 2].map((x, i) => (
          <mesh key={`comp-window-${i}`} position={[x, 1.5, 1.51]}>
            <boxGeometry args={[0.6, 0.8, 0.05]} />
            <meshStandardMaterial color="#1e40af" />
          </mesh>
        ))}
        <Text position={[0, 4.2, 1.6]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
          COMPUTER LABS
        </Text>
      </group>
    </Float>
  )
}

// Art & Music Building
function ArtMusicBuilding({ position = [10, 0, 2] }) {
  return (
    <Float speed={0.8} rotationIntensity={0.12} floatIntensity={0.16}>
      <group position={position}>
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[4.5, 3.6, 2.8]} />
          <meshStandardMaterial color="#ec4899" />
        </mesh>
        {/* Art studio skylight */}
        <mesh position={[0, 3.9, 0]} rotation={[Math.PI / 6, 0, 0]}>
          <boxGeometry args={[4, 0.2, 2]} />
          <meshStandardMaterial color="#3b82f6" transparent opacity={0.7} />
        </mesh>
        {/* Musical note decorations */}
        {[-1.5, 0, 1.5].map((x, i) => (
          <mesh key={`note-${i}`} position={[x, 2.5, 1.41]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
        ))}
        <Text position={[0, 4.2, 1.5]} fontSize={0.18} color="#ffffff" anchorX="center" anchorY="middle">
          ART & MUSIC
        </Text>
      </group>
    </Float>
  )
}

// Enhanced Playground with more equipment
function EnhancedPlayground({ position = [0, 0, 8] }) {
  return (
    <group position={position}>
      {/* Playground ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#a7f3d0" />
      </mesh>

      {/* Swing set */}
      <group position={[-4, 0, 0]}>
        {[0, 2].map((x, i) => (
          <mesh key={`swing-post-${i}`} position={[x, 1.5, 0]}>
            <boxGeometry args={[0.2, 3, 0.2]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
        ))}
        <mesh position={[1, 2.8, 0]}>
          <boxGeometry args={[2, 0.1, 0.2]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        {[0.4, 1.6].map((x, i) => (
          <mesh key={`swing-${i}`} position={[x, 1.5, 0]}>
            <boxGeometry args={[0.6, 0.1, 0.4]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
        ))}
      </group>

      {/* Enhanced slide with ladder */}
      <group position={[3, 0, -2]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[2.5, 2, 2.5]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
        <mesh position={[2, 1, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[3, 0.1, 1.2]} />
          <meshStandardMaterial color="#facc15" />
        </mesh>
        {/* Ladder */}
        {[0.5, 1, 1.5].map((y, i) => (
          <mesh key={`ladder-${i}`} position={[-1.3, y, 0]}>
            <boxGeometry args={[0.1, 0.1, 1]} />
            <meshStandardMaterial color="#6b7280" />
          </mesh>
        ))}
      </group>

      {/* Seesaw */}
      <group position={[-2, 0, -3]}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1]} />
          <meshStandardMaterial color="#6b7280" />
        </mesh>
        <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 12]}>
          <boxGeometry args={[4, 0.15, 0.4]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
      </group>

      {/* Monkey bars */}
      <group position={[1, 0, 2]}>
        {[0, 3].map((x, i) => (
          <mesh key={`monkey-post-${i}`} position={[x, 1.2, 0]}>
            <boxGeometry args={[0.2, 2.4, 0.2]} />
            <meshStandardMaterial color="#8b5cf6" />
          </mesh>
        ))}
        {[0.5, 1, 1.5, 2, 2.5].map((x, i) => (
          <mesh key={`bar-${i}`} position={[x, 2.2, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.8]} />
            <meshStandardMaterial color="#6b7280" />
          </mesh>
        ))}
      </group>

      {/* Sandbox */}
      <group position={[-1, 0, 3]}>
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        {/* Sandbox border */}
        {[-1.5, 1.5].map((x, i) => (
          <mesh key={`border-x-${i}`} position={[x, 0.1, 0]}>
            <boxGeometry args={[0.2, 0.2, 3]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
        ))}
        {[-1.5, 1.5].map((z, i) => (
          <mesh key={`border-z-${i}`} position={[0, 0.1, z]}>
            <boxGeometry args={[3, 0.2, 0.2]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// Enhanced Parking Area with more cars and details
function ParkingArea({ position = [-8, 0, 8] }) {
  return (
    <group position={position}>
      {/* Parking ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>
      {/* Parking lines */}
      {[-3, -2, -1, 0, 1, 2, 3].map((x, i) => (
        <mesh key={`parking-line-${i}`} position={[x, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.1, 6]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
      {/* Cars */}
      {[
        [-2.5, 0, "#dc2626"],
        [-1.5, 0, "#3b82f6"],
        [-0.5, 0, "#10b981"],
        [0.5, 0, "#f59e0b"],
        [1.5, 0, "#8b5cf6"],
        [2.5, 0, "#ef4444"],
      ].map(([x, z, color], i) => (
        <group key={`car-${i}`}>
          <mesh position={[x, 0.3, z]}>
            <boxGeometry args={[0.8, 0.6, 1.8]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {/* Car wheels */}
          {[-0.6, 0.6].map((zOffset, j) =>
            [-0.3, 0.3].map((xOffset, k) => (
              <mesh key={`wheel-${j}-${k}`} position={[x + xOffset, 0.1, z + zOffset]}>
                <cylinderGeometry args={[0.15, 0.15, 0.1]} />
                <meshStandardMaterial color="#1f2937" />
              </mesh>
            )),
          )}
        </group>
      ))}
      {/* Parking sign */}
      <mesh position={[0, 2, -3.5]}>
        <boxGeometry args={[2, 1, 0.1]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <Text position={[0, 2, -3.4]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="middle">
        PARKING
      </Text>
    </group>
  )
}

// Enhanced Garden Area with pathways
function GardenArea({ position = [8, 0, 8] }) {
  return (
    <group position={position}>
      {/* Garden bed */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
      {/* Garden pathways */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.5, 6]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[0.5, 6]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      {/* Flower beds in quadrants */}
      {[-2, 2].map((x, i) =>
        [-2, 2].map((z, j) => (
          <group key={`flower-bed-${i}-${j}`}>
            <mesh position={[x, 0.05, z]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[1.5, 1.5]} />
              <meshStandardMaterial color="#fbbf24" />
            </mesh>
            {/* Flowers */}
            {[-0.5, 0, 0.5].map((fx, fi) =>
              [-0.5, 0, 0.5].map((fz, fj) => (
                <mesh key={`flower-${fi}-${fj}`} position={[x + fx, 0.15, z + fz]}>
                  <sphereGeometry args={[0.1, 8, 8]} />
                  <meshStandardMaterial
                    color={["#ef4444", "#f59e0b", "#8b5cf6", "#ec4899"][Math.floor(Math.random() * 4)]}
                  />
                </mesh>
              )),
            )}
          </group>
        )),
      )}
      {/* Garden fountain in center */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.6]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.4]} />
        <meshStandardMaterial color="#06b6d4" />
      </mesh>
    </group>
  )
}

// Enhanced Trees with more variety and realistic details
function EnhancedTree({ position = [0, 0, 0], treeType = "oak" }) {
  const treeData = {
    oak: { trunkColor: "#8b4513", leafColor: "#228b22", height: 2.5, crownSize: 1.4 },
    pine: { trunkColor: "#654321", leafColor: "#006400", height: 3.5, crownSize: 1.0 },
    maple: { trunkColor: "#8b4513", leafColor: "#32cd32", height: 2.8, crownSize: 1.6 },
    palm: { trunkColor: "#daa520", leafColor: "#228b22", height: 4.0, crownSize: 1.2 },
  }

  const tree = treeData[treeType]

  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.15, 0.25, tree.height]} />
        <meshStandardMaterial color={tree.trunkColor} />
      </mesh>
      {treeType === "pine" ? (
        <mesh position={[0, tree.height - 0.5, 0]}>
          <coneGeometry args={[tree.crownSize, tree.height * 0.8, 8]} />
          <meshStandardMaterial color={tree.leafColor} />
        </mesh>
      ) : (
        <mesh position={[0, tree.height - 0.3, 0]}>
          <sphereGeometry args={[tree.crownSize, 12, 12]} />
          <meshStandardMaterial color={tree.leafColor} />
        </mesh>
      )}
    </group>
  )
}

function StaticBus({ position = [12, 0, 0] }) {
  return (
    <group position={position}>
      {/* Main bus body */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[3, 1.6, 1.2]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      {/* Bus front */}
      <mesh position={[1.6, 0.8, 0]}>
        <boxGeometry args={[0.2, 1.4, 1]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      {/* Windshield */}
      <mesh position={[1.65, 1.2, 0]}>
        <boxGeometry args={[0.05, 0.8, 0.8]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.7} />
      </mesh>
      {/* Side windows */}
      {[-0.8, -0.2, 0.4, 1].map((x, i) => (
        <mesh key={`bus-window-${i}`} position={[x, 1.2, 0.61]}>
          <boxGeometry args={[0.4, 0.6, 0.02]} />
          <meshStandardMaterial color="#3b82f6" transparent opacity={0.7} />
        </mesh>
      ))}
      {/* Static wheels */}
      {[-0.8, 0.8].map((x, i) => (
        <group key={`bus-wheel-group-${i}`}>
          <mesh position={[x, 0.2, 0.7]}>
            <cylinderGeometry args={[0.3, 0.3, 0.15]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
          <mesh position={[x, 0.2, -0.7]}>
            <cylinderGeometry args={[0.3, 0.3, 0.15]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
        </group>
      ))}
      {/* Bus door */}
      <mesh position={[-1.4, 0.6, 0.61]}>
        <boxGeometry args={[0.6, 1.2, 0.02]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      <Text position={[0, 1.8, 0.65]} fontSize={0.15} color="#1f2937" anchorX="center" anchorY="middle">
        SCHOOL BUS
      </Text>
    </group>
  )
}

// Security Gate with guard house
function SecurityGate({ position = [0, 0, 12] }) {
  return (
    <group position={position}>
      {/* Gate pillars */}
      {[-2, 2].map((x, i) => (
        <mesh key={`gate-pillar-${i}`} position={[x, 1.5, 0]}>
          <boxGeometry args={[0.4, 3, 0.4]} />
          <meshStandardMaterial color="#6b7280" />
        </mesh>
      ))}
      {/* Gate bars */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[4, 0.1, 0.1]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      {/* Guard house */}
      <mesh position={[3.5, 1, 0]}>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[3.5, 1, 0.76]}>
        <boxGeometry args={[0.6, 0.8, 0.02]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.7} />
      </mesh>
      <Text position={[0, 2.8, 0.2]} fontSize={0.2} color="#1f2937" anchorX="center" anchorY="middle">
        MAIN ENTRANCE
      </Text>
    </group>
  )
}

// Water Tank Tower
function WaterTank({ position = [15, 0, -8] }) {
  return (
    <group position={position}>
      {/* Tower structure */}
      {[
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].map(([x, z], i) => (
        <mesh key={`tower-leg-${i}`} position={[x, 4, z]}>
          <cylinderGeometry args={[0.1, 0.1, 8]} />
          <meshStandardMaterial color="#6b7280" />
        </mesh>
      ))}
      {/* Water tank */}
      <mesh position={[0, 8, 0]}>
        <cylinderGeometry args={[2, 2, 3]} />
        <meshStandardMaterial color="#06b6d4" />
      </mesh>
      {/* Tank support */}
      <mesh position={[0, 6.5, 0]}>
        <cylinderGeometry args={[2.2, 2.2, 0.5]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
    </group>
  )
}

// Solar Panel Array
function SolarPanels({ position = [-15, 0, 8] }) {
  return (
    <group position={position}>
      {/* Solar panel grid */}
      {[-2, -1, 0, 1, 2].map((x, i) =>
        [-1, 0, 1].map((z, j) => (
          <mesh key={`solar-${i}-${j}`} position={[x * 1.5, 0.5, z * 2]} rotation={[-Math.PI / 6, 0, 0]}>
            <boxGeometry args={[1.2, 0.05, 1.8]} />
            <meshStandardMaterial color="#1e40af" />
          </mesh>
        )),
      )}
      {/* Support structure */}
      {[-3, -1.5, 0, 1.5, 3].map((x, i) =>
        [-2, 0, 2].map((z, j) => (
          <mesh key={`support-${i}-${j}`} position={[x, 0.3, z]} rotation={[0, 0, Math.PI / 12]}>
            <cylinderGeometry args={[0.05, 0.05, 0.8]} />
            <meshStandardMaterial color="#6b7280" />
          </mesh>
        )),
      )}
    </group>
  )
}

// Weather Station
function WeatherStation({ position = [-8, 0, -12] }) {
  return (
    <group position={position}>
      {/* Base platform */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      {/* Weather instruments */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>
      {/* Anemometer */}
      <mesh position={[0, 4.2, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      {/* Wind vane */}
      <mesh position={[0.8, 3.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.6, 0.02, 0.1]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
    </group>
  )
}

// Enhanced Campus Pathways
function CampusPathways() {
  return (
    <group>
      {/* Main pathway from entrance */}
      <mesh position={[0, 0.01, 6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 12]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      {/* Cross pathways */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[1.5, 24]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      {/* Pathway to parking */}
      <mesh position={[-6, 0.01, 4]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
        <planeGeometry args={[1, 8]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
    </group>
  )
}

function AnimatedStudent({ position = [0, 0, 0], color = "#3b82f6", walkPath = [] }) {
  const studentRef = useRef()
  const [currentTarget, setCurrentTarget] = useState(0)

  useFrame((state) => {
    if (studentRef.current && walkPath.length > 0) {
      const target = walkPath[currentTarget]
      const current = studentRef.current.position

      // Move towards target
      const speed = 0.02
      const dx = target[0] - current.x
      const dz = target[2] - current.z
      const distance = Math.sqrt(dx * dx + dz * dz)

      if (distance > 0.5) {
        current.x += (dx / distance) * speed
        current.z += (dz / distance) * speed

        // Rotate to face movement direction
        studentRef.current.rotation.y = Math.atan2(dx, dz)
      } else {
        // Move to next target
        setCurrentTarget((prev) => (prev + 1) % walkPath.length)
      }

      // Add walking animation
      const walkCycle = Math.sin(state.clock.elapsedTime * 8) * 0.1
      current.y = position[1] + Math.abs(walkCycle)
    }
  })

  return (
    <group ref={studentRef} position={position}>
      {/* Student body */}
      <mesh position={[0, 0.8, 0]}>
        <capsuleGeometry args={[0.15, 0.6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Student head */}
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.12]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>
      {/* Backpack */}
      <mesh position={[0, 0.9, -0.12]}>
        <boxGeometry args={[0.2, 0.3, 0.1]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.12, 0.7, 0]}>
        <capsuleGeometry args={[0.04, 0.3]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>
      <mesh position={[0.12, 0.7, 0]}>
        <capsuleGeometry args={[0.04, 0.3]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.08, 0.3, 0]}>
        <capsuleGeometry args={[0.05, 0.4]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.08, 0.3, 0]}>
        <capsuleGeometry args={[0.05, 0.4]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  )
}

function TennisCourtComplex({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Tennis court surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>
      {/* Court lines */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[0.1, 12]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Net */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.05, 1, 8]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>
      {/* Net posts */}
      {[-4.2, 4.2].map((z, i) => (
        <mesh key={`net-post-${i}`} position={[0, 0.75, z]}>
          <cylinderGeometry args={[0.05, 0.05, 1.5]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
      ))}
    </group>
  )
}

function BasketballCourt({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Court surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 10]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      {/* Court lines */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2, 2.1, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Basketball hoops */}
      {[-6, 6].map((x, i) => (
        <group key={`hoop-${i}`} position={[x, 0, 0]}>
          <mesh position={[0, 3, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 6]} />
            <meshStandardMaterial color="#6b7280" />
          </mesh>
          <mesh position={[0, 3, 0]}>
            <torusGeometry args={[0.45, 0.03, 8, 32]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
          {/* Backboard */}
          <mesh position={[0, 3.5, -0.1]}>
            <boxGeometry args={[1.8, 1.2, 0.1]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function SwimmingPoolComplex({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Pool structure */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[12, 1, 6]} />
        <meshStandardMaterial color="#0ea5e9" transparent opacity={0.8} />
      </mesh>
      {/* Pool deck */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 10]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
      {/* Lane dividers */}
      {[-2, -1, 0, 1, 2].map((x, i) => (
        <mesh key={`lane-${i}`} position={[x * 2, -0.4, 0]}>
          <boxGeometry args={[0.1, 0.2, 6]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
      ))}
      {/* Diving board */}
      <group position={[0, 0, -4]}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1]} />
          <meshStandardMaterial color="#6b7280" />
        </mesh>
        <mesh position={[0, 0.55, 0.8]}>
          <boxGeometry args={[0.5, 0.1, 1.5]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
      </group>
    </group>
  )
}

function GreenhouseComplex({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Greenhouse structure */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[8, 2, 4]} />
        <meshStandardMaterial color="#10b981" transparent opacity={0.3} />
      </mesh>
      {/* Greenhouse frame */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[8.1, 2.1, 4.1]} />
        <meshStandardMaterial color="#374151" wireframe />
      </mesh>
      {/* Plants inside */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={`plant-${i}`} position={[((i % 4) - 1.5) * 1.5, 0.3, Math.floor(i / 4) - 1]}>
          <sphereGeometry args={[0.2]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
      ))}
    </group>
  )
}

function FlagPole({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 4, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 8]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>
      {/* Flag */}
      <mesh position={[0.8, 6.5, 0]}>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.4]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
    </group>
  )
}

function HostelBuilding({ position = [0, 0, 0] }) {
  return (
    <Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.15}>
      <group position={position}>
        {/* Main building */}
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[6, 4, 4]} />
          <meshStandardMaterial color="#a855f7" />
        </mesh>
        {/* Windows */}
        {[-2, -1, 0, 1, 2].map((x, i) => (
          <mesh key={`hostel-window-${i}`} position={[x, 1.5, 2.01]}>
            <boxGeometry args={[0.5, 0.8, 0.05]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
        ))}
        <Text position={[0, 4.5, 2.1]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
          STUDENT HOSTEL
        </Text>
      </group>
    </Float>
  )
}

function MedicalCenter({ position = [0, 0, 0] }) {
  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.12}>
      <group position={position}>
        {/* Main building */}
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[5, 3, 3]} />
          <meshStandardMaterial color="#f472b6" />
        </mesh>
        {/* Red cross symbol */}
        <mesh position={[0, 3.2, 0]}>
          <boxGeometry args={[1.5, 0.3, 0.1]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        <mesh position={[0, 3.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[1.5, 0.3, 0.1]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        {/* Windows */}
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
          <mesh key={`medical-window-${i}`} position={[x, 1.2, 1.51]}>
            <boxGeometry args={[0.4, 0.6, 0.05]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
        ))}
        <Text position={[0, 3.8, 1.6]} fontSize={0.18} color="#ffffff" anchorX="center" anchorY="middle">
          MEDICAL CENTER
        </Text>
      </group>
    </Float>
  )
}

function CanteenComplex({ position = [0, 0, 0] }) {
  return (
    <Float speed={0.9} rotationIntensity={0.1} floatIntensity={0.18}>
      <group position={position}>
        {/* Main building */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[7, 2.4, 3.5]} />
          <meshStandardMaterial color="#fb923c" />
        </mesh>
        {/* Tables and chairs */}
        {[-2, 2].map((x, i) =>
          [-1, 1].map((z, j) => (
            <group key={`canteen-table-${i}-${j}`} position={[x * 2, 0.5, z * 1.5]}>
              <mesh position={[0, 0.2, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 0.1]} />
                <meshStandardMaterial color="#6b7280" />
              </mesh>
              <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[1, 0.1, 0.5]} />
                <meshStandardMaterial color="#d97706" />
              </mesh>
            </group>
          )),
        )}
        <Text position={[0, 3, 1.8]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
          CANTEEN
        </Text>
      </group>
    </Float>
  )
}

function TransportHub({ position = [0, 0, 0] }) {
  return (
    <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.1}>
      <group position={position}>
        {/* Main structure */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[6, 2, 4]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        {/* Bus stop signs */}
        {[-2, 2].map((x, i) => (
          <mesh key={`bus-stop-${i}`} position={[x * 2, 2.5, 0]}>
            <boxGeometry args={[0.5, 1, 0.1]} />
            <meshStandardMaterial color="#eab308" />
          </mesh>
        ))}
        <Text position={[0, 2.8, 2.1]} fontSize={0.18} color="#ffffff" anchorX="center" anchorY="middle">
          TRANSPORT HUB
        </Text>
      </group>
    </Float>
  )
}

function ResearchCenter({ position = [0, 0, 0] }) {
  return (
    <Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.15}>
      <group position={position}>
        {/* Main building */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[5.5, 3.6, 3]} />
          <meshStandardMaterial color="#4338ca" />
        </mesh>
        {/* Satellite dish */}
        <mesh position={[0, 4.5, 0]}>
          <cylinderGeometry args={[1, 0.1, 0.1]} />
          <meshStandardMaterial color="#9ca3af" />
        </mesh>
        {/* Windows */}
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
          <mesh key={`research-window-${i}`} position={[x, 1.5, 1.51]}>
            <boxGeometry args={[0.4, 0.7, 0.05]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
        ))}
        <Text position={[0, 4, 1.6]} fontSize={0.18} color="#ffffff" anchorX="center" anchorY="middle">
          RESEARCH CENTER
        </Text>
      </group>
    </Float>
  )
}

function PlayingStudent({ position = [0, 0, 0], color = "#3b82f6", activity = "swing" }) {
  const studentRef = useRef()

  useFrame((state) => {
    if (studentRef.current) {
      const time = state.clock.elapsedTime

      switch (activity) {
        case "swing":
          // Swinging motion
          studentRef.current.rotation.z = Math.sin(time * 2) * 0.3
          studentRef.current.position.y = position[1] + Math.abs(Math.sin(time * 2)) * 0.2
          break
        case "slide":
          // Sliding motion
          const slideProgress = (Math.sin(time * 0.5) + 1) / 2
          studentRef.current.position.y = position[1] + slideProgress * 1.5
          studentRef.current.rotation.x = slideProgress * -0.3
          break
        case "seesaw":
          // Seesaw motion
          studentRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.3
          studentRef.current.rotation.z = Math.sin(time * 1.5) * 0.2
          break
        case "running":
          // Running in circle
          const radius = 2
          studentRef.current.position.x = position[0] + Math.cos(time) * radius
          studentRef.current.position.z = position[2] + Math.sin(time) * radius
          studentRef.current.rotation.y = time
          // Running animation
          const runCycle = Math.sin(time * 10) * 0.15
          studentRef.current.position.y = position[1] + Math.abs(runCycle)
          break
        case "jumping":
          // Jumping motion
          const jumpHeight = Math.max(0, Math.sin(time * 4)) * 0.8
          studentRef.current.position.y = position[1] + jumpHeight
          break
      }
    }
  })

  return (
    <group ref={studentRef} position={position}>
      {/* Student body */}
      <mesh position={[0, 0.8, 0]}>
        <capsuleGeometry args={[0.15, 0.6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Student head */}
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.12]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>
      {/* Backpack */}
      <mesh position={[0, 0.9, -0.12]}>
        <boxGeometry args={[0.2, 0.3, 0.1]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.12, 0.7, 0]}>
        <capsuleGeometry args={[0.04, 0.3]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>
      <mesh position={[0.12, 0.7, 0]}>
        <capsuleGeometry args={[0.04, 0.3]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.08, 0.3, 0]}>
        <capsuleGeometry args={[0.05, 0.4]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.08, 0.3, 0]}>
        <capsuleGeometry args={[0.05, 0.4]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  )
}

function AdditionalWalkingStudents() {
  const students = [
    {
      id: 11,
      path: [
        [8, 0, 8],
        [8, 0, -8],
        [-8, 0, -8],
        [-8, 0, 8],
      ],
      color: "#f472b6",
    },
    {
      id: 12,
      path: [
        [-10, 0, 0],
        [0, 0, 10],
        [10, 0, 0],
        [0, 0, -10],
      ],
      color: "#a78bfa",
    },
    {
      id: 13,
      path: [
        [6, 0, 6],
        [-6, 0, 6],
        [-6, 0, -6],
        [6, 0, -6],
      ],
      color: "#34d399",
    },
    {
      id: 14,
      path: [
        [0, 0, 12],
        [12, 0, 0],
        [0, 0, -12],
        [-12, 0, 0],
      ],
      color: "#fbbf24",
    },
    {
      id: 15,
      path: [
        [15, 0, 5],
        [5, 0, 15],
        [-5, 0, 5],
        [-15, 0, -5],
      ],
      color: "#fb7185",
    },
    {
      id: 16,
      path: [
        [-8, 0, 12],
        [8, 0, 12],
        [8, 0, -4],
        [-8, 0, -4],
      ],
      color: "#60a5fa",
    },
    {
      id: 17,
      path: [
        [10, 0, 10],
        [-10, 0, 10],
        [-10, 0, -10],
        [10, 0, -10],
      ],
      color: "#a3e635",
    },
    {
      id: 18,
      path: [
        [4, 0, 0],
        [4, 0, 8],
        [-4, 0, 8],
        [-4, 0, 0],
      ],
      color: "#f97316",
    },
    {
      id: 19,
      path: [
        [0, 0, 6],
        [6, 0, 0],
        [0, 0, -6],
        [-6, 0, 0],
      ],
      color: "#e879f9",
    },
    {
      id: 20,
      path: [
        [12, 0, 6],
        [0, 0, 14],
        [-12, 0, 6],
        [0, 0, -2],
      ],
      color: "#22d3ee",
    },
  ]

  return (
    <>
      {students.map((student) => (
        <AnimatedStudent key={student.id} walkPath={student.path} color={student.color} />
      ))}
    </>
  )
}

function Enhanced3DCampusScene() {
  const studentPaths = [
    [
      [0, 0, 12], // Entrance
      [0, 0, 8], // Playground
      [-8, 0, -2], // Library
      [8, 0, -1], // Science Lab
      [0, 0, 0], // Main Building
    ],
    [
      [-8, 0, 8], // Parking
      [-6, 0, 4], // Cafeteria
      [0, 0, 0], // Main Building
      [6, 0, 6], // Sports Complex
      [0, 0, 8], // Playground
    ],
    [
      [8, 0, -1], // Science Lab
      [10, 0, 2], // Art Building
      [0, 0, -8], // Auditorium
      [-12, 0, -6], // Admin Building
      [0, 0, 0], // Main Building
    ],
    [
      [-18, 0, 0], // Hostel
      [-12, 0, 12], // Transport Hub
      [0, 0, 18], // Canteen Complex
      [12, 0, 12], // Research Center
      [18, 0, 0], // Medical Center
    ],
    [
      [15, 0, 5], // Tennis Court
      [0, 0, -15], // Swimming Pool
      [-15, 0, 5], // Basketball Court
      [12, 0, -8], // Greenhouse
      [0, 0, 15], // Flag Pole
    ],
  ]

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[25, 25, 15]} intensity={1.2} castShadow />
      <directionalLight position={[-15, 15, -10]} intensity={0.6} />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#fbbf24" />

      <color attach="background" args={["#ffffff"]} />

      {/* Campus Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>

      {/* Enhanced Campus Pathways */}
      <CampusPathways />

      {/* All Buildings */}
      <MainBuilding position={[0, 0, 0]} />
      <LibraryBuilding position={[-8, 0, -2]} />
      <ScienceLabBuilding position={[8, 0, -1]} />
      <Auditorium position={[0, 0, -8]} />
      <Cafeteria position={[-6, 0, 4]} />
      <SportsComplex position={[6, 0, 6]} />
      <AdministrativeBuilding position={[-12, 0, -6]} />
      <ComputerLabBuilding position={[-10, 0, 2]} />
      <ArtMusicBuilding position={[10, 0, 2]} />

      {/* Enhanced Facilities */}
      <EnhancedPlayground position={[0, 0, 8]} />
      <ParkingArea position={[-8, 0, 8]} />
      <GardenArea position={[8, 0, 8]} />
      <SecurityGate position={[0, 0, 12]} />
      <WaterTank position={[15, 0, -8]} />
      <SolarPanels position={[-15, 0, 8]} />
      <WeatherStation position={[-8, 0, -12]} />

      <StaticBus position={[12, 0, 0]} />

      <AnimatedStudent position={[0, 0, 12]} color="#3b82f6" walkPath={studentPaths[0]} />
      <AnimatedStudent position={[-8, 0, 8]} color="#dc2626" walkPath={studentPaths[1]} />
      <AnimatedStudent position={[8, 0, -1]} color="#059669" walkPath={studentPaths[2]} />
      <AnimatedStudent position={[-18, 0, 0]} color="#7c3aed" walkPath={studentPaths[3]} />
      <AnimatedStudent position={[15, 0, 5]} color="#f59e0b" walkPath={studentPaths[4]} />

      {/* Additional walking students */}
      <AnimatedStudent
        position={[2, 0, 5]}
        color="#ec4899"
        walkPath={[
          [2, 0, 5],
          [6, 0, 6],
          [0, 0, 8],
          [-6, 0, 4],
          [2, 0, 5],
        ]}
      />
      <AnimatedStudent
        position={[-3, 0, -2]}
        color="#06b6d4"
        walkPath={[
          [-3, 0, -2],
          [-8, 0, -2],
          [0, 0, 0],
          [8, 0, -1],
          [-3, 0, -2],
        ]}
      />
      <AnimatedStudent
        position={[5, 0, 3]}
        color="#8b5cf6"
        walkPath={[
          [5, 0, 3],
          [10, 0, 2],
          [0, 0, -8],
          [-10, 0, 2],
          [5, 0, 3],
        ]}
      />
      <AnimatedStudent
        position={[-5, 0, 10]}
        color="#f97316"
        walkPath={[
          [-5, 0, 10],
          [0, 0, 15],
          [12, 0, 12],
          [18, 0, 0],
          [-5, 0, 10],
        ]}
      />
      <AnimatedStudent
        position={[8, 0, 12]}
        color="#84cc16"
        walkPath={[
          [8, 0, 12],
          [0, 0, 18],
          [-12, 0, 12],
          [-18, 0, 0],
          [8, 0, 12],
        ]}
      />

      <AdditionalWalkingStudents />

      {/* Playing students in playground */}
      <PlayingStudent position={[-1, 0, 9]} color="#ef4444" activity="swing" />
      <PlayingStudent position={[1, 0, 9]} color="#3b82f6" activity="slide" />
      <PlayingStudent position={[0, 0, 7]} color="#10b981" activity="seesaw" />
      <PlayingStudent position={[3, 0, 8]} color="#f59e0b" activity="jumping" />
      <PlayingStudent position={[6, 0, 6]} color="#8b5cf6" activity="running" />

      {/* Playing students in sports areas */}
      <PlayingStudent position={[15, 0, 6]} color="#ec4899" activity="running" />
      <PlayingStudent position={[-15, 0, 6]} color="#06b6d4" activity="jumping" />
      <PlayingStudent position={[0, 0, -14]} color="#f97316" activity="running" />

      <PlayingStudent position={[-12, 0, 8]} color="#84cc16" activity="jumping" />
      <PlayingStudent position={[8, 0, -12]} color="#06b6d4" activity="swing" />
      <PlayingStudent position={[-6, 0, -8]} color="#f59e0b" activity="running" />
      <PlayingStudent position={[14, 0, -6]} color="#8b5cf6" activity="seesaw" />
      <PlayingStudent position={[-14, 0, -8]} color="#ef4444" activity="jumping" />

      {Array.from({ length: 25 }, (_, i) => {
        const angle = (i / 25) * Math.PI * 2
        const radius = 20 + Math.random() * 15
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const treeTypes = ["oak", "pine", "maple", "palm"]
        const treeType = treeTypes[i % 4]

        return <EnhancedTree key={`random-tree-${i}`} position={[x, 0, z]} treeType={treeType} />
      })}

      <Scene3DControls />
    </>
  )
}

// Custom Button Component (replacing shadcn/ui)
function CustomButton({ children, className = "", variant = "default", ...props }) {
  const baseStyles =
    "px-4 lg:px-6 py-2 lg:py-3 text-xs lg:text-sm font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer inline-block text-center transform hover:scale-105 active:scale-95"
  const variants = {
    default:
      "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 shadow-yellow-200",
    outline:
      "border-2 border-yellow-400 text-yellow-600 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-gray-900 bg-transparent hover:border-yellow-500 shadow-yellow-100",
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// --- Enhanced Hero Section --- //

function Scene3DControls() {
  const controlsRef = useRef()

  window.cameraControls = controlsRef

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      autoRotate
      autoRotateSpeed={0.3}
      maxPolarAngle={Math.PI / 2.1}
      minDistance={12}
      maxDistance={40}
      enablePan={true}
      enableDamping={true}
      dampingFactor={0.05}
    />
  )
}

function CameraControlButtons() {
  const [currentView, setCurrentView] = useState("overview")

  const handleZoomIn = () => {
    if (window.cameraControls?.current) {
      const controls = window.cameraControls.current
      const camera = controls.object
      const distance = camera.position.distanceTo(controls.target)
      const newDistance = Math.max(distance - 2, 12)

      const direction = camera.position.clone().sub(controls.target).normalize()
      camera.position.copy(controls.target).add(direction.multiplyScalar(newDistance))
      controls.update()
    }
  }

  const handleZoomOut = () => {
    if (window.cameraControls?.current) {
      const controls = window.cameraControls.current
      const camera = controls.object
      const distance = camera.position.distanceTo(controls.target)
      const newDistance = Math.min(distance + 2, 40)

      const direction = camera.position.clone().sub(controls.target).normalize()
      camera.position.copy(controls.target).add(direction.multiplyScalar(newDistance))
      controls.update()
    }
  }

  const handleRotateLeft = () => {
    if (window.cameraControls?.current) {
      const controls = window.cameraControls.current
      controls.autoRotateSpeed = -2
      setTimeout(() => {
        controls.autoRotateSpeed = 0.3
      }, 500)
    }
  }

  const handleRotateRight = () => {
    if (window.cameraControls?.current) {
      const controls = window.cameraControls.current
      controls.autoRotateSpeed = 2
      setTimeout(() => {
        controls.autoRotateSpeed = 0.3
      }, 500)
    }
  }

  const handleReset = () => {
    if (window.cameraControls?.current) {
      const controls = window.cameraControls.current
      controls.reset()
      controls.autoRotateSpeed = 0.3
      setCurrentView("overview")
    }
  }

  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
      {/* Zoom In */}
      <button
        onClick={handleZoomIn}
        className="bg-white/90 hover:bg-white text-gray-800 p-1.5 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
        title="Zoom In"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {/* Zoom Out */}
      <button
        onClick={handleZoomOut}
        className="bg-white/90 hover:bg-white text-gray-800 p-1.5 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
        title="Zoom Out"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
        </svg>
      </button>

      {/* Rotate Left */}
      <button
        onClick={handleRotateLeft}
        className="bg-white/90 hover:bg-white text-gray-800 p-1.5 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
        title="Rotate Left"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Rotate Right */}
      <button
        onClick={handleRotateRight}
        className="bg-white/90 hover:bg-white text-gray-800 p-1.5 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
        title="Rotate Right"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Reset View */}
      <button
        onClick={handleReset}
        className="bg-white/90 hover:bg-white text-gray-800 p-1.5 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
        title="Reset View"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    </div>
  )
}

export default function EnhancedCampusHero() {
  return (
    <section className="relative w-full min-h-[90vh] max-h-[90vh] flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 overflow-hidden">
      {/* Left Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-start lg:justify-center items-start text-left w-full lg:w-2/5 lg:pr-6 xl:pr-8 z-10 pt-8 pb-4 lg:py-0"
      >
        <span className="block text-yellow-600 text-xs sm:text-sm lg:text-base mb-1 lg:mb-2 uppercase tracking-wide font-semibold">
          Excellence in Education Since 1985
        </span>
        <h1 className="font-serif font-extrabold text-xl sm:text-2xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight mb-2 lg:mb-4 text-balance">
          Chhatrapati Shivaji+2
          <br />
          <span className="text-yellow-600">High School</span>
        </h1>
        <p className="text-gray-700 mt-1 lg:mt-4 text-xs sm:text-sm lg:text-base leading-relaxed text-pretty">
          Experience our comprehensive campus featuring modern academic buildings, advanced science laboratories,
          computer labs, art & music studios, sports facilities, spacious auditorium, digital library,
          and beautiful recreational areas designed for complete student development and excellence in education.
        </p>

        {/* Enhanced Campus Features */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-1 lg:gap-3 mt-3 lg:mt-6 text-xs lg:text-sm">
          <div className="flex items-center space-x-1 lg:space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
            <span className="truncate">Smart Classrooms</span>
          </div>
          <div className="flex items-center space-x-1 lg:space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
            <span className="truncate">Science & Computer Labs</span>
          </div>
          <div className="flex items-center space-x-1 lg:space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
            <span className="truncate">Sports</span>
          </div>
          <div className="flex items-center space-x-1 lg:space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
            <span className="truncate">Digital Library</span>
          </div>
          <div className="flex items-center space-x-1 lg:space-x-2">
            <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0"></div>
            <span className="truncate">Art & Music Studios</span>
          </div>
          <div className="flex items-center space-x-1 lg:space-x-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0"></div>
            <span className="truncate">Auditorium & Cafeteria</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 lg:gap-4 mt-4 lg:mt-8 w-full sm:w-auto">
          <Link href="/admission" className="w-full sm:w-auto">
            <CustomButton variant="default" className="w-full sm:w-auto text-xs lg:text-sm px-3 lg:px-6 py-2 lg:py-3">
              Virtual Campus Tour
            </CustomButton>
          </Link>
          <Link href="/about" className="w-full sm:w-auto">
            <CustomButton variant="outline" className="w-full sm:w-auto text-xs lg:text-sm px-3 lg:px-6 py-2 lg:py-3">
              Admission Info
            </CustomButton>
          </Link>
        </div>
      </motion.div>

      {/* Right Enhanced 3D Campus with Controls */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full lg:w-3/5 h-[40vh] sm:h-[45vh] lg:h-[70vh] xl:h-[75vh] mt-2 lg:mt-0 flex-shrink-0"
      >
        <Canvas
          camera={{ position: [20, 15, 20], fov: 60 }}
          className="w-full h-full rounded-lg shadow-2xl border border-white/20"
          shadows
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Enhanced3DCampusScene />
            <Scene3DControls />
          </Suspense>
        </Canvas>

        <CameraControlButtons />

        <div
          className="absolute bottom-7 left-2 lg:bottom-3 lg:left-3 text-gray-900 text-xs lg:text-sm px-2 py-1 lg:px-3 lg:py-2 rounded-lg shadow-lg border border-gray-200"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
        >
          <div className="lg:hidden">Tap & drag to explore</div>
          <div className="hidden lg:block">Click & drag to explore • Scroll to zoom</div>
        </div>
      </motion.div>

      {/* Enhanced Campus Stats Overlay */}

    </section>
  )
}
