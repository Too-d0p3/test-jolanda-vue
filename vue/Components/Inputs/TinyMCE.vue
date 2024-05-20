<script setup>
import {defineEmits, onMounted, ref, watch} from "vue";

const props = defineProps({
    modelValue: String,
});

const emit = defineEmits(['update:modelValue', 'change']); // Pro aktualizaci hodnoty

const id = 'tinymce_' + Math.floor(Math.random() * (1000 - 1)) + 1;
const content = ref(props.modelValue);
const defVal = ref(props.modelValue);

const updateValue = (value) => {
    content.value = value;
    emit('update:modelValue', value);
}

watch(() => props.modelValue, (newVal) => {
    content.value = newVal;
});




onMounted(() => {
    tinymce.init({
        selector: 'textarea[id='+id+']:not([aria-hidden])',
        language: lang,
        branding: false,
        height: 300,
        image_advtab: true,
        relative_urls: false,
        remove_script_host: true,
        document_base_url: basePath,
        paste_data_images: true,
        convert_urls: true,
        skin: (Cookie.getCookie('color-mode') === 'prefer-dark') ? 'oxide-dark' : null,
        content_css: (Cookie.getCookie('color-mode') === 'prefer-dark') ? 'dark' : null,
        plugins: 'preview paste searchreplace autolink code visualblocks visualchars fullscreen image link media table charmap hr nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons responsivefilemanager',
        toolbar: 'undo redo | bold italic underline strikethrough | formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | charmap emoticons | fullscreen  preview | insertfile image media responsivefilemanager link anchor',
        // toolbar_sticky: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        toolbar_mode: 'sliding',
        external_filemanager_path: basePath + "/jolanda/front/filemanager/",
        // external_plugins: { "filemanager" : basePath + "/core/filemanager/plugin.min.js"},
        menu: {
            file: {title: 'File', items: 'newdocument restoredraft | preview | print '},
            edit: {title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace'},
            view: {
                title: 'View',
                items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen'
            },
            insert: {
                title: 'Insert',
                items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime'
            },
            format: {
                title: 'Format',
                items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats align | forecolor backcolor | removeformat'
            },
            tools: {title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount'},
            table: {title: 'Table', items: 'inserttable | cell row column | tableprops deletetable'},
        },
        filemanager_access_key: settings.filemanagerKey,
        filemanager_relative_url: basePath,
        setup: function (editor) {
            editor.on('blur change cut copy keyup paste focus focusout', function(e){
                editor.save();
                updateValue(editor.getContent());
            });

            watch(content, (value, oldValue) => {
                if(editor.getContent() !== value && oldValue !== value){
                    editor.setContent(value);
                }
            });

            let initialContent = '';
            editor.on('init', function () {
                initialContent = editor.getContent();
            });

            editor.on('blur', function () {
                let currentContent = editor.getContent();
                if (currentContent !== initialContent) {
                    editor.save();
                    initialContent = currentContent; // Aktualizace původního obsahu
                    emit('change', currentContent);
                }
            });
        },
    });
})
</script>

<template>
    <div>
        <textarea data-mce="true" :id="id" :value="defVal"></textarea>
    </div>
</template>

<style scoped>

</style>