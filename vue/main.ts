import { createApp} from "vue";
import ExcelApp from "@/ExcelApp/ExcelApp.vue";
// import TranslationToolApp from "@project/TranslationToolApp/TranslationToolApp.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import "./assets/index.css";
import ContextMenuColumnInfo from "@/Handsontable/Components/Table/ContextMenuColumnInfo.vue";

// const app = createApp(App);
//
// app.mount('#app');


// document.querySelectorAll('#translation-tool-app').forEach(el => {
//     const props: {[key: string]: any} = {};
//     Array.from(el.attributes).forEach(attr => {
//         if (attr.name.startsWith('data-')) {
//             // Převod názvu atributu z data-prop1 na prop1
//             const propName = attr.name.substring(5);
//             try {
//                 props[propName] = JSON.parse(attr.value);
//             } catch (e) {
//                 props[propName] = attr.value;
//             }
//
//         }
//     });
//     console.log(props);
//     const app = createApp(TranslationToolApp, props);
//     app.use(VueAxios, axios);
//     const mount = app.mount(el);
// });

// const handsontableApp = createApp(PriceListConfigurator);
// handsontableApp.use(VueAxios, axios);
// handsontableApp.mount("#handsontable-app");

// const filter = createApp(FilterDialog);
// filter.use(VueAxios, axios);
// filter.use(vuetify);
// filter.mount('#filter');

document.querySelectorAll('#handsontable-app').forEach(el => {
    const props: {[key: string]: any} = {};
    Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith('data-')) {
            // Převod názvu atributu z data-prop1 na prop1
            const propName = attr.name.substring(5);
            props[propName] = attr.value;
        }
    });

    const handsontableApp = createApp(ExcelApp, props);
    handsontableApp.use(VueAxios, axios);
    handsontableApp.mount("#handsontable-app");
});

function mountVueComponent() {
    // Zkontroluje, zda element existuje
    // debugger;
    const el = document.getElementById("ContextMenuColumnInfo");
    if (el && !el.hasAttribute("data-v-app")) {
        const props = Array.from(el.attributes)
            .filter((attr) => attr.name.startsWith("data-"))
            .reduce((props: any, attr) => {
                // Převod názvu atributu z formátu data-attribute-name na attributeName
                const propName = attr.name.substring(5).replace(/-./g, (match) => match.charAt(1).toUpperCase());
                props[propName] = attr.value;
                return props;
            }, {});
        // Jestli ano, vytvoří a připojí Vue aplikaci
        const test = createApp(ContextMenuColumnInfo, props);
        test.mount(el);
    }
}

const observerCallback = (mutationsList: any, observer: any) => {
    for (let mutation of mutationsList) {
        if (mutation.type === "childList" && mutation.addedNodes.length) {
            mutation.addedNodes.forEach((node: any) => {
                // Zkontrolujte, zda přidaný node je element s id 'test'
                if (node.id === "ContextMenuColumnInfo") {
                    mountVueComponent();
                }
            });
        }
    }
};

// Nastavení MutationObserver
const observer = new MutationObserver(observerCallback);

// Konfigurace observeru k sledování přidání nových elementů do DOM
const config = { childList: true, subtree: true };

// Spuštění observeru na celý dokument
observer.observe(document.body, config);
