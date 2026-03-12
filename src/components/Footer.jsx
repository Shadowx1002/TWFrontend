import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Compass } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img src="logo.png" alt="Kavindu Travels" className="w-12 h-12 object-contain" />
              <span className="font-black text-xl tracking-tighter uppercase">
                KAVINDU<span className="text-blue-500">TRAVELS</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Crafting bespoke Sri Lankan journeys since 2024. Your premier partner for luxury, culture, and adventure.
            </p>
            <div className="flex space-x-4">
              <Facebook className="text-white/40 hover:text-blue-500 cursor-pointer transition" size={20} />
              <Instagram className="text-white/40 hover:text-pink-500 cursor-pointer transition" size={20} />
              <Twitter className="text-white/40 hover:text-blue-400 cursor-pointer transition" size={20} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li className="hover:text-white transition cursor-pointer">Destinations</li>
              <li className="hover:text-white transition cursor-pointer">Tour Planner</li>
              <li className="hover:text-white transition cursor-pointer">Gallery</li>
              <li className="hover:text-white transition cursor-pointer">About Us</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li className="flex items-center gap-3"><Phone size={16} className="text-blue-500"/> +94 77 123 4567</li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-blue-500"/> info@kavindutravels.com</li>
              <li className="flex items-center gap-3"><MapPin size={16} className="text-blue-500"/> Colombo, Sri Lanka</li>
            </ul>
          </div>

          {/* Legal / Reg */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Legal</h4>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-[10px] text-white/40 leading-tight uppercase tracking-tighter">
                SLTDA Reg: SLTDA/DMC/2026/001
                <br /><br />
                Business Reg: PV-2024-KVT88
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20 uppercase tracking-widest font-bold">
          <p>© 2026 KAVINDU TRAVELS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;