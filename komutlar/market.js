const Discord = require("discord.js");
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

let hyr = '<:hyr:720713864395620445>'
let evt = '<:evt:720713765192204378>'
let kraken = '<:giftt:738328853537226763>'
let prefix = ayarlar.prefix

const jeton = db.fetch(`jeton_${message.author.id}`) || 0
const mesaj = db.fetch(`mesaj_${message.author.id}`) || 0

if (args[0] === "jeton") {
  var kanal = client.channels.cache.get("737282772611366932")
  const mesaj = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(evt + " **|** Satın alma isteği Geliştirici kişilere bildirildi, boş yere kullanırsanız karalisteye alınırsınız**!**")
  message.channel.send(mesaj)
  const mesaj1 = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(evt + " **|** Yeni Jeton satın alma isteği mevcut, iletişime geçiniz**!** **(** Kişi**:** <@" + message.author + "> **)**")
  kanal.send(mesaj1)
  return
}

const marketembed = new Discord.MessageEmbed()
  .setColor('BLACK')
  .setTitle(kraken + ' | ' + client.user.username + ' Mağaza')
  .setDescription(`
⠀
> **Şuanda hesabında** \`${jeton}\` **jetonun mevcut!**
> *Jeton kazanmak için* **${prefix}jeton** *yazarabilirsin!*
⠀
> **▸** Ürün: **5 Gifts+ Jeton**
>
> **∘** Kod: **#JETON**
> **∘** Miktar: **5 Jeton**
> **∘** Fiyat: **8 Members+ Coin**
>
> **▸** Satın almak için**:** \`${prefix}market jeton\`
⠀
> **NOT:** Satın alma komutunu kullandığınız
> zaman Geliştirici kişilere bildirim gider.
`)

message.channel.send(marketembed)

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["market"],
  permLevel: 0,
};

exports.help = {
  name: "mağaza",
  description: "Mağaza",
  usage: "mağaza"
};
