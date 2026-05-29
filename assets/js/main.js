/* AISecurity.arnav.au — interactive layer guide */
(function(){
  'use strict';

  /* scroll progress */
  const prog = document.getElementById('prog');
  function tick(){
    const max = document.documentElement.scrollHeight - innerHeight;
    if(prog) prog.style.width = (max>0?(scrollY/max)*100:0)+'%';
  }
  addEventListener('scroll', tick, {passive:true});

  /* active layer tracking */
  const sections   = document.querySelectorAll('.layer');
  const sbLinks    = document.querySelectorAll('.sb-link');
  const navChips   = document.querySelectorAll('.chip');

  function activateLayer(id){
    sbLinks.forEach(l=>{
      const on = l.dataset.layer===id;
      l.classList.toggle('on',on);
      l.style.borderLeftColor = on ? (l.querySelector('.sb-dot')||{}).style.background||'#00d4ff' : 'transparent';
    });
    navChips.forEach(c=>{
      const on = c.dataset.layer===id;
      c.classList.toggle('on',on);
      if(on){
        const col=(c.querySelector('.dot')||{}).style.background||'#00d4ff';
        c.style.setProperty('--lc',col);
      }
    });
  }

  /* on individual layer pages, activate via body attribute; on index use IntersectionObserver */
  const bodyLayer = document.body.dataset.layer;
  if(bodyLayer){
    activateLayer(bodyLayer);
  } else if('IntersectionObserver' in window){
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) activateLayer(e.target.dataset.layer); });
    },{rootMargin:'-30% 0px -60% 0px',threshold:0});
    sections.forEach(s=>obs.observe(s));
  }

  /* tabs */
  document.querySelectorAll('.tab').forEach(btn=>{
    btn.addEventListener('click', function(){
      const layer   = this.dataset.layer;
      const tabName = this.dataset.tab;
      const section = document.getElementById('layer-'+layer);
      if(!section) return;

      section.querySelectorAll('.tab').forEach(b=>{b.classList.remove('on');b.setAttribute('aria-selected','false');});
      this.classList.add('on');
      this.setAttribute('aria-selected','true');

      section.querySelectorAll('.panel').forEach(p=>p.classList.remove('on'));
      const panel = section.querySelector('#p-'+layer+'-'+tabName);
      if(panel) panel.classList.add('on');
    });
  });

  /* search */
  const sToggle = document.getElementById('sToggle');
  const sClose  = document.getElementById('sClose');
  const sOv     = document.getElementById('sOv');
  const sInput  = document.getElementById('sInput');
  const sRes    = document.getElementById('sRes');

  function openSearch(){sOv.classList.add('open');setTimeout(()=>sInput&&sInput.focus(),80);}
  function closeSearch(){sOv.classList.remove('open');if(sInput)sInput.value='';if(sRes)sRes.innerHTML='';}

  if(sToggle) sToggle.addEventListener('click',openSearch);
  if(sClose)  sClose.addEventListener('click',closeSearch);
  if(sOv) sOv.addEventListener('click',e=>{if(e.target===sOv)closeSearch();});

  document.addEventListener('keydown',e=>{
    if(e.key==='/'&&document.activeElement.tagName!=='INPUT'){e.preventDefault();openSearch();}
    if(e.key==='Escape') closeSearch();
  });

  /* build search index from DOM */
  const idx=[];
  sections.forEach(sec=>{
    const lid   = sec.dataset.layer;
    const lname = (sec.querySelector('.layer-title')||{}).textContent||lid;
    const col   = getComputedStyle(sec).getPropertyValue('--lc').trim()||'#00d4ff';
    sec.querySelectorAll('.risk-name').forEach(el=>idx.push({type:'Risk',layer:lname,lid,col,text:el.textContent.trim(),href:'#layer-'+lid}));
    sec.querySelectorAll('.ex-title' ).forEach(el=>idx.push({type:'Example',layer:lname,lid,col,text:el.textContent.trim(),href:'#layer-'+lid}));
    sec.querySelectorAll('.mit-name' ).forEach(el=>idx.push({type:'Mitigation',layer:lname,lid,col,text:el.textContent.trim(),href:'#layer-'+lid}));
  });

  if(sInput){
    sInput.addEventListener('input',function(){
      const q=this.value.toLowerCase().trim();
      if(!q){sRes.innerHTML='';return;}
      const hits=idx.filter(i=>i.text.toLowerCase().includes(q)||i.layer.toLowerCase().includes(q)).slice(0,14);
      if(!hits.length){sRes.innerHTML='<div class="s-item"><div class="s-title" style="color:var(--tx3)">No results found</div></div>';return;}
      sRes.innerHTML=hits.map(i=>`<div class="s-item" data-href="${i.href}"><div class="s-layer" style="color:${i.col}">${i.type} · ${i.layer}</div><div class="s-title">${i.text}</div></div>`).join('');
      sRes.querySelectorAll('.s-item').forEach(el=>{
        el.addEventListener('click',()=>{
          const t=document.querySelector(el.dataset.href);
          if(t){closeSearch();setTimeout(()=>t.scrollIntoView({behavior:'smooth',block:'start'}),100);}
        });
      });
    });
  }

  /* mobile menu */
  const burger   = document.getElementById('burger');
  const mobMenu  = document.getElementById('mobMenu');
  const mobClose = document.getElementById('mobClose');
  if(burger)   burger.addEventListener('click',()=>mobMenu&&mobMenu.classList.add('open'));
  if(mobClose) mobClose.addEventListener('click',()=>mobMenu&&mobMenu.classList.remove('open'));
  if(mobMenu)  mobMenu.addEventListener('click',e=>{if(e.target===mobMenu)mobMenu.classList.remove('open');});
  document.querySelectorAll('.mob-list a').forEach(a=>{
    a.addEventListener('click',()=>mobMenu&&mobMenu.classList.remove('open'));
  });

  /* hero stack entrance animation */
  document.querySelectorAll('.stack-row').forEach((el,i)=>{
    el.style.opacity='0';el.style.transform='translateY(8px)';
    setTimeout(()=>{
      el.style.transition='opacity .35s ease,transform .35s ease';
      el.style.opacity='.85';el.style.transform='none';
    },80+i*55);
  });

})();
