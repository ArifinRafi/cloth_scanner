import * as THREE from 'three';

export function surfaceFinish(name: string, materialName: string) {
  if (/Cable|GripperWire|ContactPad|Clamp_Pad|Belt|LockKnob|DriveKnob/.test(name)) return 'rubber';
  if (/CameraHousing|LensBarrel|NEMA|MotorHousing/.test(name)) return 'housing';
  if (/Bolt|Nut|Screw|^M[48]_|PivotPin|Shank/.test(name)) return 'hardware';
  if (/Aluminum/i.test(materialName)) return 'aluminum';
  if (/Steel/i.test(materialName)) return 'steel';
  return 'original';
}

export function applyMachineFinish(material: THREE.Material, name: string) {
  if (!(material instanceof THREE.MeshStandardMaterial)) return;
  const finish = surfaceFinish(name, material.name);
  if (finish === 'steel' || finish === 'aluminum' || finish === 'hardware') {
    material.color.set(finish === 'steel' ? '#929da5' : finish === 'aluminum' ? '#b0b8be' : '#707980');
    material.metalness = finish === 'aluminum' ? .94 : 1;
    material.roughness = finish === 'steel' ? .38 : finish === 'aluminum' ? .46 : .3;
    material.envMapIntensity = 1;
    material.emissive.set('#000000');
  } else if (finish === 'rubber' || finish === 'housing') {
    material.color.set(finish === 'rubber' ? '#202326' : '#343b40');
    material.metalness = finish === 'rubber' ? 0 : .65;
    material.roughness = finish === 'rubber' ? .88 : .43;
  }
}
