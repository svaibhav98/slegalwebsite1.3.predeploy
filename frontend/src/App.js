import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WaitlistPopup from './components/WaitlistPopup';

// Pages
import Home from './pages/Home';
import NyayAI from './pages/NyayAI';
import Documents from './pages/Documents';
import FindLawyer from './pages/FindLawyer';
import ForLawyers from './pages/ForLawyers';
import CaseTracker from './pages/CaseTracker';
import About from './pages/About';
import Waitlist from './pages/Waitlist';
import Privacy from './pages/Privacy';
import Pricing from './pages/Pricing';
import LawsAndSchemes from './pages/LawsAndSchemes';
import FAQ from './pages/FAQ';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nyayai" element={<NyayAI />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/find-lawyer" element={<FindLawyer />} />
          <Route path="/for-lawyers" element={<ForLawyers />} />
          <Route path="/case-tracker" element={<CaseTracker />} />
          <Route path="/about" element={<About />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/laws-and-schemes" element={<LawsAndSchemes />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="bottom-right" />
      {/* Show popup only on homepage */}
      {isHomePage && <WaitlistPopup />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
