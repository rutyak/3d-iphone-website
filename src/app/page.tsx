"use client";

import CloudBackground from "@/components/VantaBackground";
import DisplaySection from "@/components/DisplaySection";
import Jumbotron from "@/components/Jumbotron";
import Navbar from "@/components/Navbar";
import SoundSection from "@/components/SoundSection";
import dynamic from "next/dynamic";
import VantaBackground from "@/components/VantaBackground";

export default function Home() {
  return (
    <div className="App">
      <Navbar />
      <Jumbotron />
      <SoundSection />
      <DisplaySection />
      {/* <VantaBackground /> */}
    </div>
  );
}