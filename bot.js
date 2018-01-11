"use strict";

const API = require("node-vk-bot-api");
const bot = new API(process.env.TOKEN);

const app = require("express")();
app.listen(process.env.PORT);

const u = {
    
    date: () => {
        let date = new Date();
        return "[ " + date.toUTCString() + " ]";
    },
    
    log: (...args) => {
        console.log(date(), ...args);
    }
}

bot.on((data) => {
    u.log(data);
    data.reply();
});

bot.listen();
