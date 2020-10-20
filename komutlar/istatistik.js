const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

exports.run = function(client, message) {

const duration = moment.duration(client.uptime).format(`D [gü], H [sa], m [dk], s [sn]`);

const embed = new Discord.MessageEmbed()

    .setColor('BLACK')
    .setTitle('<:giftt:738328853537226763> | Gifts+ İstatistik')
    .addField( '<:ping:719817734648758272> **Ping**⠀⠀⠀⠀⠀⠀⠀⠀⠀', '`' + client.ws.ping + 'ms`\n⠀', true)
    .addField( '<:kullanicilar:719817815120674866> **Kullanıcılar**⠀⠀⠀⠀⠀⠀⠀⠀', '`' + client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) + '`', true)
    .addField( '<:kanallar:719817792894795856> **Kanallar**', '`' + client.channels.cache.size + '`', true)
    .addField( '<:sunucular:719817768198733924> **Sunucular**', '`' + client.guilds.cache.size + '`\n⠀', true)
    .addField( '<:takvim:719817678424113164> **Uptime Süresi**', '`' + duration + '`', true)
    .addField( `<:js:719817712939040848> **discord.js**`, '`v' + Discord.version + '`', true)
    .setFooter('Gifts+ ©️ 2020', client.user.avatarURL())
    .setTimestamp()

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['botbilgi', 'i'],
  permLevel: 0
};

exports.help = {
  name: 'istatistik',
  description: 'Botun İstatiğini Atar',
  usage: 'c!istatistik'
};
