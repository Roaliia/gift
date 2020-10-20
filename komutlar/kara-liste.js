const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  let hyr = '<:hyr:720713864395620445>'
  let evt = '<:evt:720713765192204378>'
  let user = client.users.cache.get(args.slice(0).join(' '));
  if (!user) {
    let hatalıkullanım = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + " **|** Karaliste'ye eklemek istediğin kişinin **ID**'sini yaz**!**")
    message.channel.send({embed: hatalıkullanım})
    return;
  };
  
  let karalistede = db.fetch(`karalist_${user.id}`)
  if (karalistede === true) {
    let listededeğil = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(hyr + ` **|** **${user.tag}** adlı kullanıcı zaten karaliste'de var**!**`)
    message.channel.send({embed: listededeğil})
    return
  }
  
  db.set(`karalist_${user.id}`, true)
  
  let embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(evt + ` **|** **${user.tag}** adlı kullanıcı karaliste'ye eklendi**!**`)
    message.channel.send({embed: embed})
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kara-liste"],
  permLevel: 8,
};

exports.help = {
  name: "karaliste",
  description: "Belirtilen kullancıyı kara listeye alır!",
  usage: "karaliste <kullanıcı ID>"
};