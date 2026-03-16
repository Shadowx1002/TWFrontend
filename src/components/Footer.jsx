import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Send, ArrowRight, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-[#050505] text-white pt-24 pb-10 border-t border-white/10 overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Section: Newsletter & Call to Action */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-16 mb-16">
          <div className="max-w-md">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Join our <span className="text-blue-500">Travel Club</span></h3>
            <p className="text-white/50 text-sm leading-relaxed">Subscribe to get exclusive luxury travel offers, insider destination guides, and early access to our new packages.</p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full sm:w-80 bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-2xl text-sm outline-none focus:border-blue-500 transition-all placeholder:text-white/30 shadow-inner"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 group">
              Subscribe <Send size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column (Spans 4 cols on large screens) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Kavindu Travels" className="w-12 h-12 object-contain" />
              <span className="font-black text-2xl tracking-tighter uppercase">
                KAVINDU<span className="text-blue-500">TRAVELS</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed pr-4">
              Crafting bespoke Sri Lankan journeys since 2024. Your premier partner for luxury, culture, and unmatched adventure across the pearl of the Indian Ocean.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all shadow-lg group">
                <Facebook size={18} className="group-hover:scale-110 transition-transform"/>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-pink-600 hover:text-white hover:border-pink-500 transition-all shadow-lg group">
                <Instagram size={18} className="group-hover:scale-110 transition-transform"/>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-blue-400 hover:text-white hover:border-blue-400 transition-all shadow-lg group">
                <Twitter size={18} className="group-hover:scale-110 transition-transform"/>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-black uppercase tracking-widest text-sm mb-6 text-white border-b border-blue-500/30 pb-2 inline-block">Explore</h4>
            <ul className="space-y-4 text-sm text-white/50 font-medium">
              {['Destinations', 'Tour Planner', 'Gallery', 'About Us', 'Reviews'].map((link, i) => (
                <li key={i} className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                  <ArrowRight size={14} className="text-blue-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  <span className="group-hover:translate-x-1 transition-transform">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="font-black uppercase tracking-widest text-sm mb-6 text-white border-b border-blue-500/30 pb-2 inline-block">Contact</h4>
            <ul className="space-y-5 text-sm text-white/60">
              <li className="flex items-start gap-4 hover:text-white transition-colors cursor-pointer group">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-colors">
                  <Phone size={16} className="text-blue-500"/>
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-0.5">Call Us 24/7</span>
                  <span className="font-bold">+94 77 123 4567</span>
                </div>
              </li>
              <li className="flex items-start gap-4 hover:text-white transition-colors cursor-pointer group">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-colors">
                  <Mail size={16} className="text-blue-500"/>
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-0.5">Email Us</span>
                  <span className="font-bold">info@kavindutravels.com</span>
                </div>
              </li>
              <li className="flex items-start gap-4 hover:text-white transition-colors cursor-pointer group">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-colors">
                  <MapPin size={16} className="text-blue-500"/>
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-0.5">Head Office</span>
                  <span className="font-bold">Colombo, Sri Lanka</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal / Reg */}
          <div className="lg:col-span-2">
            <h4 className="font-black uppercase tracking-widest text-sm mb-6 text-white border-b border-blue-500/30 pb-2 inline-block">Certifications</h4>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors"></div>
              <p className="text-xs text-white/60 leading-relaxed uppercase tracking-widest font-bold">
                <span className="text-blue-500 block mb-1">SLTDA Reg:</span> SLTDA/DMC/2026/001
                <span className="block my-3 w-full h-[1px] bg-white/10"></span>
                <span className="text-blue-500 block mb-1">Business Reg:</span> PV-2024-KVT88
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Developer Credit */}
        <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-[10px] sm:text-xs text-white/30 uppercase tracking-[0.2em] font-bold">
            <p>© {new Date().getFullYear()} KAVINDU TRAVELS. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4 sm:gap-8">
              <span className="hover:text-blue-500 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-blue-500 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>

          {/* DEVELOPER CREDIT */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span>Designed & Developed</span>
            <Heart size={14} className="text-blue-500 fill-blue-500 animate-pulse" />
            <span>by <a href="https://neroportfolio.netlify.app/" target="_blank" rel="noreferrer" className="text-white hover:text-blue-400 transition-colors">Nerodha sampath</a></span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;