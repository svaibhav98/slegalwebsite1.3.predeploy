import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { 
  Users, 
  Search, 
  Star, 
  CheckCircle2,
  MapPin,
  Languages,
  Video,
  Phone,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

const sampleLawyers = [
  {
    id: 'lawyer_1',
    name: 'Adv. Neha Sharma',
    specialization: ['Family Law', 'Matrimonial'],
    languages: ['Hindi', 'English'],
    city: 'Delhi',
    experience: 10,
    price: 500,
    rating: 4.9,
    reviews: 210,
    verified: true,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop'
  },
  {
    id: 'lawyer_2',
    name: 'Adv. Vinayak Verma',
    specialization: ['Corporate Law', 'Contracts'],
    languages: ['Hindi', 'English'],
    city: 'Mumbai',
    experience: 12,
    price: 800,
    rating: 4.8,
    reviews: 180,
    verified: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  {
    id: 'lawyer_3',
    name: 'Adv. Priya Menon',
    specialization: ['Criminal Law'],
    languages: ['English', 'Hindi', 'Kannada'],
    city: 'Bangalore',
    experience: 8,
    price: 600,
    rating: 4.7,
    reviews: 150,
    verified: true,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop'
  },
  {
    id: 'lawyer_4',
    name: 'Adv. Anil Kapoor',
    specialization: ['Property Law', 'Civil Law'],
    languages: ['Hindi', 'English', 'Marathi'],
    city: 'Pune',
    experience: 15,
    price: 1000,
    rating: 4.6,
    reviews: 95,
    verified: true,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
  }
];

const specializations = [
  'Family Law',
  'Criminal Law',
  'Property Law',
  'Corporate Law',
  'Civil Law',
  'Consumer Law',
  'Labour Law',
  'Tax Law'
];

const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad'];

export default function FindLawyer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');

  const filteredLawyers = sampleLawyers.filter(lawyer => {
    const matchesSearch = !searchQuery || 
      lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpec = selectedSpecialization === 'all' || 
      lawyer.specialization.includes(selectedSpecialization);
    const matchesCity = selectedCity === 'all' || lawyer.city === selectedCity;
    return matchesSearch && matchesSpec && matchesCity;
  });

  const handleBook = (lawyerId) => {
    alert('Booking is available in the full app. Join the waitlist to get early access!');
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
              <Users className="w-4 h-4" />
              Lawyer Marketplace
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-4">
              Find Verified Lawyers
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Connect with Bar Council verified lawyers across India. 
              Book consultations via chat, call, or video.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
                data-testid="lawyer-search-input"
              />
            </div>
            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger className="w-full md:w-48" data-testid="specialization-filter">
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                {specializations.map(spec => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full md:w-48" data-testid="city-filter">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Lawyers List */}
      <section data-testid="lawyers-list" className="py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between mb-8">
            <p className="text-slate-600">
              {filteredLawyers.length} verified lawyer{filteredLawyers.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredLawyers.map((lawyer, index) => (
              <motion.div
                key={lawyer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  data-testid={`lawyer-card-${lawyer.id}`}
                  className="overflow-hidden hover:shadow-float transition-all"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="w-full sm:w-32 h-32 sm:h-auto flex-shrink-0">
                        <img 
                          src={lawyer.image}
                          alt={lawyer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="p-5 flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-slate-900">{lawyer.name}</h3>
                              {lawyer.verified && (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                              <MapPin className="w-3 h-3" />
                              {lawyer.city}
                              <span className="mx-1">•</span>
                              {lawyer.experience} years exp.
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="font-medium">{lawyer.rating}</span>
                            <span className="text-slate-400 text-sm">({lawyer.reviews})</span>
                          </div>
                        </div>

                        {/* Specializations */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {lawyer.specialization.map(spec => (
                            <span 
                              key={spec}
                              className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>

                        {/* Languages */}
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                          <Languages className="w-4 h-4" />
                          {lawyer.languages.join(', ')}
                        </div>

                        {/* Price & Actions */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-slate-900">₹{lawyer.price}</span>
                            <span className="text-sm text-slate-500"> / 30 min</span>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="w-8 h-8"
                              title="Chat"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="w-8 h-8"
                              title="Call"
                            >
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="w-8 h-8"
                              title="Video"
                            >
                              <Video className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleBook(lawyer.id)}
                              data-testid={`book-lawyer-${lawyer.id}`}
                            >
                              Book
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredLawyers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">No lawyers found matching your criteria.</p>
              <p className="text-slate-500 text-sm mt-1">Try adjusting your filters.</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">Want to browse our full lawyer network?</p>
            <Link to="/waitlist">
              <Button data-testid="waitlist-lawyers-btn">
                Join Waitlist for Full Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
