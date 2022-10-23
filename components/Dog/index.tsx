// React
import React, { useCallback, useEffect, useRef, useState } from 'react';

// libs
import { loadGLTFModel } from '../../lib/models';

// packages
import { Vector3 } from 'three/src/math/Vector3.js';
import { Scene } from 'three/src/scenes/Scene.js';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer.js';
import { OrthographicCamera } from 'three/src/cameras/OrthographicCamera.js';
import { AmbientLight } from 'three/src/lights/AmbientLight.js';
import { sRGBEncoding } from 'three/src/constants.js';

import styled from 'styled-components';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDog: React.FC = () => {
  const refBody = useRef<HTMLDivElement>(null);
  const [_, setLoading] = useState<boolean>(true);
  const [renderer, setRenderer] = useState<any>();
  const [_camera, setCamera] = useState<any>();
  const [target] = useState(new Vector3(-0.5, 1.2, 0));
  const [initialCameraPosition] = useState(
    new Vector3(20 * Math.sin(0.2 * Math.PI), 10, 20 * Math.cos(0.2 * Math.PI))
  );
  const [scene] = useState(new Scene());
  const [_controls, setControls] = useState<any>();

  const handleWindowResize = useCallback(() => {
    const { current: container } = refBody;
    if (container && renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      renderer.setSize(scW, scH);
    }
  }, [renderer]);

  const easeOutCirc = (x: number) => {
    return Math.sqrt(1 - Math.pow(x - 1, 4));
  };

  useEffect(() => {
    const { current: container } = refBody;
    if (container && !renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(scW, scH);

      renderer.outputEncoding = sRGBEncoding;
      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      const scale = scH * 0.01 + 4;
      const camera = new OrthographicCamera(
        -scale,
        scale,
        scale,
        -scale / 1,
        1,
        50000
      );
      camera.position.copy(initialCameraPosition);
      camera.lookAt(target);
      setCamera(camera);

      const ambientLight = new AmbientLight(0xcccccc, 1);
      scene.add(ambientLight);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.target = target;
      setControls(controls);

      loadGLTFModel(scene, '/voxel_dog/scene.gltf', {
        receiveShadow: false,
        castShadow: false,
      }).then(() => {
        animate();
        setLoading(false);
      });

      let req: any = null;
      let frame = 0;
      const animate = () => {
        req = requestAnimationFrame(animate);

        frame = frame <= 100 ? frame + 1 : frame;

        if (frame <= 100) {
          const p = initialCameraPosition;
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;

          camera.position.y = 10;
          camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
          camera.position.z =
            p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
          camera.lookAt(target);
        } else {
          controls.update();
        }

        renderer.render(scene, camera);
      };

      return () => {
        cancelAnimationFrame(req);
        renderer.dispose();
      };
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false);
    return () => {
      window.removeEventListener('resize', handleWindowResize, false);
    };
  }, [renderer, handleWindowResize]);

  return <DogModel ref={refBody}></DogModel>;
};

const DogModel = styled.div`
  position: absolute;
  top: 50px;
  right: 10px;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

export default ThreeDog;
