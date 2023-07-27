(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
  new MutationObserver((i) => {
    for (const r of i)
      if (r.type === "childList")
        for (const o of r.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && s(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(i) {
    const r = {};
    return (
      i.integrity && (r.integrity = i.integrity),
      i.referrerPolicy && (r.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function s(i) {
    if (i.ep) return;
    i.ep = !0;
    const r = e(i);
    fetch(i.href, r);
  }
})();
var $ = "top",
  x = "bottom",
  R = "right",
  I = "left",
  me = "auto",
  Pt = [$, x, R, I],
  _t = "start",
  Ot = "end",
  os = "clippingParents",
  Xe = "viewport",
  At = "popper",
  as = "reference",
  Fe = Pt.reduce(function (n, t) {
    return n.concat([t + "-" + _t, t + "-" + Ot]);
  }, []),
  Qe = [].concat(Pt, [me]).reduce(function (n, t) {
    return n.concat([t, t + "-" + _t, t + "-" + Ot]);
  }, []),
  cs = "beforeRead",
  ls = "read",
  us = "afterRead",
  ds = "beforeMain",
  hs = "main",
  fs = "afterMain",
  ps = "beforeWrite",
  _s = "write",
  ms = "afterWrite",
  gs = [cs, ls, us, ds, hs, fs, ps, _s, ms];
function z(n) {
  return n ? (n.nodeName || "").toLowerCase() : null;
}
function k(n) {
  if (n == null) return window;
  if (n.toString() !== "[object Window]") {
    var t = n.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return n;
}
function mt(n) {
  var t = k(n).Element;
  return n instanceof t || n instanceof Element;
}
function V(n) {
  var t = k(n).HTMLElement;
  return n instanceof t || n instanceof HTMLElement;
}
function Je(n) {
  if (typeof ShadowRoot > "u") return !1;
  var t = k(n).ShadowRoot;
  return n instanceof t || n instanceof ShadowRoot;
}
function fi(n) {
  var t = n.state;
  Object.keys(t.elements).forEach(function (e) {
    var s = t.styles[e] || {},
      i = t.attributes[e] || {},
      r = t.elements[e];
    !V(r) ||
      !z(r) ||
      (Object.assign(r.style, s),
      Object.keys(i).forEach(function (o) {
        var a = i[o];
        a === !1 ? r.removeAttribute(o) : r.setAttribute(o, a === !0 ? "" : a);
      }));
  });
}
function pi(n) {
  var t = n.state,
    e = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0",
      },
      arrow: { position: "absolute" },
      reference: {},
    };
  return (
    Object.assign(t.elements.popper.style, e.popper),
    (t.styles = e),
    t.elements.arrow && Object.assign(t.elements.arrow.style, e.arrow),
    function () {
      Object.keys(t.elements).forEach(function (s) {
        var i = t.elements[s],
          r = t.attributes[s] || {},
          o = Object.keys(t.styles.hasOwnProperty(s) ? t.styles[s] : e[s]),
          a = o.reduce(function (l, d) {
            return (l[d] = ""), l;
          }, {});
        !V(i) ||
          !z(i) ||
          (Object.assign(i.style, a),
          Object.keys(r).forEach(function (l) {
            i.removeAttribute(l);
          }));
      });
    }
  );
}
const Ze = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: fi,
  effect: pi,
  requires: ["computeStyles"],
};
function Y(n) {
  return n.split("-")[0];
}
var pt = Math.max,
  de = Math.min,
  Nt = Math.round;
function Ke() {
  var n = navigator.userAgentData;
  return n != null && n.brands && Array.isArray(n.brands)
    ? n.brands
        .map(function (t) {
          return t.brand + "/" + t.version;
        })
        .join(" ")
    : navigator.userAgent;
}
function Es() {
  return !/^((?!chrome|android).)*safari/i.test(Ke());
}
function St(n, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var s = n.getBoundingClientRect(),
    i = 1,
    r = 1;
  t &&
    V(n) &&
    ((i = (n.offsetWidth > 0 && Nt(s.width) / n.offsetWidth) || 1),
    (r = (n.offsetHeight > 0 && Nt(s.height) / n.offsetHeight) || 1));
  var o = mt(n) ? k(n) : window,
    a = o.visualViewport,
    l = !Es() && e,
    d = (s.left + (l && a ? a.offsetLeft : 0)) / i,
    u = (s.top + (l && a ? a.offsetTop : 0)) / r,
    _ = s.width / i,
    p = s.height / r;
  return {
    width: _,
    height: p,
    top: u,
    right: d + _,
    bottom: u + p,
    left: d,
    x: d,
    y: u,
  };
}
function tn(n) {
  var t = St(n),
    e = n.offsetWidth,
    s = n.offsetHeight;
  return (
    Math.abs(t.width - e) <= 1 && (e = t.width),
    Math.abs(t.height - s) <= 1 && (s = t.height),
    { x: n.offsetLeft, y: n.offsetTop, width: e, height: s }
  );
}
function vs(n, t) {
  var e = t.getRootNode && t.getRootNode();
  if (n.contains(t)) return !0;
  if (e && Je(e)) {
    var s = t;
    do {
      if (s && n.isSameNode(s)) return !0;
      s = s.parentNode || s.host;
    } while (s);
  }
  return !1;
}
function X(n) {
  return k(n).getComputedStyle(n);
}
function _i(n) {
  return ["table", "td", "th"].indexOf(z(n)) >= 0;
}
function it(n) {
  return ((mt(n) ? n.ownerDocument : n.document) || window.document)
    .documentElement;
}
function ge(n) {
  return z(n) === "html"
    ? n
    : n.assignedSlot || n.parentNode || (Je(n) ? n.host : null) || it(n);
}
function wn(n) {
  return !V(n) || X(n).position === "fixed" ? null : n.offsetParent;
}
function mi(n) {
  var t = /firefox/i.test(Ke()),
    e = /Trident/i.test(Ke());
  if (e && V(n)) {
    var s = X(n);
    if (s.position === "fixed") return null;
  }
  var i = ge(n);
  for (Je(i) && (i = i.host); V(i) && ["html", "body"].indexOf(z(i)) < 0; ) {
    var r = X(i);
    if (
      r.transform !== "none" ||
      r.perspective !== "none" ||
      r.contain === "paint" ||
      ["transform", "perspective"].indexOf(r.willChange) !== -1 ||
      (t && r.willChange === "filter") ||
      (t && r.filter && r.filter !== "none")
    )
      return i;
    i = i.parentNode;
  }
  return null;
}
function Yt(n) {
  for (var t = k(n), e = wn(n); e && _i(e) && X(e).position === "static"; )
    e = wn(e);
  return e &&
    (z(e) === "html" || (z(e) === "body" && X(e).position === "static"))
    ? t
    : e || mi(n) || t;
}
function en(n) {
  return ["top", "bottom"].indexOf(n) >= 0 ? "x" : "y";
}
function jt(n, t, e) {
  return pt(n, de(t, e));
}
function gi(n, t, e) {
  var s = jt(n, t, e);
  return s > e ? e : s;
}
function bs() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function Ts(n) {
  return Object.assign({}, bs(), n);
}
function As(n, t) {
  return t.reduce(function (e, s) {
    return (e[s] = n), e;
  }, {});
}
var Ei = function (t, e) {
  return (
    (t =
      typeof t == "function"
        ? t(Object.assign({}, e.rects, { placement: e.placement }))
        : t),
    Ts(typeof t != "number" ? t : As(t, Pt))
  );
};
function vi(n) {
  var t,
    e = n.state,
    s = n.name,
    i = n.options,
    r = e.elements.arrow,
    o = e.modifiersData.popperOffsets,
    a = Y(e.placement),
    l = en(a),
    d = [I, R].indexOf(a) >= 0,
    u = d ? "height" : "width";
  if (!(!r || !o)) {
    var _ = Ei(i.padding, e),
      p = tn(r),
      f = l === "y" ? $ : I,
      v = l === "y" ? x : R,
      m =
        e.rects.reference[u] + e.rects.reference[l] - o[l] - e.rects.popper[u],
      g = o[l] - e.rects.reference[l],
      A = Yt(r),
      w = A ? (l === "y" ? A.clientHeight || 0 : A.clientWidth || 0) : 0,
      C = m / 2 - g / 2,
      E = _[f],
      b = w - p[u] - _[v],
      T = w / 2 - p[u] / 2 + C,
      y = jt(E, T, b),
      S = l;
    e.modifiersData[s] = ((t = {}), (t[S] = y), (t.centerOffset = y - T), t);
  }
}
function bi(n) {
  var t = n.state,
    e = n.options,
    s = e.element,
    i = s === void 0 ? "[data-popper-arrow]" : s;
  i != null &&
    ((typeof i == "string" && ((i = t.elements.popper.querySelector(i)), !i)) ||
      (vs(t.elements.popper, i) && (t.elements.arrow = i)));
}
const ys = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: vi,
  effect: bi,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"],
};
function Dt(n) {
  return n.split("-")[1];
}
var Ti = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function Ai(n, t) {
  var e = n.x,
    s = n.y,
    i = t.devicePixelRatio || 1;
  return { x: Nt(e * i) / i || 0, y: Nt(s * i) / i || 0 };
}
function Cn(n) {
  var t,
    e = n.popper,
    s = n.popperRect,
    i = n.placement,
    r = n.variation,
    o = n.offsets,
    a = n.position,
    l = n.gpuAcceleration,
    d = n.adaptive,
    u = n.roundOffsets,
    _ = n.isFixed,
    p = o.x,
    f = p === void 0 ? 0 : p,
    v = o.y,
    m = v === void 0 ? 0 : v,
    g = typeof u == "function" ? u({ x: f, y: m }) : { x: f, y: m };
  (f = g.x), (m = g.y);
  var A = o.hasOwnProperty("x"),
    w = o.hasOwnProperty("y"),
    C = I,
    E = $,
    b = window;
  if (d) {
    var T = Yt(e),
      y = "clientHeight",
      S = "clientWidth";
    if (
      (T === k(e) &&
        ((T = it(e)),
        X(T).position !== "static" &&
          a === "absolute" &&
          ((y = "scrollHeight"), (S = "scrollWidth"))),
      (T = T),
      i === $ || ((i === I || i === R) && r === Ot))
    ) {
      E = x;
      var N = _ && T === b && b.visualViewport ? b.visualViewport.height : T[y];
      (m -= N - s.height), (m *= l ? 1 : -1);
    }
    if (i === I || ((i === $ || i === x) && r === Ot)) {
      C = R;
      var O = _ && T === b && b.visualViewport ? b.visualViewport.width : T[S];
      (f -= O - s.width), (f *= l ? 1 : -1);
    }
  }
  var D = Object.assign({ position: a }, d && Ti),
    j = u === !0 ? Ai({ x: f, y: m }, k(e)) : { x: f, y: m };
  if (((f = j.x), (m = j.y), l)) {
    var L;
    return Object.assign(
      {},
      D,
      ((L = {}),
      (L[E] = w ? "0" : ""),
      (L[C] = A ? "0" : ""),
      (L.transform =
        (b.devicePixelRatio || 1) <= 1
          ? "translate(" + f + "px, " + m + "px)"
          : "translate3d(" + f + "px, " + m + "px, 0)"),
      L)
    );
  }
  return Object.assign(
    {},
    D,
    ((t = {}),
    (t[E] = w ? m + "px" : ""),
    (t[C] = A ? f + "px" : ""),
    (t.transform = ""),
    t)
  );
}
function yi(n) {
  var t = n.state,
    e = n.options,
    s = e.gpuAcceleration,
    i = s === void 0 ? !0 : s,
    r = e.adaptive,
    o = r === void 0 ? !0 : r,
    a = e.roundOffsets,
    l = a === void 0 ? !0 : a,
    d = {
      placement: Y(t.placement),
      variation: Dt(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: i,
      isFixed: t.options.strategy === "fixed",
    };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      Cn(
        Object.assign({}, d, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: o,
          roundOffsets: l,
        })
      )
    )),
    t.modifiersData.arrow != null &&
      (t.styles.arrow = Object.assign(
        {},
        t.styles.arrow,
        Cn(
          Object.assign({}, d, {
            offsets: t.modifiersData.arrow,
            position: "absolute",
            adaptive: !1,
            roundOffsets: l,
          })
        )
      )),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-placement": t.placement,
    }));
}
const nn = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: yi,
  data: {},
};
var ee = { passive: !0 };
function wi(n) {
  var t = n.state,
    e = n.instance,
    s = n.options,
    i = s.scroll,
    r = i === void 0 ? !0 : i,
    o = s.resize,
    a = o === void 0 ? !0 : o,
    l = k(t.elements.popper),
    d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    r &&
      d.forEach(function (u) {
        u.addEventListener("scroll", e.update, ee);
      }),
    a && l.addEventListener("resize", e.update, ee),
    function () {
      r &&
        d.forEach(function (u) {
          u.removeEventListener("scroll", e.update, ee);
        }),
        a && l.removeEventListener("resize", e.update, ee);
    }
  );
}
const sn = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function () {},
  effect: wi,
  data: {},
};
var Ci = { left: "right", right: "left", bottom: "top", top: "bottom" };
function ce(n) {
  return n.replace(/left|right|bottom|top/g, function (t) {
    return Ci[t];
  });
}
var Oi = { start: "end", end: "start" };
function On(n) {
  return n.replace(/start|end/g, function (t) {
    return Oi[t];
  });
}
function rn(n) {
  var t = k(n),
    e = t.pageXOffset,
    s = t.pageYOffset;
  return { scrollLeft: e, scrollTop: s };
}
function on(n) {
  return St(it(n)).left + rn(n).scrollLeft;
}
function Ni(n, t) {
  var e = k(n),
    s = it(n),
    i = e.visualViewport,
    r = s.clientWidth,
    o = s.clientHeight,
    a = 0,
    l = 0;
  if (i) {
    (r = i.width), (o = i.height);
    var d = Es();
    (d || (!d && t === "fixed")) && ((a = i.offsetLeft), (l = i.offsetTop));
  }
  return { width: r, height: o, x: a + on(n), y: l };
}
function Si(n) {
  var t,
    e = it(n),
    s = rn(n),
    i = (t = n.ownerDocument) == null ? void 0 : t.body,
    r = pt(
      e.scrollWidth,
      e.clientWidth,
      i ? i.scrollWidth : 0,
      i ? i.clientWidth : 0
    ),
    o = pt(
      e.scrollHeight,
      e.clientHeight,
      i ? i.scrollHeight : 0,
      i ? i.clientHeight : 0
    ),
    a = -s.scrollLeft + on(n),
    l = -s.scrollTop;
  return (
    X(i || e).direction === "rtl" &&
      (a += pt(e.clientWidth, i ? i.clientWidth : 0) - r),
    { width: r, height: o, x: a, y: l }
  );
}
function an(n) {
  var t = X(n),
    e = t.overflow,
    s = t.overflowX,
    i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + i + s);
}
function ws(n) {
  return ["html", "body", "#document"].indexOf(z(n)) >= 0
    ? n.ownerDocument.body
    : V(n) && an(n)
    ? n
    : ws(ge(n));
}
function Ft(n, t) {
  var e;
  t === void 0 && (t = []);
  var s = ws(n),
    i = s === ((e = n.ownerDocument) == null ? void 0 : e.body),
    r = k(s),
    o = i ? [r].concat(r.visualViewport || [], an(s) ? s : []) : s,
    a = t.concat(o);
  return i ? a : a.concat(Ft(ge(o)));
}
function Ye(n) {
  return Object.assign({}, n, {
    left: n.x,
    top: n.y,
    right: n.x + n.width,
    bottom: n.y + n.height,
  });
}
function Di(n, t) {
  var e = St(n, !1, t === "fixed");
  return (
    (e.top = e.top + n.clientTop),
    (e.left = e.left + n.clientLeft),
    (e.bottom = e.top + n.clientHeight),
    (e.right = e.left + n.clientWidth),
    (e.width = n.clientWidth),
    (e.height = n.clientHeight),
    (e.x = e.left),
    (e.y = e.top),
    e
  );
}
function Nn(n, t, e) {
  return t === Xe ? Ye(Ni(n, e)) : mt(t) ? Di(t, e) : Ye(Si(it(n)));
}
function Li(n) {
  var t = Ft(ge(n)),
    e = ["absolute", "fixed"].indexOf(X(n).position) >= 0,
    s = e && V(n) ? Yt(n) : n;
  return mt(s)
    ? t.filter(function (i) {
        return mt(i) && vs(i, s) && z(i) !== "body";
      })
    : [];
}
function $i(n, t, e, s) {
  var i = t === "clippingParents" ? Li(n) : [].concat(t),
    r = [].concat(i, [e]),
    o = r[0],
    a = r.reduce(function (l, d) {
      var u = Nn(n, d, s);
      return (
        (l.top = pt(u.top, l.top)),
        (l.right = de(u.right, l.right)),
        (l.bottom = de(u.bottom, l.bottom)),
        (l.left = pt(u.left, l.left)),
        l
      );
    }, Nn(n, o, s));
  return (
    (a.width = a.right - a.left),
    (a.height = a.bottom - a.top),
    (a.x = a.left),
    (a.y = a.top),
    a
  );
}
function Cs(n) {
  var t = n.reference,
    e = n.element,
    s = n.placement,
    i = s ? Y(s) : null,
    r = s ? Dt(s) : null,
    o = t.x + t.width / 2 - e.width / 2,
    a = t.y + t.height / 2 - e.height / 2,
    l;
  switch (i) {
    case $:
      l = { x: o, y: t.y - e.height };
      break;
    case x:
      l = { x: o, y: t.y + t.height };
      break;
    case R:
      l = { x: t.x + t.width, y: a };
      break;
    case I:
      l = { x: t.x - e.width, y: a };
      break;
    default:
      l = { x: t.x, y: t.y };
  }
  var d = i ? en(i) : null;
  if (d != null) {
    var u = d === "y" ? "height" : "width";
    switch (r) {
      case _t:
        l[d] = l[d] - (t[u] / 2 - e[u] / 2);
        break;
      case Ot:
        l[d] = l[d] + (t[u] / 2 - e[u] / 2);
        break;
    }
  }
  return l;
}
function Lt(n, t) {
  t === void 0 && (t = {});
  var e = t,
    s = e.placement,
    i = s === void 0 ? n.placement : s,
    r = e.strategy,
    o = r === void 0 ? n.strategy : r,
    a = e.boundary,
    l = a === void 0 ? os : a,
    d = e.rootBoundary,
    u = d === void 0 ? Xe : d,
    _ = e.elementContext,
    p = _ === void 0 ? At : _,
    f = e.altBoundary,
    v = f === void 0 ? !1 : f,
    m = e.padding,
    g = m === void 0 ? 0 : m,
    A = Ts(typeof g != "number" ? g : As(g, Pt)),
    w = p === At ? as : At,
    C = n.rects.popper,
    E = n.elements[v ? w : p],
    b = $i(mt(E) ? E : E.contextElement || it(n.elements.popper), l, u, o),
    T = St(n.elements.reference),
    y = Cs({ reference: T, element: C, strategy: "absolute", placement: i }),
    S = Ye(Object.assign({}, C, y)),
    N = p === At ? S : T,
    O = {
      top: b.top - N.top + A.top,
      bottom: N.bottom - b.bottom + A.bottom,
      left: b.left - N.left + A.left,
      right: N.right - b.right + A.right,
    },
    D = n.modifiersData.offset;
  if (p === At && D) {
    var j = D[i];
    Object.keys(O).forEach(function (L) {
      var at = [R, x].indexOf(L) >= 0 ? 1 : -1,
        ct = [$, x].indexOf(L) >= 0 ? "y" : "x";
      O[L] += j[ct] * at;
    });
  }
  return O;
}
function Ii(n, t) {
  t === void 0 && (t = {});
  var e = t,
    s = e.placement,
    i = e.boundary,
    r = e.rootBoundary,
    o = e.padding,
    a = e.flipVariations,
    l = e.allowedAutoPlacements,
    d = l === void 0 ? Qe : l,
    u = Dt(s),
    _ = u
      ? a
        ? Fe
        : Fe.filter(function (v) {
            return Dt(v) === u;
          })
      : Pt,
    p = _.filter(function (v) {
      return d.indexOf(v) >= 0;
    });
  p.length === 0 && (p = _);
  var f = p.reduce(function (v, m) {
    return (
      (v[m] = Lt(n, { placement: m, boundary: i, rootBoundary: r, padding: o })[
        Y(m)
      ]),
      v
    );
  }, {});
  return Object.keys(f).sort(function (v, m) {
    return f[v] - f[m];
  });
}
function Mi(n) {
  if (Y(n) === me) return [];
  var t = ce(n);
  return [On(n), t, On(t)];
}
function Pi(n) {
  var t = n.state,
    e = n.options,
    s = n.name;
  if (!t.modifiersData[s]._skip) {
    for (
      var i = e.mainAxis,
        r = i === void 0 ? !0 : i,
        o = e.altAxis,
        a = o === void 0 ? !0 : o,
        l = e.fallbackPlacements,
        d = e.padding,
        u = e.boundary,
        _ = e.rootBoundary,
        p = e.altBoundary,
        f = e.flipVariations,
        v = f === void 0 ? !0 : f,
        m = e.allowedAutoPlacements,
        g = t.options.placement,
        A = Y(g),
        w = A === g,
        C = l || (w || !v ? [ce(g)] : Mi(g)),
        E = [g].concat(C).reduce(function (vt, J) {
          return vt.concat(
            Y(J) === me
              ? Ii(t, {
                  placement: J,
                  boundary: u,
                  rootBoundary: _,
                  padding: d,
                  flipVariations: v,
                  allowedAutoPlacements: m,
                })
              : J
          );
        }, []),
        b = t.rects.reference,
        T = t.rects.popper,
        y = new Map(),
        S = !0,
        N = E[0],
        O = 0;
      O < E.length;
      O++
    ) {
      var D = E[O],
        j = Y(D),
        L = Dt(D) === _t,
        at = [$, x].indexOf(j) >= 0,
        ct = at ? "width" : "height",
        P = Lt(t, {
          placement: D,
          boundary: u,
          rootBoundary: _,
          altBoundary: p,
          padding: d,
        }),
        F = at ? (L ? R : I) : L ? x : $;
      b[ct] > T[ct] && (F = ce(F));
      var Xt = ce(F),
        lt = [];
      if (
        (r && lt.push(P[j] <= 0),
        a && lt.push(P[F] <= 0, P[Xt] <= 0),
        lt.every(function (vt) {
          return vt;
        }))
      ) {
        (N = D), (S = !1);
        break;
      }
      y.set(D, lt);
    }
    if (S)
      for (
        var Qt = v ? 3 : 1,
          Ce = function (J) {
            var Ht = E.find(function (Zt) {
              var ut = y.get(Zt);
              if (ut)
                return ut.slice(0, J).every(function (Oe) {
                  return Oe;
                });
            });
            if (Ht) return (N = Ht), "break";
          },
          Vt = Qt;
        Vt > 0;
        Vt--
      ) {
        var Jt = Ce(Vt);
        if (Jt === "break") break;
      }
    t.placement !== N &&
      ((t.modifiersData[s]._skip = !0), (t.placement = N), (t.reset = !0));
  }
}
const Os = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Pi,
  requiresIfExists: ["offset"],
  data: { _skip: !1 },
};
function Sn(n, t, e) {
  return (
    e === void 0 && (e = { x: 0, y: 0 }),
    {
      top: n.top - t.height - e.y,
      right: n.right - t.width + e.x,
      bottom: n.bottom - t.height + e.y,
      left: n.left - t.width - e.x,
    }
  );
}
function Dn(n) {
  return [$, R, x, I].some(function (t) {
    return n[t] >= 0;
  });
}
function xi(n) {
  var t = n.state,
    e = n.name,
    s = t.rects.reference,
    i = t.rects.popper,
    r = t.modifiersData.preventOverflow,
    o = Lt(t, { elementContext: "reference" }),
    a = Lt(t, { altBoundary: !0 }),
    l = Sn(o, s),
    d = Sn(a, i, r),
    u = Dn(l),
    _ = Dn(d);
  (t.modifiersData[e] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: d,
    isReferenceHidden: u,
    hasPopperEscaped: _,
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-reference-hidden": u,
      "data-popper-escaped": _,
    }));
}
const Ns = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: xi,
};
function Ri(n, t, e) {
  var s = Y(n),
    i = [I, $].indexOf(s) >= 0 ? -1 : 1,
    r = typeof e == "function" ? e(Object.assign({}, t, { placement: n })) : e,
    o = r[0],
    a = r[1];
  return (
    (o = o || 0),
    (a = (a || 0) * i),
    [I, R].indexOf(s) >= 0 ? { x: a, y: o } : { x: o, y: a }
  );
}
function ki(n) {
  var t = n.state,
    e = n.options,
    s = n.name,
    i = e.offset,
    r = i === void 0 ? [0, 0] : i,
    o = Qe.reduce(function (u, _) {
      return (u[_] = Ri(_, t.rects, r)), u;
    }, {}),
    a = o[t.placement],
    l = a.x,
    d = a.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += l),
    (t.modifiersData.popperOffsets.y += d)),
    (t.modifiersData[s] = o);
}
const Ss = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: ki,
};
function Vi(n) {
  var t = n.state,
    e = n.name;
  t.modifiersData[e] = Cs({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement,
  });
}
const cn = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Vi,
  data: {},
};
function Hi(n) {
  return n === "x" ? "y" : "x";
}
function Bi(n) {
  var t = n.state,
    e = n.options,
    s = n.name,
    i = e.mainAxis,
    r = i === void 0 ? !0 : i,
    o = e.altAxis,
    a = o === void 0 ? !1 : o,
    l = e.boundary,
    d = e.rootBoundary,
    u = e.altBoundary,
    _ = e.padding,
    p = e.tether,
    f = p === void 0 ? !0 : p,
    v = e.tetherOffset,
    m = v === void 0 ? 0 : v,
    g = Lt(t, { boundary: l, rootBoundary: d, padding: _, altBoundary: u }),
    A = Y(t.placement),
    w = Dt(t.placement),
    C = !w,
    E = en(A),
    b = Hi(E),
    T = t.modifiersData.popperOffsets,
    y = t.rects.reference,
    S = t.rects.popper,
    N =
      typeof m == "function"
        ? m(Object.assign({}, t.rects, { placement: t.placement }))
        : m,
    O =
      typeof N == "number"
        ? { mainAxis: N, altAxis: N }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, N),
    D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    j = { x: 0, y: 0 };
  if (T) {
    if (r) {
      var L,
        at = E === "y" ? $ : I,
        ct = E === "y" ? x : R,
        P = E === "y" ? "height" : "width",
        F = T[E],
        Xt = F + g[at],
        lt = F - g[ct],
        Qt = f ? -S[P] / 2 : 0,
        Ce = w === _t ? y[P] : S[P],
        Vt = w === _t ? -S[P] : -y[P],
        Jt = t.elements.arrow,
        vt = f && Jt ? tn(Jt) : { width: 0, height: 0 },
        J = t.modifiersData["arrow#persistent"]
          ? t.modifiersData["arrow#persistent"].padding
          : bs(),
        Ht = J[at],
        Zt = J[ct],
        ut = jt(0, y[P], vt[P]),
        Oe = C
          ? y[P] / 2 - Qt - ut - Ht - O.mainAxis
          : Ce - ut - Ht - O.mainAxis,
        ai = C
          ? -y[P] / 2 + Qt + ut + Zt + O.mainAxis
          : Vt + ut + Zt + O.mainAxis,
        Ne = t.elements.arrow && Yt(t.elements.arrow),
        ci = Ne ? (E === "y" ? Ne.clientTop || 0 : Ne.clientLeft || 0) : 0,
        _n = (L = D == null ? void 0 : D[E]) != null ? L : 0,
        li = F + Oe - _n - ci,
        ui = F + ai - _n,
        mn = jt(f ? de(Xt, li) : Xt, F, f ? pt(lt, ui) : lt);
      (T[E] = mn), (j[E] = mn - F);
    }
    if (a) {
      var gn,
        di = E === "x" ? $ : I,
        hi = E === "x" ? x : R,
        dt = T[b],
        te = b === "y" ? "height" : "width",
        En = dt + g[di],
        vn = dt - g[hi],
        Se = [$, I].indexOf(A) !== -1,
        bn = (gn = D == null ? void 0 : D[b]) != null ? gn : 0,
        Tn = Se ? En : dt - y[te] - S[te] - bn + O.altAxis,
        An = Se ? dt + y[te] + S[te] - bn - O.altAxis : vn,
        yn = f && Se ? gi(Tn, dt, An) : jt(f ? Tn : En, dt, f ? An : vn);
      (T[b] = yn), (j[b] = yn - dt);
    }
    t.modifiersData[s] = j;
  }
}
const Ds = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Bi,
  requiresIfExists: ["offset"],
};
function Wi(n) {
  return { scrollLeft: n.scrollLeft, scrollTop: n.scrollTop };
}
function ji(n) {
  return n === k(n) || !V(n) ? rn(n) : Wi(n);
}
function Fi(n) {
  var t = n.getBoundingClientRect(),
    e = Nt(t.width) / n.offsetWidth || 1,
    s = Nt(t.height) / n.offsetHeight || 1;
  return e !== 1 || s !== 1;
}
function Ki(n, t, e) {
  e === void 0 && (e = !1);
  var s = V(t),
    i = V(t) && Fi(t),
    r = it(t),
    o = St(n, i, e),
    a = { scrollLeft: 0, scrollTop: 0 },
    l = { x: 0, y: 0 };
  return (
    (s || (!s && !e)) &&
      ((z(t) !== "body" || an(r)) && (a = ji(t)),
      V(t)
        ? ((l = St(t, !0)), (l.x += t.clientLeft), (l.y += t.clientTop))
        : r && (l.x = on(r))),
    {
      x: o.left + a.scrollLeft - l.x,
      y: o.top + a.scrollTop - l.y,
      width: o.width,
      height: o.height,
    }
  );
}
function Yi(n) {
  var t = new Map(),
    e = new Set(),
    s = [];
  n.forEach(function (r) {
    t.set(r.name, r);
  });
  function i(r) {
    e.add(r.name);
    var o = [].concat(r.requires || [], r.requiresIfExists || []);
    o.forEach(function (a) {
      if (!e.has(a)) {
        var l = t.get(a);
        l && i(l);
      }
    }),
      s.push(r);
  }
  return (
    n.forEach(function (r) {
      e.has(r.name) || i(r);
    }),
    s
  );
}
function Ui(n) {
  var t = Yi(n);
  return gs.reduce(function (e, s) {
    return e.concat(
      t.filter(function (i) {
        return i.phase === s;
      })
    );
  }, []);
}
function zi(n) {
  var t;
  return function () {
    return (
      t ||
        (t = new Promise(function (e) {
          Promise.resolve().then(function () {
            (t = void 0), e(n());
          });
        })),
      t
    );
  };
}
function Gi(n) {
  var t = n.reduce(function (e, s) {
    var i = e[s.name];
    return (
      (e[s.name] = i
        ? Object.assign({}, i, s, {
            options: Object.assign({}, i.options, s.options),
            data: Object.assign({}, i.data, s.data),
          })
        : s),
      e
    );
  }, {});
  return Object.keys(t).map(function (e) {
    return t[e];
  });
}
var Ln = { placement: "bottom", modifiers: [], strategy: "absolute" };
function $n() {
  for (var n = arguments.length, t = new Array(n), e = 0; e < n; e++)
    t[e] = arguments[e];
  return !t.some(function (s) {
    return !(s && typeof s.getBoundingClientRect == "function");
  });
}
function Ee(n) {
  n === void 0 && (n = {});
  var t = n,
    e = t.defaultModifiers,
    s = e === void 0 ? [] : e,
    i = t.defaultOptions,
    r = i === void 0 ? Ln : i;
  return function (a, l, d) {
    d === void 0 && (d = r);
    var u = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, Ln, r),
        modifiersData: {},
        elements: { reference: a, popper: l },
        attributes: {},
        styles: {},
      },
      _ = [],
      p = !1,
      f = {
        state: u,
        setOptions: function (A) {
          var w = typeof A == "function" ? A(u.options) : A;
          m(),
            (u.options = Object.assign({}, r, u.options, w)),
            (u.scrollParents = {
              reference: mt(a)
                ? Ft(a)
                : a.contextElement
                ? Ft(a.contextElement)
                : [],
              popper: Ft(l),
            });
          var C = Ui(Gi([].concat(s, u.options.modifiers)));
          return (
            (u.orderedModifiers = C.filter(function (E) {
              return E.enabled;
            })),
            v(),
            f.update()
          );
        },
        forceUpdate: function () {
          if (!p) {
            var A = u.elements,
              w = A.reference,
              C = A.popper;
            if ($n(w, C)) {
              (u.rects = {
                reference: Ki(w, Yt(C), u.options.strategy === "fixed"),
                popper: tn(C),
              }),
                (u.reset = !1),
                (u.placement = u.options.placement),
                u.orderedModifiers.forEach(function (O) {
                  return (u.modifiersData[O.name] = Object.assign({}, O.data));
                });
              for (var E = 0; E < u.orderedModifiers.length; E++) {
                if (u.reset === !0) {
                  (u.reset = !1), (E = -1);
                  continue;
                }
                var b = u.orderedModifiers[E],
                  T = b.fn,
                  y = b.options,
                  S = y === void 0 ? {} : y,
                  N = b.name;
                typeof T == "function" &&
                  (u = T({ state: u, options: S, name: N, instance: f }) || u);
              }
            }
          }
        },
        update: zi(function () {
          return new Promise(function (g) {
            f.forceUpdate(), g(u);
          });
        }),
        destroy: function () {
          m(), (p = !0);
        },
      };
    if (!$n(a, l)) return f;
    f.setOptions(d).then(function (g) {
      !p && d.onFirstUpdate && d.onFirstUpdate(g);
    });
    function v() {
      u.orderedModifiers.forEach(function (g) {
        var A = g.name,
          w = g.options,
          C = w === void 0 ? {} : w,
          E = g.effect;
        if (typeof E == "function") {
          var b = E({ state: u, name: A, instance: f, options: C }),
            T = function () {};
          _.push(b || T);
        }
      });
    }
    function m() {
      _.forEach(function (g) {
        return g();
      }),
        (_ = []);
    }
    return f;
  };
}
var qi = Ee(),
  Xi = [sn, cn, nn, Ze],
  Qi = Ee({ defaultModifiers: Xi }),
  Ji = [sn, cn, nn, Ze, Ss, Os, Ds, ys, Ns],
  ln = Ee({ defaultModifiers: Ji });
