# LinkPull

Export your LinkedIn posts with impressions, stats, and images. Privacy-first, no server.

## Features

- **Extract posts** from any LinkedIn profile's Activity page (yours or others)
- **Filter** by date range (all time, 1 year, 6 months, 3 months, custom) and minimum engagement (impressions, reactions, comments, reposts)
- **Export** as CSV, JSON (single file or one per post), or copy to clipboard
- **Download images** bundled in a ZIP archive
- **Stats dashboard** with totals and averages for impressions, reactions, comments, reposts
- **Two-pass extraction** for fast, reliable scrolling (preloads LinkedIn's cache, then extracts)
- **Bilingual** interface (English / French, auto-detected)
- **Dark mode** follows your system preference
- **Privacy-first** — all processing happens locally in your browser, no data is sent anywhere

## Install

### Chrome Web Store

Coming soon.

### From source

Requires **Node 22+** (Vite 7 needs `crypto.hash`).

```bash
# Install dependencies
bun install --ignore-scripts
npx wxt prepare

# Development (hot reload)
npx wxt

# Production build
npx wxt build
```

The built extension will be in `.output/chrome-mv3/`. Load it in Chrome via `chrome://extensions` > "Load unpacked".

### Firefox

```bash
npx wxt build -b firefox
```

## Usage

1. Open any LinkedIn profile's **Activity** page (`linkedin.com/in/.../recent-activity/all/`)
2. Open the LinkPull side panel
3. Set your filters (date range, minimum engagement)
4. Click **Extract posts**
5. Export as CSV, JSON, or copy to clipboard

## Tech stack

- [WXT](https://wxt.dev) v0.20 — browser extension framework
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) v4
- [TypeScript](https://www.typescriptlang.org) 5
- Chrome Manifest V3, Side Panel API

## Scripts

| Command | Description |
|---------|-------------|
| `npx wxt` | Dev mode with hot reload |
| `npx wxt build` | Production build for Chrome |
| `npx wxt build -b firefox` | Production build for Firefox |
| `npx wxt zip` | Build + package as ZIP |
| `bun run lint` | Run ESLint (includes Prettier formatting checks) |
| `bun run lint:fix` | Auto-fix lint + formatting |
| `bun run compile` | TypeScript type check |

## Project structure

```
entrypoints/
  background.ts          # Service worker (messaging hub)
  content.ts             # Content script (injected into LinkedIn)
  sidepanel/             # Side panel UI (React)
    App.tsx              # View router
    features/
      extraction/        # Scrolling, progress, extraction logic
      filters/           # Date range, engagement filters, export options
      results/           # Stats, post list, export actions
    components/          # Shared UI (Header, Footer, Icons, etc.)
    hooks/               # Shared hooks (useSettings)
    utils/               # Formatting helpers
lib/
  extractor.ts           # DOM scraping + two-pass scroll strategy
  page-detector.ts       # Profile context detection
  selectors.ts           # LinkedIn DOM selectors
  exporter.ts            # CSV/JSON/ZIP generation
  messages.ts            # Type-safe messaging protocol
  i18n/                  # Translations (en, fr)
  types.ts               # Shared types
```

## License

[AGPL-3.0](LICENSE) — free to use, modify, and distribute. Any modifications or derivative works must also be open-sourced under AGPL-3.0. For commercial licensing, [contact me](https://github.com/magrinj).

## Support

If you find LinkPull useful, consider [buying me a coffee](https://buymeacoffee.com/magrinj).
