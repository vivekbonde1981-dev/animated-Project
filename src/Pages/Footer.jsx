import React, { useState } from 'react';

/**
 * Velocita Titanium Footer Component
 * * Features:
 * - Silver gradient typography for headers
 * - Responsive grid for navigation links
 * - Integrated newsletter subscription state
 * - Hover-active link states with slate transitions
 */

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Newsletter logic would go here
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="bg-[#050505] text-white pt-24 md:pt-32 pb-12 font-sans selection:bg-slate-700" style={{height:"80vh",display:"flex",}}>
      <div className="container mx-auto px-6" style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
        
        {/* Newsletter / CTA Section */}
        <div className="flex flex-col md:flex-row justify-between space-between mb-24 text-center md:text-left gap-30" style={{display:"flex",flexDirection:"row",justifyContent:"space-between",paddingLeft:"40px",paddingRight:"40px"}} >
          <div>
            <h2 className="text-6xl md:text-10xl font-serif mb-4 italic font-bold" >
              Stay <span className="bg-gradient-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent">Informed</span>
            </h2>
            <p className="text-slate-500 text-[10px] tracking-[0.4em] uppercase font-semibold" style={{paddingTop:"10px"}}>
             THE INNER CIRCLE FOR MACHINE INTELIGENCE
            </p>
          </div>
          
          <form 
            onSubmit={handleSubmit}
            className="flex w-full md:w-auto border-b border-white/20 focus-within:border-white transition-all duration-500 group"
          >
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENCRYPTED EMAIL" 
              className="bg-transparent py-4 pr-12 text-[10px] focus:outline-none tracking-[0.2em] w-full md:w-64 uppercase"
              required
            />
            <button 
              type="submit"
              className="text-[10px] font-black tracking-[0.3em] uppercase hover:text-slate-400 transition-colors py-4"
            >
              Enter
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/5 pt-16" style={{display:"flex",flexDirection:"row",justifyContent:"space-around",paddingTop:"30px"}}>
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1" style={{display:"flex",flexDirection:"column",justifyContent:"space-around",gap:"15px"}}>
            <div className="text-xl font-black tracking-tighter flex items-center gap-2 mb-8 italic">
              <span className="text-white">VELOCITA</span>
              <span className="text-slate-600">TITANIUM</span>
            </div>
            <p className="text-slate-500 text-[10px] leading-loose uppercase tracking-tighter max-w-[200px]">
              Crafting the future of mechanical heritage. Minimalist design. Maximum output.
            </p>
          </div>

          {/* Garage Links */}
          <div className="space-y-4"style={{display:"flex",flexDirection:"column",justifyContent:"space-around",gap:"15px"}}>
            <h5 className="text-white text-[10px] font-black tracking-[0.4em] uppercase mb-8">Garage</h5>
            <FooterLink href="#">Hyper-Track</FooterLink>
            <FooterLink href="#">Monolith Naked</FooterLink>
            <FooterLink href="#">Limited Series</FooterLink>
          </div>

          {/* Studio Links */}
          <div className="space-y-4" style={{display:"flex",flexDirection:"column",justifyContent:"space-around",gap:"15px"}}>
            <h5 className="text-white text-[10px] font-black tracking-[0.4em] uppercase mb-8">Studio</h5>
            <FooterLink href="#">Custom Forging</FooterLink>
            <FooterLink href="#">Carbon Lab</FooterLink>
            <FooterLink href="#">Journal</FooterLink>
          </div>

          {/* System Links */}
          <div className="space-y-4"style={{display:"flex",flexDirection:"column",justifyContent:"space-around",gap:"15px"}}>
            <h5 className="text-white text-[10px] font-black tracking-[0.4em] uppercase mb-8">System</h5>
            <FooterLink href="#">Support</FooterLink>
            <FooterLink href="#">Legal</FooterLink>
            <FooterLink href="#">Locations</FooterLink>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] text-slate-600 tracking-[0.4em] uppercase gap-6">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Velocita Titanium Division. Engineered for purpose.
          </p>
          <div className="flex gap-8">
            <SocialLink>Insta</SocialLink>
            <SocialLink>X.com</SocialLink>
            <SocialLink>Vimeo</SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const FooterLink = ({ href, children }) => (
  <a 
    href={href} 
    className="block text-slate-500 text-[11px] uppercase tracking-widest hover:text-white transition-colors duration-300"
  >
    {children}
  </a>
);

const SocialLink = ({ children }) => (
  <span className="cursor-pointer hover:text-white transition-colors duration-300">
    {children}
  </span>
);

export default function Latestfooter() {
  return (
    <div className=" bg-black flex flex-col justify-end" style={{height:"80vh"}}>
      <div className="p-20 text-center text-slate-800 uppercase tracking-[1em] text-xs">
        {/* [ Page Content Above ] */}
      </div>
      <Footer />
    </div>
  );
}

