'use client'; // Aktiverer klient-side rendering i Next.js

import { useEffect, useRef } from 'react'; // Henter hooks fra React
import styles from './StartScreen.module.css'; // Importerer CSS-moduler for styling

export const StartScreen = () => {
  // --- INITIALISERING AV CANVAS-REFERANSE ---
  const canvasRef = useRef(null); // Referanse til <canvas>-elementet

  // --- SETUP AV ANIMASJON I useEffect ---
  useEffect(() => {
    const canvas = canvasRef.current;            // Henter det faktiske DOM-elementet
    const ctx = canvas.getContext('2d');         // 2D-tegnekontekst
    canvas.width = window.innerWidth;            // Setter bredde lik vinduets bredde
    canvas.height = window.innerHeight;          // Setter høyde lik vinduets høyde

    // --- KONFIGURASJON AV TRÅDER ---
    const threadCount = 40;                      // Antall bølge-tråder som tegnes
    const threads = [];                          // Array for å lagre tråd-innstillinger
    const glowColors = ['#5d9cec', '#2be23a', '#ec5d70']; // Blå, grønn, rød glød

    // Oppretter individuelle tråder med tilfeldige parametre
    for (let i = 0; i < threadCount; i++) {
      threads.push({
        y: (canvas.height / threadCount) * i + Math.random() * 20, // Start-y-posisjon
        amplitude: 30 + Math.random() * 30,        // Maks svinghøyde
        frequency: 0.002 + Math.random() * 0.003,  // Bølgetetthet horisontalt
        speed: 0.5 + Math.random() * 0.5,          // Hastighet på faseløp
        phase: Math.random() * 1000,               // Tilfeldig startfase
        strokeColor: `rgba(254, 254, 183, 0.9)`,   // Gullfarge med litt gjennomsiktighet
        shadowColor: glowColors[Math.floor(Math.random() * glowColors.length)], // Tilfeldig glødfarge
        shadowBlur: 25 + Math.random() * 20,       // Hvor diffus gløden er
      });
    }

    // --- TEGNEFUNKSJON FOR ANIMASJON ---
    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Rydder forrige frame

      threads.forEach((t) => {
        ctx.beginPath();                              // Starter ny sti
        for (let x = 0; x < canvas.width; x += 10) {  // Tegner langs X-aksen i steg på 10px
          const y =
            t.y +
            Math.sin(x * t.frequency + time * 0.002 + t.phase) * t.amplitude; // Bølgeformel
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); // Flytt til eller tegn linje
        }

        // Setter strek- og skyggeegenskaper før tegning
        ctx.strokeStyle = t.strokeColor;  
        ctx.lineWidth = 1.5;            
        ctx.shadowBlur = t.shadowBlur;  
        ctx.shadowColor = t.shadowColor;
        ctx.stroke();                   // Utfører selve strektegningen
      });

      requestAnimationFrame(draw);      // Be om ny frame for jevn animasjon
    }

    draw(0); // Starter animasjonen med utgangspunkt i tidsverdi 0
  }, []);   // Empty dependency array: kjører kun én gang ved mount

  // --- RETURNERER SELVE CANVAS-ELEMENTET ---
  return <canvas ref={canvasRef} className={styles.canvas} />;
};

/*
  Denne filen definerer en React-komponent som rendererer et <canvas>-element
  som fyller hele vinduet. Når komponenten mountes, settes bredden og høyden
  av canvas til vinduets dimensjoner, og det opprettes en rekke "tråder" eller
  bølge-linjer. Hver tråd har tilfeldige parametre for amplitude, frekvens,
  fase og skyggeeffekter, som gir et levende, pulserende mønster. Funksjonen
  draw kjøres kontinuerlig via requestAnimationFrame, og oppdaterer posisjonene
  til bølgeformene i sanntid for å lage en jevn animasjon med glødende, gullfargede
  linjer mot mørk bakgrunn.
*/
