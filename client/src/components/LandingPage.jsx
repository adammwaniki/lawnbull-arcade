import { ParticlesBackground } from "./ParticlesBackground"
import Lottie from "lottie-react";
import animationData from "../assets/lawnbull-running-animation.json"
import Navbar from "./Navbar"

export default function LandingPage() {
    return (
      <div className=" relative flex flex-row items-center justify-center min-h-screen min-w-full ">
        <div className=" flex flex-col ">
          <ParticlesBackground />
          <div className=" lawnbull-intro z-10">
            <h1 className="text-[6rem] lg:text-[10vw] text-white text-center font-wunderbar ">
              Lawnbull Arcade
            </h1>
          </div>
          <Lottie animationData={animationData} className="h-[40vh]"/>
        </div>
        <div className="absolute right-0">
          <Navbar />
        </div>

      </div>
    )
  }
  
