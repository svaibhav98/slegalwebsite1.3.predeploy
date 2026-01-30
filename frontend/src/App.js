import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
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
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
