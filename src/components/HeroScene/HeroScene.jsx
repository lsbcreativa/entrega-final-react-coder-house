import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import { useRef } from "react"
import Box from "@mui/material/Box"

const GoldSphere = () => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={2}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#D4AF37"
          emissive="#C6A55C"
          emissiveIntensity={0.6}
          metalness={1}
          roughness={0.05}
          distort={0.3}
          speed={3}
        />
      </mesh>
    </Float>
  )
}

const OrbitingSphere = ({ radius, speed, size, color, offset }) => {
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + offset
      ref.current.position.x = Math.cos(t) * radius
      ref.current.position.y = Math.sin(t) * radius * 0.5
      ref.current.position.z = Math.sin(t) * 0.5
    }
  })

  return (
    <mesh ref={ref} scale={size}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        metalness={1}
        roughness={0.1}
      />
    </mesh>
  )
}

const HeroScene = () => {
  return (
    <Box sx={{
      width: "45%",
      height: "100%",
      position: "absolute",
      top: 0,
      right: 0,
      display: { xs: "none", md: "block" },
      pointerEvents: "none",
    }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        style={{ pointerEvents: "none" }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#D4AF37" />
        <directionalLight position={[-3, -1, 3]} intensity={0.8} color="#C6A55C" />
        <pointLight position={[0, 0, 4]} intensity={1.5} color="#fff" />
        <GoldSphere />
        <OrbitingSphere radius={3} speed={0.6} size={0.25} color="#D4AF37" offset={0} />
        <OrbitingSphere radius={2.5} speed={0.8} size={0.18} color="#C6A55C" offset={2} />
        <OrbitingSphere radius={3.5} speed={0.4} size={0.12} color="#A8893D" offset={4} />
      </Canvas>
    </Box>
  )
}

export default HeroScene
