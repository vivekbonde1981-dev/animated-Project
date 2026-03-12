import React, { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Header from "../components/Header";

// gsap.registerPlugin();
const VideoScrubbingSlider = ({ min = 0, max = 100 }) => {
  const [value, setValue] = useState(min);
  const [isVisible, setIsVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef(null);
  const videoRef = useRef(null);
  const path=useRef();
  const tl = useRef();
  const bl = useRef();
  

  // Configuration
  const size = 600;
  const center = size / 2;
  const minRadius = 290;
  const maxRadius = 290;

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .from(path.current, {
         rotation: "360_ccw",
      duration: 1,
      // delay:1,
      transformOrigin: "bottom center",
      keyframes: {
        "0%": { opacity: 1},
        "25%": { opacity: 1 },
        "50%": { opacity: 0 },
        "100%": { opacity: 0 },
      },
        
        });
    


  }, { scope: path });

   useGSAP(() => {
    bl.current = gsap.timeline({ paused: true })
      .from(path.current, {
         rotation: "360_ccw",
      duration: 1,
      // delay:1,
      transformOrigin: "bottom center",
      keyframes: {
        "0%": { opacity: 1},
        "25%": { opacity: 1 },
        "50%": { opacity: 0 },
        "100%": { opacity: 0 },
      },
        
        });
  }, { scope: path });

  useGSAP(() => {
    gsap.from(".explore", {
      x: -50,
      opacity: 0,
      duration: 1,
      delay: 1,
    });

    gsap.from(".culture", {
      x: -70,
      opacity: 0,
      duration: 1.5,
      delay: 1.2,
    });

    gsap.from(".untold", {
      x: 50,
      opacity: 0,
      duration: 1,
      delay: 1,
    });

    gsap.from(".power", {
      x: 70,
      opacity: 0,
      duration: 1.5,
      delay: 1.2,
    });

    gsap.from(".slider", {
      rotation: "360_cw",
      duration: 2,
      // delay:1,
      transformOrigin: "bottom center",
      keyframes: {
        "0%": { opacity: 0 },
        "25%": { opacity: 0 },
        "50%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
    });

    gsap.from("circle", {
      opacity: 0,
      delay: 2,
    });

   gsap.from("dragen", {
      opacity: 0,
      delay: 2,
    });

    const tl = gsap.timeline({
      defaults: { ease: "power4.out", duration: 1.2 },
    });

    tl.from(".header", {
      scaleX: 0,
      opacity: 0,
      transformOrigin: "center",
      duration: "1.5",
    })
      .from(
        ".logo",
        {
          x: -50,
          opacity: 0,
        },
        "-=0.4",
      ) // Starts 0.8s early for overlap
      .from(
        ".headerContent",
        {
          y: 20,
          opacity: 0,
          stagger: 0.1, // This creates the one-by-one pop-in effect
        },
        "-=1",
      );
  });

  const calculateValue = useCallback(
    (clientX, clientY) => {
      if (!svgRef.current || !isVisible || !videoRef.current) return;

      const rect = svgRef.current.getBoundingClientRect();
      const x = clientX - rect.left - center;
      const y = clientY - rect.top - center;

      let angleRad = Math.atan2(y, x);
      let degrees = angleRad * (180 / Math.PI);

      let clampedDegrees;
      if (degrees > 0) {
        clampedDegrees = x < 0 ? -180 : 0;
      } else {
        clampedDegrees = Math.max(-180, Math.min(0, degrees));
      }

      // setClampedDegress(clampedDegrees)

      const percent = Math.abs(clampedDegrees) / 180;

      // --- SCRUBBING LOGIC ---
      // Update video time based on drag percentage
      const duration = videoRef.current.duration;
      if (duration) {
        videoRef.current.currentTime = percent * duration;
      }

      // --- TRIGGER LOGIC ---
      // If drag goes past 45 degrees, play automatically and hide
      if (Math.abs(clampedDegrees) > 20) {
        handleAutoPlay();
        return;
      }

      // if (Math.abs(clampedDegrees) > 5) {
      //   handlePlay();
      //   // return;
      // }
      // if(value>1){
      //   setIsVisible(false)
      // }

      const newValue = Math.round(min + percent * (max - min));
      setValue(newValue);
    },
    [min, max, isVisible],
  );

  const handlePlay = () => {
    
    // setIsVisible(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleAutoPlay = () => {
    setIsDragging(false);
    setIsVisible(false);
    if (videoRef.current) {
      videoRef.current.play();
    }

    tl.current.play();
  };

  const handleVideoEnd = () => {
    setIsVisible(true);
    // Sync slider value back to 100% when video ends
    setValue(min);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }

    tl.current.reverse({duration:1.5})

    
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e) => {
      const touch = e.touches ? e.touches[0] : e;
      calculateValue(touch.clientX, touch.clientY);
    };
    const onEnd = () => setIsDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [isDragging, calculateValue]);

  // UI Math
  const percentage = (value - min) / (max - min);
  const currentRadius =
    minRadius + Math.pow(percentage, 1.5) * (maxRadius - minRadius);
  const currentDegrees = -(percentage * 180);
  const currentRad = currentDegrees * (Math.PI / 180);

  const handleX = center + currentRadius * Math.cos(currentRad);
  const handleY = center + currentRadius * Math.sin(currentRad);
  const startX = center + currentRadius;
  //   const startY=center

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src="FinalBike3D.mp4"
        onEnded={handleVideoEnd}
        playsInline
        muted // Note: Browsers often require mute for autoplay/manual scrubbing to be smooth
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
        <Header />
      <div
        style={{
          position: "absolute",
          top: "23%",
          left: "1%",
          height: "50px",
          width: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "10px",
          color: "white",
        }}
      >
        <h1
          className="explore text-6xl text-white"
          //  style={{fontSize:"50px",fontFamily:"Bangers"}}
        >
          EXPLORE
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          top: "30.5%",
          left: "5%",
          height: "50px",
          width: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "10px",
          color: "white",
        }}
      >
        <h1
          className="culture text-7xl text-white"
          //  style={{fontSize:"50px",fontFamily:"Bangers"}}
        >
          CULTURE
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          top: "76%",
          right: "-8.5%",
          height: "50px",
          width: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "10px",
          color: "white",
        }}
      >
        <h1
          className="untold text-6xl text-white"
          //  style={{fontSize:"50px",fontFamily:"Bangers"}}
        >
          untold
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          top: "85%",
          right: "6%",
          height: "50px",
          width: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "10px",
          color: "white",
        }}
      >
        <h1
          className="power text-6xl text-white"
        >
          POWER
        </h1>
      </div>

      {/* <div className="dragen" style={{position:"absolute",top:"70%",left:"69%",color:"white"}} >
        <h3 >DRAG TO STUNT</h3>
      </div> */}

      {/* <div style={{
        position:'absolute',
        top: '65%',
        left: '50.2%',
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease',
        
      }}>
        <img className="slider" src="/arcslider.png"  />
      </div> */}

      {/* Slider Overlay */}
      <div
        style={{
          position: "absolute",
          top: "53.6%",
          left: "49.5%",
          transform: "translate(-50%, -50%)",
          // opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: isVisible ? "auto" : "none",
        }}
      >
        <svg
          ref={svgRef}
          width={size}
          height={center + 50}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          style={{
            cursor: "pointer",
            touchAction: "none",
            overflow: "visible",
          }}
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Track */}
          <path
            d={`M ${center + maxRadius} ${center} A ${maxRadius} ${maxRadius} 0 0 0 ${center - maxRadius} ${center}`}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            className="slider"
            ref={path}
          />

          {/* Progress */}
          {/* <path
            d={`M ${startX} ${startY} A ${currentRadius} ${currentRadius} 0 0 0 ${handleX} ${handleY}`}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#glow)"
          /> */}

          <h3 style={{position:"absolute",top:"70%",left:"60",color:"white"}}>DRAG TO STUNT</h3>

          <circle
            cx={handleX}
            cy={handleY}
            r="8"
            fill="white"
            filter="url(#glow)"
            style={{
              opacity:isVisible?1:0
            }}
          />

          {/* <text x={center} y={center - 30} textAnchor="middle" fontSize="80" fill="white" 
            style={{ fontFamily: 'system-ui', fontWeight: '100', filter: 'url(#glow)', pointerEvents: 'none' }}>
            {value}
          </text>  */}
        </svg>
      </div>
    </div>
  );
};

export default VideoScrubbingSlider;
