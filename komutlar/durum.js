const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {

    let hyr = '<:hyr:720713864395620445>'
    let evt = '<:evt:720713765192204378>'
    let emoji = '<:panel:719822727208501298>'
    let emoji1 = '<:yapimcim:719817696547700757>'
    let prefix = ayarlar.prefix
    let preffix = ayarlar.prefix
    let mesaj = args.slice(0).join(' ');
    const bakımdurum = await db.fetch(`botbakım`)
    
    
    const hatalıkullanım = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(hyr + ' **|** Hatalı kullanım, örnek**:**\n\n' + emoji + ' **Ayarlama:** `' + prefix + 'durum Merhaba!`\n' + emoji1 + ' **Sıfırlama:** `' + prefix + 'durum sıfırla`')
    const ayarlandı = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(evt + " **|** Durum mesajı `" + mesaj + "` olarak ayarlandı**!**")
    const sıfırlandı = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(evt + " **|** Durum mesajı **başarıyla** sıfırlandı**!**")
    
    
    
    if (!mesaj) return message.channel.send(hatalıkullanım);

    if (mesaj == 'sıfırla') {
          if (bakımdurum) {
            client.user.setStatus("idle");
            client.user.setActivity(preffix + "yardım | Bakım modu aktiftir!");
          } else {
            client.user.setStatus("idle");
            client.user.setActivity(preffix + "yardım | " + client.user.username + " v0.1 bot aktif!");
          } 
          message.channel.send(sıfırlandı)
          return
    }
  
    
    client.user.setActivity(mesaj);
    message.channel.send(ayarlandı)
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['oynuyor'],
  permLevel: 8
};
exports.help = {
  name: 'durum',
  description: '',
  usage: 'durum'
};
