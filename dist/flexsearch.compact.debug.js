/**!
 * FlexSearch.js v0.8.143 (Bundle/Debug)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */
(function(self){'use strict';
var x;
function B(a, c, b) {
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
function C() {
  return Object.create(null);
}
function D(a) {
  return "string" === typeof a;
}
function I(a) {
  return "object" === typeof a;
}
function J(a, c) {
  if (D(c)) {
    a = a[c];
  } else {
    for (let b = 0; a && b < c.length; b++) {
      a = a[c[b]];
    }
  }
  return a;
}
function aa(a) {
  let c = 0;
  for (let b = 0, e; b < a.length; b++) {
    (e = a[b]) && c < e.length && (c = e.length);
  }
  return c;
}
;const ba = /[^\p{L}\p{N}]+/u, ca = /(\d{3})/g, da = /(\D)(\d{3})/g, ea = /(\d{3})(\D)/g, fa = /[\u0300-\u036f]/g;
function K(a = {}) {
  if (!this || this.constructor !== K) {
    return new K(...arguments);
  }
  if (arguments.length) {
    for (a = 0; a < arguments.length; a++) {
      this.assign(arguments[a]);
    }
  } else {
    this.assign(a);
  }
}
x = K.prototype;
x.assign = function(a) {
  this.normalize = B(a.normalize, !0, this.normalize);
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
    this.numeric = B(a.numeric, e);
  } else {
    try {
      this.split = B(this.split, ba);
    } catch (d) {
      console.warn("This platform does not support unicode regex. It falls back to using simple whitespace splitter instead: /s+/."), this.split = /\s+/;
    }
    this.numeric = B(a.numeric, B(this.numeric, !0));
  }
  this.prepare = B(a.prepare, null, this.prepare);
  this.finalize = B(a.finalize, null, this.finalize);
  b = a.filter;
  this.filter = "function" === typeof b ? b : B(b && new Set(b), null, this.filter);
  this.dedupe = B(a.dedupe, !1, this.dedupe);
  this.matcher = B((b = a.matcher) && new Map(b), null, this.matcher);
  this.mapper = B((b = a.mapper) && new Map(b), null, this.mapper);
  this.stemmer = B((b = a.stemmer) && new Map(b), null, this.stemmer);
  this.replacer = B(a.replacer, null, this.replacer);
  this.minlength = B(a.minlength, 1, this.minlength);
  this.maxlength = B(a.maxlength, 0, this.maxlength);
  this.rtl = B(a.rtl, !1, this.rtl);
  if (this.cache = b = B(a.cache, !0, this.cache)) {
    this.H = null, this.R = "number" === typeof b ? b : 2e5, this.F = new Map(), this.G = new Map(), this.L = this.K = 128;
  }
  this.h = "";
  this.M = null;
  this.D = "";
  this.N = null;
  if (this.matcher) {
    for (const d of this.matcher.keys()) {
      this.h += (this.h ? "|" : "") + d;
    }
  }
  if (this.stemmer) {
    for (const d of this.stemmer.keys()) {
      this.D += (this.D ? "|" : "") + d;
    }
  }
  return this;
};
x.addStemmer = function(a, c) {
  this.stemmer || (this.stemmer = new Map());
  this.stemmer.set(a, c);
  this.D += (this.D ? "|" : "") + a;
  this.N = null;
  this.cache && L(this);
  return this;
};
x.addFilter = function(a) {
  "function" === typeof a ? this.filter = a : (this.filter || (this.filter = new Set()), this.filter.add(a));
  this.cache && L(this);
  return this;
};
x.addMapper = function(a, c) {
  if ("object" === typeof a) {
    return this.addReplacer(a, c);
  }
  if (1 < a.length) {
    return this.addMatcher(a, c);
  }
  this.mapper || (this.mapper = new Map());
  this.mapper.set(a, c);
  this.cache && L(this);
  return this;
};
x.addMatcher = function(a, c) {
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
  this.cache && L(this);
  return this;
};
x.addReplacer = function(a, c) {
  if ("string" === typeof a) {
    return this.addMatcher(a, c);
  }
  this.replacer || (this.replacer = []);
  this.replacer.push(a, c);
  this.cache && L(this);
  return this;
};
x.encode = function(a) {
  if (this.cache && a.length <= this.K) {
    if (this.H) {
      if (this.F.has(a)) {
        return this.F.get(a);
      }
    } else {
      this.H = setTimeout(L, 50, this);
    }
  }
  this.normalize && ("function" === typeof this.normalize ? a = this.normalize(a) : a = fa ? a.normalize("NFKD").replace(fa, "").toLowerCase() : a.toLowerCase());
  this.prepare && (a = this.prepare(a));
  this.numeric && 3 < a.length && (a = a.replace(da, "$1 $2").replace(ea, "$1 $2").replace(ca, "$1 "));
  const c = !(this.dedupe || this.mapper || this.filter || this.matcher || this.stemmer || this.replacer);
  let b = [], e = this.split || "" === this.split ? a.split(this.split) : a;
  for (let f = 0, g, k; f < e.length; f++) {
    if ((g = k = e[f]) && !(g.length < this.minlength)) {
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
              this.H = setTimeout(L, 50, this);
            }
          }
          this.stemmer && 2 < g.length && (this.N || (this.N = new RegExp("(?!^)(" + this.D + ")$")), d = g, g = g.replace(this.N, h => this.stemmer.get(h)), d !== g && this.filter && g.length >= this.minlength && ("function" === typeof this.filter ? !this.filter(g) : this.filter.has(g)) && (g = ""));
          if (g && (this.mapper || this.dedupe && 1 < g.length)) {
            d = "";
            for (let h = 0, l = "", m, n; h < g.length; h++) {
              m = g.charAt(h), m === l && this.dedupe || ((n = this.mapper && this.mapper.get(m)) || "" === n ? n === l && this.dedupe || !(l = n) || (d += n) : d += l = m);
            }
            g = d;
          }
          this.matcher && 1 < g.length && (this.M || (this.M = new RegExp("(" + this.h + ")", "g")), g = g.replace(this.M, h => this.matcher.get(h)));
          if (g && this.replacer) {
            for (d = 0; g && d < this.replacer.length; d += 2) {
              g = g.replace(this.replacer[d], this.replacer[d + 1]);
            }
          }
          this.cache && k.length <= this.L && (this.G.set(k, g), this.G.size > this.R && (this.G.clear(), this.L = this.L / 1.1 | 0));
          g && b.push(g);
        }
      }
    }
  }
  this.finalize && (b = this.finalize(b) || b);
  this.cache && a.length <= this.K && (this.F.set(a, b), this.F.size > this.R && (this.F.clear(), this.K = this.K / 1.1 | 0));
  return b;
};
function L(a) {
  a.H = null;
  a.F.clear();
  a.G.clear();
}
;let M, N;
async function ha(a) {
  a = a.data;
  var c = a.task;
  const b = a.id;
  let e = a.args;
  switch(c) {
    case "init":
      N = a.options || {};
      (c = a.factory) ? (Function("return " + c)()(self), M = new self.FlexSearch.Index(N), delete self.FlexSearch) : M = new O(N);
      postMessage({id:b});
      break;
    default:
      let d;
      if ("export" === c) {
        if (!N.export || "function" !== typeof N.export) {
          throw Error('Either no extern configuration provided for the Worker-Index or no method was defined on the config property "export".');
        }
        e[1] ? (e[0] = N.export, e[2] = 0, e[3] = 1) : e = null;
      }
      if ("import" === c) {
        if (!N.import || "function" !== typeof N.import) {
          throw Error('Either no extern configuration provided for the Worker-Index or no method was defined on the config property "import".');
        }
        e[0] && (a = await N.import.call(M, e[0]), M.import(e[0], a));
      } else {
        (d = e && M[c].apply(M, e)) && d.then && (d = await d);
      }
      postMessage("search" === c ? {id:b, msg:d} : {id:b});
  }
}
;function ia(a) {
  P.call(a, "add");
  P.call(a, "append");
  P.call(a, "search");
  P.call(a, "update");
  P.call(a, "remove");
}
let ja, ka, Q;
function la() {
  ja = Q = 0;
}
function P(a) {
  this[a + "Async"] = function() {
    const c = arguments;
    var b = c[c.length - 1];
    let e;
    "function" === typeof b && (e = b, delete c[c.length - 1]);
    ja ? Q || (Q = Date.now() - ka >= this.priority * this.priority * 3) : (ja = setTimeout(la, 0), ka = Date.now());
    if (Q) {
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
;let R = 0;
function S(a = {}) {
  function c(g) {
    function k(h) {
      h = h.data || h;
      const l = h.id, m = l && d.h[l];
      m && (m(h.msg), delete d.h[l]);
    }
    this.worker = g;
    this.h = C();
    if (this.worker) {
      e ? this.worker.on("message", k) : this.worker.onmessage = k;
      if (a.config) {
        return new Promise(function(h) {
          d.h[++R] = function() {
            h(d);
            1e9 < R && (R = 0);
          };
          d.worker.postMessage({id:R, task:"init", factory:b, options:a});
        });
      }
      this.worker.postMessage({task:"init", factory:b, options:a});
      this.priority = a.priority || 4;
      return this;
    }
  }
  if (!this || this.constructor !== S) {
    return new S(a);
  }
  let b = "undefined" !== typeof self ? self._factory : "undefined" !== typeof window ? window._factory : null;
  b && (b = b.toString());
  const e = "undefined" === typeof window, d = this, f = ma(b, e, a.worker);
  return f.then ? f.then(function(g) {
    return c.call(d, g);
  }) : c.call(this, f);
}
T("add");
T("append");
T("search");
T("update");
T("remove");
T("clear");
T("export");
T("import");
ia(S.prototype);
function T(a) {
  S.prototype[a] = function() {
    const c = this, b = [].slice.call(arguments);
    var e = b[b.length - 1];
    let d;
    "function" === typeof e && (d = e, b.pop());
    e = new Promise(function(f) {
      "export" === a && "function" === typeof b[0] && (b[0] = null);
      c.h[++R] = f;
      c.worker.postMessage({task:a, id:R, args:b});
    });
    return d ? (e.then(d), this) : e;
  };
}
function ma(a, c, b) {
  return c ? "undefined" !== typeof module ? new(require("worker_threads")["Worker"])(__dirname+"/node/node.js") : import("worker_threads").then(function(worker){return new worker["Worker"]((1,eval)("import.meta.dirname")+"/node/node.mjs")}) : a ? new window.Worker(URL.createObjectURL(new Blob(["onmessage=" + ha.toString()], {type:"text/javascript"}))) : new window.Worker("string" === typeof b ? b : (0,eval)("import.meta.url").replace("/worker.js", "/worker/worker.js").replace("flexsearch.bundle.module.min.js", 
  "module/worker/worker.js"), {type:"module"});
}
;function na(a, c = 0) {
  let b = [], e = [];
  c && (c = 250000 / c * 5000 | 0);
  for (const d of a.entries()) {
    e.push(d), e.length === c && (b.push(e), e = []);
  }
  e.length && b.push(e);
  return b;
}
function oa(a, c) {
  c || (c = new Map());
  for (let b = 0, e; b < a.length; b++) {
    e = a[b], c.set(e[0], e[1]);
  }
  return c;
}
function pa(a, c = 0) {
  let b = [], e = [];
  c && (c = 250000 / c * 1000 | 0);
  for (const d of a.entries()) {
    e.push([d[0], na(d[1])[0]]), e.length === c && (b.push(e), e = []);
  }
  e.length && b.push(e);
  return b;
}
function qa(a, c) {
  c || (c = new Map());
  for (let b = 0, e, d; b < a.length; b++) {
    e = a[b], d = c.get(e[0]), c.set(e[0], oa(e[1], d));
  }
  return c;
}
function ra(a) {
  let c = [], b = [];
  for (const e of a.keys()) {
    b.push(e), 250000 === b.length && (c.push(b), b = []);
  }
  b.length && c.push(b);
  return c;
}
function sa(a, c) {
  c || (c = new Set());
  for (let b = 0; b < a.length; b++) {
    c.add(a[b]);
  }
  return c;
}
function U(a, c, b, e, d, f, g = 0) {
  const k = e && e.constructor === Array;
  var h = k ? e.shift() : e;
  if (!h) {
    return this.export(a, c, d, f + 1);
  }
  if ((h = a((c ? c + "." : "") + (g + 1) + "." + b, JSON.stringify(h))) && h.then) {
    const l = this;
    return h.then(function() {
      return U.call(l, a, c, b, k ? e : null, d, f, g + 1);
    });
  }
  return U.call(this, a, c, b, k ? e : null, d, f, g + 1);
}
function ta(a, c) {
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
;V.prototype.add = function(a, c, b) {
  I(a) && (c = a, a = J(c, this.key));
  if (c && (a || 0 === a)) {
    if (!b && this.reg.has(a)) {
      return this.update(a, c);
    }
    for (let k = 0, h; k < this.field.length; k++) {
      h = this.C[k];
      var e = this.index.get(this.field[k]);
      if ("function" === typeof h) {
        var d = h(c);
        d && e.add(a, d, !1, !0);
      } else {
        if (d = h.I, !d || d(c)) {
          h.constructor === String ? h = ["" + h] : D(h) && (h = [h]), ua(c, h, this.J, 0, e, a, h[0], b);
        }
      }
    }
    if (this.tag) {
      for (e = 0; e < this.B.length; e++) {
        var f = this.B[e], g = this.T[e];
        d = this.tag.get(g);
        let k = C();
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
          f = J(c, f);
        }
        if (d && f) {
          D(f) && (f = [f]);
          for (let h = 0, l, m; h < f.length; h++) {
            l = f[h], k[l] || (k[l] = 1, (g = d.get(l)) ? m = g : d.set(l, m = []), b && m.includes(a) || (m.push(a), this.fastupdate && ((g = this.reg.get(a)) ? g.push(m) : this.reg.set(a, [m]))));
          }
        } else {
          d || console.warn("Tag '" + g + "' was not found");
        }
      }
    }
    if (this.store && (!b || !this.store.has(a))) {
      let k;
      if (this.A) {
        k = C();
        for (let h = 0, l; h < this.A.length; h++) {
          l = this.A[h];
          if ((b = l.I) && !b(c)) {
            continue;
          }
          let m;
          if ("function" === typeof l) {
            m = l(c);
            if (!m) {
              continue;
            }
            l = [l.U];
          } else if (D(l) || l.constructor === String) {
            k[l] = c[l];
            continue;
          }
          va(c, k, l, 0, l[0], m);
        }
      }
      this.store.set(a, k || c);
    }
  }
  return this;
};
function va(a, c, b, e, d, f) {
  a = a[d];
  if (e === b.length - 1) {
    c[d] = f || a;
  } else if (a) {
    if (a.constructor === Array) {
      for (c = c[d] = Array(a.length), d = 0; d < a.length; d++) {
        va(a, c, b, e, d);
      }
    } else {
      c = c[d] || (c[d] = C()), d = b[++e], va(a, c, b, e, d);
    }
  }
}
function ua(a, c, b, e, d, f, g, k) {
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
          ua(a, c, b, e, d, f, g, k);
        }
      } else {
        g = c[++e], ua(a, c, b, e, d, f, g, k);
      }
    }
  }
}
;function wa(a, c, b, e, d) {
  const f = a.length;
  let g = [], k, h;
  k = C();
  for (let l = 0, m, n, r, p; l < c; l++) {
    for (let q = 0; q < f; q++) {
      if (r = a[q], l < r.length && (m = r[l])) {
        for (let t = 0; t < m.length; t++) {
          if (n = m[t], (h = k[n]) ? k[n]++ : (h = 0, k[n] = 1), p = g[h] || (g[h] = []), p.push(n), b && h === f - 1 && p.length - e === b) {
            return p;
          }
        }
      }
    }
  }
  if (a = g.length) {
    if (d) {
      g = 1 < g.length ? xa(g, b, e) : (g = g[0]).length > b || e ? g.slice(e, b + e) : g;
    } else {
      if (a < f) {
        return [];
      }
      g = g[a - 1];
      if (b || e) {
        if (g.length > b || e) {
          g = g.slice(e, b + e);
        }
      }
    }
  }
  return g;
}
function xa(a, c, b) {
  const e = [], d = C();
  let f;
  var g = a.length;
  let k;
  for (let h = g - 1; 0 <= h; h--) {
    if (k = (g = a[h]) && g.length) {
      for (let l = 0; l < k; l++) {
        if (f = g[l], !d[f]) {
          if (d[f] = 1, b) {
            b--;
          } else {
            if (e.push(f), e.length === c) {
              return e;
            }
          }
        }
      }
    }
  }
  return e;
}
function ya(a, c) {
  const b = C(), e = [];
  for (let d = 0, f; d < c.length; d++) {
    f = c[d];
    for (let g = 0; g < f.length; g++) {
      b[f[g]] = 1;
    }
  }
  for (let d = 0, f; d < a.length; d++) {
    f = a[d], b[f] && (e.push(f), b[f] = 0);
  }
  return e;
}
;function za(a, c, b, e) {
  if (!a.length) {
    return a;
  }
  if (1 === a.length) {
    return a = a[0], a = b || a.length > c ? c ? a.slice(b, b + c) : a.slice(b) : a, e ? W.call(this, a) : a;
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
        return e ? W.call(this, g) : g;
      }
      d.push(g);
      c -= k;
      if (!c) {
        break;
      }
    }
  }
  d = 1 < d.length ? [].concat.apply([], d) : d[0];
  return e ? W.call(this, d) : d;
}
;function Aa(a, c, b) {
  var e = b[0];
  if (e.then) {
    return Promise.all(b).then(function(m) {
      return a[c].apply(a, m);
    });
  }
  if (e[0] && e[0].index) {
    return a[c].apply(a, e);
  }
  e = [];
  let d = [], f = 0, g = 0, k, h, l;
  for (let m = 0, n; m < b.length; m++) {
    if (n = b[m]) {
      let r;
      if (n.constructor === X) {
        r = n.result;
      } else if (n.constructor === Array) {
        r = n;
      } else {
        if (f = n.limit || 0, g = n.offset || 0, l = n.suggest, h = n.resolve, k = n.enrich && h, n.index) {
          n.resolve = !1, n.enrich = !1, r = n.index.search(n).result, n.resolve = h, n.enrich = k;
        } else if (n.and) {
          r = a.and(n.and);
        } else if (n.or) {
          r = a.or(n.or);
        } else if (n.xor) {
          r = a.xor(n.xor);
        } else if (n.not) {
          r = a.not(n.not);
        } else {
          continue;
        }
      }
      if (r.then) {
        d.push(r);
      } else if (r.length) {
        e[m] = r;
      } else if (!l && ("and" === c || "xor" === c)) {
        e = [];
        break;
      }
    }
  }
  return {O:e, P:d, limit:f, offset:g, enrich:k, resolve:h, suggest:l};
}
;X.prototype.or = function() {
  const {O:a, P:c, limit:b, offset:e, enrich:d, resolve:f} = Aa(this, "or", arguments);
  return Ba.call(this, a, c, b, e, d, f);
};
function Ba(a, c, b, e, d, f) {
  if (c.length) {
    const g = this;
    return Promise.all(c).then(function(k) {
      a = [];
      for (let h = 0, l; h < k.length; h++) {
        (l = k[h]).length && (a[h] = l);
      }
      return Ba.call(g, a, [], b, e, d, f);
    });
  }
  a.length && (this.result.length && a.push(this.result), 2 > a.length ? this.result = a[0] : (this.result = xa(a, b, e), e = 0));
  return f ? this.resolve(b, e, d) : this;
}
;X.prototype.and = function() {
  let a = this.result.length, c, b, e, d;
  if (!a) {
    const f = arguments[0];
    f && (a = !!f.suggest, d = f.resolve, c = f.limit, b = f.offset, e = f.enrich && d);
  }
  if (a) {
    const {O:f, P:g, limit:k, offset:h, enrich:l, resolve:m, suggest:n} = Aa(this, "and", arguments);
    return Ca.call(this, f, g, k, h, l, m, n);
  }
  return d ? this.resolve(c, b, e) : this;
};
function Ca(a, c, b, e, d, f, g) {
  if (c.length) {
    const k = this;
    return Promise.all(c).then(function(h) {
      a = [];
      for (let l = 0, m; l < h.length; l++) {
        (m = h[l]).length && (a[l] = m);
      }
      return Ca.call(k, a, [], b, e, d, f, g);
    });
  }
  if (a.length) {
    if (this.result.length && a.unshift(this.result), 2 > a.length) {
      this.result = a[0];
    } else {
      if (c = aa(a)) {
        return this.result = wa(a, c, b, e, g), f ? d ? W.call(this.index, this.result) : this.result : this;
      }
      this.result = [];
    }
  } else {
    g || (this.result = a);
  }
  return f ? this.resolve(b, e, d) : this;
}
;X.prototype.xor = function() {
  const {O:a, P:c, limit:b, offset:e, enrich:d, resolve:f, suggest:g} = Aa(this, "xor", arguments);
  return Da.call(this, a, c, b, e, d, f, g);
};
function Da(a, c, b, e, d, f, g) {
  if (c.length) {
    const k = this;
    return Promise.all(c).then(function(h) {
      a = [];
      for (let l = 0, m; l < h.length; l++) {
        (m = h[l]).length && (a[l] = m);
      }
      return Da.call(k, a, [], b, e, d, f, g);
    });
  }
  if (a.length) {
    if (this.result.length && a.unshift(this.result), 2 > a.length) {
      this.result = a[0];
    } else {
      return this.result = Ea.call(this, a, b, e, f, this.h), f ? d ? W.call(this.index, this.result) : this.result : this;
    }
  } else {
    g || (this.result = a);
  }
  return f ? this.resolve(b, e, d) : this;
}
function Ea(a, c, b, e, d) {
  const f = [], g = C();
  let k = 0;
  for (let h = 0, l; h < a.length; h++) {
    if (l = a[h]) {
      k < l.length && (k = l.length);
      for (let m = 0, n; m < l.length; m++) {
        if (n = l[m]) {
          for (let r = 0, p; r < n.length; r++) {
            p = n[r], g[p] = g[p] ? 2 : 1;
          }
        }
      }
    }
  }
  for (let h = 0, l, m = 0; h < k; h++) {
    for (let n = 0, r; n < a.length; n++) {
      if (r = a[n]) {
        if (l = r[h]) {
          for (let p = 0, q; p < l.length; p++) {
            if (q = l[p], 1 === g[q]) {
              if (b) {
                b--;
              } else {
                if (e) {
                  if (f.push(q), f.length === c) {
                    return f;
                  }
                } else {
                  const t = h + (n ? d : 0);
                  f[t] || (f[t] = []);
                  f[t].push(q);
                  if (++m === c) {
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
;X.prototype.not = function() {
  const {O:a, P:c, limit:b, offset:e, enrich:d, resolve:f, suggest:g} = Aa(this, "not", arguments);
  return Fa.call(this, a, c, b, e, d, f, g);
};
function Fa(a, c, b, e, d, f, g) {
  if (c.length) {
    const k = this;
    return Promise.all(c).then(function(h) {
      a = [];
      for (let l = 0, m; l < h.length; l++) {
        (m = h[l]).length && (a[l] = m);
      }
      return Fa.call(k, a, [], b, e, d, f, g);
    });
  }
  if (a.length && this.result.length) {
    this.result = Ga.call(this, a, b, e, f);
  } else if (f) {
    return this.resolve(b, e, d);
  }
  return f ? d ? W.call(this.index, this.result) : this.result : this;
}
function Ga(a, c, b, e) {
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
;function X(a) {
  if (!this || this.constructor !== X) {
    return new X(a);
  }
  if (a && a.index) {
    return a.resolve = !1, this.index = a.index, this.h = a.boost || 0, this.result = a.index.search(a).result, this;
  }
  this.index = null;
  this.result = a || [];
  this.h = 0;
}
X.prototype.limit = function(a) {
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
X.prototype.offset = function(a) {
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
X.prototype.boost = function(a) {
  this.h += a;
  return this;
};
X.prototype.resolve = function(a, c, b) {
  const e = this.result, d = this.index;
  this.result = this.index = null;
  return e.length ? ("object" === typeof a && (b = a.enrich, c = a.offset, a = a.limit), za.call(d, e, a || 100, c, b)) : e;
};
C();
V.prototype.search = function(a, c, b, e) {
  b || (!c && I(a) ? (b = a, a = "") : I(c) && (b = c, c = 0));
  let d = [];
  var f = [];
  let g;
  let k, h, l;
  let m = 0, n = !0, r;
  if (b) {
    b.constructor === Array && (b = {index:b});
    a = b.query || a;
    var p = b.pluck;
    var q = b.merge;
    h = p || b.field || (h = b.index) && (h.index ? null : h);
    l = this.tag && b.tag;
    k = b.suggest;
    n = !0;
    this.store && b.enrich && !n && console.warn("Enrich results can only be done on a final resolver task or when calling .resolve({ enrich: true })");
    r = (g = this.store && b.enrich && n) && b.highlight;
    c = b.limit || c;
    var t = b.offset || 0;
    c || (c = 100);
    if (l) {
      l.constructor !== Array && (l = [l]);
      var u = [];
      for (let y = 0, v; y < l.length; y++) {
        v = l[y];
        if (D(v)) {
          throw Error("A tag option can't be a string, instead it needs a { field: tag } format.");
        }
        if (v.field && v.tag) {
          var w = v.tag;
          if (w.constructor === Array) {
            for (var z = 0; z < w.length; z++) {
              u.push(v.field, w[z]);
            }
          } else {
            u.push(v.field, w);
          }
        } else {
          w = Object.keys(v);
          for (let E = 0, F, A; E < w.length; E++) {
            if (F = w[E], A = v[F], A.constructor === Array) {
              for (z = 0; z < A.length; z++) {
                u.push(F, A[z]);
              }
            } else {
              u.push(F, A);
            }
          }
        }
      }
      if (!u.length) {
        throw Error("Your tag definition within the search options is probably wrong. No valid tags found.");
      }
      l = u;
      if (!a) {
        f = [];
        if (u.length) {
          for (p = 0; p < u.length; p += 2) {
            q = Ha.call(this, u[p], u[p + 1], c, t, g), d.push({field:u[p], tag:u[p + 1], result:q});
          }
        }
        return f.length ? Promise.all(f).then(function(y) {
          for (let v = 0; v < y.length; v++) {
            d[v].result = y[v];
          }
          return d;
        }) : d;
      }
    }
    h && h.constructor !== Array && (h = [h]);
  }
  h || (h = this.field);
  u = !e && (this.worker || this.db) && [];
  for (let y = 0, v, E, F; y < h.length; y++) {
    E = h[y];
    let A;
    D(E) || (A = E, E = A.field, a = A.query || a, c = A.limit || c, t = A.offset || t, k = A.suggest || k, g = this.store && (A.enrich || g));
    if (e) {
      v = e[y];
    } else {
      if (w = A || b, z = this.index.get(E), l && (w.enrich = !1), u) {
        u[y] = z.search(a, c, w);
        w && g && (w.enrich = g);
        continue;
      } else {
        v = z.search(a, c, w), w && g && (w.enrich = g);
      }
    }
    F = v && (n ? v.length : v.result.length);
    if (l && F) {
      w = [];
      z = 0;
      for (let G = 0, H, $a; G < l.length; G += 2) {
        H = this.tag.get(l[G]);
        if (!H) {
          if (console.warn("Tag '" + l[G] + ":" + l[G + 1] + "' will be skipped because there is no field '" + l[G] + "'."), k) {
            continue;
          } else {
            return n ? d : new X(d);
          }
        }
        if ($a = (H = H && H.get(l[G + 1])) && H.length) {
          z++, w.push(H);
        } else if (!k) {
          return n ? d : new X(d);
        }
      }
      if (z) {
        v = ya(v, w);
        F = v.length;
        if (!F && !k) {
          return n ? v : new X(v);
        }
        z--;
      }
    }
    if (F) {
      f[m] = E, d.push(v), m++;
    } else if (1 === h.length) {
      return n ? d : new X(d);
    }
  }
  if (u) {
    const y = this;
    return Promise.all(u).then(function(v) {
      return v.length ? y.search(a, c, b, v) : v;
    });
  }
  if (!m) {
    return n ? d : new X(d);
  }
  if (p && (!g || !this.store)) {
    return d[0];
  }
  u = [];
  for (t = 0; t < f.length; t++) {
    e = d[t];
    g && e.length && "undefined" === typeof e[0].doc && (e = W.call(this, e));
    if (p) {
      return n ? e : new X(e);
    }
    d[t] = {field:f[t], result:e};
  }
  return q ? Ia(d, c) : r ? Ja(d, a, this.index, this.field, this.C, r) : d;
};
function Ja(a, c, b, e, d, f) {
  let g, k, h;
  for (let m = 0, n, r, p, q; m < a.length; m++) {
    let t = a[m].result;
    n = a[m].field;
    p = b.get(n);
    r = p.encoder;
    h = p.tokenize;
    q = d[e.indexOf(n)];
    r !== g && (g = r, k = g.encode(c));
    for (let u = 0; u < t.length; u++) {
      let w = "";
      var l = J(t[u].doc, q);
      let z = g.encode(l);
      l = l.split(g.split);
      for (let y = 0, v, E; y < z.length; y++) {
        v = z[y];
        E = l[y];
        if (!v || !E) {
          continue;
        }
        let F;
        for (let A = 0, G; A < k.length; A++) {
          if (G = k[A], "strict" === h) {
            if (v === G) {
              w += (w ? " " : "") + f.replace("$1", E);
              F = !0;
              break;
            }
          } else {
            const H = v.indexOf(G);
            if (-1 < H) {
              w += (w ? " " : "") + E.substring(0, H) + f.replace("$1", E.substring(H, G.length)) + E.substring(H + G.length);
              F = !0;
              break;
            }
          }
        }
        F || (w += (w ? " " : "") + l[y]);
      }
      t[u].highlight = w;
    }
  }
  return a;
}
function Ia(a, c) {
  const b = [], e = C();
  for (let d = 0, f, g; d < a.length; d++) {
    f = a[d];
    g = f.result;
    for (let k = 0, h, l, m; k < g.length; k++) {
      if (l = g[k], "object" !== typeof l && (l = {id:l}), h = l.id, m = e[h]) {
        m.push(f.field);
      } else {
        if (b.length === c) {
          return b;
        }
        l.field = e[h] = [f.field];
        b.push(l);
      }
    }
  }
  return b;
}
function Ha(a, c, b, e, d) {
  let f = this.tag.get(a);
  if (!f) {
    return console.warn("Tag '" + a + "' was not found"), [];
  }
  if ((a = (f = f && f.get(c)) && f.length - e) && 0 < a) {
    if (a > b || e) {
      f = f.slice(e, e + b);
    }
    d && (f = W.call(this, f));
    return f;
  }
}
function W(a) {
  if (!this || !this.store) {
    return a;
  }
  const c = Array(a.length);
  for (let b = 0, e; b < a.length; b++) {
    e = a[b], c[b] = {id:e, doc:this.store.get(e)};
  }
  return c;
}
;function V(a) {
  if (!this || this.constructor !== V) {
    return new V(a);
  }
  const c = a.document || a.doc || a;
  var b;
  this.C = [];
  this.field = [];
  this.J = [];
  this.key = (b = c.key || c.id) && Ka(b, this.J) || "id";
  this.reg = (this.fastupdate = !!a.fastupdate) ? new Map() : new Set();
  this.A = (b = c.store || null) && b && !0 !== b && [];
  this.store = b && new Map();
  this.cache = (b = a.cache || null) && new Y(b);
  a.cache = !1;
  this.priority = a.priority || 4;
  b = new Map();
  let e = c.index || c.field || c;
  D(e) && (e = [e]);
  for (let d = 0, f, g; d < e.length; d++) {
    f = e[d], D(f) || (g = f, f = f.field), g = I(g) ? Object.assign({}, a, g) : a, b.set(f, new O(g, this.reg)), g.custom ? this.C[d] = g.custom : (this.C[d] = Ka(f, this.J), g.filter && ("string" === typeof this.C[d] && (this.C[d] = new String(this.C[d])), this.C[d].I = g.filter)), this.field[d] = f;
  }
  if (this.A) {
    a = c.store;
    D(a) && (a = [a]);
    for (let d = 0, f, g; d < a.length; d++) {
      f = a[d], g = f.field || f, f.custom ? (this.A[d] = f.custom, f.custom.U = g) : (this.A[d] = Ka(g, this.J), f.filter && ("string" === typeof this.A[d] && (this.A[d] = new String(this.A[d])), this.A[d].I = f.filter));
    }
  }
  this.index = b;
  this.tag = null;
  if (b = c.tag) {
    if ("string" === typeof b && (b = [b]), b.length) {
      this.tag = new Map();
      this.B = [];
      this.T = [];
      for (let d = 0, f, g; d < b.length; d++) {
        f = b[d];
        g = f.field || f;
        if (!g) {
          throw Error("The tag field from the document descriptor is undefined.");
        }
        f.custom ? this.B[d] = f.custom : (this.B[d] = Ka(g, this.J), f.filter && ("string" === typeof this.B[d] && (this.B[d] = new String(this.B[d])), this.B[d].I = f.filter));
        this.T[d] = g;
        this.tag.set(g, new Map());
      }
    }
  }
}
function Ka(a, c) {
  const b = a.split(":");
  let e = 0;
  for (let d = 0; d < b.length; d++) {
    a = b[d], "]" === a[a.length - 1] && (a = a.substring(0, a.length - 2)) && (c[e] = !0), a && (b[e++] = a);
  }
  e < b.length && (b.length = e);
  return 1 < e ? b : b[0];
}
x = V.prototype;
x.append = function(a, c) {
  return this.add(a, c, !0);
};
x.update = function(a, c) {
  return this.remove(a).add(a, c);
};
x.remove = function(a) {
  I(a) && (a = J(a, this.key));
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
x.clear = function() {
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
x.contain = function(a) {
  return this.reg.has(a);
};
x.cleanup = function() {
  for (const a of this.index.values()) {
    a.cleanup();
  }
  return this;
};
x.get = function(a) {
  return this.store.get(a);
};
x.set = function(a, c) {
  this.store.set(a, c);
  return this;
};
x.searchCache = La;
x.export = function(a, c, b = 0, e = 0) {
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
      f = ra(this.reg);
      c = null;
      break;
    case 1:
      d = "tag";
      f = this.tag && pa(this.tag, this.reg.size);
      c = null;
      break;
    case 2:
      d = "doc";
      f = this.store && na(this.store);
      c = null;
      break;
    default:
      return;
  }
  return U.call(this, a, c, d, f, b, e);
};
x.import = function(a, c) {
  var b = a.split(".");
  "json" === b[b.length - 1] && b.pop();
  a = 2 < b.length ? b[0] : "";
  b = 2 < b.length ? b[2] : b[1];
  if (c) {
    "string" === typeof c && (c = JSON.parse(c));
    if (a) {
      return this.index.get(a).import(b, c);
    }
    switch(b) {
      case "reg":
        this.fastupdate = !1;
        this.reg = sa(c, this.reg);
        for (let e = 0, d; e < this.field.length; e++) {
          d = this.index.get(this.field[e]), d.fastupdate = !1, d.reg = this.reg;
        }
        break;
      case "tag":
        this.tag = qa(c, this.tag);
        break;
      case "doc":
        this.store = oa(c, this.store);
    }
  }
};
ia(V.prototype);
function La(a, c, b) {
  a = ("object" === typeof a ? "" + a.query : a).toLowerCase();
  this.cache || (this.cache = new Y());
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
function Y(a) {
  this.limit = a && !0 !== a ? a : 1000;
  this.cache = new Map();
  this.h = "";
}
Y.prototype.set = function(a, c) {
  this.cache.set(this.h = a, c);
  this.cache.size > this.limit && this.cache.delete(this.cache.keys().next().value);
};
Y.prototype.get = function(a) {
  const c = this.cache.get(a);
  c && this.h !== a && (this.cache.delete(a), this.cache.set(this.h = a, c));
  return c;
};
Y.prototype.remove = function(a) {
  for (const c of this.cache) {
    const b = c[0];
    c[1].includes(a) && this.cache.delete(b);
  }
};
Y.prototype.clear = function() {
  this.cache.clear();
  this.h = "";
};
const Ma = {normalize:!1, numeric:!1, split:/\s+/};
const Na = {normalize:!0};
const Oa = {normalize:!0, dedupe:!0};
const Pa = new Map([["b", "p"], ["v", "f"], ["w", "f"], ["z", "s"], ["x", "s"], ["d", "t"], ["n", "m"], ["c", "k"], ["g", "k"], ["j", "k"], ["q", "k"], ["i", "e"], ["y", "e"], ["u", "o"]]);
const Qa = new Map([["ae", "a"], ["oe", "o"], ["sh", "s"], ["kh", "k"], ["th", "t"], ["ph", "f"], ["pf", "f"]]), Ra = [/([^aeo])h(.)/g, "$1$2", /([aeo])h([^aeo]|$)/g, "$1$2", /(.)\1+/g, "$1"];
const Sa = {a:"", e:"", i:"", o:"", u:"", y:"", b:1, f:1, p:1, v:1, c:2, g:2, j:2, k:2, q:2, s:2, x:2, z:2, "\u00df":2, d:3, t:3, l:4, m:5, n:5, r:6};
var Ta = {W:Ma, V:Na, X:Oa, LatinBalance:{normalize:!0, dedupe:!0, mapper:Pa}, LatinAdvanced:{normalize:!0, dedupe:!0, mapper:Pa, matcher:Qa, replacer:Ra}, LatinExtra:{normalize:!0, dedupe:!0, mapper:Pa, replacer:Ra.concat([/(?!^)[aeo]/g, ""]), matcher:Qa}, LatinSoundex:{normalize:!0, dedupe:!1, include:{letter:!0}, finalize:function(a) {
  for (let b = 0; b < a.length; b++) {
    var c = a[b];
    let e = c.charAt(0), d = Sa[e];
    for (let f = 1, g; f < c.length && (g = c.charAt(f), "h" === g || "w" === g || !(g = Sa[g]) || g === d || (e += g, d = g, 4 !== e.length)); f++) {
    }
    a[b] = e;
  }
}}, LatinExact:Ma, LatinDefault:Na, LatinSimple:Oa};
const Ua = {memory:{resolution:1}, performance:{resolution:3, fastupdate:!0, context:{depth:1, resolution:1}}, match:{tokenize:"forward"}, score:{resolution:9, context:{depth:2, resolution:3}}};
O.prototype.add = function(a, c, b, e) {
  if (c && (a || 0 === a)) {
    if (!e && !b && this.reg.has(a)) {
      return this.update(a, c);
    }
    c = this.encoder.encode(c);
    if (e = c.length) {
      const l = C(), m = C(), n = this.depth, r = this.resolution;
      for (let p = 0; p < e; p++) {
        let q = c[this.rtl ? e - 1 - p : p];
        var d = q.length;
        if (d && (n || !m[q])) {
          var f = this.score ? this.score(c, q, p, null, 0) : Va(r, e, p), g = "";
          switch(this.tokenize) {
            case "full":
              if (2 < d) {
                for (let t = 0, u; t < d; t++) {
                  for (f = d; f > t; f--) {
                    g = q.substring(t, f);
                    u = this.rtl ? d - 1 - t : t;
                    var k = this.score ? this.score(c, q, p, g, u) : Va(r, e, p, d, u);
                    Z(this, m, g, k, a, b);
                  }
                }
                break;
              }
            case "bidirectional":
            case "reverse":
              if (1 < d) {
                for (k = d - 1; 0 < k; k--) {
                  g = q[this.rtl ? d - 1 - k : k] + g;
                  var h = this.score ? this.score(c, q, p, g, k) : Va(r, e, p, d, k);
                  Z(this, m, g, h, a, b);
                }
                g = "";
              }
            case "forward":
              if (1 < d) {
                for (k = 0; k < d; k++) {
                  g += q[this.rtl ? d - 1 - k : k], Z(this, m, g, f, a, b);
                }
                break;
              }
            default:
              if (Z(this, m, q, f, a, b), n && 1 < e && p < e - 1) {
                for (d = C(), g = this.S, f = q, k = Math.min(n + 1, this.rtl ? p + 1 : e - p), d[f] = 1, h = 1; h < k; h++) {
                  if ((q = c[this.rtl ? e - 1 - p - h : p + h]) && !d[q]) {
                    d[q] = 1;
                    const t = this.score ? this.score(c, f, p, q, h - 1) : Va(g + (e / 2 > g ? 0 : 1), e, p, k - 1, h - 1), u = this.bidirectional && q > f;
                    Z(this, l, u ? f : q, t, a, b, u ? q : f);
                  }
                }
              }
          }
        }
      }
      this.fastupdate || this.reg.add(a);
    }
  }
  return this;
};
function Z(a, c, b, e, d, f, g) {
  let k = g ? a.ctx : a.map, h;
  if (!c[b] || g && !(h = c[b])[g]) {
    g ? (c = h || (c[b] = C()), c[g] = 1, (h = k.get(g)) ? k = h : k.set(g, k = new Map())) : c[b] = 1, (h = k.get(b)) ? k = h : k.set(b, k = []), k = k[e] || (k[e] = []), f && k.includes(d) || (k.push(d), a.fastupdate && ((c = a.reg.get(d)) ? c.push(k) : a.reg.set(d, [k])));
  }
}
function Va(a, c, b, e, d) {
  return b && 1 < a ? c + (e || 0) <= a ? b + (d || 0) : (a - 1) / (c + (e || 0)) * (b + (d || 0)) + 1 | 0 : 0;
}
;O.prototype.search = function(a, c, b) {
  b || (!c && I(a) ? (b = a, a = "") : I(c) && (b = c, c = 0));
  var e = [], d = 0;
  if (b) {
    a = b.query || a;
    c = b.limit || c;
    d = b.offset || 0;
    var f = b.context;
    var g = b.suggest;
    var k = !0;
    var h = b.resolution;
  } else {
    k = !0;
  }
  a = this.encoder.encode(a);
  b = a.length;
  c = c || (k ? 100 : 0);
  if (1 === b) {
    return g = c, (c = Wa(this, a[0], "")) && c.length ? za.call(this, c, g, d) : [];
  }
  f = this.depth && !1 !== f;
  if (2 === b && f && !g) {
    return g = c, (c = Wa(this, a[0], a[1])) && c.length ? za.call(this, c, g, d) : [];
  }
  k = C();
  let l = 0;
  if (1 < b && f) {
    var m = a[0];
    l = 1;
  }
  h || 0 === h || (h = m ? this.S : this.resolution);
  for (let q, t; l < b; l++) {
    if ((t = a[l]) && !k[t]) {
      k[t] = 1;
      q = Wa(this, t, m);
      a: {
        f = q;
        var n = e, r = g, p = h;
        let u = [];
        if (f && f.length) {
          if (f.length <= p) {
            n.push(f);
            q = void 0;
            break a;
          }
          for (let w = 0, z; w < p; w++) {
            if (z = f[w]) {
              u[w] = z;
            }
          }
          if (u.length) {
            n.push(u);
            q = void 0;
            break a;
          }
        }
        q = r ? void 0 : u;
      }
      if (q) {
        e = q;
        break;
      }
      m && (g && q && e.length || (m = t));
    }
    g && m && l === b - 1 && !e.length && (h = this.resolution, m = "", l = -1, k = C());
  }
  a: {
    a = e;
    e = a.length;
    m = a;
    if (1 < e) {
      m = wa(a, h, c, d, g);
    } else if (1 === e) {
      g = za.call(null, a[0], c, d);
      break a;
    }
    g = m;
  }
  return g;
};
function Wa(a, c, b) {
  let e;
  b && (e = a.bidirectional && c > b) && (e = b, b = c, c = e);
  a = b ? (a = a.ctx.get(b)) && a.get(c) : a.map.get(c);
  return a;
}
;O.prototype.remove = function(a, c) {
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
      Xa(this.map, a), this.depth && Xa(this.ctx, a);
    }
    c || this.reg.delete(a);
  }
  this.cache && this.cache.remove(a);
  return this;
};
function Xa(a, c) {
  let b = 0;
  if (a.constructor === Array) {
    for (let e = 0, d, f; e < a.length; e++) {
      if ((d = a[e]) && d.length) {
        if (f = d.indexOf(c), 0 <= f) {
          1 < d.length ? (d.splice(f, 1), b++) : delete a[e];
          break;
        } else {
          b++;
        }
      }
    }
  } else {
    for (let e of a.entries()) {
      const d = e[0], f = Xa(e[1], c);
      f ? b += f : a.delete(d);
    }
  }
  return b;
}
;function O(a, c) {
  if (!this || this.constructor !== O) {
    return new O(a);
  }
  if (a) {
    var b = D(a) ? a : a.preset;
    b && (Ua[b] || console.warn("Preset not found: " + b), a = Object.assign({}, Ua[b], a));
  } else {
    a = {};
  }
  b = a.context;
  const e = !0 === b ? {depth:1} : b || {}, d = D(a.encoder) ? Ta[a.encoder] : a.encode || a.encoder || Na;
  this.encoder = d.encode ? d : "object" === typeof d ? new K(d) : {encode:d};
  this.resolution = a.resolution || 9;
  this.tokenize = b = (b = a.tokenize) && "default" !== b && "exact" !== b && b || "strict";
  this.depth = "strict" === b && e.depth || 0;
  this.bidirectional = !1 !== e.bidirectional;
  this.fastupdate = !!a.fastupdate;
  this.score = a.score || null;
  e && "strict" !== this.tokenize && console.warn('Context-Search could not applied, because it is just supported when using the tokenizer "strict".');
  b = !1;
  this.map = new Map();
  this.ctx = new Map();
  this.reg = c || (this.fastupdate ? new Map() : new Set());
  this.S = e.resolution || 3;
  this.rtl = d.rtl || a.rtl || !1;
  this.cache = (b = a.cache || null) && new Y(b);
  this.priority = a.priority || 4;
}
x = O.prototype;
x.clear = function() {
  this.map.clear();
  this.ctx.clear();
  this.reg.clear();
  this.cache && this.cache.clear();
  return this;
};
x.append = function(a, c) {
  return this.add(a, c, !0);
};
x.contain = function(a) {
  return this.reg.has(a);
};
x.update = function(a, c) {
  const b = this, e = this.remove(a);
  return e && e.then ? e.then(() => b.add(a, c)) : this.add(a, c);
};
function Ya(a) {
  let c = 0;
  if (a.constructor === Array) {
    for (let b = 0, e; b < a.length; b++) {
      (e = a[b]) && (c += e.length);
    }
  } else {
    for (const b of a.entries()) {
      const e = b[0], d = Ya(b[1]);
      d ? c += d : a.delete(e);
    }
  }
  return c;
}
x.cleanup = function() {
  if (!this.fastupdate) {
    return console.info('Cleanup the index isn\'t required when not using "fastupdate".'), this;
  }
  Ya(this.map);
  this.depth && Ya(this.ctx);
  return this;
};
x.searchCache = La;
x.export = function(a, c, b = 0, e = 0) {
  let d, f;
  switch(e) {
    case 0:
      d = "reg";
      f = ra(this.reg);
      break;
    case 1:
      d = "cfg";
      f = null;
      break;
    case 2:
      d = "map";
      f = na(this.map, this.reg.size);
      break;
    case 3:
      d = "ctx";
      f = pa(this.ctx, this.reg.size);
      break;
    default:
      return;
  }
  return U.call(this, a, c, d, f, b, e);
};
x.import = function(a, c) {
  if (c) {
    switch("string" === typeof c && (c = JSON.parse(c)), a = a.split("."), "json" === a[a.length - 1] && a.pop(), 3 === a.length && a.shift(), a = 1 < a.length ? a[1] : a[0], a) {
      case "reg":
        this.fastupdate = !1;
        this.reg = sa(c, this.reg);
        break;
      case "map":
        this.map = oa(c, this.map);
        break;
      case "ctx":
        this.ctx = qa(c, this.ctx);
    }
  }
};
x.serialize = function(a = !0) {
  let c = "", b = "", e = "";
  if (this.reg.size) {
    let f;
    for (var d of this.reg.keys()) {
      f || (f = typeof d), c += (c ? "," : "") + ("string" === f ? '"' + d + '"' : d);
    }
    c = "index.reg=new Set([" + c + "]);";
    b = ta(this.map, f);
    b = "index.map=new Map([" + b + "]);";
    for (const g of this.ctx.entries()) {
      d = g[0];
      let k = ta(g[1], f);
      k = "new Map([" + k + "])";
      k = '["' + d + '",' + k + "]";
      e += (e ? "," : "") + k;
    }
    e = "index.ctx=new Map([" + e + "]);";
  }
  return a ? "function inject(index){" + c + b + e + "}" : c + b + e;
};
ia(O.prototype);
C();
const Za = {Index:O, Charset:Ta, Encoder:K, Document:V, Worker:null, Resolver:null, IndexedDB:null, Language:{}}, ab = "undefined" !== typeof self ? self : "undefined" !== typeof global ? global : self;
let bb;
(bb = ab.define) && bb.amd ? bb([], function() {
  return Za;
}) : "object" === typeof ab.exports ? ab.exports = Za : ab.FlexSearch = Za;
}(this||self));
