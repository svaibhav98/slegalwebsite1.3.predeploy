import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  MessageSquare, 
  FileText, 
  Users, 
  Bell, 
  Shield, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Scale,
  Building2,
  Home as HomeIcon,
  Briefcase,
  TrendingUp
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const features = [
  {
    icon: MessageSquare,
    title: "Ask NyayAI",
    description: "Get instant answers to legal questions in plain English or Hinglish. Our AI simplifies complex laws for you.",
    link: "/nyayai",
    color: "bg-amber-100 text-amber-700"
  },
  {
    icon: FileText,
    title: "Generate Documents",
    description: "Create legal documents like Rent Agreements, NDAs, and more. Fill a simple form, download PDF.",
    link: "/documents",
    color: "bg-blue-100 text-blue-700"
  },
  {
    icon: Users,
    title: "Find Verified Lawyers",
    description: "Connect with Bar Council verified lawyers. Book consultations via chat, call, or video.",
    link: "/find-lawyer",
    color: "bg-green-100 text-green-700"
  },
  {
    icon: Bell,
    title: "Track Your Cases",
    description: "Never miss a hearing date. Add your cases, set reminders, and stay organized.",
    link: "/case-tracker",
    color: "bg-purple-100 text-purple-700"
  }
];

const steps = [
  { number: "01", title: "Ask Your Question", description: "Type your legal question in plain language" },
  { number: "02", title: "Get AI Guidance", description: "NyayAI provides simplified explanations" },
  { number: "03", title: "Generate Documents", description: "Create legal documents if needed" },
  { number: "04", title: "Consult a Lawyer", description: "Connect with verified experts for advice" }
];

const userTypes = [
  { icon: HomeIcon, title: "Tenants & Landlords", description: "Rent agreements, disputes, tenant rights" },
  { icon: Briefcase, title: "Freelancers & MSMEs", description: "Contracts, NDAs, business compliance" },
  { icon: Building2, title: "Property Buyers", description: "Sale deeds, title verification, disputes" },
  { icon: Users, title: "Everyday Citizens", description: "Consumer rights, RTI, government schemes" }
];

