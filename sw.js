const V='store-pwa-v1';
const SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
const EXT=['https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(V).then(async c=>{
    await c.addAll(SHELL);
    for(const u of EXT){try{c.put(u,await fetch(u,{mode:'no-cors'}))}catch(_){}}
  }));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{
    const net=fetch(e.request).then(r=>{
      if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp))}
      return r;
    }).catch(()=>hit||(e.request.mode==='navigate'?caches.match('./index.html'):undefined));
    return hit||net;
  }));
});
