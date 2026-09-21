'use client';

import { Component, Suspense, useMemo, useRef, type ReactNode, type RefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { applyMachineFinish, surfaceFinish } from './machine-materials';
import MachineLighting from './machine-lighting';

type Progress = RefObject<number>;
const MODEL = '/models/scanning-table-v2.glb';
const ease = (p: number) => THREE.MathUtils.smoothstep(p, 0, 1);
const stage = (p: number, start: number, end: number) => ease((p - start) / (end - start));
const offsets = [new THREE.Vector3(0, 0, -.18), new THREE.Vector3(.24, 0, .56), new THREE.Vector3(0, 0, .58), new THREE.Vector3(-.12, 0, .78), new THREE.Vector3(-.12, 0, -.38), new THREE.Vector3(.45, 0, .65)];
const windows = [[0, .24], [.12, .46], [.23, .52], [.4, .67], [.35, .62], [.43, .72]];

function brushedRoughness() {
  // Fine, deterministic machining grain; no external texture download required.
  const size = 128;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    const grain = Math.sin(y * 13.37) * 9 + Math.sin(y * 3.71) * 5;
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const value = Math.round(226 + grain + Math.sin(x * .37 + y * 4.1) * 2);
      data[i] = data[i + 1] = data[i + 2] = value;
      data[i + 3] = 255;
    }
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

function metalGrainUVs(geometry: THREE.BufferGeometry) {
  geometry.computeBoundingBox();
  const size = geometry.boundingBox!.getSize(new THREE.Vector3());
  const axes = [0, 1, 2].sort((a, b) => size.getComponent(b) - size.getComponent(a));
  const position = geometry.getAttribute('position');
  const normal = geometry.getAttribute('normal');
  const planes = [0, 1, 2].map(face => axes.filter(axis => axis !== face));
  const uv = new Float32Array(position.count * 2);
  for (let i = 0; i < position.count; i++) {
    // Project along each part's long axis, switching plane on end faces.
    const nx = Math.abs(normal.getX(i)), ny = Math.abs(normal.getY(i)), nz = Math.abs(normal.getZ(i));
    const plane = planes[nx > ny && nx > nz ? 0 : ny > nz ? 1 : 2];
    uv[i * 2] = position.getComponent(i, plane[0]) * 2;
    uv[i * 2 + 1] = position.getComponent(i, plane[1]) * 32;
  }
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
}

function assemblyGroup(name: string, center: THREE.Vector3) {
  if (/^(FourClip|Clip_|Gripper|ClothCut)/.test(name)) return 5;
  if (/^(TopCam|Stand_|StandColumn|StandCarriage|CamStand|Collar)/.test(name)) return 3;
  if (/^(BotCam|BStand|BCollar)/.test(name)) return 4;
  if (/^(ScanGlass|LPost|HolderBar|LEDClip|LEDRod|TopCover)/.test(name)) return 2;
  if (/^(Gantry|Carriage|GBeam|GPost|HGR|HGH|Z|NEMA|Drive|Idler|Belt|Pillow|Motor|Shaft|Rail|EndStop|Tension|Block|Bridge|Coupling|Pulley)/.test(name)) return 1;
  if (/^Body/.test(name)) return center.z > .2 ? 3 : 4;
  if (/^(M[48]|TNut|HexNut|P[BCT]|Pivot)/.test(name) && center.z > .14) return 1;
  return 0;
}

function AssemblyModel({ progress }: { progress: Progress }) {
  const { scene } = useGLTF(MODEL);
  const root = useRef<THREE.Group>(null);
  const assembled = useMemo(() => {
    // Batch CAD fasteners by assembly and material to keep the detailed model efficient.
    const groups = Array.from({ length: 6 }, () => new THREE.Group());
    const grain = brushedRoughness();
    const buckets = new Map<string, { group: number; material: THREE.Material; geometries: THREE.BufferGeometry[]; hardware: boolean }>();
    scene.updateMatrixWorld(true);
    const parts: Array<{
      object: THREE.Mesh;
      box: THREE.Box3;
      center: THREE.Vector3;
      group: number;
      finish: string;
    }> = [];
    scene.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return;
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());
      const source = Array.isArray(object.material) ? object.material[0] : object.material;
      const finish = surfaceFinish(object.name, source.name);
      parts.push({ object, box, center, group: assemblyGroup(object.name, center), finish });
    });

    // Generic Fusion fastener names do not identify their parent assembly.
    // Attach each one to the nearest non-fastener part so bolts travel with the
    // camera, gantry, glass mount, or frame they actually connect.
    const anchors = parts.filter(part => part.finish !== 'hardware');
    for (const part of parts) {
      const { object, center, finish } = part;
      let group = part.group;
      if (finish === 'hardware' && anchors.length) {
        let nearest = anchors[0];
        let nearestScore = Number.POSITIVE_INFINITY;
        for (const anchor of anchors) {
          const score = anchor.box.distanceToPoint(center) + center.distanceTo(anchor.center) * .01;
          if (score < nearestScore) {
            nearest = anchor;
            nearestScore = score;
          }
        }
        group = nearest.group;
      }
      const source = Array.isArray(object.material) ? object.material[0] : object.material;
      const key = `${group}:${source.uuid}:${finish}`;
      if (!buckets.has(key)) {
        const material = source.clone();
        applyMachineFinish(material, object.name);
        if (material instanceof THREE.MeshStandardMaterial) {
          if (finish === 'steel' || finish === 'aluminum' || finish === 'hardware') {
            material.roughnessMap = grain;
          } else if (finish === 'rubber' || finish === 'housing') {
            // The shared machine finish already sets the hardware surfaces.
          } else if (/Glass_\(Clear\)/i.test(material.name)) {
            material.transparent = true; material.opacity = .22; material.depthWrite = false;
            material.color.set('#c0ece2'); material.metalness = .15; material.roughness = .12;
          } else if (/ClothCut/.test(object.name)) {
            material.color.set('#327f6d'); material.roughness = .95; material.metalness = 0;
          } else {
            material.roughness = Math.max(.25, Math.min(.65, material.roughness));
            material.envMapIntensity = 1.1;
          }
        }
        if (finish === 'hardware') {
          material.transparent = true;
          material.opacity = 0;
          material.depthWrite = false;
        }
        buckets.set(key, { group, material, geometries: [], hardware: finish === 'hardware' });
      }
      const geometry: THREE.BufferGeometry = object.geometry.clone();
      // The GLB uses normalized integer attributes. Expand these before baking
      // world transforms, otherwise positions outside [-1, 1] overflow.
      for (const [name, attribute] of Object.entries(geometry.attributes)) {
        const values = new Float32Array(attribute.count * attribute.itemSize);
        for (let i = 0; i < attribute.count; i++) {
          values[i * attribute.itemSize] = attribute.getX(i);
          if (attribute.itemSize > 1) values[i * attribute.itemSize + 1] = attribute.getY(i);
          if (attribute.itemSize > 2) values[i * attribute.itemSize + 2] = attribute.getZ(i);
          if (attribute.itemSize > 3) values[i * attribute.itemSize + 3] = attribute.getW(i);
        }
        geometry.setAttribute(name, new THREE.Float32BufferAttribute(values, attribute.itemSize));
      }
      geometry.applyMatrix4(object.matrixWorld);
      if (finish === 'steel' || finish === 'aluminum' || finish === 'hardware') metalGrainUVs(geometry);
      buckets.get(key)!.geometries.push(geometry);
    }
    for (const bucket of buckets.values()) {
      const geometry = mergeGeometries(bucket.geometries);
      if (geometry) {
        const mesh = new THREE.Mesh(geometry, bucket.material);
        mesh.userData.hardware = bucket.hardware;
        mesh.castShadow = !bucket.material.transparent;
        mesh.receiveShadow = true;
        groups[bucket.group].add(mesh);
        bucket.geometries.forEach(part => part.dispose());
      } else {
        // Retain unusual CAD primitives if their attributes cannot be merged.
        bucket.geometries.forEach(part => {
          const mesh = new THREE.Mesh(part, bucket.material);
          mesh.userData.hardware = bucket.hardware;
          groups[bucket.group].add(mesh);
        });
      }
    }
    return groups;
  }, [scene]);

  useFrame(() => {
    const group = root.current;
    if (!group) return;
    const p = progress.current;
    group.children.forEach((child, index) => {
      const arrival = stage(p, windows[index][0], windows[index][1]);
      child.position.copy(offsets[index]).multiplyScalar(1 - arrival);
      // Small fasteners become visible only when their connected assembly is
      // almost seated, preventing isolated screws from floating in the scene.
      const fastenerArrival = stage(p, windows[index][1] - .045, windows[index][1]);
      child.children.forEach(part => {
        if (!(part instanceof THREE.Mesh) || !part.userData.hardware) return;
        part.visible = fastenerArrival > .001;
        const material = part.material;
        if (!Array.isArray(material)) material.opacity = fastenerArrival;
      });
    });
  });

  return <group rotation={[-Math.PI / 2, 0, 0]}><group position={[-1.466, -.776, .864]}><group ref={root}>{assembled.map((group, index) => <primitive key={index} object={group} />)}</group></group></group>;
}

