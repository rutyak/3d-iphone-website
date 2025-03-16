"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  ViewerApp,
  addBasePlugins,
  AssetManagerBasicPopupPlugin,
  CanvasSnipperPlugin,
  TonemapPlugin,
  Object3D,
} from "webgi";
import { Vector3, Color } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import scrollingAnimation from "@/lib/ScrollingAnimation";
gsap.registerPlugin(ScrollTrigger);

function WebgiViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const memoizedScrollAnimation = useCallback(
    ({ position, target, onUpdate }: any) => {
      console.log(position, target, onUpdate);
      if (position && target && onUpdate) {
        scrollingAnimation({ position, target, onUpdate });
      }
    },
    []
  );
  
  const setupViewer = useCallback(async () => {
    if (!canvasRef.current) return () => {};

    const viewer: any = new ViewerApp({
      canvas: canvasRef.current,
      useRgbm: false,
    });

    const camera = viewer.scene.activeCamera;
    const position = camera.position;
    const target = camera.target;

    await addBasePlugins(viewer);
    await viewer.addPlugin(AssetManagerBasicPopupPlugin);
    await viewer.addPlugin(CanvasSnipperPlugin);
    await viewer.load("../../scene.glb");

    const tonemapPlugin = viewer.getPlugin(TonemapPlugin);
    if (tonemapPlugin) {
      (tonemapPlugin.config as any).clipBackground = true;
    }

    const activeCameraNode = viewer.scene.activeCameraNode;
    if (activeCameraNode && activeCameraNode.parent) {
      const model = activeCameraNode.parent as Object3D;
      model.scale.set(0.5, 0.5, 0.5);

      model.traverse((child: any) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material: any) => {
              material.color = new Color(0xff0000);
            });
          } else {
            child.material.color = new Color(0xff0000);
          }
        }
      });
    }

    viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: true });

    window.scrollTo(0, 0);

    let needUpdate = true;

    const onUpdate = () => {
      needUpdate = true;
      viewer.setDirty();
    };

    viewer.addEventListener("preFrame", () => {
      if (needUpdate) {
        camera.positionTargetUpdated(true);
        needUpdate = false;
      }
    });

    const resizeCanvas = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement;
        if (container) {
          canvasRef.current.style.width = "100%";
          canvasRef.current.style.height = "100%";
          viewer.resize(container.offsetWidth, container.offsetHeight);
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    memoizedScrollAnimation({ position, target, onUpdate });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const cleanup: any = setupViewer();
    // return () => {
    //     if (cleanup) {
    //         cleanup();
    //     }
    // };
  }, [setupViewer]);

  return (
    <div
      id="webgi-canvas-container"
      style={{ width: "100vw", height: "100vh" }}
    >
      <canvas id="webgi-canvas" ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}

export default WebgiViewer;
