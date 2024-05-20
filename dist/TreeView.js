import { ref as o, onMounted as i, openBlock as m, createElementBlock as c, createElementVNode as p, toDisplayString as f, createVNode as _ } from "vue";
import v from "./TreeViewItem.js";
import V from "axios";
const x = {
  __name: "TreeView",
  props: {
    items: {
      type: Array,
      default: null
    },
    dataUrl: {
      type: String,
      default: null
    },
    modelValue: Boolean,
    label: {
      type: String,
      default: "Select items"
    }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: n }) {
    const e = r, d = n, a = o(e.items), l = o(e.modelValue ?? []), u = () => {
      e.dataUrl && V.get(e.dataUrl).then((t) => {
        a.value = t.data;
      });
    };
    i(() => {
      e.dataUrl && u();
    });
    const s = (t) => {
      l.value = t, d("update:modelValue", l.value);
    };
    return (t, S) => (m(), c("div", null, [
      p("div", null, f(e.label), 1),
      _(v, {
        items: a.value,
        selected: l.value,
        onUpdateSelected: s
      }, null, 8, ["items", "selected"])
    ]));
  }
};
export {
  x as default
};
