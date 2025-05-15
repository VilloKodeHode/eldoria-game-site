'use client';
import { useEffect, useRef } from 'react';
import styles from './StartScreen.module.css';

export const StartScreen = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const threadCount = 40;
    const threads = [];

    const glowColors = ['#5d9cec', '#2be23a', '#ec5d70']; // blå, grønn, rød

    for (let i = 0; i < threadCount; i++) {
      threads.push({
        y: (canvas.height / threadCount) * i + Math.random() * 20,
        amplitude: 30 + Math.random() * 30,
        frequency: 0.002 + Math.random() * 0.003,
        speed: 0.5 + Math.random() * 0.5,
        phase: Math.random() * 1000,
        strokeColor: `rgba(254, 254, 183, 0.9)`, // gull
        shadowColor: glowColors[Math.floor(Math.random() * glowColors.length)],
        shadowBlur: 25 + Math.random() * 20,
      });
    }

    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      threads.forEach((t) => {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 10) {
          const y =
            t.y + Math.sin(x * t.frequency + time * 0.002 + t.phase) * t.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = t.strokeColor;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = t.shadowBlur;
        ctx.shadowColor = t.shadowColor;
        ctx.stroke();
      });

      requestAnimationFrame(draw);
    }

    draw(0);
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
};





// NOTE TO ME

// Dag/Natt syklus
// Ressurser/Monstre kun tilgjengelig på dag/natt
// Egen knapp for og gå fra natt->->dag? 
// Mana/Helse refil av og ''hvile''?npm run