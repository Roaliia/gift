const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {

//----------------------------------------\\

let hyr = '<:hyr:720713864395620445>'
let evt = '<:evt:720713765192204378>'
  
//----------------------------------------\\
  
if (message.guild) {
  const hata = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + " **|** Bu komut sadece özel mesajda kullanılabilir**!**")
  return message.channel.send(hata)
}

//----------------------------------------\\

var link = args.slice(0).join(' ');
  
if (!link) {
  const hata = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + " **|** Sisteme eklemek için bir hediye linki girmelisin**!**")
  return message.channel.send(hata)
}
    
//----------------------------------------\\
  
var eklenenkod = db.fetch("eklenenkodsayısı")
var key = `key_${eklenenkod}`

//----------------------------------------\\

db.set(key, link)

db.add("eklenenkodsayısı", 1)

const mesaj = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setDescription(evt + " **|** Link başarıyla sisteme eklendi**!** \n⠀\n:gift: **|** No**:** `" + eklenenkod + "`, Link**:** `" + link + "`")
message.channel.send(mesaj)
  
//----------------------------------------\\
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['add'],
  permLevel: 8
};
exports.help = {
  name: 'ekle',
  description: '',
  usage: 'durum'
};