function AssemblyCamera({ progress }: { progress: Progress }) {
  const { camera, size } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const p = progress.current;
    const zoom = stage(p, .64, 1);
    const orbit = stage(p, .1, 1);
    const aspect = size.width / Math.max(size.height, 1);
    const verticalFov = THREE.MathUtils.degToRad(32);
    const fit = Math.max(3.2 / (2 * Math.tan(verticalFov / 2)), 4.15 / (2 * Math.tan(verticalFov / 2) * aspect));
    const distance = fit * (1.05 - zoom * .23);
    const angle = .51 - orbit * .18;
    target.set(-zoom * .1, 1.15 - zoom * .12, 0);
    camera.position.set(target.x + Math.sin(angle) * distance, target.y + distance * .43, Math.cos(angle) * distance);
    camera.lookAt(target);
  });
  return null;
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <div className="assembly-loading">The 3D model couldn’t load.<button onClick={() => window.location.reload()}>Retry</button></div> : this.props.children;
  }
}

export default function AssemblyScene({ progress, theme, active = true }: { progress: Progress; theme: 'light' | 'dark'; active?: boolean }) {
  const dark = theme === 'dark';
  return <SceneBoundary><Canvas frameloop={active ? 'always' : 'never'} shadows dpr={[1, 1.5]} camera={{ position: [4, 4, 8], fov: 32, near: .1, far: 50 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} fallback={<div className="assembly-loading">Enable WebGL to explore the 3D robot.</div>}>
    <MachineLighting theme={theme} />
    <Suspense fallback={<Html center><div className="assembly-loading">Loading scanner<span /></div></Html>}>
      <AssemblyModel progress={progress} />
    </Suspense>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.2, 0]} receiveShadow><planeGeometry args={[30, 30]} /><shadowMaterial opacity={dark ? .5 : .2} transparent /></mesh>
    <AssemblyCamera progress={progress} />
  </Canvas></SceneBoundary>;
}
