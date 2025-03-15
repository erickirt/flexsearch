/**!
 * FlexSearch.js v0.8.0 (ES5/Debug)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */
(function _f(self){'use strict';if(typeof module!=='undefined')self=module;else if(typeof process !== 'undefined')self=process;self._factory=_f;
var v;
function aa(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
}
function y(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  if (b) {
    return b.call(a);
  }
  if ("number" == typeof a.length) {
    return {next:aa(a)};
  }
  throw Error(String(a) + " is not an iterable or ArrayLike");
}
var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = c.value;
  return a;
};
function ca(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
}
var C = ca(this);
function E(a, b) {
  if (b) {
    a: {
      var c = C;
      a = a.split(".");
      for (var d = 0; d < a.length - 1; d++) {
        var e = a[d];
        if (!(e in c)) {
          break a;
        }
        c = c[e];
      }
      a = a[a.length - 1];
      d = c[a];
      b = b(d);
      b != d && null != b && ba(c, a, {configurable:!0, writable:!0, value:b});
    }
  }
}
var da;
if ("function" == typeof Object.setPrototypeOf) {
  da = Object.setPrototypeOf;
} else {
  var ea;
  a: {
    var fa = {a:!0}, ha = {};
    try {
      ha.__proto__ = fa;
      ea = ha.a;
      break a;
    } catch (a) {
    }
    ea = !1;
  }
  da = ea ? function(a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b) {
      throw new TypeError(a + " is not extensible");
    }
    return a;
  } : null;
}
var ia = da;
function ja() {
  this.C = !1;
  this.A = null;
  this.F = void 0;
  this.h = 1;
  this.L = 0;
  this.B = null;
}
function ka(a) {
  if (a.C) {
    throw new TypeError("Generator is already running");
  }
  a.C = !0;
}
ja.prototype.G = function(a) {
  this.F = a;
};
function la(a, b) {
  a.B = {ma:b, oa:!0};
  a.h = a.L;
}
ja.prototype.return = function(a) {
  this.B = {return:a};
  this.h = this.L;
};
function G(a, b, c) {
  a.h = c;
  return {value:b};
}
function ma(a) {
  this.h = new ja();
  this.A = a;
}
function na(a, b) {
  ka(a.h);
  var c = a.h.A;
  if (c) {
    return oa(a, "return" in c ? c["return"] : function(d) {
      return {value:d, done:!0};
    }, b, a.h.return);
  }
  a.h.return(b);
  return pa(a);
}
function oa(a, b, c, d) {
  try {
    var e = b.call(a.h.A, c);
    if (!(e instanceof Object)) {
      throw new TypeError("Iterator result " + e + " is not an object");
    }
    if (!e.done) {
      return a.h.C = !1, e;
    }
    var g = e.value;
  } catch (f) {
    return a.h.A = null, la(a.h, f), pa(a);
  }
  a.h.A = null;
  d.call(a.h, g);
  return pa(a);
}
function pa(a) {
  for (; a.h.h;) {
    try {
      var b = a.A(a.h);
      if (b) {
        return a.h.C = !1, {value:b.value, done:!1};
      }
    } catch (c) {
      a.h.F = void 0, la(a.h, c);
    }
  }
  a.h.C = !1;
  if (a.h.B) {
    b = a.h.B;
    a.h.B = null;
    if (b.oa) {
      throw b.ma;
    }
    return {value:b.return, done:!0};
  }
  return {value:void 0, done:!0};
}
function qa(a) {
  this.next = function(b) {
    ka(a.h);
    a.h.A ? b = oa(a, a.h.A.next, b, a.h.G) : (a.h.G(b), b = pa(a));
    return b;
  };
  this.throw = function(b) {
    ka(a.h);
    a.h.A ? b = oa(a, a.h.A["throw"], b, a.h.G) : (la(a.h, b), b = pa(a));
    return b;
  };
  this.return = function(b) {
    return na(a, b);
  };
  this[Symbol.iterator] = function() {
    return this;
  };
}
function ra(a, b) {
  b = new qa(new ma(b));
  ia && a.prototype && ia(b, a.prototype);
  return b;
}
function sa(a) {
  function b(d) {
    return a.next(d);
  }
  function c(d) {
    return a.throw(d);
  }
  return new Promise(function(d, e) {
    function g(f) {
      f.done ? d(f.value) : Promise.resolve(f.value).then(b, c).then(g, e);
    }
    g(a.next());
  });
}
function ta(a) {
  return sa(new qa(new ma(a)));
}
E("Symbol", function(a) {
  function b(g) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new c(d + (g || "") + "_" + e++, g);
  }
  function c(g, f) {
    this.h = g;
    ba(this, "description", {configurable:!0, writable:!0, value:f});
  }
  if (a) {
    return a;
  }
  c.prototype.toString = function() {
    return this.h;
  };
  var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", e = 0;
  return b;
});
E("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
    var d = C[b[c]];
    "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {configurable:!0, writable:!0, value:function() {
      return ua(aa(this));
    }});
  }
  return a;
});
function ua(a) {
  a = {next:a};
  a[Symbol.iterator] = function() {
    return this;
  };
  return a;
}
E("Promise", function(a) {
  function b(f) {
    this.A = 0;
    this.B = void 0;
    this.h = [];
    this.L = !1;
    var h = this.C();
    try {
      f(h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  }
  function c() {
    this.h = null;
  }
  function d(f) {
    return f instanceof b ? f : new b(function(h) {
      h(f);
    });
  }
  if (a) {
    return a;
  }
  c.prototype.A = function(f) {
    if (null == this.h) {
      this.h = [];
      var h = this;
      this.B(function() {
        h.F();
      });
    }
    this.h.push(f);
  };
  var e = C.setTimeout;
  c.prototype.B = function(f) {
    e(f, 0);
  };
  c.prototype.F = function() {
    for (; this.h && this.h.length;) {
      var f = this.h;
      this.h = [];
      for (var h = 0; h < f.length; ++h) {
        var k = f[h];
        f[h] = null;
        try {
          k();
        } catch (l) {
          this.C(l);
        }
      }
    }
    this.h = null;
  };
  c.prototype.C = function(f) {
    this.B(function() {
      throw f;
    });
  };
  b.prototype.C = function() {
    function f(l) {
      return function(m) {
        k || (k = !0, l.call(h, m));
      };
    }
    var h = this, k = !1;
    return {resolve:f(this.ha), reject:f(this.F)};
  };
  b.prototype.ha = function(f) {
    if (f === this) {
      this.F(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (f instanceof b) {
        this.ja(f);
      } else {
        a: {
          switch(typeof f) {
            case "object":
              var h = null != f;
              break a;
            case "function":
              h = !0;
              break a;
            default:
              h = !1;
          }
        }
        h ? this.ga(f) : this.G(f);
      }
    }
  };
  b.prototype.ga = function(f) {
    var h = void 0;
    try {
      h = f.then;
    } catch (k) {
      this.F(k);
      return;
    }
    "function" == typeof h ? this.ka(h, f) : this.G(f);
  };
  b.prototype.F = function(f) {
    this.ca(2, f);
  };
  b.prototype.G = function(f) {
    this.ca(1, f);
  };
  b.prototype.ca = function(f, h) {
    if (0 != this.A) {
      throw Error("Cannot settle(" + f + ", " + h + "): Promise already settled in state" + this.A);
    }
    this.A = f;
    this.B = h;
    2 === this.A && this.ia();
    this.ea();
  };
  b.prototype.ia = function() {
    var f = this;
    e(function() {
      if (f.fa()) {
        var h = C.console;
        "undefined" !== typeof h && h.error(f.B);
      }
    }, 1);
  };
  b.prototype.fa = function() {
    if (this.L) {
      return !1;
    }
    var f = C.CustomEvent, h = C.Event, k = C.dispatchEvent;
    if ("undefined" === typeof k) {
      return !0;
    }
    "function" === typeof f ? f = new f("unhandledrejection", {cancelable:!0}) : "function" === typeof h ? f = new h("unhandledrejection", {cancelable:!0}) : (f = C.document.createEvent("CustomEvent"), f.initCustomEvent("unhandledrejection", !1, !0, f));
    f.promise = this;
    f.reason = this.B;
    return k(f);
  };
  b.prototype.ea = function() {
    if (null != this.h) {
      for (var f = 0; f < this.h.length; ++f) {
        g.A(this.h[f]);
      }
      this.h = null;
    }
  };
  var g = new c();
  b.prototype.ja = function(f) {
    var h = this.C();
    f.V(h.resolve, h.reject);
  };
  b.prototype.ka = function(f, h) {
    var k = this.C();
    try {
      f.call(h, k.resolve, k.reject);
    } catch (l) {
      k.reject(l);
    }
  };
  b.prototype.then = function(f, h) {
    function k(p, q) {
      return "function" == typeof p ? function(r) {
        try {
          l(p(r));
        } catch (u) {
          m(u);
        }
      } : q;
    }
    var l, m, n = new b(function(p, q) {
      l = p;
      m = q;
    });
    this.V(k(f, l), k(h, m));
    return n;
  };
  b.prototype.catch = function(f) {
    return this.then(void 0, f);
  };
  b.prototype.V = function(f, h) {
    function k() {
      switch(l.A) {
        case 1:
          f(l.B);
          break;
        case 2:
          h(l.B);
          break;
        default:
          throw Error("Unexpected state: " + l.A);
      }
    }
    var l = this;
    null == this.h ? g.A(k) : this.h.push(k);
    this.L = !0;
  };
  b.resolve = d;
  b.reject = function(f) {
    return new b(function(h, k) {
      k(f);
    });
  };
  b.race = function(f) {
    return new b(function(h, k) {
      for (var l = y(f), m = l.next(); !m.done; m = l.next()) {
        d(m.value).V(h, k);
      }
    });
  };
  b.all = function(f) {
    var h = y(f), k = h.next();
    return k.done ? d([]) : new b(function(l, m) {
      function n(r) {
        return function(u) {
          p[r] = u;
          q--;
          0 == q && l(p);
        };
      }
      var p = [], q = 0;
      do {
        p.push(void 0), q++, d(k.value).V(n(p.length - 1), m), k = h.next();
      } while (!k.done);
    });
  };
  return b;
});
function va(a, b) {
  a instanceof String && (a += "");
  var c = 0, d = !1, e = {next:function() {
    if (!d && c < a.length) {
      var g = c++;
      return {value:b(g, a[g]), done:!1};
    }
    d = !0;
    return {done:!0, value:void 0};
  }};
  e[Symbol.iterator] = function() {
    return e;
  };
  return e;
}
E("Array.prototype.values", function(a) {
  return a ? a : function() {
    return va(this, function(b, c) {
      return c;
    });
  };
});
function H(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
E("WeakMap", function(a) {
  function b(k) {
    this.h = (h += Math.random() + 1).toString();
    if (k) {
      k = y(k);
      for (var l; !(l = k.next()).done;) {
        l = l.value, this.set(l[0], l[1]);
      }
    }
  }
  function c() {
  }
  function d(k) {
    var l = typeof k;
    return "object" === l && null !== k || "function" === l;
  }
  function e(k) {
    if (!H(k, f)) {
      var l = new c();
      ba(k, f, {value:l});
    }
  }
  function g(k) {
    var l = Object[k];
    l && (Object[k] = function(m) {
      if (m instanceof c) {
        return m;
      }
      Object.isExtensible(m) && e(m);
      return l(m);
    });
  }
  if (function() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var k = Object.seal({}), l = Object.seal({}), m = new a([[k, 2], [l, 3]]);
      if (2 != m.get(k) || 3 != m.get(l)) {
        return !1;
      }
      m.delete(k);
      m.set(l, 4);
      return !m.has(k) && 4 == m.get(l);
    } catch (n) {
      return !1;
    }
  }()) {
    return a;
  }
  var f = "$jscomp_hidden_" + Math.random();
  g("freeze");
  g("preventExtensions");
  g("seal");
  var h = 0;
  b.prototype.set = function(k, l) {
    if (!d(k)) {
      throw Error("Invalid WeakMap key");
    }
    e(k);
    if (!H(k, f)) {
      throw Error("WeakMap key fail: " + k);
    }
    k[f][this.h] = l;
    return this;
  };
  b.prototype.get = function(k) {
    return d(k) && H(k, f) ? k[f][this.h] : void 0;
  };
  b.prototype.has = function(k) {
    return d(k) && H(k, f) && H(k[f], this.h);
  };
  b.prototype.delete = function(k) {
    return d(k) && H(k, f) && H(k[f], this.h) ? delete k[f][this.h] : !1;
  };
  return b;
});
E("Map", function(a) {
  function b() {
    var h = {};
    return h.K = h.next = h.head = h;
  }
  function c(h, k) {
    var l = h[1];
    return ua(function() {
      if (l) {
        for (; l.head != h[1];) {
          l = l.K;
        }
        for (; l.next != l.head;) {
          return l = l.next, {done:!1, value:k(l)};
        }
        l = null;
      }
      return {done:!0, value:void 0};
    });
  }
  function d(h, k) {
    var l = k && typeof k;
    "object" == l || "function" == l ? g.has(k) ? l = g.get(k) : (l = "" + ++f, g.set(k, l)) : l = "p_" + k;
    var m = h[0][l];
    if (m && H(h[0], l)) {
      for (h = 0; h < m.length; h++) {
        var n = m[h];
        if (k !== k && n.key !== n.key || k === n.key) {
          return {id:l, list:m, index:h, D:n};
        }
      }
    }
    return {id:l, list:m, index:-1, D:void 0};
  }
  function e(h) {
    this[0] = {};
    this[1] = b();
    this.size = 0;
    if (h) {
      h = y(h);
      for (var k; !(k = h.next()).done;) {
        k = k.value, this.set(k[0], k[1]);
      }
    }
  }
  if (function() {
    if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var h = Object.seal({x:4}), k = new a(y([[h, "s"]]));
      if ("s" != k.get(h) || 1 != k.size || k.get({x:4}) || k.set({x:4}, "t") != k || 2 != k.size) {
        return !1;
      }
      var l = k.entries(), m = l.next();
      if (m.done || m.value[0] != h || "s" != m.value[1]) {
        return !1;
      }
      m = l.next();
      return m.done || 4 != m.value[0].x || "t" != m.value[1] || !l.next().done ? !1 : !0;
    } catch (n) {
      return !1;
    }
  }()) {
    return a;
  }
  var g = new WeakMap();
  e.prototype.set = function(h, k) {
    h = 0 === h ? 0 : h;
    var l = d(this, h);
    l.list || (l.list = this[0][l.id] = []);
    l.D ? l.D.value = k : (l.D = {next:this[1], K:this[1].K, head:this[1], key:h, value:k}, l.list.push(l.D), this[1].K.next = l.D, this[1].K = l.D, this.size++);
    return this;
  };
  e.prototype.delete = function(h) {
    h = d(this, h);
    return h.D && h.list ? (h.list.splice(h.index, 1), h.list.length || delete this[0][h.id], h.D.K.next = h.D.next, h.D.next.K = h.D.K, h.D.head = null, this.size--, !0) : !1;
  };
  e.prototype.clear = function() {
    this[0] = {};
    this[1] = this[1].K = b();
    this.size = 0;
  };
  e.prototype.has = function(h) {
    return !!d(this, h).D;
  };
  e.prototype.get = function(h) {
    return (h = d(this, h).D) && h.value;
  };
  e.prototype.entries = function() {
    return c(this, function(h) {
      return [h.key, h.value];
    });
  };
  e.prototype.keys = function() {
    return c(this, function(h) {
      return h.key;
    });
  };
  e.prototype.values = function() {
    return c(this, function(h) {
      return h.value;
    });
  };
  e.prototype.forEach = function(h, k) {
    for (var l = this.entries(), m; !(m = l.next()).done;) {
      m = m.value, h.call(k, m[1], m[0], this);
    }
  };
  e.prototype[Symbol.iterator] = e.prototype.entries;
  var f = 0;
  return e;
});
E("Array.prototype.keys", function(a) {
  return a ? a : function() {
    return va(this, function(b) {
      return b;
    });
  };
});
E("Set", function(a) {
  function b(c) {
    this.h = new Map();
    if (c) {
      c = y(c);
      for (var d; !(d = c.next()).done;) {
        this.add(d.value);
      }
    }
    this.size = this.h.size;
  }
  if (function() {
    if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({x:4}), d = new a(y([c]));
      if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({x:4}) != d || 2 != d.size) {
        return !1;
      }
      var e = d.entries(), g = e.next();
      if (g.done || g.value[0] != c || g.value[1] != c) {
        return !1;
      }
      g = e.next();
      return g.done || g.value[0] == c || 4 != g.value[0].x || g.value[1] != g.value[0] ? !1 : e.next().done;
    } catch (f) {
      return !1;
    }
  }()) {
    return a;
  }
  b.prototype.add = function(c) {
    c = 0 === c ? 0 : c;
    this.h.set(c, c);
    this.size = this.h.size;
    return this;
  };
  b.prototype.delete = function(c) {
    c = this.h.delete(c);
    this.size = this.h.size;
    return c;
  };
  b.prototype.clear = function() {
    this.h.clear();
    this.size = 0;
  };
  b.prototype.has = function(c) {
    return this.h.has(c);
  };
  b.prototype.entries = function() {
    return this.h.entries();
  };
  b.prototype.values = function() {
    return this.h.values();
  };
  b.prototype.keys = b.prototype.values;
  b.prototype[Symbol.iterator] = b.prototype.values;
  b.prototype.forEach = function(c, d) {
    var e = this;
    this.h.forEach(function(g) {
      return c.call(d, g, g, e);
    });
  };
  return b;
});
E("Array.prototype.entries", function(a) {
  return a ? a : function() {
    return va(this, function(b, c) {
      return [b, c];
    });
  };
});
E("Object.is", function(a) {
  return a ? a : function(b, c) {
    return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
  };
});
E("Array.prototype.includes", function(a) {
  return a ? a : function(b, c) {
    var d = this;
    d instanceof String && (d = String(d));
    var e = d.length;
    c = c || 0;
    for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
      var g = d[c];
      if (g === b || Object.is(g, b)) {
        return !0;
      }
    }
    return !1;
  };
});
E("String.prototype.includes", function(a) {
  return a ? a : function(b, c) {
    if (null == this) {
      throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");
    }
    if (b instanceof RegExp) {
      throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
    }
    return -1 !== this.indexOf(b, c || 0);
  };
});
var wa = "function" == typeof Object.assign ? Object.assign : function(a, b) {
  for (var c = 1; c < arguments.length; c++) {
    var d = arguments[c];
    if (d) {
      for (var e in d) {
        H(d, e) && (a[e] = d[e]);
      }
    }
  }
  return a;
};
E("Object.assign", function(a) {
  return a || wa;
});
E("Array.prototype.flat", function(a) {
  return a ? a : function(b) {
    b = void 0 === b ? 1 : b;
    var c = [];
    Array.prototype.forEach.call(this, function(d) {
      Array.isArray(d) && 0 < b ? (d = Array.prototype.flat.call(d, b - 1), c.push.apply(c, d)) : c.push(d);
    });
    return c;
  };
});
function I(a, b, c) {
  var d = typeof c, e = typeof a;
  if ("undefined" !== d) {
    if ("undefined" !== e) {
      if (c) {
        if ("function" === e && d === e) {
          return function(g) {
            return a(c(g));
          };
        }
        b = a.constructor;
        if (b === c.constructor) {
          if (b === Array) {
            return c.concat(a);
          }
          if (b === Map) {
            b = new Map(c);
            d = y(a);
            for (e = d.next(); !e.done; e = d.next()) {
              e = e.value, b.set(e[0], e[1]);
            }
            return b;
          }
          if (b === Set) {
            b = new Set(c);
            d = y(a.values());
            for (e = d.next(); !e.done; e = d.next()) {
              b.add(e.value);
            }
            return b;
          }
        }
      }
      return a;
    }
    return c;
  }
  return "undefined" === e ? b : a;
}
function J() {
  return Object.create(null);
}
function xa(a, b) {
  return b.length - a.length;
}
function K(a) {
  return "string" === typeof a;
}
function M(a) {
  return "object" === typeof a;
}
function ya(a) {
  var b = [];
  a = y(a.keys());
  for (var c = a.next(); !c.done; c = a.next()) {
    b.push(c.value);
  }
  return b;
}
function za(a, b) {
  if (K(b)) {
    a = a[b];
  } else {
    for (var c = 0; a && c < b.length; c++) {
      a = a[b[c]];
    }
  }
  return a;
}
function Aa(a) {
  for (var b = 0, c = 0, d = void 0; c < a.length; c++) {
    (d = a[c]) && b < d.length && (b = d.length);
  }
  return b;
}
;var Ba = [["\u00aa", "a"], ["\u00b2", "2"], ["\u00b3", "3"], ["\u00b9", "1"], ["\u00ba", "o"], ["\u00bc", "1\u20444"], ["\u00bd", "1\u20442"], ["\u00be", "3\u20444"], ["\u00e0", "a"], ["\u00e1", "a"], ["\u00e2", "a"], ["\u00e3", "a"], ["\u00e4", "a"], ["\u00e5", "a"], ["\u00e7", "c"], ["\u00e8", "e"], ["\u00e9", "e"], ["\u00ea", "e"], ["\u00eb", "e"], ["\u00ec", "i"], ["\u00ed", "i"], ["\u00ee", "i"], ["\u00ef", "i"], ["\u00f1", "n"], ["\u00f2", "o"], ["\u00f3", "o"], ["\u00f4", "o"], ["\u00f5", 
"o"], ["\u00f6", "o"], ["\u00f9", "u"], ["\u00fa", "u"], ["\u00fb", "u"], ["\u00fc", "u"], ["\u00fd", "y"], ["\u00ff", "y"], ["\u0101", "a"], ["\u0103", "a"], ["\u0105", "a"], ["\u0107", "c"], ["\u0109", "c"], ["\u010b", "c"], ["\u010d", "c"], ["\u010f", "d"], ["\u0113", "e"], ["\u0115", "e"], ["\u0117", "e"], ["\u0119", "e"], ["\u011b", "e"], ["\u011d", "g"], ["\u011f", "g"], ["\u0121", "g"], ["\u0123", "g"], ["\u0125", "h"], ["\u0129", "i"], ["\u012b", "i"], ["\u012d", "i"], ["\u012f", "i"], ["\u0133", 
"ij"], ["\u0135", "j"], ["\u0137", "k"], ["\u013a", "l"], ["\u013c", "l"], ["\u013e", "l"], ["\u0140", "l"], ["\u0144", "n"], ["\u0146", "n"], ["\u0148", "n"], ["\u0149", "n"], ["\u014d", "o"], ["\u014f", "o"], ["\u0151", "o"], ["\u0155", "r"], ["\u0157", "r"], ["\u0159", "r"], ["\u015b", "s"], ["\u015d", "s"], ["\u015f", "s"], ["\u0161", "s"], ["\u0163", "t"], ["\u0165", "t"], ["\u0169", "u"], ["\u016b", "u"], ["\u016d", "u"], ["\u016f", "u"], ["\u0171", "u"], ["\u0173", "u"], ["\u0175", "w"], ["\u0177", 
"y"], ["\u017a", "z"], ["\u017c", "z"], ["\u017e", "z"], ["\u017f", "s"], ["\u01a1", "o"], ["\u01b0", "u"], ["\u01c6", "dz"], ["\u01c9", "lj"], ["\u01cc", "nj"], ["\u01ce", "a"], ["\u01d0", "i"], ["\u01d2", "o"], ["\u01d4", "u"], ["\u01d6", "u"], ["\u01d8", "u"], ["\u01da", "u"], ["\u01dc", "u"], ["\u01df", "a"], ["\u01e1", "a"], ["\u01e3", "ae"], ["\u00e6", "ae"], ["\u01fd", "ae"], ["\u01e7", "g"], ["\u01e9", "k"], ["\u01eb", "o"], ["\u01ed", "o"], ["\u01ef", "\u0292"], ["\u01f0", "j"], ["\u01f3", 
"dz"], ["\u01f5", "g"], ["\u01f9", "n"], ["\u01fb", "a"], ["\u01ff", "\u00f8"], ["\u0201", "a"], ["\u0203", "a"], ["\u0205", "e"], ["\u0207", "e"], ["\u0209", "i"], ["\u020b", "i"], ["\u020d", "o"], ["\u020f", "o"], ["\u0211", "r"], ["\u0213", "r"], ["\u0215", "u"], ["\u0217", "u"], ["\u0219", "s"], ["\u021b", "t"], ["\u021f", "h"], ["\u0227", "a"], ["\u0229", "e"], ["\u022b", "o"], ["\u022d", "o"], ["\u022f", "o"], ["\u0231", "o"], ["\u0233", "y"], ["\u02b0", "h"], ["\u02b1", "h"], ["\u0266", "h"], 
["\u02b2", "j"], ["\u02b3", "r"], ["\u02b4", "\u0279"], ["\u02b5", "\u027b"], ["\u02b6", "\u0281"], ["\u02b7", "w"], ["\u02b8", "y"], ["\u02e0", "\u0263"], ["\u02e1", "l"], ["\u02e2", "s"], ["\u02e3", "x"], ["\u02e4", "\u0295"], ["\u0390", "\u03b9"], ["\u03ac", "\u03b1"], ["\u03ad", "\u03b5"], ["\u03ae", "\u03b7"], ["\u03af", "\u03b9"], ["\u03b0", "\u03c5"], ["\u03ca", "\u03b9"], ["\u03cb", "\u03c5"], ["\u03cc", "\u03bf"], ["\u03cd", "\u03c5"], ["\u03ce", "\u03c9"], ["\u03d0", "\u03b2"], ["\u03d1", 
"\u03b8"], ["\u03d2", "\u03a5"], ["\u03d3", "\u03a5"], ["\u03d4", "\u03a5"], ["\u03d5", "\u03c6"], ["\u03d6", "\u03c0"], ["\u03f0", "\u03ba"], ["\u03f1", "\u03c1"], ["\u03f2", "\u03c2"], ["\u03f5", "\u03b5"], ["\u0439", "\u0438"], ["\u0450", "\u0435"], ["\u0451", "\u0435"], ["\u0453", "\u0433"], ["\u0457", "\u0456"], ["\u045c", "\u043a"], ["\u045d", "\u0438"], ["\u045e", "\u0443"], ["\u0477", "\u0475"], ["\u04c2", "\u0436"], ["\u04d1", "\u0430"], ["\u04d3", "\u0430"], ["\u04d7", "\u0435"], ["\u04db", 
"\u04d9"], ["\u04dd", "\u0436"], ["\u04df", "\u0437"], ["\u04e3", "\u0438"], ["\u04e5", "\u0438"], ["\u04e7", "\u043e"], ["\u04eb", "\u04e9"], ["\u04ed", "\u044d"], ["\u04ef", "\u0443"], ["\u04f1", "\u0443"], ["\u04f3", "\u0443"], ["\u04f5", "\u0447"]];
var Ca = /[^\p{L}\p{N}]+/u, Da = /(\d{3})/g, Fa = /(\D)(\d{3})/g, Ga = /(\d{3})(\D)/g, Ha = "".normalize && /[\u0300-\u036f]/g;
function N(a) {
  if (this.constructor !== N) {
    var b = Function.prototype.bind, c = b.apply, d = [null], e = d.concat;
    if (arguments instanceof Array) {
      var g = arguments;
    } else {
      g = y(arguments);
      for (var f, h = []; !(f = g.next()).done;) {
        h.push(f.value);
      }
      g = h;
    }
    return new (c.call(b, N, e.call(d, g)))();
  }
  for (b = 0; b < arguments.length; b++) {
    this.assign(arguments[b]);
  }
}
N.prototype.assign = function(a) {
  this.normalize = I(a.normalize, !0, this.normalize);
  var b = a.include, c = b || a.exclude || a.split;
  if ("object" === typeof c) {
    var d = !b, e = "";
    a.include || (e += "\\p{Z}");
    c.letter && (e += "\\p{L}");
    c.number && (e += "\\p{N}", d = !!b);
    c.symbol && (e += "\\p{S}");
    c.punctuation && (e += "\\p{P}");
    c.control && (e += "\\p{C}");
    if (c = c.char) {
      e += "object" === typeof c ? c.join("") : c;
    }
    try {
      this.split = new RegExp("[" + (b ? "^" : "") + e + "]+", "u");
    } catch (g) {
      this.split = /\s+/;
    }
    this.numeric = d;
  } else {
    try {
      this.split = I(c, Ca, this.split);
    } catch (g) {
      this.split = /\s+/;
    }
    this.numeric = I(this.numeric, !0);
  }
  this.prepare = I(a.prepare, null, this.prepare);
  this.finalize = I(a.finalize, null, this.finalize);
  Ha || (this.mapper = new Map(Ba));
  this.rtl = a.rtl || !1;
  this.dedupe = I(a.dedupe, !0, this.dedupe);
  this.filter = I((c = a.filter) && new Set(c), null, this.filter);
  this.matcher = I((c = a.matcher) && new Map(c), null, this.matcher);
  this.mapper = I((c = a.mapper) && new Map(c), null, this.mapper);
  this.stemmer = I((c = a.stemmer) && new Map(c), null, this.stemmer);
  this.replacer = I(a.replacer, null, this.replacer);
  this.minlength = I(a.minlength, 1, this.minlength);
  this.maxlength = I(a.maxlength, 0, this.maxlength);
  if (this.cache = c = I(a.cache, !0, this.cache)) {
    this.U = null, this.L = "number" === typeof c ? c : 2e5, this.N = new Map(), this.S = new Map(), this.A = this.h = 128;
  }
  this.B = "";
  this.F = null;
  this.C = "";
  this.G = null;
  if (this.matcher) {
    for (a = y(this.matcher.keys()), b = a.next(); !b.done; b = a.next()) {
      this.B += (this.B ? "|" : "") + b.value;
    }
  }
  if (this.stemmer) {
    for (a = y(this.stemmer.keys()), b = a.next(); !b.done; b = a.next()) {
      this.C += (this.C ? "|" : "") + b.value;
    }
  }
  return this;
};
N.prototype.encode = function(a) {
  var b = this;
  if (this.cache && a.length <= this.h) {
    if (this.U) {
      if (this.N.has(a)) {
        return this.N.get(a);
      }
    } else {
      this.U = setTimeout(Ia, 50, this);
    }
  }
  this.normalize && (a = "function" === typeof this.normalize ? this.normalize(a) : Ha ? a.normalize("NFKD").replace(Ha, "").toLowerCase() : a.toLowerCase());
  this.prepare && (a = this.prepare(a));
  this.numeric && 3 < a.length && (a = a.replace(Fa, "$1 $2").replace(Ga, "$1 $2").replace(Da, "$1 "));
  for (var c = !(this.dedupe || this.mapper || this.filter || this.matcher || this.stemmer || this.replacer), d = [], e = this.split || "" === this.split ? a.split(this.split) : a, g = 0, f = void 0, h = void 0; g < e.length; g++) {
    if ((f = h = e[g]) && !(f.length < this.minlength)) {
      if (c) {
        d.push(f);
      } else {
        if (!this.filter || !this.filter.has(f)) {
          if (this.cache && f.length <= this.A) {
            if (this.U) {
              var k = this.S.get(f);
              if (k || "" === k) {
                k && d.push(k);
                continue;
              }
            } else {
              this.U = setTimeout(Ia, 50, this);
            }
          }
          k = void 0;
          this.stemmer && 2 < f.length && (this.G || (this.G = new RegExp("(?!^)(" + this.C + ")$")), f = f.replace(this.G, function(q) {
            return b.stemmer.get(q);
          }), k = 1);
          f && k && (f.length < this.minlength || this.filter && this.filter.has(f)) && (f = "");
          if (f && (this.mapper || this.dedupe && 1 < f.length)) {
            k = "";
            for (var l = 0, m = "", n = void 0, p = void 0; l < f.length; l++) {
              n = f.charAt(l), n === m && this.dedupe || ((p = this.mapper && this.mapper.get(n)) || "" === p ? p === m && this.dedupe || !(m = p) || (k += p) : k += m = n);
            }
            f = k;
          }
          this.matcher && 1 < f.length && (this.F || (this.F = new RegExp("(" + this.B + ")", "g")), f = f.replace(this.F, function(q) {
            return b.matcher.get(q);
          }));
          if (f && this.replacer) {
            for (k = 0; f && k < this.replacer.length; k += 2) {
              f = f.replace(this.replacer[k], this.replacer[k + 1]);
            }
          }
          this.cache && h.length <= this.A && (this.S.set(h, f), this.S.size > this.L && (this.S.clear(), this.A = this.A / 1.1 | 0));
          f && d.push(f);
        }
      }
    }
  }
  this.finalize && (d = this.finalize(d) || d);
  this.cache && a.length <= this.h && (this.N.set(a, d), this.N.size > this.L && (this.N.clear(), this.h = this.h / 1.1 | 0));
  return d;
};
function Ia(a) {
  a.U = null;
  a.N.clear();
  a.S.clear();
}
;function Ja(a) {
  var b, c, d, e, g, f, h, k;
  return ta(function(l) {
    a = a.data;
    b = self._index;
    c = a.args;
    d = a.task;
    switch(d) {
      case "init":
        e = a.options || {};
        (g = e.config) && (e = g);
        (f = a.factory) ? (Function("return " + f)()(self), self._index = new self.FlexSearch.Index(e), delete self.FlexSearch) : self._index = new O(e);
        postMessage({id:a.id});
        break;
      default:
        h = a.id, k = b[d].apply(b, c), postMessage("search" === d ? {id:h, msg:k} : {id:h});
    }
    l.h = 0;
  });
}
;var Ka = 0;
function R(a) {
  function b(f) {
    function h(k) {
      k = k.data || k;
      var l = k.id, m = l && e.h[l];
      m && (m(k.msg), delete e.h[l]);
    }
    this.worker = f;
    this.h = J();
    if (this.worker) {
      d ? this.worker.on("message", h) : this.worker.onmessage = h;
      if (a.config) {
        return new Promise(function(k) {
          e.h[++Ka] = function() {
            k(e);
          };
          e.worker.postMessage({id:Ka, task:"init", factory:c, options:a});
        });
      }
      this.worker.postMessage({task:"init", factory:c, options:a});
      return this;
    }
  }
  a = void 0 === a ? {} : a;
  if (this.constructor !== R) {
    return new R(a);
  }
  var c = "undefined" !== typeof self ? self._factory : "undefined" !== typeof window ? window._factory : null;
  c && (c = c.toString());
  var d = "undefined" === typeof window, e = this, g = La(c, d, a.worker);
  return g.then ? g.then(function(f) {
    return b.call(e, f);
  }) : b.call(this, g);
}
Ma("add");
Ma("append");
Ma("search");
Ma("update");
Ma("remove");
function Ma(a) {
  R.prototype[a] = R.prototype[a + "Async"] = function() {
    var b = this, c = arguments, d, e, g, f, h;
    return ta(function(k) {
      d = b;
      e = [].slice.call(c);
      g = e[e.length - 1];
      "function" === typeof g && (f = g, e.splice(e.length - 1, 1));
      h = new Promise(function(l) {
        d.h[++Ka] = l;
        d.worker.postMessage({task:a, id:Ka, args:e});
      });
      return f ? (h.then(f), k.return(b)) : k.return(h);
    });
  };
}
function La(a, b, c) {
  return b ? "undefined" !== typeof module ? new (require("worker_threads")["Worker"])(__dirname + "/node/node.js") : import("worker_threads").then(function(worker){ return new worker["Worker"]((1,eval)("import.meta.dirname") + "/node/node.mjs"); }) : a ? new window.Worker(URL.createObjectURL(new Blob(["onmessage=" + Ja.toString()], {type:"text/javascript"}))) : new window.Worker(K(c) ? c : (0,eval)("import.meta.url").replace("/worker.js", "/worker/worker.js").replace("flexsearch.bundle.module.min.js", 
  "module/worker/worker.js"), {type:"module"});
}
;function Na(a) {
  Oa.call(a, "add");
  Oa.call(a, "append");
  Oa.call(a, "search");
  Oa.call(a, "update");
  Oa.call(a, "remove");
}
function Oa(a) {
  this[a + "Async"] = function() {
    var b = arguments, c = b[b.length - 1];
    if ("function" === typeof c) {
      var d = c;
      delete b[b.length - 1];
    }
    b = this[a].apply(this, b);
    d && (b.then ? b.then(d) : d(b));
    return b;
  };
}
;function Pa(a) {
  var b = [];
  a = y(a.entries());
  for (var c = a.next(); !c.done; c = a.next()) {
    b.push(c.value);
  }
  return b;
}
function Qa(a) {
  var b = [];
  a = y(a.entries());
  for (var c = a.next(); !c.done; c = a.next()) {
    b.push(Pa(c.value));
  }
  return b;
}
function Ra(a) {
  var b = [];
  a = y(a.keys());
  for (var c = a.next(); !c.done; c = a.next()) {
    b.push(c.value);
  }
  return b;
}
function Sa(a, b, c, d, e, g) {
  if ((c = a(b ? b + "." + c : c, JSON.stringify(g))) && c.then) {
    var f = this;
    return c.then(function() {
      return f.export(a, b, d, e + 1);
    });
  }
  return this.export(a, b, d, e + 1);
}
;function Ta(a, b, c, d) {
  for (var e = [], g = 0, f; g < a.index.length; g++) {
    if (f = a.index[g], b >= f.length) {
      b -= f.length;
    } else {
      b = f[d ? "splice" : "slice"](b, c);
      if (f = b.length) {
        if (e = e.length ? e.concat(b) : b, c -= f, d && (a.length -= f), !c) {
          break;
        }
      }
      b = 0;
    }
  }
  return e;
}
function S(a) {
  if (!this) {
    return new S(a);
  }
  this.index = a ? [a] : [];
  this.length = a ? a.length : 0;
  var b = this;
  return new Proxy([], {get:function(c, d) {
    if ("length" === d) {
      return b.length;
    }
    if ("push" === d) {
      return function(e) {
        b.index[b.index.length - 1].push(e);
        b.length++;
      };
    }
    if ("pop" === d) {
      return function() {
        if (b.length) {
          return b.length--, b.index[b.index.length - 1].pop();
        }
      };
    }
    if ("indexOf" === d) {
      return function(e) {
        for (var g = 0, f = 0, h, k; f < b.index.length; f++) {
          h = b.index[f];
          k = h.indexOf(e);
          if (0 <= k) {
            return g + k;
          }
          g += h.length;
        }
        return -1;
      };
    }
    if ("includes" === d) {
      return function(e) {
        for (var g = 0; g < b.index.length; g++) {
          if (b.index[g].includes(e)) {
            return !0;
          }
        }
        return !1;
      };
    }
    if ("slice" === d) {
      return function(e, g) {
        return Ta(b, e || 0, g || b.length, !1);
      };
    }
    if ("splice" === d) {
      return function(e, g) {
        return Ta(b, e || 0, g || b.length, !0);
      };
    }
    if ("constructor" === d) {
      return Array;
    }
    if ("symbol" !== typeof d) {
      return (c = b.index[d / Math.pow(2, 31) | 0]) && c[d];
    }
  }, set:function(c, d, e) {
    c = d / Math.pow(2, 31) | 0;
    (b.index[c] || (b.index[c] = []))[d] = e;
    b.length++;
    return !0;
  }});
}
S.prototype.clear = function() {
  this.index.length = 0;
};
S.prototype.destroy = function() {
  this.proxy = this.index = null;
};
S.prototype.push = function() {
};
function T(a) {
  a = void 0 === a ? 8 : a;
  if (!this) {
    return new T(a);
  }
  this.index = J();
  this.B = [];
  this.size = 0;
  32 < a ? (this.h = Ua, this.A = BigInt(a)) : (this.h = Va, this.A = a);
}
T.prototype.get = function(a) {
  var b = this.h(a);
  return (b = this.index[b]) && b.get(a);
};
T.prototype.set = function(a, b) {
  var c = this.h(a), d = this.index[c];
  d ? (c = d.size, d.set(a, b), (c -= d.size) && this.size++) : (this.index[c] = d = new Map([[a, b]]), this.B.push(d));
};
function U(a) {
  a = void 0 === a ? 8 : a;
  if (!this) {
    return new U(a);
  }
  this.index = J();
  this.h = [];
  32 < a ? (this.B = Ua, this.A = BigInt(a)) : (this.B = Va, this.A = a);
}
U.prototype.add = function(a) {
  var b = this.B(a), c = this.index[b];
  c ? (b = c.size, c.add(a), (b -= c.size) && this.size++) : (this.index[b] = c = new Set([a]), this.h.push(c));
};
v = T.prototype;
v.has = U.prototype.has = function(a) {
  var b = this.B(a);
  return (b = this.index[b]) && b.has(a);
};
v.delete = U.prototype.delete = function(a) {
  var b = this.B(a);
  (b = this.index[b]) && b.delete(a) && this.size--;
};
v.clear = U.prototype.clear = function() {
  this.index = J();
  this.h = [];
  this.size = 0;
};
v.values = U.prototype.values = function Wa() {
  var b, c = this, d, e, g;
  return ra(Wa, function(f) {
    switch(f.h) {
      case 1:
        b = 0;
      case 2:
        if (!(b < c.h.length)) {
          f.h = 0;
          break;
        }
        d = y(c.h[b].values());
        e = d.next();
      case 5:
        if (e.done) {
          b++;
          f.h = 2;
          break;
        }
        g = e.value;
        return G(f, g, 6);
      case 6:
        e = d.next(), f.h = 5;
    }
  });
};
v.keys = U.prototype.keys = function Xa() {
  var b, c = this, d, e, g;
  return ra(Xa, function(f) {
    switch(f.h) {
      case 1:
        b = 0;
      case 2:
        if (!(b < c.h.length)) {
          f.h = 0;
          break;
        }
        d = y(c.h[b].keys());
        e = d.next();
      case 5:
        if (e.done) {
          b++;
          f.h = 2;
          break;
        }
        g = e.value;
        return G(f, g, 6);
      case 6:
        e = d.next(), f.h = 5;
    }
  });
};
v.entries = U.prototype.entries = function Ya() {
  var b, c = this, d, e, g;
  return ra(Ya, function(f) {
    switch(f.h) {
      case 1:
        b = 0;
      case 2:
        if (!(b < c.h.length)) {
          f.h = 0;
          break;
        }
        d = y(c.h[b].entries());
        e = d.next();
      case 5:
        if (e.done) {
          b++;
          f.h = 2;
          break;
        }
        g = e.value;
        return G(f, g, 6);
      case 6:
        e = d.next(), f.h = 5;
    }
  });
};
function Va(a) {
  var b = Math.pow(2, this.A) - 1;
  if ("number" == typeof a) {
    return a & b;
  }
  for (var c = 0, d = this.A + 1, e = 0; e < a.length; e++) {
    c = (c * d ^ a.charCodeAt(e)) & b;
  }
  return 32 === this.A ? c + Math.pow(2, 31) : c;
}
function Ua() {
  throw Error("The keystore is limited to 32 for EcmaScript5");
}
;V.prototype.add = function(a, b, c) {
  M(a) && (b = a, a = za(b, this.key));
  if (b && (a || 0 === a)) {
    if (!c && this.reg.has(a)) {
      return this.update(a, b);
    }
    for (var d = 0, e; d < this.field.length; d++) {
      e = this.I[d];
      var g = this.index.get(this.field[d]);
      if ("function" === typeof e) {
        (e = e(b)) && g.add(a, e, !1, !0);
      } else {
        var f = e.R;
        if (!f || f(b)) {
          e.constructor === String ? e = ["" + e] : K(e) && (e = [e]), Za(b, e, this.T, 0, g, a, e[0], c);
        }
      }
    }
    if (this.tag) {
      for (d = 0; d < this.M.length; d++) {
        f = this.M[d];
        var h = this.$[d];
        g = this.tag.get(h);
        e = J();
        if ("function" === typeof f) {
          if (f = f(b), !f) {
            continue;
          }
        } else {
          var k = f.R;
          if (k && !k(b)) {
            continue;
          }
          f.constructor === String && (f = "" + f);
          f = za(b, f);
        }
        if (g && f) {
          for (K(f) && (f = [f]), h = 0, k = void 0; h < f.length; h++) {
            var l = f[h];
            if (!e[l]) {
              e[l] = 1;
              var m;
              (m = g.get(l)) ? k = m : g.set(l, k = []);
              if (!c || !k.includes(a)) {
                if (k.length === Math.pow(2, 31) - 1) {
                  m = new S(k);
                  if (this.fastupdate) {
                    for (var n = y(this.reg.values()), p = n.next(); !p.done; p = n.next()) {
                      p = p.value, p.includes(k) && (p[p.indexOf(k)] = m);
                    }
                  }
                  g.set(l, k = m);
                }
                k.push(a);
                this.fastupdate && ((l = this.reg.get(a)) ? l.push(k) : this.reg.set(a, [k]));
              }
            }
          }
        } else {
          g || console.warn("Tag '" + h + "' was not found");
        }
      }
    }
    if (this.store && (!c || !this.store.has(a))) {
      if (this.H) {
        var q = J();
        for (c = 0; c < this.H.length; c++) {
          if (d = this.H[c], g = d.R, !g || g(b)) {
            g = void 0;
            if ("function" === typeof d) {
              g = d(b);
              if (!g) {
                continue;
              }
              d = [d.la];
            } else if (K(d) || d.constructor === String) {
              q[d] = b[d];
              continue;
            }
            $a(b, q, d, 0, d[0], g);
          }
        }
      }
      this.store.set(a, q || b);
    }
  }
  return this;
};
function $a(a, b, c, d, e, g) {
  a = a[e];
  if (d === c.length - 1) {
    b[e] = g || a;
  } else if (a) {
    if (a.constructor === Array) {
      for (b = b[e] = Array(a.length), e = 0; e < a.length; e++) {
        $a(a, b, c, d, e);
      }
    } else {
      b = b[e] || (b[e] = J()), e = c[++d], $a(a, b, c, d, e);
    }
  }
}
function Za(a, b, c, d, e, g, f, h) {
  if (a = a[f]) {
    if (d === b.length - 1) {
      if (a.constructor === Array) {
        if (c[d]) {
          for (b = 0; b < a.length; b++) {
            e.add(g, a[b], !0, !0);
          }
          return;
        }
        a = a.join(" ");
      }
      e.add(g, a, h, !0);
    } else {
      if (a.constructor === Array) {
        for (f = 0; f < a.length; f++) {
          Za(a, b, c, d, e, g, f, h);
        }
      } else {
        f = b[++d], Za(a, b, c, d, e, g, f, h);
      }
    }
  } else {
    e.db && e.remove(g);
  }
}
;function ab(a, b, c, d, e, g, f) {
  var h = a.length, k = [], l;
  var m = J();
  for (var n = 0, p = void 0, q; n < b; n++) {
    for (var r = 0; r < h; r++) {
      if (q = a[r], n < q.length && (p = q[n])) {
        for (var u = 0; u < p.length; u++) {
          q = p[u];
          (l = m[q]) ? m[q]++ : (l = 0, m[q] = 1);
          l = k[l] || (k[l] = []);
          if (!f) {
            var w = n + (r ? 0 : g || 0);
            l = l[w] || (l[w] = []);
          }
          l.push(q);
        }
      }
    }
  }
  if (a = k.length) {
    if (e) {
      k = 1 < k.length ? bb(k, d, c, f, 0) : (k = k[0]).length > c || d ? k.slice(d, c + d) : k;
    } else {
      if (a < h) {
        return [];
      }
      k = k[a - 1];
      if (c || d) {
        if (f) {
          if (k.length > c || d) {
            k = k.slice(d, c + d);
          }
        } else {
          e = [];
          for (f = 0; f < k.length; f++) {
            if (h = k[f], h.length > d) {
              d -= h.length;
            } else {
              if (h.length > c || d) {
                h = h.slice(d, c + d), c -= h.length, d && (d -= h.length);
              }
              e.push(h);
              if (!c) {
                break;
              }
            }
          }
          k = 1 < e.length ? [].concat.apply([], e) : e[0];
        }
      }
    }
  }
  return k;
}
function bb(a, b, c, d, e) {
  var g = [], f = J(), h = a.length, k = 0;
  if (d) {
    for (e = h - 1; 0 <= e; e--) {
      d = a[e];
      var l = d.length;
      for (h = 0; h < l; h++) {
        var m = d[h];
        if (!f[m]) {
          if (f[m] = 1, b) {
            b--;
          } else {
            if (g.push(m), g.length === c) {
              return g;
            }
          }
        }
      }
    }
  } else {
    for (var n = Aa(a), p = 0; p < n; p++) {
      for (var q = h - 1; 0 <= q; q--) {
        if (l = (d = a[q][p]) && d.length) {
          for (var r = 0; r < l; r++) {
            if (m = d[r], !f[m]) {
              if (f[m] = 1, b) {
                b--;
              } else {
                var u = p + (q < h - 1 ? e || 0 : 0);
                (g[u] || (g[u] = [])).push(m);
                if (++k === c) {
                  return g;
                }
              }
            }
          }
        }
      }
    }
  }
  return g;
}
function cb(a, b) {
  for (var c = J(), d = [], e = 0, g; e < b.length; e++) {
    g = b[e];
    for (var f = 0; f < g.length; f++) {
      c[g[f]] = 1;
    }
  }
  for (b = 0; b < a.length; b++) {
    e = a[b], 1 === c[e] && (d.push(e), c[e] = 2);
  }
  return d;
}
;V.prototype.search = function(a, b, c, d) {
  c || (!b && M(a) ? (c = a, a = "") : M(b) && (c = b, b = 0));
  var e = [], g = [], f = 0;
  if (c) {
    c.constructor === Array && (c = {index:c});
    a = c.query || a;
    var h = c.pluck;
    var k = c.merge;
    var l = h || c.field || c.index;
    var m = this.tag && c.tag;
    var n = this.store && c.enrich;
    var p = c.suggest;
    var q = c.na;
    b = c.limit || b;
    var r = c.offset || 0;
    b || (b = 100);
    if (m && (!this.db || !d)) {
      m.constructor !== Array && (m = [m]);
      for (var u = [], w = 0, x = void 0; w < m.length; w++) {
        x = m[w];
        if (K(x)) {
          throw Error("A tag option can't be a string, instead it needs a { field: tag } format.");
        }
        if (x.field && x.tag) {
          var t = x.tag;
          if (t.constructor === Array) {
            for (var z = 0; z < t.length; z++) {
              u.push(x.field, t[z]);
            }
          } else {
            u.push(x.field, t);
          }
        } else {
          t = Object.keys(x);
          z = 0;
          for (var A = void 0, B = void 0; z < t.length; z++) {
            if (A = t[z], B = x[A], B.constructor === Array) {
              for (var D = 0; D < B.length; D++) {
                u.push(A, B[D]);
              }
            } else {
              u.push(A, B);
            }
          }
        }
      }
      if (!u.length) {
        throw Error("Your tag definition within the search options is probably wrong. No valid tags found.");
      }
      m = u;
      if (!a) {
        g = [];
        if (u.length) {
          for (h = 0; h < u.length; h += 2) {
            p = void 0;
            if (this.db) {
              p = this.index.get(u[h]);
              if (!p) {
                console.warn("Tag '" + u[h] + ":" + u[h + 1] + "' will be skipped because there is no field '" + u[h] + "'.");
                continue;
              }
              g.push(p = p.db.tag(u[h + 1], b, r, n));
            } else {
              p = db.call(this, u[h], u[h + 1], b, r, n);
            }
            e.push({field:u[h], tag:u[h + 1], result:p});
          }
        }
        return g.length ? Promise.all(g).then(function(P) {
          for (var Q = 0; Q < P.length; Q++) {
            e[Q].result = P[Q];
          }
          return e;
        }) : e;
      }
    }
    K(l) && (l = [l]);
  }
  l || (l = this.field);
  u = !d && (this.worker || this.db) && [];
  w = 0;
  for (z = x = t = void 0; w < l.length; w++) {
    if (x = l[w], !this.db || !this.tag || this.I[w]) {
      t = void 0;
      K(x) || (t = x, x = t.field, a = t.query || a, b = t.limit || b, r = t.offset || r, p = t.suggest || p, n = this.store && (t.enrich || n));
      if (d) {
        t = d[w];
      } else {
        z = t || c;
        t = this.index.get(x);
        if (m) {
          if (this.db) {
            z.tag = m;
            var F = t.db.support_tag_search;
            z.field = l;
          }
          F || (z.enrich = !1);
        }
        if (u) {
          u[w] = t.search(a, b, z);
          z && n && (z.enrich = n);
          continue;
        } else {
          t = t.search(a, b, z), z && n && (z.enrich = n);
        }
      }
      z = t && t.length;
      if (m && z) {
        A = [];
        B = 0;
        if (this.db && d) {
          if (!F) {
            for (D = l.length; D < d.length; D++) {
              var L = d[D];
              if (L && L.length) {
                B++, A.push(L);
              } else if (!p) {
                return e;
              }
            }
          }
        } else {
          D = 0;
          for (var Lb = L = void 0; D < m.length; D += 2) {
            L = this.tag.get(m[D]);
            if (!L) {
              if (console.warn("Tag '" + m[D] + ":" + m[D + 1] + "' will be skipped because there is no field '" + m[D] + "'."), p) {
                continue;
              } else {
                return e;
              }
            }
            if (Lb = (L = L && L.get(m[D + 1])) && L.length) {
              B++, A.push(L);
            } else if (!p) {
              return e;
            }
          }
        }
        if (B) {
          t = cb(t, A);
          z = t.length;
          if (!z && !p) {
            return e;
          }
          B--;
        }
      }
      if (z) {
        g[f] = x, e.push(t), f++;
      } else if (1 === l.length) {
        return e;
      }
    }
  }
  if (u) {
    if (this.db && m && m.length && !F) {
      for (n = 0; n < m.length; n += 2) {
        g = this.index.get(m[n]);
        if (!g) {
          if (console.warn("Tag '" + m[n] + ":" + m[n + 1] + "' was not found because there is no field '" + m[n] + "'."), p) {
            continue;
          } else {
            return e;
          }
        }
        u.push(g.db.tag(m[n + 1], b, r, !1));
      }
    }
    var Mb = this;
    return Promise.all(u).then(function(P) {
      return P.length ? Mb.search(a, b, c, P) : P;
    });
  }
  if (!f) {
    return e;
  }
  if (h && (!n || !this.store)) {
    return e[0];
  }
  u = [];
  r = 0;
  for (p = void 0; r < g.length; r++) {
    p = e[r];
    n && p.length && !p[0].doc && (this.db ? u.push(p = this.index.get(this.field[0]).db.enrich(p)) : p.length && (p = eb.call(this, p)));
    if (h) {
      return p;
    }
    e[r] = {field:g[r], result:p};
  }
  if (n && this.db && u.length) {
    var Ea = this;
    return Promise.all(u).then(function(P) {
      for (var Q = 0; Q < P.length; Q++) {
        e[Q].result = P[Q];
      }
      return k ? fb(e, b) : q ? gb(e, a, Ea.index, Ea.field, Ea.I, q) : e;
    });
  }
  return k ? fb(e, b) : q ? gb(e, a, this.index, this.field, this.I, q) : e;
};
function gb(a, b, c, d, e, g) {
  for (var f, h, k, l = 0, m, n, p; l < a.length; l++) {
    for (m = a[l].result, n = a[l].field, k = c.get(n), p = k.encoder, k = k.tokenize, n = e[d.indexOf(n)], p !== f && (f = p, h = f.encode(b)), p = 0; p < m.length; p++) {
      var q = "", r = za(m[p].doc, n), u = f.encode(r);
      r = r.split(f.split);
      for (var w = 0, x, t; w < u.length; w++) {
        x = u[w];
        t = r[w];
        for (var z = void 0, A = 0, B; A < h.length; A++) {
          if (B = h[A], "strict" === k) {
            if (x === B) {
              q += (q ? " " : "") + g.replace("$1", t);
              z = !0;
              break;
            }
          } else {
            var D = x.indexOf(B);
            if (-1 < D) {
              q += (q ? " " : "") + t.substring(0, D) + g.replace("$1", t.substring(D, B.length)) + t.substring(D + B.length);
              z = !0;
              break;
            }
          }
        }
        z || (q += (q ? " " : "") + r[w]);
      }
      m[p].na = q;
    }
  }
  return a;
}
function fb(a, b) {
  for (var c = [], d = J(), e = 0, g, f; e < a.length; e++) {
    g = a[e];
    f = g.result;
    for (var h = 0, k, l, m; h < f.length; h++) {
      if (l = f[h], k = l.id, m = d[k]) {
        m.push(g.field);
      } else {
        if (c.length === b) {
          return c;
        }
        l.field = d[k] = [g.field];
        c.push(l);
      }
    }
  }
  return c;
}
function db(a, b, c, d, e) {
  var g = this.tag.get(a);
  if (!g) {
    return console.warn("Tag '" + a + "' was not found"), [];
  }
  if ((a = (g = g && g.get(b)) && g.length - d) && 0 < a) {
    if (a > c || d) {
      g = g.slice(d, d + c);
    }
    e && (g = eb.call(this, g));
    return g;
  }
}
function eb(a) {
  for (var b = Array(a.length), c = 0, d; c < a.length; c++) {
    d = a[c], b[c] = {id:d, doc:this.store.get(d)};
  }
  return b;
}
;function V(a) {
  if (this.constructor !== V) {
    return new V(a);
  }
  var b = a.document || a.doc || a, c, d;
  this.I = [];
  this.field = [];
  this.T = [];
  this.key = (c = b.key || b.id) && hb(c, this.T) || "id";
  (d = a.keystore || 0) && (this.keystore = d);
  this.reg = (this.fastupdate = !!a.fastupdate) ? d ? new T(d) : new Map() : d ? new U(d) : new Set();
  this.H = (c = b.store || null) && !0 !== c && [];
  this.store = c && (d ? new T(d) : new Map());
  this.cache = (c = a.cache || null) && new W(c);
  a.cache = !1;
  this.worker = a.worker;
  this.index = ib.call(this, a, b);
  this.tag = null;
  if (c = b.tag) {
    if ("string" === typeof c && (c = [c]), c.length) {
      this.tag = new Map();
      this.M = [];
      this.$ = [];
      b = 0;
      for (var e = d = void 0; b < c.length; b++) {
        d = c[b];
        e = d.field || d;
        if (!e) {
          throw Error("The tag field from the document descriptor is undefined.");
        }
        d.custom ? this.M[b] = d.custom : (this.M[b] = hb(e, this.T), d.filter && ("string" === typeof this.M[b] && (this.M[b] = new String(this.M[b])), this.M[b].R = d.filter));
        this.$[b] = e;
        this.tag.set(e, new Map());
      }
    }
  }
  if (this.worker) {
    a = [];
    c = y(this.index.values());
    for (b = c.next(); !b.done; b = c.next()) {
      b = b.value, b.then && a.push(b);
    }
    if (a.length) {
      var g = this;
      return Promise.all(a).then(function(f) {
        for (var h = 0, k = y(g.index.entries()), l = k.next(); !l.done; l = k.next()) {
          l = l.value;
          var m = l[0];
          l[1].then && g.index.set(m, f[h++]);
        }
        return g;
      });
    }
  } else {
    a.db && this.mount(a.db);
  }
}
v = V.prototype;
v.mount = function(a) {
  var b = this.field;
  if (this.tag) {
    for (var c = 0, d; c < this.$.length; c++) {
      d = this.$[c];
      var e;
      this.index.set(d, e = new O({}, this.reg));
      b === this.field && (b = b.slice(0));
      b.push(d);
      e.tag = this.tag.get(d);
    }
  }
  c = [];
  d = {db:a.db, type:a.type, fastupdate:a.fastupdate};
  e = 0;
  for (var g; e < b.length; e++) {
    d.field = g = b[e];
    g = this.index.get(g);
    var f = new a.constructor(a.id, d);
    f.id = a.id;
    c[e] = f.mount(g);
    g.document = !0;
    e ? g.bypass = !0 : g.store = this.store;
  }
  this.db = !0;
  return Promise.all(c);
};
v.commit = function(a, b) {
  var c = this, d, e, g, f;
  return ta(function(h) {
    if (1 == h.h) {
      d = [];
      e = y(c.index.values());
      for (g = e.next(); !g.done; g = e.next()) {
        f = g.value, d.push(f.db.commit(f, a, b));
      }
      return G(h, Promise.all(d), 2);
    }
    c.reg.clear();
    h.h = 0;
  });
};
v.destroy = function() {
  for (var a = [], b = y(this.index.values()), c = b.next(); !c.done; c = b.next()) {
    a.push(c.value.destroy());
  }
  return Promise.all(a);
};
function ib(a, b) {
  var c = new Map(), d = b.index || b.field || b;
  K(d) && (d = [d]);
  for (var e = 0, g, f = void 0; e < d.length; e++) {
    g = d[e];
    K(g) || (f = g, g = g.field);
    f = M(f) ? Object.assign({}, a, f) : a;
    if (this.worker) {
      var h = new R(f);
      c.set(g, h);
    }
    this.worker || c.set(g, new O(f, this.reg));
    f.custom ? this.I[e] = f.custom : (this.I[e] = hb(g, this.T), f.filter && ("string" === typeof this.I[e] && (this.I[e] = new String(this.I[e])), this.I[e].R = f.filter));
    this.field[e] = g;
  }
  if (this.H) {
    for (a = b.store, K(a) && (a = [a]), b = 0; b < a.length; b++) {
      d = a[b], e = d.field || d, d.custom ? (this.H[b] = d.custom, d.custom.la = e) : (this.H[b] = hb(e, this.T), d.filter && ("string" === typeof this.H[b] && (this.H[b] = new String(this.H[b])), this.H[b].R = d.filter));
    }
  }
  return c;
}
function hb(a, b) {
  for (var c = a.split(":"), d = 0, e = 0; e < c.length; e++) {
    a = c[e], "]" === a[a.length - 1] && (a = a.substring(0, a.length - 2)) && (b[d] = !0), a && (c[d++] = a);
  }
  d < c.length && (c.length = d);
  return 1 < d ? c : c[0];
}
v.append = function(a, b) {
  return this.add(a, b, !0);
};
v.update = function(a, b) {
  return this.remove(a).add(a, b);
};
v.remove = function(a) {
  M(a) && (a = za(a, this.key));
  for (var b = y(this.index.values()), c = b.next(); !c.done; c = b.next()) {
    c.value.remove(a, !0);
  }
  if (this.reg.has(a)) {
    if (this.tag && !this.fastupdate) {
      for (b = y(this.tag.values()), c = b.next(); !c.done; c = b.next()) {
        c = c.value;
        for (var d = y(c), e = d.next(); !e.done; e = d.next()) {
          var g = e.value;
          e = g[0];
          g = g[1];
          var f = g.indexOf(a);
          -1 < f && (1 < g.length ? g.splice(f, 1) : c.delete(e));
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
  for (var a = y(this.index.values()), b = a.next(); !b.done; b = a.next()) {
    b.value.clear();
  }
  if (this.tag) {
    for (a = y(this.tag.values()), b = a.next(); !b.done; b = a.next()) {
      b.value.clear();
    }
  }
  this.store && this.store.clear();
  return this;
};
v.contain = function(a) {
  return this.db ? this.index.get(this.field[0]).db.has(a) : this.reg.has(a);
};
v.cleanup = function() {
  for (var a = y(this.index.values()), b = a.next(); !b.done; b = a.next()) {
    b.value.cleanup();
  }
  return this;
};
v.get = function(a) {
  return this.db ? this.index.get(this.field[0]).db.enrich(a).then(function(b) {
    return b[0] && b[0].doc;
  }) : this.store.get(a);
};
v.set = function(a, b) {
  this.store.set(a, b);
  return this;
};
v.searchCache = jb;
v.export = function(a, b, c, d) {
  c = void 0 === c ? 0 : c;
  d = void 0 === d ? 0 : d;
  if (c < this.field.length) {
    var e = this.field[c];
    if ((b = this.index.get(e).export(a, e, c, d = 1)) && b.then) {
      var g = this;
      return b.then(function() {
        return g.export(a, e, c + 1, d = 0);
      });
    }
    return this.export(a, e, c + 1, d = 0);
  }
  switch(d) {
    case 0:
      var f = "reg";
      var h = Ra(this.reg);
      b = null;
      break;
    case 1:
      f = "tag";
      h = Qa(this.tag);
      b = null;
      break;
    case 2:
      f = "doc";
      h = Pa(this.store);
      b = null;
      break;
    case 3:
      f = "cfg";
      h = {};
      b = null;
      break;
    default:
      return;
  }
  return Sa.call(this, a, b, f, c, d, h);
};
v.import = function(a, b) {
  if (b) {
    switch(K(b) && (b = JSON.parse(b)), a) {
      case "tag":
        break;
      case "reg":
        this.fastupdate = !1;
        this.reg = new Set(b);
        for (a = 0; a < this.field.length; a++) {
          b = this.index.get(this.field[a]), b.fastupdate = !1, b.reg = this.reg;
        }
        break;
      case "doc":
        this.store = new Map(b);
        break;
      default:
        a = a.split(".");
        var c = a[0];
        a = a[1];
        c && a && this.index.get(c).import(a, b);
    }
  }
};
Na(V.prototype);
function jb(a, b, c) {
  a = ("object" === typeof a ? "" + a.query : a).toLowerCase();
  var d = this.cache.get(a);
  if (!d) {
    d = this.search(a, b, c);
    if (d.then) {
      var e = this;
      d.then(function(g) {
        e.cache.set(a, g);
        return g;
      });
    }
    this.cache.set(a, d);
  }
  return d;
}
function W(a) {
  this.limit = a && !0 !== a ? a : 1000;
  this.cache = new Map();
  this.h = "";
}
W.prototype.set = function(a, b) {
  this.cache.set(this.h = a, b);
  this.cache.size > this.limit && this.cache.delete(this.cache.keys().next().value);
};
W.prototype.get = function(a) {
  var b = this.cache.get(a);
  b && this.h !== a && (this.cache.delete(a), this.cache.set(this.h = a, b));
  return b;
};
W.prototype.remove = function(a) {
  for (var b = y(this.cache), c = b.next(); !c.done; c = b.next()) {
    c = c.value;
    var d = c[0];
    c[1].includes(a) && this.cache.delete(d);
  }
};
W.prototype.clear = function() {
  this.cache.clear();
  this.h = "";
};
var kb = {normalize:function(a) {
  return a.toLowerCase();
}, dedupe:!1};
var lb = new Map([["b", "p"], ["v", "f"], ["w", "f"], ["z", "s"], ["x", "s"], ["d", "t"], ["n", "m"], ["c", "k"], ["g", "k"], ["j", "k"], ["q", "k"], ["i", "e"], ["y", "e"], ["u", "o"]]);
var mb = new Map([["ae", "a"], ["oe", "o"], ["sh", "s"], ["kh", "k"], ["th", "t"], ["pf", "f"]]), nb = [/([^aeo])h(.)/g, "$1$2", /([aeo])h([^aeo]|$)/g, "$1$2", /([^0-9])\1+/g, "$1"];
var ob = {a:"", e:"", i:"", o:"", u:"", y:"", b:1, f:1, p:1, v:1, c:2, g:2, j:2, k:2, q:2, s:2, x:2, z:2, "\u00df":2, d:3, t:3, l:4, m:5, n:5, r:6};
var pb = /[\x00-\x7F]+/g;
var qb = /[\x00-\x7F]+/g;
var rb = /[\x00-\x7F]+/g;
var sb = {LatinExact:{normalize:!1, dedupe:!1}, LatinDefault:kb, LatinSimple:{normalize:!0, dedupe:!0}, LatinBalance:{normalize:!0, dedupe:!0, mapper:lb}, LatinAdvanced:{normalize:!0, dedupe:!0, mapper:lb, matcher:mb, replacer:nb}, LatinExtra:{normalize:!0, dedupe:!0, mapper:lb, replacer:nb.concat([/(?!^)[aeo]/g, ""]), matcher:mb}, LatinSoundex:{normalize:!0, dedupe:!1, include:{letter:!0}, finalize:function(a) {
  for (var b = 0; b < a.length; b++) {
    for (var c = a[b], d = c.charAt(0), e = ob[d], g = 1, f; g < c.length && (f = c.charAt(g), "h" === f || "w" === f || !(f = ob[f]) || f === e || (d += f, e = f, 4 !== d.length)); g++) {
    }
    a[b] = d;
  }
}}, ArabicDefault:{rtl:!0, normalize:!1, dedupe:!0, prepare:function(a) {
  return ("" + a).replace(pb, " ");
}}, CjkDefault:{normalize:!1, dedupe:!0, split:"", prepare:function(a) {
  return ("" + a).replace(qb, "");
}}, CyrillicDefault:{normalize:!1, dedupe:!0, prepare:function(a) {
  return ("" + a).replace(rb, " ");
}}};
var tb = {memory:{resolution:1}, performance:{resolution:6, fastupdate:!0, context:{depth:1, resolution:3}}, match:{tokenize:"forward"}, score:{resolution:9, context:{depth:2, resolution:9}}};
J();
O.prototype.add = function(a, b, c, d) {
  if (b && (a || 0 === a)) {
    if (!d && !c && this.reg.has(a)) {
      return this.update(a, b);
    }
    b = this.encoder.encode(b);
    if (d = b.length) {
      for (var e = J(), g = J(), f = this.depth, h = this.resolution, k = 0; k < d; k++) {
        var l = b[this.rtl ? d - 1 - k : k], m = l.length;
        if (m && (f || !g[l])) {
          var n = this.score ? this.score(b, l, k, null, 0) : ub(h, d, k), p = "";
          switch(this.tokenize) {
            case "full":
              if (2 < m) {
                for (n = 0; n < m; n++) {
                  for (var q = m; q > n; q--) {
                    p = l.substring(n, q);
                    var r = this.score ? this.score(b, l, k, p, n) : ub(h, d, k, m, n);
                    vb(this, g, p, r, a, c);
                  }
                }
                break;
              }
            case "reverse":
              if (1 < m) {
                for (q = m - 1; 0 < q; q--) {
                  p = l[q] + p, r = this.score ? this.score(b, l, k, p, q) : ub(h, d, k, m, q), vb(this, g, p, r, a, c);
                }
                p = "";
              }
            case "forward":
              if (1 < m) {
                for (q = 0; q < m; q++) {
                  p += l[q], vb(this, g, p, n, a, c);
                }
                break;
              }
            default:
              if (vb(this, g, l, n, a, c), f && 1 < d && k < d - 1) {
                for (m = J(), p = this.aa, n = l, q = Math.min(f + 1, d - k), r = m[n] = 1; r < q; r++) {
                  if ((l = b[this.rtl ? d - 1 - k - r : k + r]) && !m[l]) {
                    m[l] = 1;
                    var u = this.score ? this.score(b, n, k, l, r) : ub(p + (d / 2 > p ? 0 : 1), d, k, q - 1, r - 1), w = this.bidirectional && l > n;
                    vb(this, e, w ? n : l, u, a, c, w ? l : n);
                  }
                }
              }
          }
        }
      }
      this.fastupdate || this.reg.add(a);
    } else {
      b = "";
    }
  }
  this.db && (b || this.commit_task.push({del:a}), this.da && wb(this));
  return this;
};
function vb(a, b, c, d, e, g, f) {
  var h = f ? a.ctx : a.map, k;
  if (!b[c] || f && !(k = b[c])[f]) {
    if (f ? (b = k || (b[c] = J()), b[f] = 1, (k = h.get(f)) ? h = k : h.set(f, h = new Map())) : b[c] = 1, (k = h.get(c)) ? h = k : h.set(c, h = k = []), h = h[d] || (h[d] = []), !g || !h.includes(e)) {
      if (h.length === Math.pow(2, 31) - 1) {
        b = new S(h);
        if (a.fastupdate) {
          for (c = y(a.reg.values()), g = c.next(); !g.done; g = c.next()) {
            g = g.value, g.includes(h) && (g[g.indexOf(h)] = b);
          }
        }
        k[d] = h = b;
      }
      h.push(e);
      a.fastupdate && ((d = a.reg.get(e)) ? d.push(h) : a.reg.set(e, [h]));
    }
  }
}
function ub(a, b, c, d, e) {
  return c && 1 < a ? b + (d || 0) <= a ? c + (e || 0) : (a - 1) / (b + (d || 0)) * (c + (e || 0)) + 1 | 0 : 0;
}
;function X(a, b, c, d) {
  if (1 === a.length) {
    return a = a[0], a = c || a.length > b ? b ? a.slice(c, c + b) : a.slice(c) : a, d ? xb(a) : a;
  }
  for (var e = [], g = 0, f = void 0, h = void 0; g < a.length; g++) {
    if ((f = a[g]) && (h = f.length)) {
      if (c) {
        if (c >= h) {
          c -= h;
          continue;
        }
        c < h && (f = b ? f.slice(c, c + b) : f.slice(c), h = f.length, c = 0);
      }
      if (e.length) {
        h > b && (f = f.slice(0, b), h = f.length), e.push(f);
      } else {
        if (h >= b) {
          return h > b && (f = f.slice(0, b)), d ? xb(f) : f;
        }
        e = [f];
      }
      b -= h;
      if (!b) {
        break;
      }
    }
  }
  if (!e.length) {
    return e;
  }
  e = 1 < e.length ? [].concat.apply([], e) : e[0];
  return d ? xb(e) : e;
}
function xb(a) {
  for (var b = 0; b < a.length; b++) {
    a[b] = {score:b, id:a[b]};
  }
  return a;
}
;Y.prototype.or = function() {
  var a = this, b = arguments, c = b[0];
  if (c.then) {
    return c.then(function() {
      return a.or.apply(a, b);
    });
  }
  if (c[0] && c[0].index) {
    return this.or.apply(this, c);
  }
  var d = [];
  c = [];
  for (var e = 0, g = 0, f, h, k = 0, l = void 0; k < b.length; k++) {
    if (l = b[k]) {
      e = l.limit || 0;
      g = l.offset || 0;
      f = l.enrich;
      h = l.resolve;
      var m = void 0;
      if (l.constructor === Y) {
        m = l.result;
      } else if (l.constructor === Array) {
        m = l;
      } else if (l.index) {
        l.resolve = !1, m = l.index.search(l).result;
      } else if (l.and) {
        m = this.and(l.and);
      } else if (l.xor) {
        m = this.xor(l.xor);
      } else if (l.not) {
        m = this.not(l.not);
      } else {
        continue;
      }
      d[k] = m;
      m.then && c.push(m);
    }
  }
  if (c.length) {
    return Promise.all(c).then(function() {
      a.result.length && (d = d.concat([a.result]));
      a.result = yb(d, e, g, f, h, a.J);
      return h ? a.result : a;
    });
  }
  d.length && (this.result.length && (d = d.concat([this.result])), this.result = yb(d, e, g, f, h, this.J));
  return h ? this.result : this;
};
function yb(a, b, c, d, e, g) {
  if (!a.length) {
    return a;
  }
  "object" === typeof b && (c = b.offset || 0, d = b.enrich || !1, b = b.limit || 0);
  return 2 > a.length ? e ? X(a[0], b, c, d) : a[0] : bb(a, c, b, e, g);
}
;Y.prototype.and = function() {
  if (this.result.length) {
    var a = this, b = arguments, c = b[0];
    if (c.then) {
      return c.then(function() {
        return a.and.apply(a, b);
      });
    }
    if (c[0] && c[0].index) {
      return this.and.apply(this, c);
    }
    var d = [];
    c = [];
    for (var e = 0, g = 0, f, h, k = 0, l = void 0; k < b.length; k++) {
      if (l = b[k]) {
        e = l.limit || 0;
        g = l.offset || 0;
        f = l.resolve;
        h = l.suggest;
        var m = void 0;
        if (l.constructor === Y) {
          m = l.result;
        } else if (l.constructor === Array) {
          m = l;
        } else if (l.index) {
          l.resolve = !1, m = l.index.search(l).result;
        } else if (l.or) {
          m = this.or(l.or);
        } else if (l.xor) {
          m = this.xor(l.xor);
        } else if (l.not) {
          m = this.not(l.not);
        } else {
          continue;
        }
        d[k] = m;
        m.then && c.push(m);
      }
    }
    if (!d.length) {
      return this.result = d, f ? this.result : this;
    }
    if (c.length) {
      return Promise.all(c).then(function() {
        d = [a.result].concat(d);
        a.result = zb(d, e, g, f, a.J, h);
        return f ? a.result : a;
      });
    }
    d = [this.result].concat(d);
    this.result = zb(d, e, g, f, this.J, h);
    return f ? this.result : this;
  }
  return this;
};
function zb(a, b, c, d, e, g) {
  if (2 > a.length) {
    return [];
  }
  var f = [];
  J();
  var h = Aa(a);
  return h ? ab(a, h, b, c, g, e, d) : f;
}
;Y.prototype.xor = function() {
  var a = this, b = arguments, c = b[0];
  if (c.then) {
    return c.then(function() {
      return a.xor.apply(a, b);
    });
  }
  if (c[0] && c[0].index) {
    return this.xor.apply(this, c);
  }
  var d = [];
  c = [];
  for (var e = 0, g = 0, f, h, k = 0, l = void 0; k < b.length; k++) {
    if (l = b[k]) {
      e = l.limit || 0;
      g = l.offset || 0;
      f = l.enrich;
      h = l.resolve;
      var m = void 0;
      if (l.constructor === Y) {
        m = l.result;
      } else if (l.constructor === Array) {
        m = l;
      } else if (l.index) {
        l.resolve = !1, m = l.index.search(l).result;
      } else if (l.or) {
        m = this.or(l.or);
      } else if (l.and) {
        m = this.and(l.and);
      } else if (l.not) {
        m = this.not(l.not);
      } else {
        continue;
      }
      d[k] = m;
      m.then && c.push(m);
    }
  }
  if (c.length) {
    return Promise.all(c).then(function() {
      a.result.length && (d = [a.result].concat(d));
      a.result = Ab(d, e, g, f, !h, a.J);
      return h ? a.result : a;
    });
  }
  d.length && (this.result.length && (d = [this.result].concat(d)), this.result = Ab(d, e, g, f, !h, a.J));
  return h ? this.result : this;
};
function Ab(a, b, c, d, e, g) {
  if (!a.length) {
    return a;
  }
  if (2 > a.length) {
    return e ? X(a[0], b, c, d) : a[0];
  }
  d = [];
  for (var f = J(), h = 0, k = 0, l; k < a.length; k++) {
    if (l = a[k]) {
      for (var m = 0, n; m < l.length; m++) {
        if (n = l[m]) {
          h < n.length && (h = n.length);
          for (var p = 0, q; p < n.length; p++) {
            q = n[p], f[q] ? f[q]++ : f[q] = 1;
          }
        }
      }
    }
  }
  for (l = k = 0; k < h; k++) {
    for (m = 0; m < a.length; m++) {
      if (n = a[m]) {
        if (n = n[k]) {
          for (p = 0; p < n.length; p++) {
            if (q = n[p], 1 === f[q]) {
              if (c) {
                c--;
              } else {
                if (e) {
                  if (d.push(q), d.length === b) {
                    return d;
                  }
                } else {
                  var r = k + (m ? g : 0);
                  d[r] || (d[r] = []);
                  d[r].push(q);
                  if (++l === b) {
                    return d;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return d;
}
;Y.prototype.not = function() {
  var a = this, b = arguments, c = b[0];
  if (c.then) {
    return c.then(function() {
      return a.not.apply(a, b);
    });
  }
  if (c[0] && c[0].index) {
    return this.not.apply(this, c);
  }
  var d = [];
  c = [];
  for (var e = 0, g = 0, f, h = 0, k = void 0; h < b.length; h++) {
    if (k = b[h]) {
      e = k.limit || 0;
      g = k.offset || 0;
      f = k.resolve;
      var l = void 0;
      if (k.constructor === Y) {
        l = k.result;
      } else if (k.constructor === Array) {
        l = k;
      } else if (k.index) {
        k.resolve = !1, l = k.index.search(k).result;
      } else if (k.or) {
        l = this.or(k.or);
      } else if (k.and) {
        l = this.and(k.and);
      } else if (k.xor) {
        l = this.xor(k.xor);
      } else {
        continue;
      }
      d[h] = l;
      l.then && c.push(l);
    }
  }
  if (c.length) {
    return Promise.all(c).then(function() {
      a.result = Bb.call(a, d, e, g, f);
      return f ? a.result : a;
    });
  }
  d.length && (this.result = Bb.call(this, d, e, g, f));
  return f ? this.result : this;
};
function Bb(a, b, c, d) {
  if (!a.length) {
    return this.result;
  }
  var e = [];
  a = new Set(a.flat().flat());
  for (var g = 0, f, h = 0; g < this.result.length; g++) {
    if (f = this.result[g]) {
      for (var k = 0, l; k < f.length; k++) {
        if (l = f[k], !a.has(l)) {
          if (c) {
            c--;
          } else {
            if (d) {
              if (e.push(l), e.length === b) {
                return e;
              }
            } else {
              if (e[g] || (e[g] = []), e[g].push(l), ++h === b) {
                return e;
              }
            }
          }
        }
      }
    }
  }
  return e;
}
;function Y(a) {
  if (this.constructor !== Y) {
    return new Y(a);
  }
  if (a && a.index) {
    return a.resolve = !1, this.index = a.index, this.J = a.boost || 0, this.result = a.index.search(a).result, this;
  }
  if (a.constructor === Y) {
    return a;
  }
  this.index = null;
  this.result = a || [];
  this.J = 0;
}
Y.prototype.limit = function(a) {
  if (this.result.length) {
    for (var b = [], c = 0, d = 0, e; d < this.result.length; d++) {
      if (e = this.result[d], e.length + c < a) {
        b[d] = e, c += e.length;
      } else {
        b[d] = e.slice(0, a - c);
        this.result = b;
        break;
      }
    }
  }
  return this;
};
Y.prototype.offset = function(a) {
  if (this.result.length) {
    for (var b = [], c = 0, d = 0, e; d < this.result.length; d++) {
      e = this.result[d], e.length + c < a ? c += e.length : (b[d] = e.slice(a - c), c = a);
    }
    this.result = b;
  }
  return this;
};
Y.prototype.boost = function(a) {
  this.J += a;
  return this;
};
Y.prototype.resolve = function(a, b, c) {
  Cb = 1;
  var d = this.result;
  this.result = this.index = null;
  return d.length ? ("object" === typeof a && (c = a.enrich, b = a.offset, a = a.limit), X(d, a || 100, b, c)) : d;
};
var Cb = 1;
O.prototype.search = function(a, b, c) {
  c || (!b && M(a) ? (c = a, a = "") : M(b) && (c = b, b = 0));
  var d = [], e = 0, g;
  if (c) {
    a = c.query || a;
    b = c.limit || b;
    e = c.offset || 0;
    var f = c.context;
    var h = c.suggest;
    (g = Cb && !1 !== c.resolve) || (Cb = 0);
    var k = g && c.enrich;
    var l = c.boost;
    var m = this.db && c.tag;
  } else {
    g = this.resolve || Cb;
  }
  a = this.encoder.encode(a);
  var n = a.length;
  b || !g || (b = 100);
  if (1 === n) {
    return Db.call(this, a[0], "", b, e, g, k, m);
  }
  f = this.depth && !1 !== f;
  if (2 === n && f && !h) {
    return Db.call(this, a[0], a[1], b, e, g, k, m);
  }
  var p = c = 0;
  if (1 < n) {
    for (var q = J(), r = [], u = 0, w = void 0; u < n; u++) {
      if ((w = a[u]) && !q[w]) {
        if (h || this.db || Z(this, w)) {
          r.push(w), q[w] = 1;
        } else {
          return g ? d : new Y(d);
        }
        w = w.length;
        c = Math.max(c, w);
        p = p ? Math.min(p, w) : w;
      }
    }
    a = r;
    n = a.length;
  }
  if (!n) {
    return g ? d : new Y(d);
  }
  var x = 0;
  if (1 === n) {
    return Db.call(this, a[0], "", b, e, g, k, m);
  }
  if (2 === n && f && !h) {
    return Db.call(this, a[0], a[1], b, e, g, k, m);
  }
  if (1 < n) {
    if (f) {
      var t = a[0];
      x = 1;
    } else {
      9 < c && 3 < c / p && a.sort(xa);
    }
  }
  if (this.db) {
    if (this.db.search && (f = this.db.search(this, a, b, e, h, g, k, m), !1 !== f)) {
      return f;
    }
    var z = this;
    return function() {
      var A, B, D;
      return ta(function(F) {
        switch(F.h) {
          case 1:
            B = A = void 0;
          case 2:
            if (!(x < n)) {
              F.h = 4;
              break;
            }
            B = a[x];
            return t ? G(F, Z(z, B, t, 0, 0, !1, !1), 8) : G(F, Z(z, B, "", 0, 0, !1, !1), 7);
          case 7:
            A = F.F;
            A = Eb(A, d, h, z.resolution);
            F.h = 6;
            break;
          case 8:
            A = F.F, A = Eb(A, d, h, z.aa), h && !1 === A && d.length || (t = B);
          case 6:
            if (A) {
              return F.return(A);
            }
            if (h && x === n - 1) {
              D = d.length;
              if (!D) {
                if (t) {
                  t = "";
                  x = -1;
                  F.h = 3;
                  break;
                }
                return F.return(d);
              }
              if (1 === D) {
                return F.return(g ? X(d[0], b, e) : new Y(d[0]));
              }
            }
          case 3:
            x++;
            F.h = 2;
            break;
          case 4:
            return F.return(g ? ab(d, z.resolution, b, e, h, l, g) : new Y(d[0]));
        }
      });
    }();
  }
  for (k = f = void 0; x < n; x++) {
    k = a[x];
    t ? (f = Z(this, k, t, 0, 0, !1, !1), f = Eb(f, d, h, this.aa), h && !1 === f && d.length || (t = k)) : (f = Z(this, k, "", 0, 0, !1, !1), f = Eb(f, d, h, this.resolution));
    if (f) {
      return f;
    }
    if (h && x === n - 1) {
      f = d.length;
      if (!f) {
        if (t) {
          t = "";
          x = -1;
          continue;
        }
        return d;
      }
      if (1 === f) {
        return g ? X(d[0], b, e) : new Y(d[0]);
      }
    }
  }
  d = ab(d, this.resolution, b, e, h, l, g);
  return g ? d : new Y(d);
};
function Db(a, b, c, d, e, g, f) {
  a = Z(this, a, b, c, d, e, g, f);
  return this.db ? a.then(function(h) {
    return e ? h : h && h.length ? e ? X(h, c, d) : new Y(h) : e ? [] : new Y([]);
  }) : a && a.length ? e ? X(a, c, d) : new Y(a) : e ? [] : new Y([]);
}
function Eb(a, b, c, d) {
  var e = [];
  if (a) {
    d = Math.min(a.length, d);
    for (var g = 0, f = void 0; g < d; g++) {
      (f = a[g]) && f && (e[g] = f);
    }
    if (e.length) {
      b.push(e);
      return;
    }
  }
  return !c && e;
}
function Z(a, b, c, d, e, g, f, h) {
  var k;
  c && (k = a.bidirectional && b > c);
  if (a.db) {
    return c ? a.db.get(k ? c : b, k ? b : c, d, e, g, f, h) : a.db.get(b, "", d, e, g, f, h);
  }
  a = c ? (a = a.ctx.get(k ? b : c)) && a.get(k ? c : b) : a.map.get(b);
  return a;
}
;O.prototype.remove = function(a, b) {
  var c = this.reg.size && (this.fastupdate ? this.reg.get(a) : this.reg.has(a));
  if (c) {
    if (this.fastupdate) {
      for (var d = 0, e; d < c.length; d++) {
        if (e = c[d]) {
          if (2 > e.length) {
            e.pop();
          } else {
            var g = e.indexOf(a);
            g === c.length - 1 ? e.pop() : e.splice(g, 1);
          }
        }
      }
    } else {
      Fb(this.map, a), this.depth && Fb(this.ctx, a);
    }
    b || this.reg.delete(a);
  }
  this.db && (this.commit_task.push({del:a}), this.da && wb(this));
  this.cache && this.cache.remove(a);
  return this;
};
function Fb(a, b) {
  var c = 0;
  if (a.constructor === Array) {
    for (var d = 0, e = void 0, g; d < a.length; d++) {
      if ((e = a[d]) && e.length) {
        if (g = e.indexOf(b), 0 <= g) {
          1 < e.length ? (e.splice(g, 1), c++) : delete a[d];
          break;
        } else {
          c++;
        }
      }
    }
  } else {
    for (d = y(a), e = d.next(); !e.done; e = d.next()) {
      g = e.value, e = g[0], (g = Fb(g[1], b)) ? c += g : a.delete(e);
    }
  }
  return c;
}
;function O(a, b) {
  if (this.constructor !== O) {
    return new O(a);
  }
  if (a) {
    var c = K(a) ? a : a.preset;
    c && (tb[c] || console.warn("Preset not found: " + c), a = Object.assign({}, tb[c], a));
  } else {
    a = {};
  }
  c = a.context || {};
  var d = K(a.encoder) ? sb[a.encoder] : a.encode || a.encoder || kb;
  this.encoder = d.encode ? d : "object" === typeof d ? new N(d) : {encode:d};
  var e;
  this.resolution = a.resolution || 9;
  this.tokenize = e = a.tokenize || "strict";
  this.depth = "strict" === e && c.depth || 0;
  this.bidirectional = !1 !== c.bidirectional;
  this.fastupdate = !!a.fastupdate;
  this.score = a.score || null;
  (e = a.keystore || 0) && (this.keystore = e);
  this.map = e ? new T(e) : new Map();
  this.ctx = e ? new T(e) : new Map();
  this.reg = b || (this.fastupdate ? e ? new T(e) : new Map() : e ? new U(e) : new Set());
  this.aa = c.resolution || 1;
  this.rtl = d.rtl || a.rtl || !1;
  this.cache = (e = a.cache || null) && new W(e);
  this.resolve = !1 !== a.resolve;
  if (e = a.db) {
    this.db = this.mount(e);
  }
  this.da = !1 !== a.commit;
  this.commit_task = [];
  this.commit_timer = null;
}
v = O.prototype;
v.mount = function(a) {
  this.commit_timer && (clearTimeout(this.commit_timer), this.commit_timer = null);
  return a.mount(this);
};
v.commit = function(a, b) {
  this.commit_timer && (clearTimeout(this.commit_timer), this.commit_timer = null);
  return this.db.commit(this, a, b);
};
v.destroy = function() {
  this.commit_timer && (clearTimeout(this.commit_timer), this.commit_timer = null);
  return this.db.destroy();
};
function wb(a) {
  a.commit_timer || (a.commit_timer = setTimeout(function() {
    a.commit_timer = null;
    a.db.commit(a, void 0, void 0);
  }, 0));
}
v.clear = function() {
  this.map.clear();
  this.ctx.clear();
  this.reg.clear();
  this.cache && this.cache.clear();
  this.db && (this.commit_timer && clearTimeout(this.commit_timer), this.commit_timer = null, this.commit_task = [{clear:!0}]);
  return this;
};
v.append = function(a, b) {
  return this.add(a, b, !0);
};
v.contain = function(a) {
  return this.db ? this.db.has(a) : this.reg.has(a);
};
v.update = function(a, b) {
  var c = this, d = this.remove(a);
  return d && d.then ? d.then(function() {
    return c.add(a, b);
  }) : this.add(a, b);
};
function Gb(a) {
  var b = 0;
  if (a.constructor === Array) {
    for (var c = 0, d = void 0; c < a.length; c++) {
      (d = a[c]) && (b += d.length);
    }
  } else {
    for (c = y(a), d = c.next(); !d.done; d = c.next()) {
      var e = d.value;
      d = e[0];
      (e = Gb(e[1])) ? b += e : a.delete(d);
    }
  }
  return b;
}
v.cleanup = function() {
  if (!this.fastupdate) {
    return console.info('Cleanup the index isn\'t required when not using "fastupdate".'), this;
  }
  Gb(this.map);
  this.depth && Gb(this.ctx);
  return this;
};
v.searchCache = jb;
v.export = function(a, b, c, d) {
  d = void 0 === d ? 0 : d;
  switch(d) {
    case 0:
      var e = "reg";
      var g = Ra(this.reg);
      break;
    case 1:
      e = "cfg";
      g = {};
      break;
    case 2:
      e = "map";
      g = Pa(this.map);
      break;
    case 3:
      e = "ctx";
      g = Qa(this.ctx);
      break;
    default:
      return;
  }
  return Sa.call(this, a, b, e, c, d, g);
};
v.import = function(a, b) {
  if (b) {
    switch(K(b) && (b = JSON.parse(b)), a) {
      case "reg":
        this.fastupdate = !1;
        this.reg = new Set(b);
        break;
      case "map":
        this.map = new Map(b);
        break;
      case "ctx":
        this.ctx = new Map(b);
    }
  }
};
v.serialize = function(a) {
  a = void 0 === a ? !0 : a;
  if (!this.reg.size) {
    return "";
  }
  for (var b = "", c = "", d = y(this.reg.keys()), e = d.next(); !e.done; e = d.next()) {
    e = e.value, c || (c = typeof e), b += (b ? "," : "") + ("string" === c ? '"' + e + '"' : e);
  }
  b = "index.reg=new Set([" + b + "]);";
  d = "";
  e = y(this.map.entries());
  for (var g = e.next(); !g.done; g = e.next()) {
    var f = g.value;
    g = f[0];
    f = f[1];
    for (var h = "", k = 0, l; k < f.length; k++) {
      l = f[k] || [""];
      for (var m = "", n = 0; n < l.length; n++) {
        m += (m ? "," : "") + ("string" === c ? '"' + l[n] + '"' : l[n]);
      }
      m = "[" + m + "]";
      h += (h ? "," : "") + m;
    }
    h = '["' + g + '",[' + h + "]]";
    d += (d ? "," : "") + h;
  }
  d = "index.map=new Map([" + d + "]);";
  e = "";
  g = y(this.ctx.entries());
  for (f = g.next(); !f.done; f = g.next()) {
    for (h = f.value, f = h[0], h = y(h[1].entries()), k = h.next(); !k.done; k = h.next()) {
      l = k.value;
      k = l[0];
      l = l[1];
      m = "";
      n = 0;
      for (var p; n < l.length; n++) {
        p = l[n] || [""];
        for (var q = "", r = 0; r < p.length; r++) {
          q += (q ? "," : "") + ("string" === c ? '"' + p[r] + '"' : p[r]);
        }
        q = "[" + q + "]";
        m += (m ? "," : "") + q;
      }
      m = 'new Map([["' + k + '",[' + m + "]]])";
      m = '["' + f + '",' + m + "]";
      e += (e ? "," : "") + m;
    }
  }
  e = "index.ctx=new Map([" + e + "]);";
  return a ? "function inject(index){" + b + d + e + "}" : b + d + e;
};
Na(O.prototype);
var Hb = "undefined" !== typeof window && (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB), Ib = ["map", "ctx", "tag", "reg", "cfg"];
function Jb(a, b) {
  b = void 0 === b ? {} : b;
  if (!this) {
    return new Jb(a, b);
  }
  "object" === typeof a && (b = a = a.name);
  a || console.info("Default storage space was used, because a name was not passed.");
  this.id = "flexsearch" + (a ? ":" + a.toLowerCase().replace(/[^a-z0-9_\-]/g, "") : "");
  this.field = b.field ? b.field.toLowerCase().replace(/[^a-z0-9_\-]/g, "") : "";
  this.support_tag_search = !1;
  this.db = null;
  this.h = {};
}
v = Jb.prototype;
v.mount = function(a) {
  if (!a.encoder) {
    return a.mount(this);
  }
  a.db = this;
  return this.open();
};
v.open = function() {
  var a = this;
  navigator.storage && navigator.storage.persist();
  return this.db || new Promise(function(b, c) {
    var d = Hb.open(a.id + (a.field ? ":" + a.field : ""), 1);
    d.onupgradeneeded = function() {
      var e = a.db = this.result;
      Ib.forEach(function(g) {
        e.objectStoreNames.contains(g) || e.createObjectStore(g);
      });
    };
    d.onblocked = function(e) {
      console.error("blocked", e);
      c();
    };
    d.onerror = function(e) {
      console.error(this.error, e);
      c();
    };
    d.onsuccess = function() {
      a.db = this.result;
      a.db.onversionchange = function() {
        a.close();
      };
      b(a);
    };
  });
};
v.close = function() {
  this.db.close();
  this.db = null;
};
v.destroy = function() {
  return Hb.deleteDatabase(this.id + (this.field ? ":" + this.field : ""));
};
v.clear = function() {
  for (var a = this.db.transaction(Ib, "readwrite"), b = 0; b < Ib.length; b++) {
    a.objectStore(Ib[b]).clear();
  }
  return Kb(a);
};
v.get = function(a, b, c, d, e, g) {
  c = void 0 === c ? 0 : c;
  d = void 0 === d ? 0 : d;
  e = void 0 === e ? !0 : e;
  g = void 0 === g ? !1 : g;
  a = this.db.transaction(b ? "ctx" : "map", "readonly").objectStore(b ? "ctx" : "map").get(b ? b + ":" + a : a);
  var f = this;
  return Kb(a).then(function(h) {
    var k = [];
    if (!h || !h.length) {
      return k;
    }
    if (e) {
      if (!c && !d && 1 === h.length) {
        return h[0];
      }
      for (var l = 0, m = void 0; l < h.length; l++) {
        if ((m = h[l]) && m.length) {
          if (d >= m.length) {
            d -= m.length;
          } else {
            for (var n = c ? d + Math.min(m.length - d, c) : m.length, p = d; p < n; p++) {
              k.push(m[p]);
            }
            d = 0;
            if (k.length === c) {
              break;
            }
          }
        }
      }
      return g ? f.enrich(k) : k;
    }
    return h;
  });
};
v.tag = function(a, b, c, d) {
  b = void 0 === b ? 0 : b;
  c = void 0 === c ? 0 : c;
  d = void 0 === d ? !1 : d;
  a = this.db.transaction("tag", "readonly").objectStore("tag").get(a);
  var e = this;
  return Kb(a).then(function(g) {
    if (!g || !g.length || c >= g.length) {
      return [];
    }
    if (!b && !c) {
      return g;
    }
    g = g.slice(c, c + b);
    return d ? e.enrich(g) : g;
  });
};
v.enrich = function(a) {
  "object" !== typeof a && (a = [a]);
  for (var b = this.db.transaction("reg", "readonly").objectStore("reg"), c = [], d = 0; d < a.length; d++) {
    c[d] = Kb(b.get(a[d]));
  }
  return Promise.all(c).then(function(e) {
    for (var g = 0; g < e.length; g++) {
      e[g] = {id:a[g], doc:e[g] ? JSON.parse(e[g]) : null};
    }
    return e;
  });
};
v.has = function(a) {
  a = this.db.transaction("reg", "readonly").objectStore("reg").getKey(a);
  return Kb(a);
};
v.search = null;
v.info = function() {
};
v.transaction = function(a, b, c) {
  var d = this, e = this.h[a + ":" + b];
  if (e) {
    return c.call(this, e);
  }
  var g = this.db.transaction(a, b);
  this.h[a + ":" + b] = e = g.objectStore(a);
  return new Promise(function(f, h) {
    g.onerror = function(k) {
      d.h[a + ":" + b] = null;
      g.abort();
      g = e = null;
      h(k);
    };
    g.oncomplete = function(k) {
      g = e = d.h[a + ":" + b] = null;
      f(k || !0);
    };
    return c.call(d, e);
  });
};
v.commit = function(a, b, c) {
  var d = this, e, g, f;
  return ta(function(h) {
    switch(h.h) {
      case 1:
        if (b) {
          return G(h, d.clear(), 12);
        }
        e = a.commit_task;
        a.commit_task = [];
        g = 0;
        f = void 0;
      case 4:
        if (!(g < e.length)) {
          h.h = 6;
          break;
        }
        f = e[g];
        if (!f.clear) {
          e[g] = f.pa;
          h.h = 5;
          break;
        }
        return G(h, d.clear(), 8);
      case 8:
        b = !0;
        h.h = 6;
        break;
      case 5:
        g++;
        h.h = 4;
        break;
      case 6:
        if (b) {
          h.h = 3;
          break;
        }
        c || (e = e.concat(ya(a.reg)));
        if (!e.length) {
          h.h = 10;
          break;
        }
        return G(h, d.remove(e), 11);
      case 11:
      case 10:
        h.h = 3;
        break;
      case 12:
        a.commit_task = [];
      case 3:
        return a.reg.size ? G(h, d.transaction("map", "readwrite", function(k) {
          for (var l = y(a.map), m = l.next(), n = {}; !m.done; n = {O:void 0, Y:void 0}, m = l.next()) {
            m = m.value, n.Y = m[0], n.O = m[1], n.O.length && (b ? k.put(n.O, n.Y) : k.get(n.Y).onsuccess = function(p) {
              return function() {
                var q = this.result, r;
                if (q && q.length) {
                  for (var u = Math.max(q.length, p.O.length), w = 0, x; w < u; w++) {
                    if ((x = p.O[w]) && x.length) {
                      if ((r = q[w]) && r.length) {
                        for (var t = 0; t < x.length; t++) {
                          r.push(x[t]);
                        }
                      } else {
                        q[w] = x;
                      }
                      r = 1;
                    }
                  }
                } else {
                  q = p.O, r = 1;
                }
                r && k.put(q, p.Y);
              };
            }(n));
          }
        }), 13) : h.return();
      case 13:
        return G(h, d.transaction("ctx", "readwrite", function(k) {
          for (var l = y(a.ctx), m = l.next(), n = {}; !m.done; n = {W:void 0}, m = l.next()) {
            m = m.value;
            n.W = m[0];
            m = y(m[1]);
            for (var p = m.next(), q = {}; !p.done; q = {P:void 0, Z:void 0}, p = m.next()) {
              p = p.value, q.Z = p[0], q.P = p[1], q.P.length && (b ? k.put(q.P, n.W + ":" + q.Z) : k.get(n.W + ":" + q.Z).onsuccess = function(r, u) {
                return function() {
                  var w = this.result, x;
                  if (w && w.length) {
                    for (var t = Math.max(w.length, r.P.length), z = 0, A; z < t; z++) {
                      if ((A = r.P[z]) && A.length) {
                        if ((x = w[z]) && x.length) {
                          for (var B = 0; B < A.length; B++) {
                            x.push(A[B]);
                          }
                        } else {
                          w[z] = A;
                        }
                        x = 1;
                      }
                    }
                  } else {
                    w = r.P, x = 1;
                  }
                  x && k.put(w, u.W + ":" + r.Z);
                };
              }(q, n));
            }
          }
        }), 14);
      case 14:
        if (a.store) {
          return G(h, d.transaction("reg", "readwrite", function(k) {
            for (var l = y(a.store), m = l.next(); !m.done; m = l.next()) {
              var n = m.value;
              m = n[0];
              n = n[1];
              k.put("object" === typeof n ? JSON.stringify(n) : 1, m);
            }
          }), 16);
        }
        if (a.bypass) {
          h.h = 16;
          break;
        }
        return G(h, d.transaction("reg", "readwrite", function(k) {
          for (var l = y(a.reg.keys()), m = l.next(); !m.done; m = l.next()) {
            k.put(1, m.value);
          }
        }), 16);
      case 16:
        if (!a.tag) {
          h.h = 20;
          break;
        }
        return G(h, d.transaction("tag", "readwrite", function(k) {
          for (var l = y(a.tag), m = l.next(), n = {}; !m.done; n = {X:void 0, ba:void 0}, m = l.next()) {
            m = m.value, n.ba = m[0], n.X = m[1], n.X.length && (k.get(n.ba).onsuccess = function(p) {
              return function() {
                var q = this.result;
                q = q && q.length ? q.concat(p.X) : p.X;
                k.put(q, p.ba);
              };
            }(n));
          }
        }), 20);
      case 20:
        a.map.clear(), a.ctx.clear(), a.tag && a.tag.clear(), a.store && a.store.clear(), a.document || a.reg.clear(), h.h = 0;
    }
  });
};
function Nb(a, b, c) {
  for (var d = a.value, e, g, f = 0, h = 0, k; h < d.length; h++) {
    if (k = c ? d : d[h]) {
      for (var l = 0, m, n; l < b.length; l++) {
        if (n = b[l], m = k.indexOf(g ? parseInt(n, 10) : n), 0 > m && !g && "string" === typeof n && !isNaN(n) && (m = k.indexOf(parseInt(n, 10))) && (g = 1), 0 <= m) {
          if (e = 1, 1 < k.length) {
            k.splice(m, 1);
          } else {
            d[h] = [];
            break;
          }
        }
      }
      f += k.length;
    }
    if (c) {
      break;
    }
  }
  f ? e && a.update(d) : a.delete();
  a.continue();
}
v.remove = function(a) {
  "object" !== typeof a && (a = [a]);
  return Promise.all([this.transaction("map", "readwrite", function(b) {
    b.openCursor().onsuccess = function() {
      var c = this.result;
      c && Nb(c, a);
    };
  }), this.transaction("ctx", "readwrite", function(b) {
    b.openCursor().onsuccess = function() {
      var c = this.result;
      c && Nb(c, a);
    };
  }), this.transaction("tag", "readwrite", function(b) {
    b.openCursor().onsuccess = function() {
      var c = this.result;
      c && Nb(c, a, !0);
    };
  }), this.transaction("reg", "readwrite", function(b) {
    for (var c = 0; c < a.length; c++) {
      b.delete(a[c]);
    }
  })]);
};
function Kb(a) {
  return new Promise(function(b, c) {
    a.onsuccess = function() {
      b(this.result);
    };
    a.oncomplete = function() {
      b(this.result);
    };
    a.onerror = c;
    a = null;
  });
}
;var Ob = {Index:O, Charset:sb, Encoder:N, Document:V, Worker:R, Resolver:Y, IndexedDB:Jb, Language:{}}, Pb = self, Qb;
(Qb = Pb.define) && Qb.amd ? Qb([], function() {
  return Ob;
}) : "object" === typeof Pb.exports ? Pb.exports = Ob : Pb.FlexSearch = Ob;
}(this||self));
