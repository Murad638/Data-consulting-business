const {test,expect}=require('@playwright/test');
test('ProDelta dark branding, homepage story and responsive layout', async ({page},info)=>{
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await expect(page.locator('body')).toHaveCSS('background-color','rgb(250, 251, 254)');
  const card=page.locator('.prodelta-story-card');
  async function checkBrandCard(dark){
    await expect(card).toHaveCSS('background-color',dark?'rgb(24, 33, 31)':'rgb(255, 255, 255)');
    await expect(card.locator('.prodelta-wordmark-large')).toHaveCSS('font-weight','400');
    await expect(card.locator('.prodelta-wordmark-large em')).toHaveCSS('color',dark?'rgb(83, 199, 186)':'rgb(8, 127, 120)');
    for(const [i,label] of ['PRO','Δ'].entries()){
      const row=card.locator('.prodelta-story-row').nth(i),symbol=row.locator('.prodelta-story-symbol');
      await expect(symbol).toHaveText(label);await expect(symbol).toBeVisible();
      await expect(symbol).toHaveCSS('color',dark?'rgb(57, 201, 112)':'rgb(19, 124, 70)');
      const layout=await row.evaluate(el=>{const a=el.firstElementChild.getBoundingClientRect(),b=el.lastElementChild.getBoundingClientRect();return {left:a.right<=b.left,overflow:el.scrollWidth>el.clientWidth+2}});
      expect(layout.left).toBeTruthy();expect(layout.overflow).toBeFalsy();
    }
    await expect(card.locator('.prodelta-story-row h3').first()).toHaveCSS('color',dark?'rgb(243, 246, 245)':'rgb(16, 36, 58)');
    const geometry=await card.evaluate(el=>{const a=el.querySelector('.prodelta-story-top').getBoundingClientRect(),b=el.querySelector('.prodelta-story-values').getBoundingClientRect(),c=el.getBoundingClientRect();return {desktop:innerWidth>760,sideBySide:a.right<=b.left,stacked:a.bottom<=b.top,width:c.width,height:c.height}});
    expect(geometry.desktop?geometry.sideBySide:geometry.stacked).toBeTruthy();
    if(geometry.desktop&&geometry.width>=1000)expect(geometry.height).toBeLessThan(350);
  }
  await checkBrandCard(false);
  await card.screenshot({path:info.outputPath('prodelta-light-brand-card.png')});
  await page.screenshot({path:info.outputPath('prodelta-light-homepage.png'),fullPage:true,animations:'disabled'});
  await page.getByRole('button',{name:'Switch to dark theme'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await checkBrandCard(true);
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
  await expect(page.locator('.lab')).toHaveCSS('background-color','rgb(24, 33, 31)');
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

test('integration and all nine Analytics Lab panels follow selected theme',async({page},info)=>{
 await page.goto('./');
 const diagram=page.locator('.integration-diagram');
 await expect(diagram).toHaveCSS('background-color','rgb(255, 255, 255)');
 await page.getByRole('button',{name:'Switch to dark theme'}).click();
 await expect(diagram).toHaveCSS('background-color','rgb(24, 33, 31)');
 await expect(diagram.locator('.integration-source').first()).toHaveCSS('background-color','rgb(27, 54, 48)');
 await diagram.screenshot({path:info.outputPath('prodelta-dark-integration.png'),animations:'disabled'});
 await page.goto('pages/analytics/work.html');
 const lab=page.locator('[data-lab]');
 await expect(lab).toHaveCSS('background-color','rgb(24, 33, 31)');
 await expect(lab.locator('.labmetric').first()).toHaveCSS('background-color','rgb(27, 54, 48)');
 await expect(lab.locator('.subchart').first()).toHaveCSS('background-color','rgb(20, 29, 27)');
 await expect(lab.locator('svg text[fill="#405569"]').first()).toHaveCSS('fill','rgb(168, 187, 181)');
 await lab.screenshot({path:info.outputPath('prodelta-dark-analytics.png'),animations:'disabled'});
 for(const key of ['sales','funnel','profit','product','reliability','efficiency','customers','plan','billing']){
  await lab.locator('[data-demo="'+key+'"]').click();
  await expect(lab.locator('.labmetric')).toHaveCount(4);
  await lab.locator('[data-period]').selectOption('first');
  await lab.locator('[data-segment]').selectOption({index:1});
  await expect(lab.locator('tbody tr')).toHaveCount(1);
  await expect(lab.locator('[data-results]')).not.toContainText(/NaN|Infinity|undefined/);
  await lab.locator('[data-labreset]').click();
 }
 await page.getByRole('button',{name:'Switch to light theme'}).click();
 await expect(lab).toHaveCSS('background-color','rgb(255, 255, 255)');
 await page.goto('./');
 await expect(diagram).toHaveCSS('background-color','rgb(255, 255, 255)');
});

test('default light even with dark system preference; dark calculator and animated filenames',async({page},info)=>{
 await page.emulateMedia({colorScheme:'dark'});
 await page.goto('./');
 await expect(page.locator('html')).toHaveAttribute('data-theme','light');
 await page.getByRole('button',{name:'Switch to dark theme'}).click();
 const files=page.locator('.dp-file-list span');
 await files.first().scrollIntoViewIfNeeded();
 await expect(files).toHaveCount(4);
 await expect(files.first()).toHaveCSS('color','rgb(241, 232, 230)');
 await expect.poll(()=>files.first().evaluate(el=>{const s=getComputedStyle(el);return ['rgb(38, 31, 30)','rgb(66, 43, 40)'].includes(s.backgroundColor)||s.animationName==='pd-dark-old-file'})).toBeTruthy();
 await page.goto('pages/analytics/work.html');
 const calc=page.locator('#calculator');
 await expect(calc.locator('.simulator')).toHaveCSS('background-color','rgb(24, 33, 31)');
 await expect(calc.locator('.result')).toHaveCSS('background-color','rgb(20, 29, 27)');
 await expect(calc.locator('#profit')).toHaveText('€3,600');
 await calc.locator('#range5').evaluate(el=>{el.value='20';el.dispatchEvent(new Event('input',{bubbles:true}))});
 await expect(calc.locator('#profit')).toHaveText('€4,880');
 await calc.locator('[data-reset]').click();
 await expect(calc.locator('#profit')).toHaveText('€3,600');
 for(const width of info.project.name==='mobile'?[320,375,390,430]:info.project.name==='tablet'?[820,1024]:[1280,1440,1920]){
  await page.setViewportSize({width,height:900});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBeLessThanOrEqual(2);
  await expect(calc.locator('.result')).toBeVisible();
 }
 await calc.screenshot({path:info.outputPath('prodelta-dark-calculator.png'),animations:'disabled'});
 await page.getByRole('button',{name:'Switch to light theme'}).click();
 await expect(calc.locator('.simulator')).toHaveCSS('background-color','rgb(255, 255, 255)');
 await page.reload();
 await expect(page.locator('html')).toHaveAttribute('data-theme','light');
});
