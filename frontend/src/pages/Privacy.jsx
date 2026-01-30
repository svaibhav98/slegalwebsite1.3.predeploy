import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Shield, 
  AlertTriangle
} from 'lucide-react';

export default function Privacy() {
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
              <Shield className="w-4 h-4" />
              Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-4">
              Privacy & Disclaimer
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Important information about how we handle your data and the nature of our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section data-testid="privacy-content" className="py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
          {/* Important Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl flex gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-amber-900 mb-2">Important Disclaimer</h2>
                <p className="text-amber-800">
                  <strong>NyayAI does not provide legal advice.</strong> The information provided by NyayAI 
                  is for general informational purposes only and should not be construed as legal advice 
                  on any matter. For advice specific to your situation, please consult with a licensed 
                  lawyer. The use of SunoLegal and NyayAI does not create an attorney-client relationship.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Privacy Policy */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-slate-600 mb-4">
                Last updated: January 2025
              </p>

              <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">
                1. Information We Collect
              </h3>
              <p className="text-slate-600 mb-4">
                We collect information you provide directly, including:
              </p>
              <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-1">
                <li>Name, email address, and city when you join the waitlist</li>
                <li>Questions you ask NyayAI</li>
                <li>Information provided when generating documents</li>
                <li>Profile information when you create an account</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">
                2. How We Use Your Information
              </h3>
              <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-1">
                <li>To provide and improve our services</li>
                <li>To send you updates about SunoLegal (you can opt out anytime)</li>
                <li>To respond to your inquiries and provide support</li>
                <li>To analyze usage patterns and improve NyayAI</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">
                3. Data Security
              </h3>
              <p className="text-slate-600 mb-4">
                We implement appropriate security measures to protect your personal information. 
                All data transmissions are encrypted using SSL/TLS. Your conversations with NyayAI 
                are stored securely and are not shared with third parties.
              </p>

              <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">
                4. Data Sharing
              </h3>
              <p className="text-slate-600 mb-4">
                We do not sell your personal information. We may share data with:
              </p>
              <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-1">
                <li>Lawyers you choose to consult (only relevant case information)</li>
                <li>Service providers who help us operate the platform</li>
                <li>Legal authorities if required by law</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">
                5. Your Rights
              </h3>
              <p className="text-slate-600 mb-4">
                You have the right to access, correct, or delete your personal information. 
                Contact us at privacy@sunolegal.in to exercise these rights.
              </p>
            </CardContent>
          </Card>

          {/* Terms of Service */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">
                1. Acceptance of Terms
              </h3>
              <p className="text-slate-600 mb-4">
                By using SunoLegal, you agree to these terms. If you do not agree, 
                please do not use our services.
              </p>

              <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">
                2. Nature of Service
              </h3>
              <p className="text-slate-600 mb-4">
                SunoLegal provides:
              </p>
              <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-1">
                <li>AI-powered legal information (not legal advice)</li>
                <li>Legal document templates</li>
                <li>A marketplace to connect with verified lawyers</li>
                <li>Case tracking tools</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">
                3. Limitation of Liability
              </h3>
              <p className="text-slate-600 mb-4">
                SunoLegal and NyayAI are provided "as is" without warranties of any kind. 
                We are not liable for any damages arising from your use of our services 
                or reliance on information provided.
              </p>

              <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">
                4. Lawyer Services
              </h3>
              <p className="text-slate-600 mb-4">
                Lawyers on our platform are independent professionals. SunoLegal verifies 
                their Bar Council credentials but is not responsible for the quality of 
                their advice or services.
              </p>

              <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">
                5. Contact
              </h3>
              <p className="text-slate-600 mb-4">
                For questions about these terms, contact us at legal@sunolegal.in
              </p>
            </CardContent>
          </Card>

          {/* Last Updated */}
          <p className="text-center text-slate-500 text-sm">
            These policies were last updated in January 2025 and may be updated periodically. 
            Please check back for any changes.
          </p>
        </div>
      </section>
    </div>
  );
}
