# SunoLegal Website - Product Requirements Document (PRD)

## Project Overview
SunoLegal is an India-focused legal assistance platform powered by NyayAI. The website provides AI-powered legal guidance, document generation, lawyer discovery, and case tracking features.

---

## Original Problem Statement
Apply updates to the existing SunoLegal website including:
1. Fix Hero Banner - Verified Lawyer Badge + Image Clash
2. Change "How It Works" from 4 steps to 5 steps with dark green numbers
3. Make homepage feature cards fully clickable
4. Fix footer "Lawyers Join Early" button styling
5. Make Hero NyayAI Bubble + Try NyayAI CTA clickable
6. Add Contact Us footer link and create /contact page
7. Add light animations for UX polish

---

## User Personas
1. **Citizens** - Everyday Indians seeking legal information
2. **Tenants/Landlords** - Users dealing with rental disputes
3. **Business Owners/MSMEs** - Need contracts, NDAs, compliance help
4. **Property Buyers** - Sale deeds, title verification
5. **Lawyers** - Verified professionals joining the platform

---

## Core Requirements (Static)
- NyayAI chatbot for legal Q&A
- Document generator (Rent Agreement, Legal Notice, Affidavit, Consumer Complaint)
- Lawyer marketplace with verified professionals
- Case tracker for hearing dates
- Laws & Schemes database
- User waitlist and lawyer registration

---

## What's Been Implemented

### Session: January 31, 2026

#### 1. Hero Section Updates ✅
- Updated hero image to professional legal consultation theme
- Repositioned "Verified Lawyers" badge to bottom-right (no longer clashes)
- Made NyayAI badge clickable (routes to /nyayai)
- Added fade-in animations

#### 2. "How It Works" Section ✅
- Changed from 4 steps to 5 steps:
  - 01: Ask Your Question
  - 02: Get AI Guidance (NyayAI)
  - 03: Generate Documents
  - 04: Consult a Lawyer (If Needed)
  - 05: Track Your Cases — All in One Place
- Updated title: "How It Works — All in One Place"
- Added subtext: "Simple steps. Clear direction."
- Changed step numbers to dark green (#15803d)
- Added scroll animations and connecting line

#### 3. Feature Cards ✅
- Made entire card clickable (onClick handler)
- Added cursor pointer
- Added hover lift/shadow effect
- Navigation works to correct pages

#### 4. Footer Updates ✅
- Styled "Lawyers – Join Early" button with visible green border/background
- Added "Contact Us" link to Company section and Quick Links
- Updated contact email to singhvaibhav9815@gmail.com
- Updated phone to 469-592-2133

#### 5. Contact Page (/contact) ✅
- Created new Contact.jsx page
- Added route in App.js
- Page includes:
  - Header with title "Contact Us"
  - Subtitle "Have feedback or questions? We'd love to hear from you."
  - Phone: 469-592-2133
  - Email: singhvaibhav9815@gmail.com
  - Contact form (Full Name, Email, Message)
  - Submit via mailto link
  - Success message display

#### 6. Light Animations ✅
- Hero elements fade in
- Step numbers animate on scroll
- Cards lift on hover with shadow
- Trust section items stagger animate

---

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: FastAPI (Python)
- **Database**: Mock Firestore (production-ready structure)
- **Hosting**: Kubernetes container

---

## Prioritized Backlog

### P0 (Critical)
- ✅ All homepage + footer + contact updates complete

### P1 (High Priority)
- Integrate real email service (SendGrid/Resend) for contact form
- Add database storage for contact submissions
- Mobile optimization testing

### P2 (Medium Priority)
- Add more animations to other pages
- Performance optimization
- SEO improvements

### P3 (Low Priority)
- Add testimonials section
- Social media integration
- Blog/content section

---

## Files Modified
- `/app/frontend/src/pages/Home.jsx` - Hero, How It Works, Features
- `/app/frontend/src/pages/Contact.jsx` - New contact page
- `/app/frontend/src/components/Footer.jsx` - Links, styling
- `/app/frontend/src/App.js` - Added Contact route

---

## Testing Status
- All 17 frontend tests passed (100%)
- Mobile responsive verified
- No console errors

---

## Next Tasks
1. Consider adding real email integration for contact form
2. Add reCAPTCHA to prevent spam
3. Implement contact form database storage
