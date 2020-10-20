const chalk = require("chalk");
const ayarlar = require("../ayarlar.json");
const moment = require("moment");
const Discord = require("discord.js");
const db = require('quick.db');

var prefix = ayarlar.prefix;
const bakımdurum = db.fetch(`botbakım`)

module.exports = client => {
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] LOG: Aktif, Komutlar yüklendi!`
  );
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] LOG: ${
      client.user.username
    } ismi ile giriş yapıldı!`
  );
  
  if (bakımdurum) {
  client.user.setStatus("idle");
  client.user.setActivity(prefix + "yardım | Bakım modu aktiftir!");
  } else {
  client.user.setStatus("idle");
  client.user.setActivity(prefix + "yardım | " + client.user.username + " v0.1 bot aktif!");
  } 
    
};
