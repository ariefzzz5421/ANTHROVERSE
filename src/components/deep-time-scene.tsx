"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group } from "three";

const strata = [
  { y: -0.87, radius: 1.7, color: "#52716e" },
  { y: -0.31, radius: 1.48, color: "#8c6f52" },
  { y: 0.25, radius: 1.26, color: "#bf9161" },
  { y: 0.81, radius: 1.04, color: "#e3c49a" },
];

function Sculpture({ selected }: { selected: number }) {
  const group = useRef<Group>(null);
  const start = useRef(0);
  const from = useRef(0);
  const target = useRef(0);

  useEffect(() => {
    start.current = performance.now();
    from.current = group.current?.rotation.y ?? 0;
    target.current = 0.45 + selected * 0.75;
  }, [selected]);

  useFrame((state) => {
    const elapsed = Math.min((performance.now() - start.current) / 1400, 1);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const eased = reducedMotion ? 1 : 1 - Math.pow(1 - elapsed, 3);
    if (group.current) {
      group.current.rotation.y = from.current + (target.current - from.current) * eased;
    }
    if (!reducedMotion && elapsed < 1) state.invalidate();
  });

  return (
    <group ref={group} rotation={[0.13, 0.45, -0.12]}>
      {strata.map((layer, index) => (
        <group key={layer.y} position={[0, layer.y, 0]}>
          <mesh>
            <cylinderGeometry args={[layer.radius, layer.radius + 0.07, 0.3, 48]} />
            <meshStandardMaterial
              color={layer.color}
              roughness={0.86}
              metalness={0.04}
              emissive={layer.color}
              emissiveIntensity={selected === index ? 0.12 : 0}
            />
          </mesh>
          <mesh position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[layer.radius - 0.12, 0.015, 6, 64]} />
            <meshBasicMaterial color={selected === index ? "#f7e7c9" : "#c39252"} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function DeepTimeScene({ selected }: { selected: number }) {
  return (
    <Canvas
      camera={{ position: [4.1, 2.9, 6.2], fov: 40 }}
      dpr={[1, 1.4]}
      frameloop="demand"
      gl={{ antialias: false, powerPreference: "low-power" }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.7} />
      <directionalLight position={[4, 7, 5]} intensity={2.1} />
      <Sculpture selected={selected} />
    </Canvas>
  );
}
