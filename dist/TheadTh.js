import { openBlock as s, createElementBlock as c, renderSlot as t } from "vue";
const a = ["colspan"], p = {
  __name: "TheadTh",
  props: {
    colspan: Number
  },
  setup(e) {
    return (o, l) => (s(), c("th", {
      colspan: e.colspan,
      scope: "col",
      class: "px-6 py-3"
    }, [
      t(o.$slots, "default")
    ], 8, a));
  }
};
export {
  p as default
};
