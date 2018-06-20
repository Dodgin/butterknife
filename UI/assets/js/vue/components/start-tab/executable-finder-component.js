
Vue.component('ExecutableFinderComponent', {
    template: '#executable-finder-component',
    props: ['value'],
    methods: {
        processFile(event) {
            this.$parent.setLoaExecutableSystemPath(event.target.files[0].path)
            this.$parent.serializeAndSave();
        }
    }
})
