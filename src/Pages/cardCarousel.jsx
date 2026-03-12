import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
const CARD_DATA = [
  {
    id: 1,
    title: "Harley-Davidson",
    description: "Get lost in the lush greenery and ancient whispers of the deep woods.",
    color: "from-green-700 to-lime-500",
    tag: "Cruiser",
    src:"cruiser.png"
  },
  {
    id: 2,
    title: "Honda CBR600RR",
    description: "Balanced performance machines (600cc–900cc) that offer a mix of street-usable torque and track-ready power",
    color: "from-purple-600 to-pink-500",
    tag: "Middleweigh.    .   ",
    src:"s-1200.jpg"
  },
  {
    id: 3,
    title: "Suzuki GSX-R1000",
    description: "High-performance 1,000cc flagship bikes featuring elite racing technology and extreme power-to-weight ratios.",
    tag: "SuperBike",
    src:"sizuki.png"
  },
  {
    id: 4,
    title: "Suzuki Hayabusa",
    description: "Heavyweight speed kings designed for massive acceleration and record-breaking top speeds, often exceeding 1,300cc.",
    tag: "HyperBike",
    src:"hyabusa.png"
  },
  {
    id: 5,
    title: "Kawasaki Ninja 400",
    description: "Agile, beginner-friendly bikes with 250cc–500cc engines designed for learning and daily commuting",
    color: "from-blue-600 to-cyan-500",
    tag: "Lightweight",
    src:"kawasaki.png"
    
  },
  {
    id: 6,
    title: "Arctic Wonder",
    description: "Marvel at the northern lights and the pristine beauty of the frozen north.",
    color: "from-indigo-600 to-blue-500",
    tag: "Arctic",
    src:"backBike1.png"
  }
];

const ITEMS_TO_SHOW = 3;

