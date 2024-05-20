import { openBlock as i, createElementBlock as m, withModifiers as s, createElementVNode as n, renderSlot as a, createVNode as c, withCtx as d, createTextVNode as l } from "vue";
import _ from "./Button.js";
const u = { class: "grid gap-6 mb-6" }, g = {
  __name: "Form",
  emits: ["submit"],
  setup(p, { emit: e }) {
    const t = e, o = () => {
      t("submit");
    };
    return (r, f) => (i(), m("form", {
      onSubmit: s(o, ["prevent"])
    }, [
      n("div", u, [
        a(r.$slots, "default")
      ]),
      c(_, {
        variant: "green",
        type: "submit"
      }, {
        default: d(() => [
          l("Uložit")
        ]),
        _: 1
      })
    ], 32));
  }
};
export {
  g as default
};
