import{SearchOptions,SearchResults,EnrichedSearchResults}from"../type.js";import{create_object,is_object,sort_by_length_down}from"../common.js";import Index from"../index.js";import default_compress from"../compress.js";import Resolver from"../resolver.js";import{intersect}from"../intersect.js";import resolve_default from"../resolve/default.js";let global_resolve=1;export function set_resolve(a){global_resolve=a}Index.prototype.search=function(a,b,c){c||(!b&&is_object(a)?(c=a,a=""):is_object(b)&&(c=b,b=0));let d,e,f,g,h,i,j,k,l=[],m=0;c?(a=c.query||a,b=c.limit||b,m=c.offset||0,e=c.context,f=c.suggest,g=global_resolve&&!1!==c.resolve,g||(global_resolve=0),h=g&&c.enrich,j=c.boost,k=c.resolution,i=this.db&&c.tag):g=this.resolve||global_resolve;let n=this.encoder.encode(a);if(d=n.length,b||!g||(b=100),1===d)return single_term_query.call(this,n[0],"",b,m,g,h,i);if(e=this.depth&&!1!==e,2===d&&e&&!f)return single_term_query.call(this,n[0],n[1],b,m,g,h,i);let o=0,p=0;if(1<d){const a=create_object(),b=[];for(let c,e=0;e<d;e++)if(c=n[e],c&&!a[c]){if(!f&&!this.db&&!this.get_array(c))return g?l:new Resolver(l);b.push(c),a[c]=1;const d=c.length;o=Math.max(o,d),p=p?Math.min(p,d):d}n=b,d=n.length}if(!d)return g?l:new Resolver(l);let q,r=0;if(1===d)return single_term_query.call(this,n[0],"",b,m,g,h,i);if(2===d&&e&&!f)return single_term_query.call(this,n[0],n[1],b,m,g,h,i);if(1<d&&(e?(q=n[0],r=1):9<o&&3<o/p&&n.sort(sort_by_length_down)),k||0===k||(k=this.resolution),this.db){if(this.db.search){const a=this.db.search(this,n,b,m,f,g,h,i);if(!1!==a)return a}const a=this;return async function(){for(let c,e;r<d;r++){if(e=n[r],q?(c=await a.get_array(e,q,0,0,!1,!1),c=add_result(c,l,f,a.resolution_ctx),(!f||!1!==c||!l.length)&&(q=e)):(c=await a.get_array(e,"",0,0,!1,!1),c=add_result(c,l,f,k)),c)return c;if(f&&r==d-1){let a=l.length;if(!a){if(q){q="",r=-1;continue}return l}if(1===a)return g?resolve_default(l[0],b,m):new Resolver(l[0])}}return g?intersect(l,k,b,m,f,j,g):new Resolver(l[0])}()}for(let e,h;r<d;r++){if(h=n[r],q?(e=this.get_array(h,q,0,0,!1,!1),e=add_result(e,l,f,this.resolution_ctx),(!f||!1!==e||!l.length)&&(q=h)):(e=this.get_array(h,"",0,0,!1,!1),e=add_result(e,l,f,k)),e)return e;if(f&&r==d-1){const a=l.length;if(!a){if(q){q="",r=-1;continue}return l}if(1===a)return g?resolve_default(l[0],b,m):new Resolver(l[0])}}return l=intersect(l,k,b,m,f,j,g),g?l:new Resolver(l)};function single_term_query(a,b,c,d,e,f,g){const h=this.get_array(a,b,c,d,e,f,g);return this.db?h.then(function(a){return e?a:a&&a.length?e?resolve_default(a,c,d):new Resolver(a):e?[]:new Resolver([])}):h&&h.length?e?resolve_default(h,c,d):new Resolver(h):e?[]:new Resolver([])}function add_result(a,b,c,d){let e=[];if(a){d=Math.min(a.length,d);for(let b,c=0;c<d;c++)(b=a[c])&&b&&(e[c]=b);if(e.length)return void b.push(e)}return!c&&e}Index.prototype.get_array=function(a,b,c,d,e,f,g){let h,i;return(b&&(i=this.bidirectional&&a>b),this.compress&&(a=default_compress(a),b&&(b=default_compress(b))),this.db)?b?this.db.get(i?b:a,i?a:b,c,d,e,f,g):this.db.get(a,"",c,d,e,f,g):(b?(h=this.ctx.get(i?a:b),h=h&&h.get(i?b:a)):h=this.map.get(a),h)};