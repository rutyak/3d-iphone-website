'use client';

import DisplaySection from "@/components/DisplaySection";
import Jumbotron from "@/components/Jumbotron";
import Navbar from "@/components/Navbar";
import ScrollGsapAnimation from "@/components/ScrollGsapAnimation";
import SoundSection from "@/components/SoundSection";
import dynamic from "next/dynamic";

export default function Home() {

  const WebgiViewer = dynamic(() => import("@/components/WebgiViewer"), {
    ssr: false,
  });

  return (
    <div className="App">
    <Navbar/>
    <Jumbotron />
    <SoundSection />
    <DisplaySection /> 
    {/* <WebgiViewer /> */}
    {/* <ScrollGsapAnimation /> */}
  </div>
  );
}
