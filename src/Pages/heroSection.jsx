import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef();

  useGSAP(() => {
    // Timeline for the main text elements
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%", // Starts when the top of the section hits 70% of viewport
        toggleActions: "play none none reverse", // Plays forward on scroll down, reverses on scroll up
      }
    });
    gsap.to(".animate-text",{
        x:-50,
        opacity:1,
        duration:0,
    })

    // 1. Animate the main text content
    tl.from(".animate-text", {
      y: 60,
      opacity: 0,
      duration: 2,
      stagger: 0.4,
      ease: "power3.out"
    });
    
    

    // 2. Animate the stats from the right
    tl.from(".animate-stat", {
      x: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=3"); // Starts 0.5 seconds before the previous animation ends

    // 3. Bonus: Number counter animation for the speed (320)
    tl.from(".stat-number", {
      textContent: 0,
      duration: 2,
      ease: "power1.out",
      snap: { textContent: 1 }, // Ensures numbers are integers
      stagger: 0.2
    }, "-=2.5");

  }, { scope: containerRef }); // Scope limits selectors to this component

  return (
    <div ref={containerRef} style={styles.wrapper}>

      <div style={styles.overlay} />
      
      {/* Left Content */}
      <div style={styles.content}>
        <p className="animate-text" style={styles.subHeader}>PURE RAW POWER</p>
        
        <h1 className="animate-text" style={styles.mainTitle}>
          Forged in <br />
          <span style={{ color: '#94a3b8' }}>Titanium</span>
        </h1>

        <p className="animate-text" style={styles.description}>
          The intersection of aerospace materials and two-wheeled adrenaline. 
          No chrome. No gold. Just performance.
        </p>

        <div className="animate-text" style={styles.buttonGroup}>
          <button style={styles.btnPrimary}>VIEW SPECS</button>
          <button style={styles.btnSecondary}>BUILD YOURS</button>
        </div>
      </div>

      {/* Right Stats */}
      <div style={styles.statsContainer}>
        <div className="animate-stat" style={styles.statBlock}>
          <div style={styles.statValueRow}>
            <span className="stat-number" style={styles.statValue}>320</span>
            <span style={styles.statUnit}>KM/H</span>
          </div>
          <div style={styles.statLabel}>TERMINAL VELOCITY</div>
        </div>

        <div className="animate-stat" style={styles.statBlock}>
          <div style={styles.statValueRow}>
            <span className="stat-number" style={styles.statValue}>168</span>
            <span style={styles.statUnit}>KG</span>
          </div>
          <div style={styles.statLabel}>CURB WEIGHT</div>
        </div>

        <div className="animate-stat" style={styles.statBlock}>
          <div style={styles.statValueRow}>
            <span className="stat-number" style={styles.statValue}>230</span>
            <span style={styles.statUnit}>HP</span>
          </div>
          <div style={styles.statLabel}>V4 OUTPUT</div>
        </div>
      </div>
    </div>
  );
};

// Styles remain the same for visual consistency
const styles = {
  wrapper: {
    position:'absolute',
    // top:"100vh",
    height: '100vh',
    width: '100vw',
    // backgroundColor: '#0a0a0a',
    backgroundImage: 'url("/backBike1.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    padding: '0 10%',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    overflow: 'hidden',
  },
  overlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)' },
  content: { position: 'absolute', zIndex: 0, maxWidth: '600px' },
  subHeader: { letterSpacing: '4px', fontSize: '14px', marginBottom: '20px', color: '#888' },
  mainTitle: { fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 'bold', margin: 0, fontStyle: 'italic', lineHeight: 1 },
  description: { fontSize: '18px', color: '#ccc', marginTop: '30px', maxWidth: '400px', lineHeight: '1.6' },
  buttonGroup: { display: 'flex', gap: '20px', marginTop: '40px' },
  btnPrimary: { padding: '15px 35px', backgroundColor: '#cbd5e1', border: 'none', fontWeight: 'bold', cursor: 'pointer' },
  btnSecondary: { padding: '15px 35px', backgroundColor: 'transparent', border: '1px solid #444', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
  statsContainer: {
    position: 'absolute',
    right: '5%',
    display: 'flex',
    flexDirection: 'column',
    gap: '50px',
    borderRight: '2px solid #3b82f6',
    paddingRight: '20px',
  },
  statBlock: { textAlign: 'right' },
  statValueRow: { display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: '8px' },
  statValue: { fontSize: '48px', fontWeight: 'bold' },
  statUnit: { fontSize: '12px', color: '#3b82f6' },
  statLabel: { fontSize: '10px', letterSpacing: '2px', color: '#666', marginTop: '5px' }
};

export default HeroSection;