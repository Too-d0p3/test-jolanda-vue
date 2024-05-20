import { openBlock as t, createElementBlock as o, createElementVNode as r, renderSlot as s } from "vue";
import { _ as l } from "./_plugin-vue_export-helper-CHgC5LLL.mjs";
const a = {}, c = { class: "relative overflow-x-auto shadow-md sm:rounded-lg" }, n = { class: "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" };
function d(e, _) {
  return t(), o("div", c, [
    r("table", n, [
      s(e.$slots, "default")
    ])
  ]);
}
const i = /* @__PURE__ */ l(a, [["render", d]]);
export {
  i as default
};