const Ls = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      afterMain: fs,
      afterRead: us,
      afterWrite: ms,
      applyStyles: Ze,
      arrow: ys,
      auto: me,
      basePlacements: Pt,
      beforeMain: ds,
      beforeRead: cs,
      beforeWrite: ps,
      bottom: x,
      clippingParents: os,
      computeStyles: nn,
      createPopper: ln,
      createPopperBase: qi,
      createPopperLite: Qi,
      detectOverflow: Lt,
      end: Ot,
      eventListeners: sn,
      flip: Os,
      hide: Ns,
      left: I,
      main: hs,
      modifierPhases: gs,
      offset: Ss,
      placements: Qe,
      popper: At,
      popperGenerator: Ee,
      popperOffsets: cn,
      preventOverflow: Ds,
      read: ls,
      reference: as,
      right: R,
      start: _t,
      top: $,
      variationPlacements: Fe,
      viewport: Xe,
      write: _s,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
/*!
 * Bootstrap v5.3.0 (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */ const Z = new Map(),
  De = {
    set(n, t, e) {
      Z.has(n) || Z.set(n, new Map());
      const s = Z.get(n);
      if (!s.has(t) && s.size !== 0) {
        console.error(
          `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
            Array.from(s.keys())[0]
          }.`
        );
        return;
      }
      s.set(t, e);
    },
    get(n, t) {
      return (Z.has(n) && Z.get(n).get(t)) || null;
    },
    remove(n, t) {
      if (!Z.has(n)) return;
      const e = Z.get(n);
      e.delete(t), e.size === 0 && Z.delete(n);
    },
  },
  Zi = 1e6,
  tr = 1e3,
  Ue = "transitionend",
  $s = (n) => (
    n &&
      window.CSS &&
      window.CSS.escape &&
      (n = n.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)),
    n
  ),
  er = (n) =>
    n == null
      ? `${n}`
      : Object.prototype.toString
          .call(n)
          .match(/\s([a-z]+)/i)[1]
          .toLowerCase(),
  nr = (n) => {
    do n += Math.floor(Math.random() * Zi);
    while (document.getElementById(n));
    return n;
  },
  sr = (n) => {
    if (!n) return 0;
    let { transitionDuration: t, transitionDelay: e } =
      window.getComputedStyle(n);
    const s = Number.parseFloat(t),
      i = Number.parseFloat(e);
    return !s && !i
      ? 0
      : ((t = t.split(",")[0]),
        (e = e.split(",")[0]),
        (Number.parseFloat(t) + Number.parseFloat(e)) * tr);
  },
  Is = (n) => {
    n.dispatchEvent(new Event(Ue));
  },
  G = (n) =>
    !n || typeof n != "object"
      ? !1
      : (typeof n.jquery < "u" && (n = n[0]), typeof n.nodeType < "u"),
  et = (n) =>
    G(n)
      ? n.jquery
        ? n[0]
        : n
      : typeof n == "string" && n.length > 0
      ? document.querySelector($s(n))
      : null,
  xt = (n) => {
    if (!G(n) || n.getClientRects().length === 0) return !1;
    const t = getComputedStyle(n).getPropertyValue("visibility") === "visible",
      e = n.closest("details:not([open])");
    if (!e) return t;
    if (e !== n) {
      const s = n.closest("summary");
      if ((s && s.parentNode !== e) || s === null) return !1;
    }
    return t;
  },
  nt = (n) =>
    !n || n.nodeType !== Node.ELEMENT_NODE || n.classList.contains("disabled")
      ? !0
      : typeof n.disabled < "u"
      ? n.disabled
      : n.hasAttribute("disabled") && n.getAttribute("disabled") !== "false",
  Ms = (n) => {
    if (!document.documentElement.attachShadow) return null;
    if (typeof n.getRootNode == "function") {
      const t = n.getRootNode();
      return t instanceof ShadowRoot ? t : null;
    }
    return n instanceof ShadowRoot ? n : n.parentNode ? Ms(n.parentNode) : null;
  },
  he = () => {},
  Ut = (n) => {
    n.offsetHeight;
  },
  Ps = () =>
    window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
      ? window.jQuery
      : null,
  Le = [],
  ir = (n) => {
    document.readyState === "loading"
      ? (Le.length ||
          document.addEventListener("DOMContentLoaded", () => {
            for (const t of Le) t();
          }),
        Le.push(n))
      : n();
  },
  H = () => document.documentElement.dir === "rtl",
  W = (n) => {
    ir(() => {
      const t = Ps();
      if (t) {
        const e = n.NAME,
          s = t.fn[e];
        (t.fn[e] = n.jQueryInterface),
          (t.fn[e].Constructor = n),
          (t.fn[e].noConflict = () => ((t.fn[e] = s), n.jQueryInterface));
      }
    });
  },
  M = (n, t = [], e = n) => (typeof n == "function" ? n(...t) : e),
  xs = (n, t, e = !0) => {
    if (!e) {
      M(n);
      return;
    }
    const s = 5,
      i = sr(t) + s;
    let r = !1;
    const o = ({ target: a }) => {
      a === t && ((r = !0), t.removeEventListener(Ue, o), M(n));
    };
    t.addEventListener(Ue, o),
      setTimeout(() => {
        r || Is(t);
      }, i);
  },
  un = (n, t, e, s) => {
    const i = n.length;
    let r = n.indexOf(t);
    return r === -1
      ? !e && s
        ? n[i - 1]
        : n[0]
      : ((r += e ? 1 : -1),
        s && (r = (r + i) % i),
        n[Math.max(0, Math.min(r, i - 1))]);
  },
  rr = /[^.]*(?=\..*)\.|.*/,
  or = /\..*/,
  ar = /::\d+$/,
  $e = {};
