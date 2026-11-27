'use strict';
const fmt=n=>new Intl.NumberFormat('en-IE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n);
function initPage(){
 const nav=document.querySelector('.nav'),toggle=document.querySelector('.navtoggle');
 if(toggle){toggle.onclick=()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));};}
 document.querySelectorAll('.drop').forEach(d=>{d.open=false;}); if(nav){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
 const file=(window.previewRoute||location.pathname.split('/').pop()||'index.html').split(/[?#]/)[0];
 document.querySelectorAll('.nav a').forEach(a=>{if(new URL(a.href,location.href).pathname.split('/').pop()===file)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 if(typeof initLabs==='function')initLabs();
 document.querySelectorAll('[data-simulator]').forEach(root=>{
 const ranges=[...root.querySelectorAll('input')],get=id=>root.querySelector('#'+id);
 const labels=['Product & fulfilment','Advertising','Fixed costs','Illustrative tax','Net profit'],colors=['#146c94','#d97706','#64748b','#b53a43','#087f78'];
 function calc(){const [base,product,ads,fixed,taxRate,change]=ranges.map(r=>+r.value);
 ranges.forEach((r,i)=>get('val'+i).textContent=[0,3].includes(i)?fmt(+r.value):(+r.value>0&&i===5?'+':'')+r.value+'%');
 const model=revenue=>{const p=revenue*product/100,ad=revenue*ads/100,op=revenue-p-ad-fixed,tax=Math.max(0,op)*taxRate/100;return {p,ad,op,tax,net:op-tax}};
 const revenue=base*(1+change/100),m=model(revenue),baseline=model(base),variable=(product+ads)/100,be=variable<1?fixed/(1-variable):null;
 get('profit').textContent=fmt(m.net);get('profit').classList.toggle('loss',m.net<0);
 get('margin').textContent=revenue?(m.net/revenue*100).toFixed(1)+'%':'N/A';
 for(const [id,value] of Object.entries({scenarioRevenue:revenue,operatingProfit:m.op,taxAmount:m.tax,profitChange:m.net-baseline.net,totalCost:m.p+m.ad+fixed+m.tax}))get(id).textContent=fmt(value);
 get('breakEven').textContent=be===null?'Not achievable':fmt(be);
 const amounts=[m.p,m.ad,fixed,m.tax,Math.max(0,m.net)],total=Math.max(1,...[amounts.reduce((a,b)=>a+b,0)]);
 get('costbars').innerHTML=amounts.map((n,i)=>'<span style="width:'+(n/total*100)+'%;background:'+colors[i]+'"></span>').join('');
 get('costlegend').innerHTML=labels.map((label,i)=>'<div><i style="background:'+colors[i]+'"></i><span>'+label+'</span><b>'+fmt(amounts[i])+'</b></div>').join('');
 }ranges.forEach(r=>r.oninput=calc);root.querySelector('[data-reset]').onclick=()=>{ranges.forEach(r=>r.value=r.defaultValue);calc()};calc();
 });
 document.querySelectorAll('.static-help').forEach(button=>{const explanation=button.nextElementSibling;const set=open=>{explanation.hidden=!open;button.setAttribute('aria-expanded',String(open));};button.addEventListener('click',()=>set(explanation.hidden));button.addEventListener('keydown',e=>{if(e.key==='Escape')set(false);});document.addEventListener('pointerdown',e=>{if(!button.contains(e.target)&&!explanation.contains(e.target))set(false);});document.addEventListener('scroll',()=>{if(!explanation.hidden)set(false);},{capture:true,passive:true});});
 const form=document.querySelector('#inquiry');if(form){
 const map={consulting:'Data consulting',engineering:'Data engineering',intelligence:'Business intelligence',automation:'Reporting automation',modelling:'Data modelling',partnership:'Ongoing data partnership'};
 const params=new URLSearchParams(window.previewQuery||location.search);
 if(map[params.get('topic')])form.elements.topic.value=map[params.get('topic')];
 const status=form.querySelector('.formstatus');
 if(params.get('submitted')==='1'){status.textContent='Thank you for your inquiry. I will review your message and respond by email.';status.setAttribute('tabindex','-1');status.focus();if(!window.previewQuery){const url=new URL(location.href);url.searchParams.delete('submitted');history.replaceState(null,'',url.pathname+url.search+url.hash)}}
 form.addEventListener('submit',()=>{status.textContent='Submitting your inquiry through the form service…';const button=form.querySelector('button[type="submit"]');button.disabled=true;});
 window.addEventListener('pageshow',()=>{form.querySelector('button[type="submit"]').disabled=false});
 }
 if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('main .servicecard, main .step, main .feature').forEach(el=>{if(el.getBoundingClientRect().top>innerHeight){el.classList.add('reveal');obs.observe(el);}});}
}
function scrollProgress(){const el=document.querySelector('.progress');if(el){const height=document.documentElement.scrollHeight-innerHeight;el.style.width=(height>0?scrollY/height*100:0)+'%';}}
window.addEventListener('scroll',scrollProgress,{passive:true});window.addEventListener('resize',scrollProgress);document.addEventListener('click',e=>{const d=document.querySelector('.drop');if(d&&!d.contains(e.target))d.open=false;});document.addEventListener('keydown',e=>{if(e.key==='Escape'){const d=document.querySelector('.drop');if(d?.open){d.open=false;d.querySelector('summary').focus();}const nav=document.querySelector('.nav');if(nav?.classList.contains('open')){nav.classList.remove('open');const t=document.querySelector('.navtoggle');t.setAttribute('aria-expanded','false');t.focus();}}});
document.addEventListener('DOMContentLoaded',()=>{initPage();scrollProgress();});


/* Progressive marketing interactions. Existing links, analytics and forms stay intact. */
function initMarketingMotion(){
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const examples={
  consulting:'Find which products actually make money after costs and advertising.',
  engineering:'Connect sales, accounting and CRM data into one reliable database.',
  intelligence:'See which sales channels are growing and which are falling behind.',
  automation:'Replace repetitive Monday spreadsheet work with a refreshed report.',
  modelling:'Agree one definition of revenue and use it consistently across reports.',
  partnership:'Keep reports reliable and investigate new business questions as they arise.'
 };
 document.querySelectorAll('a.servicecard').forEach(card=>{
  const url=new URL(card.href,location.href);
  const key=url.pathname.split('/').pop().replace('.html','');
  const solutionExamples={sales:'Compare sales channels and conversion rates before reallocating your budget.',profit:'Identify products with negative contribution margins after fulfilment and advertising.',efficiency:'Find which refresh jobs repeatedly fail or take too long.',plan:'Compare actual spending with the budget and investigate the largest variances.',customers:'Identify customer segments with declining repeat purchases.',billing:'Find unpaid invoices or mismatches between invoices and payments.'};
  const exampleText=examples[key]||(!card.classList.contains('samplecard')&&key==='work'?solutionExamples[url.searchParams.get('demo')]:null);
  const desc=card.querySelector('p');
  if(!exampleText||!desc||card.classList.contains('motion-example-card'))return;
  const example=document.createElement('p');
  example.className='motion-example';
  const label=document.createElement('span');label.textContent='Example';label.className='motion-example-label';
  example.append(label,document.createTextNode(exampleText));
  const copy=document.createElement('div');copy.className='motion-card-copy';
  desc.before(copy);desc.classList.add('motion-card-description');copy.append(desc,example);
  card.classList.add('motion-example-card');
 });
 const visibleTargets=document.querySelectorAll('main .servicecard, main .step, main .feature, main .sidebox, main .profilecard, main .credentialcard, main .partnerlist > div');
 const touchLayout=matchMedia('(hover:none), (pointer:coarse)');
 const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting&&e.intersectionRatio>=.05){e.target.classList.add('motion-enter');if(!touchLayout.matches)observer.unobserve(e.target);}
  else if(touchLayout.matches)e.target.classList.remove('motion-enter');
 }),{threshold:.05}):null;
 visibleTargets.forEach(el=>{if(observer)observer.observe(el);else el.classList.add('motion-enter');});
 document.querySelectorAll('.integration-diagram').forEach(diagram=>{
  diagram.querySelectorAll('.integration-arrow').forEach((arrow,i)=>{
   arrow.style.setProperty('--flow-delay',i*.8+'s');
   const svg=arrow.querySelector('svg');if(!svg)return;
   svg.querySelector('path')?.classList.add('motion-flow-track');
   const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');
   dot.setAttribute('cx','5');dot.setAttribute('cy','16');dot.setAttribute('r','3.5');dot.setAttribute('class','motion-flow-dot');svg.append(dot);
  });
  const stages=diagram.querySelectorAll(':scope > .integration-stage,:scope > .integration-core,:scope > .integration-storage');
  stages.forEach((stage,i)=>{stage.classList.add('motion-flow-stage');stage.style.setProperty('--stage-delay',i*.8+'s');});
  let inView=!('IntersectionObserver' in window);
  function sync(){diagram.classList.toggle('motion-flow-running',inView&&!motion.matches&&!document.hidden);}
  if('IntersectionObserver' in window){const flowObserver=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();},{threshold:0});flowObserver.observe(diagram);}
  document.addEventListener('visibilitychange',sync);
  motion.addEventListener?.('change',sync);sync();
 });
 const root=document.querySelector('.hero-dashboard');
 if(!root)return;
 const heading=root.querySelector('.paneltop strong'),kpis=root.querySelector('.hero-kpis'),chart=root.querySelector('.hero-chart'),link=root.querySelector('a.link');
 if(!heading||!kpis||!chart||!link)return;
 const original={heading:heading.textContent,kpis:kpis.innerHTML,chart:chart.innerHTML,chartLabel:chart.getAttribute('aria-label'),href:link.getAttribute('href')};
 // All additional previews use the same deterministic synthetic models as Analytics Lab.
 const slides=[{name:'Sales',title:original.heading,kpis:original.kpis,chart:original.chart,chartLabel:original.chartLabel,href:original.href}];
 const specs=[
  ['customers','Customers','Customer analytics',['active','repeatshare','new'],'donut'],
  ['reliability','Operations','Pipeline reliability',['runs','successrate','failed'],'line'],
  ['profit','Profit','Product profitability',['revenue','profit','margin'],'profit'],
  ['product','Products','Product performance',['units','returns','returnrate'],'stack'],
  ['funnel','Funnel','Sales funnel',['leads','won','conversion'],'funnel'],
  ['efficiency','Efficiency','Pipeline efficiency',['before','after','saved'],'compare'],
  ['plan','Planning','Actual vs plan',['target','actual','attain'],'compare'],
  ['billing','Billing','Billing reconciliation',['invoices','exceptions','matchrate'],'donut']
 ];
 const shortNames={active:'Active customer-months',repeatshare:'Repeat share',new:'First-time customer-months',runs:'Scheduled runs',successrate:'Success rate',failed:'Failed runs',profit:'Contribution profit',margin:'Contribution margin',returnrate:'Return rate',conversion:'Lead-to-win rate',before:'Before',after:'After',saved:'Time saved',attain:'Attainment',matchrate:'Match rate'};
 const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function svgWrap(content){return '<svg viewBox="0 0 360 155" role="presentation" aria-hidden="true">'+content+'</svg>';}
 function txt(x,y,value,opts=''){return '<text x="'+x+'" y="'+y+'" font-size="10" fill="#526175" '+opts+'>'+esc(value)+'</text>';}
 function rect(x,y,w,h,color){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+Math.max(0,h)+'" rx="2" fill="'+color+'"/>';}
 function previewChart(key,type,d,a,rows){
  const month=labMonths.map(m=>labAggregate(d,rows.filter(r=>r.month===m)));
  const teal='#087f78',blue='#6f94c3',amber='#c88b36',red='#b34b52',grid='<path d="M26 24H350 M26 54H350 M26 84H350 M26 114H350" stroke="#e3eaf0" fill="none"/>';
  if(type==='donut'){
   const parts=key==='customers'?[[a.repeat,'Repeat customer-months',teal],[a.new,'First-time customer-months',blue]]:[[a.matched,'Matched invoices',teal],[a.exceptions,'Exceptions',amber]];
   const total=parts.reduce((sum,p)=>sum+p[0],0)||1,share=parts[0][0]/total*100,c=2*Math.PI*47;
   let out='<circle cx="88" cy="76" r="47" stroke="'+parts[1][2]+'" stroke-width="21" fill="none"/><circle cx="88" cy="76" r="47" stroke="'+teal+'" stroke-width="21" fill="none" stroke-dasharray="'+(c*share/100)+' '+c+'" transform="rotate(-90 88 76)"/>';
   out+='<text x="88" y="79" text-anchor="middle" font-size="23" font-weight="700" fill="#10243a">'+share.toFixed(1)+'%</text>'+txt(88,94,key==='customers'?'Repeat share':'Match rate','text-anchor="middle"');
   parts.forEach((p,i)=>{const yy=52+i*46;out+=rect(160,yy-8,11,11,p[2])+txt(177,yy,p[1])+txt(177,yy+15,p[0].toLocaleString('en-GB')+' · '+(p[0]/total*100).toFixed(1)+'%');});return svgWrap(out);
  }
  if(type==='funnel'){
   let out='';['leads','qualified','proposals','won'].forEach((k,i)=>{let yy=14+i*34;out+=txt(6,yy+14,labLabels[k])+rect(94,yy,196*a[k]/Math.max(1,a.leads),22,[teal,blue,amber,'#6c8d78'][i])+txt(350,yy+14,a[k].toLocaleString('en-GB'),'text-anchor="end"');});return svgWrap(out);
  }
  if(type==='profit'){
   const groups=d.segments.map(name=>[name,labAggregate(d,rows.filter(r=>r.segment===name)).profit]);const max=Math.max(1,...groups.map(g=>Math.abs(g[1])));let out='<path d="M190 10V145" stroke="#95a7b8" stroke-dasharray="3 3"/>';
   groups.forEach((g,i)=>{let yy=15+i*34,w=Math.abs(g[1])/max*100;out+=txt(3,yy+13,g[0])+rect(g[1]<0?190-w:190,yy,w,18,g[1]<0?red:teal)+txt(355,yy+13,fmt(g[1]),'text-anchor="end"');});return svgWrap(out);
  }
  if(type==='line'){
   const vals=month.map(m=>m.successrate),lo=Math.max(0,Math.floor((Math.min(...vals)-1)/2)*2),hi=100;
   const yy=v=>114-(v-lo)/Math.max(1,hi-lo)*90;
   const pts=vals.map((v,i)=>(30+i*62)+','+yy(v)).join(' ');
   let out=grid+txt(0,27,'100%')+txt(0,117,lo+'%')+'<polyline points="'+pts+'" fill="none" stroke="'+teal+'" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>';
   vals.forEach((v,i)=>{out+='<circle cx="'+(30+i*62)+'" cy="'+yy(v)+'" r="3.2" fill="'+teal+'"/>'+txt(30+i*62,134,labMonths[i],'text-anchor="middle"');});return svgWrap(out);
  }
  const keys=key==='efficiency'?['before','after']:key==='plan'?['target','actual']:['net','returns'];
  const max=Math.max(1,...month.map(m=>type==='stack'?m.units:Math.max(...keys.map(k=>m[k]))));let out=grid;
  month.forEach((m,i)=>{const x=35+i*52;let y=114;keys.forEach((k,j)=>{const h=m[k]/max*88;if(type==='stack'){y-=h;out+=rect(x,y,28,h,j?amber:teal);}else out+=rect(x+j*15,114-h,13,h,j?teal:blue);});out+=txt(x+14,130,labMonths[i],'text-anchor="middle"');});
  keys.forEach((k,i)=>{const xx=55+i*145;out+=rect(xx,140,9,9,type==='stack'?(i?amber:teal):(i?teal:blue))+txt(xx+13,148,labLabels[k]);});return svgWrap(out);
 }
 if(typeof labConfig!=='undefined'&&typeof labData==='function'&&typeof labAggregate==='function'){
  specs.forEach(([key,name,title,metricKeys,type])=>{
   const d=labConfig[key];if(!d)return;
   const rows=labData(d),a=labAggregate(d,rows);
   const metrics=metricKeys.map(k=>{const m=d.metrics.find(m=>m.key===k);return [shortNames[k]||m.name,m.fmt(a[k])];});
   slides.push({name,title,metrics,chartLabel:'Illustrative '+d.name+' chart, January to June 2026. '+metrics.map(m=>m.join(': ')).join('; '),href:original.href+'?demo='+key,svg:previewChart(key,type,d,a,rows)});
  });
 }
 let current=0,visible=true,timer=0;
 function render(i){
  current=i;const slide=slides[i];
  heading.textContent=slide.title;
  kpis.innerHTML=slide.kpis||slide.metrics.map(m=>'<div><small>'+m[0]+'</small><strong>'+m[1]+'</strong></div>').join('');
  chart.classList.toggle('hero-chart-alternate',!!slide.svg);
  chart.innerHTML=slide.svg||slide.chart;chart.setAttribute('aria-label',slide.chartLabel);
  link.setAttribute('href',slide.href);
  link.textContent=i===0?'Explore interactive dashboards ↗':'Explore this dashboard ↗';
  
  if(!motion.matches&&typeof kpis.animate==='function'){
   const frames=[{opacity:.25,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}];
   [kpis,chart].forEach(el=>{el.getAnimations().forEach(a=>a.cancel());el.animate(frames,{duration:240,easing:'ease-out'});});
  }
 }
 function schedule(){clearTimeout(timer);if(!motion.matches&&visible&&!document.hidden){timer=setTimeout(()=>{render((current+1)%slides.length);schedule();},2000);}}
 document.addEventListener('visibilitychange',schedule);
 motion.addEventListener?.('change',schedule);
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.1});observer.observe(root);}
 render(0);schedule();
}
document.addEventListener('DOMContentLoaded',initMarketingMotion);


