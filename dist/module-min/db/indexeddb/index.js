import{PersistentOptions}from"../../type.js";const VERSION=1,IndexedDB="undefined"!=typeof window&&(window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB),IDBTransaction="undefined"!=typeof window&&(window.IDBTransaction||window.webkitIDBTransaction||window.msIDBTransaction),IDBKeyRange="undefined"!=typeof window&&(window.IDBKeyRange||window.webkitIDBKeyRange||window.msIDBKeyRange),fields=["map","ctx","tag","reg","cfg"];import StorageInterface from"../interface.js";import{toArray}from"../../common.js";function sanitize(a){return a.toLowerCase().replace(/[^a-z0-9_\-]/g,"")}export default function IdxDB(a,b={}){return this?void("object"==typeof a&&(a=a.name,b=a),!a&&console.info("Default storage space was used, because a name was not passed."),this.id="flexsearch"+(a?":"+sanitize(a):""),this.field=b.field?sanitize(b.field):"",this.support_tag_search=!1,this.db=null,this.trx={}):new IdxDB(a,b)}IdxDB.prototype.mount=function(a){return a.encoder?(a.db=this,this.open()):a.mount(this)},IdxDB.prototype.open=function(){let a=this;return navigator.storage&&navigator.storage.persist(),this.db||new Promise(function(b,c){const d=IndexedDB.open(a.id+(a.field?":"+a.field:""),VERSION);d.onupgradeneeded=function(){const b=a.db=this.result;fields.forEach(a=>{b.objectStoreNames.contains(a)||b.createObjectStore(a)})},d.onblocked=function(a){console.error("blocked",a),c()},d.onerror=function(a){console.error(this.error,a),c()},d.onsuccess=function(){a.db=this.result,a.db.onversionchange=function(){a.close()},b(a)}})},IdxDB.prototype.close=function(){this.db.close(),this.db=null},IdxDB.prototype.destroy=function(){return IndexedDB.deleteDatabase(this.id+(this.field?":"+this.field:""))},IdxDB.prototype.clear=function(){const a=this.db.transaction(fields,"readwrite");for(let b=0;b<fields.length;b++)a.objectStore(fields[b]).clear();return promisfy(a)},IdxDB.prototype.get=function(a,b,c=0,d=0,e=!0,f=!1){const g=this.db.transaction(b?"ctx":"map","readonly"),h=g.objectStore(b?"ctx":"map"),i=h.get(b?b+":"+a:a),j=this;return promisfy(i).then(function(a){let b=[];if(!a||!a.length)return b;if(e){if(!c&&!d&&1===a.length)return a[0];for(let e,f=0;f<a.length;f++)if((e=a[f])&&e.length){if(d>=e.length){d-=e.length;continue}const a=c?d+Math.min(e.length-d,c):e.length;for(let c=d;c<a;c++)b.push(e[c]);if(d=0,b.length===c)break}return f?j.enrich(b):b}return a})},IdxDB.prototype.tag=function(a,b=0,c=0,d=!1){const e=this.db.transaction("tag","readonly"),f=e.objectStore("tag"),g=f.get(a),h=this;return promisfy(g).then(function(a){if(!a||!a.length||c>=a.length)return[];if(!b&&!c)return a;const e=a.slice(c,c+b);return d?h.enrich(e):e})},IdxDB.prototype.enrich=function(a){"object"!=typeof a&&(a=[a]);const b=this.db.transaction("reg","readonly"),c=b.objectStore("reg"),d=[];for(let b=0;b<a.length;b++)d[b]=promisfy(c.get(a[b]));return Promise.all(d).then(function(b){for(let c=0;c<b.length;c++)b[c]={id:a[c],doc:b[c]?JSON.parse(b[c]):null};return b})},IdxDB.prototype.has=function(a){const b=this.db.transaction("reg","readonly"),c=b.objectStore("reg"),d=c.getKey(a);return promisfy(d)},IdxDB.prototype.search=null,IdxDB.prototype.info=function(){},IdxDB.prototype.transaction=function(a,b,c){let d=this.trx[a+":"+b];if(d)return c.call(this,d);let e=this.db.transaction(a,b);return this.trx[a+":"+b]=d=e.objectStore(a),new Promise((f,g)=>(e.onerror=c=>{this.trx[a+":"+b]=null,e.abort(),e=d=null,g(c)},e.oncomplete=c=>{this.trx[a+":"+b]=null,e=d=null,f(c||!0)},c.call(this,d)))},IdxDB.prototype.commit=async function(a,b,c){if(b)await this.clear(),a.commit_task=[];else{let d=a.commit_task;a.commit_task=[];for(let a,c=0;c<d.length;c++)if(a=d[c],a.clear){await this.clear(),b=!0;break}else d[c]=a.del;b||(!c&&(d=d.concat(toArray(a.reg))),d.length&&(await this.remove(d)))}a.reg.size&&(await this.transaction("map","readwrite",function(c){for(const d of a.map){const a=d[0],e=d[1];if(e.length){if(b){c.put(e,a);continue}c.get(a).onsuccess=function(){let b,d=this.result;if(d&&d.length){const a=Math.max(d.length,e.length);for(let c,f,g=0;g<a;g++)if(f=e[g],f&&f.length)if(c=d[g],c&&c.length){for(let a=0;a<f.length;a++)c.push(f[a]);b=1}else d[g]=f,b=1}else d=e,b=1;b&&c.put(d,a)}}}}),await this.transaction("ctx","readwrite",function(c){for(const d of a.ctx){const a=d[0],e=d[1];for(const d of e){const e=d[0],f=d[1];if(f.length){if(b){c.put(f,a+":"+e);continue}c.get(a+":"+e).onsuccess=function(){let b,d=this.result;if(d&&d.length){const a=Math.max(d.length,f.length);for(let c,e,g=0;g<a;g++)if(e=f[g],e&&e.length)if(c=d[g],c&&c.length){for(let a=0;a<e.length;a++)c.push(e[a]);b=1}else d[g]=e,b=1}else d=f,b=1;b&&c.put(d,a+":"+e)}}}}}),a.store?await this.transaction("reg","readwrite",function(b){for(const c of a.store){const a=c[0],d=c[1];b.put("object"==typeof d?JSON.stringify(d):1,a)}}):!a.bypass&&(await this.transaction("reg","readwrite",function(b){for(const c of a.reg.keys())b.put(1,c)})),a.tag&&(await this.transaction("tag","readwrite",function(b){for(const c of a.tag){const a=c[0],d=c[1];d.length&&(b.get(a).onsuccess=function(){let c=this.result;c=c&&c.length?c.concat(d):d,b.put(c,a)})}})),a.map.clear(),a.ctx.clear(),a.tag&&a.tag.clear(),a.store&&a.store.clear(),a.document||a.reg.clear())};function handle(a,b,c){const d=a.value;let e,f,g=0;for(let h,i=0;i<d.length;i++){if(h=c?d:d[i]){for(let a,c,g=0;g<b.length;g++)if(c=b[g],a=h.indexOf(f?parseInt(c,10):c),!(0>a)||f||"string"!=typeof c||isNaN(c)||(a=h.indexOf(parseInt(c,10)),a&&(f=1)),0<=a)if(e=1,1<h.length)h.splice(a,1);else{d[i]=[];break}g+=h.length}if(c)break}g?e&&a.update(d):a.delete(),a.continue()}IdxDB.prototype.remove=function(a){return"object"!=typeof a&&(a=[a]),Promise.all([this.transaction("map","readwrite",function(b){b.openCursor().onsuccess=function(){const b=this.result;b&&handle(b,a)}}),this.transaction("ctx","readwrite",function(b){b.openCursor().onsuccess=function(){const b=this.result;b&&handle(b,a)}}),this.transaction("tag","readwrite",function(b){b.openCursor().onsuccess=function(){const b=this.result;b&&handle(b,a,!0)}}),this.transaction("reg","readwrite",function(b){for(let c=0;c<a.length;c++)b.delete(a[c])})])};function promisfy(a,b){return new Promise((c,d)=>{a.onsuccess=function(){b&&b(this.result),c(this.result)},a.oncomplete=function(){b&&b(this.result),c(this.result)},a.onerror=d,a=null})}