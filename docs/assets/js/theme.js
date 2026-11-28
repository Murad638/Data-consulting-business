/* Keep the original light layout by default; persist an explicit visitor choice. */
(function(){
  'use strict';
  const root=document.documentElement,key='prodelta-theme';
  let selected='light';
  try{if(localStorage.getItem(key)==='dark')selected='dark';}catch(e){}
  root.dataset.theme=selected;
  function apply(theme){
    const dark=theme==='dark';
    root.dataset.theme=theme;
    document.querySelector('meta[name="color-scheme"]')?.setAttribute('content',theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#101413':'#f5f7fa');
    const button=document.querySelector('.theme-switch');
    if(button){
      const label=dark?'Switch to light theme':'Switch to dark theme';
      button.setAttribute('aria-label',label);button.title=label;
      button.setAttribute('aria-pressed',String(dark));button.hidden=false;
    }
  }
  document.addEventListener('DOMContentLoaded',()=>{
    apply(root.dataset.theme);
    document.querySelector('.theme-switch')?.addEventListener('click',()=>{
      const next=root.dataset.theme==='dark'?'light':'dark';
      apply(next);
      try{localStorage.setItem(key,next);}catch(e){}
    });
  });
  window.addEventListener('storage',event=>{if(event.key===key)apply(event.newValue==='dark'?'dark':'light');});
})();
