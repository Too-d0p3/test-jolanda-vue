import { resolveComponent as y, openBlock as c, createElementBlock as d, Fragment as C, renderList as f, createElementVNode as u, normalizeClass as V, toDisplayString as p, createCommentVNode as h, createTextVNode as _, createBlock as S } from "vue";
const T = { class: "pl-4" }, $ = ["onClick"], w = ["checked", "onChange"], I = {
  __name: "TreeViewItem",
  props: {
    items: Array,
    selected: Array
  },
  emits: ["update-selected"],
  setup(s, { emit: m }) {
    const n = s, k = m, x = (t) => {
      const l = n.selected.indexOf(t.id);
      l > -1 ? n.selected.splice(l, 1) : n.selected.push(t.id), k("update-selected", n.selected);
    }, g = (t) => n.selected.includes(t);
    return (t, l) => {
      const v = y("TreeViewItem", !0);
      return c(), d("ul", T, [
        (c(!0), d(C, null, f(s.items, (e) => {
          var r, o, a;
          return c(), d("li", {
            key: e.id,
            class: "mt-2"
          }, [
            u("div", {
              class: V(["flex items-center", { "ml-5": !((r = e.children) != null && r.length) }])
            }, [
              (o = e.children) != null && o.length ? (c(), d("a", {
                key: 0,
                onClick: (i) => e.expanded = !e.expanded,
                class: "hover:cursor-pointer hover:underline mr-3"
              }, p((a = e.children) != null && a.length ? e.expanded ? "-" : "+" : ""), 9, $)) : h("", !0),
              u("input", {
                type: "checkbox",
                checked: g(e.id),
                onChange: (i) => x(e),
                class: "mr-2"
              }, null, 40, w),
              _(" " + p(e.text), 1)
            ], 2),
            e.expanded ? (c(), S(v, {
              key: 0,
              items: e.children,
              selected: s.selected,
              onUpdateSelected: l[0] || (l[0] = (i) => t.$emit("update-selected", s.selected))
            }, null, 8, ["items", "selected"])) : h("", !0)
          ]);
        }), 128))
      ]);
    };
  }
};
export {
  I as default
};
