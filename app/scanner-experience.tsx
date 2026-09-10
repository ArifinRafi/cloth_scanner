'use client';

import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import Link from 'next/link';
import { applyMachineFinish } from './machine-materials';
import MachineLighting from './machine-lighting';

const MODEL_PATH = '/models/scanning-table-v2.glb';
const CLOTH_ORIGIN = new THREE.Vector3(2.24255, 0.7514, 0.009);

type ProgressRef = MutableRefObject<number>;
type Motion = { x: number; y: number; z: number };

const steps = [
  { kicker: 'System ready', title: 'Meet the inspection cell', copy: 'One machine coordinates handling, lighting, imaging and classification.' },
  { kicker: 'Step 01 · Locate', title: 'Find the top layer', copy: 'The gantry aligns its four clips with the edges of the next cloth cut.' },
  { kicker: 'Step 02 · Grip', title: 'Secure all four sides', copy: 'Four clip grippers close together, keeping the textile square and controlled.' },
  { kicker: 'Step 03 · Position', title: 'Move onto the glass', copy: 'The suspended cloth travels smoothly to the calibrated inspection plane.' },
  { kicker: 'Step 04 · Illuminate', title: 'Light from both sides', copy: 'Top and bottom ring lights reveal surface and transmission defects.' },
  { kicker: 'Step 05 · Capture', title: 'Acquire synchronized images', copy: 'Two cameras capture the cloth while the optical axis remains unobstructed.' },
  { kicker: 'Step 06 · Verify', title: 'Classify the result', copy: 'The inspection model checks the scan against the configured quality rules.' },
  { kicker: 'Step 07 · Route', title: 'Send accepted cloth onward', copy: 'A passing cut is lifted from the glass and placed on the accepted side.' },
];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};
const between = (value: number, start: number, end: number) => smooth((value - start) / (end - start));
const mix = (a: number, b: number, t: number) => THREE.MathUtils.lerp(a, b, t);

function gripperMotion(progress: number): Motion {
  const align = { x: 0.1233, y: 0, z: -0.065 };
  const lifted = { x: 0.1233, y: 0, z: 0.235 };
  const overGlass = { x: -1.3192, y: -0.0773, z: 0.235 };
  const placed = { x: -1.3192, y: -0.0773, z: -0.06 };
  const clear = { x: -1.3192, y: -0.0773, z: 0.17 };
  const outputAir = { x: -1.9692, y: -0.0773, z: 0.2 };
  const outputPlaced = { x: -1.9692, y: -0.0773, z: -0.055 };

  if (progress < 0.21) {
    const t = between(progress, 0.1, 0.21);
    return { x: mix(0, align.x, t), y: 0, z: mix(0, align.z, t) };
  }
  if (progress < 0.28) return align;
  if (progress < 0.37) {
    const t = between(progress, 0.28, 0.37);
    return { x: lifted.x, y: 0, z: mix(align.z, lifted.z, t) };
  }
  if (progress < 0.51) {
    const t = between(progress, 0.37, 0.51);
    return { x: mix(lifted.x, overGlass.x, t), y: mix(0, overGlass.y, t), z: lifted.z };
  }
  if (progress < 0.58) {
    const t = between(progress, 0.51, 0.58);
    return { x: placed.x, y: placed.y, z: mix(overGlass.z, placed.z, t) };
  }
  if (progress < 0.63) {
    const t = between(progress, 0.58, 0.63);
    return { x: clear.x, y: clear.y, z: mix(placed.z, clear.z, t) };
  }
  if (progress < 0.81) return clear;
  if (progress < 0.86) {
    const t = between(progress, 0.81, 0.86);
    return { x: clear.x, y: clear.y, z: mix(clear.z, placed.z, t) };
  }
  if (progress < 0.9) return placed;
  if (progress < 0.96) {
    const t = between(progress, 0.9, 0.96);
    return { x: mix(placed.x, outputAir.x, t), y: placed.y, z: mix(placed.z, outputAir.z, t) };
  }
  const t = between(progress, 0.96, 1);
  return { x: outputPlaced.x, y: outputPlaced.y, z: mix(outputAir.z, outputPlaced.z, t) };
}

