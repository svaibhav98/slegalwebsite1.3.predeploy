# SunoLegal (NyayAI) - Product Requirements Document

## Original Problem Statement
Build the official website for SunoLegal (NyayAI) — an AI-powered legal assistance platform for India.

## Updates Applied (Jan 30, 2026 - Phase 3)

### Latest Changes (Phase 3 - CTA Routing Fix)
- ✅ **Created `/lawyers-join` page**: Dedicated internal form for lawyers with Google Form fallback
- ✅ **All CTAs Route to Internal Pages**: No CTA directly opens Google Forms anymore
  - "Join Waitlist" → `/waitlist`
  - "For Lawyers" / "I'm a Lawyer" → `/lawyers-join`
- ✅ **Google Forms as Secondary Option**: "Prefer detailed survey?" button available inside internal pages
- ✅ **Navbar CTAs**: Updated to use `Link` to internal routes
- ✅ **Footer CTAs**: Updated to use `Link` to internal routes
- ✅ **Hero Section CTAs**: Updated to navigate internally
- ✅ **All Page CTAs**: Pricing, FAQ, About, ForLawyers all updated

### Phase 2 Changes
- ✅ User's logo applied globally (navbar, footer, popup, about page)
- ✅ Location set to "Mumbai, India" in footer and About page
- ✅ Waitlist popup modal with 2-second delay, 7-day dismissal
- ✅ Multiple waitlist access points (navbar, footer, /waitlist, hero)
- ✅ New pages: /pricing, /laws-and-schemes, /faq
- ✅ Hero gradient lightened for premium appearance

## API Endpoints

### Waitlist
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/waitlist | POST | Submit user to waitlist |
| /api/waitlist/count | GET | Get total waitlist count |
| /api/lawyer-interest | POST | Submit lawyer interest |
| /api/lawyer-interest/count | GET | Get lawyer interest count |

### Schema
```json
// User Waitlist
{
  "name": "string",
  "email": "string",
  "city": "string",
  "user_type": "citizen|student|working|business"
}

// Lawyer Interest
{
  "name": "string",
  "email": "string",
  "city": "string",
  "practice_area": "string",
  "experience": "string"
}
```

## Google Form URLs (Secondary/Fallback)
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
| /pricing | Pricing Plans | ✅ Working |
| /laws-and-schemes | Laws & Schemes | ✅ Working |
| /faq | FAQ | ✅ Working |
| /privacy | Privacy & Disclaimer | ✅ Working |

## Technical Stack
- Frontend: React 18 + Tailwind CSS + shadcn/ui + Framer Motion
- Backend: FastAPI with mock Firestore (in-memory)
- Forms: Internal forms with Google Forms as fallback
- Email: Resend integration (MOCKED - needs real API key)

## MOCKED Components
- **Database**: Mock in-memory Firestore (not real Firebase)
- **Email**: Resend email disabled (RESEND_API_KEY not configured)
- **Payments**: Mock Razorpay client
- **NyayAI Chat**: UI mockup only (needs LLM integration)

## Upcoming Tasks (P1)
1. **Email Notifications**: Configure real Resend API key for waitlist confirmations
2. **Document Generation**: Implement PDF generation flow
3. **LLM Integration**: Connect NyayAI chat to real LLM

## Future Tasks (P2)
- Lawyer marketplace with profiles & booking
- Case tracking feature
- Analytics integration (Google Analytics)
- Real Firebase/Firestore database

## Test Reports
- `/app/test_reports/iteration_3.json` - Latest (100% pass rate)

---
Last Updated: January 30, 2026
