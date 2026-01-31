import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  Target, 
  Heart,
  Users,
  Scale,
  Quote,
  MapPin
} from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Accessibility',
    description: 'Legal help should be available to everyone, not just those who can afford expensive lawyers.'
  },
  {
    icon: Heart,
    title: 'Simplicity',
    description: 'We translate complex legal jargon into plain, understandable language.'
  },
  {
    icon: Users,
    title: 'Trust',
    description: 'All lawyers on our platform are Bar Council verified. Your data is always secure.'
  }
];

const problems = [
  'Legal services in India are expensive and inaccessible to most people',
  'Laws are written in complex language that ordinary citizens cannot understand',
  'Finding a trustworthy lawyer is difficult without personal connections',
  'People miss important legal deadlines due to lack of proper tracking systems',
  'Government schemes and rights awareness is extremely low'
];

export default function About() {
  return (
    <div className="min-h-screen bg-light pt-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600/20 text-amber-400 text-sm font-medium mb-4">
              <Scale className="w-4 h-4" />
              About SunoLegal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-6">
              Making Legal Help Accessible for Every Indian
            </h1>
            <p className="text-lg text-slate-300">
              SunoLegal is building India's most accessible legal assistance platform, 
              powered by AI and backed by verified lawyers.
            </p>
            <div className="flex items-center gap-2 mt-6 text-slate-400">
              <MapPin className="w-4 h-4" />
              <span>Mumbai, India</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section data-testid="founder-story" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Quote className="w-12 h-12 text-amber-200 mb-6" />
              <h2 className="text-3xl md:text-4xl font-semibold font-heading text-slate-900 mb-6">
                The Story Behind SunoLegal
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  The idea for SunoLegal was born from a personal experience. Like many Indians, 
                  I once faced a legal situation where I didn't know my rights, couldn't afford 
                  a lawyer, and couldn't understand the complex legal jargon.
                </p>
                <p>
                  I realized that millions of Indians face this same problem every day. Whether 
                  it's a tenant who doesn't know their rights, a small business owner navigating 
                  contracts, or someone filing an RTI – legal help seemed out of reach.
                </p>
                <p>
                  That's when I decided to build SunoLegal – a platform that uses AI to simplify 
                  legal information, makes verified lawyers accessible, and empowers every Indian 
                  to understand and exercise their legal rights.
                </p>
                <p className="font-medium text-slate-900">
                  Our mission is simple: Legal clarity for all.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-8">
                <div className="w-20 h-20 mb-6">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_lawbuddy-9/artifacts/ib924i4i_Logo.png" 
                    alt="SunoLegal"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">SunoLegal</h3>
                <p className="text-slate-600 mb-4">NyayAI Powered Legal Assistant</p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="w-4 h-4" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section data-testid="mission-section" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-medium tracking-wide uppercase text-amber-600 mb-4 block">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold font-heading text-slate-900 mb-6">
                Democratizing Legal Access in India
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                We believe that understanding your legal rights shouldn't require a law degree or 
                deep pockets. SunoLegal combines AI technology with human expertise to make 
                legal help accessible, affordable, and understandable for every Indian citizen.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Whether you're a tenant fighting for your rights, a small business owner 
                navigating contracts, or simply someone trying to understand consumer protection laws – 
                SunoLegal is here to help.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1659352791239-6a796c124088?w=600&h=400&fit=crop"
                alt="Indian professionals in consultation"
                className="rounded-2xl shadow-float"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium tracking-wide uppercase text-amber-600 mb-4 block">
              The Problem
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold font-heading text-slate-900">
              Why We Built SunoLegal
            </h2>
          </motion.div>

          <Card className="max-w-3xl mx-auto border-0 shadow-float">
            <CardContent className="p-8">
              <div className="space-y-4">
                {problems.map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-slate-700">{problem}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium tracking-wide uppercase text-amber-600 mb-4 block">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold font-heading text-slate-900">
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center border-0 shadow-card">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-amber-700" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{value.title}</h3>
                    <p className="text-slate-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold font-heading text-white mb-6">
              Join Us in Building a More Accessible Legal System
            </h2>
            <p className="text-slate-300 mb-8">
              Be among the first to experience SunoLegal. Sign up for early access today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/waitlist">
                <Button size="lg" data-testid="about-users-cta">
                  <Users className="w-4 h-4 mr-2" />
                  Join Waitlist (Users)
                </Button>
              </Link>
              <Link to="/lawyers-join">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-slate-500 text-white bg-transparent hover:bg-white/10"
                >
                  <Scale className="w-4 h-4 mr-2" />
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