function clothMotion(progress: number): Motion {
  const lifted = { x: 0, y: 0, z: 0.3 };
  const glassAir = { x: -1.44245, y: -0.0783, z: 0.3 };
  const glass = { x: -1.44245, y: -0.0783, z: 0.012 };
  const outputAir = { x: -2.09245, y: -0.0783, z: 0.22 };
  const output = { x: -2.09245, y: -0.0783, z: 0.018 };

  if (progress < 0.28) return { x: 0, y: 0, z: 0 };
  if (progress < 0.37) {
    const t = between(progress, 0.28, 0.37);
    return { x: 0, y: 0, z: mix(0, lifted.z, t) };
  }
  if (progress < 0.51) {
    const t = between(progress, 0.37, 0.51);
    return { x: mix(0, glassAir.x, t), y: mix(0, glassAir.y, t), z: glassAir.z };
  }
  if (progress < 0.58) {
    const t = between(progress, 0.51, 0.58);
    return { x: glass.x, y: glass.y, z: mix(glassAir.z, glass.z, t) };
  }
  if (progress < 0.86) return glass;
  if (progress < 0.9) {
    const t = between(progress, 0.86, 0.9);
    return { x: glass.x, y: glass.y, z: mix(glass.z, 0.17, t) };
  }
  if (progress < 0.96) {
    const t = between(progress, 0.9, 0.96);
    return { x: mix(glass.x, outputAir.x, t), y: glass.y, z: mix(0.17, outputAir.z, t) + 0.025 * Math.sin(t * Math.PI) };
  }
  const t = between(progress, 0.96, 1);
  return { x: output.x, y: output.y, z: mix(outputAir.z, output.z, t) };
}

function jawClosure(progress: number) {
  if (progress < 0.21) return 0;
  if (progress < 0.25) return between(progress, 0.21, 0.25);
  if (progress < 0.56) return 1;
  if (progress < 0.61) return 1 - between(progress, 0.56, 0.61);
  if (progress < 0.84) return 0;
  if (progress < 0.88) return between(progress, 0.84, 0.88);
  if (progress < 0.975) return 1;
  return 1 - between(progress, 0.975, 1);
}

function flashStrength(progress: number) {
  const pulse = (center: number, width: number) => clamp01(1 - Math.abs(progress - center) / width);
  return Math.max(pulse(0.655, 0.018), pulse(0.7, 0.014));
}

function SceneLoading() {
  return <Html center className="model-loading"><span />Loading scanner</Html>;
}

