import Index from"./index.js";import Document from"./document.js";import{is_string}from"./common.js";const chunk_size_reg=250000,chunk_size_map=5000,chunk_size_ctx=1000;function map_to_json(a,b=0){let c=[],d=[];b&&(b=0|chunk_size_map*(chunk_size_reg/b));for(const e of a.entries())d.push(e),d.length===b&&(c.push(d),d=[]);return d.length&&c.push(d),c}function json_to_map(a,b){b||(b=new Map);for(let c,d=0;d<a.length;d++)c=a[d],b.set(c[0],c[1]);return b}function ctx_to_json(a,b=0){let c=[],d=[];b&&(b=0|chunk_size_ctx*(chunk_size_reg/b));for(const e of a.entries()){const a=e[0],f=e[1];d.push([a,map_to_json(f)[0]]),d.length===b&&(c.push(d),d=[])}return d.length&&c.push(d),c}function json_to_ctx(a,b){b||(b=new Map);for(let c,d,e=0;e<a.length;e++)c=a[e],d=b.get(c[0]),b.set(c[0],json_to_map(c[1],d));return b}function reg_to_json(a){let b=[],c=[];for(const d of a.keys())c.push(d),c.length===chunk_size_reg&&(b.push(c),c=[]);return c.length&&b.push(c),b}function json_to_reg(a,b){b||(b=new Set);for(let c=0;c<a.length;c++)b.add(a[c]);return b}function save(a,b,c,d,e,f,g=0){const h=d&&d.constructor===Array,i=h?d.shift():d;if(!i)return this.export(a,b,e,f+1);const j=a((b?b+".":"")+(g+1)+"."+c,JSON.stringify(i));if(j&&j.then){const i=this;return j.then(function(){return save.call(i,a,b,c,h?d:null,e,f,g+1)})}return save.call(this,a,b,c,h?d:null,e,f,g+1)}export function exportIndex(a,b,c,d=0){let e,f;switch(d){case 0:e="reg",f=reg_to_json(this.reg);break;case 1:e="cfg",f={};break;case 2:e="map",f=map_to_json(this.map,this.reg.size);break;case 3:e="ctx",f=ctx_to_json(this.ctx,this.reg.size);break;default:return;}return save.call(this,a,b,e,f,c,d)}export function importIndex(a,b){if(b)switch(is_string(b)&&(b=JSON.parse(b)),a=a.split("."),"json"===a[a.length-1]&&a.pop(),a=1<a.length?a[1]:a[0],a){case"cfg":break;case"reg":this.fastupdate=!1,this.reg=json_to_reg(b,this.reg);break;case"map":this.map=json_to_map(b,this.map);break;case"ctx":this.ctx=json_to_ctx(b,this.ctx);}}export function exportDocument(a,b,c=0,d=0){if(c<this.field.length){const b=this.field[c],e=this.index.get(b),f=e.export(a,b,c,d=1);if(f&&f.then){const d=this;return f.then(function(){return d.export(a,b,c+1)})}return this.export(a,b,c+1)}else{let e,f;switch(d){case 0:e="reg",f=reg_to_json(this.reg),b=null;break;case 1:e="tag",f=ctx_to_json(this.tag,this.reg.size),b=null;break;case 2:e="doc",f=map_to_json(this.store),b=null;break;case 3:e="cfg",f={},b=null;break;default:return;}return save.call(this,a,b,e,f,c,d)}}export function importDocument(a,b){if(b){is_string(b)&&(b=JSON.parse(b)),a=a.split("."),"json"===a[a.length-1]&&a.pop();const c=2<a.length?a[0]:"";if(a=2<a.length?a[2]:a[1],!c)switch(a){case"reg":this.fastupdate=!1,this.reg=json_to_reg(b,this.reg);for(let a,b=0;b<this.field.length;b++)a=this.index.get(this.field[b]),a.fastupdate=!1,a.reg=this.reg;break;case"tag":this.tag=json_to_ctx(b,this.tag);break;case"doc":this.store=json_to_map(b,this.store);break;case"cfg":}else return this.index.get(c).import(a,b)}}export function serialize(a=!0){if(!this.reg.size)return"";let b="",c="";for(const d of this.reg.keys())c||(c=typeof d),b+=(b?",":"")+("string"==c?"\""+d+"\"":d);b="index.reg=new Set(["+b+"]);";let d="";for(const b of this.map.entries()){const a=b[0],e=b[1];let f="";for(let a,b=0;b<e.length;b++){a=e[b]||[""];let d="";for(let b=0;b<a.length;b++)d+=(d?",":"")+("string"==c?"\""+a[b]+"\"":a[b]);d="["+d+"]",f+=(f?",":"")+d}f="[\""+a+"\",["+f+"]]",d+=(d?",":"")+f}d="index.map=new Map(["+d+"]);";let e="";for(const b of this.ctx.entries()){const a=b[0],d=b[1];for(const b of d.entries()){const d=b[0],f=b[1];let g="";for(let a,b=0;b<f.length;b++){a=f[b]||[""];let d="";for(let b=0;b<a.length;b++)d+=(d?",":"")+("string"==c?"\""+a[b]+"\"":a[b]);d="["+d+"]",g+=(g?",":"")+d}g="new Map([[\""+d+"\",["+g+"]]])",g="[\""+a+"\","+g+"]",e+=(e?",":"")+g}}return e="index.ctx=new Map(["+e+"]);",a?"function inject(index){"+b+d+e+"}":b+d+e}