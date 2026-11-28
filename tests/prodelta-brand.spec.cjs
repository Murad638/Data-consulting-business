const {test,expect}=require('@playwright/test');
test('ProDelta dark branding, homepage story and responsive layout', async ({page},info)=>{
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await expect(page.locator('body')).toHaveCSS('background-color','rgb(250, 251, 254)');
  const card=page.locator('.prodelta-story-card');
  async function checkBrandCard(){
    await expect(card).toHaveCSS('background-color','rgb(0, 0, 0)');
    await expect(card.locator('.prodelta-wordmark-large')).toHaveCSS('font-weight','400');
    await expect(card.locator('.prodelta-wordmark-large em')).toHaveCSS('color','rgb(22, 141, 133)');
    for(const [i,label] of ['PRO','Δ'].entries()){
      const row=card.locator('.prodelta-story-row').nth(i),symbol=row.locator('.prodelta-story-symbol');
      await expect(symbol).toHaveText(label);await expect(symbol).toBeVisible();
      await expect(symbol).toHaveCSS('color','rgb(32, 185, 87)');
      const layout=await row.evaluate(el=>{const a=el.firstElementChild.getBoundingClientRect(),b=el.lastElementChild.getBoundingClientRect();return {left:a.right<=b.left,overflow:el.scrollWidth>el.clientWidth+2}});
      expect(layout.left).toBeTruthy();expect(layout.overflow).toBeFalsy();
    }
    await expect(card.locator('.prodelta-story-row h3').first()).toHaveCSS('color','rgb(255, 255, 255)');
  }
  await checkBrandCard();
  await card.screenshot({path:info.outputPath('prodelta-light-brand-card.png')});
  await page.screenshot({path:info.outputPath('prodelta-light-homepage.png'),fullPage:true,animations:'disabled'});
  await page.getByRole('button',{name:'Switch to dark theme'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await checkBrandCard();
  await expect(page.locator('.site-header .brand')).toHaveAccessibleName('ProDelta home');
  await expect(page.locator('.site-header .brand')).toContainText('PROΔELTA');
  await expect(page.locator('body')).toHaveCSS('background-color','rgb(16, 20, 19)');
  await expect(page.locator('.hero-dashboard')).toHaveCSS('background-color','rgb(255, 255, 255)');
  await expect(page.locator('.prodelta-story')).toContainText('Professionalism for us.');
  await expect(page.locator('.prodelta-story')).toContainText('Profit for you.');
  await expect(page.locator('.prodelta-story h2')).toHaveText('Together, we make a positive difference.');
  await page.locator('.prodelta-story').scrollIntoViewIfNeeded();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
  await page.locator('.prodelta-story').screenshot({path:info.outputPath('prodelta-story.png')});
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  await page.screenshot({path:info.outputPath('prodelta-homepage.png'),fullPage:true,animations:'disabled'});
  await page.goto('pages/company/contact.html');
  await expect(page.locator('.site-header .brand')).toHaveAccessibleName('ProDelta home');
  await expect(page.locator('input[name="_subject"]')).toHaveValue('ProDelta website inquiry');
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.goto('pages/analytics/work.html');
  await expect(page.locator('.lab')).toBeVisible();
  await expect(page.locator('.lab')).toHaveCSS('background-color','rgb(255, 255, 255)');
  await page.getByRole('button',{name:'Switch to light theme'}).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await expect(page.locator('body')).toHaveCSS('background-color','rgb(250, 251, 254)');
});

test('dark theme all pages, local links and analytics tooltip interaction',async({page},info)=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('./');
  await page.getByRole('button',{name:'Switch to dark theme'}).click();
  for(const file of ['index.html','pages/services/services.html','pages/solutions.html','pages/analytics/work.html','pages/company/about.html','pages/company/contact.html','pages/services/consulting.html','pages/services/engineering.html','pages/services/intelligence.html','pages/services/automation.html','pages/services/modelling.html','pages/services/partnership.html','pages/company/privacy.html']){
    expect((await page.goto(file)).status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
    await expect(page.locator('main h1')).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBeLessThanOrEqual(2);
  }
  await page.goto('pages/analytics/work.html?demo=plan');
  const lab=page.locator('[data-lab]'),tip=lab.locator('.chart-tooltip');
  await lab.locator('.chart-month[data-month="Jan"]').focus();
  await expect(tip).toBeVisible();
  await expect(tip).toContainText('Variance');
  await lab.locator('.chart-month[data-month="Jan"]').press('Enter');
  await expect(lab.locator('[data-month-filter]')).toHaveValue('Jan');
  const help=lab.locator('.labmetric .metric-help').first();
  await help.focus();await expect(tip).toBeVisible();
  await page.keyboard.press('Escape');await expect(tip).toBeHidden();
  await help.scrollIntoViewIfNeeded();
  if(info.project.use.hasTouch)await help.tap();else await help.click();
  await expect(tip).toBeVisible();
  await page.evaluate(()=>window.scrollBy(0,100));
  await expect(tip).toBeHidden();
  expect(errors).toEqual([]);
});
