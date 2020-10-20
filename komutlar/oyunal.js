const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

//----------------------------------------\\

let hyr = '<:hyr:720713864395620445>'
let evt = '<:evt:720713765192204378>'
  
//----------------------------------------\\

var sonk = db.fetch(`sonoyun_${message.author.id}`)
var fark = Date.now() - sonk
var kalan = (sonk + 600000) - Date.now()

const kalansüre = moment.duration(kalan).format(`D [gün], H [saat], m [dakika], s [saniye]`);

if (message.author.id !== ayarlar.sahip) {
  if (message.author.id !== ayarlar.sahip2) {
    if (message.author.id !== ayarlar.sahip3) {
      if (message.author.id !== ayarlar.sahip4) {
        if (sonk) {
          if (fark < 600000) {
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
  
if (message.channel.type === "dm") {
  const hata = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + " **|** Bu komut sadece sunucularda kullanılabilir**!**")
  return message.channel.send(hata)
}

//----------------------------------------\\

var jeton = db.fetch(`jeton_${message.author.id}`)
  
if (jeton < 1) {
  const hata = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + " **|** Bu komutu kullanmak için **1 JETON** gereklidir**!**")
  return message.channel.send(hata)
}
    
//----------------------------------------\\
  
var kullanılankod = db.fetch("kullanılankodsayısı")
var eklenenkod = db.fetch("eklenenkodsayısı")
var key = db.fetch(`key_${kullanılankod}`)

//----------------------------------------\\

if (kullanılankod >= eklenenkod) {
  const hata = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + " **|** Şuanda mevcut stok yok, daha sonra tekrar deneyin**!**")
  return message.channel.send(hata)
}

//----------------------------------------\\

const kanal = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setDescription(evt + " **|** Hediye kodun özel mesajlarına gönderildi**!**")
const dm = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setTitle(evt + " | Hediye Kodu")
  .setDescription("⠀\n**▸** Kod**:** " + key + "\n⠀\n<:giftt:738328853537226763> **|** İyi günlerde kullanın...")
const dmhata = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setDescription(hyr + " **|** Sana özel mesaj gönderemiyorum**!**")

db.set(`sonoyun_${message.author.id}`, Date.now())
db.add(`jeton_${message.author.id}`, -1)
message.channel.send(kanal)
db.add("kullanılankodsayısı", 1)
message.author.send(dm).catch(x => {
  message.channel.send(dmhata)
  db.add("kullanılankodsayısı", -1)
  db.delete(`sonoyun_${message.author.id}`)
  db.add(`jeton_${message.author.id}`, 1)
})
  
//----------------------------------------\\
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['oyun-al'],
  permLevel: 0
};
exports.help = {
  name: 'oyun',
  description: '',
  usage: 'oyun'
};
