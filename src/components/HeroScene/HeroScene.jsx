import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import { useRef } from "react"
import Box from "@mui/material/Box"

const GoldSphere = () => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#C6A55C"
          emissive="#8B6914"
          emissiveIntensity={0.3}
          metalness={0.95}
          roughness={0.1}
          distort={0.25}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

const SmallSphere = ({ position, scale, color }) => {
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.3
    }
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.9}
        roughness={0.15}
      />
    </mesh>
  )
}

const HeroScene = () => {
  return (
    <Box sx={{
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      right: 0,
      display: { xs: "none", md: "block" },
      pointerEvents: "none",
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ pointerEvents: "none" }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#C6A55C" />
        <directionalLight position={[-3, -2, 2]} intensity={0.6} color="#D4AF37" />
        <pointLight position={[0, 3, 4]} intensity={1} color="#ffffff" />
        <pointLight position={[-2, -1, 3]} intensity={0.5} color="#C6A55C" />
        <GoldSphere />
        <SmallSphere position={[2.5, 1.5, -1]} scale={0.3} color="#D4AF37" />
        <SmallSphere position={[-2, -1.5, -0.5]} scale={0.2} color="#A8893D" />
        <SmallSphere position={[1.5, -2, 0.5]} scale={0.15} color="#C6A55C" />
      </Canvas>
    </Box>
  )
}

export default HeroScene