const Card = ({ item, isMiddle }) => (
  <div className={`flex-none w-1/3 px-2 sm:px-4 py-12 transition-all duration-500 ease-out select-none ${isMiddle ? 'z-10' : 'z-0'}`}>
    <div 
      className={`group relative h-64 sm:h-80 lg:h-100 rounded-2xl sm:rounded-3xl border border-white/5 shadow-2xl overflow-hidden transition-all duration-500 ease-out
        ${isMiddle 
          ? 'scale-110 opacity-100 shadow-indigo-500/20' 
          : 'scale-90 opacity-20 grayscale-40'
        }
      `}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-60 group-hover:opacity-80 transition-opacity duration-300`} style={{backgroundImage:`url(${item.src})`,backgroundSize: 'cover',
    backgroundPosition: 'center'}}/>
      
      {/* Dark Overlay for better text legibility in dark mode */}
      <div className="absolute inset-0 bg-slate-950/20" />

      {/* Content Overlay */}
      <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-end text-white">
        <span className={`inline-block px-2 py-0.5 mb-2 text-[10px] sm:text-xs font-bold tracking-wider uppercase bg-white/10 backdrop-blur-md border border-white/10 rounded-full w-max transition-all duration-500 ${isMiddle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{marginLeft:"170px"}}>
          {item.tag}
        </span>
        <h3 className={`font-bold mb-1 sm:mb-2 leading-tight transition-all duration-500 ${isMiddle ? 'text-lg sm:text-2xl lg:text-3xl translate-y-0' : 'text-base sm:text-lg translate-y-2'}`} style={{marginLeft:"90px"}}>
          {item.title}
        </h3>
        <p className={`hidden sm:block text-slate-200/80 text-sm mb-4 line-clamp-2 leading-relaxed transition-all duration-500 ${isMiddle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{marginLeft:"20px",marginBottom:"10px"}}>
          {item.description}
        </p>
        {/* <div className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-base font-semibold text-white group/btn transition-all duration-500 ${isMiddle ? 'opacity-100' : 'opacity-0'}`}>
          Explore 
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </div> */}
      </div>

      {/* External link icon */}
      {isMiddle && (
        <div className="absolute top-4 right-4 p-1.5 bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10">
          <ExternalLink className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  </div>
);

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  
  const carouselRef = useRef(null);
  const isScrolling = useRef(false);
  const maxIndex = Math.max(0, CARD_DATA.length - ITEMS_TO_SHOW);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleWheel = (e) => {
    if (isScrolling.current) return;
    const sensitivity = 20;
    if (Math.abs(e.deltaY) > sensitivity || Math.abs(e.deltaX) > sensitivity) {
      isScrolling.current = true;
      if (e.deltaY > 0 || e.deltaX > 0) handleNext();
      else handlePrev();
      setTimeout(() => { isScrolling.current = false; }, 600);
    }
  };

  const handleStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    setDragOffset(clientX - startX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    const threshold = 50;
    if (dragOffset < -threshold) handleNext();
    else if (dragOffset > threshold) handlePrev();
    setIsDragging(false);
    setDragOffset(0);
  };

  const onMouseDown = (e) => handleStart(e.pageX);
  const onMouseMove = (e) => handleMove(e.pageX);
  const onMouseUp = () => handleEnd();
  const onMouseLeave = () => handleEnd();

  const onTouchStart = (e) => handleStart(e.touches[0].clientX);
  const onTouchMove = (e) => handleMove(e.touches[0].clientX);
  const onTouchEnd = () => handleEnd();

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('dragstart', preventDefault);
      return () => el.removeEventListener('dragstart', preventDefault);
    }
  }, []);

  const baseTranslate = -(currentIndex * (100 / ITEMS_TO_SHOW));
  const pixelToPercent = dragOffset / (carouselRef.current?.offsetWidth || 1) * 100;
  const transformX = baseTranslate + pixelToPercent;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-8 px-2 font-sans select-none overflow-hidden transition-colors duration-500" style={{backgroundColor:"#000000"}}>

      {window.location.pathname === "/bikes" && <><Header /> <div style={{marginBottom:"80px"}}></div></>}

      
      <div className="max-w-7xl w-full min-h-10xl" style={{height:"100%"}}>
        {/* Header Section */}
        <div className="mb-12 px-4 text-center" style={{height:"80%"}}>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight" style={{marginBottom:"20px"}}>
            Curated Destinations
          </h2>
          <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto mb-5" style={{marginBottom:"40px",marginLeft:"280px"}}>
            Experience the world in high definition. The path ahead is yours to choose.
          </p>
        </div>

        {/* Carousel Wrapper with Side Arrows */}
        <div className="relative group/carousel px-4 sm:px-20 mt-10">
          
          {/* Left Arrow */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-5 rounded-full bg-slate-900/80 backdrop-blur-md shadow-2xl border border-white/10 text-white hover:bg-white hover:text-slate-950 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 -translate-x-4 group-hover/carousel:translate-x-0"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button 
            onClick={handleNext}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-5 rounded-full bg-slate-900/80 backdrop-blur-md shadow-2xl border border-white/10 text-white hover:bg-white hover:text-slate-950 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 translate-x-4 group-hover/carousel:translate-x-0"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Container */}
          <div 
            className={`relative cursor-grab active:cursor-grabbing ${isDragging ? 'select-none' : ''}`}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onWheel={handleWheel}
          >
            <div 
              ref={carouselRef}
              className={`flex items-center ${isDragging ? 'transition-none' : 'transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]'}`}
              style={{ 
                transform: `translateX(${transformX}%)` 
              }}
            >
              {CARD_DATA.map((item, index) => {
                const isMiddle = index === currentIndex + 1;
                return (
                  <Card key={item.id} item={item} isMiddle={isMiddle} />
                );
              })}
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-12" style={{marginTop:"55px"}}>
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 transition-all duration-500 rounded-full ${
                  currentIndex === idx ? 'w-10 bg-gray-500' : 'w-2 bg-gray-800'
                }`}
                aria-label={`Go to section ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}