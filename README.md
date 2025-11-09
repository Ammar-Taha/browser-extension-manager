# Browser Extension Manager

> A polished front-end prototype for exploring, filtering, and managing browser extensions with light/dark theming.

[![Live Demo](https://img.shields.io/badge/demo-gh--pages-blue?style=flat-square)](https://ammar-taha.github.io/browser-extension-manager/)

![Browser Extension Manager preview](./assets/preview.jpg)

## Overview

This project recreates a browser extension manager dashboard with focus on clean UI, responsive layout, and theme accessibility. It is powered by vanilla JavaScript, Vite, and modern CSS architecture. Cards are populated from a local JSON dataset and respond to interactive filters and toggles.

## Features

- **Dynamic filtering** — switch between all, active, and inactive extensions while keeping card state in sync.
- **Light/Dark mode** — theme toggle with persisted preference, icon swap, and palette adjustments driven by CSS custom properties.
- **Responsive grid** — cards gracefully adapt from single column to multi-column layouts without stretching.
- **Accessible interactions** — keyboard focus styles, ARIA labelling, and descriptive button states.

## Tech Stack

- [Vite](https://vitejs.dev/) for local development and builds
- Plain JavaScript modules (ESM)
- Modern CSS with custom properties and container-aware utilities
- [normalize.css](https://necolas.github.io/normalize.css/) as a baseline
- [gh-pages](https://github.com/tschaub/gh-pages) for static deployment

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Ammar-Taha/browser-extension-manager.git
cd browser-extension-manager

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Vite will expose the app on `http://localhost:5173` by default; updates hot-reload automatically.

## Scripts

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Starts local development server           |
| `npm run build`   | Generates production assets in `dist/`    |
| `npm run preview` | Serves the production build locally       |
| `npm run deploy`  | Builds and publishes to GitHub Pages      |

## Deployment

The repository is configured to deploy to GitHub Pages. Running `npm run deploy` will:

1. Create a production build via `vite build`.
2. Push the `dist/` output to the `gh-pages` branch using the `gh-pages` package.

The live site is available here: **https://ammar-taha.github.io/browser-extension-manager/**

Make sure GitHub Pages is set to serve from the `gh-pages` branch under the repository settings.

## Project Structure

```
├── index.html
├── package.json
├── src
│   ├── data.js
│   ├── main.js
│   ├── index.css
│   └── style.css
└── vite.config.js
```

- `src/main.js` holds the UI logic, theme management, and filtering.
- `src/style.css` defines tokens, utilities, component styles, and theme surfaces.
- `data.js` exposes the extension data set as an ES module.

