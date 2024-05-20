import { ref as f, computed as y, watch as p, openBlock as d, createElementBlock as u, createElementVNode as i, toDisplayString as c, withDirectives as V, Fragment as h, renderList as S, vModelSelect as k } from "vue";
const v = ["for"], x = ["id"], O = {
  disabled: "",
  value: ""
}, N = ["value"], J = {
  __name: "Select",
  props: {
    id: String,
    modelValue: [String, Object],
    options: Array,
    placeholder: String,
    label: String
  },
  emits: ["update:modelValue"],
  setup(l, { emit: n }) {
    const t = l, s = n, a = f(typeof t.modelValue == "object" ? JSON.stringify(t.modelValue) : t.modelValue), m = (e) => typeof e == "object" ? JSON.stringify(e) : e, g = y({
      get: () => typeof t.modelValue == "object" ? JSON.stringify(t.modelValue) : t.modelValue,
      set: (e) => {
        let o;
        try {
          o = JSON.parse(e);
        } catch {
          o = e;
        }
        s("update:modelValue", o);
      }
    });
    p(() => t.modelValue, (e) => {
      a.value = typeof e == "object" ? JSON.stringify(e) : e;
    });
    const b = () => {
      g.value = a.value;
    };
    return (e, o) => (d(), u("div", null, [
      i("label", {
        for: l.id,
        class: "block mb-2 text-sm font-medium text-gray-900"
      }, c(l.label), 9, v),
      V(i("select", {
        id: l.id,
        "onUpdate:modelValue": o[0] || (o[0] = (r) => a.value = r),
        onChange: b,
        class: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      }, [
        i("option", O, c(l.placeholder), 1),
        (d(!0), u(h, null, S(l.options, (r) => (d(), u("option", {
          key: r.value,
          value: m(r.value)
        }, c(r.text), 9, N))), 128))
      ], 40, x), [
        [k, a.value]
      ])
    ]));
  }
};
export {
  J as default
};
