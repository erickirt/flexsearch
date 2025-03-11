'use strict';

var redis = require('redis');

/**
 * @param {*} value
 * @param {*} default_value
 * @param {*=} merge_value
 * @return {*}
 */


/**
 * @param {Map|Set} val
 * @param {boolean=} stringify
 * @return {Array}
 */

function toArray(val, stringify){
    const result = [];
    for(const key of val.keys()){
        result.push("" + key );
    }
    return result;
}

// COMPILER BLOCK -->
const defaults = {
    host: "localhost",
    port: "6379",
    user: null,
    pass: null
};

function sanitize(str) {
    return str.toLowerCase().replace(/[^a-z0-9_\-]/g, "");
}

let DB, TRX;

/**
 * @constructor
 * @implements StorageInterface
 */

function RedisDB(name, config = {}){
    if(!this){
        return new RedisDB(name, config);
    }
    if(typeof name === "object"){
        name = name.name;
        config = name;
    }
    if(!name){
        console.info("Default storage space was used, because a name was not passed.");
    }
    this.id = (name ? sanitize(name) : "flexsearch") + "|";
    this.field = config.field ? "-" + sanitize(config.field) : "";
    this.type = config.type || "";
    this.fastupdate = true;
    this.db = config.db || DB || null;
    this.support_tag_search = true;
    //this.trx = false;
    Object.assign(defaults, config);
    this.db && delete defaults.db;
}
// RedisDB.mount = function(flexsearch){
//     return new this().mount(flexsearch);
// };

RedisDB.prototype.mount = function(flexsearch){
    //if(flexsearch.constructor === Document){
    if(!flexsearch.encoder){
        return flexsearch.mount(this);
    }
    flexsearch.db = this;
    // todo support
    //this.fastupdate = flexsearch.fastupdate;
    return this.open();
};

RedisDB.prototype.open = async function(){
    if(this.db){
        return this.db
    }
    let url = defaults.url;
    if(!url){
        url = defaults.user
            ? `redis://${defaults.user}:${defaults.pass}@${defaults.host}:${defaults.port}`
            : `redis://${defaults.host}:${defaults.port}`;
    }
    return this.db =
        await redis.createClient(url)
        .on("error", err => console.error(err))
        .connect();
};

RedisDB.prototype.close = async function(){
    await this.db.disconnect(); // this.db.client.disconnect();
    this.db = null;
    return this;
};

RedisDB.prototype.destroy = function(){
    return this.clear();
};

RedisDB.prototype.clear = function(){
    return this.db.unlink([
        this.id + "map" + this.field,
        this.id + "ctx" + this.field,
        this.id + "tag" + this.field,
        this.id + "cfg" + this.field,
        this.id + "doc",
        this.id + "reg"
    ]);
};

function create_result(range, type, resolve, enrich){
    if(resolve){
        for(let i = 0, tmp, id; i < range.length; i++){
            tmp = range[i];
            id = type === "number"
                ? parseInt(tmp.value || tmp, 10)
                : tmp.value || tmp;
            range[i] = /*enrich
                ? { id, doc: tmp.doc }
                :*/ id;
        }
        return range;
    }
    else {
        let result = [];
        for(let i = 0, tmp, id, score; i < range.length; i++){
            tmp = range[i];
            id = type === "number"
                ? parseInt(tmp.value, 10)
                : tmp.value;
            score = tmp.score;
            result[score] || (result[score] = []);
            result[score].push(
                enrich
                    ? { id, doc: tmp.doc }
                    : id
            );
        }
        return result;
    }
}

