import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";
import PropTypes from 'prop-types';

export default function LoadingPage({ isLoading, darkMode, progress }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine);
      await loadPolygonMaskPlugin(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

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
          value: 130
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
          value: { min: 0.5, max: 3 }
        }
      },
      polygon: {
        draw: {
          enable: true,
          stroke: {
            color: darkMode ? "#ffffff" : "#000000",
            width: 0.8,
            opacity: 0.4
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
        url: "https://particles.js.org/images/smalldeer.svg",
        position: { // Add position configuration
          x: 50,
          y: 40 // Adjust to move deer higher
        }
      }
    }),
    [darkMode]
  );

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      backgroundColor: darkMode ? "#000000" : "#ffffff",
      transition: "opacity 0.75s ease-in-out, background-color 0.3s ease-in-out",
      opacity: isLoading ? 1 : 0,
      pointerEvents: isLoading ? "auto" : "none",
      zIndex: 9999
    }}>
      {init && (
        <Particles
          id="tsparticles"
          options={options}
        />
      )}
      <div style={{
        position: "absolute",
        top: "80%", // Adjusted from 50% to position below deer
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        zIndex: 1
      }}>
        <div style={{
          color: darkMode ? "#ffffff" : "#0d0d0d",
          fontSize: "24px",
          marginBottom: "1rem"
        }}>
          Loading...
        </div>
        <div style={{
          width: "200px",
          height: "4px",
          backgroundColor: darkMode ? "#333" : "#eee",
          borderRadius: "2px",
          overflow: "hidden"
        }}>
          <div style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: darkMode ? "#ffffff" : "#000000",
            transition: "width 0.3s ease-out"
          }}/>
        </div>
      </div>
    </div>
  );
}

LoadingPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  darkMode: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired
};