function fabricWeave() {
  const size = 128;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const warp = Math.sin(x * Math.PI / 4);
      const weft = Math.sin(y * Math.PI / 4);
      const value = Math.round(128 + 45 * warp * weft + 18 * (warp + weft));
      const i = (y * size + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = value;
      data[i + 3] = 255;
    }
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(20, 20);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

function FabricSheet({ progressRef }: { progressRef: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh<THREE.PlaneGeometry>>(null);
  const basePositions = useRef<Float32Array | null>(null);
  const previousProgress = useRef(-1);
  const weave = useMemo(fabricWeave, []);
  const border = useMemo(() => {
    const segments = 64;
    const stride = segments + 1;
    const vertices: number[] = [];
    for (let i = 0; i < segments; i++) vertices.push(i);
    for (let i = 0; i < segments; i++) vertices.push(i * stride + segments);
    for (let i = segments; i > 0; i--) vertices.push(segments * stride + i);
    for (let i = segments; i > 0; i--) vertices.push(i * stride);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(vertices.length * 6), 3));
    const indices: number[] = [];
    for (let i = 0; i < vertices.length; i++) {
      const next = (i + 1) % vertices.length;
      indices.push(i * 2, next * 2, i * 2 + 1, next * 2, next * 2 + 1, i * 2 + 1);
    }
    geometry.setIndex(indices);
    return { geometry, vertices };
  }, []);

  useFrame(() => {
    if (!group.current || !mesh.current) return;
    const progress = progressRef.current;
    // Shape follows scroll position only, including reverse scrolling and pauses.
    if (progress === previousProgress.current) return;
    previousProgress.current = progress;
    const motion = clothMotion(progress);
    group.current.position.set(
      CLOTH_ORIGIN.x + motion.x,
      CLOTH_ORIGIN.y + motion.y,
      CLOTH_ORIGIN.z + motion.z,
    );

    const airborne = clamp01(between(progress, 0.29, 0.35) - between(progress, 0.51, 0.58) + between(progress, 0.86, 0.91) - between(progress, 0.96, 1));
    const geometry = mesh.current.geometry;
    const position = geometry.attributes.position as THREE.BufferAttribute;
    if (!basePositions.current) basePositions.current = Float32Array.from(position.array);
    const original = basePositions.current;
    const travel = between(progress, .37, .51) + between(progress, .9, .96);
    const phase = progress * 32;
    for (let i = 0; i < position.count; i += 1) {
      const x = original[i * 3];
      const y = original[i * 3 + 1];
      const nx = Math.abs(x) / 0.462;
      const ny = Math.abs(y) / 0.462;
      const centerSag = Math.max(0, (1 - nx * nx) * (1 - ny * ny));
      // Four edge-midpoint grips stay stable while the unsupported cloth drapes.
      const gripDistance = Math.min((Math.abs(x) - .462) ** 2 + y * y, x * x + (Math.abs(y) - .462) ** 2);
      const free = 1 - Math.exp(-gripDistance / .0045);
      const edge = Math.max(nx, ny) ** 8;
      const corner = (nx * ny) ** 2;
      const sag = -(0.052 * centerSag + .024 * corner) * airborne;
      const foldLine = y - .32 * x - .08;
      const fold = Math.exp(-(foldLine * foldLine) / .0012) * (.0015 + .006 * airborne);
      const ripple = Math.sin(x * 24 + phase) * Math.sin(y * 19 - phase * .65) * .005 * airborne;
      const edgeCurl = edge * (.001 + .002 * (1 + Math.sin(x * 41 + y * 37)) + .007 * airborne * Math.sin(x * 18 - y * 23 + phase));
      const wrinkles = (.0005 + .0012 * airborne) * (1 + Math.sin(x * 39 + y * 16)) * (1 + Math.sin(y * 31 - x * 12)) * .5;
      const sway = Math.sin(travel * Math.PI * 4) * .007 * airborne;
      const edgeX = Math.sign(x) * nx ** 12 * Math.sin(y * 89 + .8) * .0015;
      const edgeY = Math.sign(y) * ny ** 12 * Math.sin(x * 83 - .4) * .0015;
      position.setXYZ(i,
        x + free * (edgeX - x * .01 * airborne * centerSag + sway * centerSag),
        y + free * (edgeY - y * .008 * airborne * centerSag),
        free * (sag + fold + ripple + edgeCurl + wrinkles),
      );
    }
    position.needsUpdate = true;
    // Updated normals let the existing lights reveal folds rather than a flat slab.
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
    const rim = border.geometry.getAttribute('position') as THREE.BufferAttribute;
    border.vertices.forEach((vertex, index) => {
      rim.setXYZ(index * 2, position.getX(vertex), position.getY(vertex), position.getZ(vertex));
      rim.setXYZ(index * 2 + 1, position.getX(vertex), position.getY(vertex), position.getZ(vertex) - .0007);
    });
    rim.needsUpdate = true;
    border.geometry.computeVertexNormals();
    border.geometry.computeBoundingSphere();
  });

  return (
    <group ref={group} position={CLOTH_ORIGIN}>
      <mesh ref={mesh} castShadow receiveShadow>
        <planeGeometry args={[0.924, 0.924, 64, 64]} />
        <meshPhysicalMaterial color="#327f6d" roughness={0.95} metalness={0} side={THREE.DoubleSide} bumpMap={weave} bumpScale={.0003} sheen={.25} sheenColor="#327f6d" sheenRoughness={.95} />
      </mesh>
      <mesh geometry={border.geometry} castShadow receiveShadow>
        <meshStandardMaterial color="#327f6d" roughness={.95} metalness={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function ScannerModel({ progressRef }: { progressRef: ProgressRef }) {
  const gltf = useGLTF(MODEL_PATH);
  const prepared = useMemo(() => {
    const model = gltf.scene.clone(true);
    const gripperNodes: THREE.Object3D[] = [];
    const gantryNodes: THREE.Object3D[] = [];
    const jawNodes: THREE.Object3D[] = [];
    const ledMaterials: THREE.MeshStandardMaterial[] = [];
    const starts = new Map<THREE.Object3D, THREE.Vector3>();

    model.traverse((child) => {
      const isGripper = /^(FourClip_|Clip_|GripperPlate_|GripperWire_)/.test(child.name);
      const isGantry = /^(GantryBridge_8080|CarriageAdapter_)/.test(child.name);
      if (isGripper) gripperNodes.push(child);
      if (isGantry) gantryNodes.push(child);
      if (isGripper || isGantry) starts.set(child, child.position.clone());
      if (/^Clip_(East|West|North|South)_(OuterJawArm|InnerJawArm|OuterContactPad|InnerContactPad)/.test(child.name)) jawNodes.push(child);

      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = /Cloth|Gripper|Gantry|Camera|Clip/.test(child.name);
      child.receiveShadow = true;
      if (child.name === 'ClothCut_36x36in_Layer04') child.visible = false;

      const materials = (Array.isArray(child.material) ? child.material : [child.material]).map((material) => material.clone());
      child.material = Array.isArray(child.material) ? materials : materials[0];

      for (const material of materials) {
        applyMachineFinish(material, child.name);
        if (/ClothCut/.test(child.name) && material instanceof THREE.MeshStandardMaterial) {
          material.color.set('#327f6d');
          material.roughness = .95;
          material.metalness = 0;
        }
        if (material.name === 'Glass_(Clear)') {
          child.material = new THREE.MeshPhysicalMaterial({
            name: material.name,
            color: '#c0ece2',
            transmission: 0,
            transparent: true,
            opacity: 0.22,
            depthWrite: false,
            roughness: 0.12,
            metalness: 0.15,
            thickness: 0.018,
            ior: 1.47,
          });
        }
        if (/LED_RingLight/.test(child.name)) {
          const led = new THREE.MeshStandardMaterial({
            name: 'Inspection_LED',
            color: '#f4f7fa',
            emissive: '#edf5ff',
            emissiveIntensity: 0.12,
            roughness: 0.25,
            metalness: 0.05,
          });
          child.material = led;
          ledMaterials.push(led);
        }
      }
    });

    return { model, gripperNodes, gantryNodes, jawNodes, ledMaterials, starts };
  }, [gltf.scene]);
  const preparedRef = useRef(prepared);

  useEffect(() => {
    preparedRef.current = prepared;
  }, [prepared]);

  useFrame(() => {
    const current = preparedRef.current;
    const progress = progressRef.current;
    const motion = gripperMotion(progress);
    const closure = jawClosure(progress);

    for (const node of current.gripperNodes) {
      const start = current.starts.get(node);
      if (!start) continue;
      let jawX = 0;
      let jawY = 0;
      if (current.jawNodes.includes(node)) {
        if (node.name.includes('_East_')) jawX = -0.012 * closure;
        if (node.name.includes('_West_')) jawX = 0.012 * closure;
        if (node.name.includes('_North_')) jawY = -0.012 * closure;
        if (node.name.includes('_South_')) jawY = 0.012 * closure;
      }
      node.position.set(start.x + motion.x + jawX, start.y + motion.y + jawY, start.z + motion.z);
    }
    for (const node of current.gantryNodes) {
      const start = current.starts.get(node);
      if (start) node.position.set(start.x + motion.x, start.y, start.z);
    }
    const flash = flashStrength(progress);
    // Three.js materials are intentionally animated imperatively inside the render loop.
    // eslint-disable-next-line react-hooks/immutability
    for (const material of current.ledMaterials) material.emissiveIntensity = 0.12 + flash * 9;
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <primitive object={prepared.model} />
      <FabricSheet progressRef={progressRef} />
      <ScanLine progressRef={progressRef} />
    </group>
  );
}

function ScanLine({ progressRef }: { progressRef: ProgressRef }) {
  const scan = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    if (!scan.current || !material.current) return;
    const progress = progressRef.current;
    const active = between(progress, 0.665, 0.68) * (1 - between(progress, 0.72, 0.735));
    const travel = between(progress, 0.67, 0.72);
    scan.current.position.x = 0.36 + travel * 0.88;
    material.current.opacity = active * 0.9;
  });

  return (
    <mesh ref={scan} position={[0.36, 0.6731, 0.031]} renderOrder={5}>
      <planeGeometry args={[0.025, 0.93]} />
      <meshBasicMaterial ref={material} color="#72ffd0" transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

const cameraFrames = [
  { at: 0, position: new THREE.Vector3(4.25, 2.28, 3.65), target: new THREE.Vector3(1.42, 0.08, -0.7) },
  { at: 0.22, position: new THREE.Vector3(3.65, 1.65, 2.08), target: new THREE.Vector3(2.12, 0.05, -0.75) },
  { at: 0.4, position: new THREE.Vector3(3.15, 1.55, 2.35), target: new THREE.Vector3(1.72, 0.1, -0.72) },
  { at: 0.6, position: new THREE.Vector3(2.55, 1.72, 2.42), target: new THREE.Vector3(0.8, 0.02, -0.68) },
  { at: 0.71, position: new THREE.Vector3(1.55, 2.75, 1.35), target: new THREE.Vector3(0.8, 0, -0.69) },
  { at: 0.82, position: new THREE.Vector3(2.45, 1.48, 2.15), target: new THREE.Vector3(0.78, 0.02, -0.69) },
  { at: 1, position: new THREE.Vector3(3.05, 1.7, 1.55), target: new THREE.Vector3(0.52, 0.04, -0.69) },
];

function sampleCamera(progress: number) {
  let from = cameraFrames[0];
  let to = cameraFrames[cameraFrames.length - 1];
  for (let i = 0; i < cameraFrames.length - 1; i += 1) {
    if (progress >= cameraFrames[i].at && progress <= cameraFrames[i + 1].at) {
      from = cameraFrames[i];
      to = cameraFrames[i + 1];
      break;
    }
  }
  const t = smooth((progress - from.at) / (to.at - from.at || 1));
  return {
    position: from.position.clone().lerp(to.position, t),
    target: from.target.clone().lerp(to.target, t),
  };
}

function CameraRig({ progressRef }: { progressRef: ProgressRef }) {
  const { camera, size } = useThree();
  // Keep a stable target object across frames and hot reloads. Copying into it
  // preserves the direct, no-lag camera motion without changing hook order.
  const target = useRef(new THREE.Vector3(1.4, 0.05, -0.7));

  useFrame(() => {
    const frame = sampleCamera(progressRef.current);
    if (size.width < 820) {
      const away = frame.position.clone().sub(frame.target).multiplyScalar(1.28);
      frame.position.copy(frame.target).add(away);
      frame.position.y += 0.32;
    }
    // The shared scroll playhead is already smoothed. A second camera filter
    // would lag behind the cloth, and pointer parallax adds unrelated movement.
    camera.position.copy(frame.position);
    target.current.copy(frame.target);
    camera.lookAt(target.current);
  });
  return null;
}

function InspectionLights({ progressRef }: { progressRef: ProgressRef }) {
  const top = useRef<THREE.PointLight>(null);
  const bottom = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const strength = flashStrength(progressRef.current);
    if (top.current) top.current.intensity = strength * 15;
    if (bottom.current) bottom.current.intensity = strength * 11;
  });

  return (
    <>
      <pointLight ref={top} color="#fff9f0" distance={2.4} decay={2} position={[0.716, 0.88, -0.742]} intensity={0} />
      <pointLight ref={bottom} color="#edf5ff" distance={2.1} decay={2} position={[0.743, -0.5, -0.729]} intensity={0} />
    </>
  );
}

function ScannerStage({ progressRef, active }: { progressRef: ProgressRef; active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.65]}
      shadows
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [4.25, 2.28, 3.65], fov: 32, near: 0.01, far: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      fallback={<div className="webgl-fallback">3D preview requires WebGL.</div>}
    >
      <MachineLighting theme="dark" />
      <Suspense fallback={<SceneLoading />}>
        <ScannerModel progressRef={progressRef} />
      </Suspense>
      <InspectionLights progressRef={progressRef} />
      <CameraRig progressRef={progressRef} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.4, -0.87, -0.7]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <shadowMaterial opacity={.5} transparent />
      </mesh>
    </Canvas>
  );
}

