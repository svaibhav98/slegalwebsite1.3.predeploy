# SunoLegal MVP - Milestone Breakdown & Acceptance Criteria

## Project Overview
**App Name:** SunoLegal - AI Legal Assistant for India  
**Tagline:** Nyay (Justice) for All  
**Tech Stack:** React Native (Expo) + FastAPI + Firebase (Auth + Firestore) + OpenAI GPT-4

---

## Phase 1A: Core Setup & Firebase Authentication
**Duration:** 2-3 hours  
**Priority:** CRITICAL - Foundation for all features

### Deliverables:
1. **Backend Setup**
   - Install Firebase Admin SDK
   - Configure Firestore client
   - Setup environment variables
   - Create auth middleware for token verification
   - Define Firestore collections schema

2. **Frontend Setup**
   - Install Firebase SDK packages
   - Configure Firebase client
   - Create navigation structure (Tab + Stack navigation)
   - Setup AuthContext provider
   - Create OTP login screens

3. **Firestore Schema Design**
   ```
   Collections:
   - users (uid, name, phone, email, city, state, language, role, createdAt)
   - lawyers (uid, name, barCouncilId, specialization, languages[], city, experience, price, rating, reviews)
   - chats (userId, messages[], createdAt, savedAt)
   - documents (userId, type, data, pdfUrl, createdAt)
   - bookings (userId, lawyerId, type, slot, amount, status, razorpayOrderId, razorpayPaymentId)
   - cases (userId, title, description, hearingDate, status, documents[], notes[])
   - laws (title, category, state, description, eligibility, howToApply, requiredDocs)
   ```

### Acceptance Criteria:
- [ ] User can enter phone number and receive OTP
- [ ] OTP verification works and creates user in Firestore
- [ ] Auth token is stored and persists across app restarts
- [ ] Protected routes require authentication
- [ ] Backend can verify Firebase ID tokens
- [ ] Tab navigation works (Home, Laws, NyayAI, Cases, Documents)
- [ ] User profile data is stored in Firestore

### Testing Checklist:
- OTP flow (send + verify)
- Token persistence
- Protected API endpoints
- User creation in Firestore
- Navigation between tabs

---

## Phase 1B: NyayAI Chat Interface
**Duration:** 1-2 hours  
**Priority:** HIGH - Core feature

### Deliverables:
1. **Chat UI**
   - WhatsApp-like chat interface
   - Message bubbles (user vs AI)
   - Input field with send button
   - Voice input icon (non-functional for MVP)
   - Loading indicator while AI responds

2. **OpenAI Integration**
   - Install emergentintegrations library
   - Configure GPT-4 with legal system prompt
   - Stream responses for better UX
   - Handle API errors gracefully

3. **Legal Context & Disclaimers**
   - Persistent disclaimer banner at top
   - System prompt with Indian legal context
   - Suggested questions for first-time users
   - CTA: "Connect to a Lawyer" after each response

4. **Chat History**
   - Save messages to Firestore
   - Load chat history on screen open
   - "Save Chat" button to bookmark important conversations
   - Anonymous mode toggle (optional for MVP)

### Acceptance Criteria:
- [ ] User can type and send messages
- [ ] AI responds with legal information in simplified language
- [ ] Disclaimer is always visible
- [ ] Chat history persists and loads on return
- [ ] "Connect to Lawyer" CTA navigates to marketplace
- [ ] Loading states are clear
- [ ] Error messages are user-friendly

### Testing Checklist:
- Send various legal questions
- Verify disclaimer is always shown
- Test chat persistence
- Verify CTA navigation
- Test error scenarios (API failure, network issues)

---

## Phase 1C: Legal Document Generator
**Duration:** 1-2 hours  
**Priority:** HIGH - Key differentiation

### Deliverables:
1. **Document Templates (3)**
   - Rent Agreement (landlord name, tenant name, address, rent amount, duration, security deposit)
   - Legal Notice (sender details, recipient details, issue description, demand, timeline)
   - Affidavit (declarant name, address, statement, date)

