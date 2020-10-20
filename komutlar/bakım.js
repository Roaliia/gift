const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");
exports.run = async(client, message, args) => { 
  
  const bakımdurum = db.fetch(`botbakım`)
  let hyr = '<:hyr:720713864395620445>'
  let evt = '<:evt:720713765192204378>'
  let kraken = '<:giftt:738328853537226763>'
  let emoji = '<:panel:719822727208501298>'
  let emoji1 = '<:yapimcim:719817696547700757>'
  let şuankiprefix = ayarlar.prefix
  
const bakımdadeğil = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setDescription(hyr + " **|** Bakım modu zaten kapalı**!**")
const bakımkapatıldı = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setDescription(evt + " **|** Bakım modu **" + message.author.tag + "** tarafından kapatıldı**!**")
const zatenbakımda = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setDescription(hyr + " **|** Bakım modu zaten açık**!**")
const bakımaçıldı = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setDescription(evt + " **|** Bakım modu **" + message.author.tag + "** tarafından açıldı**!**")
const sebepyaz = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setDescription(hyr + " **|** Bakım modunu açmak için bir **sebep** yazmalısın**!**")
const hatalıkullanım = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setDescription(hyr + ' **|** Lütfen bir **durum** belirtiliz, örnek**:**\n\n' + emoji + ' **Açma:** `' + şuankiprefix + 'bakım aç <sebep>`\n' + emoji1 + ' **Kapatma:** `' + şuankiprefix + 'bakım kapat`')
  
let sebep = args.slice(1).join(' ');
  
if(args[0] === "kapat") {
  if(!bakımdurum) return message.channel.send(bakımdadeğil)
  if(sebep) return message.channel.send(hatalıkullanım)
  message.channel.send(bakımkapatıldı)
  db.delete(`botbakım`)    
  client.user.setActivity(ayarlar.prefix + "yardım | " + client.user.username + " v0.1 bot aktif!");
  return
}
  
  
if(args[0] === "aç") {
  if(bakımdurum) return message.channel.send(zatenbakımda)
  if(!sebep) return message.channel.send(sebepyaz)
  message.channel.send(bakımaçıldı)
  db.set(`botbakım`, sebep) 
  client.user.setActivity(ayarlar.prefix + "yardım | Bakım modu aktiftir!");
  return
}
 
  
message.channel.send(hatalıkullanım)
  
  
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 8
};

exports.help = {
  name: 'bakım',
  description: 'Bakım', 
  usage: 'bakım'
};
