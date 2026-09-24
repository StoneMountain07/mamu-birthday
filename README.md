# 🎂 Happy 29th Birthday Website for My Wife

## Shared Media Setup
Run the contents of `supabase-schema.sql` in the Supabase SQL Editor once. The website uploads the original files to Cloudinary and stores their public URLs in Supabase, so every visitor sees the same gallery.

The browser uses the Supabase publishable key from `.env.local` as configuration reference. Since this is a static HTML site, the public values are also configured in the page script. Never place a Supabase service-role key in the browser.

An executive luxury, single-file interactive website created to celebrate my wife's 29th birthday. Features universal media vault support (photos, videos, and audio), folder import from PC, IndexedDB autosave persistence, milestone countdown tracker, 29 reasons cards, and ambient music.

## ✨ Features
- **Executive Design:** Deep black, brushed gold, and soft champagne color palette with Cinzel typography.
- **Universal Media Vault:** Supports all photo, video, and audio formats (HEIC, PNG, JPG, WEBP, MP4, MOV, AVI, MKV, WebM, MP3, WAV, AAC, M4A).
- **Dual Import Options:** Individual file picker and batch folder import (`webkitdirectory`).
- **Instant Autosave:** IndexedDB browser database guarantees zero data loss on refresh.
- **Interactive Player:** Built-in audio and video players with category tabs.
- **GitHub Pages Ready:** Deploy in under 2 minutes.

## 🚀 Quick Deployment
1. Clone this repository or download `index.html`.
2. Push to your GitHub repository (e.g., `birthday-for-wife`).
3. Enable **GitHub Pages** in your repository settings under the `main` branch.
4. Enjoy your live website!
