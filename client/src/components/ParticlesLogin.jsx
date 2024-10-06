import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export const ParticlesLogin = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      fpsLimit: 60,
      background: {
        color: "#ffffff"
      },
      interactivity: {
        detect_on: "window",
        events: {
          onHover: {
            enable: true,
            mode: ["bubble", "connect"]
          },
          resize: true
        },
        modes: {
          bubble: {
            distance: 200,
            duration: 2,
            opacity: 1,
            size: 30,
            speed: 3,
            color: {
              value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"]
            }
          },
          connect: {
            distance: 60,
            lineLinked: {
              opacity: 0.2
            },
            radius: 200
          }
        }
      },
      particles: {
        color: {
          value: "#17163e"
        },
        move: {
          direction: "none",
          enable: true,
          outMode: "out",
          random: false,
          speed: 2,
          straight: false
        },
        number: {
          density: {
            enable: true,
            value_area: 800
          },
          value: 300
        },
        opacity: {
          value: 0.5
        },
        shape: {
          type: "circle"
        },
        size: {
          random: {
            enable: true,
            minimumValue: 10
          },
          value: 15
        }
      },
      retina_detect: true
    }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};