/* Conversion-focused enhancements; all offers are conditional, never invented client results. */
function initCustomerJourney(){
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('.dp-transform').forEach(el=>{
  el.querySelector('.dp-transform-replay')?.remove();
  let inView=!('IntersectionObserver' in window);
  function sync(){el.classList.toggle('dp-transform-play',inView&&!motion.matches&&!document.hidden);}
  if('IntersectionObserver' in window){const obs=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();},{threshold:0});obs.observe(el);}
  document.addEventListener('visibilitychange',sync);
  motion.addEventListener?.('change',sync);sync();
 });
 // Desktop hover and keyboard focus; touch devices replay on each return to view.
 const previews=[...document.querySelectorAll('.samplemini,.dp-demo-tile')];
 const touchLayout=matchMedia('(hover:none), (pointer:coarse)');
 function animatePreview(el){if(motion.matches)return;el.classList.remove('dp-preview-visible');void el.offsetWidth;el.classList.add('dp-preview-visible');}
 const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting&&e.intersectionRatio>=.1){animatePreview(e.target);if(!touchLayout.matches)observer.unobserve(e.target);}
  else if(touchLayout.matches)e.target.classList.remove('dp-preview-visible');
 }),{threshold:.1}):null;
 previews.forEach(el=>{
  const card=el.closest('.samplecard,.dp-demo-tile')||el;
  card.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')animatePreview(el);});
  card.addEventListener('focusin',()=>animatePreview(el));
  if(observer)observer.observe(el);else animatePreview(el);
 });
 motion.addEventListener?.('change',()=>{if(motion.matches)previews.forEach(el=>el.classList.remove('dp-preview-visible'));});
 const script=document.querySelector('script[src*="assets/js/script.js"]');
 if(!script)return;
 const base=new URL('../../',script.src);
 const contact=new URL('pages/company/contact.html',base),lab=new URL('pages/analytics/work.html',base);
 const sampleUrl=new URL(contact);sampleUrl.searchParams.set('sample','1');sampleUrl.hash='inquiry';
 const file=location.pathname.split('/').pop()||'index.html';
 const topics={consulting:['profit','Product profitability'],engineering:['reliability','Pipeline reliability'],intelligence:['sales','Sales overview'],automation:['efficiency','Pipeline efficiency'],modelling:['plan','Actual vs plan'],partnership:['reliability','Pipeline reliability']};
 const topic=file.replace('.html','');
 const service=topics[topic];
 if(service){
  const side=document.querySelector('.sidebox');
  if(side&&!side.querySelector('.dp-related-demo')){const a=document.createElement('a'),url=new URL(lab);url.searchParams.set('demo',service[0]);a.className='link dp-related-demo';a.href=url.href;a.textContent='Explore example: '+service[1]+' ↗';side.append(a);}
  sampleUrl.searchParams.set('topic',topic);
 }
 document.querySelectorAll('main .cta').forEach(el=>{
  const h=el.querySelector('h2'),p=el.querySelector('p'),a=el.querySelector('a.button');
  if(!h||!p||!a)return;
  if(!el.querySelector('.dp-cta-label')){const label=document.createElement('div');label.className='dp-cta-label';label.textContent='Start small';h.before(label);}
  h.textContent='One file. One question. Real clarity.';
  p.textContent='Tell me what you want to understand. A limited free sample may be available; scope and timing are agreed first. Please share only anonymised data after we agree how to handle it.';
  a.href=sampleUrl.href;a.textContent='Request a sample dashboard ↗';
 });
 if(file==='contact.html'){
  const params=new URLSearchParams(window.previewQuery||location.search);
  if(params.get('sample')==='1'){
   const form=document.querySelector('#inquiry'),question=form?.querySelector('textarea[name="question"]');
   if(form&&question){const box=document.createElement('div');box.className='dp-sample-intent';box.textContent='Request a focused sample: describe one business question and what type of anonymised file you could provide. Do not attach or paste customer data. Availability and scope are confirmed first.';question.placeholder='What would you like a sample dashboard to answer?';form.prepend(box);}
  }
  return;
 }

}
document.addEventListener('DOMContentLoaded',initCustomerJourney);
