import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  const ref = useRef();
  useFrame((state) => {
    const scrollY = state.viewport.scroll;
    ref.current.rotation.y = scrollY * 0.1;
  });
  return <primitive object={gltf.scene} ref={ref} />;
}

export default function Home() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Model url="/scene.glb" />
    </Canvas>
  );
}
