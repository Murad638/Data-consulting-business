# DataProfit — launch readiness

Static HTML/CSS/JavaScript site. All dashboards use synthetic data for interactive viewing only; CSV export is intentionally disabled. Charts support hover/tap values, month and segment drill-down and legend emphasis. Browser-delivered demo data is not confidential and can be inspected in source code.

## Local development
Run `npm install`, `npx playwright install chromium`, then `npm test`. CI validates JavaScript, chart arithmetic, SEO, links, responsive layouts, calculator and mocked form submission. Browser reports and screenshots are uploaded as artifacts. No real email is sent by CI.

## Contact form
The form uses FormSubmit.co and the existing business Gmail address. After approved deployment, submit a dummy inquiry from the live site, open the activation email in the business inbox, then send another dummy inquiry and verify delivery. Keep spam prevention enabled. Review provider privacy and processing terms before accepting customer inquiries. Visitors send inquiries in the browser without opening an email app, and return to the website after submission. Direct email remains available as an optional fallback. No API keys are needed in the repository.

## Search visibility
The sitemap and canonical URLs use https://murad638.github.io/Data-consulting-business/. After deployment, verify that URL-prefix property in Google Search Console, submit sitemap.xml and request homepage indexing. Robots.txt belongs at the hostname root, not this project subdirectory. Update URLs when moving to a custom domain. Indexing and ranking are not guaranteed.

## Workflow
Create a fresh Murad_Khalilov branch from main, run checks and request review before merging. Merged branches are automatically deleted. Do not merge before deployment approval because GitHub Pages may deploy main automatically.
