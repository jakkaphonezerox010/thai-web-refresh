import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useTexture, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import logoTexture from '@/assets/logo-3d.png';

// Component for the 3D rotating logo
function LogoMesh() {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useTexture(logoTexture);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main logo plane */}
      <mesh>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial 
          map={texture}
          transparent={true}
          alphaTest={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Glowing backdrop */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshStandardMaterial 
          color="#a855f7" 
          transparent={true}
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Floating particles around the logo
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  useEffect(() => {
    if (particlesRef.current) {
      const positions = new Float32Array(150);
      for (let i = 0; i < 150; i += 3) {
        positions[i] = (Math.random() - 0.5) * 8;
        positions[i + 1] = (Math.random() - 0.5) * 8;
        positions[i + 2] = (Math.random() - 0.5) * 8;
      }
      particlesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial 
        color="#a855f7" 
        size={0.02} 
        transparent 
        opacity={0.6}
        sizeAttenuation 
      />
    </points>
  );
}

interface Logo3DProps {
  size?: number;
}

export const Logo3D = ({ size = 120 }: Logo3DProps) => {
  return (
    <div style={{ width: size, height: size }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#7c3aed" />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <LogoMesh />
        <Particles />
      </Canvas>
    </div>
  );
};