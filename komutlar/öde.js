const Discord = require('discord.js');
const db = require('quick.db');
const moment = require("moment");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {

//----------------------------------------\\
  
let hyr = '<:hyr:720713864395620445>'
let evt = '<:evt:720713765192204378>'
var jeton = db.fetch(`jeton_${message.author.id}`)
let miktar = args.slice(1).join(' ');
let kişi = args[0]
var kişiget = client.users.cache.get(kişi)

//----------------------------------------\\

var sonk = db.fetch(`sonöde_${message.author.id}`)
var fark = Date.now() - sonk
var kalan = (sonk + 600000) - Date.now()

const kalansüre = moment.duration(kalan).format(`D [gün], H [saat], m [dakika], s [saniye]`);

if (message.author.id !== ayarlar.sahip) {
  if (message.author.id !== ayarlar.sahip2) {
    if (message.author.id !== ayarlar.sahip3) {
      if (message.author.id !== ayarlar.sahip4) {
        if (sonk) {
          if (fark < 300000) {
            const hata = new Discord.MessageEmbed()
              .setColor("BLACK")
              .setDescription(hyr + " **|** Bu komutu kullanmak için **" + kalansüre + "** beklemelisin**!**")
            return message.channel.send(hata)
          }
        }
      }
    }
  }
}
  
//----------------------------------------\\

if (!kişi) {
  const hata = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + " **|** Göndermek istediğin kişinin ID'sini yazmalısın**!**")
  return message.channel.send(hata)
}

if (!miktar) {
  const hata = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + " **|** Göndermek istediğin miktarı yazmalısın**!**")
  return message.channel.send(hata)
}
  
if (miktar < 3) {
  const hata = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + " **|** Minimum **3 JETON** aktarım yapabilirsin**!**")
  return message.channel.send(hata)
}
  
if (miktar > 50) {
  const hata = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + " **|** Maksimum **50 JETON** aktarım yapabilirsin**!**")
  return message.channel.send(hata)
}

if (miktar > jeton) {
  const hata = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + " **|** Yetersiz bakiye, şuanda **" + jeton + "** jetonun var**!**")
  return message.channel.send(hata)
}
  
if (!kişiget) {
  const hata = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + " **|** Girdiğiniz kullanıcı **ID** geçersizdir**!**")
  return message.channel.send(hata)
}
  
//----------------------------------------\\
  
db.add(`jeton_${message.author.id}`, -miktar)
const mesaj = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setDescription(evt + " **|** Başarılı, <@" + kişi + "> adlı kullanıcıya **" + miktar + " JETON** ödeme yapıldı**!**")
message.channel.send(mesaj)
db.add(`jeton_${kişi}`, miktar)
db.set(`sonöde_${message.author.id}`, Date.now())
  
//----------------------------------------\\
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['aktar', 'pay'],
  permLevel: 0
};
exports.help = {
  name: 'öde',
  description: '',
  usage: 'durum'
};
