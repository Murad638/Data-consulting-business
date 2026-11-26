# DataProfit

Independent data consulting website for small and growing businesses, based in Estonia and working in English.

[Live website](https://murad638.github.io/Data-consulting-business/) · [CI and deployments](https://github.com/Murad638/Data-consulting-business/actions)

## Overview

DataProfit presents consulting, engineering, business intelligence, reporting automation, modelling and ongoing data partnership services. Its Analytics Lab demonstrates nine interactive analytics models and a profit scenario calculator using synthetic data. The consultation form sends inquiries through FormSubmit using a masked recipient identifier.

The website uses plain HTML, CSS and JavaScript and runs on GitHub Pages. No application backend, database or customer dataset is required. Node.js and Playwright are development and testing tools only.

## Repository structure

```text
Data-consulting-business/
├── docs/                         # Only the public website is published
│   ├── index.html                # Homepage
│   ├── sitemap.xml
│   ├── .nojekyll
│   ├── pages/
│   │   ├── services/
│   │   │   ├── services.html      # Service overview
│   │   │   ├── consulting.html
│   │   │   ├── engineering.html
│   │   │   ├── intelligence.html
│   │   │   ├── automation.html
│   │   │   ├── modelling.html
│   │   │   └── partnership.html
│   │   ├── analytics/work.html    # Analytics Lab and calculator
│   │   ├── company/
│   │   │   ├── about.html
│   │   │   ├── contact.html
│   │   │   └── privacy.html
│   │   └── solutions.html
│   └── assets/
│       ├── css/styles.css
│       ├── js/
│       │   ├── script.js          # Navigation, forms, calculator
│       │   └── lab.js             # Demo data, metrics and charts
│       └── images/favicon.svg
├── documentation/
│   └── maintenance.md
├── tests/                        # Unit tests, browser tests, local server
├── .github/
│   ├── workflows/                # CI, labeling and issue summaries
│   └── labeler.yml
├── .gitignore
├── package.json
├── playwright.config.cjs
└── README.md
```

The `docs/` name is required by GitHub Pages' branch-based subdirectory publishing option. Repository documentation, tests and tooling remain outside the published folder. Old ZIP snapshots are removed from the current tree; earlier versions remain in Git history.

## Local development

Prerequisite: Node.js 22 and npm.

```bash
npm install
npx playwright install chromium
node tests/server.cjs
```

Open http://127.0.0.1:4173/Data-consulting-business/. Stop the local server with Ctrl+C before running browser tests (Playwright starts its own server).

## Testing

```bash
npm test
```

- `npm run test:unit`: JavaScript syntax, analytics arithmetic, local asset/link resolution and SEO metadata.
- `npm run test:browser`: desktop, tablet and mobile navigation, responsive layout, charts, calculator and mocked contact submission.
- GitHub Actions runs both suites and uploads browser reports. CI does not send real email.

## Deploy to GitHub Pages

One-time setup after merging the folder migration into main:

1. Open repository Settings → Pages.
2. Under Build and deployment, choose **Deploy from a branch**.
3. Select branch **main** and folder **/docs**, then click Save.
4. Check the Pages deployment in Actions and open the live website.

The homepage and sitemap retain their public URLs. Individual pages now live under /pages/; old flat page URLs are not retained. Update any external links and resubmit the sitemap in Search Console. The FormSubmit return address and page canonical URLs have been updated to the new paths. Test real inquiry delivery after deployment.

Do not choose the repository root as the publishing source after the migration: it no longer contains index.html.

## Development workflow

1. Create a fresh `Murad_Khalilov` branch from current `main`.
2. Make changes, run tests and open a pull request.
3. Wait for the required `website-tests` check and review.
4. The repository owner merges. The owner-only ruleset may require explicit bypass; the separate Production Quality ruleset requires passing checks.
5. GitHub Pages deploys main automatically once configured. Verify the new deployment.

Do not push directly to main or merge on behalf of the owner. Technical identity separation depends on the integration's permissions.

## Maintenance

See [the maintenance guide](documentation/maintenance.md) for page editing, contact verification, analytics data, search visibility and release checks.
