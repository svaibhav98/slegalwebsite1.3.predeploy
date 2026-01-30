import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { 
  Users, 
  Scale, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { FORMS } from '../components/WaitlistPopup';

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-light pt-20">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600/20 text-amber-400 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Early Access
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-4">
              Join Early Access
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Be among the first to experience SunoLegal. 
              Help shape India's legal clarity platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards Section */}
      <section data-testid="waitlist-cards-section" className="py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Users Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-0 shadow-float hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-amber-700" />
                  </div>
                  <CardTitle className="text-2xl">For Users</CardTitle>
                  <CardDescription className="text-base">
                    Citizens, freelancers, MSMEs seeking legal help
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      'Early access to NyayAI',
                      'Free document generations',
                      'Priority support',
                      'Shape product features'
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href={FORMS.users}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full h-12" data-testid="waitlist-users-btn">
                      Join Waitlist
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* Lawyers Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full border-0 shadow-float hover:shadow-xl transition-shadow border-2 border-amber-200">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-4">
                    <Scale className="w-8 h-8 text-amber-400" />
                  </div>
                  <CardTitle className="text-2xl">For Lawyers</CardTitle>
                  <CardDescription className="text-base">
                    Legal professionals wanting to join the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      'Get verified early',
                      'Lower commission rates',
                      'Featured profile placement',
                      'Input on platform features'
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href={FORMS.lawyers}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button 
                      variant="outline"
                      className="w-full h-12 border-amber-600 text-amber-700 hover:bg-amber-50" 
                      data-testid="waitlist-lawyers-btn"
                    >
                      Lawyers – Join Early
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Note */}
          <p className="text-center text-sm text-slate-500 mt-8">
            This is for research/early access. No spam. We respect your privacy.
          </p>
        </div>
      </section>
    </div>
  );
}