let In = 1;
const Rs = { mouseenter: "mouseover", mouseleave: "mouseout" },
  cr = new Set([
    "click",
    "dblclick",
    "mouseup",
    "mousedown",
    "contextmenu",
    "mousewheel",
    "DOMMouseScroll",
    "mouseover",
    "mouseout",
    "mousemove",
    "selectstart",
    "selectend",
    "keydown",
    "keypress",
    "keyup",
    "orientationchange",
    "touchstart",
    "touchmove",
    "touchend",
    "touchcancel",
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointerleave",
    "pointercancel",
    "gesturestart",
    "gesturechange",
    "gestureend",
    "focus",
    "blur",
    "change",
    "reset",
    "select",
    "submit",
    "focusin",
    "focusout",
    "load",
    "unload",
    "beforeunload",
    "resize",
    "move",
    "DOMContentLoaded",
    "readystatechange",
    "error",
    "abort",
    "scroll",
  ]);
function ks(n, t) {
  return (t && `${t}::${In++}`) || n.uidEvent || In++;
}
function Vs(n) {
  const t = ks(n);
  return (n.uidEvent = t), ($e[t] = $e[t] || {}), $e[t];
}
function lr(n, t) {
  return function e(s) {
    return (
      dn(s, { delegateTarget: n }),
      e.oneOff && c.off(n, s.type, t),
      t.apply(n, [s])
    );
  };
}
function ur(n, t, e) {
  return function s(i) {
    const r = n.querySelectorAll(t);
    for (let { target: o } = i; o && o !== this; o = o.parentNode)
      for (const a of r)
        if (a === o)
          return (
            dn(i, { delegateTarget: o }),
            s.oneOff && c.off(n, i.type, t, e),
            e.apply(o, [i])
          );
  };
}
function Hs(n, t, e = null) {
  return Object.values(n).find(
    (s) => s.callable === t && s.delegationSelector === e
  );
}
function Bs(n, t, e) {
  const s = typeof t == "string",
    i = s ? e : t || e;
  let r = Ws(n);
  return cr.has(r) || (r = n), [s, i, r];
}
function Mn(n, t, e, s, i) {
  if (typeof t != "string" || !n) return;
  let [r, o, a] = Bs(t, e, s);
  t in Rs &&
    (o = ((v) =>
      function (m) {
        if (
          !m.relatedTarget ||
          (m.relatedTarget !== m.delegateTarget &&
            !m.delegateTarget.contains(m.relatedTarget))
        )
          return v.call(this, m);
      })(o));
  const l = Vs(n),
    d = l[a] || (l[a] = {}),
    u = Hs(d, o, r ? e : null);
  if (u) {
    u.oneOff = u.oneOff && i;
    return;
  }
  const _ = ks(o, t.replace(rr, "")),
    p = r ? ur(n, e, o) : lr(n, o);
  (p.delegationSelector = r ? e : null),
    (p.callable = o),
    (p.oneOff = i),
    (p.uidEvent = _),
    (d[_] = p),
    n.addEventListener(a, p, r);
}
function ze(n, t, e, s, i) {
  const r = Hs(t[e], s, i);
  r && (n.removeEventListener(e, r, !!i), delete t[e][r.uidEvent]);
}
function dr(n, t, e, s) {
  const i = t[e] || {};
  for (const [r, o] of Object.entries(i))
    r.includes(s) && ze(n, t, e, o.callable, o.delegationSelector);
}
function Ws(n) {
  return (n = n.replace(or, "")), Rs[n] || n;
}
const c = {
  on(n, t, e, s) {
    Mn(n, t, e, s, !1);
  },
  one(n, t, e, s) {
    Mn(n, t, e, s, !0);
  },
  off(n, t, e, s) {
    if (typeof t != "string" || !n) return;
    const [i, r, o] = Bs(t, e, s),
      a = o !== t,
      l = Vs(n),
      d = l[o] || {},
      u = t.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(d).length) return;
      ze(n, l, o, r, i ? e : null);
      return;
    }
    if (u) for (const _ of Object.keys(l)) dr(n, l, _, t.slice(1));
    for (const [_, p] of Object.entries(d)) {
      const f = _.replace(ar, "");
      (!a || t.includes(f)) && ze(n, l, o, p.callable, p.delegationSelector);
    }
  },
  trigger(n, t, e) {
    if (typeof t != "string" || !n) return null;
    const s = Ps(),
      i = Ws(t),
      r = t !== i;
    let o = null,
      a = !0,
      l = !0,
      d = !1;
    r &&
      s &&
      ((o = s.Event(t, e)),
      s(n).trigger(o),
      (a = !o.isPropagationStopped()),
      (l = !o.isImmediatePropagationStopped()),
      (d = o.isDefaultPrevented()));
    const u = dn(new Event(t, { bubbles: a, cancelable: !0 }), e);
    return (
      d && u.preventDefault(),
      l && n.dispatchEvent(u),
      u.defaultPrevented && o && o.preventDefault(),
      u
    );
  },
};
function dn(n, t = {}) {
  for (const [e, s] of Object.entries(t))
    try {
      n[e] = s;
    } catch {
      Object.defineProperty(n, e, {
        configurable: !0,
        get() {
          return s;
        },
      });
    }
  return n;
}
function Pn(n) {
  if (n === "true") return !0;
  if (n === "false") return !1;
  if (n === Number(n).toString()) return Number(n);
  if (n === "" || n === "null") return null;
  if (typeof n != "string") return n;
  try {
    return JSON.parse(decodeURIComponent(n));
  } catch {
    return n;
  }
}
function Ie(n) {
  return n.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const q = {
  setDataAttribute(n, t, e) {
    n.setAttribute(`data-bs-${Ie(t)}`, e);
  },
  removeDataAttribute(n, t) {
    n.removeAttribute(`data-bs-${Ie(t)}`);
  },
  getDataAttributes(n) {
    if (!n) return {};
    const t = {},
      e = Object.keys(n.dataset).filter(
        (s) => s.startsWith("bs") && !s.startsWith("bsConfig")
      );
    for (const s of e) {
      let i = s.replace(/^bs/, "");
      (i = i.charAt(0).toLowerCase() + i.slice(1, i.length)),
        (t[i] = Pn(n.dataset[s]));
    }
    return t;
  },
  getDataAttribute(n, t) {
    return Pn(n.getAttribute(`data-bs-${Ie(t)}`));
  },
};
class zt {
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error(
      'You have to implement the static method "NAME", for each component!'
    );
  }
  _getConfig(t) {
    return (
      (t = this._mergeConfigObj(t)),
      (t = this._configAfterMerge(t)),
      this._typeCheckConfig(t),
      t
    );
  }
  _configAfterMerge(t) {
    return t;
  }
  _mergeConfigObj(t, e) {
    const s = G(e) ? q.getDataAttribute(e, "config") : {};
    return {
      ...this.constructor.Default,
      ...(typeof s == "object" ? s : {}),
      ...(G(e) ? q.getDataAttributes(e) : {}),
      ...(typeof t == "object" ? t : {}),
    };
  }
  _typeCheckConfig(t, e = this.constructor.DefaultType) {
    for (const [s, i] of Object.entries(e)) {
      const r = t[s],
        o = G(r) ? "element" : er(r);
      if (!new RegExp(i).test(o))
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${s}" provided type "${o}" but expected type "${i}".`
        );
    }
  }
}
const hr = "5.3.0";
class K extends zt {
  constructor(t, e) {
    super(),
      (t = et(t)),
      t &&
        ((this._element = t),
        (this._config = this._getConfig(e)),
        De.set(this._element, this.constructor.DATA_KEY, this));
  }
  dispose() {
    De.remove(this._element, this.constructor.DATA_KEY),
      c.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this)) this[t] = null;
  }
  _queueCallback(t, e, s = !0) {
    xs(t, e, s);
  }
  _getConfig(t) {
    return (
      (t = this._mergeConfigObj(t, this._element)),
      (t = this._configAfterMerge(t)),
      this._typeCheckConfig(t),
      t
    );
  }
  static getInstance(t) {
    return De.get(et(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
  static get VERSION() {
    return hr;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(t) {
    return `${t}${this.EVENT_KEY}`;
  }
}
const Me = (n) => {
    let t = n.getAttribute("data-bs-target");
    if (!t || t === "#") {
      let e = n.getAttribute("href");
      if (!e || (!e.includes("#") && !e.startsWith("."))) return null;
      e.includes("#") && !e.startsWith("#") && (e = `#${e.split("#")[1]}`),
        (t = e && e !== "#" ? e.trim() : null);
    }
    return $s(t);
  },
  h = {
    find(n, t = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(t, n));
    },
    findOne(n, t = document.documentElement) {
      return Element.prototype.querySelector.call(t, n);
    },
    children(n, t) {
      return [].concat(...n.children).filter((e) => e.matches(t));
    },
    parents(n, t) {
      const e = [];
      let s = n.parentNode.closest(t);
      for (; s; ) e.push(s), (s = s.parentNode.closest(t));
      return e;
    },
    prev(n, t) {
      let e = n.previousElementSibling;
      for (; e; ) {
        if (e.matches(t)) return [e];
        e = e.previousElementSibling;
      }
      return [];
    },
    next(n, t) {
      let e = n.nextElementSibling;
      for (; e; ) {
        if (e.matches(t)) return [e];
        e = e.nextElementSibling;
      }
      return [];
    },
    focusableChildren(n) {
      const t = [
        "a",
        "button",
        "input",
        "textarea",
        "select",
        "details",
        "[tabindex]",
        '[contenteditable="true"]',
      ]
        .map((e) => `${e}:not([tabindex^="-"])`)
        .join(",");
      return this.find(t, n).filter((e) => !nt(e) && xt(e));
    },
    getSelectorFromElement(n) {
      const t = Me(n);
      return t && h.findOne(t) ? t : null;
    },
    getElementFromSelector(n) {
      const t = Me(n);
      return t ? h.findOne(t) : null;
    },
    getMultipleElementsFromSelector(n) {
      const t = Me(n);
      return t ? h.find(t) : [];
    },
  },
  ve = (n, t = "hide") => {
    const e = `click.dismiss${n.EVENT_KEY}`,
      s = n.NAME;
    c.on(document, e, `[data-bs-dismiss="${s}"]`, function (i) {
      if (
        (["A", "AREA"].includes(this.tagName) && i.preventDefault(), nt(this))
      )
        return;
      const r = h.getElementFromSelector(this) || this.closest(`.${s}`);
      n.getOrCreateInstance(r)[t]();
    });
  },
  fr = "alert",
  pr = "bs.alert",
  js = `.${pr}`,
  _r = `close${js}`,
  mr = `closed${js}`,
  gr = "fade",
  Er = "show";
class be extends K {
  static get NAME() {
    return fr;
  }
  close() {
    if (c.trigger(this._element, _r).defaultPrevented) return;
    this._element.classList.remove(Er);
    const e = this._element.classList.contains(gr);
    this._queueCallback(() => this._destroyElement(), this._element, e);
  }
  _destroyElement() {
    this._element.remove(), c.trigger(this._element, mr), this.dispose();
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = be.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
ve(be, "close");
W(be);
const vr = "button",
  br = "bs.button",
  Tr = `.${br}`,
  Ar = ".data-api",
  yr = "active",
  xn = '[data-bs-toggle="button"]',
  wr = `click${Tr}${Ar}`;
class Te extends K {
  static get NAME() {
    return vr;
  }
  toggle() {
    this._element.setAttribute(
      "aria-pressed",
      this._element.classList.toggle(yr)
    );
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Te.getOrCreateInstance(this);
      t === "toggle" && e[t]();
    });
  }
}
c.on(document, wr, xn, (n) => {
  n.preventDefault();
  const t = n.target.closest(xn);
  Te.getOrCreateInstance(t).toggle();
});
W(Te);
const Cr = "swipe",
  Rt = ".bs.swipe",
  Or = `touchstart${Rt}`,
  Nr = `touchmove${Rt}`,
  Sr = `touchend${Rt}`,
  Dr = `pointerdown${Rt}`,
  Lr = `pointerup${Rt}`,
  $r = "touch",
  Ir = "pen",
  Mr = "pointer-event",
  Pr = 40,
  xr = { endCallback: null, leftCallback: null, rightCallback: null },
  Rr = {
    endCallback: "(function|null)",
    leftCallback: "(function|null)",
    rightCallback: "(function|null)",
  };
class fe extends zt {
  constructor(t, e) {
    super(),
      (this._element = t),
      !(!t || !fe.isSupported()) &&
        ((this._config = this._getConfig(e)),
        (this._deltaX = 0),
        (this._supportPointerEvents = !!window.PointerEvent),
        this._initEvents());
  }
  static get Default() {
    return xr;
  }
  static get DefaultType() {
    return Rr;
  }
  static get NAME() {
    return Cr;
  }
  dispose() {
    c.off(this._element, Rt);
  }
  _start(t) {
    if (!this._supportPointerEvents) {
      this._deltaX = t.touches[0].clientX;
      return;
    }
    this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX);
  }
  _end(t) {
    this._eventIsPointerPenTouch(t) &&
      (this._deltaX = t.clientX - this._deltaX),
      this._handleSwipe(),
      M(this._config.endCallback);
  }
  _move(t) {
    this._deltaX =
      t.touches && t.touches.length > 1
        ? 0
        : t.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const t = Math.abs(this._deltaX);
    if (t <= Pr) return;
    const e = t / this._deltaX;
    (this._deltaX = 0),
      e && M(e > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents
      ? (c.on(this._element, Dr, (t) => this._start(t)),
        c.on(this._element, Lr, (t) => this._end(t)),
        this._element.classList.add(Mr))
      : (c.on(this._element, Or, (t) => this._start(t)),
        c.on(this._element, Nr, (t) => this._move(t)),
        c.on(this._element, Sr, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return (
      this._supportPointerEvents &&
      (t.pointerType === Ir || t.pointerType === $r)
    );
  }
  static isSupported() {
    return (
      "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0
    );
  }
}
const kr = "carousel",
  Vr = "bs.carousel",
  rt = `.${Vr}`,
  Fs = ".data-api",
  Hr = "ArrowLeft",
  Br = "ArrowRight",
  Wr = 500,
  Bt = "next",
  bt = "prev",
  yt = "left",
  le = "right",
  jr = `slide${rt}`,
  Pe = `slid${rt}`,
  Fr = `keydown${rt}`,
  Kr = `mouseenter${rt}`,
  Yr = `mouseleave${rt}`,
  Ur = `dragstart${rt}`,
  zr = `load${rt}${Fs}`,
  Gr = `click${rt}${Fs}`,
  Ks = "carousel",
  ne = "active",
  qr = "slide",
  Xr = "carousel-item-end",
  Qr = "carousel-item-start",
  Jr = "carousel-item-next",
  Zr = "carousel-item-prev",
  Ys = ".active",
  Us = ".carousel-item",
  to = Ys + Us,
  eo = ".carousel-item img",
  no = ".carousel-indicators",
  so = "[data-bs-slide], [data-bs-slide-to]",
  io = '[data-bs-ride="carousel"]',
  ro = { [Hr]: le, [Br]: yt },
  oo = {
    interval: 5e3,
    keyboard: !0,
    pause: "hover",
    ride: !1,
    touch: !0,
    wrap: !0,
  },
  ao = {
    interval: "(number|boolean)",
    keyboard: "boolean",
    pause: "(string|boolean)",
    ride: "(boolean|string)",
    touch: "boolean",
    wrap: "boolean",
  };
class Gt extends K {
  constructor(t, e) {
    super(t, e),
      (this._interval = null),
      (this._activeElement = null),
      (this._isSliding = !1),
      (this.touchTimeout = null),
      (this._swipeHelper = null),
      (this._indicatorsElement = h.findOne(no, this._element)),
      this._addEventListeners(),
      this._config.ride === Ks && this.cycle();
  }
  static get Default() {
    return oo;
  }
  static get DefaultType() {
    return ao;
  }
  static get NAME() {
    return kr;
  }
  next() {
    this._slide(Bt);
  }
  nextWhenVisible() {
    !document.hidden && xt(this._element) && this.next();
  }
  prev() {
    this._slide(bt);
  }
  pause() {
    this._isSliding && Is(this._element), this._clearInterval();
  }
  cycle() {
    this._clearInterval(),
      this._updateInterval(),
      (this._interval = setInterval(
        () => this.nextWhenVisible(),
        this._config.interval
      ));
  }
  _maybeEnableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        c.one(this._element, Pe, () => this.cycle());
        return;
      }
      this.cycle();
    }
  }
  to(t) {
    const e = this._getItems();
    if (t > e.length - 1 || t < 0) return;
    if (this._isSliding) {
      c.one(this._element, Pe, () => this.to(t));
      return;
    }
    const s = this._getItemIndex(this._getActive());
    if (s === t) return;
    const i = t > s ? Bt : bt;
    this._slide(i, e[t]);
  }
  dispose() {
    this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
  }
  _configAfterMerge(t) {
    return (t.defaultInterval = t.interval), t;
  }
  _addEventListeners() {
    this._config.keyboard && c.on(this._element, Fr, (t) => this._keydown(t)),
      this._config.pause === "hover" &&
        (c.on(this._element, Kr, () => this.pause()),
        c.on(this._element, Yr, () => this._maybeEnableCycle())),
      this._config.touch && fe.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const s of h.find(eo, this._element))
      c.on(s, Ur, (i) => i.preventDefault());
    const e = {
      leftCallback: () => this._slide(this._directionToOrder(yt)),
      rightCallback: () => this._slide(this._directionToOrder(le)),
      endCallback: () => {
        this._config.pause === "hover" &&
          (this.pause(),
          this.touchTimeout && clearTimeout(this.touchTimeout),
          (this.touchTimeout = setTimeout(
            () => this._maybeEnableCycle(),
            Wr + this._config.interval
          )));
      },
    };
    this._swipeHelper = new fe(this._element, e);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName)) return;
    const e = ro[t.key];
    e && (t.preventDefault(), this._slide(this._directionToOrder(e)));
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement) return;
    const e = h.findOne(Ys, this._indicatorsElement);
    e.classList.remove(ne), e.removeAttribute("aria-current");
    const s = h.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    s && (s.classList.add(ne), s.setAttribute("aria-current", "true"));
  }
  _updateInterval() {
    const t = this._activeElement || this._getActive();
    if (!t) return;
    const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
    this._config.interval = e || this._config.defaultInterval;
  }
  _slide(t, e = null) {
    if (this._isSliding) return;
    const s = this._getActive(),
      i = t === Bt,
      r = e || un(this._getItems(), s, i, this._config.wrap);
    if (r === s) return;
    const o = this._getItemIndex(r),
      a = (f) =>
        c.trigger(this._element, f, {
          relatedTarget: r,
          direction: this._orderToDirection(t),
          from: this._getItemIndex(s),
          to: o,
        });
    if (a(jr).defaultPrevented || !s || !r) return;
    const d = !!this._interval;
    this.pause(),
      (this._isSliding = !0),
      this._setActiveIndicatorElement(o),
      (this._activeElement = r);
    const u = i ? Qr : Xr,
      _ = i ? Jr : Zr;
    r.classList.add(_), Ut(r), s.classList.add(u), r.classList.add(u);
    const p = () => {
      r.classList.remove(u, _),
        r.classList.add(ne),
        s.classList.remove(ne, _, u),
        (this._isSliding = !1),
        a(Pe);
    };
    this._queueCallback(p, s, this._isAnimated()), d && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(qr);
  }
  _getActive() {
    return h.findOne(to, this._element);
  }
  _getItems() {
    return h.find(Us, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), (this._interval = null));
  }
  _directionToOrder(t) {
    return H() ? (t === yt ? bt : Bt) : t === yt ? Bt : bt;
  }
  _orderToDirection(t) {
    return H() ? (t === bt ? yt : le) : t === bt ? le : yt;
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Gt.getOrCreateInstance(this, t);
      if (typeof t == "number") {
        e.to(t);
        return;
      }
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
c.on(document, Gr, so, function (n) {
  const t = h.getElementFromSelector(this);
  if (!t || !t.classList.contains(Ks)) return;
  n.preventDefault();
  const e = Gt.getOrCreateInstance(t),
    s = this.getAttribute("data-bs-slide-to");
  if (s) {
    e.to(s), e._maybeEnableCycle();
    return;
  }
  if (q.getDataAttribute(this, "slide") === "next") {
    e.next(), e._maybeEnableCycle();
    return;
  }
  e.prev(), e._maybeEnableCycle();
});
c.on(window, zr, () => {
  const n = h.find(io);
  for (const t of n) Gt.getOrCreateInstance(t);
});
W(Gt);
const co = "collapse",
  lo = "bs.collapse",
  qt = `.${lo}`,
  uo = ".data-api",
  ho = `show${qt}`,
  fo = `shown${qt}`,
  po = `hide${qt}`,
  _o = `hidden${qt}`,
  mo = `click${qt}${uo}`,
  xe = "show",
  Ct = "collapse",
  se = "collapsing",
  go = "collapsed",
  Eo = `:scope .${Ct} .${Ct}`,
  vo = "collapse-horizontal",
  bo = "width",
  To = "height",
  Ao = ".collapse.show, .collapse.collapsing",
  Ge = '[data-bs-toggle="collapse"]',
  yo = { parent: null, toggle: !0 },
  wo = { parent: "(null|element)", toggle: "boolean" };
class Kt extends K {
  constructor(t, e) {
    super(t, e), (this._isTransitioning = !1), (this._triggerArray = []);
    const s = h.find(Ge);
    for (const i of s) {
      const r = h.getSelectorFromElement(i),
        o = h.find(r).filter((a) => a === this._element);
      r !== null && o.length && this._triggerArray.push(i);
    }
    this._initializeChildren(),
      this._config.parent ||
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
      this._config.toggle && this.toggle();
  }
  static get Default() {
    return yo;
  }
  static get DefaultType() {
    return wo;
  }
  static get NAME() {
    return co;
  }
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown()) return;
    let t = [];
    if (
      (this._config.parent &&
        (t = this._getFirstLevelChildren(Ao)
          .filter((a) => a !== this._element)
          .map((a) => Kt.getOrCreateInstance(a, { toggle: !1 }))),
      (t.length && t[0]._isTransitioning) ||
        c.trigger(this._element, ho).defaultPrevented)
    )
      return;
    for (const a of t) a.hide();
    const s = this._getDimension();
    this._element.classList.remove(Ct),
      this._element.classList.add(se),
      (this._element.style[s] = 0),
      this._addAriaAndCollapsedClass(this._triggerArray, !0),
      (this._isTransitioning = !0);
    const i = () => {
        (this._isTransitioning = !1),
          this._element.classList.remove(se),
          this._element.classList.add(Ct, xe),
          (this._element.style[s] = ""),
          c.trigger(this._element, fo);
      },
      o = `scroll${s[0].toUpperCase() + s.slice(1)}`;
    this._queueCallback(i, this._element, !0),
      (this._element.style[s] = `${this._element[o]}px`);
  }
  hide() {
    if (
      this._isTransitioning ||
      !this._isShown() ||
      c.trigger(this._element, po).defaultPrevented
    )
      return;
    const e = this._getDimension();
    (this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`),
      Ut(this._element),
      this._element.classList.add(se),
      this._element.classList.remove(Ct, xe);
    for (const i of this._triggerArray) {
      const r = h.getElementFromSelector(i);
      r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const s = () => {
      (this._isTransitioning = !1),
        this._element.classList.remove(se),
        this._element.classList.add(Ct),
        c.trigger(this._element, _o);
    };
    (this._element.style[e] = ""), this._queueCallback(s, this._element, !0);
  }
  _isShown(t = this._element) {
    return t.classList.contains(xe);
  }
  _configAfterMerge(t) {
    return (t.toggle = !!t.toggle), (t.parent = et(t.parent)), t;
  }
  _getDimension() {
    return this._element.classList.contains(vo) ? bo : To;
  }
  _initializeChildren() {
    if (!this._config.parent) return;
    const t = this._getFirstLevelChildren(Ge);
    for (const e of t) {
      const s = h.getElementFromSelector(e);
      s && this._addAriaAndCollapsedClass([e], this._isShown(s));
    }
  }
  _getFirstLevelChildren(t) {
    const e = h.find(Eo, this._config.parent);
    return h.find(t, this._config.parent).filter((s) => !e.includes(s));
  }
  _addAriaAndCollapsedClass(t, e) {
    if (t.length)
      for (const s of t)
        s.classList.toggle(go, !e), s.setAttribute("aria-expanded", e);
  }
  static jQueryInterface(t) {
    const e = {};
    return (
      typeof t == "string" && /show|hide/.test(t) && (e.toggle = !1),
      this.each(function () {
        const s = Kt.getOrCreateInstance(this, e);
        if (typeof t == "string") {
          if (typeof s[t] > "u") throw new TypeError(`No method named "${t}"`);
          s[t]();
        }
      })
    );
  }
}
c.on(document, mo, Ge, function (n) {
  (n.target.tagName === "A" ||
    (n.delegateTarget && n.delegateTarget.tagName === "A")) &&
    n.preventDefault();
  for (const t of h.getMultipleElementsFromSelector(this))
    Kt.getOrCreateInstance(t, { toggle: !1 }).toggle();
});
W(Kt);
const Rn = "dropdown",
  Co = "bs.dropdown",
  gt = `.${Co}`,
  hn = ".data-api",
  Oo = "Escape",
  kn = "Tab",
  No = "ArrowUp",
  Vn = "ArrowDown",
  So = 2,
  Do = `hide${gt}`,
  Lo = `hidden${gt}`,
  $o = `show${gt}`,
  Io = `shown${gt}`,
  zs = `click${gt}${hn}`,
  Gs = `keydown${gt}${hn}`,
  Mo = `keyup${gt}${hn}`,
  wt = "show",
  Po = "dropup",
  xo = "dropend",
  Ro = "dropstart",
  ko = "dropup-center",
  Vo = "dropdown-center",
  ht = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
  Ho = `${ht}.${wt}`,
  ue = ".dropdown-menu",
  Bo = ".navbar",
  Wo = ".navbar-nav",
  jo = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
  Fo = H() ? "top-end" : "top-start",
  Ko = H() ? "top-start" : "top-end",
  Yo = H() ? "bottom-end" : "bottom-start",
  Uo = H() ? "bottom-start" : "bottom-end",
  zo = H() ? "left-start" : "right-start",
  Go = H() ? "right-start" : "left-start",
  qo = "top",
  Xo = "bottom",
  Qo = {
    autoClose: !0,
    boundary: "clippingParents",
    display: "dynamic",
    offset: [0, 2],
    popperConfig: null,
    reference: "toggle",
  },
  Jo = {
    autoClose: "(boolean|string)",
    boundary: "(string|element)",
    display: "string",
    offset: "(array|string|function)",
    popperConfig: "(null|object|function)",
    reference: "(string|element|object)",
  };
class U extends K {
  constructor(t, e) {
    super(t, e),
      (this._popper = null),
      (this._parent = this._element.parentNode),
      (this._menu =
        h.next(this._element, ue)[0] ||
        h.prev(this._element, ue)[0] ||
        h.findOne(ue, this._parent)),
      (this._inNavbar = this._detectNavbar());
  }
  static get Default() {
    return Qo;
  }
  static get DefaultType() {
    return Jo;
  }
  static get NAME() {
    return Rn;
  }
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (nt(this._element) || this._isShown()) return;
    const t = { relatedTarget: this._element };
    if (!c.trigger(this._element, $o, t).defaultPrevented) {
      if (
        (this._createPopper(),
        "ontouchstart" in document.documentElement && !this._parent.closest(Wo))
      )
        for (const s of [].concat(...document.body.children))
          c.on(s, "mouseover", he);
      this._element.focus(),
        this._element.setAttribute("aria-expanded", !0),
        this._menu.classList.add(wt),
        this._element.classList.add(wt),
        c.trigger(this._element, Io, t);
    }
  }
  hide() {
    if (nt(this._element) || !this._isShown()) return;
    const t = { relatedTarget: this._element };
    this._completeHide(t);
  }
  dispose() {
    this._popper && this._popper.destroy(), super.dispose();
  }
  update() {
    (this._inNavbar = this._detectNavbar()),
      this._popper && this._popper.update();
  }
  _completeHide(t) {
    if (!c.trigger(this._element, Do, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const s of [].concat(...document.body.children))
          c.off(s, "mouseover", he);
      this._popper && this._popper.destroy(),
        this._menu.classList.remove(wt),
        this._element.classList.remove(wt),
        this._element.setAttribute("aria-expanded", "false"),
        q.removeDataAttribute(this._menu, "popper"),
        c.trigger(this._element, Lo, t);
    }
  }
  _getConfig(t) {
    if (
      ((t = super._getConfig(t)),
      typeof t.reference == "object" &&
        !G(t.reference) &&
        typeof t.reference.getBoundingClientRect != "function")
    )
      throw new TypeError(
        `${Rn.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
      );
    return t;
  }
  _createPopper() {
    if (typeof Ls > "u")
      throw new TypeError(
        "Bootstrap's dropdowns require Popper (https://popper.js.org)"
      );
    let t = this._element;
    this._config.reference === "parent"
      ? (t = this._parent)
      : G(this._config.reference)
      ? (t = et(this._config.reference))
      : typeof this._config.reference == "object" &&
        (t = this._config.reference);
    const e = this._getPopperConfig();
    this._popper = ln(t, this._menu, e);
  }
  _isShown() {
    return this._menu.classList.contains(wt);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(xo)) return zo;
    if (t.classList.contains(Ro)) return Go;
    if (t.classList.contains(ko)) return qo;
    if (t.classList.contains(Vo)) return Xo;
    const e =
      getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() ===
      "end";
    return t.classList.contains(Po) ? (e ? Ko : Fo) : e ? Uo : Yo;
  }
  _detectNavbar() {
    return this._element.closest(Bo) !== null;
  }
  _getOffset() {
    const { offset: t } = this._config;
    return typeof t == "string"
      ? t.split(",").map((e) => Number.parseInt(e, 10))
      : typeof t == "function"
      ? (e) => t(e, this._element)
      : t;
  }
  _getPopperConfig() {
    const t = {
      placement: this._getPlacement(),
      modifiers: [
        {
          name: "preventOverflow",
          options: { boundary: this._config.boundary },
        },
        { name: "offset", options: { offset: this._getOffset() } },
      ],
    };
    return (
      (this._inNavbar || this._config.display === "static") &&
        (q.setDataAttribute(this._menu, "popper", "static"),
        (t.modifiers = [{ name: "applyStyles", enabled: !1 }])),
      { ...t, ...M(this._config.popperConfig, [t]) }
    );
  }
  _selectMenuItem({ key: t, target: e }) {
    const s = h.find(jo, this._menu).filter((i) => xt(i));
    s.length && un(s, e, t === Vn, !s.includes(e)).focus();
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = U.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u") throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === So || (t.type === "keyup" && t.key !== kn)) return;
    const e = h.find(Ho);
    for (const s of e) {
      const i = U.getInstance(s);
      if (!i || i._config.autoClose === !1) continue;
      const r = t.composedPath(),
        o = r.includes(i._menu);
      if (
        r.includes(i._element) ||
        (i._config.autoClose === "inside" && !o) ||
        (i._config.autoClose === "outside" && o) ||
        (i._menu.contains(t.target) &&
          ((t.type === "keyup" && t.key === kn) ||
            /input|select|option|textarea|form/i.test(t.target.tagName)))
      )
        continue;
      const a = { relatedTarget: i._element };
      t.type === "click" && (a.clickEvent = t), i._completeHide(a);
    }
  }
  static dataApiKeydownHandler(t) {
    const e = /input|textarea/i.test(t.target.tagName),
      s = t.key === Oo,
      i = [No, Vn].includes(t.key);
    if ((!i && !s) || (e && !s)) return;
    t.preventDefault();
    const r = this.matches(ht)
        ? this
        : h.prev(this, ht)[0] ||
          h.next(this, ht)[0] ||
          h.findOne(ht, t.delegateTarget.parentNode),
      o = U.getOrCreateInstance(r);
    if (i) {
      t.stopPropagation(), o.show(), o._selectMenuItem(t);
      return;
    }
    o._isShown() && (t.stopPropagation(), o.hide(), r.focus());
  }
}
c.on(document, Gs, ht, U.dataApiKeydownHandler);
c.on(document, Gs, ue, U.dataApiKeydownHandler);
c.on(document, zs, U.clearMenus);
c.on(document, Mo, U.clearMenus);
c.on(document, zs, ht, function (n) {
  n.preventDefault(), U.getOrCreateInstance(this).toggle();
});
W(U);
const qs = "backdrop",
  Zo = "fade",
  Hn = "show",
  Bn = `mousedown.bs.${qs}`,
  ta = {
    className: "modal-backdrop",
    clickCallback: null,
    isAnimated: !1,
    isVisible: !0,
    rootElement: "body",
  },
  ea = {
    className: "string",
    clickCallback: "(function|null)",
    isAnimated: "boolean",
    isVisible: "boolean",
    rootElement: "(element|string)",
  };
