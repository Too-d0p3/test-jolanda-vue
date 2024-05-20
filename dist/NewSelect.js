import { ref as u, computed as F, onMounted as R, onUnmounted as U, watch as w, nextTick as S, openBlock as i, createElementBlock as f, withModifiers as J, createElementVNode as m, toDisplayString as b, normalizeClass as Y, createTextVNode as G, createBlock as K, Teleport as Q, normalizeStyle as W, withDirectives as X, vModelText as Z, createCommentVNode as T, Fragment as I, renderList as _ } from "vue";
import ee from "axios";
const te = /* @__PURE__ */ m("span", { class: "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none" }, [
  /* @__PURE__ */ m("svg", {
    class: "w-3 h-3 text-gray-900",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ m("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "4",
      d: "M19 9l-7 7-7-7"
    })
  ])
], -1), le = ["onClick"], oe = ["onClick"], ae = {
  key: 3,
  class: "px-2 py-1.5 bg-gray-100"
}, se = {
  __name: "NewSelect",
  props: {
    options: Array,
    modelValue: [String, Object],
    placeholder: String,
    label: String,
    filterable: Boolean,
    url: String,
    // URL adresa pro načítání dat
    pageSize: {
      type: Number,
      default: 20
      // Počet položek na stránku
    },
    returnObject: {
      type: Boolean,
      default: !1
      // Vracet objekt místo hodnoty
    },
    remoteName: {
      type: String,
      default: "Name"
    },
    textFromValue: {
      type: Boolean,
      default: !1
    },
    textProperty: {
      type: String,
      default: "text"
    },
    remoteIdentifier: {
      type: String,
      default: "ID"
    },
    remoteValueObject: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: "default"
      // možnosti jsou 'small', 'default', 'large'
    },
    readonly: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  setup(g, { emit: z }) {
    const t = g, c = u(t.options ?? []), H = (e) => c.value.find((l) => l.value === e), N = z, n = u(!1), d = u(""), O = u(typeof t.modelValue == "object" ? t.textFromValue ? { value: t.modelValue, text: t.remoteName ? t.modelValue[t.remoteName] ?? null : t.modelValue[t.textProperty] ?? null } : t.modelValue : H(t.modelValue) ?? t.modelValue), P = F(() => d.value ? c.value.filter(
      (e) => e.text.toLowerCase().includes(d.value.toLowerCase())
    ) : c.value);
    let k = null;
    const B = (e) => {
      O.value = e, t.returnObject ? N("update:modelValue", { ...e }) : N("update:modelValue", e.value), n.value = !1;
    }, E = () => {
      setTimeout(() => {
        t.readonly || (n.value = !n.value, S(() => {
          n.value && (L(), requestAnimationFrame(() => {
            v.value && t.filterable && v.value.focus();
          }));
        }));
      }, 100);
    }, j = (e) => {
      e.target.closest(".dropdown") || (n.value = !1, d.value = "");
    };
    R(() => {
      document.addEventListener("click", j);
    }), U(() => {
      document.removeEventListener("click", j), s.value && s.value.removeEventListener("scroll", C);
    });
    const A = (e) => typeof e == "object" ? JSON.stringify(e) : e;
    w(() => t.options, (e) => {
      c.value = e ?? [];
    }, { immediate: !0 });
    const r = u({
      page: 0,
      count: 10,
      totalCount: null,
      isLoading: !1
    }), s = u(null), y = u(null), v = u(null), V = async (e = !1) => {
      if (t.url) {
        e && (r.value.page = 0, c.value = []), r.value.isLoading = !0;
        try {
          let l = {
            start: r.value.page * r.value.count,
            count: r.value.count
          };
          d.value && (l.q = d.value);
          const o = await ee.get(t.url, {
            params: l
          }), a = o.data.items.map((p) => ({
            value: t.remoteValueObject ? p : p[t.remoteIdentifier],
            text: p[t.remoteName]
          }));
          c.value.push(...a), r.value.totalCount = parseInt(o.data.numRows);
        } catch (l) {
          console.error("Chyba při načítání dat:", l);
        } finally {
          r.value.isLoading = !1;
        }
      }
    };
    w(d, () => {
      n.value && (k !== null && clearTimeout(k), k = setTimeout(() => {
        V(!0).then(() => {
          S(() => {
            L();
          });
        });
      }, 750));
    }), w(n, (e) => {
      e && V(!0).then(() => {
        L(), requestAnimationFrame(() => {
          v.value && t.filterable && v.value.focus();
        });
      });
    });
    const C = (e) => {
      const { scrollTop: l, scrollHeight: o, clientHeight: a } = e.target;
      l + a >= o - 10 && c.value.length < r.value.totalCount && !r.value.isLoading && (r.value.page++, V());
    };
    w(n, (e, l) => {
      t.url && (e === !0 ? S().then(() => {
        s.value && s.value.addEventListener("scroll", C);
      }) : l === !0 && s.value && s.value.removeEventListener("scroll", C));
    }, { immediate: !1 });
    const q = F(() => {
      let e = "border border-gray-300 text-gray-900 rounded-lg relative pr-6 pl-2.5";
      switch (t.readonly ? e = e + " bg-gray-200" : e = e + " bg-gray-50 cursor-pointer", t.size) {
        case "small":
          return `${e} py-2 min-h-[34px] text-xs`;
        case "large":
          return `${e} py-4 min-h-[58px] text-base`;
        default:
          return `${e} py-2.5 min-h-[42px] text-sm`;
      }
    }), $ = u({}), M = (e) => {
      let l = 0, o = 0;
      for (; e; )
        l += e.offsetTop - e.scrollTop + e.clientTop, o += e.offsetLeft - e.scrollLeft + e.clientLeft, e = e.offsetParent;
      return { top: l, left: o };
    }, L = () => {
      if (y.value && s.value) {
        const { width: e, height: l } = y.value.getBoundingClientRect(), { top: o, left: a } = M(y.value), p = window.innerHeight, x = s.value.offsetHeight, D = o - window.scrollY;
        let h;
        D + l + x <= p ? h = o + l - 1 : D - x >= 0 ? h = o - x - 1 : h = o + l - 1, requestAnimationFrame(() => {
          $.value = {
            position: "absolute",
            top: `${h}px`,
            left: `${a}px`,
            width: `${e}px`
          };
        });
      }
    };
    return (e, l) => {
      var o;
      return i(), f("div", {
        class: "dropdown w-full relative inline-block",
        onClick: l[1] || (l[1] = J(() => {
        }, ["stop"]))
      }, [
        m("label", {
          onClick: E,
          class: "block mb-2 text-sm font-medium text-gray-900"
        }, b(g.label), 1),
        m("div", {
          onClick: E,
          class: Y(q.value),
          ref_key: "dropdownTriggerEl",
          ref: y
        }, [
          G(b(((o = O.value) == null ? void 0 : o.text) || g.placeholder) + " ", 1),
          te
        ], 2),
        (i(), K(Q, { to: "body" }, [
          n.value ? (i(), f("div", {
            key: 0,
            style: W([$.value, { position: "absolute" }]),
            ref_key: "scrollContainer",
            ref: s,
            class: "absolute bg-white border border-gray-300 rounded-lg z-10 max-h-[300px] overflow-y-auto text-sm"
          }, [
            g.filterable ? X((i(), f("input", {
              key: 0,
              ref_key: "searchInputEl",
              ref: v,
              type: "text",
              "onUpdate:modelValue": l[0] || (l[0] = (a) => d.value = a),
              class: "p-2 w-full",
              placeholder: "Filtrovat..."
            }, null, 512)), [
              [Z, d.value]
            ]) : T("", !0),
            t.url ? (i(!0), f(I, { key: 2 }, _(c.value, (a, p) => (i(), f("div", {
              key: p,
              class: "px-2 py-1.5 hover:bg-gray-100 hover:cursor-pointer",
              onClick: (x) => B(a)
            }, b(a.text), 9, oe))), 128)) : (i(!0), f(I, { key: 1 }, _(P.value, (a) => (i(), f("div", {
              key: A(a.value),
              class: "px-2 py-1.5 hover:bg-gray-100 hover:cursor-pointer",
              onClick: (p) => B(a)
            }, b(a.text), 9, le))), 128)),
            t.url && r.value.isLoading ? (i(), f("div", ae, " Načítám... ")) : T("", !0)
          ], 4)) : T("", !0)
        ]))
      ]);
    };
  }
};
export {
  se as default
};
