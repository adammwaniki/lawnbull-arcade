import ParticlesBackground from "./ParticlesBackground"

export default function LandingPage() {
    return (
      <div className="relative flex items-center justify-center min-h-screen min-w-full bg-sky-950">
        <ParticlesBackground />
        <div className="lawnbull-intro z-10">
          <h1 className="text-[6rem] text-white text-center font-wunderbar drop-shadow-lg">
            Lawnbull Arcade
          </h1>
        </div>
      </div>
    )
  }
  
