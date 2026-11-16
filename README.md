# Auralinaa Foods

Auralinaa Foods is a seafood storefront and catalog-management application for a business focused on connecting responsibly sourced seafood with customers. The public site introduces the brand, communicates its sustainability and community-support story, and presents seafood products with prices, units, availability, certifications, and images. The administrative side lets staff maintain the catalog and manage registered accounts.

The larger product idea is to give customers a clear place to discover seafood and give the business a manageable digital catalog. The current codebase provides the storefront and some operational foundations; it does **not** yet implement a complete commerce or seafood traceability platform. Claims and impact figures shown in the interface are currently marketing content, not data calculated or verified by this application.

## Product experience and current capabilities

### Public storefront

- A landing page with sections for the brand story, offerings, sustainability messaging, catalog, and contact information.
- A seafood catalog populated from MongoDB. Each product can include its name, category, description, price, unit, stock quantity, certification label, icon, and optional image.
- Stock availability is displayed from the stored product quantity. Product information is managed by administrators rather than checked against a live supplier or inventory system.
- Registration and credential-based sign-in for customer accounts.

### Administration

Users with the `admin` role can access `/admin`. The admin area includes:

- A dashboard showing the current user and product counts.
- Product creation, editing, and deletion, including image upload.
- User account listing and management tools, with role actions restricted in the application.
- An Orders page and order/revenue dashboard cards as UI placeholders.

### Important limitations

This repository is an early-stage storefront foundation, not a finished online shop:

- “Add to Cart” is a visual button only. There is no cart state, order submission, checkout, payment processing, shipping workflow, or order database model.
- The Orders page does not display persisted orders. Dashboard order and revenue numbers are hard-coded placeholders.
- There is no operational traceability ledger, supplier integration, catch-origin record, certification verification, or reporting workflow. Product certification labels are entered as catalog data.
- There is no customer profile, account recovery, or complete account-security workflow.
- The landing-page story and impact statistics are static content and should be verified and updated by the business before being treated as factual reporting.

## Technology

- [Next.js 16](https://nextjs.org/) App Router and React 19
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [NextAuth.js v5](https://authjs.dev/) credentials authentication
- Tailwind CSS 4

## Run locally

### Prerequisites

- Node.js (a current LTS release is recommended) and npm
- A running MongoDB instance or an accessible MongoDB deployment

### Setup

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` in the repository root. For a local MongoDB server, the file can contain:

   ```dotenv
   MONGODB_URI=mongodb://127.0.0.1:27017/auralinaa
   AUTH_SECRET=replace-with-a-long-random-secret
   ```

   Replace `AUTH_SECRET` with a long, unique random value. For example, `openssl rand -base64 32` generates one on systems with OpenSSL. Set `MONGODB_URI` to your own database connection string. Keep `.env` private and never commit production credentials.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

The home page and admin pages query MongoDB, so MongoDB must be reachable for these routes to work. Register a user at `/register` to create an account. The database can start with an empty product catalog; use the seed script below if you want demo products.

## First admin account and demo catalog

To create the first administrator, register normally and promote that account by its exact email address:

```bash
node scripts/set-admin.js you@example.com
```

Sign in with that account and visit `/admin`. To list accounts and roles instead of promoting one:

```bash
node scripts/set-admin.js
```

To insert the sample seafood catalog:

```bash
node scripts/seed-products.js
```

> **Destructive operation:** `seed-products.js` deletes all existing Product documents before inserting the demo catalog. Do not run it against a database containing catalog data you need unless you have made a backup.

## Images and uploaded files

The landing-page hero and story images are hosted by Unsplash. They are configured to load directly in the visitor's browser rather than through Next.js's server-side image optimizer, so those two images require browser access to `images.unsplash.com`. The logo and product uploads are served from the app's `public/` directory.

Product image uploads are currently written to `public/uploads` on the application server, and MongoDB stores the resulting URL path. This is suitable for local development but is not durable shared storage for many production hosting environments: deploys may remove uploaded files, and separate app instances will not automatically share them. A production deployment should use persistent object storage or an image service and store stable image URLs.

## Data model overview

- **Product** (`models/Product.js`): name, price, category, description, unit, image path, icon, certification label, stock state, and stock quantity. Mongoose timestamps record creation and update times.
- **User** (`models/User.js`): name, unique email, password value, role (`user` or `admin`), and timestamps.

There is currently no Order model. The sample catalog also lives in `scripts/seed-products.js`; `app/data/products.js` contains a sample data list but the public home page reads the actual catalog from MongoDB.

## Routes at a glance

| Route | Purpose |
| --- | --- |
| `/` | Public brand landing page and MongoDB-backed product catalog |
| `/register` | Create a customer account |
| `/login` | Sign in with email and password |
| `/admin/login` | Admin sign-in page |
| `/admin` | Admin dashboard |
| `/admin/products` | Browse and manage catalog products |
| `/admin/products/add` | Add a catalog product |
| `/admin/products/[id]/edit` | Edit a catalog product |
| `/admin/users` | View and manage registered accounts |
| `/admin/orders` | Orders UI placeholder; no order records are implemented |

## Repository map

```text
app/
  page.js                    Home route; reads products from MongoDB
  components/HomePage.js     Public landing page and catalog UI
  login/ register/            Customer authentication pages
  admin/                      Admin dashboard and management screens
  api/auth/                   NextAuth route handler
  lib/actions.js              Server actions for forms and catalog operations
lib/db.js                     Cached Mongoose connection
models/                       Mongoose Product and User models
public/                       Static brand assets and local product uploads
scripts/                      Demo product seed and admin-promotion utilities
auth.js                       NextAuth credentials configuration
auth.config.js                Authentication and route authorization callbacks
```

## Common commands

```bash
npm run dev    # Start the development server
npm run build  # Build the production app
npm start      # Serve the production build (run npm run build first)
npm run lint   # Run ESLint
```

## Security and production readiness

**Do not use this application with real customer credentials or payments as-is.** The credentials flow currently stores and compares passwords as plain text rather than hashing them. Before production use, implement a secure password hashing and migration strategy; review every server action and authorization boundary; validate and rate-limit user input; configure secure secrets, database access, backups, and durable media storage; and add privacy, monitoring, and operational safeguards. Any real commerce release also needs a properly secured order lifecycle, payment integration, and shipping/customer support processes. Never commit `.env` or expose database credentials.

## Contributing

Use a feature branch, run `npm run lint` and `npm run build`, and include any required environment, database, or deployment changes in the pull request description. The current lint command may report pre-existing issues; call those out separately from issues introduced by your change.
