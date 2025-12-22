import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import MinecraftHotbar from "./MinecraftHotbar";

function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/minecraft_chest.glb');
  const { actions } = useAnimations(animations, group);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="chestfbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Chest_0_A"
                  position={[-6.365, -87.985, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}>
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_12"
                      geometry={nodes.Object_12.geometry}
                      material={materials.Material}
                      skeleton={nodes.Object_12.skeleton}
                    />
                    <group name="Object_11" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                  </group>
                </group>
                <group name="Chest_0" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/minecraft_chest.glb');

const RotatingModel = ({ isRotating }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current && isRotating) {
      groupRef.current.rotation.y += 0.008;
    }
  });

  return (
    <group ref={groupRef} scale={0.014} position={[0, 0, 0]}>
      <Model />
    </group>
  );
};

const ModelLoader = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#6366f1" wireframe />
    </mesh>
  );
};


const HeroSection = () => {
  const [isRotating, setIsRotating] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden flex items-center">
 
      <div
        className={`absolute inset-0 z-0 bg-cover bg-center scale-105 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: 'url(/minecraft_bg.jpeg)',
          filter: 'blur(0px)',
          imageRendering: 'pixelated',
        }}
      />
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `
            linear-gradient(
              to top,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 0.9) 10%,
              rgba(0, 0, 0, 0.7) 40%,
              rgba(0, 0, 0, 0.4) 60%,
              rgba(0, 0, 0, 0) 70%
            )
          `,
        }}
      />
      <div className={`absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />
        <MinecraftHotbar />

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
 
          <div className="max-w-3xl space-y-6"> 
            <div className="relative flex flex-col items-start space-y-4">
              <div className={`transition-all duration-1000 ease-out ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`} style={{ transitionDelay: '200ms' }}>
                <img
                  src="/acm-logo.png"
                  alt="ACM Logo"
                  className="w-128 md:w-154 lg:w-180 h-auto"
                  style={{
                    imageRendering: 'pixelated',
                    transform: 'scale(1.5)',
                    transformOrigin: 'center',
                  }}
                />
              </div>
            </div>
          </div>
 
          <div className={`relative w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center transition-all duration-1000 ease-out ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`} style={{ transitionDelay: '300ms' }}>
            <Canvas
              camera={{ position: [0, 1, 5], fov: 50, near: 0.1, far: 1000 }}
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={<ModelLoader />}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} />
                <directionalLight position={[-5, 5, -5]} intensity={0.6} />
                <pointLight position={[0, 3, 3]} intensity={1} />
                <spotLight position={[3, 3, 3]} angle={0.5} penumbra={1} intensity={1} />

                <RotatingModel isRotating={isRotating} />

                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  rotateSpeed={0.5}
                  onStart={() => setIsRotating(false)}
                  onEnd={() => setIsRotating(true)}
                />
              </Suspense>
            </Canvas>

            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;