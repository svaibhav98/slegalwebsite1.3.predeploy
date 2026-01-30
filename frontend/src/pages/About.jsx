import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  Scale, 
  Target, 
  Heart,
  Users,
  ArrowRight,
  CheckCircle2
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
      <section className="bg-dark grain-overlay relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />
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
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section data-testid="mission-section" className="py-20 bg-white">
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
                src="https://images.unsplash.com/photo-1730130596425-197566414dc4?w=600&h=400&fit=crop"
                alt="Happy Indian family"
                className="rounded-2xl shadow-float"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-slate-50">
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

          <Card className="max-w-3xl mx-auto">
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
      <section className="py-20 bg-white">
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
                <Card className="h-full text-center">
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
      <section className="py-20 bg-dark grain-overlay relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />
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
            <Link to="/waitlist">
              <Button size="lg" data-testid="about-cta-btn">
                Join Waitlist
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
