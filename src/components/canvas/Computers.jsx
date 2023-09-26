import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from '../Loader'

const Computers = ( {isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')
  
  return (
    <mesh>
      <hemisphereLight intensity={1.75}
      groundColor="black" />
      <pointLight intensity={2} />
      <spotLight
        penumbra={1}
        intensity={100}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive 
        object={computer.scene}
        scale={isMobile ? 0.35 : 0.65}
        position={isMobile ? [0, -1.5, -0.75] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    //assume it's a mobile if the max-width is 500 or less
    const mediaQuery = window.matchMedia('(max-width: 500px)')

    setIsMobile(mediaQuery.matches)

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches)
    }

    //listen to mediaQuery changing and run handleMediaQueryChange funtion
    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [25, 3, 5], fov: 25}}
      gl={{ preserveDrawingBuffer: true}}>
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}/>
          <Computers isMobile={isMobile}/>
        </Suspense>
          <Preload all/>
    </Canvas>
  )
}

export default ComputersCanvas