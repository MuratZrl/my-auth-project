'use client';

import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { Engine, ISourceOptions } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';

export default function ConfettiParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = {
    fullScreen: { enable: true, zIndex: 1 },
    detectRetina: true,
    particles: {
      number: { value: 0 },
      color: {
        value: ['#FFC107', '#03A9F4', '#E91E63', '#4CAF50', '#FF5722'],
      },
      shape: {
        type: ['circle', 'square', 'triangle'],
      },
      opacity: {
        value: 1,
      },
      size: {
        value: { min: 1, max: 3 },
      },
      move: {
        enable: true,
        gravity: {
          enable: true,
          acceleration: 5,
        },
        speed: { min: 10, max: 15 },
        direction: 'top',
        outModes: {
          default: 'destroy',
          top: 'none',
        },
      },
    },
    emitters: {
      position: {
        x: 50,
        y: 100,
      },
      rate: {
        delay: 0,
        quantity: 50,
      },
      size: {
        width: 0,
        height: 0,
      },
      life: {
        duration: .5,
        count: 1,
      },
    },
  };

  if (!init) return null;

  return <Particles id="confetti" options={options} />;
}