2. **Form Wizard**
   - Step-by-step form for each template
   - Field validation
   - Preview screen before generation
   - Edit capability

3. **PDF Generation**
   - Generate PDF from template + user data
   - Bilingual option (English + Hindi side-by-side) - English only for MVP
   - Professional legal formatting
   - Save PDF to Firestore Storage

4. **Document Management**
   - List of generated documents
   - Download PDF
   - Share functionality
   - Delete option

### Acceptance Criteria:
- [ ] User can select document type
- [ ] Form validates all required fields
- [ ] Preview shows filled template
- [ ] PDF generates correctly with user data
- [ ] Document saves to user's library
- [ ] User can download and share PDF
- [ ] Documents list shows all generated docs

### Testing Checklist:
- Generate all 3 document types
- Verify PDF content accuracy
- Test download functionality
- Verify Firestore storage
- Test form validation

---

## Phase 1D: Lawyer Marketplace & Booking
**Duration:** 2-3 hours  
**Priority:** HIGH - Revenue feature

### Deliverables:
1. **Lawyer Listing**
   - Card-based layout with lawyer details
   - Filters: City, Language, Specialization, Price range
   - Search functionality
   - Sort by: Rating, Experience, Price
   - Mock data for 10-15 lawyers

2. **Lawyer Profile**
   - Full profile view
   - Bar Council ID verification badge
   - Specializations
   - Languages spoken
   - Experience details
   - Consultation price
   - Ratings and reviews (mock data)
   - "Book Consultation" CTA

3. **Booking Flow**
   - Consultation type selector (Chat / Call / Video)
   - Date and time slot picker
   - Duration selector (30 min / 60 min)
   - Price calculation
   - Confirmation screen

4. **Razorpay Integration (TEST Mode)**
   - Create Razorpay order on backend
   - Open Razorpay checkout on frontend
   - Handle payment success
   - Handle payment failure
   - Store booking in Firestore
   - Send confirmation

### Acceptance Criteria:
- [ ] Lawyer listing loads with filters
- [ ] Filters work correctly
- [ ] Search finds relevant lawyers
- [ ] Profile shows all lawyer details
- [ ] Booking flow is intuitive
- [ ] Razorpay TEST payment works
- [ ] Successful payment creates booking
- [ ] Failed payment shows error
- [ ] User can view their bookings

### Testing Checklist:
- Browse lawyers with various filters
- View lawyer profiles
- Complete booking flow
- Test Razorpay TEST payment (success + failure)
- Verify booking creation in Firestore
- Check booking confirmation

---

## Phase 1E: Laws & Schemes + Case Tracking
**Duration:** 1-2 hours  
**Priority:** MEDIUM - Informational features

### Deliverables:
1. **Laws & Schemes Browser**
   - Category-based browsing (Tenant, Consumer, Police, Property, Family, etc.)
   - State-wise filtering
   - Search functionality
   - Card-based layout with:
     - Law/Scheme title
     - Category tag
     - Brief description
     - "Learn more" link
   - Detail view with:
     - Full description
     - Eligibility criteria
     - How to apply
     - Required documents
   - Mock data for 15-20 laws/schemes

2. **Home Dashboard**
   - Welcome banner with user name and NyayAI intro
   - Quick Access cards:
     - NyayAI Assistant
     - Legal Consultation
     - Notice Drafting
     - Case Tracker
     - Laws & Schemes
   - Recently Activity section (recent chats, documents, cases)
   - Category shortcuts (Join as Lawyer, Saved Items, Contact Us)

3. **Case Tracking (Manual)**
   - Add new case form (title, description, court, case number)
   - Case list view
   - Case detail view with:
     - Basic details
     - Hearing date reminder
     - Document attachments
     - Notes section
     - Status updates
   - Push notification for hearing reminders (setup only, not functional)

