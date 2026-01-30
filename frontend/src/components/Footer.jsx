import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'NyayAI Assistant', path: '/nyayai' },
    { name: 'Document Generator', path: '/documents' },
    { name: 'Find a Lawyer', path: '/find-lawyer' },
    { name: 'Case Tracker', path: '/case-tracker' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'For Lawyers', path: '/for-lawyers' },
    { name: 'Join Waitlist', path: '/waitlist' },
    { name: 'Privacy Policy', path: '/privacy' },
  ],
  legal: [
    { name: 'Terms of Service', path: '/privacy' },
    { name: 'Disclaimer', path: '/privacy' },
    { name: 'Cookie Policy', path: '/privacy' },
  ],
};

export default function Footer() {
  return (
    <footer data-testid="footer" className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-heading">SunoLegal</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              NyayAI powered legal assistance for India. Making legal help accessible, 
              affordable, and understandable for everyone.
            </p>
            <div className="space-y-3">
              <a 
                href="mailto:contact@sunolegal.in" 
                className="flex items-center gap-2 text-sm hover:text-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                contact@sunolegal.in
              </a>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                New Delhi, India
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
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
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
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} SunoLegal. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">
              NyayAI provides general legal information, not legal advice. 
              Always consult a licensed lawyer for specific matters.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
