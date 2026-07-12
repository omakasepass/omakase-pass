# The Omakase Pass

A validation-mode landing page for **The Omakase Pass** — a Nashville booking platform
connecting customers with vetted independent sushi chefs for private, in-home omakase
experiences. The page captures waitlist signups and serves as a credibility asset when
pitching local chefs. **No live booking or payment — waitlist only.**

## What's in here

```
index.html        The landing page (all sections + "For Chefs")
omakase.html      "What is Omakase?" content page (SEO seed)
styles.css        All styling, mobile-first
script.js         Smooth-scroll, hero animation, scroll reveals
favicon.svg       Browser-tab icon (indigo circle, "OP")
images/           Photos go here — see images/README.md for the exact list
```

It's a **plain static site**: no frameworks, no build step. You can double-click
`index.html` to open it in a browser locally, and it deploys to Vercel exactly as-is.

## Before launch — three things to do

1. **Add the images.** See [`images/README.md`](images/README.md) for the exact
   filenames and specs (`hero.jpg`, `tasting.jpg`, `party.jpg`, `og.jpg`). The site shows
   tasteful placeholders until they exist.
2. **Wire up the waitlist form.** In `index.html`, find the section marked
   `TALLY FORM EMBED`. Create a Tally form (instructions are in the comment there) and
   swap in your form ID. Then delete the placeholder `<form>` right below it.
3. **Turn on analytics.** In `index.html` `<head>`, uncomment either the Plausible line
   (recommended) or the Google Analytics block. Instructions are in the comments.

---

# Deploying: GitHub → Vercel (beginner walkthrough)

This gets your site online and set up so that **every time you push a change to GitHub,
Vercel automatically redeploys it** — usually live in under a minute.

You'll do this once. After that, updating the site is just: edit a file → 3 git commands
→ it's live.

## Step 1 — Create a GitHub account and repository

1. Go to <https://github.com> and sign up (free). Verify your email.
2. Once logged in, click the **+** in the top-right corner → **New repository**.
3. Fill in:
   - **Repository name:** `omakase-pass` (or anything — lowercase, no spaces)
   - **Description:** optional
   - **Visibility:** **Private** is fine (Vercel can still deploy it).
   - **Do NOT** check "Add a README" / ".gitignore" / "license" — this project already
     has those, and adding them here causes a conflict.
4. Click **Create repository**. Leave this page open — you'll need the commands it shows.

## Step 2 — Push this project to GitHub

Open the **Terminal** app and run these commands one at a time. Replace
`YOUR-USERNAME` with your GitHub username.

```bash
# Move into the project folder (adjust the path if you moved it)
cd "/Users/paolonarag/Claude/Omakase Pass"

# Stage every file (the "." means "everything in this folder")
git add .

# Save a snapshot with a message describing it
git commit -m "Initial commit: Omakase Pass landing page"

# Connect this folder to the empty GitHub repo you just made
git remote add origin https://github.com/YOUR-USERNAME/omakase-pass.git

# Upload it. "-u origin main" links your local 'main' branch to GitHub's.
git push -u origin main
```

**What each command does, in plain terms:**
- `git add .` — picks which changes to include (here, all of them).
- `git commit` — saves a labeled checkpoint on your computer.
- `git remote add origin …` — tells git *where* on GitHub this project lives.
- `git push` — sends your saved checkpoint up to GitHub.

> The first `git push` may pop up a login. Sign in through the browser window it opens,
> or use a Personal Access Token if asked. Follow the prompts — it's a one-time setup.

Refresh your GitHub repo page; you should now see all the files.

## Step 3 — Create a Vercel account and deploy

1. Go to <https://vercel.com> → **Sign Up** → choose **Continue with GitHub** (this links
   the two accounts automatically). Approve the access GitHub asks for.
2. On your Vercel dashboard, click **Add New… → Project**.
3. Find your `omakase-pass` repo in the list and click **Import**.
   - If you don't see it, click **Adjust GitHub App Permissions** and grant Vercel access
     to the repo.
4. On the configure screen, **leave everything at its defaults**:
   - Framework Preset: **Other** (it's a plain static site — no build needed)
   - Build/Output settings: leave blank
5. Click **Deploy**. Wait ~30–60 seconds.
6. You'll get a live URL like `omakase-pass.vercel.app`. Click it — your site is online. 🎉

## Step 4 — Connect your custom domain (theomakasepass.com)

Your domain is registered at **GoDaddy**. You'll point it at Vercel.

**In Vercel:**
1. Open your project → **Settings** → **Domains**.
2. Type `theomakasepass.com` and click **Add**.
3. Vercel will also offer to add `www.theomakasepass.com` — accept it (it redirects www to
   the main domain).
4. Vercel now shows you the **exact DNS records to create**. They'll be one of two forms —
   use whatever Vercel displays (values below are Vercel's standard ones):
   - An **A record** for the root domain:
     - Type: `A` · Name/Host: `@` · Value: `76.76.21.21`
   - A **CNAME record** for www:
     - Type: `CNAME` · Name/Host: `www` · Value: `cname.vercel-dns.com`

   > Always trust the values **Vercel shows you** over the ones written here — Vercel is
   > the source of truth if they ever differ.

**In GoDaddy:**
1. Log in at <https://godaddy.com> → **My Products** → find `theomakasepass.com` →
   click **DNS** (or **Manage DNS**).
2. You'll see a list of DNS records. For each record Vercel gave you:
   - If a conflicting record already exists (e.g. an existing `A` record on `@`, often a
     GoDaddy "parked" page), **edit it** to match Vercel's value — don't create a duplicate.
   - Otherwise click **Add** and enter Type, Name/Host, and Value exactly as Vercel showed.
   - Leave **TTL** at its default (1 hour is fine).
3. Save.

**Back in Vercel:** the Domains page shows each domain's status. It starts as
"Invalid Configuration" and flips to a green **Valid / Ready** once GoDaddy's change
propagates. This usually takes a few minutes but **can take up to 48 hours** — that's
normal DNS behavior, not a mistake. Vercel issues the HTTPS certificate automatically once
it's valid; you don't do anything for that.

## Step 5 — Confirm auto-deploy works

Let's prove the pipeline end-to-end with a tiny edit.

1. Open `index.html` and change something small and visible — e.g. the footer line
   `© 2026 The Omakase Pass` → `© 2026 The Omakase Pass · Nashville`.
2. Save the file, then in Terminal:
   ```bash
   cd "/Users/paolonarag/Claude/Omakase Pass"
   git add .
   git commit -m "Test auto-deploy: tweak footer"
   git push
   ```
   (After the first `push -u`, you can just type `git push` from now on.)
3. Go to your Vercel dashboard. Within seconds you'll see a new deployment appear and run.
   When it finishes, reload your live site — your change is there.

That's the whole loop. **From now on, updating the site = edit → `git add .` →
`git commit -m "..."` → `git push`**, and Vercel puts it live automatically.

---

## Quick reference: making future changes

```bash
cd "/Users/paolonarag/Claude/Omakase Pass"
git add .
git commit -m "Describe what you changed"
git push
```

## Tech notes

- Mobile-first (designed at ~390px, enhanced for desktop).
- Semantic HTML, visible keyboard focus states, skip link.
- All animation is wrapped in `@media (prefers-reduced-motion: no-preference)` and fully
  disabled for visitors who request reduced motion.
- Fonts: Fraunces (headlines) + Instrument Sans (body), loaded from Google Fonts.
- No dependencies, no build step, no server.
