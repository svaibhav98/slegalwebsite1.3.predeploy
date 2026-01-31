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
8. Replace all stock images with Indian-relatable visuals
9. Remove duplicate Contact Us from footer
10. Improve visibility of "For Lawyers" page
11. Update year to 2026 everywhere
12. Add social media links (LinkedIn, WhatsApp) in footer

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

### Session 1: January 31, 2026 (Initial Updates)

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
- Page includes title, phone, email, and contact form
- Submit via mailto link

#### 6. Light Animations ✅
- Hero elements fade in
- Step numbers animate on scroll
- Cards lift on hover with shadow
- Trust section items stagger animate

---

### Session 2: January 31, 2026 (Content + Polish)

#### 1. Indian-Relatable Images ✅
- Updated hero image to Indian professional woman
- Updated lawyer photos in FindLawyer.jsx with Indian professionals
- Updated ForLawyers.jsx image to Indian professionals in meeting
- Updated About.jsx image to Indian consultation scene

#### 2. Footer Cleanup ✅
- Removed duplicate "Contact Us" from Quick Links
- Now only ONE Contact Us link exists (in Company section)

#### 3. For Lawyers Visibility ✅
- "For Lawyers" button already present in top navigation header
- Confirmed visibility and functionality

#### 4. Year Update to 2026 ✅
- Footer copyright: © 2026 SunoLegal
- Privacy.jsx: Last updated January 2026

#### 5. Social Media Links ✅
- Added "Follow Us" section in footer
- LinkedIn icon with placeholder link (opens in new tab)
- WhatsApp icon with placeholder link (opens in new tab)
- Hover animations with scale and color transitions

---

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Hosting**: Kubernetes container / Vercel

---

## Prioritized Backlog

### P0 (Critical)
- ✅ All homepage + footer + contact updates complete
- ✅ Indian images updated
- ✅ Year updated to 2026
- ✅ Social media links added

### P1 (High Priority)
- Update actual LinkedIn and WhatsApp links when provided
- Integrate real email service (SendGrid/Resend) for contact form
- Add database storage for contact submissions

### P2 (Medium Priority)
- Add more animations to other pages
- Performance optimization
- SEO improvements

### P3 (Low Priority)
- Add testimonials section
- Blog/content section

---

## Files Modified

### Session 1:
- `/app/frontend/src/pages/Home.jsx` - Hero, How It Works, Features
- `/app/frontend/src/pages/Contact.jsx` - New contact page
- `/app/frontend/src/components/Footer.jsx` - Links, styling
- `/app/frontend/src/App.js` - Added Contact route

### Session 2:
- `/app/frontend/src/pages/Home.jsx` - Updated hero image
- `/app/frontend/src/pages/FindLawyer.jsx` - Updated lawyer photos
- `/app/frontend/src/pages/ForLawyers.jsx` - Updated image
- `/app/frontend/src/pages/About.jsx` - Updated image
- `/app/frontend/src/pages/Privacy.jsx` - Updated year to 2026
- `/app/frontend/src/components/Footer.jsx` - Removed duplicate Contact, added social links

---

## Testing Status
- All frontend tests passed (100%)
- Mobile responsive verified
- No console errors

---

## Next Tasks
1. Provide actual LinkedIn and WhatsApp URLs for social links
2. Consider adding real email integration for contact form
3. Add reCAPTCHA to prevent spam
