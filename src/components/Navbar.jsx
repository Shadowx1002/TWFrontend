import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Transport', href: '/transport' },
    { name: 'Destinations', href: '/#tours' },
    { name: 'About', href: '/#about' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false); // Close mobile menu on click
    if (href.startsWith('/#')) {
      const id = href.split('#')[1];
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-3' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* --- DESKTOP & MOBILE TOP BAR --- */}
        <div className={`flex justify-between items-center px-6 py-4 rounded-2xl border transition-all duration-500 relative z-[101]
          ${isScrolled || mobileMenuOpen ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-white/10 shadow-2xl' : 'bg-white/5 backdrop-blur-md border-white/10'}`}>
          
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-white font-black text-xl md:text-2xl tracking-tighter uppercase z-50">
            KAVINDU<span className="text-blue-500">TRAVELS</span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button 
                  onClick={() => handleNavClick(link.href)} 
                  className="text-white/70 hover:text-blue-400 font-bold transition-all text-[10px] uppercase tracking-widest"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <button 
            onClick={() => handleNavClick('/#planner')} 
            className="hidden md:block bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
          >
            Book Trip
          </button>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden z-50 flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU OVERLAY --- */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden"
              />

              {/* Dropdown Card */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-24 left-4 right-4 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_40px_100px_rgba(0,0,0,0.8)] z-[100] md:hidden flex flex-col overflow-hidden"
              >
                <div className="flex flex-col space-y-2 mb-8 mt-4">
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleNavClick(link.href)}
                      className="text-left text-white text-2xl font-black uppercase italic tracking-tighter py-3 border-b border-white/5 hover:text-blue-500 hover:pl-2 transition-all"
                    >
                      {link.name}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => handleNavClick('/#planner')}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                >
                  Start Planning Now
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};

export default Navbar;