class Xs extends zt {
  constructor(t) {
    super(),
      (this._config = this._getConfig(t)),
      (this._isAppended = !1),
      (this._element = null);
  }
  static get Default() {
    return ta;
  }
  static get DefaultType() {
    return ea;
  }
  static get NAME() {
    return qs;
  }
  show(t) {
    if (!this._config.isVisible) {
      M(t);
      return;
    }
    this._append();
    const e = this._getElement();
    this._config.isAnimated && Ut(e),
      e.classList.add(Hn),
      this._emulateAnimation(() => {
        M(t);
      });
  }
  hide(t) {
    if (!this._config.isVisible) {
      M(t);
      return;
    }
    this._getElement().classList.remove(Hn),
      this._emulateAnimation(() => {
        this.dispose(), M(t);
      });
  }
  dispose() {
    this._isAppended &&
      (c.off(this._element, Bn),
      this._element.remove(),
      (this._isAppended = !1));
  }
  _getElement() {
    if (!this._element) {
      const t = document.createElement("div");
      (t.className = this._config.className),
        this._config.isAnimated && t.classList.add(Zo),
        (this._element = t);
    }
    return this._element;
  }
  _configAfterMerge(t) {
    return (t.rootElement = et(t.rootElement)), t;
  }
  _append() {
    if (this._isAppended) return;
    const t = this._getElement();
    this._config.rootElement.append(t),
      c.on(t, Bn, () => {
        M(this._config.clickCallback);
      }),
      (this._isAppended = !0);
  }
  _emulateAnimation(t) {
    xs(t, this._getElement(), this._config.isAnimated);
  }
}
const na = "focustrap",
  sa = "bs.focustrap",
  pe = `.${sa}`,
  ia = `focusin${pe}`,
  ra = `keydown.tab${pe}`,
  oa = "Tab",
  aa = "forward",
  Wn = "backward",
  ca = { autofocus: !0, trapElement: null },
  la = { autofocus: "boolean", trapElement: "element" };
