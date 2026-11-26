# Website maintenance guide

## Editing the website

- Content and page metadata: the corresponding root HTML file.
- Shared layout, colours, typography and responsive design: assets/css/styles.css.
- Navigation, inquiry feedback and calculator: assets/js/script.js.
- Analytics Lab data generation, aggregation, charts and interactions: assets/js/lab.js.
- New images and icons: assets/images/.
- When modifying CSS or JS, update the asset query version in all HTML references to avoid stale browser caches.
- Preserve existing page URLs, canonical URLs and sitemap entries unless a deliberate URL migration is planned.

## Contact and privacy

The consultation form uses FormSubmit with a masked recipient identifier. The business inbox is not displayed in the current website HTML. The identifier is public routing information, not a secret. Keep spam prevention enabled. Name and business name are optional; email and the business question are required. Do not ask visitors for confidential customer records.

After any form change, submit a harmless test inquiry on the live site and verify receipt in the business inbox and the return confirmation. First-time endpoints may require activation. CI only mocks submission, so passing tests do not establish real email delivery. Review FormSubmit's data processing terms before accepting customer information. Keep privacy.html consistent with actual collection and processing.

## Analytics Lab

All nine dashboard models use synthetic data. Demonstrations support interactive filters, chart tooltips and drill-down. CSV export is intentionally disabled. Data delivered to a browser can be inspected in its source; never add real customer records or credentials to the repository.

## Search visibility

The canonical URLs and sitemap.xml use the GitHub Pages project URL. Verify the URL-prefix property in Google Search Console, submit the sitemap and request homepage indexing. Indexing and ranking are not guaranteed. Update canonical URLs, sitemap and the FormSubmit return address if a custom domain is adopted. A robots.txt for a host belongs at its root, not the project subdirectory.

## Release checklist

- Confirm the branch was based on current main.
- Review the PR diff and wait for all required checks.
- Owner merges using the configured protection workflow.
- Confirm GitHub Pages deployment succeeded for the new commit.
- Open the homepage, Analytics Lab and contact page on desktop and mobile.
- Test contact delivery when form behaviour changes.
- Confirm the development branch is deleted after merging, if configured.

## Historical versions

Old website ZIP files were removed from the current tree to keep the project tidy. Earlier versions remain in Git history; use commits or GitHub releases to identify versions instead of storing redundant archives in the deployed website tree. Existing old branches are not deleted by this cleanup.

## CI and troubleshooting

The CI workflow is .github/workflows/ci.yml; the required job remains website-tests. Playwright reports and screenshots are available as workflow artifacts for seven days. A red protected-ref warning with green checks may indicate that the owner-only access ruleset requires explicit bypass. Do not bypass failed quality checks or change the rulesets just to make a release pass.