function ResultMark() {
  return (
    <svg viewBox="0 0 74 74" aria-hidden="true">
      <circle cx="37" cy="37" r="32" />
      <path d="m22 38 10 10 21-24" />
    </svg>
  );
}

export default function ScannerExperience({ embedded = false }: { embedded?: boolean }) {
  const journeyRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [sceneActive, setSceneActive] = useState(!embedded);
  const [sceneLoaded, setSceneLoaded] = useState(!embedded);
  const Shell = embedded ? 'section' : 'main';
  const Title = embedded ? 'h2' : 'h1';
  const journeyId = embedded ? 'robot-cycle' : 'top';
  const titleId = embedded ? 'robot-title' : 'page-title';

  useEffect(() => {
    const element = sceneRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setSceneActive(entry.isIntersecting);
      if (entry.isIntersecting) setSceneLoaded(true);
    }, { rootMargin: '200px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const journey = journeyRef.current;
    const shell = shellRef.current;
    if (!journey || !shell) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const playhead = { value: 0 };
    const updateVisuals = (progress: number) => {
      progressRef.current = progress;
      const flash = flashStrength(progress);
      const resultIn = between(progress, 0.71, 0.76);
      const resultOut = between(progress, 0.835, 0.88);
      const result = clamp01(resultIn - resultOut);
      const scan = between(progress, 0.665, 0.72);
      shell.style.setProperty('--journey-progress', progress.toFixed(4));
      shell.style.setProperty('--flash-strength', flash.toFixed(4));
      shell.style.setProperty('--result-progress', result.toFixed(4));
      shell.style.setProperty('--scan-progress', scan.toFixed(4));
      shell.style.setProperty('--intro-progress', between(progress, 0.035, 0.095).toFixed(4));
      const thresholds = [0.08, 0.18, 0.3, 0.45, 0.61, 0.68, 0.74];
      const nextStep = thresholds.reduce((index, threshold) => index + (progress >= threshold ? 1 : 0), 0);
      if (nextStep !== activeStepRef.current) {
        activeStepRef.current = nextStep;
        setActiveStep(nextStep);
      }
    };

    const tween = gsap.to(playhead, {
      value: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: journey,
        start: 'top top',
        end: 'bottom bottom',
        scrub: reducedMotion ? true : 0.9,
      },
      // One writer for the entire scene: raw ScrollTrigger progress would
      // fight the scrubbed value and make the model jump on every wheel event.
      onUpdate: () => updateVisuals(playhead.value),
    });

    updateVisuals(playhead.value);
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const step = steps[activeStep];

  return (
    <Shell ref={shellRef} className={`experience-shell${embedded ? ' robot-embedded' : ''}`} id={embedded ? 'how-the-robot-works' : undefined} aria-labelledby={embedded ? titleId : undefined}>
      {!embedded && <header className="site-header">
        <Link href="/" className="brand" aria-label="Cloth Scanner home">
          <span className="brand-icon" aria-hidden="true"><i /><i /><i /></span>
          <span>CLOTH SCANNER</span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/">Overview</Link>
          <a href="#top" className="active" aria-current="page">How it works</a>
          <a href="#specifications">Specifications</a>
        </nav>
        <span className="system-state"><i /> {activeStep >= 6 ? 'Quality verified' : 'System ready'}</span>
      </header>}

      <section ref={journeyRef} id={journeyId} className="scroll-journey" aria-labelledby={titleId}>
        <div className="sticky-stage">
          <div ref={sceneRef} className="scene-layer" aria-label="Interactive 3D cloth scanner animation">
            {sceneLoaded && <ScannerStage progressRef={progressRef} active={sceneActive} />}
          </div>
          <div className="scene-vignette" aria-hidden="true" />
          <div className="grid-overlay" aria-hidden="true" />
          <div className="flash-layer" aria-hidden="true" />

          <div className="intro-copy">
            <p className="eyebrow"><span>{embedded ? '04' : '01'}</span> {embedded ? 'How the robot works' : 'Automated inspection'}</p>
            <Title id={titleId} className="robot-heading">From fabric to<br /><em>verified quality.</em></Title>
            <p className="lede">Scroll through one complete scan cycle—from four-point pickup to an accepted result.</p>
          </div>

          <aside className="step-panel" aria-live="polite">
            <div className="step-index">{String(activeStep).padStart(2, '0')} <span>/ 07</span></div>
            <p>{step.kicker}</p>
            <h2>{step.title}</h2>
            <div className="step-rule"><i /></div>
            <p className="step-copy">{step.copy}</p>
          </aside>

          <div className="telemetry" aria-hidden="true">
            <div><span>POSITION</span><strong>{activeStep < 3 ? 'INPUT' : activeStep < 7 ? 'SCAN BED' : 'ACCEPTED'}</strong></div>
            <div><span>GRIP</span><strong>{activeStep === 0 || activeStep === 4 || activeStep === 5 || activeStep === 6 ? 'OPEN' : '4 / 4'}</strong></div>
            <div><span>OPTICS</span><strong>{activeStep === 4 || activeStep === 5 ? 'ACTIVE' : 'STANDBY'}</strong></div>
            <div className="scan-meter"><span>SCAN</span><i><b /></i></div>
          </div>

          <div className="result-modal" role="status" aria-label="Inspection result accepted">
            <ResultMark />
            <div>
              <span>Inspection result</span>
              <strong>Accepted</strong>
              <p>Quality threshold passed · 99.2% confidence</p>
            </div>
          </div>

          <div className="stage-readout" aria-hidden="true">
            <span>SCANNER / V2.0</span><span>OPTICAL AXIS CLEAR</span><span>4-POINT GRIP</span>
          </div>

          <div className="journey-rail" aria-hidden="true">
            <span>PROCESS</span>
            <i><b /></i>
            <span>{String(activeStep).padStart(2, '0')}</span>
          </div>

          <div className="scroll-cue"><span className="mouse"><i /></span><span>Scroll to begin</span></div>
        </div>
      </section>

      <section id={embedded ? 'robot-cycle-complete' : 'specifications'} className="completion-panel">
        <p className="eyebrow"><span>✓</span> Cycle complete</p>
        <h2>Handled. Scanned.<br /><em>Verified.</em></h2>
        <p>Four-point handling keeps every cut controlled while dual-view imaging makes quality decisions visible and repeatable.</p>
        <a href={`#${journeyId}`}>Replay the process <span>↑</span></a>
      </section>
    </Shell>
  );
}

useGLTF.preload(MODEL_PATH);
