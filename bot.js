const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const IDENTIFIER = "*";

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
.listen(PORT, () => console.log(`Listening on ${ PORT }`))

var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var commands = require("./commands.js");
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == IDENTIFIER) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        try {
            switch(cmd) {
                // !ping
                case 'ping':
                    commands.ping(bot, channelID);
                break;
                case 'help':
                    commands.help(bot, channelID);
                break;
                case 'synoniem':
                    commands.synoniem(bot, channelID, args[0]);
                break;
            }
        } catch (e) {
            bot.sendMessage({
                to: channelID,
                message: "oepsiewoepsie, we hebben een vaudjewaudje gemaakt, OwO.\n" + e.message
            });
        }
     }
});