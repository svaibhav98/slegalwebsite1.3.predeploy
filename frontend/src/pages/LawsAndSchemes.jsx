import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { 
  ShoppingCart, 
  Home,
  Briefcase,
  Users,
  Building2,
  FileText,
  Scale,
  Sparkles
} from 'lucide-react';

const lawCategories = [
  {
    icon: ShoppingCart,
    title: 'Consumer Protection',
    description: 'Rights under Consumer Protection Act 2019, filing complaints, refunds, defective products',
    color: 'bg-blue-100 text-blue-700',
    topics: ['Consumer Court', 'Refund Rights', 'Product Warranty', 'Service Deficiency']
  },
  {
    icon: Home,
    title: 'Property & Tenancy',
    description: 'Rent agreements, tenant rights, property disputes, registration process',
    color: 'bg-green-100 text-green-700',
    topics: ['Rent Control', 'Eviction Rules', 'Security Deposit', 'Property Registration']
  },
  {
    icon: Briefcase,
    title: 'Employment Laws',
    description: 'Labor rights, PF, gratuity, termination rules, workplace harassment',
    color: 'bg-purple-100 text-purple-700',
    topics: ['PF & Gratuity', 'Notice Period', 'POSH Act', 'Minimum Wages']
  },
  {
    icon: Users,
    title: 'Family Law',
    description: 'Marriage, divorce, maintenance, custody, inheritance matters',
    color: 'bg-pink-100 text-pink-700',
    topics: ['Divorce Process', 'Child Custody', 'Maintenance', 'Succession']
  },
  {
    icon: Building2,
    title: 'MSME & Business',
    description: 'Business registration, GST, contracts, compliance, dispute resolution',
    color: 'bg-amber-100 text-amber-700',
    topics: ['GST Compliance', 'MSME Registration', 'Contract Law', 'Arbitration']
  },
  {
    icon: FileText,
    title: 'RTI & Government Schemes',
    description: 'Right to Information, government welfare schemes, subsidies, benefits',
    color: 'bg-teal-100 text-teal-700',
    topics: ['RTI Filing', 'PM Schemes', 'State Benefits', 'Subsidies']
  }
];

export default function LawsAndSchemes() {
  return (
    <div className="min-h-screen bg-light pt-20">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600/20 text-amber-400 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Legal Knowledge
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-4">
              Laws & Government Schemes
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Explore Indian laws simplified for everyone. Understand your rights and available government benefits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section data-testid="laws-categories" className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-float transition-all border-0 shadow-card">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mb-4`}>
                      <category.icon className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.topics.map((topic, i) => (
                        <span 
                          key={i}
                          className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <Card className="max-w-2xl mx-auto border-0 shadow-float bg-gradient-to-br from-slate-50 to-white">
              <CardContent className="py-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Want detailed legal guidance?
                </h3>
                <p className="text-slate-600 mb-6">
                  Join our waitlist to access NyayAI for personalized legal information.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/waitlist">
                    <Button data-testid="laws-users-cta">
                      <Users className="w-4 h-4 mr-2" />
                      Join Waitlist (Users)
                    </Button>
                  </Link>
                  <Link to="/lawyers-join">
                    <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                      <Scale className="w-4 h-4 mr-2" />
                      I'm a Lawyer
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
