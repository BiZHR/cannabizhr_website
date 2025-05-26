# CannaBiz HR Website - GitHub Pages Deployment Guide

## 📋 Complete Setup Instructions

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in to your account
2. Click the green **"New"** button (or the **"+"** icon in the top right)
3. Repository settings:
   - **Repository name**: `cannabiz-hr-website` (or your preferred name)
   - **Description**: "Professional cannabis HR consulting website"
   - **Visibility**: Must be **Public** (required for free GitHub Pages)
   - **Do NOT** check "Add a README file" (we already have one)
4. Click **"Create repository"**

### Step 2: Upload Your Website Files
**Option A: Using GitHub Web Interface (Recommended for beginners)**
1. On your new empty repository page, click **"uploading an existing file"**
2. Drag and drop ALL files from this package:
   - `index.html`
   - `about.html`
   - `blog.html`
   - `contact.html`
   - `fundraising.html`
   - `services.html`
   - `css/style.css`
   - `js/main.js`
   - `js/chatbot.js`
   - `js/calendar.js`
   - `README.md`
   - `GITHUB_PAGES_SETUP.md`
3. In the commit message box, type: "Initial CannaBiz HR website upload"
4. Click **"Commit changes"**

**Option B: Using Git Commands** (if you have Git installed)
```bash
git clone https://github.com/yourusername/cannabiz-hr-website.git
cd cannabiz-hr-website
# Copy all files from this package into the folder
git add .
git commit -m "Initial CannaBiz HR website upload"
git push origin main
```

### Step 3: Enable GitHub Pages
1. In your repository, click the **"Settings"** tab (top menu)
2. Scroll down and click **"Pages"** in the left sidebar
3. Under **"Source"**, select:
   - **Source**: "Deploy from a branch"
   - **Branch**: "main"
   - **Folder**: "/ (root)"
4. Click **"Save"**
5. GitHub will show a message: "Your site is ready to be published at..."

### Step 4: Access Your Live Website
- Your website will be available at: `https://yourusername.github.io/repository-name/`
- Example: `https://johnsmith.github.io/cannabiz-hr-website/`
- **Note**: It may take 5-10 minutes for the site to go live initially
- You'll see a green checkmark when deployment is complete

### Step 5: Custom Domain (Optional)
If you want to use your own domain (like `www.cannabizhr.com`):
1. In Pages settings, enter your domain in the **"Custom domain"** field
2. Update your domain's DNS settings to point to GitHub Pages:
   - Create a CNAME record pointing to `yourusername.github.io`
   - Or create A records pointing to GitHub's IP addresses

### Step 6: Adding AI Chatbot (Optional Enhancement)
The website includes a smart chatbot that can be enhanced with AI. To enable:
1. Get a Perplexity API key from [perplexity.ai](https://www.perplexity.ai)
2. Add it as a GitHub secret: Settings → Secrets → New repository secret
3. Name: `PERPLEXITY_API_KEY`, Value: your API key

## 🌟 Features Included in Your Website

### ✅ Complete Website Structure
- **Landing Page**: Professional hero section with night sky background
- **Services Page**: Cannabis compliance, HR, and technology solutions
- **About Page**: Your municipal government experience and expertise
- **Blog Page**: Cannabis industry insights with filtering
- **Fundraising Page**: Support tiers and donation system
- **Contact Page**: Professional consultation scheduling

### ✅ Interactive Features
- **Smart Chatbot**: Cannabis HR assistant with intelligent responses
- **Scheduling Calendar**: Open-source consultation booking system
- **Responsive Design**: Works perfectly on all devices
- **Professional Styling**: Earth-tone colors with cannabis/LA themes

### ✅ Ready for Business
- **Contact Forms**: Professional consultation requests
- **Newsletter Signup**: Build your email list
- **SEO Optimized**: Professional meta tags and descriptions
- **Social Media Ready**: Professional branding throughout

## 🔧 Updating Your Website
After initial setup, you can update your website by:
1. Edit files directly on GitHub (click any file → Edit button)
2. Upload new files using the "Add file" button
3. Changes will automatically deploy to your live site

## 🎯 Next Steps
1. **Test Everything**: Visit your live site and test all features
2. **Customize Content**: Update contact information, phone numbers
3. **Add Your Photos**: Replace placeholder images with your own
4. **SEO Setup**: Submit your site to Google Search Console
5. **Analytics**: Add Google Analytics tracking code

## 📞 Support
- GitHub Pages Documentation: [docs.github.com/pages](https://docs.github.com/pages)
- Your website will be professional, fast, and completely free to host!

---
**Congratulations!** Your professional CannaBiz HR website is ready to help grow your cannabis consulting business! 🌿✨