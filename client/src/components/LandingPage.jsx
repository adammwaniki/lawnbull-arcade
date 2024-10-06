import { ParticlesBackground } from "./ParticlesBackground"
import Lottie from "lottie-react";
import animationData from "../assets/bull-flexing-animation.json"
import Navbar from "./Navbar"
import Footer from "./Footer";

export default function LandingPage() {
    return (
      <div className=" relative flex flex-row items-center justify-center min-h-screen min-w-full ">
        <div className=" flex flex-col ">
          <ParticlesBackground />
          <div className=" lawnbull-intro z-10">
            <h1 className="text-[6rem] lg:text-[10vw] text-center font-wunderbar  ">
              Lawnbull Limited
            </h1>
          </div>
          <Lottie animationData={animationData} className="h-[40vh]"/>
          
        </div>
        <div className="absolute right-0">
          <Navbar />
        </div>
        <Footer />
      </div>
    )
  }
  
