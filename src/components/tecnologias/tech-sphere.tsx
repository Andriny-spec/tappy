"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Definição dos nós de tecnologia
interface TechNode {
  name: string;
  description: string;
  size: number;
  position: [number, number, number];
  color: string;
  category: string;
}

const techNodes: TechNode[] = [
  // Frontend
  { name: "React", description: "Biblioteca JavaScript para construção de interfaces", size: 2.5, position: [5, 3, 0], color: "#61DAFB", category: "frontend" },
  { name: "Next.js", description: "Framework React para aplicações web", size: 2.2, position: [4, -2, 3], color: "#000000", category: "frontend" },
  { name: "TypeScript", description: "Superset tipado de JavaScript", size: 1.9, position: [3, 4, -2], color: "#3178C6", category: "frontend" },
  { name: "Tailwind", description: "Framework CSS utility-first", size: 1.8, position: [1, 5, 2], color: "#06B6D4", category: "frontend" },
  { name: "Framer Motion", description: "Biblioteca para animações React", size: 1.7, position: [2, -5, 1], color: "#FF5D5D", category: "frontend" },

  // Backend
  { name: "Node.js", description: "Runtime JavaScript", size: 2.3, position: [-5, -1, 3], color: "#539E43", category: "backend" },
  { name: "Express", description: "Framework web para Node.js", size: 1.8, position: [-4, 2, -4], color: "#FFFFFF", category: "backend" },
  { name: "MongoDB", description: "Banco de dados NoSQL", size: 2.0, position: [-3, -3, -3], color: "#4DB33D", category: "backend" },
  { name: "GraphQL", description: "Linguagem de consulta para APIs", size: 1.7, position: [-1, -4, 4], color: "#E535AB", category: "backend" },

  // Integrações
  { name: "WebSockets", description: "Protocolo para comunicação em tempo real", size: 1.6, position: [6, -6, -3], color: "#FFCC00", category: "integrations" },
  { name: "REST API", description: "Arquitetura para sistemas distribuídos", size: 1.9, position: [-6, 5, -5], color: "#FF5733", category: "integrations" },
  { name: "Auth0", description: "Plataforma de autenticação e autorização", size: 1.7, position: [-7, -2, 6], color: "#EB5424", category: "integrations" },
  
  // Cloud
  { name: "AWS", description: "Plataforma de serviços em nuvem", size: 2.1, position: [7, 7, 6], color: "#FF9900", category: "cloud" },
  { name: "Firebase", description: "Plataforma de desenvolvimento para aplicativos", size: 2.0, position: [-8, 8, -7], color: "#FFCA28", category: "cloud" },
  { name: "Vercel", description: "Plataforma para deploy de aplicações", size: 1.8, position: [8, -9, 7], color: "#FFFFFF", category: "cloud" },
];

// Componente para cada nó de tecnologia
function Node({ node, isHovered, onHover, onLeave, onClick }: { 
  node: TechNode, 
  isHovered: boolean, 
  onHover: () => void, 
  onLeave: () => void,
  onClick: () => void
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  
  useFrame((state) => {
    if (ref.current) {
      // Rotação suave
      ref.current.rotation.x += 0.002;
      ref.current.rotation.y += 0.003;
      
      // Fazer o nó sempre ficar de frente para a câmera quando hover
      if (isHovered) {
        const lookAtVector = new THREE.Vector3(0, 0, 0);
        lookAtVector.subVectors(camera.position, ref.current.position).normalize();
        ref.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), lookAtVector);
      }
    }
  });

  return (
    <group position={node.position} onClick={onClick}>
      <Float speed={isHovered ? 3 : 1.5} rotationIntensity={isHovered ? 0.5 : 0.2} floatIntensity={isHovered ? 0.8 : 0.4}>
        <Sphere
          ref={ref}
          args={[node.size * (isHovered ? 1.2 : 1), 32, 32]}
          onPointerOver={onHover}
          onPointerOut={onLeave}
        >
          <meshStandardMaterial 
            color={node.color} 
            emissive={node.color} 
            emissiveIntensity={isHovered ? 0.8 : 0.3}
            roughness={0.3}
            metalness={0.7} 
          />
        </Sphere>

        <Text
          position={[0, node.size * 1.3, 0]}
          fontSize={isHovered ? 0.8 : 0.6}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          {node.name}
        </Text>
      </Float>
    </group>
  );
}

