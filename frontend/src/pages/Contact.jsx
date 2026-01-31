import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  Phone, 
  Mail, 
  Send,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link for simple email
    const subject = encodeURIComponent(`Contact Form: Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    // Open mail client
    window.location.href = `mailto:singhvaibhav9815@gmail.com?subject=${subject}&body=${body}`;
    
    // Simulate submission for UX
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative py-16">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-800/30" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600/20 text-amber-400 text-sm font-medium mb-4">
              <MessageSquare className="w-4 h-4" />
              Get In Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Have feedback or questions? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div {...fadeUp}>
              <h2 className="text-2xl font-semibold text-slate-900 mb-6 font-heading">
                Reach Out to Us
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Whether you have a question about our services, need assistance, 
                or just want to share your feedback, we're here to help.
              </p>
              
              <div className="space-y-6">
                <a 
                  href="tel:469-592-2133"
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                  data-testid="contact-phone"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Phone className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="text-lg font-medium text-slate-900">469-592-2133</p>
                  </div>
                </a>
                
                <a 
                  href="mailto:singhvaibhav9815@gmail.com"
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                  data-testid="contact-email"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                    <Mail className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="text-lg font-medium text-slate-900">singhvaibhav9815@gmail.com</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        Thanks for reaching out!
                      </h3>
                      <p className="text-slate-600">
                        We'll get back to you soon.
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-6"
                        onClick={() => setIsSubmitted(false)}
                        data-testid="send-another-btn"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <h3 className="text-xl font-semibold text-slate-900 mb-4">
                        Send us a message
                      </h3>
                      
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                          data-testid="contact-name-input"
                          className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter your email"
                          data-testid="contact-email-input"
                          className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="How can we help you?"
                          data-testid="contact-message-input"
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isSubmitting}
                        data-testid="contact-submit-btn"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
