import React from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

function Box() {
  // ref를 사용하여 mesh 객체에 접근
  const ref = React.useRef();

  // useFrame은 매 프레임마다 호출되는 훅 여기서 큐브의 회전을 처리
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  const xSize = 2;
  const ySize = 2;
  const zSize = 2;

  const xText = xSize / 2 + 0.5;
  const yText = ySize / 2 + 0.5;
  const zText = zSize / 2 + 0.5;

  // JSX를 사용하여 큐브(mesh)를 렌더링
  // geometry는 큐브의 형태를, material은 큐브의 재질을 정의
  return (
    <mesh ref={ref}>
      {/* 실제적인 도형 생성 - 사각형 */}
      <boxGeometry attach='geometry' args={[xSize, ySize, zSize]} />

      {/* 도형의 재질 설정 */}
      <meshStandardMaterial attach='material' color='green' />

      {/* 포지션 이해를 위한 x,y,z축 텍스트 */}
      <Text position={[xText, 0, 0]} fontSize={0.5} color='red'>
        X
      </Text>
      <Text position={[0, yText, 0]} fontSize={0.5} color='blue'>
        Y
      </Text>
      <Text position={[0, 0, zText]} fontSize={0.5} color='yellow'>
        Z
      </Text>
      <Text position={[-xText, 0, 0]} fontSize={0.5} color='red'>
        X
      </Text>
      <Text position={[0, -yText, 0]} fontSize={0.5} color='blue'>
        Y
      </Text>
      <Text position={[0, 0, -zText]} fontSize={0.5} color='yellow'>
        Z
      </Text>
    </mesh>
  );
  // attach 속성은 필수. 이 속성은 geometry, material 등의 객체를 어떤 속성에 연결할지를 결정.

  // 만약 three로 위 코드를 작성한다면
  // const geometry = new THREE.BoxGeometry(2, 2, 2); // 상자의 크기를 지정합니다.
  // const material = new THREE.MeshStandardMaterial({ color: 'green' }); // 재질의 색상을 지정합니다.
  // const mesh = new THREE.Mesh(geometry, material); // 기하학적 형태와 재질을 결합하여 메쉬를 생성합니다.
}

// react-three-fiber는 three.js 기반의 3D 렌더링 라이브러리
// three js로 무언갈 보여주려면 scene, camera, renderer 3가지 요소 필수
function App() {
  return (
    // Canvas는 three js의 scene, camera를 포함
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      {/* 배경 */}
      <color attach='background' args={["#171717"]} />

      {/* 조명 */}
      <directionalLight position={[0, 0, 1]} intensity={5} />

      {/* 큐브 ( renderer 역할 ) */}
      <Box />
    </Canvas>
  );
}

export default App;
