# InclusiveLearn - Accessible Education Platform

A full-stack MERN application providing inclusive, accessible education for learners of all abilities with special focus on special needs education.

## 🌟 Features

### Accessibility
- **WCAG 2.1 AA Compliant** - Screen reader support, keyboard navigation, high contrast modes
- **Multi-language Support** - UI translations and localized content
- **Audio & Captions** - Professional captions and text-to-speech for all content
- **Offline Learning** - Download courses for offline access

### Core Functionality
- **Course Management** - 27+ courses across Technology, Programming, Security, and Special Needs
- **Progress Tracking** - Track completion and learning progress
- **Certificates** - Auto-generated certificates upon 100% course completion
- **Payment Integration** - Stripe and M-Pesa payment support
- **Google OAuth** - Quick sign-in with Google
- **Newsletter Subscription** - Stay updated with latest courses

### User Features
- User profiles with customizable settings
- Course enrollment and content access
- Downloadable course resources (PDFs, videos)
- Community support
- AI-powered chatbot assistance

## 🛠️ Tech Stack

### Frontend
- **React** + **TypeScript** + **Vite**
- **Tailwind CSS** - Styling with dark mode support
- **shadcn/ui** - UI component library
- **React Router** - Navigation
- **Axios** - API requests

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Stripe** - Payment processing
- **Socket.io** - Real-time features

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd unlock-learn
```

2. **Install dependencies**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Environment Variables**

Create `.env` in `server/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/unlock-learn
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:8080

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# M-Pesa (optional)
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
```

Create `.env` in `client/` directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. **Seed Database**
```bash
cd server
npm run seed
```

5. **Run Application**
```bash
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm run dev
```

Application runs at:
- Frontend: http://localhost:8080
- Backend: http://localhost:5000

## 🗂️ Project Structure

```
unlock-learn/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilities
│   │   └── assets/        # Images, fonts
│   └── package.json
│
├── server/                # Express backend
│   ├── src/
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth, validation
│   │   ├── config/        # Configuration
│   │   └── server.js      # Entry point
│   └── package.json
│
└── README.md
```

## 🔑 Key Features Implementation

### Authentication
- Manual signup/login with JWT
- Google OAuth integration
- Protected routes with middleware

### Course System
- 6 free courses, 21 paid courses
- 13 lessons per course with video/PDF content
- Progress tracking per user
- Certificate generation at 100% completion

### Payment Integration
- Stripe checkout for card payments
- M-Pesa integration for mobile money
- Automatic enrollment after payment

### Accessibility Features
- Keyboard navigation support
- Screen reader compatible
- High contrast mode
- Text-to-speech support
- Multi-language UI

## 🎨 Design System

- **Colors**: HSL-based color system with dark mode
- **Typography**: Inter font family
- **Components**: Neon cyberpunk button animations
- **Layout**: Responsive grid system (mobile-first)

## 📱 Responsive Design

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns
- Course cards: 350px min-width

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder
```

### Backend (Render/Railway)
```bash
cd server
# Set environment variables
# Deploy with Node.js
```

### Database (MongoDB Atlas)
- Create cluster
- Update MONGODB_URI in .env

## 📄 API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `GET /api/courses/:id/content` - Get course content
- `POST /api/courses/:id/content/:contentId/complete` - Mark complete

### Payments
- `POST /api/stripe-checkout` - Create Stripe session
- `POST /api/mpesa-payment` - Initiate M-Pesa payment

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

## 🧪 Testing

```bash
# Run tests (if configured)
npm test
```

## 👥 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Course content designed for inclusive education
- Accessibility guidelines from WCAG 2.1
- UI components from shadcn/ui
- Icons from Lucide React

## 📧 Contact

For questions or support, please contact the development team.

---

deployment links 
frontend: https://mern-final-project-dennismaingi-6-9fes.onrender.com/
backend: https://mern-final-project-dennismaingi-6.onrender.com
