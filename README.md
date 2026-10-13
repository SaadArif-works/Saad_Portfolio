# Saad | Digital Marketing Portfolio

A modern, single-page personal portfolio built with plain **HTML, CSS and JavaScript**.
No installs, no build tools, no paid services.

## How to run it (VS Code + Live Server on Windows 11)

1. Extract the ZIP file (right-click the ZIP, choose **Extract All...**, then **Extract**).
2. Open **VS Code**. Choose **File > Open Folder...** and select the extracted `saad-portfolio` folder.
3. Install the **Live Server** extension if you don't have it. Click the Extensions icon (left bar), search for `Live Server` by Ritwick Dey, and click **Install**.
4. In the Explorer panel, right-click `index.html` and choose **Open with Live Server**.
5. Your browser opens the website. Saving any file in VS Code refreshes the page automatically.

You can also double-click `index.html` to open it directly in a browser. Everything works that way too.

## Folder structure

```
saad-portfolio/
├── index.html          The whole page (all sections)
├── css/
│   └── style.css       All colors, layout and animations
├── js/
│   └── script.js       Menu, scroll effects, project popups, contact form
├── assets/
│   ├── favicon.svg     Small "S" logo shown in the browser tab
│   └── images/         All the photographs used on the website (JPG)
└── README.md
```

## Photos

All photographs are real photos from Unsplash and Pexels, which allow free use. None of the photos show people.
They were resized and compressed, so the whole `images` folder is only about 1 MB.

| Section | Photo file(s) |
|---|---|
| Home (hero) | `hero.jpg` |
| About | `about.jpg` |
| Skills (three photo cards) | `skill-planning.jpg`, `skill-design.jpg`, `skill-devices.jpg` |
| Project 1: Social Media Content Design | `project-social.jpg` |
| Project 2: Digital Brand Identity Concept | `project-brand.jpg` |
| Project 3: Digital Marketing Campaign Plan | `project-campaign.jpg` |
| Creative Showcase | `showcase-workspace.jpg`, `showcase-print.jpg`, `showcase-laptop.jpg`, `showcase-notes.jpg`, `showcase-desk.jpg`, `showcase-design.jpg` |
| Contact (panel background) | `contact.jpg` |
| About boxes: Always Learning, Creative Thinking, Growing Every Day | `card-learning.jpg`, `card-creative-thinking.jpg`, `card-growing.jpg` |
| Skills boxes: Social Media Marketing, Content Creation, Digital Branding | `card-social.jpg`, `card-content-creation.jpg`, `card-branding.jpg` |
| Skills boxes: Content Planning, Creative Strategy, Digital Marketing Fundamentals | `card-planning.jpg`, `card-strategy.jpg`, `card-fundamentals.jpg` |

Photo credits (Pexels or Unsplash): Caio, Camila Bou, Alexa Williams, Arthur Lambillotte, Eva Bronzini, Rickie-Tom Schünemann, Walls.io, Yen Vu, Iclal Capoglu Cinal, Deliberate Directions, Mariia Berezovsky, Nick Morrison, Tony Chen, Felipe Furtado, Campaign Creators and Alessio Zaccaria.

To swap a photo, save your new image in `assets/images/` with the same file name (a similar shape works best), or change the file name in `index.html`.

## Publishing on GitHub Pages

All file paths are relative (for example `assets/images/hero.jpg`) and the file names are lowercase with no spaces, so the site works unchanged on GitHub Pages. Upload the contents of the `saad-portfolio` folder (so `index.html` is at the top level of the repository) and turn on Pages in the repository settings.

## Things to personalise

### 1. Your email address
Open `js/script.js`. At the top, change this line to your real email:

```js
var CONTACT_EMAIL = 'your.email@example.com';
```

Also change the same address in `index.html` (search for `your.email@example.com`) so it is correct even before the script runs.

### 2. Your social links
In `index.html`, search for `linkedin.com`, `instagram.com` and `github.com`. There are two places for each one (Contact section and Footer). Replace each link with your own profile address.

### 3. Your text
All the text is in `index.html`. Edit it in any section. Project popup text sits inside the `<template>` tag under each project card.

### 4. Colors
Open `css/style.css`. The palette is at the top, inside `:root { ... }`. Change a color there and it updates across the site.

## About the contact form

This is a simple website without a server, so the form cannot send emails by itself. When someone fills it in and clicks **Send Message**, it opens their email app with the message already written and addressed to you. If their email app does not open, a **Copy message** button appears so they can paste it into any email.

If you want messages to arrive directly later, you can connect a free form service (for example Formspree). That is optional and not needed for this assignment.

## About the projects

The three projects are **practice concepts** made for learning. They are not client work and they do not show real results. Each **View Project** button opens a popup with more details about the concept.

## Fonts

The site uses the Google fonts *Sora* and *DM Sans*. If you are offline, it automatically switches to clean system fonts and still looks good.
