import Index from"../index.js";import{IndexOptions}from"../type.js";let index,options;export default(async function(a){a=a.data;const b=a.task,c=a.id;let d=a.args;switch(b){case"init":options=a.options||{};let e=options.config;e&&(options=options);const f=a.factory;f?(Function("return "+f)()(self),index=new self.FlexSearch.Index(options),delete self.FlexSearch):index=new Index(options),postMessage({id:c});break;default:let g;"export"===b&&(d=[options.export]);"import"===b?await options.import.call(index,index):(g=index[b].apply(index,d),g.then&&(g=await g));postMessage("search"===b?{id:c,msg:g}:{id:c});}});