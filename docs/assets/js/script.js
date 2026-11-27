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
  const key=new URL(card.href,location.href).pathname.split('/').pop().replace('.html','');
  const desc=card.querySelector('p');
  if(!examples[key]||!desc||card.classList.contains('motion-example-card'))return;
  const example=document.createElement('p');
  example.className='motion-example';
  const label=document.createElement('span');label.textContent='Example';label.className='motion-example-label';
  example.append(label,document.createTextNode(examples[key]));
  const copy=document.createElement('div');copy.className='motion-card-copy';
  desc.before(copy);desc.classList.add('motion-card-description');copy.append(desc,example);
  card.classList.add('motion-example-card');
 });
 const visibleTargets=document.querySelectorAll('main .servicecard, main .step, main .feature, main .sidebox, main .profilecard, main .credentialcard, main .integration-diagram');
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
   if(e.isIntersecting){e.target.classList.add('motion-enter');observer.unobserve(e.target);}
  }),{threshold:.08});
  visibleTargets.forEach(el=>observer.observe(el));
 }
 document.querySelectorAll('.integration-diagram').forEach(diagram=>{
  diagram.querySelectorAll('.integration-arrow').forEach((arrow,i)=>{
   arrow.style.setProperty('--flow-delay',i*.38+'s');
   const svg=arrow.querySelector('svg');if(!svg)return;
   const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');
   dot.setAttribute('cx','5');dot.setAttribute('cy','16');dot.setAttribute('r','2.5');dot.setAttribute('class','motion-flow-dot');svg.append(dot);
  });
  const stages=diagram.querySelectorAll(':scope > .integration-stage,:scope > .integration-core,:scope > .integration-storage');
  stages.forEach((stage,i)=>{stage.classList.add('motion-flow-stage');stage.style.setProperty('--stage-delay',i*.38+'s');});
 });
 const root=document.querySelector('.hero-dashboard');
 if(!root)return;
 const heading=root.querySelector('.paneltop strong'),kpis=root.querySelector('.hero-kpis'),chart=root.querySelector('.hero-chart'),link=root.querySelector('a.link');
 if(!heading||!kpis||!chart||!link)return;
 const original={heading:heading.textContent,kpis:kpis.innerHTML,chart:chart.innerHTML,chartLabel:chart.getAttribute('aria-label'),href:link.getAttribute('href')};
 const slides=[
  {name:'Sales',title:original.heading,kpis:original.kpis,chart:original.chart,chartLabel:original.chartLabel,href:original.href},
  {name:'Customers',title:'Customer analytics',metrics:[['Customers','2,480'],['Repeat rate','38%'],['New customers','620']],chartLabel:'Illustrative customer mix: 38 percent repeat customers, 62 percent other customers.',href:original.href+'?demo=customers',svg:'<svg viewBox="0 0 360 155" role="presentation" aria-hidden="true"><circle cx="100" cy="77" r="52" fill="none" stroke="#dce7f7" stroke-width="22"/><circle cx="100" cy="77" r="52" fill="none" stroke="#087f78" stroke-width="22" stroke-dasharray="124.16 326.73" transform="rotate(-90 100 77)"/><g fill="#10243a" text-anchor="middle"><text x="100" y="77" font-size="24" font-weight="700">38%</text><text x="100" y="94" font-size="11">Repeat rate</text></g><rect x="190" y="43" width="12" height="12" rx="2" fill="#087f78"/><text x="210" y="53" font-size="12" fill="#10243a">Repeat customers</text><text x="210" y="70" font-size="12" fill="#526175">38%</text><rect x="190" y="91" width="12" height="12" rx="2" fill="#dce7f7"/><text x="210" y="101" font-size="12" fill="#10243a">Other customers</text><text x="210" y="118" font-size="12" fill="#526175">62%</text></svg>'},
  {name:'Operations',title:'Pipeline reliability',metrics:[['Success rate','98.4%'],['Avg. runtime','4.2 min'],['Failed runs','8']],chartLabel:'Illustrative daily pipeline success rate, ranging between 95 and 100 percent.',href:original.href+'?demo=reliability',svg:'<svg viewBox="0 0 360 155" role="presentation" aria-hidden="true"><g stroke="#dce4eb" fill="none"><path d="M36 18H350 M36 53H350 M36 88H350 M36 123H350"/></g><g font-size="10" fill="#526175"><text x="1" y="22">100%</text><text x="5" y="57">95%</text><text x="5" y="92">90%</text><text x="5" y="127">85%</text></g><path d="M36 25 L71 18 106 32 141 25 176 53 211 32 246 25 281 18 316 32 350 25 L350 123 H36Z" fill="#e0f0e8"/><path d="M36 25 L71 18 106 32 141 25 176 53 211 32 246 25 281 18 316 32 350 25" fill="none" stroke="#087f78" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"/><text x="192" y="146" text-anchor="middle" font-size="10" fill="#526175">Illustrative daily success rate</text></svg>'}
 ];
 const controls=document.createElement('div');controls.className='hero-dashboard-controls';controls.setAttribute('role','group');controls.setAttribute('aria-label','Dashboard previews');
 let current=0,paused=motion.matches,visible=true,hover=false,timer=0;
 const buttons=slides.map((slide,i)=>{const button=document.createElement('button');button.type='button';button.textContent=slide.name;button.addEventListener('click',()=>{paused=true;render(i);syncPause();schedule();});controls.append(button);return button;});
 const pause=document.createElement('button');pause.type='button';pause.className='hero-dashboard-pause';controls.append(pause);root.append(controls);
 const announcement=document.createElement('span');announcement.className='motion-sr-only';announcement.setAttribute('aria-live','polite');controls.append(announcement);
 function render(i){
  current=i;const slide=slides[i];
  heading.textContent=slide.title;
  kpis.innerHTML=slide.kpis||slide.metrics.map(m=>'<div><small>'+m[0]+'</small><strong>'+m[1]+'</strong></div>').join('');
  chart.classList.toggle('hero-chart-alternate',!!slide.svg);
  chart.innerHTML=slide.svg||slide.chart;chart.setAttribute('aria-label',slide.chartLabel);
  link.setAttribute('href',slide.href);
  buttons.forEach((button,j)=>button.setAttribute('aria-pressed',String(i===j)));
  if(!motion.matches&&typeof kpis.animate==='function'){
   const frames=[{opacity:.25,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}];
   [kpis,chart].forEach(el=>{el.getAnimations().forEach(a=>a.cancel());el.animate(frames,{duration:350,easing:'ease-out'});});
  }
 }
 function syncPause(){pause.textContent=paused?'Play':'Pause';pause.setAttribute('aria-label',paused?'Resume automatic dashboard rotation':'Pause automatic dashboard rotation');}
 function schedule(){clearTimeout(timer);if(!paused&&!motion.matches&&!hover&&visible&&!document.hidden&&!root.contains(document.activeElement)){timer=setTimeout(()=>{render((current+1)%slides.length);schedule();},5000);}}
 pause.addEventListener('click',()=>{paused=!paused;syncPause();if(!paused&&motion.matches){paused=true;syncPause();announcement.textContent='Automatic rotation is disabled by your reduced-motion preference.';return;}schedule();});
 root.addEventListener('pointerenter',()=>{hover=true;schedule();});root.addEventListener('pointerleave',()=>{hover=false;schedule();});
 root.addEventListener('focusin',schedule);root.addEventListener('focusout',()=>setTimeout(schedule,0));
 document.addEventListener('visibilitychange',schedule);
 if(typeof motion.addEventListener==='function')motion.addEventListener('change',()=>{if(motion.matches){paused=true;syncPause();}schedule();});
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.1});observer.observe(root);}
 render(0);syncPause();schedule();
}
document.addEventListener('DOMContentLoaded',initMarketingMotion);
