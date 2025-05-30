/**!
 * FlexSearch.js v0.8.202 (Bundle/Debug)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */
var A;
function I(a, c, b) {
  const e = typeof b, d = typeof a;
  if ("undefined" !== e) {
    if ("undefined" !== d) {
      if (b) {
        if ("function" === d && e === d) {
          return function(h) {
            return a(b(h));
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
function J(a, c) {
  return "undefined" === typeof a ? c : a;
}
function M() {
  return Object.create(null);
}
function P(a) {
  return "string" === typeof a;
}
function R(a) {
  return "object" === typeof a;
}
function S(a, c) {
  if (P(c)) {
    a = a[c];
  } else {
    for (let b = 0; a && b < c.length; b++) {
      a = a[c[b]];
    }
  }
  return a;
}
;const aa = /[^\p{L}\p{N}]+/u, da = /(\d{3})/g, ea = /(\D)(\d{3})/g, fa = /(\d{3})(\D)/g, ha = /[\u0300-\u036f]/g;
function ka(a = {}) {
  if (!this || this.constructor !== ka) {
    return new ka(...arguments);
  }
  if (arguments.length) {
    for (a = 0; a < arguments.length; a++) {
      this.assign(arguments[a]);
    }
  } else {
    this.assign(a);
  }
}
A = ka.prototype;
A.assign = function(a) {
  this.normalize = I(a.normalize, !0, this.normalize);
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
    this.numeric = I(a.numeric, e);
  } else {
    try {
      this.split = I(this.split, aa);
    } catch (d) {
      console.warn("This platform does not support unicode regex. It falls back to using simple whitespace splitter instead: /s+/."), this.split = /\s+/;
    }
    this.numeric = I(a.numeric, I(this.numeric, !0));
  }
  this.prepare = I(a.prepare, null, this.prepare);
  this.finalize = I(a.finalize, null, this.finalize);
  b = a.filter;
  this.filter = "function" === typeof b ? b : I(b && new Set(b), null, this.filter);
  this.dedupe = I(a.dedupe, !0, this.dedupe);
  this.matcher = I((b = a.matcher) && new Map(b), null, this.matcher);
  this.mapper = I((b = a.mapper) && new Map(b), null, this.mapper);
  this.stemmer = I((b = a.stemmer) && new Map(b), null, this.stemmer);
  this.replacer = I(a.replacer, null, this.replacer);
  this.minlength = I(a.minlength, 1, this.minlength);
  this.maxlength = I(a.maxlength, 1024, this.maxlength);
  this.rtl = I(a.rtl, !1, this.rtl);
  if (this.cache = b = I(a.cache, !0, this.cache)) {
    this.H = null, this.O = "number" === typeof b ? b : 2e5, this.F = new Map(), this.G = new Map(), this.L = this.K = 128;
  }
  this.h = "";
  this.M = null;
  this.C = "";
  this.N = null;
  if (this.matcher) {
    for (const d of this.matcher.keys()) {
      this.h += (this.h ? "|" : "") + d;
    }
  }
  if (this.stemmer) {
    for (const d of this.stemmer.keys()) {
      this.C += (this.C ? "|" : "") + d;
    }
  }
  return this;
};
A.addStemmer = function(a, c) {
  this.stemmer || (this.stemmer = new Map());
  this.stemmer.set(a, c);
  this.C += (this.C ? "|" : "") + a;
  this.N = null;
  this.cache && T(this);
  return this;
};
A.addFilter = function(a) {
  "function" === typeof a ? this.filter = a : (this.filter || (this.filter = new Set()), this.filter.add(a));
  this.cache && T(this);
  return this;
};
A.addMapper = function(a, c) {
  if ("object" === typeof a) {
    return this.addReplacer(a, c);
  }
  if (1 < a.length) {
    return this.addMatcher(a, c);
  }
  this.mapper || (this.mapper = new Map());
  this.mapper.set(a, c);
  this.cache && T(this);
  return this;
};
A.addMatcher = function(a, c) {
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
  this.cache && T(this);
  return this;
};
A.addReplacer = function(a, c) {
  if ("string" === typeof a) {
    return this.addMatcher(a, c);
  }
  this.replacer || (this.replacer = []);
  this.replacer.push(a, c);
  this.cache && T(this);
  return this;
};
A.encode = function(a, c) {
  if (this.cache && a.length <= this.K) {
    if (this.H) {
      if (this.F.has(a)) {
        return this.F.get(a);
      }
    } else {
      this.H = setTimeout(T, 50, this);
    }
  }
  this.normalize && ("function" === typeof this.normalize ? a = this.normalize(a) : a = ha ? a.normalize("NFKD").replace(ha, "").toLowerCase() : a.toLowerCase());
  this.prepare && (a = this.prepare(a));
  this.numeric && 3 < a.length && (a = a.replace(ea, "$1 $2").replace(fa, "$1 $2").replace(da, "$1 "));
  const b = !(this.dedupe || this.mapper || this.filter || this.matcher || this.stemmer || this.replacer);
  let e = [], d = M(), f, g, h = this.split || "" === this.split ? a.split(this.split) : [a];
  for (let n = 0, l, D; n < h.length; n++) {
    if ((l = D = h[n]) && !(l.length < this.minlength || l.length > this.maxlength)) {
      if (c) {
        if (d[l]) {
          continue;
        }
        d[l] = 1;
      } else {
        if (f === l) {
          continue;
        }
        f = l;
      }
      if (b) {
        e.push(l);
      } else {
        if (!this.filter || ("function" === typeof this.filter ? this.filter(l) : !this.filter.has(l))) {
          if (this.cache && l.length <= this.L) {
            if (this.H) {
              var k = this.G.get(l);
              if (k || "" === k) {
                k && e.push(k);
                continue;
              }
            } else {
              this.H = setTimeout(T, 50, this);
            }
          }
          if (this.stemmer) {
            this.N || (this.N = new RegExp("(?!^)(" + this.C + ")$"));
            let w;
            for (; w !== l && 2 < l.length;) {
              w = l, l = l.replace(this.N, t => this.stemmer.get(t));
            }
          }
          if (l && (this.mapper || this.dedupe && 1 < l.length)) {
            k = "";
            for (let w = 0, t = "", p, x; w < l.length; w++) {
              p = l.charAt(w), p === t && this.dedupe || ((x = this.mapper && this.mapper.get(p)) || "" === x ? x === t && this.dedupe || !(t = x) || (k += x) : k += t = p);
            }
            l = k;
          }
          this.matcher && 1 < l.length && (this.M || (this.M = new RegExp("(" + this.h + ")", "g")), l = l.replace(this.M, w => this.matcher.get(w)));
          if (l && this.replacer) {
            for (k = 0; l && k < this.replacer.length; k += 2) {
              l = l.replace(this.replacer[k], this.replacer[k + 1]);
            }
          }
          this.cache && D.length <= this.L && (this.G.set(D, l), this.G.size > this.O && (this.G.clear(), this.L = this.L / 1.1 | 0));
          if (l) {
            if (l !== D) {
              if (c) {
                if (d[l]) {
                  continue;
                }
                d[l] = 1;
              } else {
                if (g === l) {
                  continue;
                }
                g = l;
              }
            }
            e.push(l);
          }
        }
      }
    }
  }
  this.finalize && (e = this.finalize(e) || e);
  this.cache && a.length <= this.K && (this.F.set(a, e), this.F.size > this.O && (this.F.clear(), this.K = this.K / 1.1 | 0));
  return e;
};
function T(a) {
  a.H = null;
  a.F.clear();
  a.G.clear();
}
;function la(a, c, b) {
  b || (c || "object" !== typeof a ? "object" === typeof c && (b = c, c = 0) : b = a);
  b && (a = b.query || a, c = b.limit || c);
  let e = "" + (c || 0);
  b && (e += (b.offset || 0) + !!b.context + !!b.suggest + (!1 !== b.resolve) + (b.resolution || this.resolution) + (b.boost || 0));
  a = ("" + a).toLowerCase();
  this.cache || (this.cache = new W());
  let d = this.cache.get(a + e);
  if (!d) {
    const f = b && b.cache;
    f && (b.cache = !1);
    d = this.search(a, c, b);
    f && (b.cache = f);
    this.cache.set(a + e, d);
  }
  return d;
}
function W(a) {
  this.limit = a && !0 !== a ? a : 1000;
  this.cache = new Map();
  this.h = "";
}
W.prototype.set = function(a, c) {
  this.cache.set(this.h = a, c);
  this.cache.size > this.limit && this.cache.delete(this.cache.keys().next().value);
};
W.prototype.get = function(a) {
  const c = this.cache.get(a);
  c && this.h !== a && (this.cache.delete(a), this.cache.set(this.h = a, c));
  return c;
};
W.prototype.remove = function(a) {
  for (const c of this.cache) {
    const b = c[0];
    c[1].includes(a) && this.cache.delete(b);
  }
};
W.prototype.clear = function() {
  this.cache.clear();
  this.h = "";
};
const ma = {normalize:!1, numeric:!1, dedupe:!1};
const na = {};
const oa = new Map([["b", "p"], ["v", "f"], ["w", "f"], ["z", "s"], ["x", "s"], ["d", "t"], ["n", "m"], ["c", "k"], ["g", "k"], ["j", "k"], ["q", "k"], ["i", "e"], ["y", "e"], ["u", "o"]]);
const pa = new Map([["ae", "a"], ["oe", "o"], ["sh", "s"], ["kh", "k"], ["th", "t"], ["ph", "f"], ["pf", "f"]]), qa = [/([^aeo])h(.)/g, "$1$2", /([aeo])h([^aeo]|$)/g, "$1$2", /(.)\1+/g, "$1"];
const ra = {a:"", e:"", i:"", o:"", u:"", y:"", b:1, f:1, p:1, v:1, c:2, g:2, j:2, k:2, q:2, s:2, x:2, z:2, "\u00df":2, d:3, t:3, l:4, m:5, n:5, r:6};
var ua = {Exact:ma, Default:na, Normalize:na, LatinBalance:{mapper:oa}, LatinAdvanced:{mapper:oa, matcher:pa, replacer:qa}, LatinExtra:{mapper:oa, replacer:qa.concat([/(?!^)[aeo]/g, ""]), matcher:pa}, LatinSoundex:{dedupe:!1, include:{letter:!0}, finalize:function(a) {
  for (let b = 0; b < a.length; b++) {
    var c = a[b];
    let e = c.charAt(0), d = ra[e];
    for (let f = 1, g; f < c.length && (g = c.charAt(f), "h" === g || "w" === g || !(g = ra[g]) || g === d || (e += g, d = g, 4 !== e.length)); f++) {
    }
    a[b] = e;
  }
}}, CJK:{split:""}, LatinExact:ma, LatinDefault:na, LatinSimple:na};
function va(a) {
  X.call(a, "add");
  X.call(a, "append");
  X.call(a, "search");
  X.call(a, "update");
  X.call(a, "remove");
  X.call(a, "searchCache");
}
let wa, xa, ya;
function za() {
  wa = ya = 0;
}
function X(a) {
  this[a + "Async"] = function() {
    const c = arguments;
    var b = c[c.length - 1];
    let e;
    "function" === typeof b && (e = b, delete c[c.length - 1]);
    wa ? ya || (ya = Date.now() - xa >= this.priority * this.priority * 3) : (wa = setTimeout(za, 0), xa = Date.now());
    if (ya) {
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
;Y.prototype.add = function(a, c, b) {
  R(a) && (c = a, a = S(c, this.key));
  if (c && (a || 0 === a)) {
    if (!b && this.reg.has(a)) {
      return this.update(a, c);
    }
    for (let h = 0, k; h < this.field.length; h++) {
      k = this.D[h];
      var e = this.index.get(this.field[h]);
      if ("function" === typeof k) {
        var d = k(c);
        d && e.add(a, d, !1, !0);
      } else {
        if (d = k.I, !d || d(c)) {
          k.constructor === String ? k = ["" + k] : P(k) && (k = [k]), Aa(c, k, this.J, 0, e, a, k[0], b);
        }
      }
    }
    if (this.tag) {
      for (e = 0; e < this.B.length; e++) {
        var f = this.B[e], g = this.R[e];
        d = this.tag.get(g);
        let h = M();
        if ("function" === typeof f) {
          if (f = f(c), !f) {
            continue;
          }
        } else {
          const k = f.I;
          if (k && !k(c)) {
            continue;
          }
          f.constructor === String && (f = "" + f);
          f = S(c, f);
        }
        if (d && f) {
          P(f) && (f = [f]);
          for (let k = 0, n, l; k < f.length; k++) {
            n = f[k], h[n] || (h[n] = 1, (g = d.get(n)) ? l = g : d.set(n, l = []), b && l.includes(a) || (l.push(a), this.fastupdate && ((g = this.reg.get(a)) ? g.push(l) : this.reg.set(a, [l]))));
          }
        } else {
          d || console.warn("Tag '" + g + "' was not found");
        }
      }
    }
    if (this.store && (!b || !this.store.has(a))) {
      let h;
      if (this.A) {
        h = M();
        for (let k = 0, n; k < this.A.length; k++) {
          n = this.A[k];
          if ((b = n.I) && !b(c)) {
            continue;
          }
          let l;
          if ("function" === typeof n) {
            l = n(c);
            if (!l) {
              continue;
            }
            n = [n.S];
          } else if (P(n) || n.constructor === String) {
            h[n] = c[n];
            continue;
          }
          Ba(c, h, n, 0, n[0], l);
        }
      }
      this.store.set(a, h || c);
    }
  }
  return this;
};
function Ba(a, c, b, e, d, f) {
  a = a[d];
  if (e === b.length - 1) {
    c[d] = f || a;
  } else if (a) {
    if (a.constructor === Array) {
      for (c = c[d] = Array(a.length), d = 0; d < a.length; d++) {
        Ba(a, c, b, e, d);
      }
    } else {
      c = c[d] || (c[d] = M()), d = b[++e], Ba(a, c, b, e, d);
    }
  }
}
function Aa(a, c, b, e, d, f, g, h) {
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
      d.add(f, a, h, !0);
    } else {
      if (a.constructor === Array) {
        for (g = 0; g < a.length; g++) {
          Aa(a, c, b, e, d, f, g, h);
        }
      } else {
        g = c[++e], Aa(a, c, b, e, d, f, g, h);
      }
    }
  }
}
;function Ca(a, c, b) {
  if (!a.length) {
    return a;
  }
  if (1 === a.length) {
    return a = a[0], a = b || a.length > c ? a.slice(b, b + c) : a;
  }
  let e = [];
  for (let d = 0, f, g; d < a.length; d++) {
    if ((f = a[d]) && (g = f.length)) {
      if (b) {
        if (b >= g) {
          b -= g;
          continue;
        }
        f = f.slice(b, b + c);
        g = f.length;
        b = 0;
      }
      g > c && (f = f.slice(0, c), g = c);
      if (!e.length && g >= c) {
        return f;
      }
      e.push(f);
      c -= g;
      if (!c) {
        break;
      }
    }
  }
  return e = 1 < e.length ? [].concat.apply([], e) : e[0];
}
;function Da(a, c, b, e, d) {
  let f, g, h;
  "string" === typeof d ? (f = d, d = "") : f = d.template;
  if (!f) {
    throw Error('No template pattern was specified by the search option "highlight"');
  }
  g = f.indexOf("$1");
  if (-1 === g) {
    throw Error('Invalid highlight template. The replacement pattern "$1" was not found in template: ' + f);
  }
  h = f.substring(g + 2);
  g = f.substring(0, g);
  let k = d && d.boundary, n = !d || !1 !== d.clip, l = d && d.merge && h && g && new RegExp(h + " " + g, "g");
  d = d && d.ellipsis;
  var D = 0;
  if ("object" === typeof d) {
    var w = d.template;
    D = w.length - 2;
    d = d.pattern;
  }
  "string" !== typeof d && (d = !1 === d ? "" : "...");
  D && (d = w.replace("$1", d));
  w = d.length - D;
  let t, p;
  "object" === typeof k && (t = k.before, 0 === t && (t = -1), p = k.after, 0 === p && (p = -1), k = k.total || 9e5);
  D = new Map();
  for (let sa = 0, U, Ha, ba; sa < c.length; sa++) {
    let ca;
    if (e) {
      ca = c, ba = e;
    } else {
      var x = c[sa];
      ba = x.field;
      if (!ba) {
        continue;
      }
      ca = x.result;
    }
    Ha = b.get(ba);
    U = Ha.encoder;
    x = D.get(U);
    "string" !== typeof x && (x = U.encode(a), D.set(U, x));
    for (let ia = 0; ia < ca.length; ia++) {
      var m = ca[ia].doc;
      if (!m) {
        continue;
      }
      m = S(m, ba);
      if (!m) {
        continue;
      }
      var v = m.trim().split(/\s+/);
      if (!v.length) {
        continue;
      }
      m = "";
      var u = [];
      let ja = [];
      var F = -1, z = -1, r = 0;
      for (var y = 0; y < v.length; y++) {
        var E = v[y], B = U.encode(E);
        B = 1 < B.length ? B.join(" ") : B[0];
        let q;
        if (B && E) {
          var C = E.length, K = (U.split ? E.replace(U.split, "") : E).length - B.length, L = "", Q = 0;
          for (var V = 0; V < x.length; V++) {
            var N = x[V];
            if (N) {
              var H = N.length;
              H += K;
              Q && H <= Q || (N = B.indexOf(N), -1 < N && (L = (N ? E.substring(0, N) : "") + g + E.substring(N, N + H) + h + (N + H < C ? E.substring(N + H) : ""), Q = H, q = !0));
            }
          }
          L && (k && (0 > F && (F = m.length + (m ? 1 : 0)), z = m.length + (m ? 1 : 0) + L.length, r += C, ja.push(u.length), u.push({match:L})), m += (m ? " " : "") + L);
        }
        if (!q) {
          E = v[y], m += (m ? " " : "") + E, k && u.push({text:E});
        } else if (k && r >= k) {
          break;
        }
      }
      r = ja.length * (f.length - 2);
      if (t || p || k && m.length - r > k) {
        if (r = k + r - 2 * w, y = z - F, 0 < t && (y += t), 0 < p && (y += p), y <= r) {
          v = t ? F - (0 < t ? t : 0) : F - ((r - y) / 2 | 0), u = p ? z + (0 < p ? p : 0) : v + r, n || (0 < v && " " !== m.charAt(v) && " " !== m.charAt(v - 1) && (v = m.indexOf(" ", v), 0 > v && (v = 0)), u < m.length && " " !== m.charAt(u - 1) && " " !== m.charAt(u) && (u = m.lastIndexOf(" ", u), u < z ? u = z : ++u)), m = (v ? d : "") + m.substring(v, u) + (u < m.length ? d : "");
        } else {
          z = [];
          F = {};
          r = {};
          y = {};
          E = {};
          B = {};
          L = K = C = 0;
          for (V = Q = 1;;) {
            var O = void 0;
            for (let q = 0, G; q < ja.length; q++) {
              G = ja[q];
              if (L) {
                if (K !== L) {
                  if (y[q + 1]) {
                    continue;
                  }
                  G += L;
                  if (F[G]) {
                    C -= w;
                    r[q + 1] = 1;
                    y[q + 1] = 1;
                    continue;
                  }
                  if (G >= u.length - 1) {
                    if (G >= u.length) {
                      y[q + 1] = 1;
                      G >= v.length && (r[q + 1] = 1);
                      continue;
                    }
                    C -= w;
                  }
                  m = u[G].text;
                  if (H = p && B[q]) {
                    if (0 < H) {
                      if (m.length > H) {
                        if (y[q + 1] = 1, n) {
                          m = m.substring(0, H);
                        } else {
                          continue;
                        }
                      }
                      (H -= m.length) || (H = -1);
                      B[q] = H;
                    } else {
                      y[q + 1] = 1;
                      continue;
                    }
                  }
                  if (C + m.length + 1 <= k) {
                    m = " " + m, z[q] += m;
                  } else if (n) {
                    O = k - C - 1, 0 < O && (m = " " + m.substring(0, O), z[q] += m), y[q + 1] = 1;
                  } else {
                    y[q + 1] = 1;
                    continue;
                  }
                } else {
                  if (y[q]) {
                    continue;
                  }
                  G -= K;
                  if (F[G]) {
                    C -= w;
                    y[q] = 1;
                    r[q] = 1;
                    continue;
                  }
                  if (0 >= G) {
                    if (0 > G) {
                      y[q] = 1;
                      r[q] = 1;
                      continue;
                    }
                    C -= w;
                  }
                  m = u[G].text;
                  if (H = t && E[q]) {
                    if (0 < H) {
                      if (m.length > H) {
                        if (y[q] = 1, n) {
                          m = m.substring(m.length - H);
                        } else {
                          continue;
                        }
                      }
                      (H -= m.length) || (H = -1);
                      E[q] = H;
                    } else {
                      y[q] = 1;
                      continue;
                    }
                  }
                  if (C + m.length + 1 <= k) {
                    m += " ", z[q] = m + z[q];
                  } else if (n) {
                    O = m.length + 1 - (k - C), 0 <= O && O < m.length && (m = m.substring(O) + " ", z[q] = m + z[q]), y[q] = 1;
                  } else {
                    y[q] = 1;
                    continue;
                  }
                }
              } else {
                m = u[G].match;
                t && (E[q] = t);
                p && (B[q] = p);
                q && C++;
                let ta;
                G ? !q && w && (C += w) : (r[q] = 1, y[q] = 1);
                G >= v.length - 1 ? ta = 1 : G < u.length - 1 && u[G + 1].match ? ta = 1 : w && (C += w);
                C -= f.length - 2;
                if (!q || C + m.length <= k) {
                  z[q] = m;
                } else {
                  O = Q = V = r[q] = 0;
                  break;
                }
                ta && (r[q + 1] = 1, y[q + 1] = 1);
              }
              C += m.length;
              O = F[G] = 1;
            }
            if (O) {
              K === L ? L++ : K++;
            } else {
              K === L ? Q = 0 : V = 0;
              if (!Q && !V) {
                break;
              }
              Q ? (K++, L = K) : L++;
            }
          }
          m = "";
          for (let q = 0, G; q < z.length; q++) {
            G = (q && r[q] ? " " : (q && !d ? " " : "") + d) + z[q], m += G;
          }
          d && !r[z.length] && (m += d);
        }
      }
      l && (m = m.replace(l, " "));
      ca[ia].highlight = m;
    }
    if (e) {
      break;
    }
  }
  return c;
}
;function Ea(a, c) {
  const b = M(), e = [];
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
;M();
Y.prototype.search = function(a, c, b, e) {
  b || (!c && R(a) ? (b = a, a = "") : R(c) && (b = c, c = 0));
  let d = [];
  var f = [];
  let g;
  let h, k, n, l;
  let D = 0, w = !0, t;
  if (b) {
    b.constructor === Array && (b = {index:b});
    a = b.query || a;
    var p = b.pluck;
    var x = b.merge;
    n = p || b.field || (n = b.index) && (n.index ? null : n);
    l = this.tag && b.tag;
    h = b.suggest;
    w = !0;
    k = b.cache;
    this.store && b.highlight && !w ? console.warn("Highlighting results can only be done on a final resolver task or when calling .resolve({ highlight: ... })") : this.store && b.enrich && !w && console.warn("Enrich results can only be done on a final resolver task or when calling .resolve({ enrich: true })");
    t = w && this.store && b.highlight;
    g = !!t || w && this.store && b.enrich;
    c = b.limit || c;
    var m = b.offset || 0;
    c || (c = w ? 100 : 0);
    if (l) {
      l.constructor !== Array && (l = [l]);
      var v = [];
      for (let z = 0, r; z < l.length; z++) {
        r = l[z];
        if (P(r)) {
          throw Error("A tag option can't be a string, instead it needs a { field: tag } format.");
        }
        if (r.field && r.tag) {
          var u = r.tag;
          if (u.constructor === Array) {
            for (var F = 0; F < u.length; F++) {
              v.push(r.field, u[F]);
            }
          } else {
            v.push(r.field, u);
          }
        } else {
          u = Object.keys(r);
          for (let y = 0, E, B; y < u.length; y++) {
            if (E = u[y], B = r[E], B.constructor === Array) {
              for (F = 0; F < B.length; F++) {
                v.push(E, B[F]);
              }
            } else {
              v.push(E, B);
            }
          }
        }
      }
      if (!v.length) {
        throw Error("Your tag definition within the search options is probably wrong. No valid tags found.");
      }
      l = v;
      if (!a) {
        f = [];
        if (v.length) {
          for (p = 0; p < v.length; p += 2) {
            x = Fa.call(this, v[p], v[p + 1], c, m, g), d.push({field:v[p], tag:v[p + 1], result:x});
          }
        }
        return f.length ? Promise.all(f).then(function(z) {
          for (let r = 0; r < z.length; r++) {
            d[r].result = z[r];
          }
          return d;
        }) : d;
      }
    }
    n && n.constructor !== Array && (n = [n]);
  }
  n || (n = this.field);
  v = !1;
  for (let z = 0, r, y, E; z < n.length; z++) {
    y = n[z];
    let B;
    P(y) || (B = y, y = B.field, a = B.query || a, c = J(B.limit, c), m = J(B.offset, m), h = J(B.suggest, h), t = w && this.store && J(B.highlight, t), g = !!t || w && this.store && J(B.enrich, g), k = J(B.cache, k));
    if (e) {
      r = e[z];
    } else {
      u = B || b || {};
      F = u.enrich;
      const C = this.index.get(y);
      l && F && (u.enrich = !1);
      r = k ? C.searchCache(a, c, u) : C.search(a, c, u);
      F && (u.enrich = F);
      if (v) {
        v[z] = r;
        continue;
      }
    }
    E = (r = r.result || r) && r.length;
    if (l && E) {
      u = [];
      F = 0;
      for (let C = 0, K, L; C < l.length; C += 2) {
        K = this.tag.get(l[C]);
        if (!K) {
          if (console.warn("Tag '" + l[C] + ":" + l[C + 1] + "' will be skipped because there is no field '" + l[C] + "'."), h) {
            continue;
          } else {
            return d;
          }
        }
        if (L = (K = K && K.get(l[C + 1])) && K.length) {
          F++, u.push(K);
        } else if (!h) {
          return d;
        }
      }
      if (F) {
        r = Ea(r, u);
        E = r.length;
        if (!E && !h) {
          return r;
        }
        F--;
      }
    }
    if (E) {
      f[D] = y, d.push(r), D++;
    } else if (1 === n.length) {
      return d;
    }
  }
  if (v) {
    const z = this;
    return Promise.all(v).then(function(r) {
      b && (b.resolve = w);
      r.length && (r = z.search(a, c, b, r));
      return r;
    });
  }
  if (!D) {
    return d;
  }
  if (p && (!g || !this.store)) {
    return d = d[0];
  }
  v = [];
  for (m = 0; m < f.length; m++) {
    e = d[m];
    g && e.length && "undefined" === typeof e[0].doc && (e = Ga.call(this, e));
    if (p) {
      return t ? Da(a, e, this.index, p, t) : e;
    }
    d[m] = {field:f[m], result:e};
  }
  t && (d = Da(a, d, this.index, p, t));
  return x ? Ia(d) : d;
};
function Ia(a) {
  const c = [], b = M(), e = M();
  for (let d = 0, f, g, h, k, n, l, D; d < a.length; d++) {
    f = a[d];
    g = f.field;
    h = f.result;
    for (let w = 0; w < h.length; w++) {
      if (n = h[w], "object" !== typeof n ? n = {id:k = n} : k = n.id, (l = b[k]) ? l.push(g) : (n.field = b[k] = [g], c.push(n)), D = n.highlight) {
        l = e[k], l || (e[k] = l = {}, n.highlight = l), l[g] = D;
      }
    }
  }
  return c;
}
function Fa(a, c, b, e, d) {
  a = this.tag.get(a);
  if (!a) {
    return [];
  }
  a = a.get(c);
  if (!a) {
    return [];
  }
  c = a.length - e;
  if (0 < c) {
    if (b && c > b || e) {
      a = a.slice(e, e + b);
    }
    d && (a = Ga.call(this, a));
  }
  return a;
}
function Ga(a) {
  if (!this || !this.store) {
    return a;
  }
  const c = Array(a.length);
  for (let b = 0, e; b < a.length; b++) {
    e = a[b], c[b] = {id:e, doc:this.store.get(e)};
  }
  return c;
}
;function Y(a) {
  if (!this || this.constructor !== Y) {
    return new Y(a);
  }
  const c = a.document || a.doc || a;
  var b;
  this.D = [];
  this.field = [];
  this.J = [];
  this.key = (b = c.key || c.id) && Ja(b, this.J) || "id";
  this.reg = (this.fastupdate = !!a.fastupdate) ? new Map() : new Set();
  this.A = (b = c.store || null) && b && !0 !== b && [];
  this.store = b && new Map();
  this.cache = (b = a.cache || null) && new W(b);
  a.cache = !1;
  this.priority = a.priority || 4;
  b = new Map();
  let e = c.index || c.field || c;
  P(e) && (e = [e]);
  for (let d = 0, f, g; d < e.length; d++) {
    f = e[d], P(f) || (g = f, f = f.field), g = R(g) ? Object.assign({}, a, g) : a, b.set(f, new Z(g, this.reg)), g.custom ? this.D[d] = g.custom : (this.D[d] = Ja(f, this.J), g.filter && ("string" === typeof this.D[d] && (this.D[d] = new String(this.D[d])), this.D[d].I = g.filter)), this.field[d] = f;
  }
  if (this.A) {
    a = c.store;
    P(a) && (a = [a]);
    for (let d = 0, f, g; d < a.length; d++) {
      f = a[d], g = f.field || f, f.custom ? (this.A[d] = f.custom, f.custom.S = g) : (this.A[d] = Ja(g, this.J), f.filter && ("string" === typeof this.A[d] && (this.A[d] = new String(this.A[d])), this.A[d].I = f.filter));
    }
  }
  this.index = b;
  this.tag = null;
  if (b = c.tag) {
    if ("string" === typeof b && (b = [b]), b.length) {
      this.tag = new Map();
      this.B = [];
      this.R = [];
      for (let d = 0, f, g; d < b.length; d++) {
        f = b[d];
        g = f.field || f;
        if (!g) {
          throw Error("The tag field from the document descriptor is undefined.");
        }
        f.custom ? this.B[d] = f.custom : (this.B[d] = Ja(g, this.J), f.filter && ("string" === typeof this.B[d] && (this.B[d] = new String(this.B[d])), this.B[d].I = f.filter));
        this.R[d] = g;
        this.tag.set(g, new Map());
      }
    }
  }
}
function Ja(a, c) {
  const b = a.split(":");
  let e = 0;
  for (let d = 0; d < b.length; d++) {
    a = b[d], "]" === a[a.length - 1] && (a = a.substring(0, a.length - 2)) && (c[e] = !0), a && (b[e++] = a);
  }
  e < b.length && (b.length = e);
  return 1 < e ? b : b[0];
}
A = Y.prototype;
A.append = function(a, c) {
  return this.add(a, c, !0);
};
A.update = function(a, c) {
  return this.remove(a).add(a, c);
};
A.remove = function(a) {
  R(a) && (a = S(a, this.key));
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
A.clear = function() {
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
A.contain = function(a) {
  return this.reg.has(a);
};
A.cleanup = function() {
  for (const a of this.index.values()) {
    a.cleanup();
  }
  return this;
};
A.get = function(a) {
  return this.store.get(a) || null;
};
A.set = function(a, c) {
  "object" === typeof a && (c = a, a = S(c, this.key));
  this.store.set(a, c);
  return this;
};
A.searchCache = la;
A.export = Ka;
A.import = La;
va(Y.prototype);
function Ma(a, c = 0) {
  let b = [], e = [];
  c && (c = 250000 / c * 5000 | 0);
  for (const d of a.entries()) {
    e.push(d), e.length === c && (b.push(e), e = []);
  }
  e.length && b.push(e);
  return b;
}
function Na(a, c) {
  c || (c = new Map());
  for (let b = 0, e; b < a.length; b++) {
    e = a[b], c.set(e[0], e[1]);
  }
  return c;
}
function Oa(a, c = 0) {
  let b = [], e = [];
  c && (c = 250000 / c * 1000 | 0);
  for (const d of a.entries()) {
    e.push([d[0], Ma(d[1])[0]]), e.length === c && (b.push(e), e = []);
  }
  e.length && b.push(e);
  return b;
}
function Pa(a, c) {
  c || (c = new Map());
  for (let b = 0, e, d; b < a.length; b++) {
    e = a[b], d = c.get(e[0]), c.set(e[0], Na(e[1], d));
  }
  return c;
}
function Qa(a) {
  let c = [], b = [];
  for (const e of a.keys()) {
    b.push(e), 250000 === b.length && (c.push(b), b = []);
  }
  b.length && c.push(b);
  return c;
}
function Ra(a, c) {
  c || (c = new Set());
  for (let b = 0; b < a.length; b++) {
    c.add(a[b]);
  }
  return c;
}
function Sa(a, c, b, e, d, f, g = 0) {
  const h = e && e.constructor === Array;
  var k = h ? e.shift() : e;
  if (!k) {
    return this.export(a, c, d, f + 1);
  }
  if ((k = a((c ? c + "." : "") + (g + 1) + "." + b, JSON.stringify(k))) && k.then) {
    const n = this;
    return k.then(function() {
      return Sa.call(n, a, c, b, h ? e : null, d, f, g + 1);
    });
  }
  return Sa.call(this, a, c, b, h ? e : null, d, f, g + 1);
}
function Ka(a, c, b = 0, e = 0) {
  if (b < this.field.length) {
    const g = this.field[b];
    if ((c = this.index.get(g).export(a, g, b, e = 1)) && c.then) {
      const h = this;
      return c.then(function() {
        return h.export(a, g, b + 1);
      });
    }
    return this.export(a, g, b + 1);
  }
  let d, f;
  switch(e) {
    case 0:
      d = "reg";
      f = Qa(this.reg);
      c = null;
      break;
    case 1:
      d = "tag";
      f = this.tag && Oa(this.tag, this.reg.size);
      c = null;
      break;
    case 2:
      d = "doc";
      f = this.store && Ma(this.store);
      c = null;
      break;
    default:
      return;
  }
  return Sa.call(this, a, c, d, f, b, e);
}
function La(a, c) {
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
        this.reg = Ra(c, this.reg);
        for (let e = 0, d; e < this.field.length; e++) {
          d = this.index.get(this.field[e]), d.fastupdate = !1, d.reg = this.reg;
        }
        break;
      case "tag":
        this.tag = Pa(c, this.tag);
        break;
      case "doc":
        this.store = Na(c, this.store);
    }
  }
}
function Ta(a, c) {
  let b = "";
  for (const e of a.entries()) {
    a = e[0];
    const d = e[1];
    let f = "";
    for (let g = 0, h; g < d.length; g++) {
      h = d[g] || [""];
      let k = "";
      for (let n = 0; n < h.length; n++) {
        k += (k ? "," : "") + ("string" === c ? '"' + h[n] + '"' : h[n]);
      }
      k = "[" + k + "]";
      f += (f ? "," : "") + k;
    }
    f = '["' + a + '",[' + f + "]]";
    b += (b ? "," : "") + f;
  }
  return b;
}
;Z.prototype.remove = function(a, c) {
  const b = this.reg.size && (this.fastupdate ? this.reg.get(a) : this.reg.has(a));
  if (b) {
    if (this.fastupdate) {
      for (let e = 0, d, f; e < b.length; e++) {
        if ((d = b[e]) && (f = d.length)) {
          if (d[f - 1] === a) {
            d.pop();
          } else {
            const g = d.indexOf(a);
            0 <= g && d.splice(g, 1);
          }
        }
      }
    } else {
      Ua(this.map, a), this.depth && Ua(this.ctx, a);
    }
    c || this.reg.delete(a);
  }
  this.cache && this.cache.remove(a);
  return this;
};
function Ua(a, c) {
  let b = 0;
  var e = "undefined" === typeof c;
  if (a.constructor === Array) {
    for (let d = 0, f, g, h; d < a.length; d++) {
      if ((f = a[d]) && f.length) {
        if (e) {
          return 1;
        }
        g = f.indexOf(c);
        if (0 <= g) {
          if (1 < f.length) {
            return f.splice(g, 1), 1;
          }
          delete a[d];
          if (b) {
            return 1;
          }
          h = 1;
        } else {
          if (h) {
            return 1;
          }
          b++;
        }
      }
    }
  } else {
    for (let d of a.entries()) {
      e = d[0], Ua(d[1], c) ? b++ : a.delete(e);
    }
  }
  return b;
}
;const Va = {memory:{resolution:1}, performance:{resolution:3, fastupdate:!0, context:{depth:1, resolution:1}}, match:{tokenize:"forward"}, score:{resolution:9, context:{depth:2, resolution:3}}};
Z.prototype.add = function(a, c, b, e) {
  if (c && (a || 0 === a)) {
    if (!e && !b && this.reg.has(a)) {
      return this.update(a, c);
    }
    e = this.depth;
    c = this.encoder.encode(c, !e);
    const n = c.length;
    if (n) {
      const l = M(), D = M(), w = this.resolution;
      for (let t = 0; t < n; t++) {
        let p = c[this.rtl ? n - 1 - t : t];
        var d = p.length;
        if (d && (e || !D[p])) {
          var f = this.score ? this.score(c, p, t, null, 0) : Wa(w, n, t), g = "";
          switch(this.tokenize) {
            case "full":
              if (2 < d) {
                for (let x = 0, m; x < d; x++) {
                  for (f = d; f > x; f--) {
                    g = p.substring(x, f);
                    m = this.rtl ? d - 1 - x : x;
                    var h = this.score ? this.score(c, p, t, g, m) : Wa(w, n, t, d, m);
                    Xa(this, D, g, h, a, b);
                  }
                }
                break;
              }
            case "bidirectional":
            case "reverse":
              if (1 < d) {
                for (h = d - 1; 0 < h; h--) {
                  g = p[this.rtl ? d - 1 - h : h] + g;
                  var k = this.score ? this.score(c, p, t, g, h) : Wa(w, n, t, d, h);
                  Xa(this, D, g, k, a, b);
                }
                g = "";
              }
            case "forward":
              if (1 < d) {
                for (h = 0; h < d; h++) {
                  g += p[this.rtl ? d - 1 - h : h], Xa(this, D, g, f, a, b);
                }
                break;
              }
            default:
              if (Xa(this, D, p, f, a, b), e && 1 < n && t < n - 1) {
                for (d = M(), g = this.P, f = p, h = Math.min(e + 1, this.rtl ? t + 1 : n - t), d[f] = 1, k = 1; k < h; k++) {
                  if ((p = c[this.rtl ? n - 1 - t - k : t + k]) && !d[p]) {
                    d[p] = 1;
                    const x = this.score ? this.score(c, f, t, p, k - 1) : Wa(g + (n / 2 > g ? 0 : 1), n, t, h - 1, k - 1), m = this.bidirectional && p > f;
                    Xa(this, l, m ? f : p, x, a, b, m ? p : f);
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
function Xa(a, c, b, e, d, f, g) {
  let h = g ? a.ctx : a.map, k;
  if (!c[b] || g && !(k = c[b])[g]) {
    g ? (c = k || (c[b] = M()), c[g] = 1, (k = h.get(g)) ? h = k : h.set(g, h = new Map())) : c[b] = 1, (k = h.get(b)) ? h = k : h.set(b, h = []), h = h[e] || (h[e] = []), f && h.includes(d) || (h.push(d), a.fastupdate && ((c = a.reg.get(d)) ? c.push(h) : a.reg.set(d, [h])));
  }
}
function Wa(a, c, b, e, d) {
  return b && 1 < a ? c + (e || 0) <= a ? b + (d || 0) : (a - 1) / (c + (e || 0)) * (b + (d || 0)) + 1 | 0 : 0;
}
;Z.prototype.search = function(a, c, b) {
  b || (c || "object" !== typeof a ? "object" === typeof c && (b = c, c = 0) : (b = a, a = ""));
  if (b && b.cache) {
    return b.cache = !1, c = this.searchCache(a, c, b), b.cache = !0, c;
  }
  var e = [], d = 0;
  if (b) {
    a = b.query || a;
    c = b.limit || c;
    d = b.offset || 0;
    var f = b.context;
    var g = b.suggest;
    var h = !0;
    var k = b.resolution;
  }
  "undefined" === typeof h && (h = !0);
  f = this.depth && !1 !== f;
  b = this.encoder.encode(a, !f);
  a = b.length;
  c = c || (h ? 100 : 0);
  if (1 === a) {
    return g = d, (d = Ya(this, b[0], "")) && d.length ? Ca.call(this, d, c, g) : [];
  }
  if (2 === a && f && !g) {
    return g = d, (d = Ya(this, b[1], b[0])) && d.length ? Ca.call(this, d, c, g) : [];
  }
  h = M();
  var n = 0;
  if (f) {
    var l = b[0];
    n = 1;
  }
  k || 0 === k || (k = l ? this.P : this.resolution);
  for (let p, x; n < a; n++) {
    if ((x = b[n]) && !h[x]) {
      h[x] = 1;
      p = Ya(this, x, l);
      a: {
        f = p;
        var D = e, w = g, t = k;
        let m = [];
        if (f && f.length) {
          if (f.length <= t) {
            D.push(f);
            p = void 0;
            break a;
          }
          for (let v = 0, u; v < t; v++) {
            if (u = f[v]) {
              m[v] = u;
            }
          }
          if (m.length) {
            D.push(m);
            p = void 0;
            break a;
          }
        }
        p = w ? void 0 : m;
      }
      if (p) {
        e = p;
        break;
      }
      l && (g && p && e.length || (l = x));
    }
    g && l && n === a - 1 && !e.length && (k = this.resolution, l = "", n = -1, h = M());
  }
  a: {
    b = e;
    e = b.length;
    l = b;
    if (1 < e) {
      b: {
        e = g;
        l = b.length;
        g = [];
        a = M();
        for (let p = 0, x, m, v, u; p < k; p++) {
          for (n = 0; n < l; n++) {
            if (v = b[n], p < v.length && (x = v[p])) {
              for (f = 0; f < x.length; f++) {
                if (m = x[f], (h = a[m]) ? a[m]++ : (h = 0, a[m] = 1), u = g[h] || (g[h] = []), u.push(m), c && h === l - 1 && u.length - d === c) {
                  l = d ? u.slice(d) : u;
                  break b;
                }
              }
            }
          }
        }
        if (b = g.length) {
          if (e) {
            if (1 < g.length) {
              c: {
                for (b = [], k = M(), e = g.length, h = e - 1; 0 <= h; h--) {
                  if (a = (e = g[h]) && e.length) {
                    for (n = 0; n < a; n++) {
                      if (l = e[n], !k[l]) {
                        if (k[l] = 1, d) {
                          d--;
                        } else {
                          if (b.push(l), b.length === c) {
                            break c;
                          }
                        }
                      }
                    }
                  }
                }
              }
            } else {
              b = (g = g[0]) && c && g.length > c || d ? g.slice(d, c + d) : g;
            }
            g = b;
          } else {
            if (b < l) {
              l = [];
              break b;
            }
            g = g[b - 1];
            if (c || d) {
              if (g.length > c || d) {
                g = g.slice(d, c + d);
              }
            }
          }
        }
        l = g;
      }
    } else if (1 === e) {
      c = Ca.call(null, b[0], c, d);
      break a;
    }
    c = l;
  }
  return c;
};
function Ya(a, c, b) {
  let e;
  b && (e = a.bidirectional && c > b) && (e = b, b = c, c = e);
  a = b ? (a = a.ctx.get(b)) && a.get(c) : a.map.get(c);
  return a;
}
;function Z(a, c) {
  if (!this || this.constructor !== Z) {
    return new Z(a);
  }
  if (a) {
    var b = P(a) ? a : a.preset;
    b && (Va[b] || console.warn("Preset not found: " + b), a = Object.assign({}, Va[b], a));
  } else {
    a = {};
  }
  b = a.context;
  const e = !0 === b ? {depth:1} : b || {}, d = P(a.encoder) ? ua[a.encoder] : a.encode || a.encoder || {};
  this.encoder = d.encode ? d : "object" === typeof d ? new ka(d) : {encode:d};
  this.resolution = a.resolution || 9;
  this.tokenize = b = (b = a.tokenize) && "default" !== b && "exact" !== b && b || "strict";
  this.depth = "strict" === b && e.depth || 0;
  this.bidirectional = !1 !== e.bidirectional;
  this.fastupdate = !!a.fastupdate;
  this.score = a.score || null;
  e && e.depth && "strict" !== this.tokenize && console.warn('Context-Search could not applied, because it is just supported when using the tokenizer "strict".');
  b = !1;
  this.map = new Map();
  this.ctx = new Map();
  this.reg = c || (this.fastupdate ? new Map() : new Set());
  this.P = e.resolution || 3;
  this.rtl = d.rtl || a.rtl || !1;
  this.cache = (b = a.cache || null) && new W(b);
  this.priority = a.priority || 4;
}
A = Z.prototype;
A.clear = function() {
  this.map.clear();
  this.ctx.clear();
  this.reg.clear();
  this.cache && this.cache.clear();
  return this;
};
A.append = function(a, c) {
  return this.add(a, c, !0);
};
A.contain = function(a) {
  return this.reg.has(a);
};
A.update = function(a, c) {
  const b = this, e = this.remove(a);
  return e && e.then ? e.then(() => b.add(a, c)) : this.add(a, c);
};
A.cleanup = function() {
  if (!this.fastupdate) {
    return console.info('Cleanup the index isn\'t required when not using "fastupdate".'), this;
  }
  Ua(this.map);
  this.depth && Ua(this.ctx);
  return this;
};
A.searchCache = la;
A.export = function(a, c, b = 0, e = 0) {
  let d, f;
  switch(e) {
    case 0:
      d = "reg";
      f = Qa(this.reg);
      break;
    case 1:
      d = "cfg";
      f = null;
      break;
    case 2:
      d = "map";
      f = Ma(this.map, this.reg.size);
      break;
    case 3:
      d = "ctx";
      f = Oa(this.ctx, this.reg.size);
      break;
    default:
      return;
  }
  return Sa.call(this, a, c, d, f, b, e);
};
A.import = function(a, c) {
  if (c) {
    switch("string" === typeof c && (c = JSON.parse(c)), a = a.split("."), "json" === a[a.length - 1] && a.pop(), 3 === a.length && a.shift(), a = 1 < a.length ? a[1] : a[0], a) {
      case "reg":
        this.fastupdate = !1;
        this.reg = Ra(c, this.reg);
        break;
      case "map":
        this.map = Na(c, this.map);
        break;
      case "ctx":
        this.ctx = Pa(c, this.ctx);
    }
  }
};
A.serialize = function(a = !0) {
  let c = "", b = "", e = "";
  if (this.reg.size) {
    let f;
    for (var d of this.reg.keys()) {
      f || (f = typeof d), c += (c ? "," : "") + ("string" === f ? '"' + d + '"' : d);
    }
    c = "index.reg=new Set([" + c + "]);";
    b = Ta(this.map, f);
    b = "index.map=new Map([" + b + "]);";
    for (const g of this.ctx.entries()) {
      d = g[0];
      let h = Ta(g[1], f);
      h = "new Map([" + h + "])";
      h = '["' + d + '",' + h + "]";
      e += (e ? "," : "") + h;
    }
    e = "index.ctx=new Map([" + e + "]);";
  }
  return a ? "function inject(index){" + c + b + e + "}" : c + b + e;
};
va(Z.prototype);
M();
export default {Index:Z, Charset:ua, Encoder:ka, Document:Y, Worker:null, Resolver:null, IndexedDB:null, Language:{}};

export const Index=Z;export const  Charset=ua;export const  Encoder=ka;export const  Document=Y;export const  Worker=null;export const  Resolver=null;export const  IndexedDB=null;export const  Language={};