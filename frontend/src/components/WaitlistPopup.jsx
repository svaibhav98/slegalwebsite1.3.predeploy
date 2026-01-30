import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { toast } from 'sonner';
import { X, Users, Scale, Loader2, CheckCircle2, ExternalLink, ArrowRight } from 'lucide-react';

const FORMS = {
  users: 'https://docs.google.com/forms/d/e/1FAIpQLScNPCWdYMLW1vXmZhsL3NTxu8VJxEtAQq40iWjn1wNGB5K7cQ/viewform',
  lawyers: 'https://docs.google.com/forms/d/e/1FAIpQLSet8323DrdZSHRn5pVONUmz1yuiPBbxjiZwJ_un4XQWGkJm2A/viewform'
};

const STORAGE_KEY = 'sunolegal_popup_dismissed';
const DISMISS_DAYS = 7;

const API_URL = process.env.REACT_APP_BACKEND_URL;

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Other'
];

const practiceAreas = [
  'Family Law', 'Criminal Law', 'Corporate Law', 'Property Law', 
  'Civil Law', 'Consumer Law', 'Labour Law', 'Tax Law', 'Other'
];

export default function WaitlistPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'lawyers'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // User form state
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    city: '',
    user_type: 'citizen'
  });
  
  // Lawyer form state
  const [lawyerForm, setLawyerForm] = useState({
    name: '',
    email: '',
    city: '',
    practice_area: '',
    experience: ''
  });

  useEffect(() => {
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    
    if (dismissedAt) {
      const dismissedDate = new Date(parseInt(dismissedAt));
      const now = new Date();
      const daysDiff = (now - dismissedDate) / (1000 * 60 * 60 * 24);
      
      if (daysDiff < DISMISS_DAYS) {
        return;
      }
    }
    
    const timer = setTimeout(() => {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (!userForm.email) {
      toast.error('Please enter your email');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userForm,
          user_type: userForm.user_type || 'citizen'
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
        toast.success('Welcome to the waitlist!');
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Unable to connect. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLawyerSubmit = async (e) => {
    e.preventDefault();
    if (!lawyerForm.email) {
      toast.error('Please enter your email');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/lawyer-interest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lawyerForm),
      });
      
      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
        toast.success('Thank you for your interest!');
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Unable to connect. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - centered overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center"
            onClick={handleDismiss}
          />
          
          {/* Modal - properly centered with padding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6"
            data-testid="waitlist-popup"
          >
            <div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-[520px] max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-5 sm:p-6 text-center relative flex-shrink-0">
                <button
                  onClick={handleDismiss}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-white transition-colors p-1"
                  data-testid="popup-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_lawbuddy-9/artifacts/ib924i4i_Logo.png" 
                    alt="SunoLegal"
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-1">
                  Join SunoLegal Early Access
                </h2>
                <p className="text-slate-300 text-sm">
                  Help shape India's legal clarity platform
                </p>
              </div>
              
              {/* Content - scrollable */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-grow">
                {!isSubmitted ? (
                  <>
                    {/* Tabs */}
                    <div className="flex gap-2 mb-5">
                      <button
                        onClick={() => setActiveTab('users')}
                        className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                          activeTab === 'users'
                            ? 'bg-amber-100 text-amber-800 border-2 border-amber-300'
                            : 'bg-slate-100 text-slate-600 border-2 border-transparent hover:bg-slate-200'
                        }`}
                      >
                        <Users className="w-4 h-4" />
                        Users
                      </button>
                      <button
                        onClick={() => setActiveTab('lawyers')}
                        className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                          activeTab === 'lawyers'
                            ? 'bg-amber-100 text-amber-800 border-2 border-amber-300'
                            : 'bg-slate-100 text-slate-600 border-2 border-transparent hover:bg-slate-200'
                        }`}
                      >
                        <Scale className="w-4 h-4" />
                        Lawyers
                      </button>
                    </div>
                    
                    {/* Users Form */}
                    {activeTab === 'users' && (
                      <form onSubmit={handleUserSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="user-name" className="text-sm">Full Name</Label>
                          <Input
                            id="user-name"
                            placeholder="Your name"
                            value={userForm.name}
                            onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="user-email" className="text-sm">Email *</Label>
                          <Input
                            id="user-email"
                            type="email"
                            placeholder="you@example.com"
                            value={userForm.email}
                            onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="user-city" className="text-sm">City/State (optional)</Label>
                          <Select 
                            value={userForm.city} 
                            onValueChange={(value) => setUserForm({...userForm, city: value})}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                            <SelectContent>
                              {cities.map(city => (
                                <SelectItem key={city} value={city}>{city}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="user-type" className="text-sm">I am a... (optional)</Label>
                          <Select 
                            value={userForm.user_type} 
                            onValueChange={(value) => setUserForm({...userForm, user_type: value})}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="citizen">Citizen</SelectItem>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="working">Working Professional</SelectItem>
                              <SelectItem value="business">Business Owner</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full h-12"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                          ) : (
                            <>Join Waitlist <ArrowRight className="w-4 h-4 ml-2" /></>
                          )}
                        </Button>
                        
                        {/* Google Form Secondary Option */}
                        <div className="text-center pt-3 border-t">
                          <p className="text-xs text-slate-500 mb-2">
                            Prefer the detailed 5-minute survey?
                          </p>
                          <a
                            href={FORMS.users}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-amber-600 hover:text-amber-700 font-medium"
                          >
                            Open Detailed Google Form
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </div>
                      </form>
                    )}
                    
                    {/* Lawyers Form */}
                    {activeTab === 'lawyers' && (
                      <form onSubmit={handleLawyerSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="lawyer-name" className="text-sm">Full Name</Label>
                          <Input
                            id="lawyer-name"
                            placeholder="Your name"
                            value={lawyerForm.name}
                            onChange={(e) => setLawyerForm({...lawyerForm, name: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lawyer-email" className="text-sm">Email *</Label>
                          <Input
                            id="lawyer-email"
                            type="email"
                            placeholder="you@example.com"
                            value={lawyerForm.email}
                            onChange={(e) => setLawyerForm({...lawyerForm, email: e.target.value})}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lawyer-city" className="text-sm">City/State</Label>
                          <Select 
                            value={lawyerForm.city} 
                            onValueChange={(value) => setLawyerForm({...lawyerForm, city: value})}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                            <SelectContent>
                              {cities.map(city => (
                                <SelectItem key={city} value={city}>{city}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="lawyer-practice" className="text-sm">Practice Area</Label>
                          <Select 
                            value={lawyerForm.practice_area} 
                            onValueChange={(value) => setLawyerForm({...lawyerForm, practice_area: value})}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select practice area" />
                            </SelectTrigger>
                            <SelectContent>
                              {practiceAreas.map(area => (
                                <SelectItem key={area} value={area}>{area}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="lawyer-experience" className="text-sm">Years of Experience (optional)</Label>
                          <Input
                            id="lawyer-experience"
                            type="number"
                            placeholder="e.g., 5"
                            value={lawyerForm.experience}
                            onChange={(e) => setLawyerForm({...lawyerForm, experience: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full h-12"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                          ) : (
                            <>Register Interest <ArrowRight className="w-4 h-4 ml-2" /></>
                          )}
                        </Button>
                        
                        {/* Google Form Secondary Option */}
                        <div className="text-center pt-3 border-t">
                          <p className="text-xs text-slate-500 mb-2">
                            Prefer the detailed lawyer onboarding form?
                          </p>
                          <a
                            href={FORMS.lawyers}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-amber-600 hover:text-amber-700 font-medium"
                          >
                            Open Lawyer Google Form
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </div>
                      </form>
                    )}
                  </>
                ) : (
                  /* Success State */
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">You're on the list!</h3>
                    <p className="text-slate-600 mb-4">
                      Thank you for joining SunoLegal. We'll notify you when we launch.
                    </p>
                    <Button onClick={handleDismiss} variant="outline">
                      Close
                    </Button>
                  </div>
                )}
                
                {/* Not now button */}
                {!isSubmitted && (
                  <button
                    onClick={handleDismiss}
                    className="w-full text-center text-sm text-slate-500 hover:text-slate-700 py-3 mt-2 transition-colors"
                    data-testid="popup-not-now-btn"
                  >
                    Not now
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export { FORMS };
