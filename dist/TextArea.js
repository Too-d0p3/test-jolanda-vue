import { ref as d, watch as b, computed as f, openBlock as n, createElementBlock as s, toDisplayString as k, createCommentVNode as p, createElementVNode as y, normalizeClass as x } from "vue";
const v = ["for"], w = ["id", "placeholder", "required", "rows", "value"], h = {
  __name: "TextArea",
  props: {
    modelValue: String,
    // Hodnota použitá ve v-model z rodičovské komponenty
    label: String,
    id: String,
    placeholder: String,
    required: Boolean,
    size: {
      type: String,
      default: "default"
      // možnosti jsou 'small', 'default', 'large'
    },
    rows: {
      type: Number,
      default: 4
      // Defaultní počet řádků
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: i }) {
    const r = e, c = i, a = d(r.modelValue), u = d(null);
    b(() => r.modelValue, (t) => {
      a.value = t;
    });
    const m = (t) => {
      c("update:modelValue", t);
    }, g = f(() => {
      const t = "border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
      switch (r.size) {
        case "small":
          return `bg-gray-50 ${t} p-2 text-xs`;
        case "large":
          return `bg-gray-50 ${t} p-4 text-base`;
        default:
          return `bg-gray-50 ${t} p-2.5 text-sm`;
      }
    });
    return (t, l) => (n(), s("div", null, [
      e.label ? (n(), s("label", {
        key: 0,
        for: e.id,
        class: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
        onClick: l[0] || (l[0] = (o) => u.value.focus())
      }, k(e.label), 9, v)) : p("", !0),
      y("textarea", {
        ref_key: "inputEl",
        ref: u,
        id: e.id,
        placeholder: e.placeholder,
        required: e.required,
        rows: e.rows,
        value: a.value,
        onInput: l[1] || (l[1] = (o) => m(o.target.value)),
        class: x(g.value)
      }, null, 42, w)
    ]));
  }
};
export {
  h as default
};