### Acceptance Criteria:
- [ ] Home dashboard loads with personalized greeting
- [ ] Quick access cards navigate correctly
- [ ] Laws browser shows categorized content
- [ ] State filter works
- [ ] Law detail view shows complete information
- [ ] User can add new case
- [ ] Case list shows all user's cases
- [ ] Case details are editable
- [ ] Hearing date is displayed
- [ ] Notes can be added/edited

### Testing Checklist:
- Navigate through home dashboard
- Browse laws by category and state
- Search for specific laws
- Add a new case
- Edit case details
- Add notes to case
- Verify data persistence

---

## Phase 1F: Testing, Polish & Bug Fixes
**Duration:** 1 hour  
**Priority:** CRITICAL - Quality assurance

### Deliverables:
1. **Backend Testing**
   - Test all API endpoints with curl
   - Verify Firebase token authentication
   - Test Firestore CRUD operations
   - Test OpenAI integration
   - Test Razorpay order creation
   - Check error handling

2. **Frontend Testing**
   - Test navigation flow
   - Test all user interactions
   - Verify loading states
   - Test error scenarios
   - Check mobile responsiveness
   - Test on Android and iOS (via Expo Go)

3. **Bug Fixes & Polish**
   - Fix any bugs found during testing
   - Improve error messages
   - Add loading indicators where missing
   - Polish UI/UX
   - Ensure consistent styling
   - Optimize performance

4. **Documentation**
   - Update README with setup instructions
   - Document API endpoints
   - Document Firestore collections
   - Add .env.example files
   - Create basic user guide

### Acceptance Criteria:
- [ ] All API endpoints respond correctly
- [ ] Authentication works end-to-end
- [ ] All features work on both platforms
- [ ] No critical bugs
- [ ] Error messages are clear
- [ ] Loading states are present
- [ ] UI is polished and consistent
- [ ] App performs well

### Testing Checklist:
- Run backend testing agent
- Complete user flows end-to-end
- Test edge cases
- Verify error handling
- Check performance
- Test on real devices

---

## Technical Requirements Summary

### Backend Dependencies:
```
fastapi
uvicorn
firebase-admin
python-dotenv
razorpay
emergentintegrations
pydantic
```

### Frontend Dependencies:
```
expo
expo-router
firebase
@react-native-firebase/app
@react-native-firebase/auth
@react-native-firebase/firestore
react-native-paper (UI components)
react-native-gesture-handler
react-native-reanimated
@react-navigation/native
@react-navigation/bottom-tabs
@react-navigation/native-stack
react-native-pdf
axios
```

### Environment Variables:

**Backend (.env):**
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...
EMERGENT_LLM_KEY=sk-emergent-c3e36B154547133618
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
```

**Frontend (.env):**
```
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
EXPO_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
```

---

## Risk Mitigation

### Potential Blockers:
1. **Firebase Phone Auth:** May require additional setup for test numbers
   - Mitigation: Use Firebase test phone numbers for development
   
2. **Razorpay Integration:** Webhook setup for production
   - Mitigation: Start with TEST mode, mock webhooks for MVP
   
3. **PDF Generation:** Complex legal templates
   - Mitigation: Use simple templates, focus on functionality over aesthetics
   
4. **OpenAI Costs:** High usage during testing
   - Mitigation: Use Emergent LLM Key with rate limiting

### Success Metrics:
- All 5 phases completed and tested
- Zero critical bugs
- Authentication flow works smoothly
- NyayAI provides relevant responses
- Document generation produces valid PDFs
- Payment flow completes successfully
- App is usable on both Android and iOS

---

## Next Steps After MVP

**Phase 2 Features:**
1. Ratings & reviews for lawyers
2. Video consultation integration
3. Hindi language support
4. Voice input for NyayAI
5. Advanced document templates
6. AI citations for legal responses
7. Lawyer admin panel
8. Payment escrow system
9. Push notifications
10. Offline mode

**Production Checklist:**
- Switch to Firebase production project
- Enable Razorpay LIVE mode
- Setup proper webhooks
- Implement analytics
- Add crash reporting
- Setup CI/CD pipeline
- Security audit
- Performance optimization
- App Store submission preparation
