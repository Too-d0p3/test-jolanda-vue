import { ref as d, watch as b, computed as m, openBlock as n, createElementBlock as i, toDisplayString as f, createCommentVNode as p, createElementVNode as k, normalizeClass as x } from "vue";
const v = ["for"], V = ["type", "id", "placeholder", "required", "value", "readonly"], S = {
  __name: "InputField",
  props: {
    modelValue: String,
    // Přijímá hodnotu použitou v v-model z rodičovské komponenty
    label: String,
    id: String,
    type: String,
    placeholder: String,
    required: Boolean,
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
  setup(l, { emit: s }) {
    const t = l, c = s, a = d(t.modelValue), u = d(null);
    b(() => t.modelValue, (e) => {
      a.value = e;
    });
    const g = (e) => {
      c("update:modelValue", e);
    }, y = m(() => {
      let e = "border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-2.5";
      switch (t.readonly ? e += " bg-gray-100" : e += " bg-gray-50", t.size) {
        case "small":
          return `bg-gray-50 ${e} py-2 text-xs`;
        case "large":
          return `bg-gray-50 ${e} py-4 text-base`;
        default:
          return `bg-gray-50 ${e} py-2.5 text-sm`;
      }
    });
    return (e, r) => (n(), i("div", null, [
      typeof t.label < "u" ? (n(), i("label", {
        key: 0,
        for: l.id,
        class: "block mb-2 text-sm font-medium text-gray-900",
        onClick: r[0] || (r[0] = (o) => u.value.focus())
      }, f(l.label), 9, v)) : p("", !0),
      k("input", {
        type: l.type,
        id: l.id,
        placeholder: l.placeholder,
        required: l.required,
        value: a.value,
        onInput: r[1] || (r[1] = (o) => g(o.target.value)),
        class: x(y.value),
        readonly: l.readonly,
        ref_key: "inputEl",
        ref: u
      }, null, 42, V)
    ]));
  }
};
export {
  S as default
};
