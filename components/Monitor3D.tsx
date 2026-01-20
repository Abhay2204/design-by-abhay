import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const MonitorModel: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle float/rotation based on mouse position could go here
      // For now, just a slow gentle drift
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Screen Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 2.5, 0.2]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Screen Display */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[3.8, 2.3]} />
        <meshStandardMaterial color="#000" emissive="#1a1a1a" emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Stand Neck */}
      <mesh position={[0, -1.5, -0.2]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
        <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
      </mesh>
       {/* Stand Base */}
       <mesh position={[0, -2, -0.2]}>
        <boxGeometry args={[1.5, 0.1, 1]} />
        <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
};

const Monitor3D: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <MonitorModel />
        </Float>
        <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2.5} far={4.5} />
      </Canvas>
    </div>
  );
};

export default Monitor3D;
