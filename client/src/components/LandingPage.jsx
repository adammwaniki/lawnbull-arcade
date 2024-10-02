import { ParticlesBackground } from "./ParticlesBackground"
import Lottie from "lottie-react";
import animationData from "../assets/lawnbull-running-animation.json"


export default function LandingPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen min-w-full ">
        <ParticlesBackground />
        <div className=" lawnbull-intro z-10">
          <h1 className="text-[6rem] lg:text-[10vw] text-white text-center font-wunderbar ">
            Lawnbull Arcade
          </h1>
        </div>
        <Lottie animationData={animationData} className="h-[40vh]"/>
      </div>
    )
  }
  
