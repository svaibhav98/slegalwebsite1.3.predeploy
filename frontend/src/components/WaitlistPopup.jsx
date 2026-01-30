import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { X, Users, Scale } from 'lucide-react';

const FORMS = {
  users: 'https://docs.google.com/forms/d/e/1FAIpQLScNPCWdYMLW1vXmZhsL3NTxu8VJxEtAQq40iWjn1wNGB5K7cQ/viewform',
  lawyers: 'https://docs.google.com/forms/d/e/1FAIpQLSet8323DrdZSHRn5pVONUmz1yuiPBbxjiZwJ_un4XQWGkJm2A/viewform'
};

const STORAGE_KEY = 'sunolegal_popup_dismissed';
const DISMISS_DAYS = 7;

export default function WaitlistPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    
    if (dismissedAt) {
      const dismissedDate = new Date(parseInt(dismissedAt));
      const now = new Date();
      const daysDiff = (now - dismissedDate) / (1000 * 60 * 60 * 24);
      
      if (daysDiff < DISMISS_DAYS) {
        return; // Don't show popup
      }
    }
    
    // Show popup after a short delay for better UX
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setIsOpen(false);
  };

  const handleOpenForm = (type) => {
    window.open(FORMS[type], '_blank');
    handleDismiss();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={handleDismiss}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[95%] max-w-md"
            data-testid="waitlist-popup"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-6 text-center relative">
                <button
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                  data-testid="popup-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="w-16 h-16 mx-auto mb-4">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_lawbuddy-9/artifacts/ib924i4i_Logo.png" 
                    alt="SunoLegal"
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <h2 className="text-2xl font-bold text-white font-heading mb-2">
                  Join SunoLegal Early Access
                </h2>
                <p className="text-slate-300 text-sm">
                  Get early access to NyayAI and help shape India's legal clarity platform.
                </p>
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-4">
                <Button
                  onClick={() => handleOpenForm('users')}
                  className="w-full h-14 text-base"
                  data-testid="popup-users-btn"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join Waitlist (Users)
                </Button>
                
                <Button
                  onClick={() => handleOpenForm('lawyers')}
                  variant="outline"
                  className="w-full h-14 text-base border-amber-200 text-amber-700 hover:bg-amber-50"
                  data-testid="popup-lawyers-btn"
                >
                  <Scale className="w-5 h-5 mr-2" />
                  I'm a Lawyer (Join Early)
                </Button>
                
                <button
                  onClick={handleDismiss}
                  className="w-full text-center text-sm text-slate-500 hover:text-slate-700 py-2 transition-colors"
                  data-testid="popup-not-now-btn"
                >
                  Not now
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Export the forms URLs for use in other components
export { FORMS };
