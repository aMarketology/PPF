# Placeholder Media List for Fire Up Hibachi Website

## Overview
This document lists all placeholder images and videos used throughout the website. Replace these with actual media files by adding them to the `/public` folder with these exact names.

---

## Homepage (`app/page.tsx`)

### Hero Section
- **hero-bg-hibachi.jpg** - Background image for hero section (recommended: 1920x1080px)

### About/Video Section
- **video-poster-cooking.jpg** - Video thumbnail/poster image (recommended: 1280x720px)
- **video-hibachi-cooking-demo.mp4** - Main cooking demonstration video (recommended: 1-2 minutes, 1080p)

### Services Section (Service Cards with Images)
- **service-corporate-events.jpg** - Corporate event hibachi setup (recommended: 800x600px)
- **service-wedding-catering.jpg** - Wedding/celebration hibachi catering (recommended: 800x600px)
- **service-private-party.jpg** - Private party/backyard setup (recommended: 800x600px)

### Menu Showcase Section
- **menu-filet-mignon.jpg** - Filet mignon hibachi dish (recommended: 600x600px square)
- **menu-lobster-tail.jpg** - Lobster tail dish (recommended: 600x600px square)
- **menu-shrimp-combo.jpg** - Shrimp and steak combo (recommended: 600x600px square)
- **menu-chicken-hibachi.jpg** - Chicken hibachi dish (recommended: 600x600px square)

### Gallery Preview Section
- **gallery-event-wedding-1.jpg** - Wedding reception setup (recommended: 600x600px square)
- **gallery-event-corporate-1.jpg** - Corporate event catering (recommended: 600x600px square)
- **gallery-food-steak-1.jpg** - Hibachi steak being cooked (recommended: 600x600px square)
- **gallery-chef-cooking-1.jpg** - Chef performing cooking (recommended: 600x600px square)
- **gallery-event-party-1.jpg** - Private party setup (recommended: 600x600px square)
- **gallery-food-shrimp-1.jpg** - Fresh shrimp on grill (recommended: 600x600px square)
- **gallery-setup-grill-1.jpg** - Professional hibachi grill setup (recommended: 600x600px square)
- **gallery-event-celebration-1.jpg** - Celebration event (recommended: 600x600px square)

---

## Services Page (`app/services/page.tsx`)

Currently using minimal placeholders. Consider adding:
- **service-detail-corporate.jpg** - Detailed corporate event image
- **service-detail-wedding.jpg** - Detailed wedding catering image
- **service-detail-private.jpg** - Detailed private party image
- **service-menu-packages.jpg** - Menu packages visual

---

## About Page (`app/about/page.tsx`)

Recommended placeholders to add:
- **about-chef-portrait.jpg** - Main chef portrait (recommended: 800x1000px)
- **about-team-photo.jpg** - Team group photo (recommended: 1200x800px)
- **video-about-story.mp4** - Business story/origin video (recommended: 2-3 minutes)
- **about-cooking-action.jpg** - Chef in action shot
- **about-setup-professional.jpg** - Professional setup image

---

## Gallery Page (`app/gallery/page.tsx`)

Expand with categorized images:

### Event Photos
- **gallery-event-wedding-2.jpg** through **gallery-event-wedding-10.jpg**
- **gallery-event-corporate-2.jpg** through **gallery-event-corporate-10.jpg**
- **gallery-event-party-2.jpg** through **gallery-event-party-10.jpg**

### Food Photos
- **gallery-food-filet-1.jpg** through **gallery-food-filet-5.jpg**
- **gallery-food-lobster-1.jpg** through **gallery-food-lobster-5.jpg**
- **gallery-food-shrimp-2.jpg** through **gallery-food-shrimp-5.jpg**
- **gallery-food-chicken-1.jpg** through **gallery-food-chicken-5.jpg**
- **gallery-food-vegetables-1.jpg** through **gallery-food-vegetables-5.jpg**

### Setup/Behind the Scenes
- **gallery-setup-grill-2.jpg** through **gallery-setup-grill-5.jpg**
- **gallery-setup-venue-1.jpg** through **gallery-setup-venue-5.jpg**
- **gallery-chef-preparing-1.jpg** through **gallery-chef-preparing-5.jpg**

---

## Contact Page (`app/contact/page.tsx`)

Recommended additions:
- **contact-map-location.jpg** - Map or location image
- **contact-chef-team.jpg** - Friendly team photo
- **contact-office-setup.jpg** - Office or prep area

---

## Existing Images in /public
Current files in your public folder:
- cali-2.png
- fireup-logo.png

---

## Image Specifications

### Recommended Formats
- **Photos**: .jpg or .webp (for better compression)
- **Logos/Graphics**: .png (with transparency if needed)
- **Videos**: .mp4 (H.264 codec, 1080p or 720p)

### Recommended Sizes
- **Hero backgrounds**: 1920x1080px or larger
- **Service cards**: 800x600px (4:3 ratio)
- **Menu items**: 600x600px (1:1 square)
- **Gallery**: 600x600px to 800x800px (square recommended for grid)
- **Full-width images**: 1600x900px minimum

### Optimization Tips
1. Compress images before uploading (use tools like TinyPNG, ImageOptim)
2. Target file sizes: <200KB for small images, <500KB for large images
3. Videos: Keep under 50MB for web, use compression
4. Consider using WebP format for better compression (convert .jpg to .webp)

---

## How to Replace Placeholders

1. **Add your actual images** to `/public` folder with the exact filenames listed above
2. **No code changes needed** - the image paths are already configured
3. **Test locally** by running `npm run dev` and viewing the site
4. **Fallback**: If an image is missing, it will show as broken - add the file to fix

---

## Priority Media to Add First

### High Priority (Site won't look good without these):
1. hero-bg-hibachi.jpg - Main hero background
2. video-hibachi-cooking-demo.mp4 - Main video showcase
3. All 4 menu images (menu-filet-mignon.jpg, etc.)
4. All 8 gallery preview images

### Medium Priority:
1. Service card images (3 images)
2. Video poster image
3. Additional gallery images

### Low Priority:
1. About page media
2. Contact page images
3. Extended gallery collections

---

## Notes
- All paths are relative to the `/public` folder
- In Next.js, `/public/image.jpg` is referenced as `/image.jpg` in the code
- Images are set to responsive and will scale automatically
- Videos include fallback text for browsers that don't support HTML5 video

