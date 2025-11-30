# Environment Variables for Render Deployment

## Backend Service Environment Variables

Copy and paste these into Render Dashboard → Backend Service → Environment:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/unlock-learn?retryWrites=true&w=majority
JWT_SECRET=inclusivelearn_super_secret_jwt_key_2025_change_this_in_production
CLIENT_URL=https://inclusivelearn-frontend.onrender.com
STRIPE_SECRET_KEY=sk_test_51QYourStripeSecretKeyHere
STRIPE_PUBLISHABLE_KEY=pk_test_51QYourStripePublishableKeyHere
GOOGLE_CLIENT_ID=540472175498-5l7sauk96cg3jcei2lv47rc96kigbua4.apps.googleusercontent.com
```

## Frontend Service Environment Variables

Copy and paste these into Render Dashboard → Frontend Service → Environment:

```
VITE_API_URL=https://inclusivelearn-backend.onrender.com/api
VITE_GOOGLE_CLIENT_ID=540472175498-5l7sauk96cg3jcei2lv47rc96kigbua4.apps.googleusercontent.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51QYourStripePublishableKeyHere
```

## ⚠️ IMPORTANT: Update These Values

### 1. MongoDB Atlas (Required)
- Create free cluster at https://www.mongodb.com/cloud/atlas
- Get connection string and replace `MONGODB_URI`
- Format: `mongodb+srv://username:password@cluster.mongodb.net/unlock-learn`

### 2. JWT Secret (Required)
- Generate random string: https://randomkeygen.com/
- Replace `JWT_SECRET` value
- Or use: `openssl rand -base64 32`

### 3. Stripe Keys (If using payments)
- Get from https://dashboard.stripe.com/test/apikeys
- Replace `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`
- Use test keys for testing

### 4. Google OAuth (Already configured)
- Client ID is already set: `540472175498-5l7sauk96cg3jcei2lv47rc96kigbua4.apps.googleusercontent.com`
- Add authorized origins in Google Console:
  - `https://inclusivelearn-frontend.onrender.com`
  - `https://inclusivelearn-backend.onrender.com`

## Step-by-Step Setup

### Backend Service:
1. Go to Render Dashboard
2. Click on `inclusivelearn-backend` service
3. Go to **Environment** tab
4. Click **Add Environment Variable**
5. Add each variable one by one (key and value)
6. Click **Save Changes**
7. Service will auto-redeploy

### Frontend Service:
1. Go to Render Dashboard
2. Click on `inclusivelearn-frontend` service
3. Go to **Environment** tab
4. Click **Add Environment Variable**
5. Add each variable one by one
6. Click **Save Changes**
7. Service will auto-redeploy

## Quick Copy Format (for Render UI)

### Backend - Add these one by one:

| Key | Value |
|-----|-------|
| NODE_ENV | production |
| PORT | 5000 |
| MONGODB_URI | mongodb+srv://username:password@cluster.mongodb.net/unlock-learn |
| JWT_SECRET | inclusivelearn_super_secret_jwt_key_2025_change_this |
| CLIENT_URL | https://inclusivelearn-frontend.onrender.com |
| STRIPE_SECRET_KEY | sk_test_51Q... |
| STRIPE_PUBLISHABLE_KEY | pk_test_51Q... |
| GOOGLE_CLIENT_ID | 540472175498-5l7sauk96cg3jcei2lv47rc96kigbua4.apps.googleusercontent.com |

### Frontend - Add these one by one:

| Key | Value |
|-----|-------|
| VITE_API_URL | https://inclusivelearn-backend.onrender.com/api |
| VITE_GOOGLE_CLIENT_ID | 540472175498-5l7sauk96cg3jcei2lv47rc96kigbua4.apps.googleusercontent.com |
| VITE_STRIPE_PUBLISHABLE_KEY | pk_test_51Q... |

## After Deployment

1. Both services will be available at:
   - Frontend: `https://inclusivelearn-frontend.onrender.com`
   - Backend: `https://inclusivelearn-backend.onrender.com`

2. Test backend health: `https://inclusivelearn-backend.onrender.com/api/health`

3. Update Google OAuth authorized origins with your actual Render URLs

4. Test the application!
