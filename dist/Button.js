import { computed as i, openBlock as l, createElementBlock as s, normalizeClass as b, renderSlot as c } from "vue";
const f = ["disabled", "type"], p = {
  __name: "Button",
  props: {
    type: {
      type: String,
      default: "button"
      // např. 'button', 'submit', ...
    },
    variant: {
      type: String,
      default: "default"
      // např. 'default', 'alternative', 'dark', ...
    },
    size: {
      type: String,
      default: "base"
      // např. 'extra-small', 'small', 'base', 'large', 'extra-large'
    },
    disabled: Boolean
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const r = e, n = t, a = {
      "extra-small": "px-3 py-2 text-xs",
      small: "px-3 py-2 text-sm",
      base: "px-5 py-2.5 text-sm",
      large: "px-5 py-3 text-base",
      "extra-large": "px-6 py-3.5 text-base"
    }, o = {
      default: "me-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
      alternative: "me-2 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
      dark: "me-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700",
      light: "me-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
      green: "me-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
      red: "me-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
      yellow: "me-2 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg dark:focus:ring-yellow-900",
      purple: "me-2 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
    }, g = i(() => `${o[r.variant] || o.default} ${a[r.size]}`), d = () => {
      r.disabled || n("click");
    };
    return (u, y) => (l(), s("button", {
      class: b(g.value),
      disabled: e.disabled,
      onClick: d,
      type: e.type
    }, [
      c(u.$slots, "default")
    ], 10, f));
  }
};
export {
  p as default
};
