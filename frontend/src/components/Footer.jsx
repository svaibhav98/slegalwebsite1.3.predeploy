import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Mail, MapPin, Users, Scale, ArrowRight } from 'lucide-react';

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
              <a href={FORMS.users} target="_blank" rel="noopener noreferrer">
                <Button data-testid="footer-users-btn" className="w-full sm:w-auto">
                  <Users className="w-4 h-4 mr-2" />
                  Join Waitlist (Users)
                </Button>
              </a>
              <a href={FORMS.lawyers} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-slate-600 text-white hover:bg-slate-800"
                  data-testid="footer-lawyers-btn"
                >
                  <Scale className="w-4 h-4 mr-2" />
                  Lawyers – Join Early
                </Button>
              </a>
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
                href="mailto:contact@sunolegal.in" 
                className="flex items-center gap-2 text-sm hover:text-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                contact@sunolegal.in
              </a>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                Mumbai, India
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

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href={FORMS.users}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  Users Waitlist
                  <ArrowRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href={FORMS.lawyers}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  Lawyers Registration
                  <ArrowRight className="w-3 h-3" />
                </a>
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
              © {new Date().getFullYear()} SunoLegal. All rights reserved.
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
