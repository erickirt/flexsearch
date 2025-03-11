import{MongoClient}from"mongodb";const defaults={host:"localhost",port:"27017",user:null,pass:null},VERSION=1,fields=["map","ctx","tag","reg","cfg"];import StorageInterface from"../interface.js";import{toArray}from"../../common.js";function sanitize(a){return a.toLowerCase().replace(/[^a-z0-9_\-]/g,"")}let CLIENT,DB=Object.create(null);export default function MongoDB(a,b={}){return this?void("object"==typeof a&&(a=a.name,b=a),!a&&console.info("Default storage space was used, because a name was not passed."),this.id="flexsearch"+(a?"-"+sanitize(a):""),this.field=b.field?"-"+sanitize(b.field):"",this.type=b.type||"",this.db=b.db||DB[this.id]||CLIENT||null,this.trx=!1,this.support_tag_search=!0,Object.assign(defaults,b),this.db&&delete defaults.db):new MongoDB(a,b)}MongoDB.prototype.mount=function(a){return a.encoder?(a.db=this,this.open()):a.mount(this)};async function createCollection(a,b,c){"map"===b?(await a.createCollection("map"+c),await a.collection("map"+c).createIndex({key:1}),await a.collection("map"+c).createIndex({id:1})):"ctx"===b?(await a.createCollection("ctx"+c),await a.collection("ctx"+c).createIndex({ctx:1,key:1}),await a.collection("ctx"+c).createIndex({id:1})):"tag"===b?(await a.createCollection("tag"+c),await a.collection("tag"+c).createIndex({tag:1}),await a.collection("tag"+c).createIndex({id:1})):"reg"===b?(await a.createCollection("reg"),await a.collection("reg").createIndex({id:1})):"cfg"===b?await a.createCollection("cfg"+c):void 0}MongoDB.prototype.open=async function(){if(!this.db&&!(this.db=DB[this.id])&&!(this.db=CLIENT)){let a=defaults.url;a||(a=defaults.user?`mongodb://${defaults.user}:${defaults.pass}@${defaults.host}:${defaults.port}`:`mongodb://${defaults.host}:${defaults.port}`),this.db=CLIENT=new MongoClient(a),await this.db.connect()}this.db.db&&(this.db=DB[this.id]=this.db.db(this.id));const a=await this.db.listCollections().toArray();for(let b,c=0;c<fields.length;c++){b=!1;for(let d=0;d<a.length;d++)if(a[d].name===fields[c]+("reg"===fields[c]?"":this.field)){b=!0;break}b||(await createCollection(this.db,fields[c],this.field))}return this.db},MongoDB.prototype.close=function(){return this.db.close(),this.db=null,this},MongoDB.prototype.destroy=function(){return Promise.all([this.db.dropCollection("map"+this.field),this.db.dropCollection("ctx"+this.field),this.db.dropCollection("tag"+this.field),this.db.dropCollection("cfg"+this.field),this.db.dropCollection("reg")])};async function clear(a){await this.db.dropCollection(a),await createCollection(this.db,a,this.field)}MongoDB.prototype.clear=function(){return Promise.all([clear.call(this,"map"+this.field),clear.call(this,"ctx"+this.field),clear.call(this,"tag"+this.field),clear.call(this,"cfg"+this.field),clear.call(this,"reg")])};function create_result(a,b,c){if(b){if(!c)for(let b=0;b<a.length;b++)a[b]=a[b].id;return a}else{const b=[];for(let d,e=0;e<a.length;e++)d=a[e],b[d.res]||(b[d.res]=[]),b[d.res].push(c?d:d.id);return b}}MongoDB.prototype.get=async function(a,b,c=0,d=0,e=!0,f=!1,g){let h,i=b?{ctx:b,key:a}:{key:a};if(!f&&!g)h=await this.db.collection((b?"ctx":"map")+this.field).find(i,{projection:{_id:0,res:1,id:1},limit:c,skip:d}).toArray();else{const a={_id:0,id:1},j=[{$match:i}];if(e||(a.res=1),f&&(a.doc="$doc.doc",j.push({$lookup:{from:"reg",localField:"id",foreignField:"id",as:"doc"}},{$unwind:{path:"$doc",preserveNullAndEmptyArrays:!0}})),g){const b={};for(let c=0,d=1;c<g.length;c+=2)a["tag"+d]="$tag"+d+".tag",b["tag"+d]=g[c+1],j.push({$lookup:{from:"tag-"+sanitize(g[c]),localField:"id",foreignField:"id",as:"tag"+d}}),d++;j.push({$project:a},{$match:b},{$project:{id:1,doc:1}})}else j.push({$project:a});j.push({$sort:{res:1}},{$skip:d},{$limit:c}),h=[];for(const a=await this.db.collection((b?"ctx":"map")+this.field).aggregate(j);;){const b=await a.next();if(b)h.push(b);else break}}return create_result(h,e,f)},MongoDB.prototype.tag=async function(a,b=0,c=0,d=!1){if(!d){const d=await this.db.collection("tag"+this.field).find({tag:a},{projection:{_id:0,id:1},limit:b,skip:c}).toArray();return create_result(d,!0,!1)}else{const d=[{$match:{tag:a}},{$skip:c},{$limit:b},{$lookup:{from:"reg",localField:"id",foreignField:"id",as:"doc"}},{$project:{_id:0,id:1,doc:"$doc.doc"}},{$unwind:{path:"$doc",preserveNullAndEmptyArrays:!0}}];let e=[];for(const a=await this.db.collection("tag"+this.field).aggregate(d);;){const b=await a.next();if(b)e.push(b);else break}return e}},MongoDB.prototype.enrich=function(a){return"object"!=typeof a&&(a=[a]),this.db.collection("reg").find({id:{$in:a}},{projection:{_id:0,id:1,doc:1}}).toArray()},MongoDB.prototype.has=function(a){return this.db.collection("reg").countDocuments({id:a},{limit:1})},MongoDB.prototype.search=async function(a,b,c=100,d=0,e=!1,f=!0,g=!1,h){let i,j=[];if(1<b.length&&a.depth){let j,k=[],l=b[0];for(let c=1;c<b.length;c++){j=b[c];const d=a.bidirectional&&j>l;k.push({ctx:d?j:l,key:d?l:j}),l=j}let m=f?{_id:1}:{_id:1,res:1};const n=[{$match:{$or:k}},{$group:{_id:"$id",res:e?{$sum:1}:{$min:1},count:{$sum:1}}}];if(e||n.push({$match:{count:b.length-1}}),g&&(m.doc="$doc.doc",n.push({$lookup:{from:"reg",localField:"_id",foreignField:"id",as:"doc"}},{$unwind:{path:"$doc",preserveNullAndEmptyArrays:!0}})),h){const a={};for(let b=0,c=1;b<h.length;b+=2)m["tag"+c]="$tag"+c+".tag",a["tag"+c]=h[b+1],n.push({$lookup:{from:"tag-"+sanitize(h[b]),localField:"_id",foreignField:"id",as:"tag"+c}}),c++;n.push({$project:m},{$match:a})}else n.push({$project:m});n.push({$sort:e?{count:-1,res:1}:{res:1}},{$skip:d},{$limit:c}),h&&(m={_id:1},!f&&(m.res=1),g&&(m.doc=1),n.push({$project:m})),i=await this.db.collection("ctx"+this.field).aggregate(n)}else{let a=f?{_id:1}:{_id:1,res:1};const j=[{$match:{key:{$in:b}}},{$group:{_id:"$id",res:e?{$sum:1}:{$min:1},count:{$sum:1}}}];if(e||j.push({$match:{count:b.length}}),g&&(a.doc="$doc.doc",j.push({$lookup:{from:"reg",localField:"_id",foreignField:"id",as:"doc"}},{$unwind:{path:"$doc",preserveNullAndEmptyArrays:!0}})),h){const b={};for(let c=0,d=1;c<h.length;c+=2)a["tag"+d]="$tag"+d+".tag",b["tag"+d]=h[c+1],j.push({$lookup:{from:"tag-"+sanitize(h[c]),localField:"_id",foreignField:"id",as:"tag"+d}}),d++;j.push({$project:a},{$match:b})}else j.push({$project:a});j.push({$sort:e?{count:-1,res:1}:{res:1}},{$skip:d},{$limit:c}),h&&(a={_id:1},!f&&(a.res=1),g&&(a.doc=1),j.push({$project:a})),i=await this.db.collection("map"+this.field).aggregate(j)}for(;;){const a=await i.next();if(a)f&&!g?j.push(a._id):(a.id=a._id,delete a._id,j.push(a));else break}return f&&!g?j:create_result(j,f,g)},MongoDB.prototype.info=function(){},MongoDB.prototype.transaction=function(a){return a.call(this)},MongoDB.prototype.commit=async function(a,b,c){if(b)await this.clear(),a.commit_task=[];else{let d=a.commit_task;a.commit_task=[];for(let a,c=0;c<d.length;c++)if(a=d[c],a.clear){await this.clear(),b=!0;break}else d[c]=a.del;b||(!c&&(d=d.concat(toArray(a.reg))),d.length&&(await this.remove(d)))}if(a.reg.size){if(a.map.size){let b=[];for(const c of a.map){const a=c[0],d=c[1];for(let c,e=0;e<d.length;e++)if((c=d[e])&&c.length){this.type||(this.type=typeof c[0]);for(let d=0;d<c.length;d++)b.push({key:a,res:e,id:c[d]})}}b.length&&(await this.db.collection("map"+this.field).insertMany(b),a.map.clear())}if(a.ctx.size){let b=[];for(const c of a.ctx){const a=c[0],d=c[1];for(const c of d){const d=c[0],e=c[1];for(let c,f=0;f<e.length;f++)if((c=e[f])&&c.length)for(let e=0;e<c.length;e++)b.push({ctx:a,key:d,res:f,id:c[e]})}}b.length&&(await this.db.collection("ctx"+this.field).insertMany(b),a.ctx.clear())}if(a.tag){let b=[];if(a.tag)for(const c of a.tag){const a=c[0],d=c[1];if(d.length)for(let c=0;c<d.length;c++)b.push({tag:a,id:d[c]})}b.length&&(await this.db.collection("tag"+this.field).insertMany(b),a.tag.clear())}let b=[];if(a.store)for(const c of a.store.entries()){const a=c[0],d=c[1];b.push({id:a,doc:d})}else if(!a.bypass)for(const c of a.reg.keys())b.push({id:c});b.length&&(await this.db.collection("reg").insertMany(b),a.store&&a.store.clear(),a.document||a.reg.clear())}},MongoDB.prototype.remove=function(a){if(a||0===a)return"object"!=typeof a&&(a=[a]),Promise.all([this.db.collection("map"+this.field).deleteMany({id:{$in:a}}),this.db.collection("ctx"+this.field).deleteMany({id:{$in:a}}),this.db.collection("tag"+this.field).deleteMany({id:{$in:a}}),this.db.collection("reg").deleteMany({id:{$in:a}})])};