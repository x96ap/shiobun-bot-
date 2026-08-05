const defaults = require("../config/defaults");

module.exports = {

    info(message) {
        console.log(`🌸 ${defaults.botName} │ ${message}`);
    },

    success(message) {
        console.log(`✨ ${defaults.botName} │ ${message}`);
    },

    warning(message) {
        console.log(`🍓 ${defaults.botName} │ ${message}`);
    },

    error(message) {
        console.log(`🥺 ${defaults.botName} │ ${message}`);
    }

};
