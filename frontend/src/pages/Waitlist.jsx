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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import { 
  Users, 
  Scale, 
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { FORMS } from '../components/WaitlistPopup';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Other'
];

const practiceAreas = [
  'Family Law', 'Criminal Law', 'Corporate Law', 'Property Law', 
  'Civil Law', 'Consumer Law', 'Labour Law', 'Tax Law', 'Other'
];

export default function WaitlistPage() {
  const [userSubmitted, setUserSubmitted] = useState(false);
  const [lawyerSubmitted, setLawyerSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // User form state
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    city: '',
    user_type: 'citizen'
  });
  
  // Lawyer form state
  const [lawyerForm, setLawyerForm] = useState({
    name: '',
    email: '',
    city: '',
    practice_area: '',
    experience: ''
  });

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (!userForm.email) {
      toast.error('Please enter your email');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userForm,
          user_type: userForm.user_type || 'citizen'
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setUserSubmitted(true);
        toast.success('Welcome to the waitlist!');
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Unable to connect. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLawyerSubmit = async (e) => {
    e.preventDefault();
    if (!lawyerForm.email) {
      toast.error('Please enter your email');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/lawyer-interest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lawyerForm),
      });
      
      const data = await response.json();
      if (data.success) {
        setLawyerSubmitted(true);
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

      {/* Forms Section */}
      <section data-testid="waitlist-forms-section" className="py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="users" className="text-base py-3">
                <Users className="w-4 h-4 mr-2" />
                For Users
              </TabsTrigger>
              <TabsTrigger value="lawyers" className="text-base py-3">
                <Scale className="w-4 h-4 mr-2" />
                For Lawyers
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Quick Form Card */}
                <Card className="border-0 shadow-float">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-amber-600" />
                      Quick Sign Up
                    </CardTitle>
                    <CardDescription>
                      Join the waitlist in 30 seconds
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!userSubmitted ? (
                      <form onSubmit={handleUserSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="page-user-name">Full Name</Label>
                          <Input
                            id="page-user-name"
                            placeholder="Your name"
                            value={userForm.name}
                            onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="page-user-email">Email *</Label>
                          <Input
                            id="page-user-email"
                            type="email"
                            placeholder="you@example.com"
                            value={userForm.email}
                            onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="page-user-city">City/State (optional)</Label>
                          <Select 
                            value={userForm.city} 
                            onValueChange={(value) => setUserForm({...userForm, city: value})}
                          >
                            <SelectTrigger className="mt-1">
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
                          <Label htmlFor="page-user-type">I am a... (optional)</Label>
                          <Select 
                            value={userForm.user_type} 
                            onValueChange={(value) => setUserForm({...userForm, user_type: value})}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="citizen">Citizen</SelectItem>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="working">Working Professional</SelectItem>
                              <SelectItem value="business">Business Owner</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full h-12"
                          disabled={isSubmitting}
                          data-testid="waitlist-user-submit"
                        >
                          {isSubmitting ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                          ) : (
                            <>Join Waitlist <ArrowRight className="w-4 h-4 ml-2" /></>
                          )}
                        </Button>
                      </form>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">You're on the list!</h3>
                        <p className="text-slate-600">We'll notify you when we launch.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Benefits + Google Form Card */}
                <Card className="border-0 shadow-card bg-gradient-to-br from-amber-50 to-white">
                  <CardHeader>
                    <CardTitle>Early Access Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                    
                    <div className="pt-4 border-t">
                      <p className="text-sm text-slate-600 mb-3">
                        Prefer the detailed 5-minute survey?
                      </p>
                      <a
                        href={FORMS.users}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="w-full">
                          Open Detailed Google Form
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Lawyers Tab */}
            <TabsContent value="lawyers">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Quick Form Card */}
                <Card className="border-0 shadow-float">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-amber-600" />
                      Lawyer Registration
                    </CardTitle>
                    <CardDescription>
                      Express your interest in 30 seconds
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!lawyerSubmitted ? (
                      <form onSubmit={handleLawyerSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="page-lawyer-name">Full Name</Label>
                          <Input
                            id="page-lawyer-name"
                            placeholder="Your name"
                            value={lawyerForm.name}
                            onChange={(e) => setLawyerForm({...lawyerForm, name: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="page-lawyer-email">Email *</Label>
                          <Input
                            id="page-lawyer-email"
                            type="email"
                            placeholder="you@example.com"
                            value={lawyerForm.email}
                            onChange={(e) => setLawyerForm({...lawyerForm, email: e.target.value})}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="page-lawyer-city">City/State</Label>
                          <Select 
                            value={lawyerForm.city} 
                            onValueChange={(value) => setLawyerForm({...lawyerForm, city: value})}
                          >
                            <SelectTrigger className="mt-1">
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
                          <Label htmlFor="page-lawyer-practice">Practice Area</Label>
                          <Select 
                            value={lawyerForm.practice_area} 
                            onValueChange={(value) => setLawyerForm({...lawyerForm, practice_area: value})}
                          >
                            <SelectTrigger className="mt-1">
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
                          <Label htmlFor="page-lawyer-experience">Years of Experience (optional)</Label>
                          <Input
                            id="page-lawyer-experience"
                            type="number"
                            placeholder="e.g., 5"
                            value={lawyerForm.experience}
                            onChange={(e) => setLawyerForm({...lawyerForm, experience: e.target.value})}
                            className="mt-1"
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full h-12"
                          disabled={isSubmitting}
                          data-testid="waitlist-lawyer-submit"
                        >
                          {isSubmitting ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                          ) : (
                            <>Register Interest <ArrowRight className="w-4 h-4 ml-2" /></>
                          )}
                        </Button>
                      </form>
                    ) : (
                      <div className="text-center py-8">
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
                    <CardTitle>Lawyer Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                    
                    <div className="pt-4 border-t">
                      <p className="text-sm text-slate-600 mb-3">
                        Prefer the detailed lawyer onboarding form?
                      </p>
                      <a
                        href={FORMS.lawyers}
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
            </TabsContent>
          </Tabs>

          {/* Note */}
          <p className="text-center text-sm text-slate-500 mt-8">
            This is for research/early access. No spam. We respect your privacy.
          </p>
        </div>
      </section>
    </div>
  );
}
