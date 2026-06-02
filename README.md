# Durrant Guitars Website

A modern, high-performance static website for Durrant Guitars. Built with **Astro**, styled with **Tailwind CSS**, integrated with Svelte and React, and managed using **Keystatic CMS** (local file-based workflow) with deployment on **Vercel**.

## 🚀 Stack Overview

*   **Framework**: Astro (Static Site Generation)
*   **Styling**: Tailwind CSS (v4)
*   **Components**: Svelte (interactive components), React (Keystatic Admin wrapper)
*   **Content Management**: Keystatic CMS (local mode, saves contents as JSON/Markdoc directly in the source directory)
*   **Hosting & CDN**: Vercel (CLI-based deployments)

---

## 🛠️ Development & Deployment

To start editing the site or updating content locally:

1.  **Start Local server**:
    ```bash
    bun dev
    ```
2.  **Open CMS Panel**:
    Go to `http://127.0.0.1:4321/keystatic` to edit collections (Guitars, Galleries, Testimonials).
3.  **Deploy Changes**:
    Run the deploy script to push content to GitHub and publish to `durrantguitars.com`:
    ```bash
    bash deploy.sh
    ```

For full editing details, DNS specs, and Stripe tutorials, see [SITE-GUIDE.md](file:///c:/dev/durrant-guitars/SITE-GUIDE.md).

---

## 📋 Project Roadmap & TODOs

Here are the upcoming milestones and feature backlogs for the Durrant Guitars platform:

### 💳 E-Commerce & Stripe Integration
*   [ ] **Production Checkout Flow**: Audit and replace test Stripe Payment Links with production payment links in Keystatic's "Available Inventory" collection.
*   [ ] **Redirect Pages**: Configure Stripe checkouts to redirect users to a clean confirmation/thank-you page (e.g. `https://durrantguitars.com/thank-you`) after successful transactions.
*   [ ] **Down Payments for Custom Builds**: Implement a deposit payment system for custom guitar configurations built in the "Create Yours" page.
    *   Create a "Pay Deposit" checkout flow using a dedicated Stripe Deposit Product.
    *   Integrate a Stripe link or button into the custom build summary screen.

### 🛡️ Security & Spam Protection
*   [ ] **Contact Form Captcha**: Implement anti-spam security (such as Cloudflare Turnstile or Google reCAPTCHA) on the custom contact and inquiry forms to prevent automated submission spam.
*   [ ] **Form Fields Audit**: Clean up and validate contact inputs on `/contact` and `/create-yours` endpoints.

### 🔍 SEO & Meta Enhancements
*   [ ] **SEO Meta Audit**: Audit and add descriptive `<title>` and `<meta name="description">` tags for every static page.
*   [ ] **Sitemap & Robots**: Ensure `sitemap.xml` and `robots.txt` are generated and correctly reference `https://durrantguitars.com`.
*   [ ] **Social Cards**: Configure Open Graph (`og:image`, `og:title`) metadata for high-quality preview cards on platforms like Instagram and Twitter.

### 🎸 Product Configuration Alignment
*   [ ] **Model Synch**: Align the catalog model options (Grifter, Swindler, Racketeer, Con Artist, etc.) in `src/content/catalog/` with actual product specs.
*   [ ] **Asset Import**: Synchronize model images and build specifications with the current asset drive (Photos in Google Drive).