class Qs extends zt {
  constructor(t) {
    super(),
      (this._config = this._getConfig(t)),
      (this._isActive = !1),
      (this._lastTabNavDirection = null);
  }
  static get Default() {
    return ca;
  }
  static get DefaultType() {
    return la;
  }
  static get NAME() {
    return na;
  }
  activate() {
    this._isActive ||
      (this._config.autofocus && this._config.trapElement.focus(),
      c.off(document, pe),
      c.on(document, ia, (t) => this._handleFocusin(t)),
      c.on(document, ra, (t) => this._handleKeydown(t)),
      (this._isActive = !0));
  }
  deactivate() {
    this._isActive && ((this._isActive = !1), c.off(document, pe));
  }
  _handleFocusin(t) {
    const { trapElement: e } = this._config;
    if (t.target === document || t.target === e || e.contains(t.target)) return;
    const s = h.focusableChildren(e);
    s.length === 0
      ? e.focus()
      : this._lastTabNavDirection === Wn
      ? s[s.length - 1].focus()
      : s[0].focus();
  }
  _handleKeydown(t) {
    t.key === oa && (this._lastTabNavDirection = t.shiftKey ? Wn : aa);
  }
}
const jn = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
  Fn = ".sticky-top",
  ie = "padding-right",
  Kn = "margin-right";
