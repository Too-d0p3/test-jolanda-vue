import { ref as r, watch as s, onMounted as g, openBlock as f, createElementBlock as h, createElementVNode as k } from "vue";
const b = ["value"], v = {
  __name: "TinyMCE",
  props: {
    modelValue: String
  },
  emits: ["update:modelValue", "change"],
  setup(c, { emit: u }) {
    const l = c, n = u, i = "tinymce_" + Math.floor(Math.random() * 999) + 1, o = r(l.modelValue), m = r(l.modelValue), d = (e) => {
      o.value = e, n("update:modelValue", e);
    };
    return s(() => l.modelValue, (e) => {
      o.value = e;
    }), g(() => {
      tinymce.init({
        selector: "textarea[id=" + i + "]:not([aria-hidden])",
        language: lang,
        branding: !1,
        height: 300,
        image_advtab: !0,
        relative_urls: !1,
        remove_script_host: !0,
        document_base_url: basePath,
        paste_data_images: !0,
        convert_urls: !0,
        skin: Cookie.getCookie("color-mode") === "prefer-dark" ? "oxide-dark" : null,
        content_css: Cookie.getCookie("color-mode") === "prefer-dark" ? "dark" : null,
        plugins: "preview paste searchreplace autolink code visualblocks visualchars fullscreen image link media table charmap hr nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons responsivefilemanager",
        toolbar: "undo redo | bold italic underline strikethrough | formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | charmap emoticons | fullscreen  preview | insertfile image media responsivefilemanager link anchor",
        // toolbar_sticky: true,
        quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
        toolbar_mode: "sliding",
        external_filemanager_path: basePath + "/jolanda/front/filemanager/",
        // external_plugins: { "filemanager" : basePath + "/core/filemanager/plugin.min.js"},
        menu: {
          file: { title: "File", items: "newdocument restoredraft | preview | print " },
          edit: { title: "Edit", items: "undo redo | cut copy paste | selectall | searchreplace" },
          view: {
            title: "View",
            items: "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen"
          },
          insert: {
            title: "Insert",
            items: "image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime"
          },
          format: {
            title: "Format",
            items: "bold italic underline strikethrough superscript subscript codeformat | formats blockformats align | forecolor backcolor | removeformat"
          },
          tools: { title: "Tools", items: "spellchecker spellcheckerlanguage | code wordcount" },
          table: { title: "Table", items: "inserttable | cell row column | tableprops deletetable" }
        },
        filemanager_access_key: settings.filemanagerKey,
        filemanager_relative_url: basePath,
        setup: function(e) {
          e.on("blur change cut copy keyup paste focus focusout", function(t) {
            e.save(), d(e.getContent());
          }), s(o, (t, p) => {
            e.getContent() !== t && p !== t && e.setContent(t);
          });
          let a = "";
          e.on("init", function() {
            a = e.getContent();
          }), e.on("blur", function() {
            let t = e.getContent();
            t !== a && (e.save(), a = t, n("change", t));
          });
        }
      });
    }), (e, a) => (f(), h("div", null, [
      k("textarea", {
        "data-mce": "true",
        id: i,
        value: m.value
      }, null, 8, b)
    ]));
  }
};
export {
  v as default
};
