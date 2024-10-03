import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";
import PropTypes from 'prop-types';

export default function LoadingPage({ isLoading }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadPolygonMaskPlugin(engine);
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
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "bubble"
          }
        },
        modes: {
          bubble: {
            distance: 40,
            duration: 2,
            opacity: 8,
            size: 6,
            speed: 3
          }
        }
      },
      particles: {
        color: {
          value: "#ff0000",
          animation: {
            enable: true,
            speed: 20,
            sync: true
          }
        },
        links: {
          blink: false,
          color: "random",
          consent: false,
          distance: 30,
          enable: true,
          opacity: 0.3,
          width: 0.5
        },
        move: {
          enable: true,
          outModes: "bounce",
          speed: { min: 0.5, max: 1 }
        },
        number: {
          value: 200
        },
        opacity: {
          animation: {
            enable: true,
            speed: 2,
            sync: false
          },
          random: false,
          value: { min: 0.05, max: 1 }
        },
        shape: {
          type: "circle"
        },
        size: {
          animation: {
            enable: false,
            speed: 40,
            sync: false
          },
          random: true,
          value: { min: 0.1, max: 1 }
        }
      },
      polygon: {
        draw: {
          enable: true,
          stroke: {
            color: "#fff",
            width: 0.3,
            opacity: 0.2
          }
        },
        move: {
          radius: 10
        },
        inline: {
          arrangement: "equidistant"
        },
        scale: 0.5,
        type: "inline",
        url: "https://particles.js.org/images/smalldeer.svg"
      }
    }),
    []
  );

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      backgroundColor: "#17163e",
      transition: "opacity 0.5s ease-in-out",
      opacity: isLoading ? 1 : 0,
      pointerEvents: isLoading ? "auto" : "none",
      zIndex: 9999
    }}>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#fff",
        fontSize: "24px",
        zIndex: 1
      }}>
        Loading...
      </div>
    </div>
  );
}

LoadingPage.propTypes = {
  isLoading: PropTypes.bool.isRequired
};
