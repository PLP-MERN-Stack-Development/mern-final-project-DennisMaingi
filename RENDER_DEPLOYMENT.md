# Deploy Full Stack on Render

## Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for Render deployment"
git push -u origin main --force
```

## Step 2: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist all IPs: `0.0.0.0/0`
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/unlock-learn`

## Step 3: Deploy on Render

### Option A: Using Blueprint (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will detect `render.yaml` automatically
5. Click **"Apply"**
6. Add environment variables for **Backend**:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/unlock-learn
   JWT_SECRET=your_random_secret_key_here
   CLIENT_URL=https://inclusivelearn-frontend.onrender.com
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   GOOGLE_CLIENT_ID=your_google_client_id
   ```

7. Add environment variables for **Frontend**:
   ```
   VITE_API_URL=https://inclusivelearn-backend.onrender.com/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

8. Click **"Create Services"**

### Option B: Manual Deployment

#### Deploy Backend:
1. Click **"New"** → **"Web Service"**
2. Connect GitHub repo
3. Configure:
   - **Name**: `inclusivelearn-backend`
   - **Root Directory**: `unlock-learn/server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
4. Add environment variables (same as above)
5. Click **"Create Web Service"**

#### Deploy Frontend:
1. Click **"New"** → **"Static Site"**
2. Connect GitHub repo
3. Configure:
   - **Name**: `inclusivelearn-frontend`
   - **Root Directory**: `unlock-learn/client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add environment variables (same as above)
5. Click **"Create Static Site"**

## Step 4: Update URLs

After both services deploy:

1. **Update Backend `CLIENT_URL`**:
   - Go to backend service settings
   - Update `CLIENT_URL` to your frontend URL
   - Example: `https://inclusivelearn-frontend.onrender.com`

2. **Update Frontend `VITE_API_URL`**:
   - Go to frontend service settings
   - Update `VITE_API_URL` to your backend URL
   - Example: `https://inclusivelearn-backend.onrender.com/api`

3. Both services will auto-redeploy

## Step 5: Update Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **Credentials**
3. Edit OAuth 2.0 Client ID
4. Add Authorized JavaScript origins:
   - `https://inclusivelearn-frontend.onrender.com`
   - `https://inclusivelearn-backend.onrender.com`
5. Add Authorized redirect URIs:
   - `https://inclusivelearn-frontend.onrender.com`

## Step 6: Seed Database (Optional)

1. Go to backend service in Render
2. Click **"Shell"** tab
3. Run: `npm run seed`

## Your Live URLs

- **Frontend**: `https://inclusivelearn-frontend.onrender.com`
- **Backend**: `https://inclusivelearn-backend.onrender.com`
- **API Health**: `https://inclusivelearn-backend.onrender.com/api/health`

## Important Notes

⚠️ **Free Tier Limitations**:
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free (enough for 1 service always-on)

💡 **Tips**:
- Keep backend always-on (uses 750 hours)
- Frontend is static, no spin-down issues
- Use MongoDB Atlas free tier (512MB)

## Troubleshooting

### Backend won't start:
- Check logs in Render dashboard
- Verify MongoDB connection string
- Ensure all environment variables are set

### Frontend shows blank page:
- Check browser console for errors
- Verify `VITE_API_URL` is correct
- Check if backend is running

### CORS errors:
- Verify `CLIENT_URL` in backend matches frontend URL exactly
- Include `https://` in the URL

### 503 Service Unavailable:
- Normal for free tier after inactivity
- Wait 30-60 seconds for service to wake up
- Consider upgrading to paid plan ($7/month) for always-on

## Monitoring

- View real-time logs in Render dashboard
- Set up email alerts for service failures
- Monitor resource usage

## Updating Your App

Push to GitHub → Render auto-deploys:
```bash
git add .
git commit -m "Update app"
git push origin main
```

Both services will automatically redeploy!