class qe {
  constructor() {
    this._element = document.body;
  }
  getWidth() {
    const t = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - t);
  }
  hide() {
    const t = this.getWidth();
    this._disableOverFlow(),
      this._setElementAttributes(this._element, ie, (e) => e + t),
      this._setElementAttributes(jn, ie, (e) => e + t),
      this._setElementAttributes(Fn, Kn, (e) => e - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"),
      this._resetElementAttributes(this._element, ie),
      this._resetElementAttributes(jn, ie),
      this._resetElementAttributes(Fn, Kn);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow"),
      (this._element.style.overflow = "hidden");
  }
  _setElementAttributes(t, e, s) {
    const i = this.getWidth(),
      r = (o) => {
        if (o !== this._element && window.innerWidth > o.clientWidth + i)
          return;
        this._saveInitialAttribute(o, e);
        const a = window.getComputedStyle(o).getPropertyValue(e);
        o.style.setProperty(e, `${s(Number.parseFloat(a))}px`);
      };
    this._applyManipulationCallback(t, r);
  }
  _saveInitialAttribute(t, e) {
    const s = t.style.getPropertyValue(e);
    s && q.setDataAttribute(t, e, s);
  }
  _resetElementAttributes(t, e) {
    const s = (i) => {
      const r = q.getDataAttribute(i, e);
      if (r === null) {
        i.style.removeProperty(e);
        return;
      }
      q.removeDataAttribute(i, e), i.style.setProperty(e, r);
    };
    this._applyManipulationCallback(t, s);
  }
  _applyManipulationCallback(t, e) {
    if (G(t)) {
      e(t);
      return;
    }
    for (const s of h.find(t, this._element)) e(s);
  }
}
const ua = "modal",
  da = "bs.modal",
  B = `.${da}`,
  ha = ".data-api",
  fa = "Escape",
  pa = `hide${B}`,
  _a = `hidePrevented${B}`,
  Js = `hidden${B}`,
  Zs = `show${B}`,
  ma = `shown${B}`,
  ga = `resize${B}`,
  Ea = `click.dismiss${B}`,
  va = `mousedown.dismiss${B}`,
  ba = `keydown.dismiss${B}`,
  Ta = `click${B}${ha}`,
  Yn = "modal-open",
  Aa = "fade",
  Un = "show",
  Re = "modal-static",
  ya = ".modal.show",
  wa = ".modal-dialog",
  Ca = ".modal-body",
  Oa = '[data-bs-toggle="modal"]',
  Na = { backdrop: !0, focus: !0, keyboard: !0 },
  Sa = { backdrop: "(boolean|string)", focus: "boolean", keyboard: "boolean" };
