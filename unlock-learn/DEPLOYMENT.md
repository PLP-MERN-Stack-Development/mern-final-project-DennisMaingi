# Deployment Guide

## Backend Deployment (Render)

### Step 1: Prepare MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for Render access
5. Get connection string: `mongodb+srv://<username>:<password>@cluster.mongodb.net/unlock-learn`

### Step 2: Deploy to Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: inclusivelearn-backend
   - **Root Directory**: `unlock-learn/server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/unlock-learn
   JWT_SECRET=your_secure_random_string_here
   CLIENT_URL=https://your-frontend-url.vercel.app
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   GOOGLE_CLIENT_ID=your_google_client_id
   ```

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL: `https://inclusivelearn-backend.onrender.com`

### Step 3: Seed Database (Optional)
1. In Render dashboard, go to your service
2. Click "Shell" tab
3. Run: `npm run seed`

---

## Frontend Deployment (Vercel)

### Step 1: Update Environment Variables
1. Create `.env.production` in `client/` folder:
   ```env
   VITE_API_URL=https://inclusivelearn-backend.onrender.com/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

### Step 2: Deploy to Vercel
1. Install Vercel CLI (optional):
   ```bash
   npm install -g vercel
   ```

2. **Option A: Deploy via Vercel Dashboard**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `unlock-learn/client`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Add Environment Variables (same as .env.production)
   - Click "Deploy"

3. **Option B: Deploy via CLI**
   ```bash
   cd client
   vercel
   # Follow prompts
   # Set root directory to client/
   ```

4. Copy your frontend URL: `https://your-app.vercel.app`

### Step 3: Update Backend CORS
1. Go back to Render dashboard
2. Update `CLIENT_URL` environment variable with your Vercel URL
3. Service will auto-redeploy

---

## Post-Deployment Checklist

### Backend (Render)
- ✅ Service is running (green status)
- ✅ MongoDB connected (check logs)
- ✅ Health check works: `https://your-backend.onrender.com/api/health`
- ✅ Test endpoint: `https://your-backend.onrender.com/api/test`

### Frontend (Vercel)
- ✅ Site loads correctly
- ✅ API calls work (check Network tab)
- ✅ Authentication works
- ✅ Google OAuth works
- ✅ Payment integration works

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "Credentials"
3. Edit your OAuth 2.0 Client ID
4. Add Authorized JavaScript origins:
   - `https://your-app.vercel.app`
5. Add Authorized redirect URIs:
   - `https://your-app.vercel.app`

### Stripe Setup
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Add your domain to allowed domains
3. Update webhook endpoint if using Stripe webhooks:
   - `https://your-backend.onrender.com/api/stripe-webhook`

---

## Troubleshooting

### Backend Issues
- **503 Service Unavailable**: Render free tier spins down after inactivity. First request takes 30-60 seconds.
- **MongoDB Connection Failed**: Check connection string and IP whitelist
- **CORS Errors**: Verify CLIENT_URL matches your Vercel URL exactly

### Frontend Issues
- **API Calls Failing**: Check VITE_API_URL in environment variables
- **Build Fails**: Check for TypeScript errors, run `npm run build` locally first
- **404 on Refresh**: Vercel should handle this with vercel.json rewrites

### Common Fixes
```bash
# Clear Vercel cache and redeploy
vercel --prod --force

# Check Render logs
# Go to Render dashboard → Your service → Logs

# Test backend locally with production env
cd server
NODE_ENV=production npm start
```

---

## Monitoring

### Render
- View logs in real-time from dashboard
- Set up email alerts for service failures
- Monitor resource usage

### Vercel
- View deployment logs
- Analytics available on Pro plan
- Real-time error tracking

---

## Updating Deployments

### Backend (Render)
- Push to GitHub → Auto-deploys
- Or manually redeploy from Render dashboard

### Frontend (Vercel)
- Push to GitHub → Auto-deploys
- Or run `vercel --prod` from CLI

---

## Cost Estimates

### Free Tier Limits
- **Render**: 750 hours/month, spins down after 15 min inactivity
- **Vercel**: 100 GB bandwidth, unlimited deployments
- **MongoDB Atlas**: 512 MB storage, shared cluster

### Upgrade Recommendations
- **Render**: $7/month for always-on service
- **Vercel**: $20/month for Pro features
- **MongoDB Atlas**: $9/month for dedicated cluster

---

## Live URLs

After deployment, update README.md with:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://inclusivelearn-backend.onrender.com
- **API Docs**: https://inclusivelearn-backend.onrender.com/api/health
