import{SearchOptions,ContextOptions,DocumentDescriptor,DocumentSearchOptions,FieldOptions,IndexOptions,DocumentOptions,TagOptions,StoreOptions,EncoderOptions,EncoderSplitOptions,PersistentOptions,ResolverOptions}from"./type.js";import StorageInterface from"./db/interface.js";import Document from"./document.js";import Index from"./index.js";import WorkerIndex from"./worker.js";import Resolver from"./resolver.js";import Encoder from"./encoder.js";import IdxDB from"./db/indexeddb/index.js";import Charset from"./charset.js";import{KeystoreMap,KeystoreArray,KeystoreSet}from"./keystore.js";Index.prototype.add,Index.prototype.append,Index.prototype.search,Index.prototype.update,Index.prototype.remove,Index.prototype.contain,Index.prototype.clear,Index.prototype.cleanup,Index.prototype.searchCache,Index.prototype.addAsync,Index.prototype.appendAsync,Index.prototype.searchAsync,Index.prototype.updateAsync,Index.prototype.removeAsync,Index.prototype.export,Index.prototype.import,Index.prototype.serialize,Index.prototype.mount,Index.prototype.commit,Index.prototype.destroy,Index.prototype.encoder,Index.prototype.reg,Index.prototype.map,Index.prototype.ctx,Index.prototype.db,Index.prototype.tag,Index.prototype.store,Index.prototype.depth,Index.prototype.bidirectional,Index.prototype.commit_task,Index.prototype.commit_timer,Index.prototype.cache,Index.prototype.bypass,Index.prototype.document,Encoder.prototype.assign,Encoder.prototype.encode,Encoder.prototype.addMatcher,Encoder.prototype.addStemmer,Encoder.prototype.addFilter,Encoder.prototype.addMapper,Encoder.prototype.addReplacer,Document.prototype.add,Document.prototype.append,Document.prototype.search,Document.prototype.update,Document.prototype.remove,Document.prototype.contain,Document.prototype.clear,Document.prototype.cleanup,Document.prototype.addAsync,Document.prototype.appendAsync,Document.prototype.searchAsync,Document.prototype.updateAsync,Document.prototype.removeAsync,Document.prototype.mount,Document.prototype.commit,Document.prototype.destroy,Document.prototype.export,Document.prototype.import,Document.prototype.searchCache,Document.prototype.get,Document.prototype.set,Document.prototype.field,Document.prototype.index,Document.prototype.reg,Document.prototype.tag,Document.prototype.store,Document.prototype.fastupdate,Resolver.prototype.limit,Resolver.prototype.offset,Resolver.prototype.boost,Resolver.prototype.resolve,Resolver.prototype.or,Resolver.prototype.and,Resolver.prototype.xor,Resolver.prototype.not,Resolver.prototype.result,StorageInterface.db,StorageInterface.id,StorageInterface.support_tag_search,StorageInterface.fastupdate,StorageInterface.prototype.mount,StorageInterface.prototype.open,StorageInterface.prototype.close,StorageInterface.prototype.destroy,StorageInterface.prototype.clear,StorageInterface.prototype.get,StorageInterface.prototype.tag,StorageInterface.prototype.enrich,StorageInterface.prototype.has,StorageInterface.prototype.search,StorageInterface.prototype.info,StorageInterface.prototype.commit,StorageInterface.prototype.remove,KeystoreArray.length,KeystoreMap.size,KeystoreSet.size,Charset.Exact,Charset.Default,Charset.Normalize,Charset.LatinBalance,Charset.LatinAdvanced,Charset.LatinExtra,Charset.LatinSoundex,Charset.LatinExact,Charset.LatinDefault,Charset.LatinSimple,Charset.ArabicDefault,Charset.CjkDefault,Charset.CyrillicDefault,IndexOptions.preset,IndexOptions.context,IndexOptions.encoder,IndexOptions.encode,IndexOptions.resolution,IndexOptions.tokenize,IndexOptions.fastupdate,IndexOptions.score,IndexOptions.keystore,IndexOptions.rtl,IndexOptions.cache,IndexOptions.resolve,IndexOptions.db,IndexOptions.worker,IndexOptions.config,IndexOptions.priority,IndexOptions.export,IndexOptions.import,FieldOptions.preset,FieldOptions.context,FieldOptions.encoder,FieldOptions.encode,FieldOptions.resolution,FieldOptions.tokenize,FieldOptions.fastupdate,FieldOptions.score,FieldOptions.keystore,FieldOptions.rtl,FieldOptions.cache,FieldOptions.db,FieldOptions.config,FieldOptions.resolve,FieldOptions.field,FieldOptions.filter,FieldOptions.custom,FieldOptions.worker,DocumentOptions.context,DocumentOptions.encoder,DocumentOptions.encode,DocumentOptions.resolution,DocumentOptions.tokenize,DocumentOptions.fastupdate,DocumentOptions.score,DocumentOptions.keystore,DocumentOptions.rtl,DocumentOptions.cache,DocumentOptions.db,DocumentOptions.doc,DocumentOptions.document,DocumentOptions.worker,DocumentOptions.priority,DocumentOptions.export,DocumentOptions.import,ContextOptions.depth,ContextOptions.bidirectional,ContextOptions.resolution,DocumentDescriptor.field,DocumentDescriptor.index,DocumentDescriptor.tag,DocumentDescriptor.store,DocumentDescriptor.id,TagOptions.field,TagOptions.tag,TagOptions.filter,TagOptions.custom,TagOptions.keystore,TagOptions.db,TagOptions.config,StoreOptions.field,StoreOptions.filter,StoreOptions.custom,StoreOptions.config,SearchOptions.query,SearchOptions.limit,SearchOptions.offset,SearchOptions.context,SearchOptions.suggest,SearchOptions.resolve,SearchOptions.enrich,SearchOptions.resolution,DocumentSearchOptions.query,DocumentSearchOptions.limit,DocumentSearchOptions.offset,DocumentSearchOptions.context,DocumentSearchOptions.suggest,DocumentSearchOptions.enrich,DocumentSearchOptions.tag,DocumentSearchOptions.field,DocumentSearchOptions.index,DocumentSearchOptions.pluck,DocumentSearchOptions.merge,DocumentSearchOptions.highlight,EncoderOptions.rtl,EncoderOptions.dedupe,EncoderOptions.split,EncoderOptions.include,EncoderOptions.exclude,EncoderOptions.prepare,EncoderOptions.finalize,EncoderOptions.filter,EncoderOptions.matcher,EncoderOptions.mapper,EncoderOptions.stemmer,EncoderOptions.replacer,EncoderOptions.minlength,EncoderOptions.maxlength,EncoderOptions.cache,EncoderSplitOptions.letter,EncoderSplitOptions.number,EncoderSplitOptions.symbol,EncoderSplitOptions.punctuation,EncoderSplitOptions.control,EncoderSplitOptions.char,PersistentOptions.name,PersistentOptions.field,PersistentOptions.type,PersistentOptions.db,ResolverOptions.index,ResolverOptions.query,ResolverOptions.limit,ResolverOptions.offset,ResolverOptions.enrich,ResolverOptions.resolve,ResolverOptions.suggest,ResolverOptions.and,ResolverOptions.or,ResolverOptions.xor,ResolverOptions.not,ResolverOptions.pluck,ResolverOptions.field;const FlexSearch={Index:Index,Charset:Charset,Encoder:Encoder,Document:Document,Worker:WorkerIndex,Resolver:Resolver,IndexedDB:IdxDB,Language:{}};{const a="undefined"==typeof self?"undefined"==typeof global?self:global:self;let b;(b=a.define)&&b.amd?b([],function(){return FlexSearch}):"object"==typeof a.exports?a.exports=FlexSearch:a.FlexSearch=FlexSearch}export default FlexSearch;export{Index,Document,Encoder,Charset,WorkerIndex as Worker,Resolver,IdxDB as IndexedDB};