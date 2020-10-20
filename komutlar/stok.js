const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {

//----------------------------------------\\
  
let hyr = '<:hyr:720713864395620445>'
let evt = '<:evt:720713765192204378>'
var eklenenkod = db.fetch("eklenenkodsayısı")
var kullanılankod = db.fetch("kullanılankodsayısı")
var stok = eklenenkod - kullanılankod

//----------------------------------------\\

const embed = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setTitle("<:giftt:738328853537226763> | Gifts+ Stok")
  .setDescription("⠀\n<:card:719841719541170226> **▸** Stokta **" + stok + "** oyun mevcut**!** \n⠀")
  .setFooter("Gifts+ Stok Sistemi")
  .setTimestamp()
message.channel.send(embed)

//----------------------------------------\\
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['stock'],
  permLevel: 0
};
exports.help = {
  name: 'stok',
  description: '',
  usage: 'durum'
};
