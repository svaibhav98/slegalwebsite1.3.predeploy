import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Scale, 
  CheckCircle2,
  ArrowRight,
  Users,
  Calendar,
  Wallet,
  Shield,
  TrendingUp,
  Star
} from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: 'Access to Clients',
    description: 'Connect with thousands of users seeking legal assistance across India.'
  },
  {
    icon: Calendar,
    title: 'Flexible Schedule',
    description: 'Set your own availability. Accept consultations that fit your schedule.'
  },
  {
    icon: Wallet,
    title: 'Transparent Earnings',
    description: 'Set your own rates. Low platform commission. Weekly payouts.'
  },
  {
    icon: Shield,
    title: 'Verified Profile',
    description: 'Bar Council verification badge builds trust with potential clients.'
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Practice',
    description: 'Expand your client base beyond geographical limitations.'
  },
  {
    icon: Star,
    title: 'Build Reputation',
    description: 'Collect reviews and ratings to showcase your expertise.'
  }
];

const steps = [
  { step: 1, title: 'Apply Online', description: 'Fill out our simple application form with your details.' },
  { step: 2, title: 'Submit Documents', description: 'Upload your Bar Council certificate and ID proof.' },
  { step: 3, title: 'Get Verified', description: 'Our team verifies your credentials (2-3 business days).' },
  { step: 4, title: 'Start Consulting', description: 'Set your rates, availability, and start accepting clients.' }
];

export default function ForLawyers() {
  return (
    <div className="min-h-screen bg-light pt-20">
      {/* Header */}
      <section className="bg-dark grain-overlay relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-800 to-emerald-900" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600/20 text-amber-400 text-sm font-medium mb-4">
                <Scale className="w-4 h-4" />
                For Legal Professionals
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-6">
                Grow Your Legal Practice with SunoLegal
              </h1>
              <p className="text-lg text-slate-300 mb-8">
                Join India's fastest-growing legal services platform. 
                Connect with clients, set your own rates, and build your reputation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/lawyers-join">
                  <Button size="lg" data-testid="apply-lawyer-btn">
                    Apply as Lawyer
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <img 
                src="https://images.unsplash.com/photo-1565688527174-775059ac429c?w=500&h=400&fit=crop"
                alt="Indian legal professionals in meeting"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section data-testid="lawyer-benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium tracking-wide uppercase text-amber-600 mb-4 block">
              Why Join SunoLegal
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold font-heading text-slate-900 tracking-tight">
              Benefits for Lawyers
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-amber-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium tracking-wide uppercase text-amber-600 mb-4 block">
              Getting Started
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold font-heading text-slate-900 tracking-tight">
              How to Join
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Requirements to Join</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    'Valid Bar Council of India enrollment certificate',
                    'Minimum 2 years of practicing experience',
                    'Government-issued photo ID (Aadhaar/PAN)',
                    'Professional photograph',
                    'Bank account details for payouts'
                  ].map((req, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">{req}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-dark grain-overlay relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-800 to-emerald-900" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold font-heading text-white mb-6">
              Transparent Commission Structure
            </h2>
            <p className="text-slate-300 mb-8">
              We take a flat 15% platform commission on completed consultations. 
              You set your own rates and receive weekly payouts directly to your bank account.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800/50 rounded-xl p-6">
                <div className="text-3xl font-bold text-amber-400 mb-2">15%</div>
                <div className="text-slate-400">Platform Commission</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6">
                <div className="text-3xl font-bold text-amber-400 mb-2">Weekly</div>
                <div className="text-slate-400">Payouts</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6">
                <div className="text-3xl font-bold text-amber-400 mb-2">₹0</div>
                <div className="text-slate-400">Joining Fee</div>
              </div>
            </div>
            <Link to="/lawyers-join">
              <Button size="lg" data-testid="cta-apply-lawyer-btn">
                Apply Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
