const {test,expect}=require('@playwright/test');
test('hero preview switches dashboards, preserves links and can be paused',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('./');
 const hero=page.locator('.hero-dashboard');
 await expect(hero.locator('.paneltop strong')).toHaveText('Business performance');
 await hero.getByRole('button',{name:'Customers',exact:true}).click();
 await expect(hero.locator('.paneltop strong')).toHaveText('Customer analytics');
 await expect(hero.locator('.hero-kpis')).toContainText('38%');
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
