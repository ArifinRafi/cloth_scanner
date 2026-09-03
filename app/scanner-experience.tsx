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
    return { x: mix(glass.x, outputAir.x, t), y: glass.y, z: mix(0.17, outputAir.z, Math.sin(t * Math.PI)) };
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

function FabricSheet({ progressRef }: { progressRef: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh<THREE.PlaneGeometry>>(null);
  const basePositions = useRef<Float32Array | null>(null);

  useFrame(() => {
    if (!group.current || !mesh.current) return;
    const progress = progressRef.current;
    const motion = clothMotion(progress);
    group.current.position.set(
      CLOTH_ORIGIN.x + motion.x,
      CLOTH_ORIGIN.y + motion.y,
      CLOTH_ORIGIN.z + motion.z,
    );

    const airborne = clamp01(between(progress, 0.29, 0.35) - between(progress, 0.51, 0.58) + between(progress, 0.86, 0.91) - between(progress, 0.96, 1));
    group.current.rotation.z = Math.sin(progress * Math.PI * 5) * 0.012 * airborne;
    const geometry = mesh.current.geometry;
    const position = geometry.attributes.position as THREE.BufferAttribute;
    if (!basePositions.current) basePositions.current = Float32Array.from(position.array);
    const original = basePositions.current;
    const time = progress * 18;
    for (let i = 0; i < position.count; i += 1) {
      const x = original[i * 3];
      const y = original[i * 3 + 1];
      const nx = Math.abs(x) / 0.462;
      const ny = Math.abs(y) / 0.462;
      const centerSag = Math.max(0, (1 - nx * nx) * (1 - ny * ny));
      const ripple = Math.sin(x * 20 + time * 1.4) * Math.sin(y * 17 - time) * 0.0025;
      position.setZ(i, (-0.028 * centerSag + ripple) * airborne);
    }
    position.needsUpdate = true;
  });

  return (
    <group ref={group} position={CLOTH_ORIGIN}>
      <mesh ref={mesh} castShadow receiveShadow>
        <planeGeometry args={[0.924, 0.924, 40, 40]} />
        <meshStandardMaterial color="#a8495f" roughness={0.92} metalness={0} side={THREE.DoubleSide} />
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
        if (material.name === 'Glass_(Clear)') {
          child.material = new THREE.MeshPhysicalMaterial({
            name: material.name,
            color: '#c8f6ed',
            transmission: 0.88,
            transparent: true,
            opacity: 0.3,
            roughness: 0.06,
            metalness: 0,
            thickness: 0.018,
            ior: 1.47,
          });
        }
        if (/LED_RingLight/.test(child.name)) {
          const led = new THREE.MeshStandardMaterial({
            name: 'Inspection_LED',
            color: '#caffee',
            emissive: '#a8ffe2',
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
  const { camera, pointer, size } = useThree();
  const target = useRef(new THREE.Vector3(1.4, 0.05, -0.7));

  useFrame((_, delta) => {
    const frame = sampleCamera(progressRef.current);
    if (size.width < 820) {
      const away = frame.position.clone().sub(frame.target).multiplyScalar(1.28);
      frame.position.copy(frame.target).add(away);
      frame.position.y += 0.32;
    }
    frame.position.x += pointer.x * 0.12;
    frame.position.y += pointer.y * 0.06;
    const damping = 1 - Math.exp(-delta * 4.2);
    camera.position.lerp(frame.position, damping);
    target.current.lerp(frame.target, damping);
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
      <pointLight ref={top} color="#dffff5" distance={2.4} decay={2} position={[0.716, 0.88, -0.742]} intensity={0} />
      <pointLight ref={bottom} color="#a7ffdc" distance={2.1} decay={2} position={[0.743, -0.5, -0.729]} intensity={0} />
    </>
  );
}

function ScannerStage({ progressRef }: { progressRef: ProgressRef }) {
  return (
    <Canvas
      dpr={[1, 1.65]}
      shadows
      camera={{ position: [4.25, 2.28, 3.65], fov: 32, near: 0.01, far: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      fallback={<div className="webgl-fallback">3D preview requires WebGL.</div>}
    >
      <color attach="background" args={['#07100f']} />
      <fog attach="fog" args={['#07100f', 5.2, 9]} />
      <hemisphereLight args={['#d8fff2', '#020806', 1.15]} />
      <directionalLight castShadow color="#dcfff4" intensity={2.9} position={[3.8, 5.2, 2.8]} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0002} />
      <spotLight color="#3dd6a1" intensity={7} position={[-1, 3, 2]} angle={0.42} penumbra={0.9} distance={8} />
      <Suspense fallback={<SceneLoading />}>
        <ScannerModel progressRef={progressRef} />
      </Suspense>
      <InspectionLights progressRef={progressRef} />
      <CameraRig progressRef={progressRef} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.4, -0.87, -0.7]} receiveShadow>
        <planeGeometry args={[7, 6]} />
        <shadowMaterial transparent opacity={0.34} />
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

export default function ScannerExperience() {
  const journeyRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);

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
        scrub: reducedMotion ? 0.01 : 0.75,
        onUpdate: (self) => updateVisuals(self.progress),
      },
      onUpdate: () => updateVisuals(playhead.value),
    });

    updateVisuals(0);
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const step = steps[activeStep];

  return (
    <main ref={shellRef} className="experience-shell">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="WeaveScan home">
          <span className="brand-icon" aria-hidden="true"><i /><i /><i /></span>
          <span>WEAVESCAN</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#overview">Overview</a>
          <a href="#top" className="active" aria-current="page">How it works</a>
          <a href="#specifications">Specifications</a>
        </nav>
        <span className="system-state"><i /> {activeStep >= 6 ? 'Quality verified' : 'System ready'}</span>
      </header>

      <section ref={journeyRef} id="top" className="scroll-journey" aria-labelledby="page-title">
        <div className="sticky-stage">
          <div className="scene-layer" aria-label="Interactive 3D cloth scanner animation">
            <ScannerStage progressRef={progressRef} />
          </div>
          <div className="scene-vignette" aria-hidden="true" />
          <div className="grid-overlay" aria-hidden="true" />
          <div className="flash-layer" aria-hidden="true" />

          <div className="intro-copy">
            <p className="eyebrow"><span>01</span> Automated inspection</p>
            <h1 id="page-title">From fabric to<br /><em>verified quality.</em></h1>
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

      <section id="specifications" className="completion-panel">
        <p className="eyebrow"><span>✓</span> Cycle complete</p>
        <h2>Handled. Scanned.<br /><em>Verified.</em></h2>
        <p>Four-point handling keeps every cut controlled while dual-view imaging makes quality decisions visible and repeatable.</p>
        <a href="#top">Replay the process <span>↑</span></a>
      </section>
    </main>
  );
}

useGLTF.preload(MODEL_PATH);