class $t extends K {
  constructor(t, e) {
    super(t, e),
      (this._dialog = h.findOne(wa, this._element)),
      (this._backdrop = this._initializeBackDrop()),
      (this._focustrap = this._initializeFocusTrap()),
      (this._isShown = !1),
      (this._isTransitioning = !1),
      (this._scrollBar = new qe()),
      this._addEventListeners();
  }
  static get Default() {
    return Na;
  }
  static get DefaultType() {
    return Sa;
  }
  static get NAME() {
    return ua;
  }
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    this._isShown ||
      this._isTransitioning ||
      c.trigger(this._element, Zs, { relatedTarget: t }).defaultPrevented ||
      ((this._isShown = !0),
      (this._isTransitioning = !0),
      this._scrollBar.hide(),
      document.body.classList.add(Yn),
      this._adjustDialog(),
      this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown ||
      this._isTransitioning ||
      c.trigger(this._element, pa).defaultPrevented ||
      ((this._isShown = !1),
      (this._isTransitioning = !0),
      this._focustrap.deactivate(),
      this._element.classList.remove(Un),
      this._queueCallback(
        () => this._hideModal(),
        this._element,
        this._isAnimated()
      ));
  }
  dispose() {
    c.off(window, B),
      c.off(this._dialog, B),
      this._backdrop.dispose(),
      this._focustrap.deactivate(),
      super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  _initializeBackDrop() {
    return new Xs({
      isVisible: !!this._config.backdrop,
      isAnimated: this._isAnimated(),
    });
  }
  _initializeFocusTrap() {
    return new Qs({ trapElement: this._element });
  }
  _showElement(t) {
    document.body.contains(this._element) ||
      document.body.append(this._element),
      (this._element.style.display = "block"),
      this._element.removeAttribute("aria-hidden"),
      this._element.setAttribute("aria-modal", !0),
      this._element.setAttribute("role", "dialog"),
      (this._element.scrollTop = 0);
    const e = h.findOne(Ca, this._dialog);
    e && (e.scrollTop = 0), Ut(this._element), this._element.classList.add(Un);
    const s = () => {
      this._config.focus && this._focustrap.activate(),
        (this._isTransitioning = !1),
        c.trigger(this._element, ma, { relatedTarget: t });
    };
    this._queueCallback(s, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    c.on(this._element, ba, (t) => {
      if (t.key === fa) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }),
      c.on(window, ga, () => {
        this._isShown && !this._isTransitioning && this._adjustDialog();
      }),
      c.on(this._element, va, (t) => {
        c.one(this._element, Ea, (e) => {
          if (!(this._element !== t.target || this._element !== e.target)) {
            if (this._config.backdrop === "static") {
              this._triggerBackdropTransition();
              return;
            }
            this._config.backdrop && this.hide();
          }
        });
      });
  }
  _hideModal() {
    (this._element.style.display = "none"),
      this._element.setAttribute("aria-hidden", !0),
      this._element.removeAttribute("aria-modal"),
      this._element.removeAttribute("role"),
      (this._isTransitioning = !1),
      this._backdrop.hide(() => {
        document.body.classList.remove(Yn),
          this._resetAdjustments(),
          this._scrollBar.reset(),
          c.trigger(this._element, Js);
      });
  }
  _isAnimated() {
    return this._element.classList.contains(Aa);
  }
  _triggerBackdropTransition() {
    if (c.trigger(this._element, _a).defaultPrevented) return;
    const e =
        this._element.scrollHeight > document.documentElement.clientHeight,
      s = this._element.style.overflowY;
    s === "hidden" ||
      this._element.classList.contains(Re) ||
      (e || (this._element.style.overflowY = "hidden"),
      this._element.classList.add(Re),
      this._queueCallback(() => {
        this._element.classList.remove(Re),
          this._queueCallback(() => {
            this._element.style.overflowY = s;
          }, this._dialog);
      }, this._dialog),
      this._element.focus());
  }
  _adjustDialog() {
    const t =
        this._element.scrollHeight > document.documentElement.clientHeight,
      e = this._scrollBar.getWidth(),
      s = e > 0;
    if (s && !t) {
      const i = H() ? "paddingLeft" : "paddingRight";
      this._element.style[i] = `${e}px`;
    }
    if (!s && t) {
      const i = H() ? "paddingRight" : "paddingLeft";
      this._element.style[i] = `${e}px`;
    }
  }
  _resetAdjustments() {
    (this._element.style.paddingLeft = ""),
      (this._element.style.paddingRight = "");
  }
  static jQueryInterface(t, e) {
    return this.each(function () {
      const s = $t.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u") throw new TypeError(`No method named "${t}"`);
        s[t](e);
      }
    });
  }
}
c.on(document, Ta, Oa, function (n) {
  const t = h.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && n.preventDefault(),
    c.one(t, Zs, (i) => {
      i.defaultPrevented ||
        c.one(t, Js, () => {
          xt(this) && this.focus();
        });
    });
  const e = h.findOne(ya);
  e && $t.getInstance(e).hide(), $t.getOrCreateInstance(t).toggle(this);
});
ve($t);
W($t);
const Da = "offcanvas",
  La = "bs.offcanvas",
  Q = `.${La}`,
  ti = ".data-api",
  $a = `load${Q}${ti}`,
  Ia = "Escape",
  zn = "show",
  Gn = "showing",
  qn = "hiding",
  Ma = "offcanvas-backdrop",
  ei = ".offcanvas.show",
  Pa = `show${Q}`,
  xa = `shown${Q}`,
  Ra = `hide${Q}`,
  Xn = `hidePrevented${Q}`,
  ni = `hidden${Q}`,
  ka = `resize${Q}`,
  Va = `click${Q}${ti}`,
  Ha = `keydown.dismiss${Q}`,
  Ba = '[data-bs-toggle="offcanvas"]',
  Wa = { backdrop: !0, keyboard: !0, scroll: !1 },
  ja = { backdrop: "(boolean|string)", keyboard: "boolean", scroll: "boolean" };
class st extends K {
  constructor(t, e) {
    super(t, e),
      (this._isShown = !1),
      (this._backdrop = this._initializeBackDrop()),
      (this._focustrap = this._initializeFocusTrap()),
      this._addEventListeners();
  }
  static get Default() {
    return Wa;
  }
  static get DefaultType() {
    return ja;
  }
  static get NAME() {
    return Da;
  }
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (
      this._isShown ||
      c.trigger(this._element, Pa, { relatedTarget: t }).defaultPrevented
    )
      return;
    (this._isShown = !0),
      this._backdrop.show(),
      this._config.scroll || new qe().hide(),
      this._element.setAttribute("aria-modal", !0),
      this._element.setAttribute("role", "dialog"),
      this._element.classList.add(Gn);
    const s = () => {
      (!this._config.scroll || this._config.backdrop) &&
        this._focustrap.activate(),
        this._element.classList.add(zn),
        this._element.classList.remove(Gn),
        c.trigger(this._element, xa, { relatedTarget: t });
    };
    this._queueCallback(s, this._element, !0);
  }
  hide() {
    if (!this._isShown || c.trigger(this._element, Ra).defaultPrevented) return;
    this._focustrap.deactivate(),
      this._element.blur(),
      (this._isShown = !1),
      this._element.classList.add(qn),
      this._backdrop.hide();
    const e = () => {
      this._element.classList.remove(zn, qn),
        this._element.removeAttribute("aria-modal"),
        this._element.removeAttribute("role"),
        this._config.scroll || new qe().reset(),
        c.trigger(this._element, ni);
    };
    this._queueCallback(e, this._element, !0);
  }
  dispose() {
    this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  _initializeBackDrop() {
    const t = () => {
        if (this._config.backdrop === "static") {
          c.trigger(this._element, Xn);
          return;
        }
        this.hide();
      },
      e = !!this._config.backdrop;
    return new Xs({
      className: Ma,
      isVisible: e,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: e ? t : null,
    });
  }
  _initializeFocusTrap() {
    return new Qs({ trapElement: this._element });
  }
  _addEventListeners() {
    c.on(this._element, Ha, (t) => {
      if (t.key === Ia) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        c.trigger(this._element, Xn);
      }
    });
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = st.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
c.on(document, Va, Ba, function (n) {
  const t = h.getElementFromSelector(this);
  if ((["A", "AREA"].includes(this.tagName) && n.preventDefault(), nt(this)))
    return;
  c.one(t, ni, () => {
    xt(this) && this.focus();
  });
  const e = h.findOne(ei);
  e && e !== t && st.getInstance(e).hide(),
    st.getOrCreateInstance(t).toggle(this);
});
c.on(window, $a, () => {
  for (const n of h.find(ei)) st.getOrCreateInstance(n).show();
});
c.on(window, ka, () => {
  for (const n of h.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(n).position !== "fixed" &&
      st.getOrCreateInstance(n).hide();
});
ve(st);
W(st);
const Fa = /^aria-[\w-]*$/i,
  si = {
    "*": ["class", "dir", "id", "lang", "role", Fa],
    a: ["target", "href", "title", "rel"],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ["src", "srcset", "alt", "title", "width", "height"],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: [],
  },
  Ka = new Set([
    "background",
    "cite",
    "href",
    "itemtype",
    "longdesc",
    "poster",
    "src",
    "xlink:href",
  ]),
  Ya = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
  Ua = (n, t) => {
    const e = n.nodeName.toLowerCase();
    return t.includes(e)
      ? Ka.has(e)
        ? !!Ya.test(n.nodeValue)
        : !0
      : t.filter((s) => s instanceof RegExp).some((s) => s.test(e));
  };
function za(n, t, e) {
  if (!n.length) return n;
  if (e && typeof e == "function") return e(n);
  const i = new window.DOMParser().parseFromString(n, "text/html"),
    r = [].concat(...i.body.querySelectorAll("*"));
  for (const o of r) {
    const a = o.nodeName.toLowerCase();
    if (!Object.keys(t).includes(a)) {
      o.remove();
      continue;
    }
    const l = [].concat(...o.attributes),
      d = [].concat(t["*"] || [], t[a] || []);
    for (const u of l) Ua(u, d) || o.removeAttribute(u.nodeName);
  }
  return i.body.innerHTML;
}
const Ga = "TemplateFactory",
  qa = {
    allowList: si,
    content: {},
    extraClass: "",
    html: !1,
    sanitize: !0,
    sanitizeFn: null,
    template: "<div></div>",
  },
  Xa = {
    allowList: "object",
    content: "object",
    extraClass: "(string|function)",
    html: "boolean",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    template: "string",
  },
  Qa = {
    entry: "(string|element|function|null)",
    selector: "(string|element)",
  };
class Ja extends zt {
  constructor(t) {
    super(), (this._config = this._getConfig(t));
  }
  static get Default() {
    return qa;
  }
  static get DefaultType() {
    return Xa;
  }
  static get NAME() {
    return Ga;
  }
  getContent() {
    return Object.values(this._config.content)
      .map((t) => this._resolvePossibleFunction(t))
      .filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(t) {
    return (
      this._checkContent(t),
      (this._config.content = { ...this._config.content, ...t }),
      this
    );
  }
  toHtml() {
    const t = document.createElement("div");
    t.innerHTML = this._maybeSanitize(this._config.template);
    for (const [i, r] of Object.entries(this._config.content))
      this._setContent(t, r, i);
    const e = t.children[0],
      s = this._resolvePossibleFunction(this._config.extraClass);
    return s && e.classList.add(...s.split(" ")), e;
  }
  _typeCheckConfig(t) {
    super._typeCheckConfig(t), this._checkContent(t.content);
  }
  _checkContent(t) {
    for (const [e, s] of Object.entries(t))
      super._typeCheckConfig({ selector: e, entry: s }, Qa);
  }
  _setContent(t, e, s) {
    const i = h.findOne(s, t);
    if (i) {
      if (((e = this._resolvePossibleFunction(e)), !e)) {
        i.remove();
        return;
      }
      if (G(e)) {
        this._putElementInTemplate(et(e), i);
        return;
      }
      if (this._config.html) {
        i.innerHTML = this._maybeSanitize(e);
        return;
      }
      i.textContent = e;
    }
  }
  _maybeSanitize(t) {
    return this._config.sanitize
      ? za(t, this._config.allowList, this._config.sanitizeFn)
      : t;
  }
  _resolvePossibleFunction(t) {
    return M(t, [this]);
  }
  _putElementInTemplate(t, e) {
    if (this._config.html) {
      (e.innerHTML = ""), e.append(t);
      return;
    }
    e.textContent = t.textContent;
  }
}
const Za = "tooltip",
  tc = new Set(["sanitize", "allowList", "sanitizeFn"]),
  ke = "fade",
  ec = "modal",
  re = "show",
  nc = ".tooltip-inner",
  Qn = `.${ec}`,
  Jn = "hide.bs.modal",
  Wt = "hover",
  Ve = "focus",
  sc = "click",
  ic = "manual",
  rc = "hide",
  oc = "hidden",
  ac = "show",
  cc = "shown",
  lc = "inserted",
  uc = "click",
  dc = "focusin",
  hc = "focusout",
  fc = "mouseenter",
  pc = "mouseleave",
  _c = {
    AUTO: "auto",
    TOP: "top",
    RIGHT: H() ? "left" : "right",
    BOTTOM: "bottom",
    LEFT: H() ? "right" : "left",
  },
  mc = {
    allowList: si,
    animation: !0,
    boundary: "clippingParents",
    container: !1,
    customClass: "",
    delay: 0,
    fallbackPlacements: ["top", "right", "bottom", "left"],
    html: !1,
    offset: [0, 6],
    placement: "top",
    popperConfig: null,
    sanitize: !0,
    sanitizeFn: null,
    selector: !1,
    template:
      '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    title: "",
    trigger: "hover focus",
  },
  gc = {
    allowList: "object",
    animation: "boolean",
    boundary: "(string|element)",
    container: "(string|element|boolean)",
    customClass: "(string|function)",
    delay: "(number|object)",
    fallbackPlacements: "array",
    html: "boolean",
    offset: "(array|string|function)",
    placement: "(string|function)",
    popperConfig: "(null|object|function)",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    selector: "(string|boolean)",
    template: "string",
    title: "(string|element|function)",
    trigger: "string",
  };
class kt extends K {
  constructor(t, e) {
    if (typeof Ls > "u")
      throw new TypeError(
        "Bootstrap's tooltips require Popper (https://popper.js.org)"
      );
    super(t, e),
      (this._isEnabled = !0),
      (this._timeout = 0),
      (this._isHovered = null),
      (this._activeTrigger = {}),
      (this._popper = null),
      (this._templateFactory = null),
      (this._newContent = null),
      (this.tip = null),
      this._setListeners(),
      this._config.selector || this._fixTitle();
  }
  static get Default() {
    return mc;
  }
  static get DefaultType() {
    return gc;
  }
  static get NAME() {
    return Za;
  }
  enable() {
    this._isEnabled = !0;
  }
  disable() {
    this._isEnabled = !1;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle() {
    if (this._isEnabled) {
      if (
        ((this._activeTrigger.click = !this._activeTrigger.click),
        this._isShown())
      ) {
        this._leave();
        return;
      }
      this._enter();
    }
  }
  dispose() {
    clearTimeout(this._timeout),
      c.off(this._element.closest(Qn), Jn, this._hideModalHandler),
      this._element.getAttribute("data-bs-original-title") &&
        this._element.setAttribute(
          "title",
          this._element.getAttribute("data-bs-original-title")
        ),
      this._disposePopper(),
      super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled)) return;
    const t = c.trigger(this._element, this.constructor.eventName(ac)),
      s = (
        Ms(this._element) || this._element.ownerDocument.documentElement
      ).contains(this._element);
    if (t.defaultPrevented || !s) return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const { container: r } = this._config;
    if (
      (this._element.ownerDocument.documentElement.contains(this.tip) ||
        (r.append(i), c.trigger(this._element, this.constructor.eventName(lc))),
      (this._popper = this._createPopper(i)),
      i.classList.add(re),
      "ontouchstart" in document.documentElement)
    )
      for (const a of [].concat(...document.body.children))
        c.on(a, "mouseover", he);
    const o = () => {
      c.trigger(this._element, this.constructor.eventName(cc)),
        this._isHovered === !1 && this._leave(),
        (this._isHovered = !1);
    };
    this._queueCallback(o, this.tip, this._isAnimated());
  }
  hide() {
    if (
      !this._isShown() ||
      c.trigger(this._element, this.constructor.eventName(rc)).defaultPrevented
    )
      return;
    if (
      (this._getTipElement().classList.remove(re),
      "ontouchstart" in document.documentElement)
    )
      for (const i of [].concat(...document.body.children))
        c.off(i, "mouseover", he);
    (this._activeTrigger[sc] = !1),
      (this._activeTrigger[Ve] = !1),
      (this._activeTrigger[Wt] = !1),
      (this._isHovered = null);
    const s = () => {
      this._isWithActiveTrigger() ||
        (this._isHovered || this._disposePopper(),
        this._element.removeAttribute("aria-describedby"),
        c.trigger(this._element, this.constructor.eventName(oc)));
    };
    this._queueCallback(s, this.tip, this._isAnimated());
  }
  update() {
    this._popper && this._popper.update();
  }
  _isWithContent() {
    return !!this._getTitle();
  }
  _getTipElement() {
    return (
      this.tip ||
        (this.tip = this._createTipElement(
          this._newContent || this._getContentForTemplate()
        )),
      this.tip
    );
  }
  _createTipElement(t) {
    const e = this._getTemplateFactory(t).toHtml();
    if (!e) return null;
    e.classList.remove(ke, re),
      e.classList.add(`bs-${this.constructor.NAME}-auto`);
    const s = nr(this.constructor.NAME).toString();
    return (
      e.setAttribute("id", s), this._isAnimated() && e.classList.add(ke), e
    );
  }
  setContent(t) {
    (this._newContent = t),
      this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(t) {
    return (
      this._templateFactory
        ? this._templateFactory.changeContent(t)
        : (this._templateFactory = new Ja({
            ...this._config,
            content: t,
            extraClass: this._resolvePossibleFunction(this._config.customClass),
          })),
      this._templateFactory
    );
  }
  _getContentForTemplate() {
    return { [nc]: this._getTitle() };
  }
  _getTitle() {
    return (
      this._resolvePossibleFunction(this._config.title) ||
      this._element.getAttribute("data-bs-original-title")
    );
  }
  _initializeOnDelegatedTarget(t) {
    return this.constructor.getOrCreateInstance(
      t.delegateTarget,
      this._getDelegateConfig()
    );
  }
  _isAnimated() {
    return (
      this._config.animation || (this.tip && this.tip.classList.contains(ke))
    );
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(re);
  }
  _createPopper(t) {
    const e = M(this._config.placement, [this, t, this._element]),
      s = _c[e.toUpperCase()];
    return ln(this._element, t, this._getPopperConfig(s));
  }
  _getOffset() {
    const { offset: t } = this._config;
    return typeof t == "string"
      ? t.split(",").map((e) => Number.parseInt(e, 10))
      : typeof t == "function"
      ? (e) => t(e, this._element)
      : t;
  }
  _resolvePossibleFunction(t) {
    return M(t, [this._element]);
  }
  _getPopperConfig(t) {
    const e = {
      placement: t,
      modifiers: [
        {
          name: "flip",
          options: { fallbackPlacements: this._config.fallbackPlacements },
        },
        { name: "offset", options: { offset: this._getOffset() } },
        {
          name: "preventOverflow",
          options: { boundary: this._config.boundary },
        },
        {
          name: "arrow",
          options: { element: `.${this.constructor.NAME}-arrow` },
        },
        {
          name: "preSetPlacement",
          enabled: !0,
          phase: "beforeMain",
          fn: (s) => {
            this._getTipElement().setAttribute(
              "data-popper-placement",
              s.state.placement
            );
          },
        },
      ],
    };
    return { ...e, ...M(this._config.popperConfig, [e]) };
  }
  _setListeners() {
    const t = this._config.trigger.split(" ");
    for (const e of t)
      if (e === "click")
        c.on(
          this._element,
          this.constructor.eventName(uc),
          this._config.selector,
          (s) => {
            this._initializeOnDelegatedTarget(s).toggle();
          }
        );
      else if (e !== ic) {
        const s =
            e === Wt
              ? this.constructor.eventName(fc)
              : this.constructor.eventName(dc),
          i =
            e === Wt
              ? this.constructor.eventName(pc)
              : this.constructor.eventName(hc);
        c.on(this._element, s, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          (o._activeTrigger[r.type === "focusin" ? Ve : Wt] = !0), o._enter();
        }),
          c.on(this._element, i, this._config.selector, (r) => {
            const o = this._initializeOnDelegatedTarget(r);
            (o._activeTrigger[r.type === "focusout" ? Ve : Wt] =
              o._element.contains(r.relatedTarget)),
              o._leave();
          });
      }
    (this._hideModalHandler = () => {
      this._element && this.hide();
    }),
      c.on(this._element.closest(Qn), Jn, this._hideModalHandler);
  }
  _fixTitle() {
    const t = this._element.getAttribute("title");
    t &&
      (!this._element.getAttribute("aria-label") &&
        !this._element.textContent.trim() &&
        this._element.setAttribute("aria-label", t),
      this._element.setAttribute("data-bs-original-title", t),
      this._element.removeAttribute("title"));
  }
  _enter() {
    if (this._isShown() || this._isHovered) {
      this._isHovered = !0;
      return;
    }
    (this._isHovered = !0),
      this._setTimeout(() => {
        this._isHovered && this.show();
      }, this._config.delay.show);
  }
  _leave() {
    this._isWithActiveTrigger() ||
      ((this._isHovered = !1),
      this._setTimeout(() => {
        this._isHovered || this.hide();
      }, this._config.delay.hide));
  }
  _setTimeout(t, e) {
    clearTimeout(this._timeout), (this._timeout = setTimeout(t, e));
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(!0);
  }
  _getConfig(t) {
    const e = q.getDataAttributes(this._element);
    for (const s of Object.keys(e)) tc.has(s) && delete e[s];
    return (
      (t = { ...e, ...(typeof t == "object" && t ? t : {}) }),
      (t = this._mergeConfigObj(t)),
      (t = this._configAfterMerge(t)),
      this._typeCheckConfig(t),
      t
    );
  }
  _configAfterMerge(t) {
    return (
      (t.container = t.container === !1 ? document.body : et(t.container)),
      typeof t.delay == "number" &&
        (t.delay = { show: t.delay, hide: t.delay }),
      typeof t.title == "number" && (t.title = t.title.toString()),
      typeof t.content == "number" && (t.content = t.content.toString()),
      t
    );
  }
  _getDelegateConfig() {
    const t = {};
    for (const [e, s] of Object.entries(this._config))
      this.constructor.Default[e] !== s && (t[e] = s);
    return (t.selector = !1), (t.trigger = "manual"), t;
  }
  _disposePopper() {
    this._popper && (this._popper.destroy(), (this._popper = null)),
      this.tip && (this.tip.remove(), (this.tip = null));
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = kt.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u") throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
W(kt);
const Ec = "popover",
  vc = ".popover-header",
  bc = ".popover-body",
  Tc = {
    ...kt.Default,
    content: "",
    offset: [0, 8],
    placement: "right",
    template:
      '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    trigger: "click",
  },
  Ac = { ...kt.DefaultType, content: "(null|string|element|function)" };
class fn extends kt {
  static get Default() {
    return Tc;
  }
  static get DefaultType() {
    return Ac;
  }
  static get NAME() {
    return Ec;
  }
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  _getContentForTemplate() {
    return { [vc]: this._getTitle(), [bc]: this._getContent() };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = fn.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u") throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
W(fn);
const yc = "scrollspy",
  wc = "bs.scrollspy",
  pn = `.${wc}`,
  Cc = ".data-api",
  Oc = `activate${pn}`,
  Zn = `click${pn}`,
  Nc = `load${pn}${Cc}`,
  Sc = "dropdown-item",
  Tt = "active",
  Dc = '[data-bs-spy="scroll"]',
  He = "[href]",
  Lc = ".nav, .list-group",
  ts = ".nav-link",
  $c = ".nav-item",
  Ic = ".list-group-item",
  Mc = `${ts}, ${$c} > ${ts}, ${Ic}`,
  Pc = ".dropdown",
  xc = ".dropdown-toggle",
  Rc = {
    offset: null,
    rootMargin: "0px 0px -25%",
    smoothScroll: !1,
    target: null,
    threshold: [0.1, 0.5, 1],
  },
  kc = {
    offset: "(number|null)",
    rootMargin: "string",
    smoothScroll: "boolean",
    target: "element",
    threshold: "array",
  };
class Ae extends K {
  constructor(t, e) {
    super(t, e),
      (this._targetLinks = new Map()),
      (this._observableSections = new Map()),
      (this._rootElement =
        getComputedStyle(this._element).overflowY === "visible"
          ? null
          : this._element),
      (this._activeTarget = null),
      (this._observer = null),
      (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }),
      this.refresh();
  }
  static get Default() {
    return Rc;
  }
  static get DefaultType() {
    return kc;
  }
  static get NAME() {
    return yc;
  }
  refresh() {
    this._initializeTargetsAndObservables(),
      this._maybeEnableSmoothScroll(),
      this._observer
        ? this._observer.disconnect()
        : (this._observer = this._getNewObserver());
    for (const t of this._observableSections.values())
      this._observer.observe(t);
  }
  dispose() {
    this._observer.disconnect(), super.dispose();
  }
  _configAfterMerge(t) {
    return (
      (t.target = et(t.target) || document.body),
      (t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin),
      typeof t.threshold == "string" &&
        (t.threshold = t.threshold.split(",").map((e) => Number.parseFloat(e))),
      t
    );
  }
  _maybeEnableSmoothScroll() {
    this._config.smoothScroll &&
      (c.off(this._config.target, Zn),
      c.on(this._config.target, Zn, He, (t) => {
        const e = this._observableSections.get(t.target.hash);
        if (e) {
          t.preventDefault();
          const s = this._rootElement || window,
            i = e.offsetTop - this._element.offsetTop;
          if (s.scrollTo) {
            s.scrollTo({ top: i, behavior: "smooth" });
            return;
          }
          s.scrollTop = i;
        }
      }));
  }
  _getNewObserver() {
    const t = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin,
    };
    return new IntersectionObserver((e) => this._observerCallback(e), t);
  }
  _observerCallback(t) {
    const e = (o) => this._targetLinks.get(`#${o.target.id}`),
      s = (o) => {
        (this._previousScrollData.visibleEntryTop = o.target.offsetTop),
          this._process(e(o));
      },
      i = (this._rootElement || document.documentElement).scrollTop,
      r = i >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = i;
    for (const o of t) {
      if (!o.isIntersecting) {
        (this._activeTarget = null), this._clearActiveClass(e(o));
        continue;
      }
      const a = o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      if (r && a) {
        if ((s(o), !i)) return;
        continue;
      }
      !r && !a && s(o);
    }
  }
  _initializeTargetsAndObservables() {
    (this._targetLinks = new Map()), (this._observableSections = new Map());
    const t = h.find(He, this._config.target);
    for (const e of t) {
      if (!e.hash || nt(e)) continue;
      const s = h.findOne(decodeURI(e.hash), this._element);
      xt(s) &&
        (this._targetLinks.set(decodeURI(e.hash), e),
        this._observableSections.set(e.hash, s));
    }
  }
  _process(t) {
    this._activeTarget !== t &&
      (this._clearActiveClass(this._config.target),
      (this._activeTarget = t),
      t.classList.add(Tt),
      this._activateParents(t),
      c.trigger(this._element, Oc, { relatedTarget: t }));
  }
  _activateParents(t) {
    if (t.classList.contains(Sc)) {
      h.findOne(xc, t.closest(Pc)).classList.add(Tt);
      return;
    }
    for (const e of h.parents(t, Lc))
      for (const s of h.prev(e, Mc)) s.classList.add(Tt);
  }
  _clearActiveClass(t) {
    t.classList.remove(Tt);
    const e = h.find(`${He}.${Tt}`, t);
    for (const s of e) s.classList.remove(Tt);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Ae.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
c.on(window, Nc, () => {
  for (const n of h.find(Dc)) Ae.getOrCreateInstance(n);
});
W(Ae);
const Vc = "tab",
  Hc = "bs.tab",
  Et = `.${Hc}`,
  Bc = `hide${Et}`,
  Wc = `hidden${Et}`,
  jc = `show${Et}`,
  Fc = `shown${Et}`,
  Kc = `click${Et}`,
  Yc = `keydown${Et}`,
  Uc = `load${Et}`,
  zc = "ArrowLeft",
  es = "ArrowRight",
  Gc = "ArrowUp",
  ns = "ArrowDown",
  ft = "active",
  ss = "fade",
  Be = "show",
  qc = "dropdown",
  Xc = ".dropdown-toggle",
  Qc = ".dropdown-menu",
  We = ":not(.dropdown-toggle)",
  Jc = '.list-group, .nav, [role="tablist"]',
  Zc = ".nav-item, .list-group-item",
  tl = `.nav-link${We}, .list-group-item${We}, [role="tab"]${We}`,
  ii =
    '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
  je = `${tl}, ${ii}`,
  el = `.${ft}[data-bs-toggle="tab"], .${ft}[data-bs-toggle="pill"], .${ft}[data-bs-toggle="list"]`;
class It extends K {
  constructor(t) {
    super(t),
      (this._parent = this._element.closest(Jc)),
      this._parent &&
        (this._setInitialAttributes(this._parent, this._getChildren()),
        c.on(this._element, Yc, (e) => this._keydown(e)));
  }
  static get NAME() {
    return Vc;
  }
  show() {
    const t = this._element;
    if (this._elemIsActive(t)) return;
    const e = this._getActiveElem(),
      s = e ? c.trigger(e, Bc, { relatedTarget: t }) : null;
    c.trigger(t, jc, { relatedTarget: e }).defaultPrevented ||
      (s && s.defaultPrevented) ||
      (this._deactivate(e, t), this._activate(t, e));
  }
  _activate(t, e) {
    if (!t) return;
    t.classList.add(ft), this._activate(h.getElementFromSelector(t));
    const s = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.add(Be);
        return;
      }
      t.removeAttribute("tabindex"),
        t.setAttribute("aria-selected", !0),
        this._toggleDropDown(t, !0),
        c.trigger(t, Fc, { relatedTarget: e });
    };
    this._queueCallback(s, t, t.classList.contains(ss));
  }
  _deactivate(t, e) {
    if (!t) return;
    t.classList.remove(ft),
      t.blur(),
      this._deactivate(h.getElementFromSelector(t));
    const s = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(Be);
        return;
      }
      t.setAttribute("aria-selected", !1),
        t.setAttribute("tabindex", "-1"),
        this._toggleDropDown(t, !1),
        c.trigger(t, Wc, { relatedTarget: e });
    };
    this._queueCallback(s, t, t.classList.contains(ss));
  }
  _keydown(t) {
    if (![zc, es, Gc, ns].includes(t.key)) return;
    t.stopPropagation(), t.preventDefault();
    const e = [es, ns].includes(t.key),
      s = un(
        this._getChildren().filter((i) => !nt(i)),
        t.target,
        e,
        !0
      );
    s && (s.focus({ preventScroll: !0 }), It.getOrCreateInstance(s).show());
  }
  _getChildren() {
    return h.find(je, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find((t) => this._elemIsActive(t)) || null;
  }
  _setInitialAttributes(t, e) {
    this._setAttributeIfNotExists(t, "role", "tablist");
    for (const s of e) this._setInitialAttributesOnChild(s);
  }
  _setInitialAttributesOnChild(t) {
    t = this._getInnerElement(t);
    const e = this._elemIsActive(t),
      s = this._getOuterElement(t);
    t.setAttribute("aria-selected", e),
      s !== t && this._setAttributeIfNotExists(s, "role", "presentation"),
      e || t.setAttribute("tabindex", "-1"),
      this._setAttributeIfNotExists(t, "role", "tab"),
      this._setInitialAttributesOnTargetPanel(t);
  }
  _setInitialAttributesOnTargetPanel(t) {
    const e = h.getElementFromSelector(t);
    e &&
      (this._setAttributeIfNotExists(e, "role", "tabpanel"),
      t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `${t.id}`));
  }
  _toggleDropDown(t, e) {
    const s = this._getOuterElement(t);
    if (!s.classList.contains(qc)) return;
    const i = (r, o) => {
      const a = h.findOne(r, s);
      a && a.classList.toggle(o, e);
    };
    i(Xc, ft), i(Qc, Be), s.setAttribute("aria-expanded", e);
  }
  _setAttributeIfNotExists(t, e, s) {
    t.hasAttribute(e) || t.setAttribute(e, s);
  }
  _elemIsActive(t) {
    return t.classList.contains(ft);
  }
  _getInnerElement(t) {
    return t.matches(je) ? t : h.findOne(je, t);
  }
  _getOuterElement(t) {
    return t.closest(Zc) || t;
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = It.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
c.on(document, Kc, ii, function (n) {
  ["A", "AREA"].includes(this.tagName) && n.preventDefault(),
    !nt(this) && It.getOrCreateInstance(this).show();
});
c.on(window, Uc, () => {
  for (const n of h.find(el)) It.getOrCreateInstance(n);
});
W(It);
const nl = "toast",
  sl = "bs.toast",
  ot = `.${sl}`,
  il = `mouseover${ot}`,
  rl = `mouseout${ot}`,
  ol = `focusin${ot}`,
  al = `focusout${ot}`,
  cl = `hide${ot}`,
  ll = `hidden${ot}`,
  ul = `show${ot}`,
  dl = `shown${ot}`,
  hl = "fade",
  is = "hide",
  oe = "show",
  ae = "showing",
  fl = { animation: "boolean", autohide: "boolean", delay: "number" },
  pl = { animation: !0, autohide: !0, delay: 5e3 };
class ye extends K {
  constructor(t, e) {
    super(t, e),
      (this._timeout = null),
      (this._hasMouseInteraction = !1),
      (this._hasKeyboardInteraction = !1),
      this._setListeners();
  }
  static get Default() {
    return pl;
  }
  static get DefaultType() {
    return fl;
  }
  static get NAME() {
    return nl;
  }
  show() {
    if (c.trigger(this._element, ul).defaultPrevented) return;
    this._clearTimeout(),
      this._config.animation && this._element.classList.add(hl);
    const e = () => {
      this._element.classList.remove(ae),
        c.trigger(this._element, dl),
        this._maybeScheduleHide();
    };
    this._element.classList.remove(is),
      Ut(this._element),
      this._element.classList.add(oe, ae),
      this._queueCallback(e, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || c.trigger(this._element, cl).defaultPrevented)
      return;
    const e = () => {
      this._element.classList.add(is),
        this._element.classList.remove(ae, oe),
        c.trigger(this._element, ll);
    };
    this._element.classList.add(ae),
      this._queueCallback(e, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(),
      this.isShown() && this._element.classList.remove(oe),
      super.dispose();
  }
  isShown() {
    return this._element.classList.contains(oe);
  }
  _maybeScheduleHide() {
    this._config.autohide &&
      (this._hasMouseInteraction ||
        this._hasKeyboardInteraction ||
        (this._timeout = setTimeout(() => {
          this.hide();
        }, this._config.delay)));
  }
  _onInteraction(t, e) {
    switch (t.type) {
      case "mouseover":
      case "mouseout": {
        this._hasMouseInteraction = e;
        break;
      }
      case "focusin":
      case "focusout": {
        this._hasKeyboardInteraction = e;
        break;
      }
    }
    if (e) {
      this._clearTimeout();
      return;
    }
    const s = t.relatedTarget;
    this._element === s ||
      this._element.contains(s) ||
      this._maybeScheduleHide();
  }
  _setListeners() {
    c.on(this._element, il, (t) => this._onInteraction(t, !0)),
      c.on(this._element, rl, (t) => this._onInteraction(t, !1)),
      c.on(this._element, ol, (t) => this._onInteraction(t, !0)),
      c.on(this._element, al, (t) => this._onInteraction(t, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), (this._timeout = null);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = ye.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u") throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
ve(ye);
W(ye);
let ri = class {
  constructor(t, e = !1, s = new Date(), i) {
    (this.title = t),
      (this.isCompleted = e),
      (this.creationDate = s),
      (this.id = i);
  }
  compareByTitle(t) {
    return this.title.localeCompare(t.title);
  }
  compareByDate(t) {
    return t.creationDate.getTime() - this.creationDate.getTime();
  }
};
class _e {
  static getAllTodos() {
    return fetch("https://64b512c1f3dbab5a95c6a48c.mockapi.io/todos")
      .then((e) => e.json())
      .then((e) => this.convertToTodoArray(e))
      .catch((e) => console.log(e.message));
  }
  static deleteTodo(t) {
    console.log("delete", t);
    const e = "https://64b512c1f3dbab5a95c6a48c.mockapi.io/todos/" + t;
    return console.log(e), fetch(e, { method: "delete" }).then((s) => s.json());
  }
  static updateTodo(t) {
    const e = "https://64b512c1f3dbab5a95c6a48c.mockapi.io/todos/" + t.id;
    return fetch(e, {
      method: "put",
      body: JSON.stringify(t),
      headers: { "content-type": "application/json" },
    })
      .then((s) => s.json())
      .then((s) => this.convertToTodo(s));
  }
  static saveTodo(t) {
    return fetch("https://64b512c1f3dbab5a95c6a48c.mockapi.io/todos", {
      method: "post",
      body: JSON.stringify(t),
      headers: { "content-type": "application/json" },
    })
      .then((s) => s.json())
      .then((s) => this.convertToTodo(s));
  }
  static convertToTodo(t) {
    return new ri(t.title, t.isCompleted, new Date(t.creationDate), t.id);
  }
  static convertToTodoArray(t) {
    const e = [];
    for (const s of t) e.push(this.convertToTodo(s));
    return e;
  }
}
class _l {
  constructor(t = []) {
    this.todoArray = t;
  }
  addTodo(t) {
    this.todoArray.push(t);
  }
  orderTodosByTitle() {
    this.todoArray.sort((t, e) => t.compareByTitle(e));
  }
  orderTodosByDate() {
    this.todoArray.sort((t, e) => t.compareByDate(e));
  }
  changeCompleteStatus(t) {
    const e = this.todoArray[t];
    e.isCompleted = !e.isCompleted;
  }
  deleteTodo(t) {
    this.todoArray.splice(t, 1);
  }
  addTodoWithTitle(t) {
    const e = new Todo(t);
    this.addToDo(e);
  }
}
document.querySelector("form").addEventListener("submit", () => bl());
document.getElementById("orderAZ").addEventListener("click", () => El());
document.getElementById("orderDate").addEventListener("click", () => vl());
let tt;
_e.getAllTodos().then((n) => {
  (tt = new _l(n)), Mt();
});
const ml = document.getElementById("showDialog"),
  we = document.getElementById("newShowDialog");
we.querySelector("#confirmBtn");
const gl = we.querySelector("#cancelButton");
ml.addEventListener("click", () => {
  we.showModal();
});
gl.addEventListener("click", (n) => {
  n.preventDefault(), we.close();
});
function Mt() {
  const n = document.getElementById("todo-container");
  n.innerHTML = "";
  const t = document.createElement("div");
  t.classList.add("row");
  for (let e = 0; e < tt.todoArray.length; e++) {
    const s = tt.todoArray[e],
      i = document.createElement("div");
    i.classList.add("card");
    const r = document.createElement("div");
    r.classList.add("col"),
      (i.style = "width: 20rem"),
      s.isCompleted
        ? i.classList.add("compShad")
        : i.classList.add("uncompShad");
    const o = document.createElement("div");
    o.classList.add("card-body");
    const a = document.createElement("h5"),
      l = document.createTextNode(s.title);
    a.classList.add("card-title"), a.appendChild(l), o.appendChild(a);
    const [d] = s.creationDate.toISOString().split("T"),
      u = document.createElement("span"),
      _ = document.createTextNode("Creation date: " + d);
    u.classList.add("card-text"), u.appendChild(_), o.appendChild(u);
    const p = document.createElement("button"),
      f = document.createTextNode(s.isCompleted ? "Uncomplete" : "Completed");
    p.classList.add("btn", "btn-primary"),
      (p.type = "button"),
      p.addEventListener("click", () => {
        const g = { ...s };
        g.isCompleted === !0 ? (g.isCompleted = !1) : (g.isCompleted = !0),
          _e.updateTodo(g).then((A) => {
            tt.changeCompleteStatus(e), Mt();
          });
      }),
      p.appendChild(f),
      o.appendChild(p);
    const v = document.createElement("button"),
      m = document.createTextNode("Delete");
    v.classList.add("btn", "btn-primary"),
      (v.type = "button"),
      v.addEventListener("click", () => {
        _e.deleteTodo(s.id).then(() => {
          tt.deleteTodo(e), Mt();
        });
      }),
      v.appendChild(m),
      o.appendChild(v),
      i.appendChild(o),
      r.appendChild(i),
      t.appendChild(r),
      n.appendChild(t);
  }
}
function El() {
  tt.orderTodosByTitle(), Mt();
}
function vl() {
  tt.orderTodosByDate(), Mt();
}
function bl() {
  const n = document.getElementById("title"),
    t = n.value;
  if (t.trim() !== "") {
    const e = new ri(t, !1, new Date());
    _e.saveTodo(e).then((s) => {
      tt.addTodo(s), (n.value = ""), Mt();
    });
  }
}
const rs = [
  "Manager",
  "Organizer",
  "Planner",
  "Arranger",
  "Mastermind",
  "Maker",
  "Builder",
  "Creator",
  "Formulator",
  "Architect",
];
setInterval(oi, 3500);
function oi() {
  const n = document.querySelector(".changingText"),
    t = Math.floor(Math.random() * rs.length);
  n.textContent = rs[t];
}
oi();
