import { openBlock as o, createElementBlock as s, renderSlot as r } from "vue";
const a = ["colspan"], p = {
  __name: "TbodyTd",
  props: {
    colspan: Number
  },
  setup(e) {
    return (t, c) => (o(), s("td", {
      colspan: e.colspan,
      scope: "row",
      class: "px-6 py-3 font-medium text-gray-900 dark:text-white"
    }, [
      r(t.$slots, "default")
    ], 8, a));
  }
};
export {
  p as default
};
