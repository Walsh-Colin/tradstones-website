# Tradstone website

A responsive, single-page band brochure built with HTML, CSS, and JavaScript. Set up your band information once and leave it online. No login, admin area, database, packages, or build step. There is no news feed or gig calendar to maintain. All default artwork is made with CSS and SVG, and the site uses system fonts.

## Open the website

Double-click `index.html` to open it in your browser. Refresh after saving changes.

## Make it yours

1. The name, biography, members, and contact details have been filled in from the supplied Tradstone Facebook screenshots. Edit `band-config.js` if the details change; band members are listed in `index.html`.
2. The booking email is `waddybee@yahoo.com` and the phone number is `086 256 6122`. `bookingPhone` uses the international format for click-to-call, while `bookingPhoneDisplay` controls the visible number. The booking button opens the visitor's email app; this website does not send or store messages itself.
3. Add your real music and social links using the commented examples. Use complete `https://` URLs.
4. Put photos you have permission to use in `assets/photos/`, then add their paths, descriptive alternative text, and optional captions to `photos`. Use compressed JPG or WebP files. Around 1200 pixels wide is a useful starting size.
5. Edit the headings and other fixed text in `index.html`. Replace the default band name in that file too, including the title and description, so search engines and visitors with JavaScript disabled receive your details.
6. Edit the colours at the top of `styles.css` to change the look. Replace `assets/favicon.svg` with your own icon if desired.

The band details come from the supplied Facebook screenshots, and the Facebook links use `https://www.facebook.com/tradstonemusic/`. No recordings are invented. The gallery links to Facebook until local photos are supplied. The group photo attached in chat still needs to be saved into `assets/photos/` and added to `photos` in `band-config.js`; it is not included in the local files yet. The dated gig poster is intentionally omitted from this evergreen brochure. The illustrated record and sleeve are decorative, not a real release or audio player. Only change the content if the band's information changes.

Keep quotes and commas intact when editing the settings. Lines beginning with `//` are comments and do not appear on the site. All configuration is public: never put passwords or API keys here.

## Files

```text
index.html             Page content and accessible structure
styles.css             Responsive layout, colours, and artwork
band-config.js         Band information, links, and photos
script.js              Navigation and rendering of configured content
assets/favicon.svg     Browser tab icon
assets/photos/         Your band photographs
.gitignore             Excludes common local files from version control
README.md              Setup and editing instructions
```

## Publish

Upload this folder's website files to any static web host, keeping the paths intact and `index.html` at the site's root. No build command is needed. Use HTTPS through your hosting provider and connect your domain using their instructions. A backend is only needed if you later want features such as a submitted contact form or mailing-list storage.

## Check before sharing

- Confirm the transcribed band details, booking email, phone number, and Facebook link.
- Add your band photo to the gallery.
- Open the site at phone and desktop widths and try the mobile menu.
- Check each outbound link and the booking button using a configured email app.
- Confirm that your photos have useful descriptions and that all content is yours to publish.
