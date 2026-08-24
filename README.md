# Siyaram Hardware & Suppliers — Website

## ✅ Correct Setup (follow exactly)

```bash
# Step 1 — Install dependencies
npm install

# Step 2 — Start development server
npm run dev
```

Then open: http://localhost:3000

---

## ⚠️ IMPORTANT — Never run these commands

```bash
# ❌ DO NOT RUN — breaks Next.js version
npm audit fix --force

# ❌ DO NOT RUN — also breaks things
npm audit fix
```

These commands downgrade Next.js which breaks the entire project.
The `.npmrc` file disables audit warnings automatically.

---

## Pages

| URL             | Description              |
|-----------------|--------------------------|
| `/`             | Home / Shop              |
| `/cart`         | Shopping Cart            |
| `/ceo`          | CEO — Pradeep Shah page  |
| `/admin`        | Admin Portal (pw: sahoo123) |
| `/sitemap.xml`  | SEO Sitemap              |
| `/robots.txt`   | SEO Robots               |

---

## Accessing from other devices on your network

If you open the site from another device using your IP (e.g. `192.168.0.105:3000`),
the `next.config.ts` already allows this. Just run `npm run dev` and open your IP.

---

## Update store details

Edit `lib/constants.ts` to update:
- Phone number
- Address
- Social media links
- CEO information
- Website URL (when you get a domain)
