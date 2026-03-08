# Deploy to Cloudflare Pages

This guide will walk you through deploying your portfolio to Cloudflare Pages for free.

## Prerequisites

- A GitHub account (or GitLab, Bitbucket)
- Your portfolio repository pushed to GitHub

## Step-by-Step Deployment

### 1. Push Your Code to GitHub (if not already done)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. Sign Up / Log in to Cloudflare

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Sign up or log in with your Cloudflare account

### 3. Create a New Page

1. Click **"Create a project"** or **"Add project"**
2. Choose **"Connect to Git"**
3. Select **GitHub** as your Git provider
4. Authorize Cloudflare Pages to access your repositories
5. Select your portfolio repository from the list

### 4. Configure Build Settings

Cloudflare will auto-detect your Vite project, but verify these settings:

- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Environment variables**: Add `NODE_VERSION=18` (or your Node version)

Click **"Save and Deploy"**

### 5. Wait for Deployment

Cloudflare Pages will:

1. Clone your repository
2. Install dependencies (`npm ci`)
3. Run the build command
4. Deploy the `dist` folder to their global CDN

This usually takes 1-3 minutes.

### 6. Access Your Live Site

Once deployed, you'll get:

- A default `*.pages.dev` subdomain (e.g., `your-portfolio.pages.dev`)
- A unique URL you can share immediately

### 7. (Optional) Add a Custom Domain

1. In your Cloudflare Pages dashboard, go to your project
2. Click **"Custom domains"** → **"Add custom domain"**
3. Enter your domain name (e.g., `yourname.com`)
4. Follow the DNS verification steps
5. Cloudflare will automatically provision an SSL certificate

## Optimization Features Already Included

Your project includes these Cloudflare Pages-specific files:

### `public/_headers`

- Sets long-term caching (1 year) for static assets with fingerprinted filenames
- Improves performance for repeat visitors

### `public/_redirects`

- Handles client-side routing for SPA (Single Page Application)
- Ensures all routes serve `index.html` for React Router to handle

## Monitoring & Management

### View Analytics

- In your Cloudflare Pages dashboard, go to **Analytics** tab
- See traffic, bandwidth usage, and request statistics

### View Deployments

- Each push to your main branch triggers a new deployment
- View all deployments in the **Deployments** tab
- You can rollback to previous versions if needed

### Usage Limits (Free Plan)

- **Builds**: 500 per month
- **Build time**: 20 minutes per build
- **Bandwidth**: Unlimited for static assets
- **Functions**: 100,000 daily requests (if you use serverless functions)

## Troubleshooting

### Build Fails

- Check the build logs in Cloudflare Pages dashboard
- Ensure all dependencies are listed in `package.json`
- Test build locally with `npm run build` first

### 404 on Refresh

- The `_redirects` file should handle this
- Ensure it's in the `public/` folder and being copied to `dist/`

### Assets Not Loading

- Check that the `_headers` file is properly formatted
- Verify the build output directory is `dist`

## Need Help?

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Vite Deployment Guide](https://vite.dev/guide/static-deploy.html)

---

**Your portfolio is now live on the world's fastest CDN!** 🚀
