/**!
 * FlexSearch.js v0.8.151 (Bundle/Module/Debug)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */
var v;
function A(a, c, b) {
  const e = typeof b, d = typeof a;
  if ("undefined" !== e) {
    if ("undefined" !== d) {
      if (b) {
        if ("function" === d && e === d) {
          return function(k) {
            return a(b(k));
          };
        }
        c = a.constructor;
        if (c === b.constructor) {
          if (c === Array) {
            return b.concat(a);
          }
          if (c === Map) {
            var f = new Map(b);
            for (var g of a) {
              f.set(g[0], g[1]);
            }
            return f;
          }
          if (c === Set) {
            g = new Set(b);
            for (f of a.values()) {
              g.add(f);
            }
            return g;
          }
        }
      }
      return a;
    }
    return b;
  }
  return "undefined" === d ? c : a;
}
function B() {
  return Object.create(null);
}
function F(a) {
  return "string" === typeof a;
}
function H(a) {
  return "object" === typeof a;
}
function aa(a) {
  const c = [];
  for (const b of a.keys()) {
    c.push(b);
  }
  return c;
}
function ba(a, c) {
  if (F(c)) {
    a = a[c];
  } else {
    for (let b = 0; a && b < c.length; b++) {
      a = a[c[b]];
    }
  }
  return a;
}
function ca(a) {
  let c = 0;
  for (let b = 0, e; b < a.length; b++) {
    (e = a[b]) && c < e.length && (c = e.length);
  }
  return c;
}
;const da = /[^\p{L}\p{N}]+/u, ea = /(\d{3})/g, fa = /(\D)(\d{3})/g, ha = /(\d{3})(\D)/g, ia = /[\u0300-\u036f]/g;
function ja(a = {}) {
  if (!this || this.constructor !== ja) {
    return new ja(...arguments);
  }
  if (arguments.length) {
    for (a = 0; a < arguments.length; a++) {
      this.assign(arguments[a]);
    }
  } else {
    this.assign(a);
  }
}
v = ja.prototype;
v.assign = function(a) {
  this.normalize = A(a.normalize, !0, this.normalize);
  let c = a.include, b = c || a.exclude || a.split, e;
  if (b || "" === b) {
    if ("object" === typeof b && b.constructor !== RegExp) {
      let d = "";
      e = !c;
      c || (d += "\\p{Z}");
      b.letter && (d += "\\p{L}");
      b.number && (d += "\\p{N}", e = !!c);
      b.symbol && (d += "\\p{S}");
      b.punctuation && (d += "\\p{P}");
      b.control && (d += "\\p{C}");
      if (b = b.char) {
        d += "object" === typeof b ? b.join("") : b;
      }
      try {
        this.split = new RegExp("[" + (c ? "^" : "") + d + "]+", "u");
      } catch (f) {
        console.error("Your split configuration:", b, "is not supported on this platform. It falls back to using simple whitespace splitter instead: /s+/."), this.split = /\s+/;
      }
    } else {
      this.split = b, e = !1 === b || 2 > "a1a".split(b).length;
    }
    this.numeric = A(a.numeric, e);
  } else {
    try {
      this.split = A(this.split, da);
    } catch (d) {
      console.warn("This platform does not support unicode regex. It falls back to using simple whitespace splitter instead: /s+/."), this.split = /\s+/;
    }
    this.numeric = A(a.numeric, A(this.numeric, !0));
  }
  this.prepare = A(a.prepare, null, this.prepare);
  this.finalize = A(a.finalize, null, this.finalize);
  b = a.filter;
  this.filter = "function" === typeof b ? b : A(b && new Set(b), null, this.filter);
  this.dedupe = A(a.dedupe, !0, this.dedupe);
  this.matcher = A((b = a.matcher) && new Map(b), null, this.matcher);
  this.mapper = A((b = a.mapper) && new Map(b), null, this.mapper);
  this.stemmer = A((b = a.stemmer) && new Map(b), null, this.stemmer);
  this.replacer = A(a.replacer, null, this.replacer);
  this.minlength = A(a.minlength, 1, this.minlength);
  this.maxlength = A(a.maxlength, 1024, this.maxlength);
  this.rtl = A(a.rtl, !1, this.rtl);
  if (this.cache = b = A(a.cache, !0, this.cache)) {
    this.H = null, this.S = "number" === typeof b ? b : 2e5, this.B = new Map(), this.G = new Map(), this.L = this.K = 128;
  }
  this.h = "";
  this.M = null;
  this.A = "";
  this.N = null;
  if (this.matcher) {
    for (const d of this.matcher.keys()) {
      this.h += (this.h ? "|" : "") + d;
    }
  }
  if (this.stemmer) {
    for (const d of this.stemmer.keys()) {
      this.A += (this.A ? "|" : "") + d;
    }
  }
  return this;
};
v.addStemmer = function(a, c) {
  this.stemmer || (this.stemmer = new Map());
  this.stemmer.set(a, c);
  this.A += (this.A ? "|" : "") + a;
  this.N = null;
  this.cache && I(this);
  return this;
};
v.addFilter = function(a) {
  "function" === typeof a ? this.filter = a : (this.filter || (this.filter = new Set()), this.filter.add(a));
  this.cache && I(this);
  return this;
};
v.addMapper = function(a, c) {
  if ("object" === typeof a) {
    return this.addReplacer(a, c);
  }
  if (1 < a.length) {
    return this.addMatcher(a, c);
  }
  this.mapper || (this.mapper = new Map());
  this.mapper.set(a, c);
  this.cache && I(this);
  return this;
};
v.addMatcher = function(a, c) {
  if ("object" === typeof a) {
    return this.addReplacer(a, c);
  }
  if (2 > a.length && (this.dedupe || this.mapper)) {
    return this.addMapper(a, c);
  }
  this.matcher || (this.matcher = new Map());
  this.matcher.set(a, c);
  this.h += (this.h ? "|" : "") + a;
  this.M = null;
  this.cache && I(this);
  return this;
};
v.addReplacer = function(a, c) {
  if ("string" === typeof a) {
    return this.addMatcher(a, c);
  }
  this.replacer || (this.replacer = []);
  this.replacer.push(a, c);
  this.cache && I(this);
  return this;
};
v.encode = function(a) {
  if (this.cache && a.length <= this.K) {
    if (this.H) {
      if (this.B.has(a)) {
        return this.B.get(a);
      }
    } else {
      this.H = setTimeout(I, 50, this);
    }
  }
  this.normalize && ("function" === typeof this.normalize ? a = this.normalize(a) : a = ia ? a.normalize("NFKD").replace(ia, "").toLowerCase() : a.toLowerCase());
  this.prepare && (a = this.prepare(a));
  this.numeric && 3 < a.length && (a = a.replace(fa, "$1 $2").replace(ha, "$1 $2").replace(ea, "$1 "));
  const c = !(this.dedupe || this.mapper || this.filter || this.matcher || this.stemmer || this.replacer);
  let b = [], e = this.split || "" === this.split ? a.split(this.split) : a;
  for (let f = 0, g, k; f < e.length; f++) {
    if ((g = k = e[f]) && !(g.length < this.minlength || g.length > this.maxlength)) {
      if (c) {
        b.push(g);
      } else {
        if (!this.filter || ("function" === typeof this.filter ? this.filter(g) : !this.filter.has(g))) {
          if (this.cache && g.length <= this.L) {
            if (this.H) {
              var d = this.G.get(g);
              if (d || "" === d) {
                d && b.push(d);
                continue;
              }
            } else {
              this.H = setTimeout(I, 50, this);
            }
          }
          this.stemmer && 2 < g.length && (this.N || (this.N = new RegExp("(?!^)(" + this.A + ")$")), d = g, g = g.replace(this.N, h => this.stemmer.get(h)), d !== g && this.filter && g.length >= this.minlength && ("function" === typeof this.filter ? !this.filter(g) : this.filter.has(g)) && (g = ""));
          if (g && (this.mapper || this.dedupe && 1 < g.length)) {
            d = "";
            for (let h = 0, l = "", n, m; h < g.length; h++) {
              n = g.charAt(h), n === l && this.dedupe || ((m = this.mapper && this.mapper.get(n)) || "" === m ? m === l && this.dedupe || !(l = m) || (d += m) : d += l = n);
            }
            g = d;
          }
          this.matcher && 1 < g.length && (this.M || (this.M = new RegExp("(" + this.h + ")", "g")), g = g.replace(this.M, h => this.matcher.get(h)));
          if (g && this.replacer) {
            for (d = 0; g && d < this.replacer.length; d += 2) {
              g = g.replace(this.replacer[d], this.replacer[d + 1]);
            }
          }
          this.cache && k.length <= this.L && (this.G.set(k, g), this.G.size > this.S && (this.G.clear(), this.L = this.L / 1.1 | 0));
          g && b.push(g);
        }
      }
    }
  }
  this.finalize && (b = this.finalize(b) || b);
  this.cache && a.length <= this.K && (this.B.set(a, b), this.B.size > this.S && (this.B.clear(), this.K = this.K / 1.1 | 0));
  return b;
};
function I(a) {
  a.H = null;
  a.B.clear();
  a.G.clear();
}
;let J, M;
async function ka(a) {
  a = a.data;
  var c = a.task;
  const b = a.id;
  let e = a.args;
  switch(c) {
    case "init":
      M = a.options || {};
      (c = a.factory) ? (Function("return " + c)()(self), J = new self.FlexSearch.Index(M), delete self.FlexSearch) : J = new N(M);
      postMessage({id:b});
      break;
    default:
      let d;
      if ("export" === c) {
        if (!M.export || "function" !== typeof M.export) {
          throw Error('Either no extern configuration provided for the Worker-Index or no method was defined on the config property "export".');
        }
        e[1] ? (e[0] = M.export, e[2] = 0, e[3] = 1) : e = null;
      }
      if ("import" === c) {
        if (!M.import || "function" !== typeof M.import) {
          throw Error('Either no extern configuration provided for the Worker-Index or no method was defined on the config property "import".');
        }
        e[0] && (a = await M.import.call(J, e[0]), J.import(e[0], a));
      } else {
        (d = e && J[c].apply(J, e)) && d.then && (d = await d);
      }
      postMessage("search" === c ? {id:b, msg:d} : {id:b});
  }
}
;function la(a) {
  ma.call(a, "add");
  ma.call(a, "append");
  ma.call(a, "search");
  ma.call(a, "update");
  ma.call(a, "remove");
}
let na, oa, pa;
function qa() {
  na = pa = 0;
}
function ma(a) {
  this[a + "Async"] = function() {
    const c = arguments;
    var b = c[c.length - 1];
    let e;
    "function" === typeof b && (e = b, delete c[c.length - 1]);
    na ? pa || (pa = Date.now() - oa >= this.priority * this.priority * 3) : (na = setTimeout(qa, 0), oa = Date.now());
    if (pa) {
      const f = this;
      return new Promise(g => {
        setTimeout(function() {
          g(f[a + "Async"].apply(f, c));
        }, 0);
      });
    }
    const d = this[a].apply(this, c);
    b = d.then ? d : new Promise(f => f(d));
    e && b.then(e);
    return b;
  };
}
;let O = 0;
function P(a = {}) {
  function c(g) {
    function k(h) {
      h = h.data || h;
      const l = h.id, n = l && d.h[l];
      n && (n(h.msg), delete d.h[l]);
    }
    this.worker = g;
    this.h = B();
    if (this.worker) {
      e ? this.worker.on("message", k) : this.worker.onmessage = k;
      if (a.config) {
        return new Promise(function(h) {
          d.h[++O] = function() {
            h(d);
            1e9 < O && (O = 0);
          };
          d.worker.postMessage({id:O, task:"init", factory:b, options:a});
        });
      }
      this.worker.postMessage({task:"init", factory:b, options:a});
      this.priority = a.priority || 4;
      return this;
    }
  }
  if (!this || this.constructor !== P) {
    return new P(a);
  }
  let b = "undefined" !== typeof self ? self._factory : "undefined" !== typeof window ? window._factory : null;
  b && (b = b.toString());
  const e = "undefined" === typeof window, d = this, f = ra(b, e, a.worker);
  return f.then ? f.then(function(g) {
    return c.call(d, g);
  }) : c.call(this, f);
}
Q("add");
Q("append");
Q("search");
Q("update");
Q("remove");
Q("clear");
Q("export");
Q("import");
la(P.prototype);
function Q(a) {
  P.prototype[a] = function() {
    const c = this, b = [].slice.call(arguments);
    var e = b[b.length - 1];
    let d;
    "function" === typeof e && (d = e, b.pop());
    e = new Promise(function(f) {
      "export" === a && "function" === typeof b[0] && (b[0] = null);
      c.h[++O] = f;
      c.worker.postMessage({task:a, id:O, args:b});
    });
    return d ? (e.then(d), this) : e;
  };
}
function ra(a, c, b) {
  return c ? "undefined" !== typeof module ? new(require("worker_threads")["Worker"])(__dirname+"/worker/node.js") : import("worker_threads").then(function(worker){return new worker["Worker"](import.meta.dirname+"/node/node.mjs")}) : a ? new window.Worker(URL.createObjectURL(new Blob(["onmessage=" + ka.toString()], {type:"text/javascript"}))) : new window.Worker("string" === typeof b ? b : import.meta.url.replace("/worker.js", "/worker/worker.js").replace("flexsearch.bundle.module.min.js", 
  "module/worker/worker.js"), {type:"module"});
}
;function sa(a, c = 0) {
  let b = [], e = [];
  c && (c = 250000 / c * 5000 | 0);
  for (const d of a.entries()) {
    e.push(d), e.length === c && (b.push(e), e = []);
  }
  e.length && b.push(e);
  return b;
}
function ta(a, c) {
  c || (c = new Map());
  for (let b = 0, e; b < a.length; b++) {
    e = a[b], c.set(e[0], e[1]);
  }
  return c;
}
function ua(a, c = 0) {
  let b = [], e = [];
  c && (c = 250000 / c * 1000 | 0);
  for (const d of a.entries()) {
    e.push([d[0], sa(d[1])[0]]), e.length === c && (b.push(e), e = []);
  }
  e.length && b.push(e);
  return b;
}
function va(a, c) {
  c || (c = new Map());
  for (let b = 0, e, d; b < a.length; b++) {
    e = a[b], d = c.get(e[0]), c.set(e[0], ta(e[1], d));
  }
  return c;
}
function wa(a) {
  let c = [], b = [];
  for (const e of a.keys()) {
    b.push(e), 250000 === b.length && (c.push(b), b = []);
  }
  b.length && c.push(b);
  return c;
}
function xa(a, c) {
  c || (c = new Set());
  for (let b = 0; b < a.length; b++) {
    c.add(a[b]);
  }
  return c;
}
function ya(a, c, b, e, d, f, g = 0) {
  const k = e && e.constructor === Array;
  var h = k ? e.shift() : e;
  if (!h) {
    return this.export(a, c, d, f + 1);
  }
  if ((h = a((c ? c + "." : "") + (g + 1) + "." + b, JSON.stringify(h))) && h.then) {
    const l = this;
    return h.then(function() {
      return ya.call(l, a, c, b, k ? e : null, d, f, g + 1);
    });
  }
  return ya.call(this, a, c, b, k ? e : null, d, f, g + 1);
}
function za(a, c) {
  let b = "";
  for (const e of a.entries()) {
    a = e[0];
    const d = e[1];
    let f = "";
    for (let g = 0, k; g < d.length; g++) {
      k = d[g] || [""];
      let h = "";
      for (let l = 0; l < k.length; l++) {
        h += (h ? "," : "") + ("string" === c ? '"' + k[l] + '"' : k[l]);
      }
      h = "[" + h + "]";
      f += (f ? "," : "") + h;
    }
    f = '["' + a + '",[' + f + "]]";
    b += (b ? "," : "") + f;
  }
  return b;
}
;function Aa(a, c, b, e) {
  let d = [];
  for (let f = 0, g; f < a.index.length; f++) {
    if (g = a.index[f], c >= g.length) {
      c -= g.length;
    } else {
      c = g[e ? "splice" : "slice"](c, b);
      const k = c.length;
      if (k && (d = d.length ? d.concat(c) : c, b -= k, e && (a.length -= k), !b)) {
        break;
      }
      c = 0;
    }
  }
  return d;
}
function R(a) {
  if (!this || this.constructor !== R) {
    return new R(a);
  }
  this.index = a ? [a] : [];
  this.length = a ? a.length : 0;
  const c = this;
  return new Proxy([], {get(b, e) {
    if ("length" === e) {
      return c.length;
    }
    if ("push" === e) {
      return function(d) {
        c.index[c.index.length - 1].push(d);
        c.length++;
      };
    }
    if ("pop" === e) {
      return function() {
        if (c.length) {
          return c.length--, c.index[c.index.length - 1].pop();
        }
      };
    }
    if ("indexOf" === e) {
      return function(d) {
        let f = 0;
        for (let g = 0, k, h; g < c.index.length; g++) {
          k = c.index[g];
          h = k.indexOf(d);
          if (0 <= h) {
            return f + h;
          }
          f += k.length;
        }
        return -1;
      };
    }
    if ("includes" === e) {
      return function(d) {
        for (let f = 0; f < c.index.length; f++) {
          if (c.index[f].includes(d)) {
            return !0;
          }
        }
        return !1;
      };
    }
    if ("slice" === e) {
      return function(d, f) {
        return Aa(c, d || 0, f || c.length, !1);
      };
    }
    if ("splice" === e) {
      return function(d, f) {
        return Aa(c, d || 0, f || c.length, !0);
      };
    }
    if ("constructor" === e) {
      return Array;
    }
    if ("symbol" !== typeof e) {
      return (b = c.index[e / 2 ** 31 | 0]) && b[e];
    }
  }, set(b, e, d) {
    b = e / 2 ** 31 | 0;
    (c.index[b] || (c.index[b] = []))[e] = d;
    c.length++;
    return !0;
  }});
}
R.prototype.clear = function() {
  this.index.length = 0;
};
R.prototype.destroy = function() {
  this.proxy = this.index = null;
};
R.prototype.push = function() {
};
function S(a = 8) {
  if (!this || this.constructor !== S) {
    return new S(a);
  }
  this.index = B();
  this.h = [];
  this.size = 0;
  32 < a ? (this.B = Ba, this.A = BigInt(a)) : (this.B = Ca, this.A = a);
}
S.prototype.get = function(a) {
  const c = this.index[this.B(a)];
  return c && c.get(a);
};
S.prototype.set = function(a, c) {
  var b = this.B(a);
  let e = this.index[b];
  e ? (b = e.size, e.set(a, c), (b -= e.size) && this.size++) : (this.index[b] = e = new Map([[a, c]]), this.h.push(e), this.size++);
};
function T(a = 8) {
  if (!this || this.constructor !== T) {
    return new T(a);
  }
  this.index = B();
  this.h = [];
  this.size = 0;
  32 < a ? (this.B = Ba, this.A = BigInt(a)) : (this.B = Ca, this.A = a);
}
T.prototype.add = function(a) {
  var c = this.B(a);
  let b = this.index[c];
  b ? (c = b.size, b.add(a), (c -= b.size) && this.size++) : (this.index[c] = b = new Set([a]), this.h.push(b), this.size++);
};
v = S.prototype;
v.has = T.prototype.has = function(a) {
  const c = this.index[this.B(a)];
  return c && c.has(a);
};
v.delete = T.prototype.delete = function(a) {
  const c = this.index[this.B(a)];
  c && c.delete(a) && this.size--;
};
v.clear = T.prototype.clear = function() {
  this.index = B();
  this.h = [];
  this.size = 0;
};
v.values = T.prototype.values = function*() {
  for (let a = 0; a < this.h.length; a++) {
    for (let c of this.h[a].values()) {
      yield c;
    }
  }
};
v.keys = T.prototype.keys = function*() {
  for (let a = 0; a < this.h.length; a++) {
    for (let c of this.h[a].keys()) {
      yield c;
    }
  }
};
v.entries = T.prototype.entries = function*() {
  for (let a = 0; a < this.h.length; a++) {
    for (let c of this.h[a].entries()) {
      yield c;
    }
  }
};
function Ca(a) {
  let c = 2 ** this.A - 1;
  if ("number" == typeof a) {
    return a & c;
  }
  let b = 0, e = this.A + 1;
  for (let d = 0; d < a.length; d++) {
    b = (b * e ^ a.charCodeAt(d)) & c;
  }
  return 32 === this.A ? b + 2 ** 31 : b;
}
function Ba(a) {
  let c = BigInt(2) ** this.A - BigInt(1);
  var b = typeof a;
  if ("bigint" === b) {
    return a & c;
  }
  if ("number" === b) {
    return BigInt(a) & c;
  }
  b = BigInt(0);
  let e = this.A + BigInt(1);
  for (let d = 0; d < a.length; d++) {
    b = (b * e ^ BigInt(a.charCodeAt(d))) & c;
  }
  return b;
}
;U.prototype.add = function(a, c, b) {
  H(a) && (c = a, a = ba(c, this.key));
  if (c && (a || 0 === a)) {
    if (!b && this.reg.has(a)) {
      return this.update(a, c);
    }
    for (let k = 0, h; k < this.field.length; k++) {
      h = this.D[k];
      var e = this.index.get(this.field[k]);
      if ("function" === typeof h) {
        var d = h(c);
        d && e.add(a, d, !1, !0);
      } else {
        if (d = h.I, !d || d(c)) {
          h.constructor === String ? h = ["" + h] : F(h) && (h = [h]), Da(c, h, this.J, 0, e, a, h[0], b);
        }
      }
    }
    if (this.tag) {
      for (e = 0; e < this.F.length; e++) {
        var f = this.F[e], g = this.R[e];
        d = this.tag.get(g);
        let k = B();
        if ("function" === typeof f) {
          if (f = f(c), !f) {
            continue;
          }
        } else {
          const h = f.I;
          if (h && !h(c)) {
            continue;
          }
          f.constructor === String && (f = "" + f);
          f = ba(c, f);
        }
        if (d && f) {
          F(f) && (f = [f]);
          for (let h = 0, l, n; h < f.length; h++) {
            if (l = f[h], !k[l] && (k[l] = 1, (g = d.get(l)) ? n = g : d.set(l, n = []), !b || !n.includes(a))) {
              if (n.length === 2 ** 31 - 1) {
                g = new R(n);
                if (this.fastupdate) {
                  for (let m of this.reg.values()) {
                    m.includes(n) && (m[m.indexOf(n)] = g);
                  }
                }
                d.set(l, n = g);
              }
              n.push(a);
              this.fastupdate && ((g = this.reg.get(a)) ? g.push(n) : this.reg.set(a, [n]));
            }
          }
        } else {
          d || console.warn("Tag '" + g + "' was not found");
        }
      }
    }
    if (this.store && (!b || !this.store.has(a))) {
      let k;
      if (this.C) {
        k = B();
        for (let h = 0, l; h < this.C.length; h++) {
          l = this.C[h];
          if ((b = l.I) && !b(c)) {
            continue;
          }
          let n;
          if ("function" === typeof l) {
            n = l(c);
            if (!n) {
              continue;
            }
            l = [l.V];
          } else if (F(l) || l.constructor === String) {
            k[l] = c[l];
            continue;
          }
          Ea(c, k, l, 0, l[0], n);
        }
      }
      this.store.set(a, k || c);
    }
    this.worker && (this.fastupdate || this.reg.add(a));
  }
  return this;
};
function Ea(a, c, b, e, d, f) {
  a = a[d];
  if (e === b.length - 1) {
    c[d] = f || a;
  } else if (a) {
    if (a.constructor === Array) {
      for (c = c[d] = Array(a.length), d = 0; d < a.length; d++) {
        Ea(a, c, b, e, d);
      }
    } else {
      c = c[d] || (c[d] = B()), d = b[++e], Ea(a, c, b, e, d);
    }
  }
}
function Da(a, c, b, e, d, f, g, k) {
  if (a = a[g]) {
    if (e === c.length - 1) {
      if (a.constructor === Array) {
        if (b[e]) {
          for (c = 0; c < a.length; c++) {
            d.add(f, a[c], !0, !0);
          }
          return;
        }
        a = a.join(" ");
      }
      d.add(f, a, k, !0);
    } else {
      if (a.constructor === Array) {
        for (g = 0; g < a.length; g++) {
          Da(a, c, b, e, d, f, g, k);
        }
      } else {
        g = c[++e], Da(a, c, b, e, d, f, g, k);
      }
    }
  } else {
    d.db && d.remove(f);
  }
}
;function Fa(a, c, b, e, d, f, g) {
  const k = a.length;
  let h = [], l, n;
  l = B();
  for (let m = 0, q, p, r, u; m < c; m++) {
    for (let t = 0; t < k; t++) {
      if (r = a[t], m < r.length && (q = r[m])) {
        for (let w = 0; w < q.length; w++) {
          p = q[w];
          (n = l[p]) ? l[p]++ : (n = 0, l[p] = 1);
          u = h[n] || (h[n] = []);
          if (!g) {
            let y = m + (t || !d ? 0 : f || 0);
            u = u[y] || (u[y] = []);
          }
          u.push(p);
          if (g && b && n === k - 1 && u.length - e === b) {
            return e ? u.slice(e) : u;
          }
        }
      }
    }
  }
  if (a = h.length) {
    if (d) {
      h = 1 < h.length ? Ga(h, b, e, g, f) : (h = h[0]).length > b || e ? h.slice(e, b + e) : h;
    } else {
      if (a < k) {
        return [];
      }
      h = h[a - 1];
      if (b || e) {
        if (g) {
          if (h.length > b || e) {
            h = h.slice(e, b + e);
          }
        } else {
          d = [];
          for (let m = 0, q; m < h.length; m++) {
            if (q = h[m], q.length > e) {
              e -= q.length;
            } else {
              if (q.length > b || e) {
                q = q.slice(e, b + e), b -= q.length, e && (e -= q.length);
              }
              d.push(q);
              if (!b) {
                break;
              }
            }
          }
          h = 1 < d.length ? [].concat.apply([], d) : d[0];
        }
      }
    }
  }
  return h;
}
function Ga(a, c, b, e, d) {
  const f = [], g = B();
  let k;
  var h = a.length;
  let l;
  if (e) {
    for (d = h - 1; 0 <= d; d--) {
      if (l = (e = a[d]) && e.length) {
        for (h = 0; h < l; h++) {
          if (k = e[h], !g[k]) {
            if (g[k] = 1, b) {
              b--;
            } else {
              if (f.push(k), f.length === c) {
                return f;
              }
            }
          }
        }
      }
    }
  } else {
    for (let n = h - 1, m, q = 0; 0 <= n; n--) {
      m = a[n];
      for (let p = 0; p < m.length; p++) {
        if (l = (e = m[p]) && e.length) {
          for (let r = 0; r < l; r++) {
            if (k = e[r], !g[k]) {
              if (g[k] = 1, b) {
                b--;
              } else {
                let u = (p + (n < h - 1 ? d || 0 : 0)) / (n + 1) | 0;
                (f[u] || (f[u] = [])).push(k);
                if (++q === c) {
                  return f;
                }
              }
            }
          }
        }
      }
    }
  }
  return f;
}
function Ha(a, c, b) {
  const e = B(), d = [];
  for (let f = 0, g; f < c.length; f++) {
    g = c[f];
    for (let k = 0; k < g.length; k++) {
      e[g[k]] = 1;
    }
  }
  if (b) {
    for (let f = 0, g; f < a.length; f++) {
      g = a[f], e[g] && (d.push(g), e[g] = 0);
    }
  } else {
    for (let f = 0, g, k; f < a.result.length; f++) {
      for (g = a.result[f], c = 0; c < g.length; c++) {
        k = g[c], e[k] && ((d[f] || (d[f] = [])).push(k), e[k] = 0);
      }
    }
  }
  return d;
}
;function Ia(a, c, b, e) {
  if (!a.length) {
    return a;
  }
  if (1 === a.length) {
    return a = a[0], a = b || a.length > c ? c ? a.slice(b, b + c) : a.slice(b) : a, e ? V.call(this, a) : a;
  }
  let d = [];
  for (let f = 0, g, k; f < a.length; f++) {
    if ((g = a[f]) && (k = g.length)) {
      if (b) {
        if (b >= k) {
          b -= k;
          continue;
        }
        b < k && (g = c ? g.slice(b, b + c) : g.slice(b), k = g.length, b = 0);
      }
      k > c && (g = g.slice(0, c), k = c);
      if (!d.length && k >= c) {
        return e ? V.call(this, g) : g;
      }
      d.push(g);
      c -= k;
      if (!c) {
        break;
      }
    }
  }
  d = 1 < d.length ? [].concat.apply([], d) : d[0];
  return e ? V.call(this, d) : d;
}
;function Ja(a, c, b) {
  var e = b[0];
  if (e.then) {
    return Promise.all(b).then(function(n) {
      return a[c].apply(a, n);
    });
  }
  if (e[0] && e[0].index) {
    return a[c].apply(a, e);
  }
  e = [];
  let d = [], f = 0, g = 0, k, h, l;
  for (let n = 0, m; n < b.length; n++) {
    if (m = b[n]) {
      let q;
      if (m.constructor === W) {
        q = m.result;
      } else if (m.constructor === Array) {
        q = m;
      } else {
        if (f = m.limit || 0, g = m.offset || 0, l = m.suggest, h = m.resolve, k = m.enrich && h, m.index) {
          m.resolve = !1, m.enrich = !1, q = m.index.search(m).result, m.resolve = h, m.enrich = k;
        } else if (m.and) {
          q = a.and(m.and);
        } else if (m.or) {
          q = a.or(m.or);
        } else if (m.xor) {
          q = a.xor(m.xor);
        } else if (m.not) {
          q = a.not(m.not);
        } else {
          continue;
        }
      }
      if (q.then) {
        d.push(q);
      } else if (q.length) {
        e[n] = q;
      } else if (!l && ("and" === c || "xor" === c)) {
        e = [];
        break;
      }
    }
  }
  return {O:e, P:d, limit:f, offset:g, enrich:k, resolve:h, suggest:l};
}
;W.prototype.or = function() {
  const {O:a, P:c, limit:b, offset:e, enrich:d, resolve:f} = Ja(this, "or", arguments);
  return Ka.call(this, a, c, b, e, d, f);
};
function Ka(a, c, b, e, d, f) {
  if (c.length) {
    const g = this;
    return Promise.all(c).then(function(k) {
      a = [];
      for (let h = 0, l; h < k.length; h++) {
        (l = k[h]).length && (a[h] = l);
      }
      return Ka.call(g, a, [], b, e, d, f);
    });
  }
  a.length && (this.result.length && a.push(this.result), 2 > a.length ? this.result = a[0] : (this.result = Ga(a, b, e, !1, this.h), e = 0));
  return f ? this.resolve(b, e, d) : this;
}
;W.prototype.and = function() {
  let a = this.result.length, c, b, e, d;
  if (!a) {
    const f = arguments[0];
    f && (a = !!f.suggest, d = f.resolve, c = f.limit, b = f.offset, e = f.enrich && d);
  }
  if (a) {
    const {O:f, P:g, limit:k, offset:h, enrich:l, resolve:n, suggest:m} = Ja(this, "and", arguments);
    return La.call(this, f, g, k, h, l, n, m);
  }
  return d ? this.resolve(c, b, e) : this;
};
function La(a, c, b, e, d, f, g) {
  if (c.length) {
    const k = this;
    return Promise.all(c).then(function(h) {
      a = [];
      for (let l = 0, n; l < h.length; l++) {
        (n = h[l]).length && (a[l] = n);
      }
      return La.call(k, a, [], b, e, d, f, g);
    });
  }
  if (a.length) {
    if (this.result.length && a.unshift(this.result), 2 > a.length) {
      this.result = a[0];
    } else {
      if (c = ca(a)) {
        return this.result = Fa(a, c, b, e, g, this.h, f), f ? d ? V.call(this.index, this.result) : this.result : this;
      }
      this.result = [];
    }
  } else {
    g || (this.result = a);
  }
  return f ? this.resolve(b, e, d) : this;
}
;W.prototype.xor = function() {
  const {O:a, P:c, limit:b, offset:e, enrich:d, resolve:f, suggest:g} = Ja(this, "xor", arguments);
  return Ma.call(this, a, c, b, e, d, f, g);
};
function Ma(a, c, b, e, d, f, g) {
  if (c.length) {
    const k = this;
    return Promise.all(c).then(function(h) {
      a = [];
      for (let l = 0, n; l < h.length; l++) {
        (n = h[l]).length && (a[l] = n);
      }
      return Ma.call(k, a, [], b, e, d, f, g);
    });
  }
  if (a.length) {
    if (this.result.length && a.unshift(this.result), 2 > a.length) {
      this.result = a[0];
    } else {
      return this.result = Na.call(this, a, b, e, f, this.h), f ? d ? V.call(this.index, this.result) : this.result : this;
    }
  } else {
    g || (this.result = a);
  }
  return f ? this.resolve(b, e, d) : this;
}
function Na(a, c, b, e, d) {
  const f = [], g = B();
  let k = 0;
  for (let h = 0, l; h < a.length; h++) {
    if (l = a[h]) {
      k < l.length && (k = l.length);
      for (let n = 0, m; n < l.length; n++) {
        if (m = l[n]) {
          for (let q = 0, p; q < m.length; q++) {
            p = m[q], g[p] = g[p] ? 2 : 1;
          }
        }
      }
    }
  }
  for (let h = 0, l, n = 0; h < k; h++) {
    for (let m = 0, q; m < a.length; m++) {
      if (q = a[m]) {
        if (l = q[h]) {
          for (let p = 0, r; p < l.length; p++) {
            if (r = l[p], 1 === g[r]) {
              if (b) {
                b--;
              } else {
                if (e) {
                  if (f.push(r), f.length === c) {
                    return f;
                  }
                } else {
                  const u = h + (m ? d : 0);
                  f[u] || (f[u] = []);
                  f[u].push(r);
                  if (++n === c) {
                    return f;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return f;
}
;W.prototype.not = function() {
  const {O:a, P:c, limit:b, offset:e, enrich:d, resolve:f, suggest:g} = Ja(this, "not", arguments);
  return Oa.call(this, a, c, b, e, d, f, g);
};
function Oa(a, c, b, e, d, f, g) {
  if (c.length) {
    const k = this;
    return Promise.all(c).then(function(h) {
      a = [];
      for (let l = 0, n; l < h.length; l++) {
        (n = h[l]).length && (a[l] = n);
      }
      return Oa.call(k, a, [], b, e, d, f, g);
    });
  }
  if (a.length && this.result.length) {
    this.result = Pa.call(this, a, b, e, f);
  } else if (f) {
    return this.resolve(b, e, d);
  }
  return f ? d ? V.call(this.index, this.result) : this.result : this;
}
function Pa(a, c, b, e) {
  const d = [];
  a = new Set(a.flat().flat());
  for (let f = 0, g, k = 0; f < this.result.length; f++) {
    if (g = this.result[f]) {
      for (let h = 0, l; h < g.length; h++) {
        if (l = g[h], !a.has(l)) {
          if (b) {
            b--;
          } else {
            if (e) {
              if (d.push(l), d.length === c) {
                return d;
              }
            } else {
              if (d[f] || (d[f] = []), d[f].push(l), ++k === c) {
                return d;
              }
            }
          }
        }
      }
    }
  }
  return d;
}
;function W(a) {
  if (!this || this.constructor !== W) {
    return new W(a);
  }
  if (a && a.index) {
    return a.resolve = !1, this.index = a.index, this.h = a.boost || 0, this.result = a.index.search(a).result, this;
  }
  this.index = null;
  this.result = a || [];
  this.h = 0;
}
W.prototype.limit = function(a) {
  if (this.result.length) {
    const c = [];
    for (let b = 0, e; b < this.result.length; b++) {
      if (e = this.result[b]) {
        if (e.length <= a) {
          if (c[b] = e, a -= e.length, !a) {
            break;
          }
        } else {
          c[b] = e.slice(0, a);
          break;
        }
      }
    }
    this.result = c;
  }
  return this;
};
W.prototype.offset = function(a) {
  if (this.result.length) {
    const c = [];
    for (let b = 0, e; b < this.result.length; b++) {
      if (e = this.result[b]) {
        e.length <= a ? a -= e.length : (c[b] = e.slice(a), a = 0);
      }
    }
    this.result = c;
  }
  return this;
};
W.prototype.boost = function(a) {
  this.h += a;
  return this;
};
W.prototype.resolve = function(a, c, b) {
  const e = this.result, d = this.index;
  this.result = this.index = null;
  return e.length ? ("object" === typeof a && (b = a.enrich, c = a.offset, a = a.limit), Ia.call(d, e, a || 100, c, b)) : e;
};
B();
U.prototype.search = function(a, c, b, e) {
  b || (!c && H(a) ? (b = a, a = "") : H(c) && (b = c, c = 0));
  let d = [];
  var f = [], g;
  let k;
  let h, l;
  let n = 0;
  var m = !0;
  let q;
  if (b) {
    b.constructor === Array && (b = {index:b});
    a = b.query || a;
    var p = b.pluck;
    k = b.merge;
    h = p || b.field || (h = b.index) && (h.index ? null : h);
    l = this.tag && b.tag;
    var r = b.suggest;
    m = !1 !== b.resolve;
    if (!m && !p) {
      if (h = h || this.field) {
        F(h) ? p = h : (h.constructor === Array && 1 === h.length && (h = h[0]), p = h.field || h.index);
      }
      if (!p) {
        throw Error("Apply resolver on document search requires either the option 'pluck' to be set or just select a single field name in your query.");
      }
    }
    this.store && b.enrich && !m && console.warn("Enrich results can only be done on a final resolver task or when calling .resolve({ enrich: true })");
    q = (g = this.store && b.enrich && m) && b.highlight;
    c = b.limit || c;
    var u = b.offset || 0;
    c || (c = 100);
    if (l && (!this.db || !e)) {
      l.constructor !== Array && (l = [l]);
      var t = [];
      for (let z = 0, x; z < l.length; z++) {
        x = l[z];
        if (F(x)) {
          throw Error("A tag option can't be a string, instead it needs a { field: tag } format.");
        }
        if (x.field && x.tag) {
          var w = x.tag;
          if (w.constructor === Array) {
            for (var y = 0; y < w.length; y++) {
              t.push(x.field, w[y]);
            }
          } else {
            t.push(x.field, w);
          }
        } else {
          w = Object.keys(x);
          for (let C = 0, G, D; C < w.length; C++) {
            if (G = w[C], D = x[G], D.constructor === Array) {
              for (y = 0; y < D.length; y++) {
                t.push(G, D[y]);
              }
            } else {
              t.push(G, D);
            }
          }
        }
      }
      if (!t.length) {
        throw Error("Your tag definition within the search options is probably wrong. No valid tags found.");
      }
      l = t;
      if (!a) {
        m = [];
        if (t.length) {
          for (f = 0; f < t.length; f += 2) {
            if (this.db) {
              p = this.index.get(t[f]);
              if (!p) {
                console.warn("Tag '" + t[f] + ":" + t[f + 1] + "' will be skipped because there is no field '" + t[f] + "'.");
                continue;
              }
              m.push(p = p.db.tag(t[f + 1], c, u, g));
            } else {
              p = Qa.call(this, t[f], t[f + 1], c, u, g);
            }
            d.push({field:t[f], tag:t[f + 1], result:p});
          }
        }
        return m.length ? Promise.all(m).then(function(z) {
          for (let x = 0; x < z.length; x++) {
            d[x].result = z[x];
          }
          return d;
        }) : d;
      }
    }
    h && h.constructor !== Array && (h = [h]);
  }
  h || (h = this.field);
  t = !e && (this.worker || this.db) && [];
  let E;
  for (let z = 0, x, C, G; z < h.length; z++) {
    C = h[z];
    if (this.db && this.tag && !this.D[z]) {
      continue;
    }
    let D;
    F(C) || (D = C, C = D.field, a = D.query || a, c = D.limit || c, u = D.offset || u, r = D.suggest || r, g = this.store && (D.enrich || g));
    if (e) {
      x = e[z];
    } else {
      if (w = D || b, y = this.index.get(C), l && (this.db && (w.tag = l, E = y.db.support_tag_search, w.field = h), E || (w.enrich = !1)), t) {
        t[z] = y.search(a, c, w);
        w && g && (w.enrich = g);
        continue;
      } else {
        x = y.search(a, c, w), w && g && (w.enrich = g);
      }
    }
    G = x && (m ? x.length : x.result.length);
    if (l && G) {
      w = [];
      y = 0;
      if (this.db && e) {
        if (!E) {
          for (let K = h.length; K < e.length; K++) {
            let L = e[K];
            if (L && L.length) {
              y++, w.push(L);
            } else if (!r) {
              return m ? d : new W(d);
            }
          }
        }
      } else {
        for (let K = 0, L, ob; K < l.length; K += 2) {
          L = this.tag.get(l[K]);
          if (!L) {
            if (console.warn("Tag '" + l[K] + ":" + l[K + 1] + "' will be skipped because there is no field '" + l[K] + "'."), r) {
              continue;
            } else {
              return m ? d : new W(d);
            }
          }
          if (ob = (L = L && L.get(l[K + 1])) && L.length) {
            y++, w.push(L);
          } else if (!r) {
            return m ? d : new W(d);
          }
        }
      }
      if (y) {
        x = Ha(x, w, m);
        G = x.length;
        if (!G && !r) {
          return m ? x : new W(x);
        }
        y--;
      }
    }
    if (G) {
      f[n] = C, d.push(x), n++;
    } else if (1 === h.length) {
      return m ? d : new W(d);
    }
  }
  if (t) {
    if (this.db && l && l.length && !E) {
      for (g = 0; g < l.length; g += 2) {
        f = this.index.get(l[g]);
        if (!f) {
          if (console.warn("Tag '" + l[g] + ":" + l[g + 1] + "' was not found because there is no field '" + l[g] + "'."), r) {
            continue;
          } else {
            return m ? d : new W(d);
          }
        }
        t.push(f.db.tag(l[g + 1], c, u, !1));
      }
    }
    const z = this;
    return Promise.all(t).then(function(x) {
      return x.length ? z.search(a, c, b, x) : x;
    });
  }
  if (!n) {
    return m ? d : new W(d);
  }
  if (p && (!g || !this.store)) {
    return d[0];
  }
  t = [];
  for (u = 0; u < f.length; u++) {
    r = d[u];
    g && r.length && "undefined" === typeof r[0].doc && (this.db ? t.push(r = this.index.get(this.field[0]).db.enrich(r)) : r = V.call(this, r));
    if (p) {
      return m ? r : new W(r);
    }
    d[u] = {field:f[u], result:r};
  }
  if (g && this.db && t.length) {
    const z = this;
    return Promise.all(t).then(function(x) {
      for (let C = 0; C < x.length; C++) {
        d[C].result = x[C];
      }
      return k ? Ra(d) : q ? Sa(d, a, z.index, z.field, z.D, q) : d;
    });
  }
  return k ? Ra(d) : q ? Sa(d, a, this.index, this.field, this.D, q) : d;
};
function Sa(a, c, b, e, d, f) {
  let g, k, h;
  for (let l = 0, n, m, q, p; l < a.length; l++) {
    n = a[l].field;
    if (!n) {
      continue;
    }
    let r = a[l].result;
    q = b.get(n);
    m = q.encoder;
    h = q.tokenize;
    p = d[e.indexOf(n)];
    m !== g && (g = m, k = g.encode(c));
    for (let u = 0; u < r.length; u++) {
      let t = "", w = ba(r[u].doc, p).split(/\s+/);
      for (let y = 0, E, z; y < w.length; y++) {
        E = w[y];
        z = m.encode(E);
        z = 1 < z.length ? z.join(" ") : z[0];
        let x;
        if (z && E) {
          for (let C = 0, G; C < k.length; C++) {
            if (G = k[C], "strict" === h) {
              if (z === G) {
                t += (t ? " " : "") + f.replace("$1", E);
                x = !0;
                break;
              }
            } else {
              const D = z.indexOf(G);
              if (-1 < D) {
                t += (t ? " " : "") + E.substring(0, D) + f.replace("$1", E.substring(D, G.length)) + E.substring(D + G.length);
                x = !0;
                break;
              }
            }
          }
        }
        x || (t += (t ? " " : "") + w[y]);
      }
      r[u].highlight = t;
    }
  }
  return a;
}
function Ra(a) {
  const c = [], b = B();
  for (let e = 0, d, f; e < a.length; e++) {
    d = a[e];
    f = d.result;
    for (let g = 0, k, h, l; g < f.length; g++) {
      h = f[g], "object" !== typeof h && (h = {id:h}), k = h.id, (l = b[k]) ? l.push(d.field) : (h.field = b[k] = [d.field], c.push(h));
    }
  }
  return c;
}
function Qa(a, c, b, e, d) {
  let f = this.tag.get(a);
  if (!f) {
    return console.warn("Tag '" + a + "' was not found"), [];
  }
  if ((a = (f = f && f.get(c)) && f.length - e) && 0 < a) {
    if (a > b || e) {
      f = f.slice(e, e + b);
    }
    d && (f = V.call(this, f));
    return f;
  }
}
function V(a) {
  if (!this || !this.store) {
    return a;
  }
  const c = Array(a.length);
  for (let b = 0, e; b < a.length; b++) {
    e = a[b], c[b] = {id:e, doc:this.store.get(e)};
  }
  return c;
}
;function U(a) {
  if (!this || this.constructor !== U) {
    return new U(a);
  }
  const c = a.document || a.doc || a;
  let b, e;
  this.D = [];
  this.field = [];
  this.J = [];
  this.key = (b = c.key || c.id) && Ta(b, this.J) || "id";
  (e = a.keystore || 0) && (this.keystore = e);
  this.fastupdate = !!a.fastupdate;
  this.reg = !this.fastupdate || a.worker || a.db ? e ? new T(e) : new Set() : e ? new S(e) : new Map();
  this.C = (b = c.store || null) && b && !0 !== b && [];
  this.store = b && (e ? new S(e) : new Map());
  this.cache = (b = a.cache || null) && new X(b);
  a.cache = !1;
  this.worker = a.worker;
  this.priority = a.priority || 4;
  this.index = Ua.call(this, a, c);
  this.tag = null;
  if (b = c.tag) {
    if ("string" === typeof b && (b = [b]), b.length) {
      this.tag = new Map();
      this.F = [];
      this.R = [];
      for (let d = 0, f, g; d < b.length; d++) {
        f = b[d];
        g = f.field || f;
        if (!g) {
          throw Error("The tag field from the document descriptor is undefined.");
        }
        f.custom ? this.F[d] = f.custom : (this.F[d] = Ta(g, this.J), f.filter && ("string" === typeof this.F[d] && (this.F[d] = new String(this.F[d])), this.F[d].I = f.filter));
        this.R[d] = g;
        this.tag.set(g, new Map());
      }
    }
  }
  if (this.worker) {
    this.fastupdate = !1;
    a = [];
    for (const d of this.index.values()) {
      d.then && a.push(d);
    }
    if (a.length) {
      const d = this;
      return Promise.all(a).then(function(f) {
        let g = 0;
        for (const k of d.index.entries()) {
          const h = k[0];
          k[1].then && d.index.set(h, f[g++]);
        }
        return d;
      });
    }
  } else {
    a.db && (this.fastupdate = !1, this.mount(a.db));
  }
}
v = U.prototype;
v.mount = function(a) {
  if (this.worker) {
    throw Error("You can't use Worker-Indexes on a persistent model. That would be useless, since each of the persistent model acts like Worker-Index by default (Master/Slave).");
  }
  let c = this.field;
  if (this.tag) {
    for (let d = 0, f; d < this.R.length; d++) {
      f = this.R[d];
      var b = void 0;
      this.index.set(f, b = new N({}, this.reg));
      c === this.field && (c = c.slice(0));
      c.push(f);
      b.tag = this.tag.get(f);
    }
  }
  b = [];
  const e = {db:a.db, type:a.type, fastupdate:a.fastupdate};
  for (let d = 0, f, g; d < c.length; d++) {
    e.field = g = c[d];
    f = this.index.get(g);
    const k = new a.constructor(a.id, e);
    k.id = a.id;
    b[d] = k.mount(f);
    f.document = !0;
    d ? f.bypass = !0 : f.store = this.store;
  }
  this.db = !0;
  return Promise.all(b);
};
v.commit = async function(a, c) {
  const b = [];
  for (const e of this.index.values()) {
    b.push(e.commit(a, c));
  }
  await Promise.all(b);
  this.reg.clear();
};
v.destroy = function() {
  const a = [];
  for (const c of this.index.values()) {
    a.push(c.destroy());
  }
  return Promise.all(a);
};
function Ua(a, c) {
  const b = new Map();
  let e = c.index || c.field || c;
  F(e) && (e = [e]);
  for (let d = 0, f, g; d < e.length; d++) {
    f = e[d];
    F(f) || (g = f, f = f.field);
    g = H(g) ? Object.assign({}, a, g) : a;
    if (this.worker) {
      const k = new P(g);
      b.set(f, k);
    }
    this.worker || b.set(f, new N(g, this.reg));
    g.custom ? this.D[d] = g.custom : (this.D[d] = Ta(f, this.J), g.filter && ("string" === typeof this.D[d] && (this.D[d] = new String(this.D[d])), this.D[d].I = g.filter));
    this.field[d] = f;
  }
  if (this.C) {
    a = c.store;
    F(a) && (a = [a]);
    for (let d = 0, f, g; d < a.length; d++) {
      f = a[d], g = f.field || f, f.custom ? (this.C[d] = f.custom, f.custom.V = g) : (this.C[d] = Ta(g, this.J), f.filter && ("string" === typeof this.C[d] && (this.C[d] = new String(this.C[d])), this.C[d].I = f.filter));
    }
  }
  return b;
}
function Ta(a, c) {
  const b = a.split(":");
  let e = 0;
  for (let d = 0; d < b.length; d++) {
    a = b[d], "]" === a[a.length - 1] && (a = a.substring(0, a.length - 2)) && (c[e] = !0), a && (b[e++] = a);
  }
  e < b.length && (b.length = e);
  return 1 < e ? b : b[0];
}
v.append = function(a, c) {
  return this.add(a, c, !0);
};
v.update = function(a, c) {
  return this.remove(a).add(a, c);
};
v.remove = function(a) {
  H(a) && (a = ba(a, this.key));
  for (var c of this.index.values()) {
    c.remove(a, !0);
  }
  if (this.reg.has(a)) {
    if (this.tag && !this.fastupdate) {
      for (let b of this.tag.values()) {
        for (let e of b) {
          c = e[0];
          const d = e[1], f = d.indexOf(a);
          -1 < f && (1 < d.length ? d.splice(f, 1) : b.delete(c));
        }
      }
    }
    this.store && this.store.delete(a);
    this.reg.delete(a);
  }
  this.cache && this.cache.remove(a);
  return this;
};
v.clear = function() {
  const a = [];
  for (const c of this.index.values()) {
    const b = c.clear();
    b.then && a.push(b);
  }
  if (this.tag) {
    for (const c of this.tag.values()) {
      c.clear();
    }
  }
  this.store && this.store.clear();
  this.cache && this.cache.clear();
  return a.length ? Promise.all(a) : this;
};
v.contain = function(a) {
  return this.db ? this.index.get(this.field[0]).db.has(a) : this.reg.has(a);
};
v.cleanup = function() {
  for (const a of this.index.values()) {
    a.cleanup();
  }
  return this;
};
v.get = function(a) {
  return this.db ? this.index.get(this.field[0]).db.enrich(a).then(function(c) {
    return c[0] && c[0].doc || null;
  }) : this.store.get(a) || null;
};
v.set = function(a, c) {
  "object" === typeof a && (c = a, a = ba(c, this.key));
  this.store.set(a, c);
  return this;
};
v.searchCache = Va;
v.export = function(a, c, b = 0, e = 0) {
  if (b < this.field.length) {
    const g = this.field[b];
    if ((c = this.index.get(g).export(a, g, b, e = 1)) && c.then) {
      const k = this;
      return c.then(function() {
        return k.export(a, g, b + 1);
      });
    }
    return this.export(a, g, b + 1);
  }
  let d, f;
  switch(e) {
    case 0:
      d = "reg";
      f = wa(this.reg);
      c = null;
      break;
    case 1:
      d = "tag";
      f = this.tag && ua(this.tag, this.reg.size);
      c = null;
      break;
    case 2:
      d = "doc";
      f = this.store && sa(this.store);
      c = null;
      break;
    default:
      return;
  }
  return ya.call(this, a, c, d, f, b, e);
};
v.import = function(a, c) {
  var b = a.split(".");
  "json" === b[b.length - 1] && b.pop();
  const e = 2 < b.length ? b[0] : "";
  b = 2 < b.length ? b[2] : b[1];
  if (this.worker && e) {
    return this.index.get(e).import(a);
  }
  if (c) {
    "string" === typeof c && (c = JSON.parse(c));
    if (e) {
      return this.index.get(e).import(b, c);
    }
    switch(b) {
      case "reg":
        this.fastupdate = !1;
        this.reg = xa(c, this.reg);
        for (let d = 0, f; d < this.field.length; d++) {
          f = this.index.get(this.field[d]), f.fastupdate = !1, f.reg = this.reg;
        }
        if (this.worker) {
          c = [];
          for (const d of this.index.values()) {
            c.push(d.import(a));
          }
          return Promise.all(c);
        }
        break;
      case "tag":
        this.tag = va(c, this.tag);
        break;
      case "doc":
        this.store = ta(c, this.store);
    }
  }
};
la(U.prototype);
function Va(a, c, b) {
  a = ("object" === typeof a ? "" + a.query : a).toLowerCase();
  this.cache || (this.cache = new X());
  let e = this.cache.get(a);
  if (!e) {
    e = this.search(a, c, b);
    if (e.then) {
      const d = this;
      e.then(function(f) {
        d.cache.set(a, f);
        return f;
      });
    }
    this.cache.set(a, e);
  }
  return e;
}
function X(a) {
  this.limit = a && !0 !== a ? a : 1000;
  this.cache = new Map();
  this.h = "";
}
X.prototype.set = function(a, c) {
  this.cache.set(this.h = a, c);
  this.cache.size > this.limit && this.cache.delete(this.cache.keys().next().value);
};
X.prototype.get = function(a) {
  const c = this.cache.get(a);
  c && this.h !== a && (this.cache.delete(a), this.cache.set(this.h = a, c));
  return c;
};
X.prototype.remove = function(a) {
  for (const c of this.cache) {
    const b = c[0];
    c[1].includes(a) && this.cache.delete(b);
  }
};
X.prototype.clear = function() {
  this.cache.clear();
  this.h = "";
};
const Wa = {normalize:!1, numeric:!1, dedupe:!1};
const Xa = {};
const Ya = new Map([["b", "p"], ["v", "f"], ["w", "f"], ["z", "s"], ["x", "s"], ["d", "t"], ["n", "m"], ["c", "k"], ["g", "k"], ["j", "k"], ["q", "k"], ["i", "e"], ["y", "e"], ["u", "o"]]);
const Za = new Map([["ae", "a"], ["oe", "o"], ["sh", "s"], ["kh", "k"], ["th", "t"], ["ph", "f"], ["pf", "f"]]), $a = [/([^aeo])h(.)/g, "$1$2", /([aeo])h([^aeo]|$)/g, "$1$2", /(.)\1+/g, "$1"];
const ab = {a:"", e:"", i:"", o:"", u:"", y:"", b:1, f:1, p:1, v:1, c:2, g:2, j:2, k:2, q:2, s:2, x:2, z:2, "\u00df":2, d:3, t:3, l:4, m:5, n:5, r:6};
var bb = {Exact:Wa, Default:Xa, Normalize:Xa, LatinBalance:{mapper:Ya}, LatinAdvanced:{mapper:Ya, matcher:Za, replacer:$a}, LatinExtra:{mapper:Ya, replacer:$a.concat([/(?!^)[aeo]/g, ""]), matcher:Za}, LatinSoundex:{dedupe:!1, include:{letter:!0}, finalize:function(a) {
  for (let b = 0; b < a.length; b++) {
    var c = a[b];
    let e = c.charAt(0), d = ab[e];
    for (let f = 1, g; f < c.length && (g = c.charAt(f), "h" === g || "w" === g || !(g = ab[g]) || g === d || (e += g, d = g, 4 !== e.length)); f++) {
    }
    a[b] = e;
  }
}}, LatinExact:Wa, LatinDefault:Xa, LatinSimple:Xa};
N.prototype.remove = function(a, c) {
  const b = this.reg.size && (this.fastupdate ? this.reg.get(a) : this.reg.has(a));
  if (b) {
    if (this.fastupdate) {
      for (let e = 0, d; e < b.length; e++) {
        if (d = b[e]) {
          if (2 > d.length) {
            d.pop();
          } else {
            const f = d.indexOf(a);
            f === b.length - 1 ? d.pop() : d.splice(f, 1);
          }
        }
      }
    } else {
      cb(this.map, a), this.depth && cb(this.ctx, a);
    }
    c || this.reg.delete(a);
  }
  this.db && (this.commit_task.push({del:a}), this.T && db(this));
  this.cache && this.cache.remove(a);
  return this;
};
function cb(a, c) {
  let b = 0;
  var e = "undefined" === typeof c;
  if (a.constructor === Array) {
    for (let d = 0, f, g; d < a.length; d++) {
      if ((f = a[d]) && f.length) {
        if (e) {
          b++;
        } else {
          if (g = f.indexOf(c), 0 <= g) {
            1 < f.length ? (f.splice(g, 1), b++) : delete a[d];
            break;
          } else {
            b++;
          }
        }
      }
    }
  } else {
    for (let d of a.entries()) {
      e = d[0];
      const f = cb(d[1], c);
      f ? b += f : a.delete(e);
    }
  }
  return b;
}
;const eb = {memory:{resolution:1}, performance:{resolution:3, fastupdate:!0, context:{depth:1, resolution:1}}, match:{tokenize:"forward"}, score:{resolution:9, context:{depth:2, resolution:3}}};
N.prototype.add = function(a, c, b, e) {
  if (c && (a || 0 === a)) {
    if (!e && !b && this.reg.has(a)) {
      return this.update(a, c);
    }
    c = this.encoder.encode(c);
    if (e = c.length) {
      const l = B(), n = B(), m = this.depth, q = this.resolution;
      for (let p = 0; p < e; p++) {
        let r = c[this.rtl ? e - 1 - p : p];
        var d = r.length;
        if (d && (m || !n[r])) {
          var f = this.score ? this.score(c, r, p, null, 0) : fb(q, e, p), g = "";
          switch(this.tokenize) {
            case "full":
              if (2 < d) {
                for (let u = 0, t; u < d; u++) {
                  for (f = d; f > u; f--) {
                    g = r.substring(u, f);
                    t = this.rtl ? d - 1 - u : u;
                    var k = this.score ? this.score(c, r, p, g, t) : fb(q, e, p, d, t);
                    gb(this, n, g, k, a, b);
                  }
                }
                break;
              }
            case "bidirectional":
            case "reverse":
              if (1 < d) {
                for (k = d - 1; 0 < k; k--) {
                  g = r[this.rtl ? d - 1 - k : k] + g;
                  var h = this.score ? this.score(c, r, p, g, k) : fb(q, e, p, d, k);
                  gb(this, n, g, h, a, b);
                }
                g = "";
              }
            case "forward":
              if (1 < d) {
                for (k = 0; k < d; k++) {
                  g += r[this.rtl ? d - 1 - k : k], gb(this, n, g, f, a, b);
                }
                break;
              }
            default:
              if (gb(this, n, r, f, a, b), m && 1 < e && p < e - 1) {
                for (d = B(), g = this.U, f = r, k = Math.min(m + 1, this.rtl ? p + 1 : e - p), d[f] = 1, h = 1; h < k; h++) {
                  if ((r = c[this.rtl ? e - 1 - p - h : p + h]) && !d[r]) {
                    d[r] = 1;
                    const u = this.score ? this.score(c, f, p, r, h - 1) : fb(g + (e / 2 > g ? 0 : 1), e, p, k - 1, h - 1), t = this.bidirectional && r > f;
                    gb(this, l, t ? f : r, u, a, b, t ? r : f);
                  }
                }
              }
          }
        }
      }
      this.fastupdate || this.reg.add(a);
    } else {
      c = "";
    }
  }
  this.db && (c || this.commit_task.push({del:a}), this.T && db(this));
  return this;
};
function gb(a, c, b, e, d, f, g) {
  let k = g ? a.ctx : a.map, h;
  if (!c[b] || g && !(h = c[b])[g]) {
    if (g ? (c = h || (c[b] = B()), c[g] = 1, (h = k.get(g)) ? k = h : k.set(g, k = new Map())) : c[b] = 1, (h = k.get(b)) ? k = h : k.set(b, k = h = []), k = k[e] || (k[e] = []), !f || !k.includes(d)) {
      if (k.length === 2 ** 31 - 1) {
        c = new R(k);
        if (a.fastupdate) {
          for (let l of a.reg.values()) {
            l.includes(k) && (l[l.indexOf(k)] = c);
          }
        }
        h[e] = k = c;
      }
      k.push(d);
      a.fastupdate && ((e = a.reg.get(d)) ? e.push(k) : a.reg.set(d, [k]));
    }
  }
}
function fb(a, c, b, e, d) {
  return b && 1 < a ? c + (e || 0) <= a ? b + (d || 0) : (a - 1) / (c + (e || 0)) * (b + (d || 0)) + 1 | 0 : 0;
}
;N.prototype.search = function(a, c, b) {
  b || (c || "object" !== typeof a ? "object" === typeof c && (b = c, c = 0) : (b = a, a = ""));
  let e = [], d, f, g, k = 0, h, l, n, m, q;
  b ? (a = b.query || a, c = b.limit || c, k = b.offset || 0, f = b.context, g = b.suggest, q = (h = !1 !== b.resolve) && b.enrich, n = b.boost, m = b.resolution, l = this.db && b.tag) : h = this.resolve;
  let p = this.encoder.encode(a);
  d = p.length;
  c = c || (h ? 100 : 0);
  if (1 === d) {
    return hb.call(this, p[0], "", c, k, h, q, l);
  }
  f = this.depth && !1 !== f;
  if (2 === d && f && !g) {
    return hb.call(this, p[1], p[0], c, k, h, q, l);
  }
  let r = B(), u = 0, t;
  f && (t = p[0], u = 1);
  m || 0 === m || (m = t ? this.U : this.resolution);
  if (this.db) {
    if (this.db.search && (a = this.db.search(this, p, c, k, g, h, q, l), !1 !== a)) {
      return a;
    }
    const w = this;
    return async function() {
      for (let y, E; u < d; u++) {
        if ((E = p[u]) && !r[E]) {
          r[E] = 1;
          y = await ib(w, E, t, 0, 0, !1, !1);
          if (y = jb(y, e, g, m)) {
            e = y;
            break;
          }
          t && (g && y && e.length || (t = E));
        }
        g && t && u === d - 1 && !e.length && (m = w.resolution, t = "", u = -1, r = B());
      }
      return kb(e, m, c, k, g, n, h);
    }();
  }
  for (let w, y; u < d; u++) {
    if ((y = p[u]) && !r[y]) {
      r[y] = 1;
      w = ib(this, y, t, 0, 0, !1, !1);
      if (w = jb(w, e, g, m)) {
        e = w;
        break;
      }
      t && (g && w && e.length || (t = y));
    }
    g && t && u === d - 1 && !e.length && (m = this.resolution, t = "", u = -1, r = B());
  }
  return kb(e, m, c, k, g, n, h);
};
function kb(a, c, b, e, d, f, g) {
  let k = a.length, h = a;
  if (1 < k) {
    h = Fa(a, c, b, e, d, f, g);
  } else if (1 === k) {
    return g ? Ia.call(null, a[0], b, e) : new W(a[0]);
  }
  return g ? h : new W(h);
}
function hb(a, c, b, e, d, f, g) {
  a = ib(this, a, c, b, e, d, f, g);
  return this.db ? a.then(function(k) {
    return d ? k || [] : new W(k);
  }) : a && a.length ? d ? Ia.call(this, a, b, e) : new W(a) : d ? [] : new W();
}
function jb(a, c, b, e) {
  let d = [];
  if (a && a.length) {
    if (a.length <= e) {
      c.push(a);
      return;
    }
    for (let f = 0, g; f < e; f++) {
      if (g = a[f]) {
        d[f] = g;
      }
    }
    if (d.length) {
      c.push(d);
      return;
    }
  }
  if (!b) {
    return d;
  }
}
function ib(a, c, b, e, d, f, g, k) {
  let h;
  b && (h = a.bidirectional && c > b) && (h = b, b = c, c = h);
  if (a.db) {
    return a.db.get(c, b, e, d, f, g, k);
  }
  a = b ? (a = a.ctx.get(b)) && a.get(c) : a.map.get(c);
  return a;
}
;function N(a, c) {
  if (!this || this.constructor !== N) {
    return new N(a);
  }
  if (a) {
    var b = F(a) ? a : a.preset;
    b && (eb[b] || console.warn("Preset not found: " + b), a = Object.assign({}, eb[b], a));
  } else {
    a = {};
  }
  b = a.context;
  const e = !0 === b ? {depth:1} : b || {}, d = F(a.encoder) ? bb[a.encoder] : a.encode || a.encoder || {};
  this.encoder = d.encode ? d : "object" === typeof d ? new ja(d) : {encode:d};
  this.resolution = a.resolution || 9;
  this.tokenize = b = (b = a.tokenize) && "default" !== b && "exact" !== b && b || "strict";
  this.depth = "strict" === b && e.depth || 0;
  this.bidirectional = !1 !== e.bidirectional;
  this.fastupdate = !!a.fastupdate;
  this.score = a.score || null;
  e && "strict" !== this.tokenize && console.warn('Context-Search could not applied, because it is just supported when using the tokenizer "strict".');
  (b = a.keystore || 0) && (this.keystore = b);
  this.map = b ? new S(b) : new Map();
  this.ctx = b ? new S(b) : new Map();
  this.reg = c || (this.fastupdate ? b ? new S(b) : new Map() : b ? new T(b) : new Set());
  this.U = e.resolution || 3;
  this.rtl = d.rtl || a.rtl || !1;
  this.cache = (b = a.cache || null) && new X(b);
  this.resolve = !1 !== a.resolve;
  if (b = a.db) {
    this.db = this.mount(b);
  }
  this.T = !1 !== a.commit;
  this.commit_task = [];
  this.commit_timer = null;
  this.priority = a.priority || 4;
}
v = N.prototype;
v.mount = function(a) {
  this.commit_timer && (clearTimeout(this.commit_timer), this.commit_timer = null);
  return a.mount(this);
};
v.commit = function(a, c) {
  this.commit_timer && (clearTimeout(this.commit_timer), this.commit_timer = null);
  return this.db.commit(this, a, c);
};
v.destroy = function() {
  this.commit_timer && (clearTimeout(this.commit_timer), this.commit_timer = null);
  return this.db.destroy();
};
function db(a) {
  a.commit_timer || (a.commit_timer = setTimeout(function() {
    a.commit_timer = null;
    a.db.commit(a, void 0, void 0);
  }, 1));
}
v.clear = function() {
  this.map.clear();
  this.ctx.clear();
  this.reg.clear();
  this.cache && this.cache.clear();
  this.db && (this.commit_timer && clearTimeout(this.commit_timer), this.commit_timer = null, this.commit_task = [{clear:!0}]);
  return this;
};
v.append = function(a, c) {
  return this.add(a, c, !0);
};
v.contain = function(a) {
  return this.db ? this.db.has(a) : this.reg.has(a);
};
v.update = function(a, c) {
  const b = this, e = this.remove(a);
  return e && e.then ? e.then(() => b.add(a, c)) : this.add(a, c);
};
v.cleanup = function() {
  if (!this.fastupdate) {
    return console.info('Cleanup the index isn\'t required when not using "fastupdate".'), this;
  }
  cb(this.map);
  this.depth && cb(this.ctx);
  return this;
};
v.searchCache = Va;
v.export = function(a, c, b = 0, e = 0) {
  let d, f;
  switch(e) {
    case 0:
      d = "reg";
      f = wa(this.reg);
      break;
    case 1:
      d = "cfg";
      f = null;
      break;
    case 2:
      d = "map";
      f = sa(this.map, this.reg.size);
      break;
    case 3:
      d = "ctx";
      f = ua(this.ctx, this.reg.size);
      break;
    default:
      return;
  }
  return ya.call(this, a, c, d, f, b, e);
};
v.import = function(a, c) {
  if (c) {
    switch("string" === typeof c && (c = JSON.parse(c)), a = a.split("."), "json" === a[a.length - 1] && a.pop(), 3 === a.length && a.shift(), a = 1 < a.length ? a[1] : a[0], a) {
      case "reg":
        this.fastupdate = !1;
        this.reg = xa(c, this.reg);
        break;
      case "map":
        this.map = ta(c, this.map);
        break;
      case "ctx":
        this.ctx = va(c, this.ctx);
    }
  }
};
v.serialize = function(a = !0) {
  let c = "", b = "", e = "";
  if (this.reg.size) {
    let f;
    for (var d of this.reg.keys()) {
      f || (f = typeof d), c += (c ? "," : "") + ("string" === f ? '"' + d + '"' : d);
    }
    c = "index.reg=new Set([" + c + "]);";
    b = za(this.map, f);
    b = "index.map=new Map([" + b + "]);";
    for (const g of this.ctx.entries()) {
      d = g[0];
      let k = za(g[1], f);
      k = "new Map([" + k + "])";
      k = '["' + d + '",' + k + "]";
      e += (e ? "," : "") + k;
    }
    e = "index.ctx=new Map([" + e + "]);";
  }
  return a ? "function inject(index){" + c + b + e + "}" : c + b + e;
};
la(N.prototype);
const lb = "undefined" !== typeof window && (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB), mb = ["map", "ctx", "tag", "reg", "cfg"], Y = B();
function nb(a, c = {}) {
  if (!this) {
    return new nb(a, c);
  }
  "object" === typeof a && (c = a, a = a.name);
  a || console.info("Default storage space was used, because a name was not passed.");
  this.id = "flexsearch" + (a ? ":" + a.toLowerCase().replace(/[^a-z0-9_\-]/g, "") : "");
  this.field = c.field ? c.field.toLowerCase().replace(/[^a-z0-9_\-]/g, "") : "";
  this.type = c.type;
  this.fastupdate = this.support_tag_search = !1;
  this.db = null;
  this.h = {};
}
v = nb.prototype;
v.mount = function(a) {
  if (!a.encoder) {
    return a.mount(this);
  }
  a.db = this;
  return this.open();
};
v.open = function() {
  if (this.db) {
    return this.db;
  }
  let a = this;
  navigator.storage && navigator.storage.persist();
  Y[a.id] || (Y[a.id] = []);
  Y[a.id].push(a.field);
  const c = lb.open(a.id, 1);
  c.onupgradeneeded = function() {
    const b = a.db = this.result;
    for (let e = 0, d; e < mb.length; e++) {
      d = mb[e];
      for (let f = 0, g; f < Y[a.id].length; f++) {
        g = Y[a.id][f], b.objectStoreNames.contains(d + ("reg" !== d ? g ? ":" + g : "" : "")) || b.createObjectStore(d + ("reg" !== d ? g ? ":" + g : "" : ""));
      }
    }
  };
  return a.db = Z(c, function(b) {
    a.db = b;
    a.db.onversionchange = function() {
      a.close();
    };
  });
};
v.close = function() {
  this.db && this.db.close();
  this.db = null;
};
v.destroy = function() {
  const a = lb.deleteDatabase(this.id);
  return Z(a);
};
v.clear = function() {
  const a = [];
  for (let b = 0, e; b < mb.length; b++) {
    e = mb[b];
    for (let d = 0, f; d < Y[this.id].length; d++) {
      f = Y[this.id][d], a.push(e + ("reg" !== e ? f ? ":" + f : "" : ""));
    }
  }
  const c = this.db.transaction(a, "readwrite");
  for (let b = 0; b < a.length; b++) {
    c.objectStore(a[b]).clear();
  }
  return Z(c);
};
v.get = function(a, c, b = 0, e = 0, d = !0, f = !1) {
  a = this.db.transaction((c ? "ctx" : "map") + (this.field ? ":" + this.field : ""), "readonly").objectStore((c ? "ctx" : "map") + (this.field ? ":" + this.field : "")).get(c ? c + ":" + a : a);
  const g = this;
  return Z(a).then(function(k) {
    let h = [];
    if (!k || !k.length) {
      return h;
    }
    if (d) {
      if (!b && !e && 1 === k.length) {
        return k[0];
      }
      for (let l = 0, n; l < k.length; l++) {
        if ((n = k[l]) && n.length) {
          if (e >= n.length) {
            e -= n.length;
            continue;
          }
          const m = b ? e + Math.min(n.length - e, b) : n.length;
          for (let q = e; q < m; q++) {
            h.push(n[q]);
          }
          e = 0;
          if (h.length === b) {
            break;
          }
        }
      }
      return f ? g.enrich(h) : h;
    }
    return k;
  });
};
v.tag = function(a, c = 0, b = 0, e = !1) {
  a = this.db.transaction("tag" + (this.field ? ":" + this.field : ""), "readonly").objectStore("tag" + (this.field ? ":" + this.field : "")).get(a);
  const d = this;
  return Z(a).then(function(f) {
    if (!f || !f.length || b >= f.length) {
      return [];
    }
    if (!c && !b) {
      return f;
    }
    f = f.slice(b, b + c);
    return e ? d.enrich(f) : f;
  });
};
v.enrich = function(a) {
  "object" !== typeof a && (a = [a]);
  const c = this.db.transaction("reg", "readonly").objectStore("reg"), b = [];
  for (let e = 0; e < a.length; e++) {
    b[e] = Z(c.get(a[e]));
  }
  return Promise.all(b).then(function(e) {
    for (let d = 0; d < e.length; d++) {
      e[d] = {id:a[d], doc:e[d] ? JSON.parse(e[d]) : null};
    }
    return e;
  });
};
v.has = function(a) {
  a = this.db.transaction("reg", "readonly").objectStore("reg").getKey(a);
  return Z(a).then(function(c) {
    return !!c;
  });
};
v.search = null;
v.info = function() {
};
v.transaction = function(a, c, b) {
  a += "reg" !== a ? this.field ? ":" + this.field : "" : "";
  let e = this.h[a + ":" + c];
  if (e) {
    return b.call(this, e);
  }
  let d = this.db.transaction(a, c);
  this.h[a + ":" + c] = e = d.objectStore(a);
  const f = b.call(this, e);
  this.h[a + ":" + c] = null;
  return Z(d).finally(function() {
    d = e = null;
    return f;
  });
};
v.commit = async function(a, c, b) {
  if (c) {
    await this.clear(), a.commit_task = [];
  } else {
    let e = a.commit_task;
    a.commit_task = [];
    for (let d = 0, f; d < e.length; d++) {
      if (f = e[d], f.clear) {
        await this.clear();
        c = !0;
        break;
      } else {
        e[d] = f.del;
      }
    }
    c || (b || (e = e.concat(aa(a.reg))), e.length && await this.remove(e));
  }
  a.reg.size && (await this.transaction("map", "readwrite", function(e) {
    for (const d of a.map) {
      const f = d[0], g = d[1];
      g.length && (c ? e.put(g, f) : e.get(f).onsuccess = function() {
        let k = this.result;
        var h;
        if (k && k.length) {
          const l = Math.max(k.length, g.length);
          for (let n = 0, m, q; n < l; n++) {
            if ((q = g[n]) && q.length) {
              if ((m = k[n]) && m.length) {
                for (h = 0; h < q.length; h++) {
                  m.push(q[h]);
                }
              } else {
                k[n] = q;
              }
              h = 1;
            }
          }
        } else {
          k = g, h = 1;
        }
        h && e.put(k, f);
      });
    }
  }), await this.transaction("ctx", "readwrite", function(e) {
    for (const d of a.ctx) {
      const f = d[0], g = d[1];
      for (const k of g) {
        const h = k[0], l = k[1];
        l.length && (c ? e.put(l, f + ":" + h) : e.get(f + ":" + h).onsuccess = function() {
          let n = this.result;
          var m;
          if (n && n.length) {
            const q = Math.max(n.length, l.length);
            for (let p = 0, r, u; p < q; p++) {
              if ((u = l[p]) && u.length) {
                if ((r = n[p]) && r.length) {
                  for (m = 0; m < u.length; m++) {
                    r.push(u[m]);
                  }
                } else {
                  n[p] = u;
                }
                m = 1;
              }
            }
          } else {
            n = l, m = 1;
          }
          m && e.put(n, f + ":" + h);
        });
      }
    }
  }), a.store ? await this.transaction("reg", "readwrite", function(e) {
    for (const d of a.store) {
      const f = d[0], g = d[1];
      e.put("object" === typeof g ? JSON.stringify(g) : 1, f);
    }
  }) : a.bypass || await this.transaction("reg", "readwrite", function(e) {
    for (const d of a.reg.keys()) {
      e.put(1, d);
    }
  }), a.tag && await this.transaction("tag", "readwrite", function(e) {
    for (const d of a.tag) {
      const f = d[0], g = d[1];
      g.length && (e.get(f).onsuccess = function() {
        let k = this.result;
        k = k && k.length ? k.concat(g) : g;
        e.put(k, f);
      });
    }
  }), a.map.clear(), a.ctx.clear(), a.tag && a.tag.clear(), a.store && a.store.clear(), a.document || a.reg.clear());
};
function pb(a, c, b) {
  const e = a.value;
  let d, f = 0;
  for (let g = 0, k; g < e.length; g++) {
    if (k = b ? e : e[g]) {
      for (let h = 0, l, n; h < c.length; h++) {
        if (n = c[h], l = k.indexOf(n), 0 <= l) {
          if (d = 1, 1 < k.length) {
            k.splice(l, 1);
          } else {
            e[g] = [];
            break;
          }
        }
      }
      f += k.length;
    }
    if (b) {
      break;
    }
  }
  f ? d && a.update(e) : a.delete();
  a.continue();
}
v.remove = function(a) {
  "object" !== typeof a && (a = [a]);
  return Promise.all([this.transaction("map", "readwrite", function(c) {
    c.openCursor().onsuccess = function() {
      const b = this.result;
      b && pb(b, a);
    };
  }), this.transaction("ctx", "readwrite", function(c) {
    c.openCursor().onsuccess = function() {
      const b = this.result;
      b && pb(b, a);
    };
  }), this.transaction("tag", "readwrite", function(c) {
    c.openCursor().onsuccess = function() {
      const b = this.result;
      b && pb(b, a, !0);
    };
  }), this.transaction("reg", "readwrite", function(c) {
    for (let b = 0; b < a.length; b++) {
      c.delete(a[b]);
    }
  })]);
};
function Z(a, c) {
  return new Promise((b, e) => {
    a.onsuccess = a.oncomplete = function() {
      c && c(this.result);
      c = null;
      b(this.result);
    };
    a.onerror = a.onblocked = e;
    a = null;
  });
}
;export default {Index:N, Charset:bb, Encoder:ja, Document:U, Worker:P, Resolver:W, IndexedDB:nb, Language:{}};

export const Index=N;export const  Charset=bb;export const  Encoder=ja;export const  Document=U;export const  Worker=P;export const  Resolver=W;export const  IndexedDB=nb;export const  Language={};