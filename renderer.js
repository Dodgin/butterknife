// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

console.log('renderer.js loaded');

let DEBUG_MODE = true;
let DEBUG_APP_STATE = 1;

var fs = require('fs');
var exec = require('child_process').execFile;
let states_enum = {
    STATE_CLIENTNOTSTARTED: 0,
    STATE_CLIENTSTARTED: 1
}

var app = new Vue({
    el: '#app',
    data: {
        state: DEBUG_MODE ? DEBUG_APP_STATE : states_enum.STATE_CLIENTNOTSTARTED,
        states_enum: states_enum,
        child_process: null,
        game_pid: null,
        serializable: {
            loa_executable_system_path:
              "C:\\Program Files (x86)\\Legends of Aria Beta\\LegendsOfAria.exe"
        }
    },
    created: function() {
        this.loadAndUnserialize();
    },
    methods: {
        serializeAndSave() {
            let str = JSON.stringify(this.serializable);
            try { fs.writeFileSync('user_data.dat', str, 'utf-8'); }
            catch(e) { alert('Failed to save the file !'); }
        },
        loadAndUnserialize() {
            try {
                let str = fs.readFileSync('user_data.dat','utf-8');
                this.serializable = JSON.parse(str);
            }
            catch(e) { alert('Data file corrupted! Resetting data...'); }
        },
        setLoaExecutableSystemPath(path) {
            this.serializable.loa_executable_system_path = path;
        },
        startGame() {
            child_process = exec(this.serializable.loa_executable_system_path,
                this.exitCallback);
            this.game_pid = child_process.pid;
            this.state = states_enum.STATE_CLIENTSTARTED;
        },
        exitCallback(error, stdout, stderr) {
            this.game_pid = null;
            this.state = states_enum.STATE_CLIENTNOTSTARTED;
        }
    }
})
