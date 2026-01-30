import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Users, Scale } from 'lucide-react';
import { cn } from '../lib/utils';

// Google Form URLs (kept for reference in internal pages)
export const FORMS = {
  users: 'https://docs.google.com/forms/d/e/1FAIpQLScNPCWdYMLW1vXmZhsL3NTxu8VJxEtAQq40iWjn1wNGB5K7cQ/viewform',
  lawyers: 'https://docs.google.com/forms/d/e/1FAIpQLSet8323DrdZSHRn5pVONUmz1yuiPBbxjiZwJ_un4XQWGkJm2A/viewform'
};

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'NyayAI', path: '/nyayai' },
  { name: 'Documents', path: '/documents' },
  { name: 'Find Lawyer', path: '/find-lawyer' },
  { name: 'Pricing', path: '/pricing' },
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
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2"
            data-testid="logo-link"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_lawbuddy-9/artifacts/ib924i4i_Logo.png" 
                alt="SunoLegal"
                className="w-full h-full object-contain"
              />
            </div>
            <span className={cn(
              "text-xl font-bold font-heading",
              isDarkNav ? "text-white" : "text-slate-900"
            )}>
              SunoLegal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.name.toLowerCase().replace(' ', '-')}`}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
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

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/waitlist">
              <Button 
                data-testid="nav-join-waitlist-btn"
                size="sm"
                className="shadow-lg hover:shadow-glow"
              >
                <Users className="w-4 h-4 mr-1" />
                Join Waitlist
              </Button>
            </Link>
            <Link to="/lawyers-join">
              <Button 
                data-testid="nav-for-lawyers-btn"
                variant="outline"
                size="sm"
                className={cn(
                  isDarkNav 
                    ? "border-slate-500 text-white bg-transparent hover:bg-white/10" 
                    : "border-amber-200 text-amber-700 hover:bg-amber-50"
                )}
              >
                <Scale className="w-4 h-4 mr-1" />
                For Lawyers
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-btn"
            className="lg:hidden p-2"
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
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-2">
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
            <div className="pt-4 space-y-2 border-t">
              <Link to="/waitlist" className="block">
                <Button className="w-full" data-testid="mobile-join-waitlist-btn">
                  <Users className="w-4 h-4 mr-2" />
                  Join Waitlist (Users)
                </Button>
              </Link>
              <Link to="/lawyers-join" className="block">
                <Button variant="outline" className="w-full border-amber-200 text-amber-700">
                  <Scale className="w-4 h-4 mr-2" />
                  For Lawyers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
