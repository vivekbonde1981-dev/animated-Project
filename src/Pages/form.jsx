import React, { useState, useEffect, useRef } from 'react';
import { Clock, Shield, Check, ChevronDown } from 'lucide-react';
import  Header  from '../components/Header';




const ScrollReveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.15 });

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 cubic-bezier(0.22, 1, 0.36, 1) ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  ); 
};

 const BookForm = ()=> {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    machine: '',
    date: '',
    timeSlot: 'morning'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      machine: '',
      date: '',
      timeSlot: 'morning'
    });
    setIsSubmitted(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Set min date to today for the date picker
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      
    {window.location.pathname === "/contact" && <Header />}

      

      {/* Booking Section */}
      <section className="min-h-screen py-24 px-6 flex items-center justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Side */}
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Experience the <br />
              <span className="text-gray-600">Pure Power.</span>
            </h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed max-w-lg">
              Select your machine and schedule a test ride at our flagship showroom. Our consultants will prepare the bike for your arrival.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-5">
                <div className="bg-gray-600/10 p-4 rounded-2xl border border-gray-600/20">
                  <Clock className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">45 Minute Sessions</h4>
                  <p className="text-gray-500 mt-1">Dedicated time for technical briefing and urban riding.</p>
                </div>
              </div>
              <div className="flex items-start space-x-5">
                <div className="bg-gray-600/10 p-4 rounded-2xl border border-gray-600/20">
                  <Shield className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Full Gear Provided</h4>
                  <p className="text-gray-500 mt-1">Premium helmets and safety apparel available on-site.</p>
                </div>
              </div>
            </div>

            {/* Abstract Bike SVG */}
            <div className="mt-16 opacity-40 hover:opacity-100 transition-opacity duration-700">
              <svg viewBox="0 0 200 100" className="w-72 h-auto filter drop-shadow-[0_0_15px_rgba(255,62,62,0.4)]">
                <path 
                  d="M40,80 L60,80 C60,60 140,60 140,80 L160,80 M100,65 L120,40 L160,40 M50,80 A15,15 0 1,0 80,80 A15,15 0 1,0 50,80 M120,80 A15,15 0 1,0 150,80 A15,15 0 1,0 120,80" 
                  fill="none" 
                  stroke="#ff3e3e" 
                  strokeWidth="2" 
                />
              </svg>
            </div>
          </ScrollReveal>

          {/* Form Card Side */}
          <ScrollReveal delay={300} className="relative">
            <div className="bg-[#111] border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative overflow-hidden group" style={{width:"43vw"}}>
              
              {/* Submission Success Overlay */}
              <div className={`absolute inset-0 bg-black/95 flex flex-col items-center justify-center z-50 transition-all duration-500 ${isSubmitted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
                <div className="bg-green-500 rounded-full p-5 mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                  <Check className="w-12 h-12 text-white" strokeWidth={3} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Ride Confirmed!</h3>
                <p className="text-gray-400 text-center px-8">
                  Check your phone for the confirmation code. <br/> See you at the track.
                </p>
                <button 
                  onClick={handleReset}
                  className="mt-8 text-gray-500 font-semibold hover:text-gray-400 transition-colors uppercase tracking-widest text-xs"
                >
                  Book another session
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-11" style={{height:"60vh",width:"40vw",paddingLeft:"45px",display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Marcus Veloce"
                      className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-all"
                      style={{height:"30px",paddingLeft:"10px"}}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-red-600 transition-all"
                       style={{height:"30px",paddingLeft:"10px"}}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Select Machine</label>
                  <div className="relative">
                    <select 
                      required 
                      name="machine"
                      value={formData.machine}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl text-white appearance-none focus:outline-none focus:border-gray-600 transition-all cursor-pointer"
                       style={{height:"30px",paddingLeft:"10px"}}
                    >
                      {/* <option value="" disabled className="bg-[#111]">Choose your weapon...</option> */}
                      <option value="scrambler" className="bg-[#111]">Veloce Scrambler 800</option>
                      <option value="supersport" className="bg-[#111]">Nexus RS-1000</option>
                      <option value="cruiser" className="bg-[#111]">Shadow 1200 Custom</option>
                      <option value="electric" className="bg-[#111]">Electron X Prototype</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Preferred Date</label>
                    <input 
                      type="date" 
                      required 
                      name="date"
                      min={today}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl text-white focus:outline-none focus:border-gray-600 transition-all color-scheme-dark"
                       style={{height:"30px",paddingLeft:"10px"}}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Time Slot</label>
                    <div className="relative">
                      <select 
                        required 
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl text-white appearance-none focus:outline-none focus:border-gray-600 transition-all cursor-pointer"
                         style={{height:"30px",paddingLeft:"10px"}}
                      >
                        <option value="morning" className="bg-[#111]">Morning (10:00 - 13:00)</option>
                        <option value="afternoon" className="bg-[#111]">Afternoon (14:00 - 17:00)</option>
                        <option value="evening" className="bg-[#111]">Evening (18:00 - 20:00)</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    className="w-full bg-linear-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 py-5 rounded-2xl font-black text-white uppercase tracking-[0.2em] text-xs shadow-lg shadow-gray-600/20 active:scale-[0.98] transition-all"
                     style={{height:"50px",paddingLeft:"10px"}}
                  >
                    Confirm Reservation
                  </button>
                </div>
                
                <p className="text-[10px] text-gray-600 text-center uppercase tracking-widest leading-relaxed">
                  By clicking confirm, you acknowledge our safety protocols and license requirements.
                </p>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="py-16 border-t border-white/5 text-center bg-black">
        <div className="flex justify-center space-x-8 mb-8">
          <span className="text-gray-500 text-xs uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Models</span>
          <span className="text-gray-500 text-xs uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Safety</span>
          <span className="text-gray-500 text-xs uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Locations</span>
        </div>
        <p className="text-gray-700 text-[10px] uppercase tracking-[0.3em] font-medium">
          &copy; 2026 VELOCE MOTO INDUSTRIES. CRAFTED FOR THE BOLD.
        </p>
      </footer> */}

      {/* Style overrides for custom date picker appearance in dark mode */}
      <style>{`
        .color-scheme-dark {
          color-scheme: dark;
        }
        input::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}


export default BookForm;