// Componente para as linhas de conexão entre nós
function Connections() {
  const linesRef = useRef<THREE.LineSegments>(null);

  useEffect(() => {
    if (linesRef.current) {
      // Criar pontos para as linhas
      const points: number[] = [];
      
      // Conectar alguns nós
      const connections = [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], // Frontend
        [5, 6], [6, 7], [7, 8], [8, 5], // Backend
        [0, 5], [1, 6], [4, 10], // Conexões entre front e back
        [9, 10], [10, 11], [11, 9], // Integrações
        [12, 13], [13, 14], [14, 12], // Cloud
        [7, 13], [5, 14], [0, 14], // Conexões diversas
      ];
      
      connections.forEach(([i, j]) => {
        const start = techNodes[i].position;
        const end = techNodes[j].position;
        
        points.push(...start, ...end);
      });
      
      // Atualizar a geometria
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
      
      linesRef.current.geometry = geometry;
    }
  }, []);

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry />
      <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
    </lineSegments>
  );
}

// Componente principal do canvas 3D
function TechSphereCanvas({ setSelectedTech }: { setSelectedTech: (tech: TechNode | null) => void }) {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  
  return (
    <Canvas camera={{ position: [0, 0, 25], fov: 60 }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Connections />
      
      {techNodes.map((node, index) => (
        <Node 
          key={index}
          node={node}
          isHovered={hoveredNode === index}
          onHover={() => setHoveredNode(index)}
          onLeave={() => setHoveredNode(null)}
          onClick={() => setSelectedTech(node)}
        />
      ))}
      
      <OrbitControls enableZoom={true} enablePan={false} minDistance={15} maxDistance={40} />
    </Canvas>
  );
}

export function TechSphere() {
  const [selectedTech, setSelectedTech] = useState<TechNode | null>(null);
  
  return (
    <div className="relative w-full h-[700px] md:h-[800px]">
      <TechSphereCanvas setSelectedTech={setSelectedTech} />
      
      {/* Informações sobre a tecnologia selecionada */}
      <motion.div 
        className={`absolute bottom-10 right-10 w-80 p-6 rounded-xl backdrop-blur-md bg-black/30 border border-white/10 shadow-xl transition-all duration-300 ${selectedTech ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        initial={{ x: 100, opacity: 0 }}
        animate={{ 
          x: selectedTech ? 0 : 100, 
          opacity: selectedTech ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        {selectedTech && (
          <>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center">
              <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: selectedTech.color }}></span>
              {selectedTech.name}
            </h3>
            <p className="text-gray-200 text-sm mb-4">{selectedTech.description}</p>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${selectedTech.color}30`, color: selectedTech.color }}>
              {selectedTech.category}
            </div>
          </>
        )}
      </motion.div>
      
      {/* Overlay de legendas */}
      <div className="absolute top-10 left-10 space-y-2">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#61DAFB]"></span>
          <span className="text-sm text-white/70">Frontend</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#539E43]"></span>
          <span className="text-sm text-white/70">Backend</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#FFCC00]"></span>
          <span className="text-sm text-white/70">Integrações</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#FF9900]"></span>
          <span className="text-sm text-white/70">Cloud</span>
        </div>
      </div>
      
      {/* Instruções */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/50">
        Clique em uma tecnologia para ver detalhes | Arraste para mover | Zoom com a roda do mouse
      </div>
    </div>
  );
}
