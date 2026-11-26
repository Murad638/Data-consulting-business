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
 get('calcInsight').textContent=m.net<0?'This scenario makes a loss of '+fmt(-m.net)+'. Review variable costs, pricing and fixed expenses.':be===null?'Variable costs consume all sales; review pricing and cost ratios.':'At these cost assumptions, monthly break-even revenue is '+fmt(be)+'. Compare scenarios before deciding how much to spend on growth.';
 }ranges.forEach(r=>r.oninput=calc);root.querySelector('[data-reset]').onclick=()=>{ranges.forEach(r=>r.value=r.defaultValue);calc()};calc();
 });
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
