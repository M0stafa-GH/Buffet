const V='buffet-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(['./','index.html','icon-192.png'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
 if(/firestore|identitytoolkit|securetoken|googleapis\.com\/(?!css)/.test(u.hostname+u.pathname)&&!/gstatic|fonts/.test(u.hostname))return;
 e.respondWith(fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(h=>h.put(r,c))}return x}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))))});
