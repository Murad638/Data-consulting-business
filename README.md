# DataProfit

Independent data consulting website for small and growing businesses, based in Estonia and working in English.

[Live website](https://murad638.github.io/Data-consulting-business/) · [CI and deployments](https://github.com/Murad638/Data-consulting-business/actions)

## What this project does

- Explains consulting, engineering, business intelligence, reporting automation, modelling and ongoing data partnership services.
- Demonstrates nine interactive analytics models and a profit scenario calculator using synthetic data.
- Accepts consultation inquiries through FormSubmit using a masked recipient identifier.

This is a static HTML, CSS and JavaScript website, hosted on GitHub Pages. There is no application backend, database or production client dataset. Node.js is used for local testing only.

## Repository structure

```text
Data-consulting-business/
├── index.html                 # Homepage
├── about.html                 # About the practice
├── services.html              # Service overview
├── consulting.html            # Consulting
├── engineering.html           # Data engineering
├── intelligence.html          # Business intelligence
├── automation.html            # Reporting automation
├── modelling.html             # Data modelling
├── partnership.html           # Ongoing partnership
├── solutions.html             # Business use cases
├── work.html                  # Analytics Lab and calculator
├── contact.html               # Consultation inquiry
├── privacy.html               # Privacy and data handling
├── sitemap.xml                # Search engine sitemap
├── assets/
│   ├── css/styles.css         # Shared visual styles
│   ├── js/script.js           # Navigation, forms and calculator
│   ├── js/lab.js              # Synthetic data, metrics and charts
│   └── images/favicon.svg     # Site icon
├── tests/                     # Unit tests, browser tests, local server
├── docs/                      # Maintenance and release guide
├── .github/
│   ├── workflows/             # CI, labelling and issue summary
│   └── labeler.yml
├── package.json
├── playwright.config.cjs
└── README.md
```

HTML pages stay at the repository root intentionally: GitHub Pages publishes from the existing root and established page URLs must remain valid. Assets are grouped by responsibility. Old ZIP snapshots are no longer in the current tree; Git history retains earlier versions.

## Run locally

Prerequisite: Node.js 22 and npm.

```bash
npm install
npx playwright install chromium
node tests/server.cjs
```

Open http://127.0.0.1:4173/Data-consulting-business/ in a browser. Stop the server with Ctrl+C before running browser tests (the test runner starts its own server).

## Run tests

```bash
npm test
```

Use `npm run test:unit` for JavaScript syntax, dashboard arithmetic, asset references and SEO checks, or `npm run test:browser` for Playwright tests of links, responsive layouts, navigation, calculator, charts and the inquiry form. Browser tests cover desktop, tablet and mobile. Form submission is mocked; CI never sends a real inquiry.

## Development and deployment

1. Start a fresh `Murad_Khalilov` branch from the current `main`.
2. Make changes, run tests and open a pull request.
3. Wait for the required `website-tests` check and review the changes.
4. The repository owner performs the merge. The owner-only ruleset may require an explicit bypass checkbox; the separate Production Quality ruleset requires passing tests.
5. GitHub Pages deploys `main` automatically. Verify the deployment and live website.

Do not push directly to `main`, disable protections or merge on behalf of the owner. The owner-only bypass configuration does not establish independent human identity if an integration uses the owner's credentials.

## Maintenance

See [Maintenance guide](docs/maintenance.md) for asset changes, contact verification, search visibility, demo data and release checks.
