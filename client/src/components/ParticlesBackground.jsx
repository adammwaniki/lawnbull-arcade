import Particles from "@tsparticles/react"
import particlesConfig from "./config/particles-config"


export default function ParticlesBackground() {
  return (
    <Particles 
      options={particlesConfig}
      className="absolute inset-0">
    </Particles>
  )
}

