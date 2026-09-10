'use client';

import { Environment, Lightformer } from '@react-three/drei';

// One lighting rig keeps the assembly and inspection scenes visually consistent.
export default function MachineLighting({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  const dark = theme === 'dark';
  return <>
    <ambientLight intensity={dark ? .2 : .35} />
    <hemisphereLight args={['#f1f5fa', dark ? '#101817' : '#535a60', .65]} />
    <directionalLight position={[3, 7, 5]} color="#fff8ed" intensity={dark ? 2.2 : 1.8} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-4} shadow-camera-right={4} shadow-camera-top={4} shadow-camera-bottom={-4} shadow-normalBias={.025} />
    <directionalLight position={[-4, 3, -3]} color={dark ? '#a9cfbf' : '#c7d6e7'} intensity={dark ? 1.2 : .8} />
    <Environment key={theme} resolution={256} frames={1}>
      <color attach="background" args={[dark ? '#22282c' : '#41494f']} />
      <Lightformer color="#fff8ef" intensity={2.4} position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[7, 2, 1]} />
      <Lightformer color="#e3edff" intensity={1.8} position={[-5, 2, 2]} rotation={[0, Math.PI / 2, 0]} scale={[2, 6, 1]} />
      <Lightformer color="#ffffff" intensity={1.4} position={[3, 2, 5]} scale={[1.5, 5, 1]} />
    </Environment>
  </>;
}
