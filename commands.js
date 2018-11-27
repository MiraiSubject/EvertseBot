var helper = require("./helper.js");

module.exports = {
    ping: function (bot, channelID) {
        // Respond to the user with a pong.
        bot.sendMessage({
            to: channelID,
            message: 'Pong!'
        });
    },

    synoniem: function (bot, channelID, word) {
        // Retrieve several synonyms for a given word.
        var callback = function (bot, channelID, html) {
            // Define beginning and end.
            html = html.split('<p class="kopje">')[1].split("</dl>")[0];
            // Get everything between tags.
            html = html.match(/>([^<]*)</g);
            // Clean tags and array commas.
            html = html.toString().replace(/,/g,"").replace(/</g,"").replace(/>/g,"");
            bot.sendMessage({
                to: channelID,
                message: html
            });
        };
        // Make http call.
        helper.httpGetAsync(
            bot, channelID,
            "https://synoniemen.net/index.php?zoekterm=" + word,
            callback
        );
    },

    help: function (bot, channelID) {
        // Display all functions.
        bot.sendMessage({
            to: channelID,
            message: 'Gebruik: ping, synoniem [argument], help.'
        });
    }
};
