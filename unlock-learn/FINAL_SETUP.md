# 🚀 Unlock Learn - Final Setup Guide

## ✅ What's Been Completed:

### 1. Authentication
- ✅ Google OAuth integration
- ✅ Email/Password login & registration
- ✅ Protected routes
- ✅ User session management

### 2. Courses
- ✅ 6 Technology courses with images
- ✅ Course listing page
- ✅ Course detail page
- ✅ Course enrollment flow

### 3. Payment Integration
- ✅ Stripe payment (card payments)
- ✅ M-Pesa payment (mobile money)
- ✅ Checkout page
- ✅ Success/Cancel pages

### 4. UI/UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ AI chatbot (responsive)
- ✅ Modern UI with Tailwind CSS
- ✅ Course images from Unsplash

## 🎯 Quick Start:

### Option 1: Automatic (Recommended)
Double-click `START_APP.bat` - This will:
1. Seed the database with courses
2. Start backend server
3. Start frontend server

### Option 2: Manual
```bash
# Terminal 1 - Seed Database
cd server
node src/seed.js

# Terminal 2 - Backend
cd server
node src/server.js

# Terminal 3 - Frontend
cd client
npm run dev
```

## 🌐 Access Your App:
- **Frontend**: http://localhost:8080
- **Backend**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 📝 Test Accounts:

### Google Sign-In:
Use your Google account (already configured)

### Test Stripe Payment:
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

## 🎓 Available Courses:
1. Web Development Fundamentals - $49.99
2. React & Modern JavaScript - $79.99
3. Python Programming - $59.99
4. Data Science with Python - $99.99
5. Mobile App Development - $89.99
6. Cloud Computing with AWS - $109.99

## 🔧 Features to Test:

### 1. Authentication Flow
- Sign up with email
- Sign in with Google
- View dashboard after login

### 2. Browse Courses
- Go to /courses
- View course cards with images
- Click on a course to see details

### 3. Enroll in Course
- Click "Enroll Now"
- Choose payment method (Stripe or M-Pesa)
- Complete payment

### 4. AI Chatbot
- Click chatbot icon (bottom right)
- Ask questions about courses
- Responsive on mobile

## 📱 Responsive Design:
- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)

## 🎨 Course Images:
All courses have professional images from Unsplash:
- Web Development: Laptop with code
- React: React logo
- Python: Code editor
- Data Science: Data visualization
- Mobile: Smartphone
- Cloud: Cloud infrastructure

## 🐛 Troubleshooting:

### Backend won't start:
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F
```

### Database connection error:
Check `server/.env` has correct `MONGODB_URI`

### Google auth not working:
1. Check Google Cloud Console settings
2. Verify authorized origins include `http://localhost:8080`
3. Add test users in OAuth consent screen

## 🎉 You're All Set!

Your MERN stack application is fully functional with:
- User authentication (Google + Email)
- Course catalog with images
- Payment integration (Stripe + M-Pesa)
- Responsive AI chatbot
- Modern, accessible UI

Enjoy exploring your app! 🚀
