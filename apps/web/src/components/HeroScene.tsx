/* eslint-disable react/no-unknown-property -- react-three-fiber usa JSX declarativo
   (args, position, intensity) que eslint-plugin-react interpreta como props de DOM. */
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function Pulse() {
  const mesh = useRef<Mesh>(null);
  const reduced = prefersReducedMotion();

  useFrame((_, delta) => {
    if (reduced || !mesh.current) return;
    mesh.current.rotation.x += delta * 0.12;
    mesh.current.rotation.y += delta * 0.18;
  });

  return (
    <mesh ref={mesh} position={[1.5, -0.15, 0]}>
      {/* Detalle 3: el coste geométrico se multiplica ~×4 por nivel; 8 son ~1,3M triángulos.
          Radio 1.7 desplazado a la derecha (x=1.5): la malla vive en la mitad derecha y deja
          libre la columna de texto; la capa horizontal del overlay protege ese margen. */}
      <icosahedronGeometry args={[1.7, 3]} />
      <MeshDistortMaterial
        color="#a5b4fc"
        emissive="#4338ca"
        emissiveIntensity={0.35}
        roughness={0.35}
        metalness={0.15}
        distort={0.35}
        speed={reduced ? 0 : 1.6}
      />
    </mesh>
  );
}

/**
 * Escena 3D decorativa del hero (fondo transparente sobre el gradiente).
 * No renderiza nada cuando no hay WebGL disponible (p. ej. en jsdom/tests).
 */
export default function HeroScene() {
  if (
    typeof window === "undefined" ||
    typeof window.WebGLRenderingContext === "undefined"
  ) {
    return null;
  }

  return (
    <div aria-hidden="true" className="pointer-events-none h-full w-full">
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <pointLight color="#818cf8" intensity={2.2} position={[-3, 2, 3]} />
        <Pulse />
      </Canvas>
    </div>
  );
}