RedisDB.prototype.get = function(key, ctx, limit = 0, offset = 0, resolve = true, enrich = false, tags){

    if(tags){
        // flexsearch dummy
        const flexsearch = { depth: !!ctx };
        const query = ctx ? [ctx, key] : [key]; // keyword first
        return this.search(flexsearch, query, limit, offset, /* suggest */ false, resolve, enrich, tags);
    }

    const type = this.type;
    const self = this;
    let result;

    if(ctx){
        result = this.db[resolve ? "zRange" : "zRangeWithScores"](
            this.id + "ctx" + this.field + ":" + ctx + ":" + key,
            "" + offset,
            "" + (offset + limit - 1),
            { REV: true }
        );
    }
    else {
        result = this.db[resolve ? "zRange" : "zRangeWithScores"](
            this.id + "map" + this.field + ":" + key,
            "" + offset,
            "" + (offset + limit - 1),
            { REV: true }
        );
    }

    return result.then(async function(range){
        if(!range.length) return range;
        if(enrich) range = await self.enrich(range);
        return create_result(range, type, resolve, enrich);
    });
};

RedisDB.prototype.tag = function(tag, limit = 0, offset = 0, enrich = false){
    const self = this;
    return this.db.sMembers(this.id + "tag" + this.field + ":" + tag).then(function(ids){
        if(!ids || !ids.length || offset >= ids.length) return [];
        if(!limit && !offset) return ids;
        const result = ids.slice(offset, offset + limit);
        return enrich
            ? self.enrich(result)
            : result;
    });
};

RedisDB.prototype.enrich = function(ids){
    if(typeof ids !== "object"){
        ids = [ids];
    }
    return this.db.hmGet(this.id + "doc", ids).then(function(res){
        for(let i = 0; i < res.length; i++){
            res[i] = {
                id: ids[i],
                doc: res[i] && JSON.parse(res[i])
            };
        }
        return res;
    });
};

RedisDB.prototype.has = function(id){
    return this.db.sIsMember(this.id + "reg", "" + id);
};

RedisDB.prototype.search = function(flexsearch, query, limit = 100, offset = 0, suggest = false, resolve = true, enrich = false, tags){

    let result;

    if(query.length > 1 && flexsearch.depth){

        const key = this.id + "ctx" + this.field + ":";
        let params = [];
        let keyword = query[0];
        let term;

        for(let i = 1, swap; i < query.length; i++){
            term = query[i];
            swap = flexsearch.bidirectional && (term > keyword);
            params.push(key + (swap ? term : keyword) + ":" + (swap ? keyword : term));
            keyword = term;
        }
        query = params;
    }
    else {

        const key = this.id + "map" + this.field + ":";
        for(let i = 0; i < query.length; i++){
            query[i] = key + query[i];
        }
    }

    const type = this.type;
    let key = this.id + "tmp:" + Math.random();

    if(suggest){
        {
            if(tags) for(let i = 0; i < tags.length; i += 2){
                query.push(this.id + "tag-" + sanitize(tags[i]) + ":" + tags[i + 1]);
            }
        }
        const multi = this.db.multi().zUnionStore(key, query, { AGGREGATE: "SUM" });
        result = multi
            [(resolve ? "zRange" : "zRangeWithScores")](key, "" + offset, "" + (offset + limit - 1), { REV: true })
            .unlink(key)
            .exec();
    }
    else {
        if(tags) for(let i = 0; i < tags.length; i+=2){
            query.push(this.id + "tag-" + sanitize(tags[i]) + ":" + tags[i + 1]);
        }
        result = this.db.multi()
            .zInterStore(key, query, { AGGREGATE: "MIN" })
            [(resolve ? "zRange" : "zRangeWithScores")](key, "" + offset, "" + (offset + limit - 1), { REV: true })
            .unlink(key)
            .exec();
    }

    const self = this;
    return result.then(async function(range){
        range = suggest && tags
            // take the 3rd result from batch return
            ? range[2]
            // take the 2nd result from batch return
            : range[1];
        if(!range.length) return range;
        if(enrich) range = await self.enrich(range);
        return create_result(range, type, resolve, enrich);
    });
};

RedisDB.prototype.info = function(){
    // todo
};

