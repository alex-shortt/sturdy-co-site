import React from "react"
import styled from "styled-components/macro"
import ParticleBase from "react-particles-js"

const Particle = styled(ParticleBase)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

export default function Particles() {
  return (
    <Particle
      params={{
        particles: {
          number: {
            value: 72,
            density: {
              enable: true,
              value_area: 801.7060304327614
            }
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "polygon",
            stroke: {
              width: 1,
              color: "#ffffff"
            },
            polygon: {
              nb_sides: 5
            },
            image: {
              src: "",
              width: 140,
              height: 100
            }
          },
          opacity: {
            value: 1,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0,
              sync: false
            }
          },
          size: {
            value: 5,
            random: true,
            anim: {
              enable: false,
              speed: 4,
              size_min: 0.3,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.41688713582503595,
            width: 2
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 600
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "bubble"
            },
            onclick: {
              enable: false,
              mode: "repulse"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 250,
              size: 0,
              duration: 2,
              opacity: 0,
              speed: 3
            },
            repulse: {
              distance: 400,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      }}
    />
  )
}
