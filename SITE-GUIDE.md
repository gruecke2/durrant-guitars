# Durrant Guitars — How to Update Your Site

Hey Tom! This guide covers everything you need to edit your site content, save your changes, and deploy updates live.

---

## What You'll Need (One-Time Setup)

Before you can edit and deploy, you'll need these things installed on your computer. **Garret can help you get these set up the first time.**

| Requirement | What It Is | How to Get It |
|---|---|---|
| **Git** | Tracks changes to your site files | [git-scm.com/downloads](https://git-scm.com/downloads) |
| **Bun** | Runs the site locally | [bun.sh](https://bun.sh) — one-line install |
| **GitHub Account** | Stores your site code online | [github.com/signup](https://github.com/signup) |
| **Repo Access** | You'll need collaborator access to the Durrant Guitars repo | Garret will invite you |
| **Surge Account** | Hosts the live site | Run `npx surge` once and create an account |

### First-Time Clone

Once you have Git and a GitHub account, clone the repo to your computer:

```bash
git clone https://github.com/YOUR-USERNAME/durrant-guitars.git
cd durrant-guitars
bun install
```

You only do this once or if "dependencies" changes. After that, everything lives in that folder.

---

## Editing Your Site (The Fun Part)

### Step 1: Start the Site Locally

Open a terminal in the `durrant-guitars` folder and run:

```bash
bun dev
```

You'll see something like:

```
astro  v5.17.3 ready in 923 ms

┃ Local    http://127.0.0.1:4321/
```

Your site is now running on your computer.

### Step 2: Open the Admin Dashboard

Open your browser and go to:

```
http://127.0.0.1:4321/keystatic
```

You'll see the **Keystatic dashboard** — this is your content management panel. It shows:

**Collections:**

- **Catalog Models** — Your guitar model lineup (Grifter, Racketeer, Con Artist, etc.)
- **Available Inventory** — Guitars currently for sale or recently sold
- **Gallery** — Past build photos and showcases
- **Testimonials** — Customer quotes

**Singletons:**

- **Workshop Photos** — The masonry grid of misc build photos at the bottom of the gallery page

### Step 3: Make Your Edits

1. **Click a collection** (e.g., "Catalog Models")
2. **Click an entry** (e.g., "grifter")
3. **Edit any field** — change the description, update the price, add/remove photos
4. **Click "Save"** in the top-right corner

That's it. The change is saved to the file on your computer instantly.

### What You Can Edit

| Collection          | What                                                                     | Example Change                       |
| ------------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| **Catalog Models**  | Name, style, tagline, description, starting price, specs, photos         | Update the Swindler's starting price |
| **Available**       | Name, price, status (Available/Sold), description, photos, specs, Stripe | Mark a guitar as Sold                |
| **Gallery**         | Title, model, description, photos, date                                  | Add a new build showcase             |
| **Testimonials**    | Customer name, role, quote, photo, display order                         | Add a happy customer's quote         |
| **Workshop Photos** | The masonry grid photos on the Gallery page                              | Add a cool one-off build photo       |

### Adding New Entries

From any collection list, click the **"+"** button (or "Create" button) to add a new entry. Fill in the fields and save.

### Adding & Removing Photos

Every photo field in the admin has **drag-and-drop upload**. Here's how:

1. Scroll to the **"Photos"** section of any entry
2. Click **"Add"** to add a new photo slot
3. Click **"Choose file"** (or drag a photo onto it)
4. Select a `.jpg` or `.png` from your computer
5. Click **"Done"**, then **"Save"**

To **remove** a photo, click the trash icon next to it.

To update the **workshop masonry grid** on the Gallery page, click "Workshop Photos" in the sidebar — same drag-and-drop process.

> **Tip:** Use high-quality `.jpg` photos. The site automatically optimizes them for fast loading.

---

## Custom Domain Setup (Squarespace & Vercel)

Since we are hosting on Vercel and using the custom domain **durrantguitars.com**, a one-time DNS setup is required in your Squarespace domain account:

1. **Log in to Squarespace** and go to your domains dashboard.
2. Select **durrantguitars.com** and go to **DNS Settings**.
3. **Add the following records**:
   - **A Record**:
     - Host: `@` (or leave blank for root)
     - Points to: `76.76.21.21` (Vercel's IP address)
   - **CNAME Record**:
     - Host: `www`
     - Points to: `cname.vercel-dns.com`

*Note: DNS changes can take anywhere from a few minutes to 24 hours to propagate across the internet.*

---

## Setting Up Stripe Checkout Links

To sell guitars in the **Available Inventory** collection:

1. **Log in to your Stripe Dashboard** (ensure you are in **Live Mode**, not Test Mode).
2. Go to **Payments > Payment Links** and click **New**.
3. Set up the product details:
   - **Product Name**: Use the guitar's exact name (e.g. *Con Artist #045*).
   - **Price**: Enter the guitar's price.
   - **Image**: (Optional) Upload a photo of the guitar.
4. Under **Advanced Options** or **After Payment**:
   - Select **Show confirmation page** or redirect the user back to your site: `https://durrantguitars.com/available`.
5. Click **Create Link** and copy the resulting URL (e.g., `https://buy.stripe.com/xxxxxx`).
6. **Paste the Stripe Link into Keystatic**:
   - Open Keystatic locally (`http://127.0.0.1:4321/keystatic`).
   - Go to **Available Inventory** and open the guitar entry.
   - Paste the link into the **Stripe Payment Link** field.
   - Click **Save**.
7. **Deploy your changes** using the script (`bash deploy.sh`) to make the "Buy Now" button live.

When a customer buys the guitar:
1. You will receive an email/notification from Stripe.
2. Open Keystatic locally, go to **Available Inventory**, select that guitar, and change the **Status** to **Sold**.
3. Save and run the deploy script to update the site.

---

## Deploying Your Changes (Making It Live)

After you've made edits in the admin dashboard, you need to **save them to GitHub** and **deploy to Vercel** to make them live on the internet.

### Option A: Use the Deploy Script (Easiest)

We've created a one-command script that does everything for you:

```bash
bash deploy.sh
```

This will:

1. ✅ Show you what changed
2. ✅ Ask for a commit message (or use a default)
3. ✅ Save changes to Git
4. ✅ Push to GitHub
5. ✅ Deploy to Vercel

### Option B: Manual Steps (If You Want More Control)

```bash
# 1. Save your changes to Git
git add -A
git commit -m "Updated the Swindler price"

# 2. Push to GitHub
git push

# 3. Deploy to Vercel
npx vercel --prod
```

---

## Quick Reference

| Task | Command |
|---|---|
| Start the site locally | `bun dev` |
| Open admin panel | Go to `http://127.0.0.1:4321/keystatic` |
| Stop the site | Press `Ctrl+C` in the terminal |
| Save & deploy everything | `bash deploy.sh` |
| Pull latest changes (if Garret made updates) | `git pull` |

---

## Troubleshooting

**"bun: command not found"**
→ Bun isn't installed. Run the installer from [bun.sh](https://bun.sh).

**"git: command not found"**
→ Git isn't installed. Download from [git-scm.com](https://git-scm.com/downloads).

**The site looks wrong after editing**
→ The dev server auto-refreshes. If something looks broken, stop it (`Ctrl+C`) and restart (`bun dev`).

**"Your local changes would be overwritten"**
→ You have unsaved changes. Run the deploy script first, or `git stash` then `git pull`.

**Vercel says "not authorized" or fails to deploy**
→ Run `npx vercel login` to log in again.

---

*Questions? Text Garret. He's probably awake.*
