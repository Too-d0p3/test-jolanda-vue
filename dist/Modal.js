import { defineComponent as c, openBlock as l, createBlock as u, Teleport as m, createElementBlock as b, createElementVNode as e, normalizeClass as f, unref as h, renderSlot as s, createTextVNode as x, createCommentVNode as g } from "vue";
const p = {
  key: 0,
  tabindex: "-1",
  "aria-hidden": "true",
  class: "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[1000] justify-center items-center w-full md:inset-0 h-[100%] max-h-full flex bg-gray-900/50"
}, y = { class: "relative bg-white rounded-lg shadow dark:bg-gray-700" }, w = { class: "flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600" }, _ = { class: "text-xl font-semibold text-gray-900 dark:text-white" }, k = /* @__PURE__ */ e("svg", {
  class: "w-4 h-4",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), v = /* @__PURE__ */ e("span", { class: "sr-only" }, "Close modal", -1), C = [
  k,
  v
], z = { class: "p-4 md:p-5 space-y-4" }, V = /* @__PURE__ */ e("p", { class: "text-base leading-relaxed text-gray-500 dark:text-gray-400" }, " Default body content. ", -1), B = { class: "flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600" }, N = /* @__PURE__ */ c({
  __name: "Modal",
  props: {
    isVisible: { type: Boolean, default: !1 },
    size: { default: "medium" }
  },
  emits: ["update:isVisible"],
  setup(r, { emit: a }) {
    const n = r, d = a, i = {
      extraSmall: "max-w-xl",
      small: "max-w-3xl",
      // Přizpůsobte tyto hodnoty vašim potřebám
      medium: "max-w-6xl",
      large: "max-w-[1500px]",
      fullscreen: "max-w-full"
    }[n.size], o = () => {
      d("update:isVisible", !1);
    };
    return (t, M) => (l(), u(m, { to: "body" }, [
      t.isVisible ? (l(), b("div", p, [
        e("div", {
          class: f(["relative p-4 w-full max-h-full z-100", h(i)])
        }, [
          e("div", y, [
            e("div", w, [
              e("h3", _, [
                s(t.$slots, "header", {}, () => [
                  x(" Default header content ")
                ])
              ]),
              e("button", {
                onClick: o,
                type: "button",
                class: "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              }, C)
            ]),
            e("div", z, [
              s(t.$slots, "body", {}, () => [
                V
              ])
            ]),
            e("div", B, [
              s(t.$slots, "footer", {}, () => [
                e("button", {
                  onClick: o,
                  type: "button",
                  class: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                }, "Default action")
              ])
            ])
          ])
        ], 2)
      ])) : g("", !0)
    ]));
  }
});
export {
  N as default
};
