# Complete Deployment Steps for Render

## Prerequisites Checklist
- [ ] GitHub account
- [ ] Render account (sign up at https://render.com)
- [ ] MongoDB Atlas account (sign up at https://mongodb.com/cloud/atlas)
- [ ] Code pushed to GitHub

---

## STEP 1: Setup MongoDB Atlas (5 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** or **"Sign In"**
3. Create a new project: **"InclusiveLearn"**
4. Click **"Build a Database"**
5. Choose **"M0 FREE"** tier
6. Select region closest to you
7. Click **"Create Cluster"**
8. **Create Database User:**
   - Username: `inclusivelearn`
   - Password: Click **"Autogenerate Secure Password"** (SAVE THIS!)
   - Click **"Create User"**
9. **Setup Network Access:**
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"**
   - IP: `0.0.0.0/0`
   - Click **"Confirm"**
10. **Get Connection String:**
    - Click **"Connect"**
    - Choose **"Connect your application"**
    - Copy the connection string
    - Replace `<password>` with your saved password
    - Replace `<dbname>` with `unlock-learn`
    - Example: `mongodb+srv://inclusivelearn:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/unlock-learn?retryWrites=true&w=majority`
    - **SAVE THIS CONNECTION STRING!**

---

## STEP 2: Push Code to GitHub (2 minutes)

Open Git Bash in your project folder:

```bash
cd "~/Desktop/final project MERN/mern-final-project-DennisMaingi"

# Check current status
git status

# Add all files
git add .

# Commit
git commit -m "Ready for Render deployment"

# Push to GitHub
git push -u origin main --force
```

Wait for push to complete. Verify on GitHub that your code is there.

---

## STEP 3: Deploy on Render (10 minutes)

### A. Create Render Account
1. Go to https://dashboard.render.com/
2. Click **"Get Started"** or **"Sign In"**
3. Sign up with GitHub (recommended)
4. Authorize Render to access your repositories

### B. Deploy Using Blueprint

1. In Render Dashboard, click **"New +"** (top right)
2. Select **"Blueprint"**
3. Connect your repository:
   - Search: `mern-final-project-DennisMaingi`
   - Click **"Connect"**
4. Render will detect `render.yaml`
5. You'll see 2 services:
   - ✅ `inclusivelearn-backend` (Web Service)
   - ✅ `inclusivelearn-frontend` (Static Site)
6. Click **"Apply"**
7. Wait 30 seconds for services to be created

### C. Add Backend Environment Variables

1. Click on **"inclusivelearn-backend"** service
2. Go to **"Environment"** tab (left sidebar)
3. Click **"Add Environment Variable"**
4. Add these ONE BY ONE:

**Variable 1:**
- Key: `NODE_ENV`
- Value: `production`

**Variable 2:**
- Key: `PORT`
- Value: `5000`

**Variable 3:**
- Key: `MONGODB_URI`
- Value: `YOUR_MONGODB_CONNECTION_STRING_FROM_STEP_1`

**Variable 4:**
- Key: `JWT_SECRET`
- Value: `inclusivelearn_jwt_secret_2025_production_key`

**Variable 5:**
- Key: `CLIENT_URL`
- Value: `https://inclusivelearn-frontend.onrender.com`

**Variable 6:**
- Key: `GOOGLE_CLIENT_ID`
- Value: `540472175498-5l7sauk96cg3jcei2lv47rc96kigbua4.apps.googleusercontent.com`

**Variable 7 (Optional - if using Stripe):**
- Key: `STRIPE_SECRET_KEY`
- Value: `sk_test_YOUR_STRIPE_KEY`

**Variable 8 (Optional - if using Stripe):**
- Key: `STRIPE_PUBLISHABLE_KEY`
- Value: `pk_test_YOUR_STRIPE_KEY`

5. Click **"Save Changes"**
6. Service will start deploying (takes 3-5 minutes)

### D. Add Frontend Environment Variables

1. Go back to Dashboard
2. Click on **"inclusivelearn-frontend"** service
3. Go to **"Environment"** tab
4. Click **"Add Environment Variable"**
5. Add these ONE BY ONE:

**Variable 1:**
- Key: `VITE_API_URL`
- Value: `https://inclusivelearn-backend.onrender.com/api`

**Variable 2:**
- Key: `VITE_GOOGLE_CLIENT_ID`
- Value: `540472175498-5l7sauk96cg3jcei2lv47rc96kigbua4.apps.googleusercontent.com`

**Variable 3 (Optional - if using Stripe):**
- Key: `VITE_STRIPE_PUBLISHABLE_KEY`
- Value: `pk_test_YOUR_STRIPE_KEY`

6. Click **"Save Changes"**
7. Service will start deploying (takes 2-3 minutes)

---

## STEP 4: Wait for Deployment (5-10 minutes)

### Monitor Backend Deployment:
1. Click on **"inclusivelearn-backend"**
2. Go to **"Logs"** tab
3. Watch for:
   - ✅ `npm install` completing
   - ✅ `✅ Connected to MongoDB`
   - ✅ `🚀 Server running on http://localhost:5000`
4. Status should turn **GREEN** with "Live"

### Monitor Frontend Deployment:
1. Click on **"inclusivelearn-frontend"**
2. Go to **"Logs"** tab
3. Watch for:
   - ✅ `npm install` completing
   - ✅ `npm run build` completing
   - ✅ Build successful
4. Status should turn **GREEN** with "Live"

---

## STEP 5: Get Your Live URLs

### Backend URL:
1. Click on **"inclusivelearn-backend"**
2. Copy URL at top (e.g., `https://inclusivelearn-backend.onrender.com`)
3. Test it: Add `/api/health` to URL
4. Should see: `{"status":"Server is running ✅"}`

### Frontend URL:
1. Click on **"inclusivelearn-frontend"**
2. Copy URL at top (e.g., `https://inclusivelearn-frontend.onrender.com`)
3. Open in browser
4. Your app should load!

---

## STEP 6: Update Google OAuth (2 minutes)

1. Go to https://console.cloud.google.com/
2. Select your project
3. Go to **"Credentials"**
4. Click on your OAuth 2.0 Client ID
5. Under **"Authorized JavaScript origins"**, add:
   - `https://inclusivelearn-frontend.onrender.com`
   - `https://inclusivelearn-backend.onrender.com`
6. Under **"Authorized redirect URIs"**, add:
   - `https://inclusivelearn-frontend.onrender.com`
7. Click **"Save"**

---

## STEP 7: Test Your Application

1. Open frontend URL: `https://inclusivelearn-frontend.onrender.com`
2. Test these features:
   - ✅ Homepage loads
   - ✅ Sign up with email
   - ✅ Sign in with Google
   - ✅ Browse courses
   - ✅ View course details
   - ✅ Enroll in free course
   - ✅ View course content

---

## STEP 8: Seed Database (Optional)

1. Go to **"inclusivelearn-backend"** service
2. Click **"Shell"** tab (top right)
3. Wait for shell to connect
4. Run: `npm run seed`
5. Wait for courses to be created
6. Refresh your frontend to see courses

---

## Troubleshooting

### Backend won't start:
- Check **Logs** tab for errors
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

### Frontend shows blank page:
- Open browser console (F12)
- Check for errors
- Verify `VITE_API_URL` is correct
- Check if backend is running

### 503 Service Unavailable:
- Normal for free tier after 15 min inactivity
- Wait 30-60 seconds for service to wake up
- Refresh page

### CORS errors:
- Verify `CLIENT_URL` in backend matches frontend URL exactly
- Include `https://` in the URL

---

## Your Live Application

**Frontend:** https://inclusivelearn-frontend.onrender.com
**Backend:** https://inclusivelearn-backend.onrender.com
**API Health:** https://inclusivelearn-backend.onrender.com/api/health

---

## Next Steps

1. Share your live URL with others
2. Test all features thoroughly
3. Monitor logs for any errors
4. Consider upgrading to paid plan ($7/month) for always-on backend

---

## Need Help?

- Check Render logs for errors
- Review `RENDER_ENV_VARIABLES.md` for environment variables
- Ensure MongoDB Atlas is accessible
- Verify all URLs are correct (https, not http)

**Congratulations! Your app is now live! 🎉**
