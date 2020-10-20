const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");
const moment = require('moment');

exports.run = async (client, message, args) => {

//----------------------------------------\\

let hyr = '<:hyr:720713864395620445>'
let evt = '<:evt:720713765192204378>'
var kanalid = '737282772611366932'
var kanal = client.channels.cache.get('737282772611366932')

//----------------------------------------\\

var sonk = db.fetch(`sonsponsor_${message.author.id}`)
var fark = Date.now() - sonk
var kalan = (sonk + 600000) - Date.now()

const kalansüre = moment.duration(kalan).format(`D [gün], H [saat], m [dakika], s [saniye]`);

if (sonk) {
  if (fark < 600000) {
    const hata = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(hyr + " **|** Bu komutu kullanmak için **" + kalansüre + "** beklemelisin**!**")
    return message.channel.send(hata)
  }
}

//----------------------------------------\\

var link = args.slice(0).join(' ');
  
if (!link) {
  const hata = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + " **|** Sponsor'luk yapabilmek için bir oyun kodu yazmalısın**!**")
  return message.channel.send(hata)
}
  
const embed = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setTitle(evt + " | Oyun Gönderildi")
  .setTimestamp()
  .setFooter("Gifts+ Sponsorluk Sistemi")
  .setDescription(`
⠀
**▸** Gönderen**:** <@${message.author.id}>
**▸** Link**:** ${link}
⠀
`)
kanal.send(embed)
  
const mesaj = new Discord.MessageEmbed()
  .setColor("BLACK") 
  .setDescription(evt + " **|** Link başarıyla gönderildi**,** gereksiz kullanan kişiler karalisteye alınır**!**")
message.channel.send(mesaj)
  
db.set(`sonsponsor_${message.author.id}`, Date.now())

//----------------------------------------\\
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['öneri'],
  permLevel: 0
};
exports.help = {
  name: 'sponsor',
  description: '',
  usage: 'durum'
};
