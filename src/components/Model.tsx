import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

const Model = () => {
  const { scene } = useGLTF("/scene.glb");
  const meshRef = useRef<THREE.Object3D>(null);
  const scrollY = useRef(0);

  const velocity = useRef({ x: 2, y: 2 });
  const targetVelocity = useRef({ x: 0, y: 0.2 });
  const [initialRotationComplete, setInitialRotationComplete] = useState(false);

  const handleScroll = (e: WheelEvent) => {
    scrollY.current += e.deltaY * 0.001;
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.to(velocity.current, {
        duration: 2,
        x: targetVelocity.current.x,
        y: targetVelocity.current.y,
        ease: "power3.out",
        onComplete: () => {
          setInitialRotationComplete(true);
          gsap.to(meshRef.current.rotation, {
            duration: 3, // Add a smooth transition
            x: 0,
            ease: "power3.out",
          });
        },
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      if (initialRotationComplete) {
        meshRef.current.rotation.y += velocity.current.y * 0.05;
      } else {
        meshRef.current.rotation.x += velocity.current.x * 0.03;
        meshRef.current.rotation.y += velocity.current.y * 0.05;
      }

      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.2;
    }
  });

  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      if (child.material) {
        child.material.color = new THREE.Color("red");
        child.material.needsUpdate = true;
      }
    }
  });

  return <primitive ref={meshRef} object={scene} scale={1.3} />;
};

const Loading = () => (
  <Html center>
    <div>Loading...</div>
  </Html>
);

export default function NewModel() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }} shadows>
        <Suspense fallback={<Loading />}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[3, 3, 3]} intensity={0.8} castShadow />
          <pointLight position={[-5, 5, 0]} intensity={0.5} />
          <Model />
          <OrbitControls
            enableZoom={false}
            enableDamping={true}
            dampingFactor={0.1}
            autoRotate={true}
          />
          <Environment preset="night" />
          <mesh receiveShadow position={[0, -1.5, 0]}>
            <planeGeometry args={[10, 10]} />
            <shadowMaterial opacity={0.3} />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}