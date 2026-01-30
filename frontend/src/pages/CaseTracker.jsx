import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  Bell, 
  Calendar, 
  FileText, 
  ArrowRight,
  Plus,
  AlertCircle
} from 'lucide-react';

const features = [
  {
    icon: Plus,
    title: 'Add Your Cases',
    description: 'Track multiple legal cases in one place. Add case numbers, court details, and descriptions.'
  },
  {
    icon: Calendar,
    title: 'Hearing Dates',
    description: 'Never miss a court date. Add hearing schedules and get automatic reminders.'
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Receive push notifications before important dates. Customize reminder timing.'
  },
  {
    icon: FileText,
    title: 'Notes & Documents',
    description: 'Attach notes, documents, and photos to each case for easy reference.'
  }
];

const sampleCases = [
  {
    title: 'Property Dispute - Sector 15',
    court: 'Delhi High Court',
    caseNumber: 'CS(OS) 123/2024',
    nextHearing: 'Feb 15, 2025',
    status: 'active'
  },
  {
    title: 'Consumer Complaint - XYZ Electronics',
    court: 'District Consumer Forum',
    caseNumber: 'CC/345/2024',
    nextHearing: 'Feb 28, 2025',
    status: 'active'
  }
];

export default function CaseTracker() {
  return (
    <div className="min-h-screen bg-light pt-20">
      {/* Header */}
      <section className="bg-dark grain-overlay relative py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600/20 text-amber-400 text-sm font-medium mb-4">
              <Bell className="w-4 h-4" />
              Case Tracker
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-4">
              Never Miss a Hearing
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Track all your legal cases in one place. 
              Get reminders for hearing dates and stay organized.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section data-testid="case-tracker-features" className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-7 h-7 text-purple-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold font-heading text-slate-900 mb-4">
              Preview: Your Cases Dashboard
            </h2>
            <p className="text-slate-600">
              Here's what your case tracker will look like in the app
            </p>
          </motion.div>

          <Card className="overflow-hidden border-0 shadow-float">
            <div className="bg-slate-900 px-6 py-4">
              <h3 className="text-white font-semibold">My Cases</h3>
            </div>
            <CardContent className="p-0">
              {sampleCases.map((caseItem, index) => (
                <div 
                  key={index}
                  className="p-6 border-b border-slate-100 last:border-0"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-slate-900">{caseItem.title}</h4>
                      <p className="text-sm text-slate-500">{caseItem.court}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      caseItem.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {caseItem.status === 'active' ? 'Active' : 'Closed'}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <FileText className="w-4 h-4" />
                      {caseItem.caseNumber}
                    </div>
                    <div className="flex items-center gap-2 text-amber-600 font-medium">
                      <Calendar className="w-4 h-4" />
                      Next: {caseItem.nextHearing}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add Case Button */}
              <div className="p-6 bg-slate-50 text-center">
                <Button 
                  variant="outline"
                  onClick={() => alert('Case tracker is available in the full app. Join the waitlist!')}
                  data-testid="add-case-btn"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Case
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900 font-medium">Coming Soon in the App</p>
              <p className="text-sm text-blue-700 mt-1">
                The case tracker feature will be available in our mobile app. 
                Join the waitlist to get notified when it launches!
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link to="/waitlist">
              <Button size="lg" data-testid="waitlist-case-tracker-btn">
                Join Waitlist
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