RedisDB.prototype.transaction = async function(task, callback){

    if(TRX){
        return task.call(this, TRX);
    }

    TRX = this.db.multi();
    let promise1 = /*await*/ task.call(this, TRX);
    let promise2 = TRX.exec();
    TRX = null;
    callback && promise.then(callback);
    await Promise.all([promise1, promise2]);
};

RedisDB.prototype.commit = async function(flexsearch, _replace, _append){

    // process cleanup tasks
    if(_replace){
        await this.clear();
        // there are just removals in the task queue
        flexsearch.commit_task = [];
    }
    else {
        let tasks = flexsearch.commit_task;
        flexsearch.commit_task = [];
        for(let i = 0, task; i < tasks.length; i++){
            task = tasks[i];
            // there are just removals in the task queue
            if(task.clear){
                await this.clear();
                _replace = true;
                break;
            }
            else {
                tasks[i] = "" + task.del;
            }
        }
        if(!_replace){
            if(!_append){
                tasks = tasks.concat(toArray(flexsearch.reg));
            }
            tasks.length && await this.remove(tasks);
        }
    }

    if(!flexsearch.reg.size){
        return;
    }

    await this.transaction(function(trx){

        let refs = new Map();
        for(const item of flexsearch.map){
            const key = item[0];
            const arr = item[1];
            for(let i = 0, ids; i < arr.length; i++){
                if((ids = arr[i]) && ids.length){

                    let result = [];
                    for(let j = 0; j < ids.length; j++){
                        result.push({
                            score: i,
                            value: "" + ids[j]
                        });
                    }
                    if(typeof ids[0] === "number"){
                        this.type = "number";
                    }

                    const ref = this.id + "map" + this.field + ":" + key;
                    trx.zAdd(ref, result);
                    // if(this.fastupdate) for(let j = 0; j < ids.length; j++){
                    //     trx.sAdd("ref" + this.field + ":" + ids[j], ref);
                    // }
                    if(this.fastupdate) for(let j = 0, id; j < ids.length; j++){
                        // Map performs bad when pushing numeric-like values as key
                        // id = ids[j];
                        // let tmp = refs.get(id);
                        // tmp || refs.set(id, tmp = []);
                        // tmp.push(ref);
                        id = ids[j];
                        let tmp = refs.get(id);
                        tmp || refs.set(id, tmp = []);
                        tmp.push(ref);
                    }
                }
            }
        }
        // if(this.fastupdate) for(let item of refs){
        //     const key = item[0];
        //     const value = item[1];
        //     trx.sAdd("ref" + this.field + ":" + key, value);
        // }
        if(this.fastupdate) for(const item of refs){
            const key = item[0];
            const value = item[1];
            trx.sAdd(this.id + "ref" + this.field + ":" + key, value);
        }

        refs = new Map();
        for(const ctx of flexsearch.ctx){
            const ctx_key = ctx[0];
            const ctx_value = ctx[1];
            for(const item of ctx_value){
                const key = item[0];
                const arr = item[1];
                for(let i = 0, ids; i < arr.length; i++){
                    if((ids = arr[i]) && ids.length){
                        let result = [];
                        for(let j = 0; j < ids.length; j++){
                            result.push({ score: i, value: "" + ids[j] });
                        }
                        if(typeof ids[0] === "number"){
                            this.type = "number";
                        }
                        const ref = this.id + "ctx" + this.field + ":" + ctx_key + ":" + key;
                        trx.zAdd(ref, result);
                        // if(this.fastupdate) for(let j = 0; j < ids.length; j++){
                        //     trx.sAdd("ref" + this.field + ":" + ids[j], ref);
                        // }
                        if(this.fastupdate) for(let j = 0, id; j < ids.length; j++){
                            // Map performs bad when pushing numeric-like values as key
                            // id = ids[j];
                            // let tmp = refs.get(id);
                            // tmp || refs.set(id, tmp = []);
                            // tmp.push(ref);
                            id = ids[j];
                            let tmp = refs.get(id);
                            tmp || refs.set(id, tmp = []);
                            tmp.push(ref);
                        }
                    }
                }
            }
        }

        if(this.fastupdate) for(const item of refs){
            const key = item[0];
            const value = item[1];
            trx.sAdd(this.id + "ref" + this.field + ":" + key, value);
        }

        if(flexsearch.store){
            for(const item of flexsearch.store.entries()){
                const id = item[0];
                const doc = item[1];
                doc && trx.hSet(this.id + "doc", "" + id, JSON.stringify(doc));
            }
        }
        if(!flexsearch.bypass){
            let ids = toArray(flexsearch.reg);
            if(ids.length){
                trx.sAdd(this.id + "reg", ids);
            }
        }

        if(flexsearch.tag){
            for(const item of flexsearch.tag){
                const tag = item[0];
                const ids = item[1];
                if(!ids.length) continue;
                let result = [];
                // for(let i = 0; i < ids.length; i++){
                //     result.push({
                //         score: 0,
                //         value: "" + ids[i]
                //     });
                // }
                if(typeof ids[0] === "number"){
                    for(let i = 0; i < ids.length; i++){
                        result[i] = "" + ids[i];
                    }
                }
                else {
                    result = ids;
                }
                trx.sAdd(this.id + "tag" + this.field + ":" + tag, result);
            }
        }

        // TODO
        // trx.set(this.id + "cfg" + this.field, JSON.stringify({
        //     "encode": typeof flexsearch.encode === "string" ? flexsearch.encode : "",
        //     "charset": typeof flexsearch.charset === "string" ? flexsearch.charset : "",
        //     "tokenize": flexsearch.tokenize,
        //     "resolution": flexsearch.resolution,
        //     "minlength": flexsearch.minlength,
        //     "optimize": flexsearch.optimize,
        //     "fastupdate": flexsearch.fastupdate,
        //     "encoder": flexsearch.encoder,
        //     "context": {
        //         "depth": flexsearch.depth,
        //         "bidirectional": flexsearch.bidirectional,
        //         "resolution": flexsearch.resolution_ctx
        //     }
        // }));
    });

    flexsearch.map.clear();
    flexsearch.ctx.clear();
    flexsearch.tag &&
    flexsearch.tag.clear();
    flexsearch.store &&
    flexsearch.store.clear();
    flexsearch.document ||
    flexsearch.reg.clear();
};

