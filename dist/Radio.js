import { openBlock as r, createElementBlock as n, createElementVNode as a, toDisplayString as i } from "vue";
const d = { class: "flex items-center mb-4" }, u = ["id", "value", "checked", "name"], m = ["for"], s = {
  __name: "Radio",
  props: {
    id: String,
    value: [String, Number, Object],
    modelValue: [String, Number, Object],
    name: String,
    label: String
  },
  emits: ["update:modelValue"],
  setup(e, { emit: o }) {
    return (l, t) => (r(), n("div", d, [
      a("input", {
        id: e.id,
        type: "radio",
        value: e.value,
        checked: e.modelValue === e.value,
        onChange: t[0] || (t[0] = (c) => l.$emit("update:modelValue", e.value)),
        name: e.name,
        class: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      }, null, 40, u),
      a("label", {
        for: e.id,
        class: "ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      }, i(e.label), 9, m)
    ]));
  }
};
export {
  s as default
};
