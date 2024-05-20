import { ref as s, openBlock as u, createElementBlock as g, createElementVNode as l, toDisplayString as m } from "vue";
const f = { class: "flex items-center" }, k = ["id", "checked"], b = ["for"], p = {
  __name: "Checkbox",
  props: {
    id: String,
    label: String,
    modelValue: Boolean,
    inverted: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: a }) {
    const n = t, d = a, o = s(null), c = () => n.inverted ? !n.modelValue : n.modelValue, i = (r) => {
      const e = r.target.checked;
      d("update:modelValue", n.inverted ? !e : e);
    };
    return (r, e) => (u(), g("div", f, [
      l("input", {
        ref_key: "inputEl",
        ref: o,
        id: t.id,
        type: "checkbox",
        checked: c(),
        onChange: i,
        class: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      }, null, 40, k),
      l("label", {
        for: t.id,
        class: "ml-2 text-sm font-medium text-gray-900 dark:text-gray-300",
        onClick: e[0] || (e[0] = (h) => o.value.click())
      }, m(t.label), 9, b)
    ]));
  }
};
export {
  p as default
};
