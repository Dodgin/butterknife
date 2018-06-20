
Vue.component('StartGameComponent', {
    template: '#start-game-component',
    methods: {
        startGame() {
            this.$parent.startGame();
        }
    }
})
