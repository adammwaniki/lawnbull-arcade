import { ParticlesBackground } from "./ParticlesBackground"

export default function LandingPage() {
    return (
      <div className="flex items-center justify-center min-h-screen min-w-full ">
        <ParticlesBackground />
        <div className="lawnbull-intro z-10">
          <h1 className="text-[6rem] lg:text-[10vw] text-white text-center font-wunderbar ">
            Lawnbull Arcade
          </h1>
        </div>
      </div>
    )
  }
  
