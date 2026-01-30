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
  Sparkles, 
  CheckCircle2,
  ArrowRight,
  Loader2
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const cities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Other'
];

export default function Waitlist() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    user_type: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.city || !formData.user_type) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        toast.success('Welcome to the SunoLegal waitlist!');
      } else {
        toast.error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Waitlist submission error:', error);
      toast.error('Unable to connect. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Sparkles className="w-4 h-4" />
              Early Access
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-4">
              Join the Waitlist
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Be among the first to experience SunoLegal. 
              Get early access to NyayAI and all our features.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section data-testid="waitlist-form-section" className="py-16">
        <div className="max-w-lg mx-auto px-6 md:px-12">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-0 shadow-float">
                <CardHeader>
                  <CardTitle>Get Early Access</CardTitle>
                  <CardDescription>
                    Fill in your details below. We'll notify you when SunoLegal launches.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        data-testid="waitlist-name-input"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        data-testid="waitlist-email-input"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Select 
                        value={formData.city} 
                        onValueChange={(value) => handleInputChange('city', value)}
                      >
                        <SelectTrigger data-testid="waitlist-city-select">
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="user_type">I am a... *</Label>
                      <Select 
                        value={formData.user_type} 
                        onValueChange={(value) => handleInputChange('user_type', value)}
                      >
                        <SelectTrigger data-testid="waitlist-usertype-select">
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="citizen">Citizen seeking legal help</SelectItem>
                          <SelectItem value="lawyer">Lawyer wanting to join platform</SelectItem>
                          <SelectItem value="business">Business owner / MSME</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                      data-testid="waitlist-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Join Waitlist
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="border-0 shadow-float text-center">
                <CardContent className="pt-12 pb-12">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-3 font-heading">
                    You're on the list!
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Thank you for joining the SunoLegal waitlist, {formData.name.split(' ')[0]}! 
                    We'll send you an email when we launch.
                  </p>
                  <div className="p-4 bg-amber-50 rounded-xl text-left">
                    <p className="text-sm text-amber-900 font-medium mb-2">What's next?</p>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• Check your email for a confirmation</li>
                      <li>• Follow us for updates</li>
                      <li>• Share SunoLegal with friends who need legal help</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Why Join */}
          {!isSubmitted && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">
                Early Access Benefits
              </h3>
              <div className="space-y-3">
                {[
                  'Priority access to NyayAI when it launches',
                  'Free document generations for the first month',
                  'Direct feedback channel with the team',
                  'Exclusive early-bird pricing for premium features'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
