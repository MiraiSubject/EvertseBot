var helper = require("./helper.js");

module.exports = {
    ping: function () {
        // Respond to the user with a pong.
        bot.sendMessage({
            to: channelID,
            message: 'Pong!'
        });
    },
    synoniem: function (word) {
        // Retrieve several synonyms for a given word.
        var callback = function (html) {
            // Define beginning.
            html = html.split("\<dl class=\"alstrefwoordtabel\"\>")[1];
            // Define end.
            html = html.split("\<\/dl\>")[0];
            //html.replace("/\<\/dt\>/g", "\n");
            //var b = html.indexOf("<strong>");
            //var e = html.indexOf("</strong>");
            html.match(/>([^<]*)</g);
            html = html.toString().replace(/,/g,"").replace(/</g,"").replace(/>/g,"");
            bot.sendMessage({
                to: channelID,
                message: html
            });
        };
        // Make http call.
        helper.httpGetAsync(
            "https://synoniemen.net/index.php?zoekterm=" + word,
            callback
        );
    },
    help: function () {
        // Display all functions.
        bot.sendMessage({
            to: channelID,
            message: 'Gebruik: ping, synoniem, help.'
        });
    }
};
