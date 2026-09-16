# Portfolio site

A single-page portfolio: no build step, no framework, three files (`index.html`, `style.css`, `script.js`) plus `data.json` for the content.

## Updating your content

Everything on the page comes from **`data.json`**. Open it in any text editor, change the values, save, and reload the page. You never need to touch the HTML, CSS, or JS.

- `meta` — your name, role, tagline, the 4 stat-bar numbers, email, LinkedIn, and the path to your resume PDF
- `about` — one paragraph, plain text
- `currentlyBuilding` — the "what I'm building right now" list, each item with a `title` and `description`
- `projects` — your featured work write-ups, each with optional `metrics` (the before/after numbers) and `highlights` (bullet points)
- `experience` — your job history, most recent first
- `skills` — a list of categories, each with a list of items
- `outsideOfWork` — an `intro` paragraph and an `interests` list

To swap your resume PDF: replace the file in `assets/`, then update `meta.resumeFile` in `data.json` if you rename it.

## Hosting it for free

### GitHub Pages (recommended)

1. Create a new **public** repo on GitHub (e.g. `yourusername.github.io` for a root domain, or any name for a project page).
2. Push these files to it:
   ```
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/yourusername/YOUR_REPO.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**, set the source branch to `main` (root), and save.
4. Your site is live at `https://yourusername.github.io/YOUR_REPO/` within a couple minutes. If the repo is named `yourusername.github.io`, it's live at the root of that URL.

### Alternatives

- **Netlify** or **Vercel**: drag the whole folder onto their dashboard, or connect the GitHub repo for auto-deploy on every push. Both are free for a personal static site.
- **Cloudflare Pages**: same idea, connect the repo, no build command needed.

## Local preview

Opening `index.html` directly (`file://`) will fail to load `data.json` — browsers block local fetches for security. Instead, from this folder run:

```
python3 -m http.server 8000
```

and open `http://localhost:8000`. Any hosting option above serves it correctly with no extra steps.
