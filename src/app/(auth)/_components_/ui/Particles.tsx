'use client';

import { useEffect, useState, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { type ISourceOptions, MoveDirection, OutMode } from '@tsparticles/engine';

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: 0 },
      fpsLimit: 99999,
      particles: {
        number: {
          value: 200,
          density: {
            enable: true,
            area: 1920,
          },
        },
        color: {
          value: '#ffffffff',
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: { min: 0.3, max: 1 },
          animation: {
            enable: true,
            speed: 5,
            minimumValue: 0.3,
            sync: false,
          },
        },
        size: {
          value: { min: 0.5, max: 1.8 },
        },
        move: {
          enable: true,
          speed: 0.1,
          direction: MoveDirection.none,
          outModes: {
            default: OutMode.out,
          },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: false },
          onClick: { enable: false },
          resize: { enable: true },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default ParticlesBackground;
