# Roadmap Guide: CMS & Payments Integration

This guide addresses operational questions regarding the Keystatic web console, Stripe integration requirements, and handling custom build downpayments.

---

## 1. Deployed Keystatic Web Console

### Does it work online right now?
**No.** Currently, the deployed Keystatic panel at `/keystatic` is disabled on production builds (via `isBuild` in `astro.config.mjs`) to allow for a static website compilation on Vercel without throwing errors. Additionally, the CMS configuration is set to `local` mode, meaning it only reads and writes files on your local computer.

### What would it take to make it work online?
To allow Tom to log in at `durrantguitars.com/keystatic` from any browser and update the live site directly:

1.  **Configure GitHub Storage Mode**:
    Update `keystatic.config.ts` to connect to GitHub instead of your local filesystem:
    ```typescript
    storage: {
      kind: 'github',
      repo: 'gruecke2/durrant-guitars',
    }
    ```
2.  **Add a Serverless Adapter**:
    Keystatic's admin panel needs server-side routes to communicate with GitHub. You would need to add Vercel's serverless adapter in `astro.config.mjs`:
    ```javascript
    import vercel from '@astrojs/vercel/serverless';
    export default defineConfig({
      output: 'hybrid', // Allows standard pages to be static while CMS routes run as serverless APIs
      adapter: vercel(),
      // ...
    });
    ```
3.  **Create a GitHub App**:
    You (Garret) would create a free GitHub OAuth App in GitHub settings. This handles Tom's login.
4.  **Set Vercel Environment Variables**:
    Provide the GitHub App client secrets to your Vercel project panel.

*Note: Since Choice 1 (Local CMS) is currently preferred, Keystatic remains local-only. Tom edits on his computer and runs the deploy script.*

---

## 2. Stripe Integration Requirements

To connect Stripe payments to the site, what info you need depends on your approach:

### Approach A: Link-Based (Easiest - Recommended for V1)
No API keys, coding, or database are required. 
*   **What you need from Tom**:
    1.  Tom creates **Payment Links** directly inside his Stripe dashboard (Payments > Payment Links > New).
    2.  He inputs the guitar model name and the exact price.
    3.  He copies the link (e.g. `https://buy.stripe.com/xxxxxx`) and pastes it into the **Stripe Payment Link** field in Keystatic.
    4.  He runs `bash deploy.sh`.

### Approach B: Dynamic Checkout API (Advanced)
If you want to create custom checkout sessions on the fly or integrate webhooks to automate marking products as "Sold":
*   **What you need from Tom's Stripe Account**:
    1.  **Stripe Publishable Key** (`pk_live_...`)
    2.  **Stripe Secret Key** (`sk_live_...`)
    3.  **Webhook Signing Secret** (`whsec_...`) (from Stripe developers dashboard, to authenticate notifications sent to Vercel).

---

## 3. Downpayments for Custom Builds (No DB Required)

You do **not** need a database to handle downpayments or deposits. Here are three strategies ranked by ease of use:

### Strategy 1: The Review & Invoice Flow (Highly Recommended)
Custom guitar building is a high-touch process where builders usually want to confirm wood availability, specs, and timeline before taking money.
1.  The customer builds their guitar on the "Create Yours" page and submits their design.
2.  The submission is emailed to Tom (via FormSubmit/email).
3.  Tom reviews the specs, contacts the customer to confirm, and then **emails them a Stripe Invoice** (generated in 30 seconds on his Stripe dashboard).
4.  The customer clicks the link in their email to pay the deposit.

### Strategy 2: Reusable Deposit Link (Static Checkout)
If you want customers to pay the deposit immediately on the site without Tom's manual review:
1.  Tom creates a single, reusable Payment Link in Stripe named **"Custom Guitar Build Deposit"** for a flat rate (e.g., $500).
2.  In the Stripe Payment Link settings, Tom enables:
    *   **Collect Customer Details** (Shipping Address, Email, Phone).
    *   **Custom Fields**: Add a required text field: *"What is your email or name used in the builder?"*.
