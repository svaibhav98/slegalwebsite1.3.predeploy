import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Mail, MapPin, Users, Scale, ArrowRight, Phone, Linkedin, MessageCircle } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'NyayAI Assistant', path: '/nyayai' },
    { name: 'Document Generator', path: '/documents' },
    { name: 'Find a Lawyer', path: '/find-lawyer' },
    { name: 'Case Tracker', path: '/case-tracker' },
    { name: 'Laws & Schemes', path: '/laws-and-schemes' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Join Waitlist', path: '/waitlist' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Contact Us', path: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer data-testid="footer" className="bg-slate-900 text-slate-300">
      {/* Early Access CTA */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Get Early Access</h3>
              <p className="text-slate-400 text-sm">Join the waitlist and help shape India's legal clarity platform</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/waitlist">
                <Button data-testid="footer-users-btn" className="w-full sm:w-auto">
                  <Users className="w-4 h-4 mr-2" />
                  Join Waitlist (Users)
                </Button>
              </Link>
              <Link to="/lawyers-join">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-green-600 bg-green-900/30 text-green-400 hover:bg-green-800/40 hover:text-green-300"
                  data-testid="footer-lawyers-btn"
                >
                  <Scale className="w-4 h-4 mr-2" />
                  Lawyers – Join Early
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10">
                <img 
                  src="https://customer-assets.emergentagent.com/job_lawbuddy-9/artifacts/ib924i4i_Logo.png" 
                  alt="SunoLegal"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white font-heading">SunoLegal</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              NyayAI powered legal assistance for India. Making legal help accessible, 
              affordable, and understandable for everyone.
            </p>
            <div className="space-y-3">
              <a 
                href="tel:469-592-2133"
                className="flex items-center gap-2 text-sm hover:text-amber-400 transition-colors"
                data-testid="footer-phone"
              >
                <Phone className="w-4 h-4" />
                469-592-2133
              </a>
              <a 
                href="mailto:singhvaibhav9815@gmail.com" 
                className="flex items-center gap-2 text-sm hover:text-amber-400 transition-colors"
                data-testid="footer-email"
              >
                <Mail className="w-4 h-4" />
                singhvaibhav9815@gmail.com
              </a>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                Mumbai, India
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-6">
              <h5 className="text-white font-medium text-sm mb-3">Follow Us</h5>
              <div className="flex items-center gap-3">
                <a 
                  href="https://linkedin.com/company/sunolegal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-600 hover:text-white transition-all duration-300 hover:scale-110"
                  data-testid="footer-linkedin"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="https://wa.me/14695922133"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-110"
                  data-testid="footer-whatsapp"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-sm hover:text-amber-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm hover:text-amber-400 transition-colors"
                    data-testid={link.name === 'Contact Us' ? 'footer-contact-link' : undefined}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links - Removed duplicate Contact Us */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/waitlist"
                  className="text-sm hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  Users Waitlist
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link 
                  to="/lawyers-join"
                  className="text-sm hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  Lawyers Registration
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link 
                  to="/for-lawyers"
                  className="text-sm hover:text-amber-400 transition-colors"
                >
                  For Lawyers Info
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © 2026 SunoLegal. All rights reserved.
            </p>
            <p className="text-xs text-slate-500 text-center md:text-right">
              NyayAI provides general legal information, not legal advice. 
              Always consult a licensed lawyer for specific matters.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
