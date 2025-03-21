/**!
 * FlexSearch.js v0.8.123 (ES5/Debug)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */
(function _f(self){'use strict';if(typeof module!=='undefined')self=module;else if(typeof process !== 'undefined')self=process;self._factory=_f;
var u;
function aa(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
}
function w(a) {
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
var B = ca(this);
function C(a, b) {
  if (b) {
    a: {
      var c = B;
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
  this.D = void 0;
  this.h = 1;
  this.H = 0;
  this.B = null;
}
function ka(a) {
  if (a.C) {
    throw new TypeError("Generator is already running");
  }
  a.C = !0;
}
ja.prototype.G = function(a) {
  this.D = a;
};
function la(a, b) {
  a.B = {ka:b, la:!0};
  a.h = a.H;
}
ja.prototype.return = function(a) {
  this.B = {return:a};
  this.h = this.H;
};
function E(a, b, c) {
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
    var f = e.value;
  } catch (g) {
    return a.h.A = null, la(a.h, g), pa(a);
  }
  a.h.A = null;
  d.call(a.h, f);
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
      a.h.D = void 0, la(a.h, c);
    }
  }
  a.h.C = !1;
  if (a.h.B) {
    b = a.h.B;
    a.h.B = null;
    if (b.la) {
      throw b.ka;
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
    function f(g) {
      g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e);
    }
    f(a.next());
  });
}
function ta(a) {
  return sa(new qa(new ma(a)));
}
C("Symbol", function(a) {
  function b(f) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new c(d + (f || "") + "_" + e++, f);
  }
  function c(f, g) {
    this.h = f;
    ba(this, "description", {configurable:!0, writable:!0, value:g});
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
C("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
    var d = B[b[c]];
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
C("Promise", function(a) {
  function b(g) {
    this.A = 0;
    this.B = void 0;
    this.h = [];
    this.H = !1;
    var h = this.C();
    try {
      g(h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  }
  function c() {
    this.h = null;
  }
  function d(g) {
    return g instanceof b ? g : new b(function(h) {
      h(g);
    });
  }
  if (a) {
    return a;
  }
  c.prototype.A = function(g) {
    if (null == this.h) {
      this.h = [];
      var h = this;
      this.B(function() {
        h.D();
      });
    }
    this.h.push(g);
  };
  var e = B.setTimeout;
  c.prototype.B = function(g) {
    e(g, 0);
  };
  c.prototype.D = function() {
    for (; this.h && this.h.length;) {
      var g = this.h;
      this.h = [];
      for (var h = 0; h < g.length; ++h) {
        var k = g[h];
        g[h] = null;
        try {
          k();
        } catch (l) {
          this.C(l);
        }
      }
    }
    this.h = null;
  };
  c.prototype.C = function(g) {
    this.B(function() {
      throw g;
    });
  };
  b.prototype.C = function() {
    function g(l) {
      return function(m) {
        k || (k = !0, l.call(h, m));
      };
    }
    var h = this, k = !1;
    return {resolve:g(this.fa), reject:g(this.D)};
  };
  b.prototype.fa = function(g) {
    if (g === this) {
      this.D(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (g instanceof b) {
        this.ha(g);
      } else {
        a: {
          switch(typeof g) {
            case "object":
              var h = null != g;
              break a;
            case "function":
              h = !0;
              break a;
            default:
              h = !1;
          }
        }
        h ? this.ea(g) : this.G(g);
      }
    }
  };
  b.prototype.ea = function(g) {
    var h = void 0;
    try {
      h = g.then;
    } catch (k) {
      this.D(k);
      return;
    }
    "function" == typeof h ? this.ia(h, g) : this.G(g);
  };
  b.prototype.D = function(g) {
    this.M(2, g);
  };
  b.prototype.G = function(g) {
    this.M(1, g);
  };
  b.prototype.M = function(g, h) {
    if (0 != this.A) {
      throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.A);
    }
    this.A = g;
    this.B = h;
    2 === this.A && this.ga();
    this.N();
  };
  b.prototype.ga = function() {
    var g = this;
    e(function() {
      if (g.T()) {
        var h = B.console;
        "undefined" !== typeof h && h.error(g.B);
      }
    }, 1);
  };
  b.prototype.T = function() {
    if (this.H) {
      return !1;
    }
    var g = B.CustomEvent, h = B.Event, k = B.dispatchEvent;
    if ("undefined" === typeof k) {
      return !0;
    }
    "function" === typeof g ? g = new g("unhandledrejection", {cancelable:!0}) : "function" === typeof h ? g = new h("unhandledrejection", {cancelable:!0}) : (g = B.document.createEvent("CustomEvent"), g.initCustomEvent("unhandledrejection", !1, !0, g));
    g.promise = this;
    g.reason = this.B;
    return k(g);
  };
  b.prototype.N = function() {
    if (null != this.h) {
      for (var g = 0; g < this.h.length; ++g) {
        f.A(this.h[g]);
      }
      this.h = null;
    }
  };
  var f = new c();
  b.prototype.ha = function(g) {
    var h = this.C();
    g.U(h.resolve, h.reject);
  };
  b.prototype.ia = function(g, h) {
    var k = this.C();
    try {
      g.call(h, k.resolve, k.reject);
    } catch (l) {
      k.reject(l);
    }
  };
  b.prototype.then = function(g, h) {
    function k(p, q) {
      return "function" == typeof p ? function(r) {
        try {
          l(p(r));
        } catch (x) {
          m(x);
        }
      } : q;
    }
    var l, m, n = new b(function(p, q) {
      l = p;
      m = q;
    });
    this.U(k(g, l), k(h, m));
    return n;
  };
  b.prototype.catch = function(g) {
    return this.then(void 0, g);
  };
  b.prototype.U = function(g, h) {
    function k() {
      switch(l.A) {
        case 1:
          g(l.B);
          break;
        case 2:
          h(l.B);
          break;
        default:
          throw Error("Unexpected state: " + l.A);
      }
    }
    var l = this;
    null == this.h ? f.A(k) : this.h.push(k);
    this.H = !0;
  };
  b.resolve = d;
  b.reject = function(g) {
    return new b(function(h, k) {
      k(g);
    });
  };
  b.race = function(g) {
    return new b(function(h, k) {
      for (var l = w(g), m = l.next(); !m.done; m = l.next()) {
        d(m.value).U(h, k);
      }
    });
  };
  b.all = function(g) {
    var h = w(g), k = h.next();
    return k.done ? d([]) : new b(function(l, m) {
      function n(r) {
        return function(x) {
          p[r] = x;
          q--;
          0 == q && l(p);
        };
      }
      var p = [], q = 0;
      do {
        p.push(void 0), q++, d(k.value).U(n(p.length - 1), m), k = h.next();
      } while (!k.done);
    });
  };
  return b;
});
function va(a, b) {
  a instanceof String && (a += "");
  var c = 0, d = !1, e = {next:function() {
    if (!d && c < a.length) {
      var f = c++;
      return {value:b(f, a[f]), done:!1};
    }
    d = !0;
    return {done:!0, value:void 0};
  }};
  e[Symbol.iterator] = function() {
    return e;
  };
  return e;
}
C("Array.prototype.values", function(a) {
  return a ? a : function() {
    return va(this, function(b, c) {
      return c;
    });
  };
});
function F(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
C("WeakMap", function(a) {
  function b(k) {
    this.h = (h += Math.random() + 1).toString();
    if (k) {
      k = w(k);
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
    if (!F(k, g)) {
      var l = new c();
      ba(k, g, {value:l});
    }
  }
  function f(k) {
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
  var g = "$jscomp_hidden_" + Math.random();
  f("freeze");
  f("preventExtensions");
  f("seal");
  var h = 0;
  b.prototype.set = function(k, l) {
    if (!d(k)) {
      throw Error("Invalid WeakMap key");
    }
    e(k);
    if (!F(k, g)) {
      throw Error("WeakMap key fail: " + k);
    }
    k[g][this.h] = l;
    return this;
  };
  b.prototype.get = function(k) {
    return d(k) && F(k, g) ? k[g][this.h] : void 0;
  };
  b.prototype.has = function(k) {
    return d(k) && F(k, g) && F(k[g], this.h);
  };
  b.prototype.delete = function(k) {
    return d(k) && F(k, g) && F(k[g], this.h) ? delete k[g][this.h] : !1;
  };
  return b;
});
C("Map", function(a) {
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
    "object" == l || "function" == l ? f.has(k) ? l = f.get(k) : (l = "" + ++g, f.set(k, l)) : l = "p_" + k;
    var m = h[0][l];
    if (m && F(h[0], l)) {
      for (h = 0; h < m.length; h++) {
        var n = m[h];
        if (k !== k && n.key !== n.key || k === n.key) {
          return {id:l, list:m, index:h, F:n};
        }
      }
    }
    return {id:l, list:m, index:-1, F:void 0};
  }
  function e(h) {
    this[0] = {};
    this[1] = b();
    this.size = 0;
    if (h) {
      h = w(h);
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
      var h = Object.seal({x:4}), k = new a(w([[h, "s"]]));
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
  var f = new WeakMap();
  e.prototype.set = function(h, k) {
    h = 0 === h ? 0 : h;
    var l = d(this, h);
    l.list || (l.list = this[0][l.id] = []);
    l.F ? l.F.value = k : (l.F = {next:this[1], K:this[1].K, head:this[1], key:h, value:k}, l.list.push(l.F), this[1].K.next = l.F, this[1].K = l.F, this.size++);
    return this;
  };
  e.prototype.delete = function(h) {
    h = d(this, h);
    return h.F && h.list ? (h.list.splice(h.index, 1), h.list.length || delete this[0][h.id], h.F.K.next = h.F.next, h.F.next.K = h.F.K, h.F.head = null, this.size--, !0) : !1;
  };
  e.prototype.clear = function() {
    this[0] = {};
    this[1] = this[1].K = b();
    this.size = 0;
  };
  e.prototype.has = function(h) {
    return !!d(this, h).F;
  };
  e.prototype.get = function(h) {
    return (h = d(this, h).F) && h.value;
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
  var g = 0;
  return e;
});
C("Array.prototype.keys", function(a) {
  return a ? a : function() {
    return va(this, function(b) {
      return b;
    });
  };
});
C("Set", function(a) {
  function b(c) {
    this.h = new Map();
    if (c) {
      c = w(c);
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
      var c = Object.seal({x:4}), d = new a(w([c]));
      if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({x:4}) != d || 2 != d.size) {
        return !1;
      }
      var e = d.entries(), f = e.next();
      if (f.done || f.value[0] != c || f.value[1] != c) {
        return !1;
      }
      f = e.next();
      return f.done || f.value[0] == c || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : e.next().done;
    } catch (g) {
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
    this.h.forEach(function(f) {
      return c.call(d, f, f, e);
    });
  };
  return b;
});
C("Array.prototype.entries", function(a) {
  return a ? a : function() {
    return va(this, function(b, c) {
      return [b, c];
    });
  };
});
C("Object.is", function(a) {
  return a ? a : function(b, c) {
    return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
  };
});
C("Array.prototype.includes", function(a) {
  return a ? a : function(b, c) {
    var d = this;
    d instanceof String && (d = String(d));
    var e = d.length;
    c = c || 0;
    for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
      var f = d[c];
      if (f === b || Object.is(f, b)) {
        return !0;
      }
    }
    return !1;
  };
});
C("String.prototype.includes", function(a) {
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
C("Array.prototype.flat", function(a) {
  return a ? a : function(b) {
    b = void 0 === b ? 1 : b;
    var c = [];
    Array.prototype.forEach.call(this, function(d) {
      Array.isArray(d) && 0 < b ? (d = Array.prototype.flat.call(d, b - 1), c.push.apply(c, d)) : c.push(d);
    });
    return c;
  };
});
var wa = "function" == typeof Object.assign ? Object.assign : function(a, b) {
  for (var c = 1; c < arguments.length; c++) {
    var d = arguments[c];
    if (d) {
      for (var e in d) {
        F(d, e) && (a[e] = d[e]);
      }
    }
  }
  return a;
};
C("Object.assign", function(a) {
  return a || wa;
});
function I(a, b, c) {
  var d = typeof c, e = typeof a;
  if ("undefined" !== d) {
    if ("undefined" !== e) {
      if (c) {
        if ("function" === e && d === e) {
          return function(f) {
            return a(c(f));
          };
        }
        b = a.constructor;
        if (b === c.constructor) {
          if (b === Array) {
            return c.concat(a);
          }
          if (b === Map) {
            b = new Map(c);
            d = w(a);
            for (e = d.next(); !e.done; e = d.next()) {
              e = e.value, b.set(e[0], e[1]);
            }
            return b;
          }
          if (b === Set) {
            b = new Set(c);
            d = w(a.values());
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
function K(a) {
  return "string" === typeof a;
}
function M(a) {
  return "object" === typeof a;
}
function xa(a) {
  var b = [];
  a = w(a.keys());
  for (var c = a.next(); !c.done; c = a.next()) {
    b.push(c.value);
  }
  return b;
}
function ya(a, b) {
  if (K(b)) {
    a = a[b];
  } else {
    for (var c = 0; a && c < b.length; c++) {
      a = a[b[c]];
    }
  }
  return a;
}
function za(a) {
  for (var b = 0, c = 0, d = void 0; c < a.length; c++) {
    (d = a[c]) && b < d.length && (b = d.length);
  }
  return b;
}
;var Aa = [["\u00aa", "a"], ["\u00b2", "2"], ["\u00b3", "3"], ["\u00b9", "1"], ["\u00ba", "o"], ["\u00bc", "1\u20444"], ["\u00bd", "1\u20442"], ["\u00be", "3\u20444"], ["\u00e0", "a"], ["\u00e1", "a"], ["\u00e2", "a"], ["\u00e3", "a"], ["\u00e4", "a"], ["\u00e5", "a"], ["\u00e7", "c"], ["\u00e8", "e"], ["\u00e9", "e"], ["\u00ea", "e"], ["\u00eb", "e"], ["\u00ec", "i"], ["\u00ed", "i"], ["\u00ee", "i"], ["\u00ef", "i"], ["\u00f1", "n"], ["\u00f2", "o"], ["\u00f3", "o"], ["\u00f4", "o"], ["\u00f5", 
"o"], ["\u00f6", "o"], ["\u00f9", "u"], ["\u00fa", "u"], ["\u00fb", "u"], ["\u00fc", "u"], ["\u00fd", "y"], ["\u00ff", "y"], ["\u0101", "a"], ["\u0103", "a"], ["\u0105", "a"], ["\u0107", "c"], ["\u0109", "c"], ["\u010b", "c"], ["\u010d", "c"], ["\u010f", "d"], ["\u0113", "e"], ["\u0115", "e"], ["\u0117", "e"], ["\u0119", "e"], ["\u011b", "e"], ["\u011d", "g"], ["\u011f", "g"], ["\u0121", "g"], ["\u0123", "g"], ["\u0125", "h"], ["\u0129", "i"], ["\u012b", "i"], ["\u012d", "i"], ["\u012f", "i"], ["\u0133", 
"ij"], ["\u0135", "j"], ["\u0137", "k"], ["\u013a", "l"], ["\u013c", "l"], ["\u013e", "l"], ["\u0140", "l"], ["\u0144", "n"], ["\u0146", "n"], ["\u0148", "n"], ["\u0149", "n"], ["\u014d", "o"], ["\u014f", "o"], ["\u0151", "o"], ["\u0155", "r"], ["\u0157", "r"], ["\u0159", "r"], ["\u015b", "s"], ["\u015d", "s"], ["\u015f", "s"], ["\u0161", "s"], ["\u0163", "t"], ["\u0165", "t"], ["\u0169", "u"], ["\u016b", "u"], ["\u016d", "u"], ["\u016f", "u"], ["\u0171", "u"], ["\u0173", "u"], ["\u0175", "w"], ["\u0177", 
"y"], ["\u017a", "z"], ["\u017c", "z"], ["\u017e", "z"], ["\u017f", "s"], ["\u01a1", "o"], ["\u01b0", "u"], ["\u01c6", "dz"], ["\u01c9", "lj"], ["\u01cc", "nj"], ["\u01ce", "a"], ["\u01d0", "i"], ["\u01d2", "o"], ["\u01d4", "u"], ["\u01d6", "u"], ["\u01d8", "u"], ["\u01da", "u"], ["\u01dc", "u"], ["\u01df", "a"], ["\u01e1", "a"], ["\u01e3", "ae"], ["\u00e6", "ae"], ["\u01fd", "ae"], ["\u01e7", "g"], ["\u01e9", "k"], ["\u01eb", "o"], ["\u01ed", "o"], ["\u01ef", "\u0292"], ["\u01f0", "j"], ["\u01f3", 
"dz"], ["\u01f5", "g"], ["\u01f9", "n"], ["\u01fb", "a"], ["\u01ff", "\u00f8"], ["\u0201", "a"], ["\u0203", "a"], ["\u0205", "e"], ["\u0207", "e"], ["\u0209", "i"], ["\u020b", "i"], ["\u020d", "o"], ["\u020f", "o"], ["\u0211", "r"], ["\u0213", "r"], ["\u0215", "u"], ["\u0217", "u"], ["\u0219", "s"], ["\u021b", "t"], ["\u021f", "h"], ["\u0227", "a"], ["\u0229", "e"], ["\u022b", "o"], ["\u022d", "o"], ["\u022f", "o"], ["\u0231", "o"], ["\u0233", "y"], ["\u02b0", "h"], ["\u02b1", "h"], ["\u0266", "h"], 
["\u02b2", "j"], ["\u02b3", "r"], ["\u02b4", "\u0279"], ["\u02b5", "\u027b"], ["\u02b6", "\u0281"], ["\u02b7", "w"], ["\u02b8", "y"], ["\u02e0", "\u0263"], ["\u02e1", "l"], ["\u02e2", "s"], ["\u02e3", "x"], ["\u02e4", "\u0295"], ["\u0390", "\u03b9"], ["\u03ac", "\u03b1"], ["\u03ad", "\u03b5"], ["\u03ae", "\u03b7"], ["\u03af", "\u03b9"], ["\u03b0", "\u03c5"], ["\u03ca", "\u03b9"], ["\u03cb", "\u03c5"], ["\u03cc", "\u03bf"], ["\u03cd", "\u03c5"], ["\u03ce", "\u03c9"], ["\u03d0", "\u03b2"], ["\u03d1", 
"\u03b8"], ["\u03d2", "\u03a5"], ["\u03d3", "\u03a5"], ["\u03d4", "\u03a5"], ["\u03d5", "\u03c6"], ["\u03d6", "\u03c0"], ["\u03f0", "\u03ba"], ["\u03f1", "\u03c1"], ["\u03f2", "\u03c2"], ["\u03f5", "\u03b5"], ["\u0439", "\u0438"], ["\u0450", "\u0435"], ["\u0451", "\u0435"], ["\u0453", "\u0433"], ["\u0457", "\u0456"], ["\u045c", "\u043a"], ["\u045d", "\u0438"], ["\u045e", "\u0443"], ["\u0477", "\u0475"], ["\u04c2", "\u0436"], ["\u04d1", "\u0430"], ["\u04d3", "\u0430"], ["\u04d7", "\u0435"], ["\u04db", 
"\u04d9"], ["\u04dd", "\u0436"], ["\u04df", "\u0437"], ["\u04e3", "\u0438"], ["\u04e5", "\u0438"], ["\u04e7", "\u043e"], ["\u04eb", "\u04e9"], ["\u04ed", "\u044d"], ["\u04ef", "\u0443"], ["\u04f1", "\u0443"], ["\u04f3", "\u0443"], ["\u04f5", "\u0447"]];
var Ba = /[^\p{L}\p{N}]+/u, Ca = /(\d{3})/g, Da = /(\D)(\d{3})/g, Ea = /(\d{3})(\D)/g, Fa = "".normalize && /[\u0300-\u036f]/g;
function Ga(a) {
  a = void 0 === a ? {} : a;
  if (!this || this.constructor !== Ga) {
    var b = Function.prototype.bind, c = b.apply, d = [null], e = d.concat;
    if (arguments instanceof Array) {
      var f = arguments;
    } else {
      f = w(arguments);
      for (var g, h = []; !(g = f.next()).done;) {
        h.push(g.value);
      }
      f = h;
    }
    return new (c.call(b, Ga, e.call(d, f)))();
  }
  if (arguments.length) {
    for (b = 0; b < arguments.length; b++) {
      this.assign(arguments[b]);
    }
  } else {
    this.assign(a);
  }
}
u = Ga.prototype;
u.assign = function(a) {
  this.normalize = I(a.normalize, !0, this.normalize);
  var b = a.include, c = b || a.exclude || a.split;
  if (c || "" === c) {
    if ("object" === typeof c && c.constructor !== RegExp) {
      var d = "";
      var e = !b;
      b || (d += "\\p{Z}");
      c.letter && (d += "\\p{L}");
      c.number && (d += "\\p{N}", e = !!b);
      c.symbol && (d += "\\p{S}");
      c.punctuation && (d += "\\p{P}");
      c.control && (d += "\\p{C}");
      if (c = c.char) {
        d += "object" === typeof c ? c.join("") : c;
      }
      try {
        this.split = new RegExp("[" + (b ? "^" : "") + d + "]+", "u");
      } catch (f) {
        console.error("Your split configuration:", c, "is not supported on this platform. It falls back to using simple whitespace splitter instead: /s+/."), this.split = /\s+/;
      }
    } else {
      this.split = c, e = !1 === c || 2 > "a1a".split(c).length;
    }
    this.numeric = I(a.numeric, e);
  } else {
    try {
      this.split = I(this.split, Ba);
    } catch (f) {
      console.warn("This platform does not support unicode regex. It falls back to using simple whitespace splitter instead: /s+/."), this.split = /\s+/;
    }
    this.numeric = I(a.numeric, I(this.numeric, !0));
  }
  this.prepare = I(a.prepare, null, this.prepare);
  this.finalize = I(a.finalize, null, this.finalize);
  Fa || (this.mapper = new Map(Aa));
  this.rtl = I(a.rtl, !1, this.rtl);
  this.dedupe = I(a.dedupe, !1, this.dedupe);
  this.filter = I((c = a.filter) && new Set(c), null, this.filter);
  this.matcher = I((c = a.matcher) && new Map(c), null, this.matcher);
  this.mapper = I((c = a.mapper) && new Map(c), null, this.mapper);
  this.stemmer = I((c = a.stemmer) && new Map(c), null, this.stemmer);
  this.replacer = I(a.replacer, null, this.replacer);
  this.minlength = I(a.minlength, 1, this.minlength);
  this.maxlength = I(a.maxlength, 0, this.maxlength);
  if (this.cache = c = I(a.cache, !0, this.cache)) {
    this.D = null, this.T = "number" === typeof c ? c : 2e5, this.B = new Map(), this.C = new Map(), this.H = this.G = 128;
  }
  this.h = "";
  this.M = null;
  this.A = "";
  this.N = null;
  if (this.matcher) {
    for (a = w(this.matcher.keys()), b = a.next(); !b.done; b = a.next()) {
      this.h += (this.h ? "|" : "") + b.value;
    }
  }
  if (this.stemmer) {
    for (a = w(this.stemmer.keys()), b = a.next(); !b.done; b = a.next()) {
      this.A += (this.A ? "|" : "") + b.value;
    }
  }
  return this;
};
u.addStemmer = function(a, b) {
  this.stemmer || (this.stemmer = new Map());
  this.stemmer.set(a, b);
  this.A += (this.A ? "|" : "") + a;
  this.N = null;
  this.cache && N(this);
  return this;
};
u.addFilter = function(a) {
  this.filter || (this.filter = new Set());
  this.filter.add(a);
  this.cache && N(this);
  return this;
};
u.addMapper = function(a, b) {
  if ("object" === typeof a) {
    return this.addReplacer(a, b);
  }
  if (1 < a.length) {
    return this.addMatcher(a, b);
  }
  this.mapper || (this.mapper = new Map());
  this.mapper.set(a, b);
  this.cache && N(this);
  return this;
};
u.addMatcher = function(a, b) {
  if ("object" === typeof a) {
    return this.addReplacer(a, b);
  }
  if (2 > a.length && (this.dedupe || this.mapper)) {
    return this.addMapper(a, b);
  }
  this.matcher || (this.matcher = new Map());
  this.matcher.set(a, b);
  this.h += (this.h ? "|" : "") + a;
  this.M = null;
  this.cache && N(this);
  return this;
};
u.addReplacer = function(a, b) {
  if ("string" === typeof a) {
    return this.addMatcher(a, b);
  }
  this.replacer || (this.replacer = []);
  this.replacer.push(a, b);
  this.cache && N(this);
  return this;
};
u.encode = function(a) {
  var b = this;
  if (this.cache && a.length <= this.G) {
    if (this.D) {
      if (this.B.has(a)) {
        return this.B.get(a);
      }
    } else {
      this.D = setTimeout(N, 50, this);
    }
  }
  this.normalize && ("function" === typeof this.normalize ? a = this.normalize(a) : a = Fa ? a.normalize("NFKD").replace(Fa, "").toLowerCase() : a.toLowerCase());
  this.prepare && (a = this.prepare(a));
  this.numeric && 3 < a.length && (a = a.replace(Da, "$1 $2").replace(Ea, "$1 $2").replace(Ca, "$1 "));
  for (var c = !(this.dedupe || this.mapper || this.filter || this.matcher || this.stemmer || this.replacer), d = [], e = this.split || "" === this.split ? a.split(this.split) : a, f = 0, g = void 0, h = void 0; f < e.length; f++) {
    if ((g = h = e[f]) && !(g.length < this.minlength)) {
      if (c) {
        d.push(g);
      } else {
        if (!this.filter || !this.filter.has(g)) {
          if (this.cache && g.length <= this.H) {
            if (this.D) {
              var k = this.C.get(g);
              if (k || "" === k) {
                k && d.push(k);
                continue;
              }
            } else {
              this.D = setTimeout(N, 50, this);
            }
          }
          this.stemmer && 2 < g.length && (this.N || (this.N = new RegExp("(?!^)(" + this.A + ")$")), g = g.replace(this.N, function(q) {
            return b.stemmer.get(q);
          }), g.length < this.minlength || this.filter && this.filter.has(g)) && (g = "");
          if (g && (this.mapper || this.dedupe && 1 < g.length)) {
            k = "";
            for (var l = 0, m = "", n = void 0, p = void 0; l < g.length; l++) {
              n = g.charAt(l), n === m && this.dedupe || ((p = this.mapper && this.mapper.get(n)) || "" === p ? p === m && this.dedupe || !(m = p) || (k += p) : k += m = n);
            }
            g = k;
          }
          this.matcher && 1 < g.length && (this.M || (this.M = new RegExp("(" + this.h + ")", "g")), g = g.replace(this.M, function(q) {
            return b.matcher.get(q);
          }));
          if (g && this.replacer) {
            for (k = 0; g && k < this.replacer.length; k += 2) {
              g = g.replace(this.replacer[k], this.replacer[k + 1]);
            }
          }
          this.cache && h.length <= this.H && (this.C.set(h, g), this.C.size > this.T && (this.C.clear(), this.H = this.H / 1.1 | 0));
          g && d.push(g);
        }
      }
    }
  }
  this.finalize && (d = this.finalize(d) || d);
  this.cache && a.length <= this.G && (this.B.set(a, d), this.B.size > this.T && (this.B.clear(), this.G = this.G / 1.1 | 0));
  return d;
};
function N(a) {
  a.D = null;
  a.B.clear();
  a.C.clear();
}
;var O, P;
function Ha(a) {
  var b, c, d, e, f, g;
  return ta(function(h) {
    switch(h.h) {
      case 1:
        a = a.data;
        b = a.task;
        c = a.id;
        d = a.args;
        switch(b) {
          case "init":
            P = a.options || {};
            (e = a.factory) ? (Function("return " + e)()(self), O = new self.FlexSearch.Index(P), delete self.FlexSearch) : O = new S(P);
            postMessage({id:c});
            break;
          default:
            h.h = 2;
            return;
        }h.h = 0;
        break;
      case 2:
        if ("export" === b) {
          if (!P.export || "function" !== typeof P.export) {
            throw Error('Either no extern configuration provided for the Worker-Index or no method was defined on the config property "export".');
          }
          d[1] ? (d[0] = P.export, d[2] = 0, d[3] = 1) : d = null;
        }
        if ("import" === b) {
          if (!P.import || "function" !== typeof P.import) {
            throw Error('Either no extern configuration provided for the Worker-Index or no method was defined on the config property "import".');
          }
          if (!d[0]) {
            h.h = 5;
            break;
          }
          return E(h, P.import.call(O, d[0]), 9);
        }
        f = d && O[b].apply(O, d);
        if (!f || !f.then) {
          h.h = 5;
          break;
        }
        return E(h, f, 7);
      case 7:
        f = h.D;
        h.h = 5;
        break;
      case 9:
        g = h.D, O.import(d[0], g);
      case 5:
        postMessage("search" === b ? {id:c, msg:f} : {id:c}), h.h = 0;
    }
  });
}
;function Ia(a) {
  La.call(a, "add");
  La.call(a, "append");
  La.call(a, "search");
  La.call(a, "update");
  La.call(a, "remove");
}
var Ma, Na, Oa;
function Pa() {
  Ma = Oa = 0;
}
function La(a) {
  this[a + "Async"] = function() {
    var b = arguments, c = b[b.length - 1];
    if ("function" === typeof c) {
      var d = c;
      delete b[b.length - 1];
    }
    Ma ? Oa || (Oa = Date.now() - Na >= this.priority * this.priority * 3) : (Ma = setTimeout(Pa, 0), Na = Date.now());
    if (Oa) {
      var e = this;
      return new Promise(function(g) {
        setTimeout(function() {
          g(e[a + "Async"].apply(e, b));
        }, 0);
      });
    }
    var f = this[a].apply(this, b);
    c = f.then ? f : new Promise(function(g) {
      return g(f);
    });
    d && c.then(d);
    return c;
  };
}
;var Qa = 0;
function Ra(a) {
  function b(g) {
    function h(k) {
      k = k.data || k;
      var l = k.id, m = l && e.h[l];
      m && (m(k.msg), delete e.h[l]);
    }
    this.worker = g;
    this.h = J();
    if (this.worker) {
      d ? this.worker.on("message", h) : this.worker.onmessage = h;
      if (a.config) {
        return new Promise(function(k) {
          e.h[++Qa] = function() {
            k(e);
            1e9 < Qa && (Qa = 0);
          };
          e.worker.postMessage({id:Qa, task:"init", factory:c, options:a});
        });
      }
      this.worker.postMessage({task:"init", factory:c, options:a});
      this.priority = a.priority || 4;
      return this;
    }
  }
  a = void 0 === a ? {} : a;
  if (!this || this.constructor !== Ra) {
    return new Ra(a);
  }
  var c = "undefined" !== typeof self ? self._factory : "undefined" !== typeof window ? window._factory : null;
  c && (c = c.toString());
  var d = "undefined" === typeof window, e = this, f = Sa(c, d, a.worker);
  return f.then ? f.then(function(g) {
    return b.call(e, g);
  }) : b.call(this, f);
}
T("add");
T("append");
T("search");
T("update");
T("remove");
T("clear");
T("export");
T("import");
Ia(Ra.prototype);
function T(a) {
  Ra.prototype[a] = function() {
    var b = this, c = [].slice.call(arguments), d = c[c.length - 1];
    if ("function" === typeof d) {
      var e = d;
      c.pop();
    }
    d = new Promise(function(f) {
      "export" === a && "function" === typeof c[0] && (c[0] = null);
      b.h[++Qa] = f;
      b.worker.postMessage({task:a, id:Qa, args:c});
    });
    return e ? (d.then(e), this) : d;
  };
}
function Sa(a, b, c) {
  return b ? "undefined" !== typeof module ? new(require("worker_threads")["Worker"])(__dirname+"/node/node.js") : import("worker_threads").then(function(worker){return new worker["Worker"]((1,eval)("import.meta.dirname")+"/node/node.mjs")}) : a ? new window.Worker(URL.createObjectURL(new Blob(["onmessage=" + Ha.toString()], {type:"text/javascript"}))) : new window.Worker("string" === typeof c ? c : (0,eval)("import.meta.url").replace("/worker.js", "/worker/worker.js").replace("flexsearch.bundle.module.min.js", 
  "module/worker/worker.js"), {type:"module"});
}
;function Ta(a, b) {
  b = void 0 === b ? 0 : b;
  var c = [], d = [];
  b && (b = 250000 / b * 5000 | 0);
  a = w(a.entries());
  for (var e = a.next(); !e.done; e = a.next()) {
    d.push(e.value), d.length === b && (c.push(d), d = []);
  }
  d.length && c.push(d);
  return c;
}
function Ua(a, b) {
  b || (b = new Map());
  for (var c = 0, d; c < a.length; c++) {
    d = a[c], b.set(d[0], d[1]);
  }
  return b;
}
function Va(a, b) {
  b = void 0 === b ? 0 : b;
  var c = [], d = [];
  b && (b = 250000 / b * 1000 | 0);
  a = w(a.entries());
  for (var e = a.next(); !e.done; e = a.next()) {
    e = e.value, d.push([e[0], Ta(e[1])[0]]), d.length === b && (c.push(d), d = []);
  }
  d.length && c.push(d);
  return c;
}
function Wa(a, b) {
  b || (b = new Map());
  for (var c = 0, d, e; c < a.length; c++) {
    d = a[c], e = b.get(d[0]), b.set(d[0], Ua(d[1], e));
  }
  return b;
}
function Xa(a) {
  var b = [], c = [];
  a = w(a.keys());
  for (var d = a.next(); !d.done; d = a.next()) {
    c.push(d.value), 250000 === c.length && (b.push(c), c = []);
  }
  c.length && b.push(c);
  return b;
}
function Ya(a, b) {
  b || (b = new Set());
  for (var c = 0; c < a.length; c++) {
    b.add(a[c]);
  }
  return b;
}
function Za(a, b, c, d, e, f, g) {
  g = void 0 === g ? 0 : g;
  var h = d && d.constructor === Array, k = h ? d.shift() : d;
  if (!k) {
    return this.export(a, b, e, f + 1);
  }
  if ((k = a((b ? b + "." : "") + (g + 1) + "." + c, JSON.stringify(k))) && k.then) {
    var l = this;
    return k.then(function() {
      return Za.call(l, a, b, c, h ? d : null, e, f, g + 1);
    });
  }
  return Za.call(this, a, b, c, h ? d : null, e, f, g + 1);
}
;function $a(a, b, c, d) {
  for (var e = [], f = 0, g; f < a.index.length; f++) {
    if (g = a.index[f], b >= g.length) {
      b -= g.length;
    } else {
      b = g[d ? "splice" : "slice"](b, c);
      if (g = b.length) {
        if (e = e.length ? e.concat(b) : b, c -= g, d && (a.length -= g), !c) {
          break;
        }
      }
      b = 0;
    }
  }
  return e;
}
function ab(a) {
  if (!this) {
    return new ab(a);
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
        for (var f = 0, g = 0, h, k; g < b.index.length; g++) {
          h = b.index[g];
          k = h.indexOf(e);
          if (0 <= k) {
            return f + k;
          }
          f += h.length;
        }
        return -1;
      };
    }
    if ("includes" === d) {
      return function(e) {
        for (var f = 0; f < b.index.length; f++) {
          if (b.index[f].includes(e)) {
            return !0;
          }
        }
        return !1;
      };
    }
    if ("slice" === d) {
      return function(e, f) {
        return $a(b, e || 0, f || b.length, !1);
      };
    }
    if ("splice" === d) {
      return function(e, f) {
        return $a(b, e || 0, f || b.length, !0);
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
ab.prototype.clear = function() {
  this.index.length = 0;
};
ab.prototype.destroy = function() {
  this.proxy = this.index = null;
};
ab.prototype.push = function() {
};
function U(a) {
  a = void 0 === a ? 8 : a;
  if (!this) {
    return new U(a);
  }
  this.index = J();
  this.B = [];
  this.size = 0;
  32 < a ? (this.h = bb, this.A = BigInt(a)) : (this.h = cb, this.A = a);
}
U.prototype.get = function(a) {
  var b = this.h(a);
  return (b = this.index[b]) && b.get(a);
};
U.prototype.set = function(a, b) {
  var c = this.h(a), d = this.index[c];
  d ? (c = d.size, d.set(a, b), (c -= d.size) && this.size++) : (this.index[c] = d = new Map([[a, b]]), this.B.push(d));
};
function V(a) {
  a = void 0 === a ? 8 : a;
  if (!this) {
    return new V(a);
  }
  this.index = J();
  this.h = [];
  32 < a ? (this.B = bb, this.A = BigInt(a)) : (this.B = cb, this.A = a);
}
V.prototype.add = function(a) {
  var b = this.B(a), c = this.index[b];
  c ? (b = c.size, c.add(a), (b -= c.size) && this.size++) : (this.index[b] = c = new Set([a]), this.h.push(c));
};
u = U.prototype;
u.has = V.prototype.has = function(a) {
  var b = this.B(a);
  return (b = this.index[b]) && b.has(a);
};
u.delete = V.prototype.delete = function(a) {
  var b = this.B(a);
  (b = this.index[b]) && b.delete(a) && this.size--;
};
u.clear = V.prototype.clear = function() {
  this.index = J();
  this.h = [];
  this.size = 0;
};
u.values = V.prototype.values = function db() {
  var b, c = this, d, e, f;
  return ra(db, function(g) {
    switch(g.h) {
      case 1:
        b = 0;
      case 2:
        if (!(b < c.h.length)) {
          g.h = 0;
          break;
        }
        d = w(c.h[b].values());
        e = d.next();
      case 5:
        if (e.done) {
          b++;
          g.h = 2;
          break;
        }
        f = e.value;
        return E(g, f, 6);
      case 6:
        e = d.next(), g.h = 5;
    }
  });
};
u.keys = V.prototype.keys = function eb() {
  var b, c = this, d, e, f;
  return ra(eb, function(g) {
    switch(g.h) {
      case 1:
        b = 0;
      case 2:
        if (!(b < c.h.length)) {
          g.h = 0;
          break;
        }
        d = w(c.h[b].keys());
        e = d.next();
      case 5:
        if (e.done) {
          b++;
          g.h = 2;
          break;
        }
        f = e.value;
        return E(g, f, 6);
      case 6:
        e = d.next(), g.h = 5;
    }
  });
};
u.entries = V.prototype.entries = function fb() {
  var b, c = this, d, e, f;
  return ra(fb, function(g) {
    switch(g.h) {
      case 1:
        b = 0;
      case 2:
        if (!(b < c.h.length)) {
          g.h = 0;
          break;
        }
        d = w(c.h[b].entries());
        e = d.next();
      case 5:
        if (e.done) {
          b++;
          g.h = 2;
          break;
        }
        f = e.value;
        return E(g, f, 6);
      case 6:
        e = d.next(), g.h = 5;
    }
  });
};
function cb(a) {
  var b = Math.pow(2, this.A) - 1;
  if ("number" == typeof a) {
    return a & b;
  }
  for (var c = 0, d = this.A + 1, e = 0; e < a.length; e++) {
    c = (c * d ^ a.charCodeAt(e)) & b;
  }
  return 32 === this.A ? c + Math.pow(2, 31) : c;
}
function bb() {
  throw Error("The keystore is limited to 32 for EcmaScript5");
}
;W.prototype.add = function(a, b, c) {
  M(a) && (b = a, a = ya(b, this.key));
  if (b && (a || 0 === a)) {
    if (!c && this.reg.has(a)) {
      return this.update(a, b);
    }
    for (var d = 0, e; d < this.field.length; d++) {
      e = this.J[d];
      var f = this.index.get(this.field[d]);
      if ("function" === typeof e) {
        (e = e(b)) && f.add(a, e, !1, !0);
      } else {
        var g = e.R;
        if (!g || g(b)) {
          e.constructor === String ? e = ["" + e] : K(e) && (e = [e]), gb(b, e, this.S, 0, f, a, e[0], c);
        }
      }
    }
    if (this.tag) {
      for (d = 0; d < this.L.length; d++) {
        g = this.L[d];
        var h = this.aa[d];
        f = this.tag.get(h);
        e = J();
        if ("function" === typeof g) {
          if (g = g(b), !g) {
            continue;
          }
        } else {
          var k = g.R;
          if (k && !k(b)) {
            continue;
          }
          g.constructor === String && (g = "" + g);
          g = ya(b, g);
        }
        if (f && g) {
          for (K(g) && (g = [g]), h = 0, k = void 0; h < g.length; h++) {
            var l = g[h];
            if (!e[l]) {
              e[l] = 1;
              var m;
              (m = f.get(l)) ? k = m : f.set(l, k = []);
              if (!c || !k.includes(a)) {
                if (k.length === Math.pow(2, 31) - 1) {
                  m = new ab(k);
                  if (this.fastupdate) {
                    for (var n = w(this.reg.values()), p = n.next(); !p.done; p = n.next()) {
                      p = p.value, p.includes(k) && (p[p.indexOf(k)] = m);
                    }
                  }
                  f.set(l, k = m);
                }
                k.push(a);
                this.fastupdate && ((l = this.reg.get(a)) ? l.push(k) : this.reg.set(a, [k]));
              }
            }
          }
        } else {
          f || console.warn("Tag '" + h + "' was not found");
        }
      }
    }
    if (this.store && (!c || !this.store.has(a))) {
      if (this.I) {
        var q = J();
        for (c = 0; c < this.I.length; c++) {
          if (d = this.I[c], f = d.R, !f || f(b)) {
            f = void 0;
            if ("function" === typeof d) {
              f = d(b);
              if (!f) {
                continue;
              }
              d = [d.ja];
            } else if (K(d) || d.constructor === String) {
              q[d] = b[d];
              continue;
            }
            hb(b, q, d, 0, d[0], f);
          }
        }
      }
      this.store.set(a, q || b);
    }
    this.worker && (this.fastupdate || this.reg.add(a));
  }
  return this;
};
function hb(a, b, c, d, e, f) {
  a = a[e];
  if (d === c.length - 1) {
    b[e] = f || a;
  } else if (a) {
    if (a.constructor === Array) {
      for (b = b[e] = Array(a.length), e = 0; e < a.length; e++) {
        hb(a, b, c, d, e);
      }
    } else {
      b = b[e] || (b[e] = J()), e = c[++d], hb(a, b, c, d, e);
    }
  }
}
function gb(a, b, c, d, e, f, g, h) {
  if (a = a[g]) {
    if (d === b.length - 1) {
      if (a.constructor === Array) {
        if (c[d]) {
          for (b = 0; b < a.length; b++) {
            e.add(f, a[b], !0, !0);
          }
          return;
        }
        a = a.join(" ");
      }
      e.add(f, a, h, !0);
    } else {
      if (a.constructor === Array) {
        for (g = 0; g < a.length; g++) {
          gb(a, b, c, d, e, f, g, h);
        }
      } else {
        g = b[++d], gb(a, b, c, d, e, f, g, h);
      }
    }
  } else {
    e.db && e.remove(f);
  }
}
;function ib(a, b, c, d, e, f, g) {
  var h = a.length, k = [], l;
  var m = J();
  for (var n = 0, p = void 0, q; n < b; n++) {
    for (var r = 0; r < h; r++) {
      if (q = a[r], n < q.length && (p = q[n])) {
        for (var x = 0; x < p.length; x++) {
          q = p[x];
          (l = m[q]) ? m[q]++ : (l = 0, m[q] = 1);
          l = k[l] || (k[l] = []);
          if (!g) {
            var t = n + (r || !e ? 0 : f || 0);
            l = l[t] || (l[t] = []);
          }
          l.push(q);
        }
      }
    }
  }
  if (a = k.length) {
    if (e) {
      k = 1 < k.length ? jb(k, c, d, g, f) : (k = k[0]).length > c || d ? k.slice(d, c + d) : k;
    } else {
      if (a < h) {
        return [];
      }
      k = k[a - 1];
      if (c || d) {
        if (g) {
          if (k.length > c || d) {
            k = k.slice(d, c + d);
          }
        } else {
          e = [];
          for (f = 0; f < k.length; f++) {
            if (g = k[f], g.length > d) {
              d -= g.length;
            } else {
              if (g.length > c || d) {
                g = g.slice(d, c + d), c -= g.length, d && (d -= g.length);
              }
              e.push(g);
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
function jb(a, b, c, d, e) {
  var f = [], g = J(), h = a.length, k;
  if (d) {
    for (e = h - 1; 0 <= e; e--) {
      if (k = (d = a[e]) && d.length) {
        for (h = 0; h < k; h++) {
          var l = d[h];
          if (!g[l]) {
            if (g[l] = 1, c) {
              c--;
            } else {
              if (f.push(l), f.length === b) {
                return f;
              }
            }
          }
        }
      }
    }
  } else {
    for (var m = h - 1, n, p = 0; 0 <= m; m--) {
      n = a[m];
      for (var q = 0; q < n.length; q++) {
        if (k = (d = n[q]) && d.length) {
          for (var r = 0; r < k; r++) {
            if (l = d[r], !g[l]) {
              if (g[l] = 1, c) {
                c--;
              } else {
                var x = (q + (m < h - 1 ? e || 0 : 0)) / (m + 1) | 0;
                (f[x] || (f[x] = [])).push(l);
                if (++p === b) {
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
function kb(a, b, c) {
  for (var d = J(), e = [], f = 0, g; f < b.length; f++) {
    g = b[f];
    for (var h = 0; h < g.length; h++) {
      d[g[h]] = 1;
    }
  }
  if (c) {
    for (b = 0; b < a.length; b++) {
      c = a[b], d[c] && (e.push(c), d[c] = 0);
    }
  } else {
    for (b = 0; b < a.result.length; b++) {
      for (c = a.result[b], g = 0; g < c.length; g++) {
        f = c[g], d[f] && ((e[b] || (e[b] = [])).push(f), d[f] = 0);
      }
    }
  }
  return e;
}
;function lb(a, b, c, d) {
  if (!a.length) {
    return a;
  }
  if (1 === a.length) {
    return a = a[0], a = c || a.length > b ? b ? a.slice(c, c + b) : a.slice(c) : a, d ? X.call(this, a) : a;
  }
  for (var e = [], f = 0, g = void 0, h = void 0; f < a.length; f++) {
    if ((g = a[f]) && (h = g.length)) {
      if (c) {
        if (c >= h) {
          c -= h;
          continue;
        }
        c < h && (g = b ? g.slice(c, c + b) : g.slice(c), h = g.length, c = 0);
      }
      h > b && (g = g.slice(0, b), h = b);
      if (!e.length && h >= b) {
        return d ? X.call(this, g) : g;
      }
      e.push(g);
      b -= h;
      if (!b) {
        break;
      }
    }
  }
  e = 1 < e.length ? [].concat.apply([], e) : e[0];
  return d ? X.call(this, e) : e;
}
;function mb(a, b, c) {
  var d = c[0];
  if (d.then) {
    return Promise.all(c).then(function(q) {
      return a[b].apply(a, q);
    });
  }
  if (d[0] && d[0].index) {
    return a[b].apply(a, d);
  }
  d = [];
  for (var e = [], f = 0, g = 0, h, k, l, m = 0, n = void 0; m < c.length; m++) {
    if (n = c[m]) {
      var p = void 0;
      if (n.constructor === Y) {
        p = n.result;
      } else if (n.constructor === Array) {
        p = n;
      } else {
        if (f = n.limit || 0, g = n.offset || 0, l = n.suggest, k = n.resolve, h = n.enrich && k, n.index) {
          n.resolve = !1, n.enrich = !1, p = n.index.search(n).result, n.resolve = k, n.enrich = h;
        } else if (n.and) {
          p = a.and(n.and);
        } else if (n.or) {
          p = a.or(n.or);
        } else if (n.xor) {
          p = a.xor(n.xor);
        } else if (n.not) {
          p = a.not(n.not);
        } else {
          continue;
        }
      }
      if (p.then) {
        e.push(p);
      } else if (p.length) {
        d[m] = p;
      } else if (!l && ("and" === b || "xor" === b)) {
        d = [];
        break;
      }
    }
  }
  return {W:d, $:e, limit:f, offset:g, enrich:h, resolve:k, suggest:l};
}
;Y.prototype.or = function() {
  var a = mb(this, "or", arguments);
  return nb.call(this, a.W, a.$, a.limit, a.offset, a.enrich, a.resolve);
};
function nb(a, b, c, d, e, f) {
  if (b.length) {
    var g = this;
    return Promise.all(b).then(function(h) {
      a = [];
      for (var k = 0, l = void 0; k < h.length; k++) {
        (l = h[k]).length && (a[k] = l);
      }
      return nb.call(g, a, [], c, d, e, f);
    });
  }
  a.length && (this.result.length && a.push(this.result), 2 > a.length ? this.result = a[0] : (this.result = jb(a, c, d, !1, this.h), d = 0));
  return f ? this.resolve(c, d, e) : this;
}
;Y.prototype.and = function() {
  var a = this.result.length;
  if (!a) {
    var b = arguments[0];
    if (b) {
      a = !!b.suggest;
      var c = b.resolve;
      var d = b.limit;
      var e = b.offset;
      var f = b.enrich && c;
    }
  }
  return a ? (a = mb(this, "and", arguments), ob.call(this, a.W, a.$, a.limit, a.offset, a.enrich, a.resolve, a.suggest)) : c ? this.resolve(d, e, f) : this;
};
function ob(a, b, c, d, e, f, g) {
  if (b.length) {
    var h = this;
    return Promise.all(b).then(function(k) {
      a = [];
      for (var l = 0, m = void 0; l < k.length; l++) {
        (m = k[l]).length && (a[l] = m);
      }
      return ob.call(h, a, [], c, d, e, f, g);
    });
  }
  if (a.length) {
    if (this.result.length && a.unshift(this.result), 2 > a.length) {
      this.result = a[0];
    } else {
      if (b = za(a)) {
        return this.result = ib(a, b, c, d, g, this.h, f), f ? e ? X.call(this.index, this.result) : this.result : this;
      }
      this.result = [];
    }
  } else {
    g || (this.result = a);
  }
  return f ? this.resolve(c, d, e) : this;
}
;Y.prototype.xor = function() {
  var a = mb(this, "xor", arguments);
  return pb.call(this, a.W, a.$, a.limit, a.offset, a.enrich, a.resolve, a.suggest);
};
function pb(a, b, c, d, e, f, g) {
  if (b.length) {
    var h = this;
    return Promise.all(b).then(function(k) {
      a = [];
      for (var l = 0, m = void 0; l < k.length; l++) {
        (m = k[l]).length && (a[l] = m);
      }
      return pb.call(h, a, [], c, d, e, f, g);
    });
  }
  if (a.length) {
    if (this.result.length && a.unshift(this.result), 2 > a.length) {
      this.result = a[0];
    } else {
      return this.result = qb.call(this, a, c, d, f, this.h), f ? e ? X.call(this.index, this.result) : this.result : this;
    }
  } else {
    g || (this.result = a);
  }
  return f ? this.resolve(c, d, e) : this;
}
function qb(a, b, c, d, e) {
  for (var f = [], g = J(), h = 0, k = 0, l; k < a.length; k++) {
    if (l = a[k]) {
      h < l.length && (h = l.length);
      for (var m = 0, n; m < l.length; m++) {
        if (n = l[m]) {
          for (var p = 0, q; p < n.length; p++) {
            q = n[p], g[q] = g[q] ? 2 : 1;
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
            if (q = n[p], 1 === g[q]) {
              if (c) {
                c--;
              } else {
                if (d) {
                  if (f.push(q), f.length === b) {
                    return f;
                  }
                } else {
                  var r = k + (m ? e : 0);
                  f[r] || (f[r] = []);
                  f[r].push(q);
                  if (++l === b) {
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
;Y.prototype.not = function() {
  var a = mb(this, "not", arguments);
  return rb.call(this, a.W, a.$, a.limit, a.offset, a.enrich, a.resolve, a.suggest);
};
function rb(a, b, c, d, e, f, g) {
  if (b.length) {
    var h = this;
    return Promise.all(b).then(function(k) {
      a = [];
      for (var l = 0, m = void 0; l < k.length; l++) {
        (m = k[l]).length && (a[l] = m);
      }
      return rb.call(h, a, [], c, d, e, f, g);
    });
  }
  if (a.length && this.result.length) {
    this.result = sb.call(this, a, c, d, f);
  } else if (f) {
    return this.resolve(c, d, e);
  }
  return f ? e ? X.call(this.index, this.result) : this.result : this;
}
function sb(a, b, c, d) {
  var e = [];
  a = new Set(a.flat().flat());
  for (var f = 0, g, h = 0; f < this.result.length; f++) {
    if (g = this.result[f]) {
      for (var k = 0, l; k < g.length; k++) {
        if (l = g[k], !a.has(l)) {
          if (c) {
            c--;
          } else {
            if (d) {
              if (e.push(l), e.length === b) {
                return e;
              }
            } else {
              if (e[f] || (e[f] = []), e[f].push(l), ++h === b) {
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
  if (!this || this.constructor !== Y) {
    return new Y(a);
  }
  if (a && a.index) {
    return a.resolve = !1, this.index = a.index, this.h = a.boost || 0, this.result = a.index.search(a).result, this;
  }
  this.index = null;
  this.result = a || [];
  this.h = 0;
}
Y.prototype.limit = function(a) {
  if (this.result.length) {
    for (var b = [], c = 0, d; c < this.result.length; c++) {
      if (d = this.result[c]) {
        if (d.length <= a) {
          if (b[c] = d, a -= d.length, !a) {
            break;
          }
        } else {
          b[c] = d.slice(0, a);
          break;
        }
      }
    }
    this.result = b;
  }
  return this;
};
Y.prototype.offset = function(a) {
  if (this.result.length) {
    for (var b = [], c = 0, d; c < this.result.length; c++) {
      if (d = this.result[c]) {
        d.length <= a ? a -= d.length : (b[c] = d.slice(a), a = 0);
      }
    }
    this.result = b;
  }
  return this;
};
Y.prototype.boost = function(a) {
  this.h += a;
  return this;
};
Y.prototype.resolve = function(a, b, c) {
  var d = this.result, e = this.index;
  this.result = this.index = null;
  return d.length ? ("object" === typeof a && (c = a.enrich, b = a.offset, a = a.limit), lb.call(e, d, a || 100, b, c)) : d;
};
J();
W.prototype.search = function(a, b, c, d) {
  c || (!b && M(a) ? (c = a, a = "") : M(b) && (c = b, b = 0));
  var e = [], f = [], g = 0, h = !0;
  if (c) {
    c.constructor === Array && (c = {index:c});
    a = c.query || a;
    var k = c.pluck;
    var l = c.merge;
    var m = k || c.field || (m = c.index) && (m.index ? null : m);
    var n = this.tag && c.tag;
    var p = c.suggest;
    h = !1 !== c.resolve;
    if (!h && !k) {
      if (m = m || this.field) {
        K(m) ? k = m : (m.constructor === Array && 1 === m.length && (m = m[0]), k = m.field || m.index);
      }
      if (!k) {
        throw Error("Apply resolver on document search requires either the option 'pluck' to be set or just select a single field name in your query.");
      }
    }
    this.store && c.enrich && !h && console.warn("Enrich results can only be done on a final resolver task or when calling .resolve({ enrich: true })");
    var q = this.store && c.enrich && h;
    var r = c.highlight && q;
    b = c.limit || b;
    var x = c.offset || 0;
    b || (b = 100);
    if (n && (!this.db || !d)) {
      n.constructor !== Array && (n = [n]);
      for (var t = [], A = 0, z = void 0; A < n.length; A++) {
        z = n[A];
        if (K(z)) {
          throw Error("A tag option can't be a string, instead it needs a { field: tag } format.");
        }
        if (z.field && z.tag) {
          var v = z.tag;
          if (v.constructor === Array) {
            for (var y = 0; y < v.length; y++) {
              t.push(z.field, v[y]);
            }
          } else {
            t.push(z.field, v);
          }
        } else {
          v = Object.keys(z);
          y = 0;
          for (var D = void 0, G = void 0; y < v.length; y++) {
            if (D = v[y], G = z[D], G.constructor === Array) {
              for (var H = 0; H < G.length; H++) {
                t.push(D, G[H]);
              }
            } else {
              t.push(D, G);
            }
          }
        }
      }
      if (!t.length) {
        throw Error("Your tag definition within the search options is probably wrong. No valid tags found.");
      }
      n = t;
      if (!a) {
        h = [];
        if (t.length) {
          for (f = 0; f < t.length; f += 2) {
            k = void 0;
            if (this.db) {
              k = this.index.get(t[f]);
              if (!k) {
                console.warn("Tag '" + t[f] + ":" + t[f + 1] + "' will be skipped because there is no field '" + t[f] + "'.");
                continue;
              }
              h.push(k = k.db.tag(t[f + 1], b, x, q));
            } else {
              k = tb.call(this, t[f], t[f + 1], b, x, q);
            }
            e.push({field:t[f], tag:t[f + 1], result:k});
          }
        }
        return h.length ? Promise.all(h).then(function(Q) {
          for (var R = 0; R < Q.length; R++) {
            e[R].result = Q[R];
          }
          return e;
        }) : e;
      }
    }
    m && m.constructor !== Array && (m = [m]);
  }
  m || (m = this.field);
  t = !d && (this.worker || this.db) && [];
  A = 0;
  for (y = z = v = void 0; A < m.length; A++) {
    if (z = m[A], !this.db || !this.tag || this.J[A]) {
      v = void 0;
      K(z) || (v = z, z = v.field, a = v.query || a, b = v.limit || b, x = v.offset || x, p = v.suggest || p, q = this.store && (v.enrich || q));
      if (d) {
        v = d[A];
      } else {
        y = v || c;
        v = this.index.get(z);
        if (n) {
          if (this.db) {
            y.tag = n;
            var Ja = v.db.support_tag_search;
            y.field = m;
          }
          Ja || (y.enrich = !1);
        }
        if (t) {
          t[A] = v.search(a, b, y);
          y && q && (y.enrich = q);
          continue;
        } else {
          v = v.search(a, b, y), y && q && (y.enrich = q);
        }
      }
      y = v && (h ? v.length : v.result.length);
      if (n && y) {
        D = [];
        G = 0;
        if (this.db && d) {
          if (!Ja) {
            for (H = m.length; H < d.length; H++) {
              var L = d[H];
              if (L && L.length) {
                G++, D.push(L);
              } else if (!p) {
                return h ? e : new Y(e);
              }
            }
          }
        } else {
          H = 0;
          for (var Wb = L = void 0; H < n.length; H += 2) {
            L = this.tag.get(n[H]);
            if (!L) {
              if (console.warn("Tag '" + n[H] + ":" + n[H + 1] + "' will be skipped because there is no field '" + n[H] + "'."), p) {
                continue;
              } else {
                return h ? e : new Y(e);
              }
            }
            if (Wb = (L = L && L.get(n[H + 1])) && L.length) {
              G++, D.push(L);
            } else if (!p) {
              return h ? e : new Y(e);
            }
          }
        }
        if (G) {
          v = kb(v, D, h);
          y = v.length;
          if (!y && !p) {
            return h ? v : new Y(v);
          }
          G--;
        }
      }
      if (y) {
        f[g] = z, e.push(v), g++;
      } else if (1 === m.length) {
        return h ? e : new Y(e);
      }
    }
  }
  if (t) {
    if (this.db && n && n.length && !Ja) {
      for (q = 0; q < n.length; q += 2) {
        f = this.index.get(n[q]);
        if (!f) {
          if (console.warn("Tag '" + n[q] + ":" + n[q + 1] + "' was not found because there is no field '" + n[q] + "'."), p) {
            continue;
          } else {
            return h ? e : new Y(e);
          }
        }
        t.push(f.db.tag(n[q + 1], b, x, !1));
      }
    }
    var Xb = this;
    return Promise.all(t).then(function(Q) {
      return Q.length ? Xb.search(a, b, c, Q) : Q;
    });
  }
  if (!g) {
    return h ? e : new Y(e);
  }
  if (k && (!q || !this.store)) {
    return e[0];
  }
  t = [];
  x = 0;
  for (p = void 0; x < f.length; x++) {
    p = e[x];
    q && p.length && !p[0].doc && (this.db ? t.push(p = this.index.get(this.field[0]).db.enrich(p)) : p = X.call(this, p));
    if (k) {
      return h ? p : new Y(p);
    }
    e[x] = {field:f[x], result:p};
  }
  if (q && this.db && t.length) {
    var Ka = this;
    return Promise.all(t).then(function(Q) {
      for (var R = 0; R < Q.length; R++) {
        e[R].result = Q[R];
      }
      return l ? ub(e, b) : r ? vb(e, a, Ka.index, Ka.field, Ka.J, r) : e;
    });
  }
  return l ? ub(e, b) : r ? vb(e, a, this.index, this.field, this.J, r) : e;
};
function vb(a, b, c, d, e, f) {
  for (var g, h, k, l = 0, m, n, p; l < a.length; l++) {
    for (m = a[l].result, n = a[l].field, k = c.get(n), p = k.encoder, k = k.tokenize, n = e[d.indexOf(n)], p !== g && (g = p, h = g.encode(b)), p = 0; p < m.length; p++) {
      var q = "", r = ya(m[p].doc, n), x = g.encode(r);
      r = r.split(g.split);
      for (var t = 0, A, z; t < x.length; t++) {
        A = x[t];
        z = r[t];
        for (var v = void 0, y = 0, D; y < h.length; y++) {
          if (D = h[y], "strict" === k) {
            if (A === D) {
              q += (q ? " " : "") + f.replace("$1", z);
              v = !0;
              break;
            }
          } else {
            var G = A.indexOf(D);
            if (-1 < G) {
              q += (q ? " " : "") + z.substring(0, G) + f.replace("$1", z.substring(G, D.length)) + z.substring(G + D.length);
              v = !0;
              break;
            }
          }
        }
        v || (q += (q ? " " : "") + r[t]);
      }
      m[p].highlight = q;
    }
  }
  return a;
}
function ub(a, b) {
  for (var c = [], d = J(), e = 0, f, g; e < a.length; e++) {
    f = a[e];
    g = f.result;
    for (var h = 0, k, l, m; h < g.length; h++) {
      if (l = g[h], "object" !== typeof l && (l = {id:l}), k = l.id, m = d[k]) {
        m.push(f.field);
      } else {
        if (c.length === b) {
          return c;
        }
        l.field = d[k] = [f.field];
        c.push(l);
      }
    }
  }
  return c;
}
function tb(a, b, c, d, e) {
  var f = this.tag.get(a);
  if (!f) {
    return console.warn("Tag '" + a + "' was not found"), [];
  }
  if ((a = (f = f && f.get(b)) && f.length - d) && 0 < a) {
    if (a > c || d) {
      f = f.slice(d, d + c);
    }
    e && (f = X.call(this, f));
    return f;
  }
}
function X(a) {
  if (!this || !this.store) {
    return a;
  }
  for (var b = Array(a.length), c = 0, d; c < a.length; c++) {
    d = a[c], b[c] = {id:d, doc:this.store.get(d)};
  }
  return b;
}
;function W(a) {
  if (!this || this.constructor !== W) {
    return new W(a);
  }
  var b = a.document || a.doc || a, c, d;
  this.J = [];
  this.field = [];
  this.S = [];
  this.key = (c = b.key || b.id) && wb(c, this.S) || "id";
  (d = a.keystore || 0) && (this.keystore = d);
  this.fastupdate = !!a.fastupdate;
  this.reg = !this.fastupdate || a.worker || a.db ? d ? new V(d) : new Set() : d ? new U(d) : new Map();
  this.I = (c = b.store || null) && c && !0 !== c && [];
  this.store = c && (d ? new U(d) : new Map());
  this.cache = (c = a.cache || null) && new Z(c);
  a.cache = !1;
  this.worker = a.worker;
  this.priority = a.priority || 4;
  this.index = xb.call(this, a, b);
  this.tag = null;
  if (c = b.tag) {
    if ("string" === typeof c && (c = [c]), c.length) {
      this.tag = new Map();
      this.L = [];
      this.aa = [];
      b = 0;
      for (var e = d = void 0; b < c.length; b++) {
        d = c[b];
        e = d.field || d;
        if (!e) {
          throw Error("The tag field from the document descriptor is undefined.");
        }
        d.custom ? this.L[b] = d.custom : (this.L[b] = wb(e, this.S), d.filter && ("string" === typeof this.L[b] && (this.L[b] = new String(this.L[b])), this.L[b].R = d.filter));
        this.aa[b] = e;
        this.tag.set(e, new Map());
      }
    }
  }
  if (this.worker) {
    this.fastupdate = !1;
    a = [];
    c = w(this.index.values());
    for (b = c.next(); !b.done; b = c.next()) {
      b = b.value, b.then && a.push(b);
    }
    if (a.length) {
      var f = this;
      return Promise.all(a).then(function(g) {
        for (var h = 0, k = w(f.index.entries()), l = k.next(); !l.done; l = k.next()) {
          l = l.value;
          var m = l[0];
          l[1].then && f.index.set(m, g[h++]);
        }
        return f;
      });
    }
  } else {
    a.db && (this.fastupdate = !1, this.mount(a.db));
  }
}
u = W.prototype;
u.mount = function(a) {
  if (this.worker) {
    throw Error("You can't use Worker-Indexes on a persistent model. That would be useless, since each of the persistent model acts like Worker-Index by default (Master/Slave).");
  }
  var b = this.field;
  if (this.tag) {
    for (var c = 0, d; c < this.aa.length; c++) {
      d = this.aa[c];
      var e;
      this.index.set(d, e = new S({}, this.reg));
      b === this.field && (b = b.slice(0));
      b.push(d);
      e.tag = this.tag.get(d);
    }
  }
  c = [];
  d = {db:a.db, type:a.type, fastupdate:a.fastupdate};
  e = 0;
  for (var f; e < b.length; e++) {
    d.field = f = b[e];
    f = this.index.get(f);
    var g = new a.constructor(a.id, d);
    g.id = a.id;
    c[e] = g.mount(f);
    f.document = !0;
    e ? f.bypass = !0 : f.store = this.store;
  }
  this.db = !0;
  return Promise.all(c);
};
u.commit = function(a, b) {
  var c = this, d, e, f, g;
  return ta(function(h) {
    if (1 == h.h) {
      d = [];
      e = w(c.index.values());
      for (f = e.next(); !f.done; f = e.next()) {
        g = f.value, d.push(g.db.commit(g, a, b));
      }
      return E(h, Promise.all(d), 2);
    }
    c.reg.clear();
    h.h = 0;
  });
};
u.destroy = function() {
  for (var a = [], b = w(this.index.values()), c = b.next(); !c.done; c = b.next()) {
    a.push(c.value.destroy());
  }
  return Promise.all(a);
};
function xb(a, b) {
  var c = new Map(), d = b.index || b.field || b;
  K(d) && (d = [d]);
  for (var e = 0, f, g = void 0; e < d.length; e++) {
    f = d[e];
    K(f) || (g = f, f = f.field);
    g = M(g) ? Object.assign({}, a, g) : a;
    if (this.worker) {
      var h = new Ra(g);
      c.set(f, h);
    }
    this.worker || c.set(f, new S(g, this.reg));
    g.custom ? this.J[e] = g.custom : (this.J[e] = wb(f, this.S), g.filter && ("string" === typeof this.J[e] && (this.J[e] = new String(this.J[e])), this.J[e].R = g.filter));
    this.field[e] = f;
  }
  if (this.I) {
    for (a = b.store, K(a) && (a = [a]), b = 0; b < a.length; b++) {
      d = a[b], e = d.field || d, d.custom ? (this.I[b] = d.custom, d.custom.ja = e) : (this.I[b] = wb(e, this.S), d.filter && ("string" === typeof this.I[b] && (this.I[b] = new String(this.I[b])), this.I[b].R = d.filter));
    }
  }
  return c;
}
function wb(a, b) {
  for (var c = a.split(":"), d = 0, e = 0; e < c.length; e++) {
    a = c[e], "]" === a[a.length - 1] && (a = a.substring(0, a.length - 2)) && (b[d] = !0), a && (c[d++] = a);
  }
  d < c.length && (c.length = d);
  return 1 < d ? c : c[0];
}
u.append = function(a, b) {
  return this.add(a, b, !0);
};
u.update = function(a, b) {
  return this.remove(a).add(a, b);
};
u.remove = function(a) {
  M(a) && (a = ya(a, this.key));
  for (var b = w(this.index.values()), c = b.next(); !c.done; c = b.next()) {
    c.value.remove(a, !0);
  }
  if (this.reg.has(a)) {
    if (this.tag && !this.fastupdate) {
      for (b = w(this.tag.values()), c = b.next(); !c.done; c = b.next()) {
        c = c.value;
        for (var d = w(c), e = d.next(); !e.done; e = d.next()) {
          var f = e.value;
          e = f[0];
          f = f[1];
          var g = f.indexOf(a);
          -1 < g && (1 < f.length ? f.splice(g, 1) : c.delete(e));
        }
      }
    }
    this.store && this.store.delete(a);
    this.reg.delete(a);
  }
  this.cache && this.cache.remove(a);
  return this;
};
u.clear = function() {
  for (var a = w(this.index.values()), b = a.next(); !b.done; b = a.next()) {
    b.value.clear();
  }
  if (this.tag) {
    for (a = w(this.tag.values()), b = a.next(); !b.done; b = a.next()) {
      b.value.clear();
    }
  }
  this.store && this.store.clear();
  return this;
};
u.contain = function(a) {
  return this.db ? this.index.get(this.field[0]).db.has(a) : this.reg.has(a);
};
u.cleanup = function() {
  for (var a = w(this.index.values()), b = a.next(); !b.done; b = a.next()) {
    b.value.cleanup();
  }
  return this;
};
u.get = function(a) {
  return this.db ? this.index.get(this.field[0]).db.enrich(a).then(function(b) {
    return b[0] && b[0].doc;
  }) : this.store.get(a);
};
u.set = function(a, b) {
  this.store.set(a, b);
  return this;
};
u.searchCache = yb;
u.export = function(a, b, c, d) {
  c = void 0 === c ? 0 : c;
  d = void 0 === d ? 0 : d;
  if (c < this.field.length) {
    var e = this.field[c];
    if ((b = this.index.get(e).export(a, e, c, d = 1)) && b.then) {
      var f = this;
      return b.then(function() {
        return f.export(a, e, c + 1);
      });
    }
    return this.export(a, e, c + 1);
  }
  switch(d) {
    case 0:
      var g = "reg";
      var h = Xa(this.reg);
      b = null;
      break;
    case 1:
      g = "tag";
      h = this.tag && Va(this.tag, this.reg.size);
      b = null;
      break;
    case 2:
      g = "doc";
      h = this.store && Ta(this.store);
      b = null;
      break;
    default:
      return;
  }
  return Za.call(this, a, b, g, h, c, d);
};
u.import = function(a, b) {
  var c = a.split(".");
  "json" === c[c.length - 1] && c.pop();
  var d = 2 < c.length ? c[0] : "";
  c = 2 < c.length ? c[2] : c[1];
  if (this.worker && d) {
    return this.index.get(d).import(a);
  }
  if (b) {
    "string" === typeof b && (b = JSON.parse(b));
    if (d) {
      return this.index.get(d).import(c, b);
    }
    switch(c) {
      case "reg":
        this.fastupdate = !1;
        this.reg = Ya(b, this.reg);
        for (b = 0; b < this.field.length; b++) {
          d = this.index.get(this.field[b]), d.fastupdate = !1, d.reg = this.reg;
        }
        if (this.worker) {
          b = [];
          d = w(this.index.values());
          for (c = d.next(); !c.done; c = d.next()) {
            b.push(c.value.import(a));
          }
          return Promise.all(b);
        }
        break;
      case "tag":
        this.tag = Wa(b, this.tag);
        break;
      case "doc":
        this.store = Ua(b, this.store);
    }
  }
};
Ia(W.prototype);
function yb(a, b, c) {
  a = ("object" === typeof a ? "" + a.query : a).toLowerCase();
  this.cache || (this.cache = new Z());
  var d = this.cache.get(a);
  if (!d) {
    d = this.search(a, b, c);
    if (d.then) {
      var e = this;
      d.then(function(f) {
        e.cache.set(a, f);
        return f;
      });
    }
    this.cache.set(a, d);
  }
  return d;
}
function Z(a) {
  this.limit = a && !0 !== a ? a : 1000;
  this.cache = new Map();
  this.h = "";
}
Z.prototype.set = function(a, b) {
  this.cache.set(this.h = a, b);
  this.cache.size > this.limit && this.cache.delete(this.cache.keys().next().value);
};
Z.prototype.get = function(a) {
  var b = this.cache.get(a);
  b && this.h !== a && (this.cache.delete(a), this.cache.set(this.h = a, b));
  return b;
};
Z.prototype.remove = function(a) {
  for (var b = w(this.cache), c = b.next(); !c.done; c = b.next()) {
    c = c.value;
    var d = c[0];
    c[1].includes(a) && this.cache.delete(d);
  }
};
Z.prototype.clear = function() {
  this.cache.clear();
  this.h = "";
};
var zb = {normalize:function(a) {
  return a.toLowerCase();
}};
var Ab = new Map([["b", "p"], ["v", "f"], ["w", "f"], ["z", "s"], ["x", "s"], ["d", "t"], ["n", "m"], ["c", "k"], ["g", "k"], ["j", "k"], ["q", "k"], ["i", "e"], ["y", "e"], ["u", "o"]]);
var Bb = new Map([["ae", "a"], ["oe", "o"], ["sh", "s"], ["kh", "k"], ["th", "t"], ["ph", "f"], ["pf", "f"]]), Cb = [/([^aeo])h(.)/g, "$1$2", /([aeo])h([^aeo]|$)/g, "$1$2", /(.)\1+/g, "$1"];
var Db = {a:"", e:"", i:"", o:"", u:"", y:"", b:1, f:1, p:1, v:1, c:2, g:2, j:2, k:2, q:2, s:2, x:2, z:2, "\u00df":2, d:3, t:3, l:4, m:5, n:5, r:6};
var Eb = /[\x00-\x7F]+/g;
var Fb = /[\x00-\x7F]+/g;
var Gb = /[\x00-\x7F]+/g;
var Hb = {LatinExact:{split:/\s+/, normalize:!1}, LatinDefault:zb, LatinSimple:{normalize:!0, dedupe:!0}, LatinBalance:{normalize:!0, dedupe:!0, mapper:Ab}, LatinAdvanced:{normalize:!0, dedupe:!0, mapper:Ab, matcher:Bb, replacer:Cb}, LatinExtra:{normalize:!0, dedupe:!0, mapper:Ab, replacer:Cb.concat([/(?!^)[aeo]/g, ""]), matcher:Bb}, LatinSoundex:{normalize:!0, dedupe:!1, include:{letter:!0}, finalize:function(a) {
  for (var b = 0; b < a.length; b++) {
    for (var c = a[b], d = c.charAt(0), e = Db[d], f = 1, g; f < c.length && (g = c.charAt(f), "h" === g || "w" === g || !(g = Db[g]) || g === e || (d += g, e = g, 4 !== d.length)); f++) {
    }
    a[b] = d;
  }
}}, ArabicDefault:{normalize:!1, dedupe:!0, prepare:function(a) {
  return ("" + a).replace(Eb, " ");
}}, CjkDefault:{normalize:!1, dedupe:!0, split:"", prepare:function(a) {
  return ("" + a).replace(Fb, "");
}}, CyrillicDefault:{normalize:!1, dedupe:!0, prepare:function(a) {
  return ("" + a).replace(Gb, " ");
}}};
var Ib = {memory:{resolution:1}, performance:{resolution:3, fastupdate:!0, context:{depth:1, resolution:1}}, match:{tokenize:"forward"}, score:{resolution:9, context:{depth:2, resolution:3}}};
S.prototype.add = function(a, b, c, d) {
  if (b && (a || 0 === a)) {
    if (!d && !c && this.reg.has(a)) {
      return this.update(a, b);
    }
    b = this.encoder.encode(b);
    if (d = b.length) {
      for (var e = J(), f = J(), g = this.depth, h = this.resolution, k = 0; k < d; k++) {
        var l = b[this.rtl ? d - 1 - k : k], m = l.length;
        if (m && (g || !f[l])) {
          var n = this.score ? this.score(b, l, k, null, 0) : Jb(h, d, k), p = "";
          switch(this.tokenize) {
            case "full":
              if (2 < m) {
                n = 0;
                for (var q; n < m; n++) {
                  for (var r = m; r > n; r--) {
                    p = l.substring(n, r), q = this.rtl ? m - 1 - n : n, q = this.score ? this.score(b, l, k, p, q) : Jb(h, d, k, m, q), Kb(this, f, p, q, a, c);
                  }
                }
                break;
              }
            case "reverse":
              if (1 < m) {
                for (r = m - 1; 0 < r; r--) {
                  p = l[this.rtl ? m - 1 - r : r] + p, q = this.score ? this.score(b, l, k, p, r) : Jb(h, d, k, m, r), Kb(this, f, p, q, a, c);
                }
                p = "";
              }
            case "forward":
              if (1 < m) {
                for (r = 0; r < m; r++) {
                  p += l[this.rtl ? m - 1 - r : r], Kb(this, f, p, n, a, c);
                }
                break;
              }
            default:
              if (Kb(this, f, l, n, a, c), g && 1 < d && k < d - 1) {
                for (m = J(), p = this.da, n = l, r = Math.min(g + 1, this.rtl ? k + 1 : d - k), q = m[n] = 1; q < r; q++) {
                  if ((l = b[this.rtl ? d - 1 - k - q : k + q]) && !m[l]) {
                    m[l] = 1;
                    var x = this.score ? this.score(b, n, k, l, q - 1) : Jb(p + (d / 2 > p ? 0 : 1), d, k, r - 1, q - 1), t = this.bidirectional && l > n;
                    Kb(this, e, t ? n : l, x, a, c, t ? l : n);
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
  this.db && (b || this.commit_task.push({del:a}), this.ca && Lb(this));
  return this;
};
function Kb(a, b, c, d, e, f, g) {
  var h = g ? a.ctx : a.map, k;
  if (!b[c] || g && !(k = b[c])[g]) {
    if (g ? (b = k || (b[c] = J()), b[g] = 1, (k = h.get(g)) ? h = k : h.set(g, h = new Map())) : b[c] = 1, (k = h.get(c)) ? h = k : h.set(c, h = k = []), h = h[d] || (h[d] = []), !f || !h.includes(e)) {
      if (h.length === Math.pow(2, 31) - 1) {
        b = new ab(h);
        if (a.fastupdate) {
          for (c = w(a.reg.values()), f = c.next(); !f.done; f = c.next()) {
            f = f.value, f.includes(h) && (f[f.indexOf(h)] = b);
          }
        }
        k[d] = h = b;
      }
      h.push(e);
      a.fastupdate && ((d = a.reg.get(e)) ? d.push(h) : a.reg.set(e, [h]));
    }
  }
}
function Jb(a, b, c, d, e) {
  return c && 1 < a ? b + (d || 0) <= a ? c + (e || 0) : (a - 1) / (b + (d || 0)) * (c + (e || 0)) + 1 | 0 : 0;
}
;S.prototype.search = function(a, b, c) {
  c || (!b && M(a) ? (c = a, a = "") : M(b) && (c = b, b = 0));
  var d = [], e = 0, f;
  if (c) {
    a = c.query || a;
    b = c.limit || b;
    e = c.offset || 0;
    var g = c.context;
    var h = c.suggest;
    var k = (f = !1 !== c.resolve) && c.enrich;
    var l = c.boost;
    var m = c.resolution;
    var n = this.db && c.tag;
  } else {
    f = this.resolve;
  }
  var p = this.encoder.encode(a);
  var q = p.length;
  b = b || (f ? 100 : 0);
  if (1 === q) {
    return Mb.call(this, p[0], "", b, e, f, k, n);
  }
  g = this.depth && !1 !== g;
  if (2 === q && g && !h) {
    return Mb.call(this, p[0], p[1], b, e, f, k, n);
  }
  var r = J(), x = 0;
  if (1 < q && g) {
    var t = p[0];
    x = 1;
  }
  m || 0 === m || (m = t ? this.da : this.resolution);
  if (this.db) {
    if (this.db.search && (a = this.db.search(this, p, b, e, h, f, k, n), !1 !== a)) {
      return a;
    }
    var A = this;
    return function() {
      var z, v;
      return ta(function(y) {
        switch(y.h) {
          case 1:
            v = z = void 0;
          case 2:
            if (!(x < q)) {
              y.h = 4;
              break;
            }
            v = p[x];
            if (!v || r[v]) {
              y.h = 5;
              break;
            }
            r[v] = 1;
            return E(y, Nb(A, v, t, 0, 0, !1, !1), 6);
          case 6:
            z = y.D;
            if (z = Ob(z, d, h, m)) {
              d = z;
              y.h = 4;
              break;
            }
            t && (h && z && d.length || (t = v));
          case 5:
            h && t && x === q - 1 && !d.length && (m = A.resolution, t = "", x = -1, r = J());
            x++;
            y.h = 2;
            break;
          case 4:
            return y.return(Pb(d, m, b, e, h, l, f));
        }
      });
    }();
  }
  for (c = a = void 0; x < q; x++) {
    if ((c = p[x]) && !r[c]) {
      r[c] = 1;
      a = Nb(this, c, t, 0, 0, !1, !1);
      if (a = Ob(a, d, h, m)) {
        d = a;
        break;
      }
      t && (h && a && d.length || (t = c));
    }
    h && t && x === q - 1 && !d.length && (m = this.resolution, t = "", x = -1, r = J());
  }
  return Pb(d, m, b, e, h, l, f);
};
function Pb(a, b, c, d, e, f, g) {
  var h = a.length, k = a;
  if (1 < h) {
    k = ib(a, b, c, d, e, f, g);
  } else if (1 === h) {
    return g ? lb.call(null, a[0], c, d) : new Y(a[0]);
  }
  return g ? k : new Y(k);
}
function Mb(a, b, c, d, e, f, g) {
  a = Nb(this, a, b, c, d, e, f, g);
  return this.db ? a.then(function(h) {
    return e ? h || [] : new Y(h);
  }) : a && a.length ? e ? lb.call(this, a, c, d) : new Y(a) : e ? [] : new Y();
}
function Ob(a, b, c, d) {
  var e = [];
  if (a && a.length) {
    if (a.length <= d) {
      b.push(a);
      return;
    }
    for (var f = 0, g; f < d; f++) {
      if (g = a[f]) {
        e[f] = g;
      }
    }
    if (e.length) {
      b.push(e);
      return;
    }
  }
  if (!c) {
    return e;
  }
}
function Nb(a, b, c, d, e, f, g, h) {
  var k;
  c && (k = a.bidirectional && b > c) && (k = c, c = b, b = k);
  if (a.db) {
    return a.db.get(b, c, d, e, f, g, h);
  }
  a = c ? (a = a.ctx.get(c)) && a.get(b) : a.map.get(b);
  return a;
}
;S.prototype.remove = function(a, b) {
  var c = this.reg.size && (this.fastupdate ? this.reg.get(a) : this.reg.has(a));
  if (c) {
    if (this.fastupdate) {
      for (var d = 0, e; d < c.length; d++) {
        if (e = c[d]) {
          if (2 > e.length) {
            e.pop();
          } else {
            var f = e.indexOf(a);
            f === c.length - 1 ? e.pop() : e.splice(f, 1);
          }
        }
      }
    } else {
      Qb(this.map, a), this.depth && Qb(this.ctx, a);
    }
    b || this.reg.delete(a);
  }
  this.db && (this.commit_task.push({del:a}), this.ca && Lb(this));
  this.cache && this.cache.remove(a);
  return this;
};
function Qb(a, b) {
  var c = 0;
  if (a.constructor === Array) {
    for (var d = 0, e = void 0, f; d < a.length; d++) {
      if ((e = a[d]) && e.length) {
        if (f = e.indexOf(b), 0 <= f) {
          1 < e.length ? (e.splice(f, 1), c++) : delete a[d];
          break;
        } else {
          c++;
        }
      }
    }
  } else {
    for (d = w(a.entries()), e = d.next(); !e.done; e = d.next()) {
      f = e.value, e = f[0], (f = Qb(f[1], b)) ? c += f : a.delete(e);
    }
  }
  return c;
}
;function S(a, b) {
  if (!this || this.constructor !== S) {
    return new S(a);
  }
  if (a) {
    var c = K(a) ? a : a.preset;
    c && (Ib[c] || console.warn("Preset not found: " + c), a = Object.assign({}, Ib[c], a));
  } else {
    a = {};
  }
  c = a.context;
  var d = !0 === c ? {depth:1} : c || {}, e = K(a.encoder) ? Hb[a.encoder] : a.encode || a.encoder || zb;
  this.encoder = e.encode ? e : "object" === typeof e ? new Ga(e) : {encode:e};
  this.resolution = a.resolution || 9;
  this.tokenize = (c = a.tokenize) && "default" !== c && c || "strict";
  this.depth = "strict" === c && d.depth || 0;
  this.bidirectional = !1 !== d.bidirectional;
  this.fastupdate = !!a.fastupdate;
  this.score = a.score || null;
  (c = a.keystore || 0) && (this.keystore = c);
  this.map = c ? new U(c) : new Map();
  this.ctx = c ? new U(c) : new Map();
  this.reg = b || (this.fastupdate ? c ? new U(c) : new Map() : c ? new V(c) : new Set());
  this.da = d.resolution || 3;
  this.rtl = e.rtl || a.rtl || !1;
  this.cache = (c = a.cache || null) && new Z(c);
  this.resolve = !1 !== a.resolve;
  if (c = a.db) {
    this.db = this.mount(c);
  }
  this.ca = !1 !== a.commit;
  this.commit_task = [];
  this.commit_timer = null;
  this.priority = a.priority || 4;
}
u = S.prototype;
u.mount = function(a) {
  this.commit_timer && (clearTimeout(this.commit_timer), this.commit_timer = null);
  return a.mount(this);
};
u.commit = function(a, b) {
  this.commit_timer && (clearTimeout(this.commit_timer), this.commit_timer = null);
  return this.db.commit(this, a, b);
};
u.destroy = function() {
  this.commit_timer && (clearTimeout(this.commit_timer), this.commit_timer = null);
  return this.db.destroy();
};
function Lb(a) {
  a.commit_timer || (a.commit_timer = setTimeout(function() {
    a.commit_timer = null;
    a.db.commit(a, void 0, void 0);
  }, 1));
}
u.clear = function() {
  this.map.clear();
  this.ctx.clear();
  this.reg.clear();
  this.cache && this.cache.clear();
  this.db && (this.commit_timer && clearTimeout(this.commit_timer), this.commit_timer = null, this.commit_task = [{clear:!0}]);
  return this;
};
u.append = function(a, b) {
  return this.add(a, b, !0);
};
u.contain = function(a) {
  return this.db ? this.db.has(a) : this.reg.has(a);
};
u.update = function(a, b) {
  var c = this, d = this.remove(a);
  return d && d.then ? d.then(function() {
    return c.add(a, b);
  }) : this.add(a, b);
};
function Rb(a) {
  var b = 0;
  if (a.constructor === Array) {
    for (var c = 0, d = void 0; c < a.length; c++) {
      (d = a[c]) && (b += d.length);
    }
  } else {
    for (c = w(a), d = c.next(); !d.done; d = c.next()) {
      var e = d.value;
      d = e[0];
      (e = Rb(e[1])) ? b += e : a.delete(d);
    }
  }
  return b;
}
u.cleanup = function() {
  if (!this.fastupdate) {
    return console.info('Cleanup the index isn\'t required when not using "fastupdate".'), this;
  }
  Rb(this.map);
  this.depth && Rb(this.ctx);
  return this;
};
u.searchCache = yb;
u.export = function(a, b, c, d) {
  c = void 0 === c ? 0 : c;
  d = void 0 === d ? 0 : d;
  switch(d) {
    case 0:
      var e = "reg";
      var f = Xa(this.reg);
      break;
    case 1:
      e = "cfg";
      f = null;
      break;
    case 2:
      e = "map";
      f = Ta(this.map, this.reg.size);
      break;
    case 3:
      e = "ctx";
      f = Va(this.ctx, this.reg.size);
      break;
    default:
      return;
  }
  return Za.call(this, a, b, e, f, c, d);
};
u.import = function(a, b) {
  if (b) {
    switch("string" === typeof b && (b = JSON.parse(b)), a = a.split("."), "json" === a[a.length - 1] && a.pop(), 3 === a.length && a.shift(), a = 1 < a.length ? a[1] : a[0], a) {
      case "reg":
        this.fastupdate = !1;
        this.reg = Ya(b, this.reg);
        break;
      case "map":
        this.map = Ua(b, this.map);
        break;
      case "ctx":
        this.ctx = Wa(b, this.ctx);
    }
  }
};
u.serialize = function(a) {
  a = void 0 === a ? !0 : a;
  if (!this.reg.size) {
    return "";
  }
  for (var b = "", c = "", d = w(this.reg.keys()), e = d.next(); !e.done; e = d.next()) {
    e = e.value, c || (c = typeof e), b += (b ? "," : "") + ("string" === c ? '"' + e + '"' : e);
  }
  b = "index.reg=new Set([" + b + "]);";
  d = "";
  e = w(this.map.entries());
  for (var f = e.next(); !f.done; f = e.next()) {
    var g = f.value;
    f = g[0];
    g = g[1];
    for (var h = "", k = 0, l; k < g.length; k++) {
      l = g[k] || [""];
      for (var m = "", n = 0; n < l.length; n++) {
        m += (m ? "," : "") + ("string" === c ? '"' + l[n] + '"' : l[n]);
      }
      m = "[" + m + "]";
      h += (h ? "," : "") + m;
    }
    h = '["' + f + '",[' + h + "]]";
    d += (d ? "," : "") + h;
  }
  d = "index.map=new Map([" + d + "]);";
  e = "";
  f = w(this.ctx.entries());
  for (g = f.next(); !g.done; g = f.next()) {
    for (h = g.value, g = h[0], h = w(h[1].entries()), k = h.next(); !k.done; k = h.next()) {
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
      m = '["' + g + '",' + m + "]";
      e += (e ? "," : "") + m;
    }
  }
  e = "index.ctx=new Map([" + e + "]);";
  return a ? "function inject(index){" + b + d + e + "}" : b + d + e;
};
Ia(S.prototype);
var Sb = "undefined" !== typeof window && (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB), Tb = ["map", "ctx", "tag", "reg", "cfg"];
function Ub(a, b) {
  b = void 0 === b ? {} : b;
  if (!this) {
    return new Ub(a, b);
  }
  "object" === typeof a && (b = a, a = a.name);
  a || console.info("Default storage space was used, because a name was not passed.");
  this.id = "flexsearch" + (a ? ":" + a.toLowerCase().replace(/[^a-z0-9_\-]/g, "") : "");
  this.field = b.field ? b.field.toLowerCase().replace(/[^a-z0-9_\-]/g, "") : "";
  this.type = b.type;
  this.fastupdate = this.support_tag_search = !1;
  this.db = null;
  this.h = {};
}
u = Ub.prototype;
u.mount = function(a) {
  if (!a.encoder) {
    return a.mount(this);
  }
  a.db = this;
  return this.open();
};
u.open = function() {
  var a = this;
  navigator.storage && navigator.storage.persist();
  return this.db || new Promise(function(b, c) {
    var d = Sb.open(a.id + (a.field ? ":" + a.field : ""), 1);
    d.onupgradeneeded = function() {
      var e = a.db = this.result;
      Tb.forEach(function(f) {
        e.objectStoreNames.contains(f) || e.createObjectStore(f);
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
u.close = function() {
  this.db.close();
  this.db = null;
};
u.destroy = function() {
  var a = Sb.deleteDatabase(this.id + (this.field ? ":" + this.field : ""));
  return Vb(a);
};
u.clear = function() {
  for (var a = this.db.transaction(Tb, "readwrite"), b = 0; b < Tb.length; b++) {
    a.objectStore(Tb[b]).clear();
  }
  return Vb(a);
};
u.get = function(a, b, c, d, e, f) {
  c = void 0 === c ? 0 : c;
  d = void 0 === d ? 0 : d;
  e = void 0 === e ? !0 : e;
  f = void 0 === f ? !1 : f;
  a = this.db.transaction(b ? "ctx" : "map", "readonly").objectStore(b ? "ctx" : "map").get(b ? b + ":" + a : a);
  var g = this;
  return Vb(a).then(function(h) {
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
      return f ? g.enrich(k) : k;
    }
    return h;
  });
};
u.tag = function(a, b, c, d) {
  b = void 0 === b ? 0 : b;
  c = void 0 === c ? 0 : c;
  d = void 0 === d ? !1 : d;
  a = this.db.transaction("tag", "readonly").objectStore("tag").get(a);
  var e = this;
  return Vb(a).then(function(f) {
    if (!f || !f.length || c >= f.length) {
      return [];
    }
    if (!b && !c) {
      return f;
    }
    f = f.slice(c, c + b);
    return d ? e.enrich(f) : f;
  });
};
u.enrich = function(a) {
  "object" !== typeof a && (a = [a]);
  for (var b = this.db.transaction("reg", "readonly").objectStore("reg"), c = [], d = 0; d < a.length; d++) {
    c[d] = Vb(b.get(a[d]));
  }
  return Promise.all(c).then(function(e) {
    for (var f = 0; f < e.length; f++) {
      e[f] = {id:a[f], doc:e[f] ? JSON.parse(e[f]) : null};
    }
    return e;
  });
};
u.has = function(a) {
  a = this.db.transaction("reg", "readonly").objectStore("reg").getKey(a);
  return Vb(a);
};
u.search = null;
u.info = function() {
};
u.transaction = function(a, b, c) {
  var d = this, e = this.h[a + ":" + b];
  if (e) {
    return c.call(this, e);
  }
  var f = this.db.transaction(a, b);
  this.h[a + ":" + b] = e = f.objectStore(a);
  return new Promise(function(g, h) {
    f.onerror = function(l) {
      f.abort();
      f = e = null;
      h(l);
    };
    f.oncomplete = function(l) {
      f = e = null;
      g(l || !0);
    };
    var k = c.call(d, e);
    d.h[a + ":" + b] = null;
    return k;
  });
};
u.commit = function(a, b, c) {
  var d = this, e, f, g;
  return ta(function(h) {
    switch(h.h) {
      case 1:
        if (b) {
          return E(h, d.clear(), 12);
        }
        e = a.commit_task;
        a.commit_task = [];
        f = 0;
        g = void 0;
      case 4:
        if (!(f < e.length)) {
          h.h = 6;
          break;
        }
        g = e[f];
        if (!g.clear) {
          e[f] = g.ma;
          h.h = 5;
          break;
        }
        return E(h, d.clear(), 8);
      case 8:
        b = !0;
        h.h = 6;
        break;
      case 5:
        f++;
        h.h = 4;
        break;
      case 6:
        if (b) {
          h.h = 3;
          break;
        }
        c || (e = e.concat(xa(a.reg)));
        if (!e.length) {
          h.h = 10;
          break;
        }
        return E(h, d.remove(e), 11);
      case 11:
      case 10:
        h.h = 3;
        break;
      case 12:
        a.commit_task = [];
      case 3:
        return a.reg.size ? E(h, d.transaction("map", "readwrite", function(k) {
          for (var l = w(a.map), m = l.next(), n = {}; !m.done; n = {O:void 0, Y:void 0}, m = l.next()) {
            m = m.value, n.Y = m[0], n.O = m[1], n.O.length && (b ? k.put(n.O, n.Y) : k.get(n.Y).onsuccess = function(p) {
              return function() {
                var q = this.result, r;
                if (q && q.length) {
                  for (var x = Math.max(q.length, p.O.length), t = 0, A; t < x; t++) {
                    if ((A = p.O[t]) && A.length) {
                      if ((r = q[t]) && r.length) {
                        for (var z = 0; z < A.length; z++) {
                          r.push(A[z]);
                        }
                      } else {
                        q[t] = A;
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
        return E(h, d.transaction("ctx", "readwrite", function(k) {
          for (var l = w(a.ctx), m = l.next(), n = {}; !m.done; n = {V:void 0}, m = l.next()) {
            m = m.value;
            n.V = m[0];
            m = w(m[1]);
            for (var p = m.next(), q = {}; !p.done; q = {P:void 0, Z:void 0}, p = m.next()) {
              p = p.value, q.Z = p[0], q.P = p[1], q.P.length && (b ? k.put(q.P, n.V + ":" + q.Z) : k.get(n.V + ":" + q.Z).onsuccess = function(r, x) {
                return function() {
                  var t = this.result, A;
                  if (t && t.length) {
                    for (var z = Math.max(t.length, r.P.length), v = 0, y; v < z; v++) {
                      if ((y = r.P[v]) && y.length) {
                        if ((A = t[v]) && A.length) {
                          for (var D = 0; D < y.length; D++) {
                            A.push(y[D]);
                          }
                        } else {
                          t[v] = y;
                        }
                        A = 1;
                      }
                    }
                  } else {
                    t = r.P, A = 1;
                  }
                  A && k.put(t, x.V + ":" + r.Z);
                };
              }(q, n));
            }
          }
        }), 14);
      case 14:
        if (a.store) {
          return E(h, d.transaction("reg", "readwrite", function(k) {
            for (var l = w(a.store), m = l.next(); !m.done; m = l.next()) {
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
        return E(h, d.transaction("reg", "readwrite", function(k) {
          for (var l = w(a.reg.keys()), m = l.next(); !m.done; m = l.next()) {
            k.put(1, m.value);
          }
        }), 16);
      case 16:
        if (!a.tag) {
          h.h = 20;
          break;
        }
        return E(h, d.transaction("tag", "readwrite", function(k) {
          for (var l = w(a.tag), m = l.next(), n = {}; !m.done; n = {X:void 0, ba:void 0}, m = l.next()) {
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
function Yb(a, b, c) {
  for (var d = a.value, e, f, g = 0, h = 0, k; h < d.length; h++) {
    if (k = c ? d : d[h]) {
      for (var l = 0, m, n; l < b.length; l++) {
        if (n = b[l], m = k.indexOf(f ? parseInt(n, 10) : n), 0 > m && !f && "string" === typeof n && !isNaN(n) && (m = k.indexOf(parseInt(n, 10))) && (f = 1), 0 <= m) {
          if (e = 1, 1 < k.length) {
            k.splice(m, 1);
          } else {
            d[h] = [];
            break;
          }
        }
      }
      g += k.length;
    }
    if (c) {
      break;
    }
  }
  g ? e && a.update(d) : a.delete();
  a.continue();
}
u.remove = function(a) {
  "object" !== typeof a && (a = [a]);
  return Promise.all([this.transaction("map", "readwrite", function(b) {
    b.openCursor().onsuccess = function() {
      var c = this.result;
      c && Yb(c, a);
    };
  }), this.transaction("ctx", "readwrite", function(b) {
    b.openCursor().onsuccess = function() {
      var c = this.result;
      c && Yb(c, a);
    };
  }), this.transaction("tag", "readwrite", function(b) {
    b.openCursor().onsuccess = function() {
      var c = this.result;
      c && Yb(c, a, !0);
    };
  }), this.transaction("reg", "readwrite", function(b) {
    for (var c = 0; c < a.length; c++) {
      b.delete(a[c]);
    }
  })]);
};
function Vb(a) {
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
;var Zb = {Index:S, Charset:Hb, Encoder:Ga, Document:W, Worker:Ra, Resolver:Y, IndexedDB:Ub, Language:{}}, $b = self, ac;
(ac = $b.define) && ac.amd ? ac([], function() {
  return Zb;
}) : "object" === typeof $b.exports ? $b.exports = Zb : $b.FlexSearch = Zb;
}(this||self));