RedisDB.prototype.remove = function(ids){

    if(!ids && ids !== 0){
        return;
    }
    if(typeof ids !== "object"){
        ids = [ids];
    }
    if(!ids.length){
        return;
    }

    return this.transaction(async function(trx){

        while(ids.length){
            let next;
            if(ids.length > 10000){
                next = ids.slice(10000);
                ids = ids.slice(0, 10000);
            }

            if(typeof ids[0] === "number"){
                for(let i = 0; i < ids.length; i++){
                    ids[i] = "" + ids[i];
                }
            }

            const check = await this.db.smIsMember(this.id + "reg", ids);

            for(let i = 0, id; i < ids.length; i++){
                if(!check[i]) continue;
                id = "" + ids[i];

                if(this.fastupdate){
                    // const refs = new Map();
                    const ref = await this.db.sMembers(this.id + "ref" + this.field + ":" + id);
                    if(ref){
                        for(let j = 0; j < ref.length; j++){
                            // let tmp = refs.get(ref[j]);
                            // tmp || refs.set(ref[j], tmp = []);
                            // tmp.push(id);
                            trx.zRem(ref[j], id);
                        }
                        trx.unlink(this.id + "ref" + this.field + ":" + id);
                    }
                    // for(let item of refs){
                    //     //console.log(item[0], item[1])
                    //     trx.zRem(item[0], item[1]);
                    // }
                }

                trx.hDel(this.id + "doc", id);
                trx.sRem(this.id + "reg", id);
            }

            if(next) ids = next;
            else break;
        }
    });
};

module.exports = RedisDB;
