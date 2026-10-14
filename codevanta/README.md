# CodeVanta Website

A responsive, static company website built with semantic HTML, CSS, and vanilla JavaScript. No build step or npm dependencies are required.

## Project structure

```text
codevanta/
├── index.html
├── privacy.html
├── styles.css
├── script.js
├── robots.txt
├── sitemap.xml
├── vercel.json
├── README.md
└── assets/
    ├── favicon.svg
    └── og-cover.svg
```

## Before publishing

1. Open `script.js` and replace `CONTACT_EMAIL` with your real business email.
2. Set `WHATSAPP_NUMBER` to your international phone number using digits only, e.g. `923001234567`. Leave it empty if you do not want a WhatsApp link yet.
3. Replace `YOUR-DOMAIN.example` in `robots.txt` and `sitemap.xml` with your actual domain, including `https://`.
4. Update the contact email in `privacy.html`.
5. Review the privacy policy for your real practices and legal requirements.

## Run locally on Windows / VS Code

**Option A — easiest:** Open the project folder in VS Code, install the “Live Server” extension by Ritwick Dey (if you do not already have it), right-click `index.html`, then choose **Open with Live Server**.

**Option B — Python server:** Open the VS Code terminal in this folder and run:

```powershell
py -m http.server 5500
```

Open `http://localhost:5500` in your browser. Press `Ctrl+C` to stop the server.

No `npm install` is needed because this project has no npm dependencies.

## GitHub: create repository and push

1. On GitHub, create a new **empty** repository named `codevanta` (do not add a README or `.gitignore` there).
2. In VS Code, open the `codevanta` folder.
3. In Terminal → New Terminal, run these commands one at a time. Replace `YOUR-GITHUB-USERNAME` with your username.

```powershell
git init
git add .
git commit -m "Build CodeVanta company website"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/codevanta.git
git push -u origin main
```

If Git asks you to identify yourself, set your own Git identity (this is metadata for commits):

```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Then repeat `git commit -m "Build CodeVanta company website"` and `git push -u origin main`. GitHub authentication may open in your browser.

If you already configured `origin`, inspect it with `git remote -v`. If it points to the wrong repository, update it with `git remote set-url origin https://github.com/YOUR-GITHUB-USERNAME/codevanta.git`.

## Deploy to Vercel (next step)

1. Sign in at https://vercel.com and choose **Add New → Project**.
2. Import your `codevanta` GitHub repository.
3. Framework preset: **Other**. Root directory: `./`. Build command: leave blank. Output directory: `./` (or leave the static default if Vercel detects it).
4. Deploy. Vercel will provide a preview URL. Test it before adding your custom domain.
5. In Vercel project **Settings → Domains**, add your domain and follow the exact DNS instructions Vercel displays. DNS records differ by domain setup; do not guess them.
6. Wait for DNS verification and Vercel's HTTPS certificate. Confirm both apex domain and `www` behavior if you use both.
7. Update `robots.txt`, `sitemap.xml`, and the Open Graph image URL metadata if your final domain differs. Re-deploy after changes.

## API keys and `.env`

This static website does **not** require an API key, database, or backend, so no `.env` file is needed and no key has been embedded. Public browser API keys are not secrets, and private/service-role keys must never be placed in frontend files. If you later add a backend integration, use Vercel environment variables for server-only secrets and read them only in server-side functions.

## Contact form behavior — important

The current form validates required fields in the browser and prepares a `mailto:` email. It **does not send the message automatically**, store submissions, or provide server-side spam protection. The user must send the email from their own mail app. For a production form that submits directly, add a serverless endpoint with server-side validation, rate limiting, a honeypot and/or CAPTCHA, and an email provider; configure provider credentials as Vercel environment variables. Do not claim server submission until this exists.

## Security checklist

- [x] No private API keys or credentials in client code.
- [x] No external JavaScript dependencies.
- [x] Browser-side form validation and a honeypot field (not a substitute for server-side protection).
- [x] Vercel security headers and a restrictive CSP included; test policy against the deployed site and adjust only when needed.
- [x] External WhatsApp link uses `noopener noreferrer` when configured.
- [ ] Replace contact placeholders and policy wording.
- [ ] Add a server-side inquiry endpoint if direct form submission is required.
- [ ] Verify HTTPS and custom-domain DNS in Vercel.
- [ ] Replace example sitemap host with your real domain.

## Final testing checklist

- [ ] Run locally and check every navigation link and CTA.
- [ ] Test menu open/close using mouse and keyboard on a narrow viewport.
- [ ] Test layout at phone (320–390px), tablet, laptop, and wide desktop widths.
- [ ] Test required fields, invalid email, short details, and valid form preparation.
- [ ] Confirm no message is falsely reported as sent.
- [ ] Check browser console for errors.
- [ ] Check `/privacy.html`, `/robots.txt`, and `/sitemap.xml`.
- [ ] After deployment, refresh each page directly and test HTTPS.
- [ ] Test real contact email and WhatsApp links after configuration.
- [ ] Run an accessibility check and a performance audit (e.g. Lighthouse).

## SEO notes

The page has a title, description, Open Graph metadata, semantic headings, alt/accessibility text for the dashboard illustration, `robots.txt`, and `sitemap.xml`. Replace the sample domain in the sitemap and robots file before launch. The Open Graph image is a local SVG; confirm social platforms support it or convert it to a PNG if needed.
