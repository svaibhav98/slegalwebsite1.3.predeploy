import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { toast } from 'sonner';
import { 
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Loader2,
  ExternalLink
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSet8323DrdZSHRn5pVONUmz1yuiPBbxjiZwJ_un4XQWGkJm2A/viewform';

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Other'
];

const practiceAreas = [
  'Family Law', 'Criminal Law', 'Corporate Law', 'Property Law', 
  'Civil Law', 'Consumer Law', 'Labour Law', 'Tax Law', 'Other'
];

export default function LawyersJoin() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    city: '',
    practice_area: '',
    experience: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email) {
      toast.error('Please enter your email');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/lawyer-interest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
        toast.success('Thank you for your interest!');
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Unable to connect. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
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
              <Scale className="w-4 h-4" />
              For Legal Professionals
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-4">
              Join SunoLegal as a Lawyer
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Register your interest and be among the first verified lawyers on India's 
              most accessible legal platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section data-testid="lawyers-join-form-section" className="py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Quick Form Card */}
            <Card className="border-0 shadow-float">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-amber-600" />
                  Quick Registration
                </CardTitle>
                <CardDescription>
                  Express your interest in 30 seconds
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="lawyer-name">Full Name</Label>
                      <Input
                        id="lawyer-name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                        className="mt-1"
                        data-testid="lawyer-name-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lawyer-email">Email *</Label>
                      <Input
                        id="lawyer-email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        required
                        className="mt-1"
                        data-testid="lawyer-email-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lawyer-city">City/State</Label>
                      <Select 
                        value={form.city} 
                        onValueChange={(value) => setForm({...form, city: value})}
                      >
                        <SelectTrigger className="mt-1" data-testid="lawyer-city-select">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="lawyer-practice">Practice Area</Label>
                      <Select 
                        value={form.practice_area} 
                        onValueChange={(value) => setForm({...form, practice_area: value})}
                      >
                        <SelectTrigger className="mt-1" data-testid="lawyer-practice-select">
                          <SelectValue placeholder="Select practice area" />
                        </SelectTrigger>
                        <SelectContent>
                          {practiceAreas.map(area => (
                            <SelectItem key={area} value={area}>{area}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="lawyer-experience">Years of Experience (optional)</Label>
                      <Input
                        id="lawyer-experience"
                        type="number"
                        placeholder="e.g., 5"
                        value={form.experience}
                        onChange={(e) => setForm({...form, experience: e.target.value})}
                        className="mt-1"
                        data-testid="lawyer-experience-input"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-12"
                      disabled={isSubmitting}
                      data-testid="lawyer-submit-btn"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                      ) : (
                        <>Register Interest <ArrowRight className="w-4 h-4 ml-2" /></>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8" data-testid="lawyer-success-message">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Thank you!</h3>
                    <p className="text-slate-600">We'll contact you soon about onboarding.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Benefits + Google Form Card */}
            <Card className="border-0 shadow-card bg-gradient-to-br from-slate-50 to-white border-2 border-amber-200">
              <CardHeader>
                <CardTitle>Early Access Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {[
                    'Get verified early',
                    'Lower commission rates (15%)',
                    'Featured profile placement',
                    'Priority support',
                    'Input on platform features'
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t">
                  <p className="text-sm text-slate-600 mb-3">
                    Prefer the detailed onboarding form?
                  </p>
                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full border-amber-300 text-amber-700 hover:bg-amber-50">
                      Open Lawyer Google Form
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Note */}
          <p className="text-center text-sm text-slate-500 mt-8">
            This is for early access registration. We respect your privacy and will never share your information.
          </p>
        </div>
      </section>
    </div>
  );
}
