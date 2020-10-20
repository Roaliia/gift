const Discord = require("discord.js");
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");

let talkedRecently = new Set();

module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
	setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  

  let client = message.client;
  let prefix = ayarlar.prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  } else {
    
    if (message.content === prefix) return;
    
    const komutyok = new Discord.MessageEmbed()
      .setColor('BLACK')
      .setDescription('<:js:719817712939040848> **|** Komutlarım arasında `' + prefix + command + '` adında bir **komut** bulamadım**!**')
    message.channel.send(komutyok)
    
  }
  
  let bakımdurumu = db.fetch(`botbakım`)
  let bakımdayız = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setTitle("<:hyr:720713864395620445> | Bot şuanda bakımda!")
    .setDescription('⠀\n**▸** Sebep**:** ' + bakımdurumu + '\n⠀\n<:js:719817712939040848> **|** **Sizler için çalışıyoruz...**')
  if (cmd) {
    
    if (message.channel.type === "dm") {
      if (cmd.conf.guildOnly === true) {
        const hata = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription("<:hyr:720713864395620445> **|** Bu komut sadece sunucularda kullanılabilir**!**")
        return message.channel.send(hata)
      }
    }
      
    //     BAKIM MODU      //
    if (bakımdurumu) {
      
      
     if (message.author.id === ayarlar.sahip) {
       if (perms < cmd.conf.permLevel) return;
       cmd.run(client, message, params, perms);
       return
    }
      
    if (message.author.id === ayarlar.sahip2) {
       if (perms < cmd.conf.permLevel) return;
       cmd.run(client, message, params, perms);
       return
    }
      
    if (message.author.id === ayarlar.sahip3) {
       if (perms < cmd.conf.permLevel) return;
       cmd.run(client, message, params, perms);
       return
    }
      
    if (message.author.id === ayarlar.sahip4) {
       if (perms < cmd.conf.permLevel) return;
       cmd.run(client, message, params, perms);
       return
    }
      
    message.channel.send(bakımdayız)
    //     BAKIM MODU      //
      
    
    //     KARA LİSTE     //
    } else if (db.has(`karalist_${message.author.id}`) === true) {
      if (message.author.id === ayarlar.sahip) {
        if (perms < cmd.conf.permLevel) return;
        cmd.run(client, message, params, perms);
        return
      }
      if (message.author.id === ayarlar.sahip2) {
        if (perms < cmd.conf.permLevel) return;
        cmd.run(client, message, params, perms);
        return
      }
      if (message.author.id === ayarlar.sahip3) {
        if (perms < cmd.conf.permLevel) return;
        cmd.run(client, message, params, perms);
        return
      }
      if (message.author.id === ayarlar.sahip4) {
        if (perms < cmd.conf.permLevel) return;
        cmd.run(client, message, params, perms);
        return
      }
    let karalistemesaj = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(`<:hyr:720713864395620445> **|** Karaliste'de olduğun için **komut** kullanamazsın**!**`)
      
    message.channel.send(karalistemesaj)
    //     KARA LİSTE     //
      
      
    } else {
      
    if (perms < cmd.conf.permLevel) {
      
      if (cmd.conf.permLevel === 1) {
        let yetkinyok = new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription('<:hyr:720713864395620445> **|** Bu komutu kullanmak için `Mesajları Yönet` yetkisine sahip olmalısın**!**')        
        message.channel.send(yetkinyok)
      }
      
      if (cmd.conf.permLevel === 2) {
        let yetkinyok = new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription('<:hyr:720713864395620445> **|** Bu komutu kullanmak için `Rolleri Yönet` yetkisine sahip olmalısın**!**')        
        message.channel.send(yetkinyok)
      }
      
      if (cmd.conf.permLevel === 3) {
        let yetkinyok = new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription('<:hyr:720713864395620445> **|** Bu komutu kullanmak için `Kanalları Yönet` yetkisine sahip olmalısın**!**')
        message.channel.send(yetkinyok)
      }
      
      if (cmd.conf.permLevel === 4) {
        let yetkinyok = new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription('<:hyr:720713864395620445> **|** Bu komutu kullanmak için `Üyeleri At` yetkisine sahip olmalısın**!**')  
        message.channel.send(yetkinyok)
      }
      
      if (cmd.conf.permLevel === 5) {
        let yetkinyok = new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription('<:hyr:720713864395620445> **|** Bu komutu kullanmak için `Üyeleri Engelle` yetkisine sahip olmalısın**!**')
        message.channel.send(yetkinyok)
      }
      
      if (cmd.conf.permLevel === 6) {
        let yetkinyok = new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription('<:hyr:720713864395620445> **|** Bu komutu kullanmak için `Yönetici` yetkisine sahip olmalısın**!**')
        message.channel.send(yetkinyok)
      }
      
      if (cmd.conf.permLevel === 7) {
        let yetkinyok = new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription('<:hyr:720713864395620445> **|** Bu komutu kullanmak için `Sunucu Sahibi` olmalısın**!**')
        message.channel.send(yetkinyok)
      }
      
      if (cmd.conf.permLevel === 8) {
        let yetkinyok = new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription('<:hyr:720713864395620445> **|** Bu komutu kullanmak için `Geliştirici` olmalısın**!**')
        message.channel.send(yetkinyok)
      }
      
    } else {
      
    cmd.run(client, message, params, perms);
      
    }
    }
  }
  

};
