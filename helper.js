var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
    httpGetAsync: function (bot, channelID, url, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(bot, channelID, xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true); // true for asynchronous.
        xmlHttp.send(null);
    }
};