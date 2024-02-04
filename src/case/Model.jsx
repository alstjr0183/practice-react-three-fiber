import { useEffect, useState } from "react";

import {
  Environment,
  OrbitControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { useControls } from "leva";

export default function Model() {
  // useGLTF는 glTF 파일을 로드하는 훅
  const model = useGLTF("./models/model.glb");

  // useAnimations는 glTF 파일에 포함된 애니메이션을 로드하는 훅
  const animations = useAnimations(model.animations, model.scene);

  // useControls는 leva를 사용하여 컨트롤을 생성하는 훅
  const { actionName } = useControls({
    actionName: {
      value: animations.names[0],
      options: animations.names,
    },
  });

  const [height, setHeight] = useState(0);

  // 처음엔 모델이 중앙에 위치하기때문에 높이를 계산하여 모델을 중앙에 위치시킴
  useEffect(() => {
    let minY = Infinity;
    let maxY = -Infinity;

    model.scene.traverse((item) => {
      if (item.isMesh) {
        const geomBbox = item.geometry.boundingBox;

        if (minY > geomBbox.min.y) minY = geomBbox.min.y;
        if (maxY < geomBbox.max.y) maxY = geomBbox.max.y;
      }
    });

    const h = maxY - minY;

    setHeight(h);
  }, [model.scene]);

  // 애니메이션을 실행 leva의 control에 의해 actionName이 변경될 때마다 실행
  useEffect(() => {
    const action = animations.actions[actionName];

    // 애니메이션을 리셋하고 fadeIn, play를 호출하여 애니메이션을 실행
    action.reset().fadeIn(0.5).play();

    return () => {
      // 애니메이션을 fadeOut하여 종료
      action.fadeOut(0.5);
    };
  }, [actionName]);

  return (
    <>
      <OrbitControls />

      <Environment preset='sunset' />

      <primitive
        object={model.scene}
        scale={5}
        position-y={-(height / 2) * 5}
      />
    </>
  );
}
