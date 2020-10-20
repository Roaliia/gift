const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  let hyr = '<:hyr:720713864395620445>'
  let evt = '<:evt:720713765192204378>'
  let user = client.users.cache.get(args.slice(0).join(' '));
    if (!user) {
    let nickyaz = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + " **|** Karaliste'den çıkarmak istediğin kişinin **ID**'sini yaz**!**")
    message.channel.send({embed: nickyaz})
    return;
  };
  
  let karalistededeğil = db.fetch(`karalist_${user.id}`)
  if (karalistededeğil === null) {
    let listededeğil = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + ` **|** **${user.tag}** adlı kullanıcı karaliste'de değil**!**`)
    message.channel.send({embed: listededeğil})
    return
  }
  
  db.delete(`karalist_${user.id}`)  
  let çıkarıldı = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(evt + ` **|** **${user.tag}** adlı kullanıcı karaliste'den çıkarıldı**!**`)
    message.channel.send({embed: çıkarıldı})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["beyaz-liste"],
  permLevel: 8,
};

exports.help = {
  name: "beyazliste",
  description: "Belirtilen kullancıyı kara listeden çıkartır!",
  usage: "beyazliste <kullanıcı ID>"
};