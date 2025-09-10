"use client"

import { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
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

// Main 3D Campus Scene
function Enhanced3DCampusScene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[25, 25, 15]} intensity={1.2} castShadow />
      <directionalLight position={[-15, 15, -10]} intensity={0.6} />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#fbbf24" />

      <fog attach="fog" args={["#f8fafc", 15, 50]} />
      <color attach="background" args={["#ffffff"]} />

      {/* Campus Ground with realistic texture */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#84cc16" />
      </mesh>

      {/* Main Buildings */}
      <MainBuilding position={[0, 0, 0]} />
      <LibraryBuilding position={[-8, 0, -2]} />
      <ScienceLabBuilding position={[8, 0, -1]} />
      <Auditorium position={[0, 0, -10]} />
      <Cafeteria position={[-6, 0, 4]} />
      <SportsComplex position={[6, 0, 6]} />

      <ComputerLabBuilding position={[-10, 0, 2]} />
      <ArtMusicBuilding position={[10, 0, 2]} />
      <AdministrativeBuilding position={[-12, 0, -6]} />

      {/* Recreational Areas */}
      <EnhancedPlayground position={[0, 0, 10]} />
      <ParkingArea position={[-10, 0, 10]} />
      <GardenArea position={[10, 0, 10]} />

      {/* Enhanced tree placement around campus */}
      {[
        [-15, 0, -8, "oak"],
        [-12, 0, 0, "pine"],
        [-8, 0, -12, "maple"],
        [-4, 0, -14, "palm"],
        [4, 0, -14, "oak"],
        [8, 0, -12, "pine"],
        [12, 0, -8, "maple"],
        [15, 0, -4, "palm"],
        [15, 0, 4, "oak"],
        [12, 0, 8, "pine"],
        [8, 0, 12, "maple"],
        [4, 0, 14, "palm"],
        [-4, 0, 14, "oak"],
        [-8, 0, 12, "pine"],
        [-12, 0, 8, "maple"],
        [-15, 0, 4, "palm"],
        [-6, 0, -8, "oak"],
        [6, 0, -8, "pine"],
        [0, 0, 14, "maple"],
        [-14, 0, -2, "oak"],
        [14, 0, -2, "pine"],
      ].map(([x, y, z, type], i) => (
        <EnhancedTree key={i} position={[x, y, z]} treeType={type} />
      ))}

      {/* Enhanced pathway system */}
      {/* Main north-south pathway */}
      <mesh position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 30]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      {/* Main east-west pathway */}
      <mesh position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[3, 30]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      {/* Connecting pathways */}
      {[
        [-8, -0.88, -2, 0, 2, 8],
        [8, -0.88, -1, 0, 2, 8],
        [-6, -0.88, 4, Math.PI / 2, 2, 6],
        [6, -0.88, 6, Math.PI / 2, 2, 6],
      ].map(([x, y, z, rotation, width, length], i) => (
        <mesh key={`path-${i}`} position={[x, y, z]} rotation={[-Math.PI / 2, 0, rotation]}>
          <planeGeometry args={[width, length]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      ))}

      {/* Campus entrance gate */}
      <group position={[0, 0, -18]}>
        {[-3, 3].map((x, i) => (
          <mesh key={`gate-post-${i}`} position={[x, 2, 0]}>
            <boxGeometry args={[0.5, 4, 0.5]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
        ))}
        <mesh position={[0, 3.5, 0]}>
          <boxGeometry args={[6, 0.8, 0.3]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <Text position={[0, 3.5, 0.2]} fontSize={0.3} color="#fbbf24" anchorX="center" anchorY="middle">
          WELCOME TO CHHATRAPATI SHIVAJI+2 HIGH SCHOOL
        </Text>
      </group>
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
  const handleZoomIn = () => {
    // Camera zoom will be handled by OrbitControls mouse/touch events
    console.log("[v0] Zoom in clicked")
  }

  const handleZoomOut = () => {
    // Camera zoom will be handled by OrbitControls mouse/touch events
    console.log("[v0] Zoom out clicked")
  }

  const handleRotateLeft = () => {
    // Camera rotation will be handled by OrbitControls mouse/touch events
    console.log("[v0] Rotate left clicked")
  }

  const handleRotateRight = () => {
    // Camera rotation will be handled by OrbitControls mouse/touch events
    console.log("[v0] Rotate right clicked")
  }

  const handleReset = () => {
    // Reset will be handled by OrbitControls
    console.log("[v0] Reset clicked")
  }

  return (
    <div className="absolute top-2 right-2 lg:top-4 lg:right-4 z-10 flex flex-col gap-1 lg:gap-2">
      <button
        onClick={handleZoomIn}
        className="w-8 h-8 lg:w-10 lg:h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-lg shadow-lg border border-white/30 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-200 hover:scale-105 active:scale-95"
        title="Zoom In"
      >
        <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      <button
        onClick={handleZoomOut}
        className="w-8 h-8 lg:w-10 lg:h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-lg shadow-lg border border-white/30 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-200 hover:scale-105 active:scale-95"
        title="Zoom Out"
      >
        <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
        </svg>
      </button>

      <button
        onClick={handleRotateLeft}
        className="w-8 h-8 lg:w-10 lg:h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-lg shadow-lg border border-white/30 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-200 hover:scale-105 active:scale-95"
        title="Rotate Left"
      >
        <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleRotateRight}
        className="w-8 h-8 lg:w-10 lg:h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-lg shadow-lg border border-white/30 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-200 hover:scale-105 active:scale-95"
        title="Rotate Right"
      >
        <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <button
        onClick={handleReset}
        className="w-8 h-8 lg:w-10 lg:h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-lg shadow-lg border border-white/30 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-200 hover:scale-105 active:scale-95"
        title="Reset View"
      >
        <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          computer labs, art & music studios, sports facilities, swimming pool, spacious auditorium, digital library,
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
            <span className="truncate">Sports & Swimming</span>
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
          className="absolute bottom-2 left-2 lg:bottom-4 lg:left-4 text-gray-900 text-xs lg:text-sm px-2 py-1 lg:px-3 lg:py-2 rounded-lg shadow-lg border border-gray-200"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
        >
          <div className="lg:hidden">Tap & drag to explore</div>
          <div className="hidden lg:block">Click & drag to explore • Scroll to zoom</div>
        </div>
      </motion.div>

      {/* Enhanced Campus Stats Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-2 lg:bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg p-2 lg:p-4 shadow-lg border border-white/30 w-[90%] sm:w-auto"
      >
        <div className="flex justify-between sm:space-x-6 lg:space-x-8 text-center">
          <div className="flex-1">
            <div className="text-sm sm:text-lg lg:text-2xl font-bold text-yellow-600">2500+</div>
            <div className="text-xs lg:text-sm text-gray-600">Students</div>
          </div>
          <div className="flex-1">
            <div className="text-sm sm:text-lg lg:text-2xl font-bold text-green-600">180+</div>
            <div className="text-xs lg:text-sm text-gray-600">Faculty</div>
          </div>
          <div className="flex-1">
            <div className="text-sm sm:text-lg lg:text-2xl font-bold text-blue-600">30</div>
            <div className="text-xs lg:text-sm text-gray-600">Acres Campus</div>
          </div>
          <div className="flex-1">
            <div className="text-sm sm:text-lg lg:text-2xl font-bold text-purple-600">98%</div>
            <div className="text-xs lg:text-sm text-gray-600">Success Rate</div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
