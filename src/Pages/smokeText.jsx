import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SmokeText = () => {
  const scope = useRef(null); // Ref for the container

  useEffect(() => {
    // gsap.context handles cleanup automatically to prevent memory leaks/glitches
    let ctx = gsap.context(() => {
      
      const letters = ".letter";

      // 1. Set initial state: blurry, shifted, and invisible
      gsap.set(letters, { 
        opacity: 0, 
        filter: "blur(30px)", // Heavier blur for more "smoke" feel
        x: -30,               // Slightly offset to the left
        scale: 0.9            // Start slightly smaller
      });

      // 2. The Reveal Animation
      gsap.to(letters, {
        duration: 1.2,
        opacity: 1,
        filter: "blur(0px)",
        x: 0,
        scale: 1,
        stagger: 0.08,        // Letters appear one-by-one
        ease: "power2.out",
        delay: 0.5,           // Delay this to match your video's smoke timing
      });

      // 3. Optional: Subtle "float" idle effect (makes it feel premium)
      gsap.to(letters, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.1,
          from: "random"
        }
      });

    }, scope); 

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  const text = "CONNECT with US "; // Change your text here

  return (
    <div ref={scope} style={containerStyle}>
      <h3 style={textWrapperStyle}>
        {text.split("").map((char, i) => (
          <span key={i} className="letter" style={letterStyle}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h3>
    </div>
  );
};

// --- Styles ---

const containerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '50%',
  height: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start', // Keeps text on the left
  paddingLeft: '8vw',
  pointerEvents: 'none', // Allows clicks to pass through to the video
  zIndex: 20,
};

const textWrapperStyle = {
  display: 'flex',
  margin: 0,
  padding: 0,
  height:"50%",
  width:"50%"
};

const letterStyle = {
  display: 'inline-block',
  color: '#000000',
  fontSize: 'clamp(3rem, 10vw, 8rem)', // Responsive font size
  fontWeight: '900',
  fontFamily: 'sans-serif', // Use a bold font like 'Inter' or 'Impact'
  textShadow: '0 10px 30px rgba(0,0,0,0.5)',
};

// export default SmokeText;