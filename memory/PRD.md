# SunoLegal (NyayAI) - Product Requirements Document

## Original Problem Statement
Build the official website for SunoLegal (NyayAI) — an AI-powered legal assistance platform for India.

## Updates Applied (Jan 30, 2026 - Phase 2)

### 1. Logo Replacement
- ✅ User's logo applied globally (navbar, footer, popup, about page)
- Logo URL: https://customer-assets.emergentagent.com/job_lawbuddy-9/artifacts/ib924i4i_Logo.png

### 2. Location
- ✅ Set to "Mumbai, India" in footer and About page

### 3. Waitlist Popup Modal
- ✅ Shows on first homepage visit with 2-second delay
- ✅ Contains "Join Waitlist (Users)" and "I'm a Lawyer" buttons
- ✅ "Not now" button dismisses popup
- ✅ 7-day dismissal rule via localStorage
- ✅ Mobile responsive

### 4. Multiple Waitlist Access Points
- ✅ **Navbar**: "Join Waitlist" + "For Lawyers" buttons (always visible)
- ✅ **Footer**: "Get Early Access" section with both buttons
- ✅ **Dedicated /waitlist page**: Two cards for Users and Lawyers
- ✅ **Hero section**: Both buttons + "I'm a Lawyer" text link
- ✅ **All CTA sections**: Both buttons available

### 5. New Pages Added
- ✅ **/pricing**: Free + Professional (Coming Soon ₹299/mo) plans
- ✅ **/laws-and-schemes**: Law category cards (Consumer, Property, Employment, Family, MSME, RTI)
- ✅ **/faq**: 8 accordion FAQ items with CTAs
- ✅ **/about** (updated): Founder story section added

### 6. Hero/Banner Gradient Fix
- ✅ Lightened from pure black to slate-800 → slate-900 gradient
- ✅ Added subtle amber glow accents
- ✅ More premium, modern appearance

### 7. Existing Features Preserved
- ✅ Find Lawyer page working
- ✅ NyayAI chat demo working
- ✅ Documents page working
- ✅ For Lawyers info page working
- ✅ Case Tracker page working
- ✅ Privacy page working

## Google Form URLs
- **Users Waitlist**: https://docs.google.com/forms/d/e/1FAIpQLScNPCWdYMLW1vXmZhsL3NTxu8VJxEtAQq40iWjn1wNGB5K7cQ/viewform
- **Lawyers Registration**: https://docs.google.com/forms/d/e/1FAIpQLSet8323DrdZSHRn5pVONUmz1yuiPBbxjiZwJ_un4XQWGkJm2A/viewform

## Pages & Routes
| Route | Page | Status |
|-------|------|--------|
| / | Home | ✅ Working |
| /nyayai | NyayAI Chat Demo | ✅ Working |
| /documents | Document Templates | ✅ Working |
| /find-lawyer | Lawyer Directory | ✅ Working |
| /for-lawyers | Lawyer Info | ✅ Working |
| /case-tracker | Case Tracker Info | ✅ Working |
| /about | About + Founder Story | ✅ Working |
| /waitlist | Early Access Page | ✅ Working |
| /pricing | Pricing Plans | ✅ NEW |
| /laws-and-schemes | Laws & Schemes | ✅ NEW |
| /faq | FAQ | ✅ NEW |
| /privacy | Privacy & Disclaimer | ✅ Working |

## Technical Stack
- Frontend: React 18 + Tailwind CSS + shadcn/ui + Framer Motion
- Backend: FastAPI with mock Firestore
- Forms: Google Forms (external)

## Waitlist Access Points Summary
1. Popup modal (first visit, 7-day cookie)
2. Navbar buttons (always visible)
3. Footer "Get Early Access" section
4. /waitlist page (dedicated)
5. Hero section buttons
6. CTA sections on every page
7. "I'm a Lawyer" secondary links throughout

---
Last Updated: January 30, 2026
