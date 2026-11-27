const {test,expect}=require('@playwright/test');
test('hero cycles through nine dashboards without name buttons',async({page})=>{
 await page.clock.install();
 await page.goto('./');
 const hero=page.locator('.hero-dashboard');
 await expect(hero.locator('.paneltop strong')).toHaveText('Business performance');
 await expect(hero.locator('.hero-dashboard-controls button')).toHaveCount(0);
 for(const key of ['customers','reliability','profit','product','funnel','efficiency','plan','billing']){
  await page.clock.runFor(2000);
  await expect(hero.locator('a.link')).toHaveAttribute('href',new RegExp('demo='+key+'$'));
  await expect(hero.locator('.hero-chart svg')).toBeVisible();
 }
 await page.clock.runFor(2000);
 await expect(hero.locator('.hero-chart > div')).toHaveCount(12);
 await page.clock.runFor(2000);
 await expect(hero.locator('.paneltop strong')).toHaveText('Customer analytics');
});
test('reduced motion keeps hero static',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('./');
 await expect(page.locator('.hero-dashboard .paneltop strong')).toHaveText('Business performance');
 await expect(page.locator('.hero-dashboard-controls button')).toHaveCount(0);
});
test('shared service examples and integration motion markup',async({page})=>{
 await page.goto('./');
 await expect(page.locator('.home-services .motion-example-card')).toHaveCount(6);
 await expect(page.locator('.integration-diagram .motion-flow-dot')).toHaveCount(3);
 await page.goto('pages/services/services.html');
 await expect(page.locator('.motion-example-card')).toHaveCount(6);
 await expect(page.locator('.motion-example-card').first()).toHaveAttribute('href',/consulting\.html$/);
 await page.goto('pages/solutions.html');
 await expect(page.locator('.motion-example-card')).toHaveCount(6);
});
test('integration flow stays active while visible without pause button',async({page})=>{
 await page.goto('./');
 const diagram=page.locator('.integration-diagram');
 await diagram.scrollIntoViewIfNeeded();
 await expect(diagram).toHaveClass(/motion-flow-running/);
 await expect(diagram.locator('.motion-flow-dot').first()).toHaveCSS('animation-iteration-count','infinite');
 await expect(page.locator('.integration-motion-controls')).toHaveCount(0);
 await expect(diagram).toHaveClass(/motion-flow-running/);
});
test('sample offer, transformation, and relevant service demo links',async({page})=>{
 await page.goto('./');
 const transform=page.locator('.dp-transform');
 await expect(transform).toBeVisible();
 await transform.scrollIntoViewIfNeeded();
 await expect(transform).toHaveClass(/dp-transform-play/);
 await expect(transform.locator('.dp-transform-dot')).toHaveCSS('animation-iteration-count','infinite');
 await expect(transform.locator('button')).toHaveCount(0);
 await expect(page.locator('.cta a.button')).toHaveAttribute('href',/sample=1/);
 await page.goto('pages/services/engineering.html');
 await expect(page.locator('.sidebox .dp-related-demo')).toHaveAttribute('href',/demo=reliability/);
 await page.goto('pages/analytics/work.html');
 await expect(page.locator('.dp-demo-preview a')).toHaveCount(3);
 await page.goto('pages/company/contact.html?sample=1');
 await expect(page.locator('.dp-sample-intent')).toBeVisible();
 await expect(page.locator('textarea[name="question"]')).toHaveAttribute('placeholder',/sample dashboard/i);
});

test('touch previews replay on return to view and sample CTA is not floating',async({page},info)=>{
 test.skip(!info.project.use.hasTouch,'Touch layouts only');
 await page.goto('./');
 const previews=page.locator('.samplecard .samplemini');
 await expect(previews).toHaveCount(3);
 for(const preview of await previews.all()){
  await preview.scrollIntoViewIfNeeded();
  await expect(preview).toHaveClass(/dp-preview-visible/);
  await page.evaluate(()=>window.scrollTo(0,0));
  await expect(preview).not.toHaveClass(/dp-preview-visible/);
  await preview.scrollIntoViewIfNeeded();
  await expect(preview).toHaveClass(/dp-preview-visible/);
 }
 await expect(page.locator('.dp-mobile-contact')).toHaveCount(0);
 await expect(page.locator('.cta a.button')).toHaveAttribute('href',/sample=1/);
 const card=page.locator('.home-services .motion-example-card').first();
 await card.scrollIntoViewIfNeeded();
 await expect(card.locator('.motion-card-description')).toHaveCSS('opacity','1');
 await expect(card.locator('.motion-example')).toHaveCSS('opacity','1');
 await page.goto('pages/services/services.html');
 await expect(page.locator('.dp-mobile-contact')).toHaveCount(0);
 await page.goto('pages/analytics/work.html');
 const tile=page.locator('.dp-demo-tile').first();
 await tile.scrollIntoViewIfNeeded();
 await expect(tile).toHaveClass(/dp-preview-visible/);
});
