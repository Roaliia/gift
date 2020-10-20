const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");
const moment = require('moment');

exports.run = async (client, message, args) => {

//----------------------------------------\\

let hyr = '<:hyr:720713864395620445>'
let evt = '<:evt:720713765192204378>'
var sunucuid = '735406701452328990'
var sunucu = client.guilds.cache.get('735406701452328990')

//----------------------------------------\\

var sonk = db.fetch(`sonk_${message.author.id}`)
var fark = Date.now() - sonk
var kalan = (sonk + 86400000) - Date.now()

const kalansüre = moment.duration(kalan).format(`D [gün], H [saat], m [dakika], s [saniye]`);

if (sonk) {
  if (fark < 86400000) {
    const hata = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(hyr + " **|** Bu komutu kullanmak için **" + kalansüre + "** beklemelisin**!**")
    return message.channel.send(hata)
  }
}

//----------------------------------------\\

if (message.guild.id !== sunucuid) {
  
  const bilgilendirme = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + " **|** Bu komutu **[" + sunucu.name + "](https://discord.gg/t96qWw2)** sunucusunda kullanırsanız **2 JETON** kazanırsınız**,** yinede kullanmak için `✅` ile tepki verin**!**")
  message.channel.send(bilgilendirme)
  
await message.react('✅').then(r => {
  let userr = message.author
  let onay = (reaction, userr) => reaction.emoji.name == '✅' && userr.id === message.author.id
  let onay2 = message.createReactionCollector(onay)

  onay2.on('collect', async(r) => {
    message.reactions.removeAll()
    const onay = new Discord.MessageEmbed()
      .setColor('BLACK')
      .setDescription(evt + " **|** Günlük **1** jeton hesabınıza yatırıldı**!**")
    message.channel.send(onay)
    db.set(`sonk_${message.author.id}`, Date.now())
    db.add(`jeton_${message.author.id}`, 1)
  })
})
 
return
  
} else {
  
  const onay = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setDescription(evt + " **|** Günlük **2** jeton hesabınıza yatırıldı**!**")
  message.channel.send(onay)
  db.add(`jeton_${message.author.id}`, 2)
  db.set(`sonk_${message.author.id}`, Date.now())
  
  return
  
}

//----------------------------------------\\
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['token'],
  permLevel: 0
};
exports.help = {
  name: 'jeton',
  description: '',
  usage: 'durum'
};
