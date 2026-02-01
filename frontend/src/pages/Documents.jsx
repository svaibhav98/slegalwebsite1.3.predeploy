import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  FileText, 
  Download, 
  ArrowRight,
  Home,
  Briefcase,
  Shield,
  FileCheck,
  Clock,
  AlertTriangle
} from 'lucide-react';

const documentTemplates = [
  {
    id: 'rent_agreement',
    title: 'Rent Agreement',
    description: 'Standard 11-month rental agreement for residential properties',
    icon: Home,
    color: 'bg-blue-100 text-blue-700',
    popular: true,
    fields: ['landlord_name', 'tenant_name', 'property_address', 'monthly_rent', 'security_deposit']
  },
  {
    id: 'nda',
    title: 'Non-Disclosure Agreement',
    description: 'Protect confidential business information with a standard NDA',
    icon: Shield,
    color: 'bg-purple-100 text-purple-700',
    popular: true,
    fields: ['party_1', 'party_2', 'purpose', 'duration']
  },
  {
    id: 'legal_notice',
    title: 'Legal Notice',
    description: 'Formal legal notice template for various civil matters',
    icon: FileText,
    color: 'bg-amber-100 text-amber-700',
    popular: false,
    fields: ['sender_name', 'recipient_name', 'subject', 'facts', 'demand']
  },
  {
    id: 'affidavit',
    title: 'General Affidavit',
    description: 'Sworn statement for official purposes',
    icon: FileCheck,
    color: 'bg-green-100 text-green-700',
    popular: false,
    fields: ['deponent_name', 'age', 'address', 'statements']
  },
  {
    id: 'consumer_complaint',
    title: 'Consumer Complaint',
    description: 'Complaint under Consumer Protection Act, 2019',
    icon: Briefcase,
    color: 'bg-red-100 text-red-700',
    popular: true,
    fields: ['complainant_name', 'opposite_party', 'transaction_details', 'grievance']
  }
];

export default function Documents() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [, setFormData] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    // In demo mode, just show alert
    alert('Document generation is available in the full app. Join the waitlist to get early access!');
  };

  return (
    <div className="min-h-screen bg-light pt-20">
      {/* Header */}
      <section className="bg-dark grain-overlay relative py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-800 to-emerald-900" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600/20 text-amber-400 text-sm font-medium mb-4">
              <FileText className="w-4 h-4" />
              Document Generator
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-4">
              Legal Documents Made Easy
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Generate professional legal documents in minutes. 
              Fill a simple form, preview, and download your PDF.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Document Templates */}
      <section data-testid="document-templates" className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            </TabsList>

            <TabsContent value="templates">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      data-testid={`template-${template.id}`}
                      className={`h-full cursor-pointer transition-all ${
                        selectedTemplate?.id === template.id 
                          ? 'ring-2 ring-amber-500 shadow-glow' 
                          : 'hover:shadow-float'
                      }`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className={`w-12 h-12 rounded-xl ${template.color} flex items-center justify-center`}>
                            <template.icon className="w-6 h-6" />
                          </div>
                          {template.popular && (
                            <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">
                              Popular
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Clock className="w-4 h-4" />
                          <span>5 min to complete</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Selected Template Form */}
              {selectedTemplate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${selectedTemplate.color} flex items-center justify-center`}>
                          <selectedTemplate.icon className="w-5 h-5" />
                        </div>
                        {selectedTemplate.title}
                      </CardTitle>
                      <CardDescription>
                        Fill in the details below to generate your document
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {selectedTemplate.id === 'rent_agreement' && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="landlord_name">Landlord Name</Label>
                              <Input 
                                id="landlord_name"
                                placeholder="Enter landlord's full name"
                                onChange={(e) => handleInputChange('landlord_name', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="tenant_name">Tenant Name</Label>
                              <Input 
                                id="tenant_name"
                                placeholder="Enter tenant's full name"
                                onChange={(e) => handleInputChange('tenant_name', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="property_address">Property Address</Label>
                              <Input 
                                id="property_address"
                                placeholder="Enter complete property address"
                                onChange={(e) => handleInputChange('property_address', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="monthly_rent">Monthly Rent (₹)</Label>
                              <Input 
                                id="monthly_rent"
                                type="number"
                                placeholder="15000"
                                onChange={(e) => handleInputChange('monthly_rent', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="security_deposit">Security Deposit (₹)</Label>
                              <Input 
                                id="security_deposit"
                                type="number"
                                placeholder="30000"
                                onChange={(e) => handleInputChange('security_deposit', e.target.value)}
                              />
                            </div>
                          </>
                        )}

                        {selectedTemplate.id === 'nda' && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="party_1">Disclosing Party</Label>
                              <Input 
                                id="party_1"
                                placeholder="Company or individual name"
                                onChange={(e) => handleInputChange('party_1', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="party_2">Receiving Party</Label>
                              <Input 
                                id="party_2"
                                placeholder="Company or individual name"
                                onChange={(e) => handleInputChange('party_2', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="purpose">Purpose of Disclosure</Label>
                              <Input 
                                id="purpose"
                                placeholder="e.g., Business partnership discussion"
                                onChange={(e) => handleInputChange('purpose', e.target.value)}
                              />
                            </div>
                          </>
                        )}

                        {(selectedTemplate.id !== 'rent_agreement' && selectedTemplate.id !== 'nda') && (
                          <div className="md:col-span-2 p-8 bg-slate-50 rounded-xl text-center">
                            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                            <p className="text-slate-600">
                              This template form is available in the full app.
                            </p>
                            <Link to="/waitlist" className="text-amber-600 font-medium hover:underline">
                              Join waitlist for early access
                            </Link>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <Button 
                          onClick={handleGenerate}
                          data-testid="generate-document-btn"
                          className="flex-1"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Generate PDF
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setSelectedTemplate(null)}
                        >
                          Choose Different Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="how-it-works">
              <div className="max-w-3xl mx-auto">
                <div className="space-y-8">
                  {[
                    { step: 1, title: 'Choose Template', description: 'Select from our library of professionally drafted legal document templates.' },
                    { step: 2, title: 'Fill Details', description: 'Enter the required information in our simple, guided form.' },
                    { step: 3, title: 'Preview Document', description: 'Review your document before finalizing. Make changes if needed.' },
                    { step: 4, title: 'Download PDF', description: 'Get your professionally formatted document ready for signing.' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-6"
                    >
                      <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-slate-600">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Disclaimer */}
          <div className="mt-12 p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-900 font-medium">Important Note</p>
              <p className="text-sm text-amber-700 mt-1">
                These templates are for general use. For complex legal matters or high-value transactions, 
                we recommend having a lawyer review your documents.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">Want full access to all templates?</p>
            <Link to="/waitlist">
              <Button data-testid="waitlist-documents-btn">
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