export default function Home() {
  const [waitlistCount, setWaitlistCount] = useState(null);
  const [lawyerCount, setLawyerCount] = useState(null);

  useEffect(() => {
    // Fetch waitlist counts
    const fetchCounts = async () => {
      try {
        const [userRes, lawyerRes] = await Promise.all([
          fetch(`${API_URL}/api/waitlist/count`),
          fetch(`${API_URL}/api/lawyer-interest/count`)
        ]);
        
        if (userRes.ok) {
          const userData = await userRes.json();
          setWaitlistCount(userData.count || 0);
        }
        if (lawyerRes.ok) {
          const lawyerData = await lawyerRes.json();
          setLawyerCount(lawyerData.count || 0);
        }
      } catch (error) {
        console.log('Could not fetch counts');
      }
    };
    
    fetchCounts();
  }, []);

  // Format count for display (e.g., 150+ early adopters)
  const formatCount = (count) => {
    if (count === null) return null;
    if (count < 10) return `${count}`;
    // Round down to nearest 10 and add +
    const rounded = Math.floor(count / 10) * 10;
    return `${rounded}+`;
  };

  const totalCount = (waitlistCount || 0) + (lawyerCount || 0);

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Updated Gradient */}
      <section 
        data-testid="hero-section"
        className="relative min-h-screen flex items-center"
      >
        {/* Improved gradient - lighter and more premium */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-800/30" />
        
        {/* Decorative Elements - Enhanced amber glow */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-400/5 rounded-full blur-2xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-32 md:py-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div {...fadeUp} className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 text-sm font-medium mb-6 border border-amber-500/30">
                <Sparkles className="w-4 h-4" />
                NyayAI Powered Legal Assistant
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white font-heading tracking-tight leading-tight mb-6">
                Legal Help,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">Simplified</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-xl">
                India-specific laws. Location-aware guidance. Secure by design. 
                Get AI-powered legal assistance, generate documents, and connect with verified lawyers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/nyayai">
                  <Button 
                    data-testid="try-nyayai-btn"
                    size="lg" 
                    className="w-full sm:w-auto shadow-lg shadow-amber-500/20"
                  >
                    Try NyayAI
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/waitlist">
                  <Button 
                    data-testid="join-waitlist-hero-btn"
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto border-slate-500 text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Join Waitlist
                  </Button>
                </Link>
              </div>
              
              {/* Secondary CTA */}
              <div className="mt-4">
                <Link 
                  to="/lawyers-join"
                  className="inline-flex items-center text-sm text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <Scale className="w-4 h-4 mr-2" />
                  I'm a Lawyer – Join Early
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
              
              {/* Live Waitlist Counter */}
              {totalCount > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6"
                  data-testid="waitlist-counter"
                >
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-slate-900 flex items-center justify-center"
                        >
                          <Users className="w-3 h-3 text-white" />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-white font-semibold">{formatCount(totalCount)}</span>
                      <span className="text-slate-400 text-sm">early adopters joined</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Trust Indicators */}
              <div className="flex items-center gap-6 mt-10 pt-10 border-t border-slate-700/50">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-slate-400">End-to-End Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-slate-400">Bar Council Verified</span>
                </div>
              </div>
            </motion.div>
            
            {/* Hero Image */}
            <motion.div 
              {...fadeUp}
              transition={{ delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                <img 
                  src="https://images.unsplash.com/photo-1737574994780-e31827afaed7?w=600&h=400&fit=crop"
                  alt="Professional lawyer working"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Verified Lawyers</p>
                    <p className="text-xs text-slate-500">4,500+ experts nationwide</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-600/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-amber-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* How It Works - Light */}
      <section data-testid="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-sm font-medium tracking-wide uppercase text-amber-600 mb-4 block">
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold font-heading text-slate-900 tracking-tight">
              Four Simple Steps
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-amber-200 font-heading mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <section data-testid="features-section" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-sm font-medium tracking-wide uppercase text-amber-600 mb-4 block">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold font-heading text-slate-900 tracking-tight mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From AI-powered guidance to verified lawyer consultations, 
              SunoLegal has all your legal needs covered.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full group cursor-pointer border-0 shadow-card hover:shadow-float transition-all">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 font-heading">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <Link 
                      to={feature.link}
                      className="inline-flex items-center text-amber-600 font-medium group-hover:text-amber-700 transition-colors"
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section data-testid="who-its-for" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-sm font-medium tracking-wide uppercase text-amber-600 mb-4 block">
              Who It's For
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold font-heading text-slate-900 tracking-tight">
              Built for Everyone
            </h2>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {userTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl border-0 shadow-card hover:shadow-float transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                  <type.icon className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{type.title}</h3>
                <p className="text-sm text-slate-600">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - Updated Gradient */}
      <section data-testid="trust-section" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="text-sm font-medium tracking-wide uppercase text-amber-400 mb-4 block">
                Trust & Security
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold font-heading text-white tracking-tight mb-6">
                Your Privacy is Our Priority
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                All conversations with NyayAI are encrypted. Your documents are stored securely. 
                We never share your data with third parties.
              </p>
              
              <div className="space-y-4">
                {[
                  "End-to-end encryption for all communications",
                  "Bar Council verified lawyers only",
                  "GDPR compliant data handling",
                  "No hidden fees or surprise charges"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="relative">
              <img 
                src="https://images.unsplash.com/photo-1730130596425-197566414dc4?w=600&h=400&fit=crop"
                alt="Happy family at home"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-testid="cta-section" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div {...fadeUp}>
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-6">
              <Scale className="w-8 h-8 text-amber-700" />
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold font-heading text-slate-900 tracking-tight mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands of Indians who are already using SunoLegal for their legal needs. 
              Get early access to the app.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/waitlist">
                <Button size="lg" data-testid="cta-users-btn">
                  <Users className="w-5 h-5 mr-2" />
                  Join Waitlist (Users)
                </Button>
              </Link>
              <Link to="/lawyers-join">
                <Button variant="outline" size="lg" data-testid="cta-lawyers-btn" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                  <Scale className="w-5 h-5 mr-2" />
                  I'm a Lawyer
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
