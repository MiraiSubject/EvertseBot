require('dotenv').load();

/* Module loading */
const express = require('express');
const Discord = require('discord.io');
const logger = require('winston');
const path = require('path');
const PORT = process.env.PORT || 5000
const IDENTIFIER = "*";

/* Import command handlers */
var commands = require("./commands.js");


/* Express Server for pinging the bot on Heroku */
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.status(200).send("Pinged bot!"))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

/* Initialize Discord bot */
  var bot = new Discord.Client({
     token: process.env.DISCORD_TOKEN,
     autorun: true
  });

/* Configure logger for Heroku */
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';



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