import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, PerspectiveCamera, Environment, ContactShadows, Text, Float } from "@react-three/drei";
import type { ArchitecturalDesign } from "@/src/services/gemini";

interface BuildingModelProps {
  blocks: ArchitecturalDesign["threeDDesign"]["massingBlocks"];
}

function MassingBlock({ position, args, color, label }: ArchitecturalDesign["threeDDesign"]["massingBlocks"][0]) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={args} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Label above the block */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          position={[0, args[1] / 2 + 0.5, 0]}
          fontSize={0.2}
          color="#141414"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCOjFwr9GSggexLtefGAxV1WxuZ.woff"
        >
          {label}
        </Text>
      </Float>
    </group>
  );
}

export function BuildingModel({ blocks }: BuildingModelProps) {
  return (
    <div className="w-full h-[500px] bg-bg/50 technical-border relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40">3D Massing Model Synthesis</span>
      </div>
      
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={50} />
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Environment preset="city" />

        <group position={[0, 0, 0]}>
          {blocks.map((block, i) => (
            <MassingBlock key={i} {...block} />
          ))}
        </group>

        <Grid
          infiniteGrid
          fadeDistance={50}
          fadeStrength={5}
          cellSize={1}
          sectionSize={5}
          sectionThickness={1.5}
          sectionColor="#141414"
          cellColor="#141414"
          cellThickness={0.5}
          position={[0, -0.01, 0]}
        />
        
        <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      </Canvas>

      <div className="absolute bottom-4 right-4 z-10 flex flex-col items-end gap-1">
        <span className="text-[9px] font-mono opacity-30 uppercase">Orbit: Left Click</span>
        <span className="text-[9px] font-mono opacity-30 uppercase">Zoom: Scroll</span>
        <span className="text-[9px] font-mono opacity-30 uppercase">Pan: Right Click</span>
      </div>
    </div>
  );
}
