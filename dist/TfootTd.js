import { openBlock as o, createElementBlock as s, renderSlot as a } from "vue";
const r = ["colspan"], p = {
  __name: "TfootTd",
  props: {
    colspan: Number
  },
  setup(e) {
    return (t, c) => (o(), s("th", {
      colspan: e.colspan,
      scope: "row",
      class: "px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    }, [
      a(t.$slots, "default")
    ], 8, r));
  }
};
export {
  p as default
};
