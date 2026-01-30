import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { 
  Check, 
  Sparkles,
  ArrowRight,
  Users,
  Scale
} from 'lucide-react';
import { FORMS } from '../components/WaitlistPopup';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Get started with basic legal information',
    features: [
      'Access to NyayAI chat (limited)',
      'Browse legal information',
      'View document templates',
      'Email updates & newsletters',
      'Community access'
    ],
    cta: 'Join Waitlist',
    popular: false
  },
  {
    name: 'Professional',
    price: 'Starting ₹299',
    period: '/month',
    description: 'Full access to all features',
    features: [
      'Unlimited NyayAI conversations',
      'Generate unlimited documents',
      'Priority lawyer matching',
      'Case tracking & reminders',
      'Dedicated support',
      'Ad-free experience'
    ],
    cta: 'Coming Soon',
    popular: true,
    comingSoon: true
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-light pt-20">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600/20 text-amber-400 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Pricing
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Start free, upgrade when you're ready. No hidden fees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section data-testid="pricing-cards" className="py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full relative ${plan.popular ? 'border-2 border-amber-500 shadow-glow' : 'border-0 shadow-float'}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
                      Coming Soon
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                      <span className="text-slate-500">{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.comingSoon ? (
                      <Button 
                        disabled 
                        className="w-full h-12 bg-slate-200 text-slate-500"
                      >
                        {plan.cta}
                      </Button>
                    ) : (
                      <a 
                        href={FORMS.users}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className="w-full h-12">
                          {plan.cta}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <p className="text-slate-600 mb-6">
              Not sure which plan is right for you? Join our waitlist and we'll help you decide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={FORMS.users} target="_blank" rel="noopener noreferrer">
                <Button data-testid="pricing-users-cta">
                  <Users className="w-4 h-4 mr-2" />
                  Join Waitlist (Users)
                </Button>
              </a>
              <a href={FORMS.lawyers} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                  <Scale className="w-4 h-4 mr-2" />
                  I'm a Lawyer
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
