import { computed as g, openBlock as l, createElementBlock as o } from "vue";
const s = ["innerHTML"], p = {
  __name: "HighlightText",
  props: {
    highlight: String,
    text: String
  },
  setup(n) {
    const e = n, i = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), c = g(() => {
      if (!e.text)
        return "";
      if (!e.highlight)
        return e.text;
      const t = new RegExp(i(e.highlight), "gi");
      return e.text.replace(t, (r) => `<span class="bg-yellow-300 text-red-500">${r}</span>`);
    });
    return (t, r) => (l(), o("div", { innerHTML: c.value }, null, 8, s));
  }
};
export {
  p as default
};
