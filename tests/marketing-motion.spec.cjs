const {test,expect}=require('@playwright/test');
test('hero preview switches nine dashboards and preserves links',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('./');
 const hero=page.locator('.hero-dashboard');
 await expect(hero.locator('.paneltop strong')).toHaveText('Business performance');
 await expect(hero.locator('.hero-dashboard-controls button')).toHaveCount(10);
 for(const [name,key] of [['Customers','customers'],['Operations','reliability'],['Profit','profit'],['Products','product'],['Funnel','funnel'],['Efficiency','efficiency'],['Planning','plan'],['Billing','billing']]){
  await hero.getByRole('button',{name,exact:true}).click();
  await expect(hero.locator('a.link')).toHaveAttribute('href',new RegExp('demo='+key+'$'));
  await expect(hero.locator('.hero-chart svg')).toBeVisible();
 }
 await hero.getByRole('button',{name:'Sales',exact:true}).click();
 await expect(hero.locator('.hero-chart > div')).toHaveCount(12);
});
test('automatic hero rotation and pause',async({page})=>{
 await page.goto('./');
 const hero=page.locator('.hero-dashboard');
 await expect(hero.locator('.paneltop strong')).toHaveText('Customer analytics',{timeout:10000});
 await hero.getByRole('button',{name:'Pause automatic dashboard rotation'}).click();
 await expect(hero.getByRole('button',{name:'Resume automatic dashboard rotation'})).toBeVisible();
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
test('integration flow stays active while visible and supports pause',async({page})=>{
 await page.goto('./');
 const diagram=page.locator('.integration-diagram');
 await diagram.scrollIntoViewIfNeeded();
 await expect(diagram).toHaveClass(/motion-flow-running/);
 await expect(diagram.locator('.motion-flow-dot').first()).toHaveCSS('animation-iteration-count','infinite');
 await page.getByRole('button',{name:'Pause data flow'}).click();
 await expect(diagram).not.toHaveClass(/motion-flow-running/);
 await page.getByRole('button',{name:'Play data flow'}).click();
 await expect(diagram).toHaveClass(/motion-flow-running/);
});
test('sample offer, transformation, and relevant service demo links',async({page})=>{
 await page.goto('./');
 const transform=page.locator('.dp-transform');
 await expect(transform).toBeVisible();
 await transform.getByRole('button',{name:'Replay transformation'}).click();
 await expect(transform).toHaveClass(/dp-transform-play/);
 await expect(page.locator('.cta a.button')).toHaveAttribute('href',/sample=1/);
 await page.goto('pages/services/engineering.html');
 await expect(page.locator('.sidebox .dp-related-demo')).toHaveAttribute('href',/demo=reliability/);
 await page.goto('pages/analytics/work.html');
 await expect(page.locator('.dp-demo-preview a')).toHaveCount(3);
 await page.goto('pages/company/contact.html?sample=1');
 await expect(page.locator('.dp-sample-intent')).toBeVisible();
 await expect(page.locator('textarea[name="question"]')).toHaveAttribute('placeholder',/sample dashboard/i);
});
