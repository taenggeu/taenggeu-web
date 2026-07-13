# Taenggeu Web

Public download page for the Taenggeu desktop companion pet.

## Local preview

```sh
python3 -m http.server 4311
```

Open `http://localhost:4311`.

## Deployment

This repository is a zero-build static site configured for Cloudflare Pages.

- Project name: `taenggeu`
- Production URL: `https://taenggeu.pages.dev`
- Build command: none
- Build output directory: `.`

The `/api/latest` Pages Function reads the public updater metadata, resolves the
current macOS and Windows installer assets, and caches the response for five minutes.
The page links only to installer files and does not expose a GitHub Releases page link.
