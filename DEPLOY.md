# Deployment Guide for Restaurant Swipe App

This document outlines the steps to deploy the Restaurant Swipe application to various cloud platforms.

## Prerequisites

Before deploying, make sure you have:

1. A Google Places API key
2. Your code pushed to a Git repository (GitHub, GitLab, etc.)
3. An account on your chosen deployment platform

## Deployment Options

### Option 1: Render.com (Recommended)

Render is simple to use and offers a free tier suitable for this application.

1. **Sign up** for a Render account at https://render.com
2. **Connect** your Git repository
3. **Create a new Web Service**:
   - Select your repository
   - Set the build command: `npm install && npm run build`
   - Set the start command: `npm start`
   - Choose a free plan
4. **Add environment variables**:
   - `NODE_ENV`: `production`
   - `GOOGLE_API_KEY`: Your Google Places API key
   - `PORT`: `3000` (Render uses this port by default)
5. **Deploy** the service

Render will automatically deploy your app whenever you push to your main branch.

### Option 2: Heroku

1. **Install** the Heroku CLI and log in
   ```
   npm install -g heroku
   heroku login
   ```

2. **Create** a new Heroku app
   ```
   heroku create restaurant-swipe-app
   ```

3. **Set** environment variables
   ```
   heroku config:set GOOGLE_API_KEY=your_api_key_here
   heroku config:set NODE_ENV=production
   ```

4. **Deploy** your app
   ```
   git push heroku main
   ```

### Option 3: Vercel

Vercel works well for the frontend but requires some extra configuration for the Express backend.

1. **Install** the Vercel CLI
   ```
   npm install -g vercel
   ```

2. **Deploy** with Vercel
   ```
   vercel
   ```

3. **Set** environment variables in the Vercel dashboard

## Setting Up Custom Domain (Optional)

Both Render and Heroku allow you to use a custom domain:

1. Purchase a domain name from a provider like Namecheap or GoDaddy
2. In your deployment platform's dashboard, find the custom domain settings
3. Add your domain and follow the instructions to set up DNS records

## Continuous Integration/Deployment

Both Render and Heroku will automatically redeploy your app when you push to your main branch. You can also set up GitHub Actions for more advanced CI/CD.

## Monitoring and Logs

- **Render**: View logs in the dashboard under your service
- **Heroku**: Use `heroku logs --tail` to view logs

## Troubleshooting

If your deployment fails:

1. Check the build logs for errors
2. Ensure all environment variables are correctly set
3. Verify that your application works locally in production mode:
   ```
   NODE_ENV=production npm start
   ```
4. Check that the `PORT` environment variable is properly handled in your code
