const {test,expect}=require('@playwright/test');
test('hero preview switches dashboards, preserves links and can be paused',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('./');
 const hero=page.locator('.hero-dashboard');
 await expect(hero.locator('.paneltop strong')).toHaveText('Business performance');
 await hero.getByRole('button',{name:'Customers',exact:true}).click();
 await expect(hero.locator('.paneltop strong')).toHaveText('Customer analytics');
 await expect(hero.locator('.hero-kpis')).toContainText('Repeat share');
 await expect(hero.locator('.hero-dashboard-controls button')).toHaveCount(10);
 for(const [name,key] of [['Profit','profit'],['Products','product'],['Funnel','funnel'],['Efficiency','efficiency'],['Planning','plan'],['Billing','billing']]){
  await hero.getByRole('button',{name,exact:true}).click();
  await expect(hero.locator('a.link')).toHaveAttribute('href',new RegExp('demo='+key+'
 await expect(hero.locator('a.link')).toHaveAttribute('href',/demo=customers$/);
 await hero.getByRole('button',{name:'Operations',exact:true}).click();
 await expect(hero.locator('.paneltop strong')).toHaveText('Pipeline reliability');
 await expect(hero.locator('a.link')).toHaveAttribute('href',/demo=reliability$/);
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
));
  await expect(hero.locator('.hero-chart svg')).toBeVisible();
 }
 await expect(hero.locator('a.link')).toHaveAttribute('href',/demo=customers$/);
 await hero.getByRole('button',{name:'Operations',exact:true}).click();
 await expect(hero.locator('.paneltop strong')).toHaveText('Pipeline reliability');
 await expect(hero.locator('a.link')).toHaveAttribute('href',/demo=reliability$/);
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
 const control=page.getByRole('button',{name:'Pause data flow'});
 await control.click();
 await expect(diagram).not.toHaveClass(/motion-flow-running/);
 await page.getByRole('button',{name:'Play data flow'}).click();
 await expect(diagram).toHaveClass(/motion-flow-running/);
});