3.  We place this link on the builder summary page. The customer pays, and Tom gets a Stripe email showing a $500 payment along with the customer's reference name. Tom matches it with the email spec submission.

### Strategy 3: Webhooks & Database (Fully Automated)
If you want the customer to pay, get a unique build code, and have the system automatically store their build configuration in a database:
1.  Set up a database (e.g., Supabase or Vercel Postgres).
2.  When the customer submits their build, it saves to the database with a unique `build_id` (e.g., `build_12345`).
3.  We send the customer to a dynamic Stripe checkout session, passing `build_id` as metadata.
4.  Once paid, Stripe fires a webhook to Vercel, which updates the database record for `build_12345` status to `"Deposit Paid"`.

---

## 4. Custom Build "Progress Tracker"

To allow customers to track the status of their custom guitar build (payment status, crafting stages, progress photos) without introducing database costs or high-maintenance infrastructure, the **absolute best solution** is to leverage your existing **Keystatic + Astro Git CMS pipeline**.

### How the Git CMS Tracker Works (Recommended)

Instead of building a separate Single Page Application (SPA) with a dynamic database, we treat custom builds as a new content collection.

1.  **Tom Creates a Tracker**:
    When a customer pays their deposit, Tom opens Keystatic locally, goes to the **Builds** collection, and clicks "Create New Build".
2.  **Tom Inputs Details**:
    He fills out a few fields in the CMS panel:
    *   **Customer Name** (e.g., *Sarah Vance*)
    *   **Unique Code / Secret Slug** (e.g., a random slug like `sarah-vance-swindler-928x` for privacy)
    *   **Payment Status** (Dropdown: *Deposit Paid*, *Final Balance Pending*, *Paid in Full*)
    *   **Build Status** (Dropdown: *Specs Confirmed*, *Wood Sourced*, *Body Routed*, *Neck Carved*, *Finishing*, *Electronics*, *Completed*)
    *   **Updates Log** (A list of short text logs: *"May 24: Body routing is complete."*)
    *   **Progress Photos** (An array of photos Tom takes in the workshop and drags-and-drops into the CMS)
3.  **Tom Deploys**:
    He runs `bash deploy.sh`.
4.  **Customer Views the Site**:
    Astro compiles a dedicated, secure static page: `durrantguitars.com/tracker/sarah-vance-swindler-928x`.
    *   Tom emails this direct secret link to the customer.
    *   Since the link uses a random unique code, it remains private to that customer (no account/login required).
    *   Alternatively, we can build a simple landing page at `/tracker` with a search box where the customer enters their code, which redirects them to `/tracker/sarah-vance-swindler-928x` using client-side JavaScript.

### What is Required to Implement This?

1.  **Keystatic Config**:
    Add a `builds` collection schema to `keystatic.config.ts` containing the name, status dropdowns, text areas, and image arrays.
2.  **Astro Template**:
    Create a dynamic route file at `src/pages/tracker/[slug].astro`. This template will render the visual progress steps (a progress bar or timeline), payment status alert boxes, text updates, and the masonry gallery of progress photos.
3.  **Optional Landing Page**:
    Create `src/pages/tracker/index.astro` containing a simple input form where the user types their build code and hits "Track Build" (redirecting them to `/tracker/[code]`).
4.  **Local Folder Setup**:
    Create a directory for build images (e.g., `src/assets/images/site/builds`) so Astro's image optimizer can compress Tom's progress photos automatically.

### Why this is the Best Solution:
*   **$0 Cost & No Database**: Uses your existing local Git-file database.
*   **Astro Image Optimization**: Tom can upload raw workshop photos from his phone, and Astro will automatically resize, optimize, and serve them in fast next-gen formats (WebP/AVIF).
*   **Tom's Workflow remains Identical**: Tom uses the exact same Keystatic admin panel he already uses for updating the inventory.
*   **Complete Privacy**: Direct secret links avoid the need to manage secure user authentication, passwords, or encrypted sessions.
