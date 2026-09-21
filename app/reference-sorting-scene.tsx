'use client';

import { Component, Suspense, type ReactNode, type RefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { ScannerModel, InspectionLights, sampleCamera } from './scanner-experience';
import MachineLighting from './machine-lighting';

function Camera({ progress }: { progress: RefObject<number> }) {
  const { camera, size } = useThree();
  useFrame(() => {
    const frame = sampleCamera(progress.current);
    const fit = Math.max(1.08, 1.45 / (size.width / Math.max(1, size.height)));
    camera.position.copy(frame.target).add(frame.position.sub(frame.target).multiplyScalar(fit));
    camera.lookAt(frame.target);
  });
  return null;
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <div className="reference-scene-loading" role="status">The 3D scene could not load. You can still explore every step by scrolling.<button onClick={() => window.location.reload()}>Retry 3D</button></div> : this.props.children;
  }
}

export default function SortingScene({ progress, active }: { progress: RefObject<number>; active: boolean }) {
  return <SceneBoundary><Canvas frameloop={active ? 'always' : 'never'} shadows dpr={[1, 1.5]}
    camera={{ position: [4.25, 2.28, 3.65], fov: 32, near: .01, far: 40 }}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    fallback={<div className="reference-scene-loading">Enable WebGL to see the sorting animation.</div>}>
    <MachineLighting theme="light" />
    <Suspense fallback={<Html center><span className="reference-scene-loading-label">Loading scanner…</span></Html>}>
      <ScannerModel progressRef={progress} />
    </Suspense>
    <InspectionLights progressRef={progress} />
    <Camera progress={progress} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.4, -.87, -.7]} receiveShadow>
      <planeGeometry args={[30, 30]} /><shadowMaterial opacity={.2} transparent />
    </mesh>
  </Canvas></SceneBoundary>;
}
