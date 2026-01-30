import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Scale } from 'lucide-react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'NyayAI', path: '/nyayai' },
  { name: 'Documents', path: '/documents' },
  { name: 'Find Lawyer', path: '/find-lawyer' },
  { name: 'For Lawyers', path: '/for-lawyers' },
  { name: 'About', path: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';
  const isDarkNav = isHomePage && !scrolled;

  return (
    <nav
      data-testid="navbar"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHomePage
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2"
            data-testid="logo-link"
          >
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              isDarkNav ? "bg-amber-600" : "bg-amber-600"
            )}>
              <Scale className="w-6 h-6 text-white" />
            </div>
            <span className={cn(
              "text-xl font-bold font-heading",
              isDarkNav ? "text-white" : "text-slate-900"
            )}>
              SunoLegal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.name.toLowerCase().replace(' ', '-')}`}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.path
                    ? isDarkNav
                      ? "text-amber-400 bg-white/10"
                      : "text-amber-700 bg-amber-50"
                    : isDarkNav
                      ? "text-slate-200 hover:text-white hover:bg-white/10"
                      : "text-slate-600 hover:text-amber-700 hover:bg-amber-50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/waitlist">
              <Button 
                data-testid="join-waitlist-nav-btn"
                className="shadow-lg hover:shadow-glow"
              >
                Join Waitlist
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-btn"
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={cn("w-6 h-6", isDarkNav ? "text-white" : "text-slate-900")} />
            ) : (
              <Menu className={cn("w-6 h-6", isDarkNav ? "text-white" : "text-slate-900")} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`mobile-nav-${link.name.toLowerCase().replace(' ', '-')}`}
                className={cn(
                  "block px-4 py-3 rounded-md font-medium transition-colors",
                  location.pathname === link.path
                    ? "text-amber-700 bg-amber-50"
                    : "text-slate-600 hover:text-amber-700 hover:bg-amber-50"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link to="/waitlist" className="block">
                <Button className="w-full" data-testid="mobile-join-waitlist-btn">
                  Join Waitlist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
