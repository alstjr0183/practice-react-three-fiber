import React from "react";

import { Canvas } from "@react-three/fiber";
import Start from "./case/Start";

// react-three-fiber는 three.js 기반의 3D 렌더링 라이브러리
// three js로 무언갈 보여주려면 scene, camera, renderer 3가지 요소 필수
function App() {
  return (
    // Canvas는 three js의 scene, camera를 포함
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <Start />
    </Canvas>
  );
}

export default App;
