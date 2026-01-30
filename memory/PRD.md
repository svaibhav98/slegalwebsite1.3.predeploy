# SunoLegal (NyayAI) - Product Requirements Document

## Original Problem Statement
Build the official website for SunoLegal (NyayAI) — an AI-powered legal assistance platform for India. The website communicates:
- AI legal guidance via NyayAI
- Legal document generation
- Verified lawyer consultations
- Case tracking
- India-specific laws & government schemes

Target users: Indian citizens, freelancers, MSMEs, tenants/property buyers, lawyers

## User Personas

### 1. Everyday Citizen
- Needs simple legal guidance in plain language
- May have tenant issues, consumer complaints, or RTI queries
- Price-sensitive, prefers affordable options

### 2. Freelancer/MSME Owner
- Requires contract templates (NDA, service agreements)
- Needs quick document generation
- Values time-efficiency

### 3. Tenant/Property Buyer
- Looking for rent agreement templates
- Wants to understand tenant rights
- May need lawyer consultation for disputes

### 4. Lawyer
- Wants to expand client base via platform
- Needs verification process for credibility
- Interested in flexible consultation scheduling

## Core Requirements (Static)

### Functional Requirements
1. **Multi-page informational website** with professional UI
2. **NyayAI Chat Demo** - Interactive mockup with sample responses
3. **Document Templates Showcase** - Rent Agreement, NDA, Legal Notice, etc.
4. **Lawyer Marketplace Preview** - Searchable lawyer directory with filters
5. **Waitlist System** - Email collection with database storage
6. **Privacy & Disclaimer** - Legal compliance content

### Non-Functional Requirements
- Mobile-first responsive design
- Mixed theme (dark hero + light content)
- Amber/gold accent colors
- Fast page loads
- Accessibility compliance

## What's Been Implemented (Jan 30, 2026)

### Frontend (React + Tailwind + shadcn/ui)
- ✅ Home page with hero, features, trust section, CTA
- ✅ NyayAI page with interactive chat demo (demo responses)
- ✅ Documents page with template showcase
- ✅ Find Lawyer page with searchable directory + filters
- ✅ For Lawyers page with benefits and application info
- ✅ Case Tracker page with feature explanation
- ✅ About page with mission and values
- ✅ Waitlist page with form submission
- ✅ Privacy page with disclaimer and policies
- ✅ Responsive navigation and footer

### Backend (FastAPI + Mock Firestore)
- ✅ Health check endpoint
- ✅ Waitlist API with database storage
- ✅ Lawyers API with filtering
- ✅ Laws/Schemes API
- ✅ Document generation API (PDF)
- ✅ Chat API (with Emergent LLM)
- ✅ User profile API
- ✅ Cases API
- ✅ Booking API

### Design Implementation
- ✅ "Golden Justice" color palette
- ✅ Merriweather + Manrope typography
- ✅ Bento grid layouts
- ✅ Framer Motion animations
- ✅ Dark hero sections + light content areas
- ✅ Amber/gold CTAs with glow effect

## Prioritized Backlog

### P0 (Must Have - Next Phase)
- [ ] Real LLM integration for NyayAI chat
- [ ] User authentication (JWT or OAuth)
- [ ] Actual payment integration (Razorpay)
- [ ] Email notification system (Resend API key needed)

### P1 (Should Have)
- [ ] Mobile app (React Native - existing codebase at frontend_mobile_backup/)
- [ ] Real-time chat with lawyers
- [ ] Case management dashboard
- [ ] Document storage and management

### P2 (Nice to Have)
- [ ] Multi-language support (Hindi, regional languages)
- [ ] Voice input for NyayAI
- [ ] Video consultation integration
- [ ] Lawyer rating and review system

## Technical Architecture

### Frontend
- Framework: React 18
- Styling: Tailwind CSS + shadcn/ui
- Animation: Framer Motion
- Routing: React Router v6

### Backend
- Framework: FastAPI
- Database: MongoDB (mock Firestore for now)
- PDF: ReportLab
- LLM: Emergent Integrations
- Email: Resend (pending API key)

### Deployment
- Platform: Emergent Labs
- Frontend: Port 3000
- Backend: Port 8001
- Database: MongoDB local

## Next Action Items

1. **Add Resend API Key** - Enable email notifications for waitlist
2. **Configure real Firebase** - Replace mock Firestore with production database
3. **Enable Razorpay** - Activate payment processing for lawyer bookings
4. **Mobile App Integration** - Connect existing React Native app to backend
5. **Analytics** - Add tracking for user engagement and conversion

---
Last Updated: January 30, 2026
