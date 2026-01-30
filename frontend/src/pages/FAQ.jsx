import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '../components/ui/accordion';
import { 
  HelpCircle, 
  Sparkles,
  Users,
  Scale
} from 'lucide-react';
import { FORMS } from '../components/WaitlistPopup';

const faqs = [
  {
    question: 'What is SunoLegal?',
    answer: 'SunoLegal is an AI-powered legal assistance platform for India. We provide simplified legal information through NyayAI, document generation, verified lawyer connections, and case tracking – all designed to make legal help accessible to everyone.'
  },
  {
    question: 'Is NyayAI a replacement for a lawyer?',
    answer: 'No, NyayAI provides general legal information and guidance, not legal advice. It helps you understand your rights and options in plain language. For specific legal matters, we always recommend consulting with a verified lawyer on our platform.'
  },
  {
    question: 'How do I join the waitlist?',
    answer: 'Simply click the "Join Waitlist" button and fill out the Google Form. We\'ll notify you as soon as we launch. Early waitlist members get priority access and special benefits.'
  },
  {
    question: 'Is my data safe with SunoLegal?',
    answer: 'Absolutely. We use end-to-end encryption for all conversations and document storage. Your personal information is never shared with third parties. We are committed to GDPR-compliant data handling practices.'
  },
  {
    question: 'How are lawyers verified on the platform?',
    answer: 'All lawyers on SunoLegal go through a rigorous verification process including Bar Council certificate verification, ID proof validation, and professional background checks. Only verified lawyers can offer consultations on our platform.'
  },
  {
    question: 'What types of legal documents can I generate?',
    answer: 'SunoLegal offers templates for common legal documents including Rent Agreements, NDAs, Legal Notices, Affidavits, Power of Attorney, and more. Simply fill in the details, and we generate a professionally formatted PDF.'
  },
  {
    question: 'How much does it cost?',
    answer: 'Basic access to legal information will be free forever. Premium features like unlimited AI conversations, document generation, and lawyer consultations will be available starting at ₹299/month. Join the waitlist for early-bird pricing.'
  },
  {
    question: 'I\'m a lawyer. How can I join the platform?',
    answer: 'We welcome verified lawyers to join our platform! Click "I\'m a Lawyer" button to fill out our lawyer registration form. Once verified, you can set your own rates, manage your schedule, and connect with clients across India.'
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-light pt-20">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600/20 text-amber-400 text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Everything you need to know about SunoLegal and NyayAI
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section data-testid="faq-section" className="py-16">
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white rounded-xl border-0 shadow-card px-6"
                >
                  <AccordionTrigger className="text-left py-5 text-slate-900 font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center"
          >
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-slate-600 mb-6">
              Join our waitlist and be the first to know when we launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={FORMS.users} target="_blank" rel="noopener noreferrer">
                <Button data-testid="faq-users-cta">
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
