// "use client";

// import React, { useRef, useEffect, useState } from 'react';
// import * as THREE from 'three';
// //@ts-ignore
// import CLOUDS from 'vanta/dist/vanta.clouds.min';

// interface CloudBackgroundProps {
//   skyColor?: number;
//   cloudColor?: number;
//   cloudShadowColor?: number;
//   sunColor?: number;
//   sunShadowColor?: number;
//   fogColor?: number;
//   speed?: number;
//   zoom?: number;
//   [key: string]: any; 
// }

// const CloudBackground: React.FC<CloudBackgroundProps> = ({
//   skyColor = 0x3887c4,
//   cloudColor = 0xffffff,
//   cloudShadowColor = 0x1f2626,
//   sunColor = 0xffa85c,
//   sunShadowColor = 0xff6b1c,
//   fogColor = 0x1f2626,
//   speed = 1.0,
//   zoom = 1.0,
//   ...otherProps
// }) => {
//   const vantaRef = useRef<HTMLDivElement>(null);
//   const [vantaEffect, setVantaEffect] = useState<any>(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined' && vantaRef.current && !vantaEffect) {
//       const effect = CLOUDS({
//         el: vantaRef.current,
//         THREE: window.THREE || THREE,
//         skyColor: skyColor,
//         cloudColor: cloudColor,
//         cloudShadowColor: cloudShadowColor,
//         sunColor: sunColor,
//         sunShadowColor: sunShadowColor,
//         fogColor: fogColor,
//         speed: speed,
//         zoom: zoom,
//         ...otherProps,
//       });
//       setVantaEffect(effect);
      
//       return () => {
//         if (effect) effect.destroy();
//       };
//     }
//   }, [
//     vantaEffect,
//     skyColor,
//     cloudColor,
//     cloudShadowColor,
//     sunColor,
//     sunShadowColor,
//     fogColor,
//     speed,
//     zoom,
//     otherProps,
//   ]);

//   return (
//     <div 
//       ref={vantaRef} 
//       style={{ 
//         width: '100%', 
//         height: '100vh',
//         position: 'fixed',
//         zIndex: -1,
//         top: 0, 
//         left: 0 
//       }} 
//     />
//   );
// };

// export default CloudBackground;

import React, { useEffect, useRef } from 'react';
import * as THREE from "three";
import FOG from "vanta/dist/vanta.clouds.min";
// import "./VantaBackground.css";
 
export default function VantaBackground() {

  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = FOG({
      el: vantaRef.current,
      THREE,
      minHeight: 300.0,
      minWidth: 500.0,
      highlightColor: 0x157fc5,
      midtoneColor: 0xb81f69,
      lowlightColor: 0x100000,
      blueFactor: 0.6,
      speed: 2,
      zoom: 1.5
    })

    return () => {
      if(vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <main className="absolute top-0 bottom-0 -z-10 w-full h-full">
      <div className='' ref={vantaRef}></div>
    </main>
  )
}