import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Container, Box, Button } from '@chakra-ui/react';

function Bike(props) {
  const { nodes, materials } = useGLTF('/bike-model.glb');
  const bikeRef = useRef();
  const [speed, setSpeed] = useState(0);

  useFrame((state, delta) => {
    if (bikeRef.current) {
      bikeRef.current.position.z -= speed * delta;
    }
  });

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
  };

  return (
    <group ref={bikeRef} {...props} dispose={null}>
      <mesh geometry={nodes.Bike.geometry} material={materials.BikeMaterial} />
      <Button onClick={() => handleSpeedChange(speed + 1)}>Accelerate</Button>
      <Button onClick={() => handleSpeedChange(speed - 1)}>Decelerate</Button>
    </group>
  );
}

const Index = () => {
  return (
    <Container centerContent maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box width="100%" height="80vh">
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Bike position={[0, 0, 0]} />
          <OrbitControls />
        </Canvas>
      </Box>
    </Container>
  );
};

export default Index;