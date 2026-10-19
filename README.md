# Kom Handicrafts Website

Static site: HTML5, CSS3, Bootstrap 5.3, jQuery, Bootstrap Icons, AOS (all via CDN).

## Run
1. Open `index.html` in a browser, or serve the folder: `python3 -m http.server 8000` and visit http://localhost:8000
2. An internet connection is needed for the CDN libraries and Google Fonts.

## Add photos
Put your real photos in `assets/images/` using the names listed in `assets/images/README.txt`.
Missing photos show an animated stone-texture placeholder, so the layout never breaks.

## Contact form
There is no server. A valid enquiry opens WhatsApp (9694459572) with the message pre-filled.
To send by email instead, connect a form service such as Formspree, or add a PHP/Node handler.

## Deploy
Upload the whole folder to any static host (Netlify, GitHub Pages, cPanel hosting).

## Before launch
- Replace the placeholder photos with authentic images of your products and workshop.
- Update the `og:image` URL in `index.html` to your full domain once live.
- Add certifications, export countries or production figures only when you have verified details.

## Motion
All motion respects `prefers-reduced-motion`.
