const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');

client.on('message', message => {

let prefix = ayarlar.prefix

let etiketprefix = new Discord.MessageEmbed()
  .setColor('BLACK')
  .setDescription("<:evt:720713765192204378> **|** " + client.user.username + " botunun prefixi: `" + prefix + "`")
if (message.content === `<@!` + client.user.id + `>`) {
  message.channel.send(etiketprefix)
}
})

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        console.log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
    if(message.member.hasPermission("MANAGE_ROLES")) permlvl = 2;
    if(message.member.hasPermission("MANAGE_CHANNELS")) permlvl = 3;
    if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 4;
    if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 5;
    if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 6;
    if(message.author.id === message.guild.ownerID) permlvl = 7;
    if(message.author.id === ayarlar.sahip4) permlvl = 8;
    if(message.author.id === ayarlar.sahip3) permlvl = 8;
    if(message.author.id === ayarlar.sahip2) permlvl = 8;
    if(message.author.id === ayarlar.sahip) permlvl = 8;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

  let hyr = '<:hyr:720713864395620445>'
  let evt = '<:evt:720713765192204378>'
  let emoji = '<:panel:719822727208501298>'
  let emoji1 = '<:yapimcim:719817696547700757>'

//---------------------------------KOMUTLAR---------------------------------\\

client.on("guildCreate", guild => {
  console.log("Bot sunucuya eklendi: " + guild.name + " (" + guild.id + ")")
})

client.on("guildDelete", guild => {
  console.log("Bot sunucudan çıkartıldı: " + guild.name + " (" + guild.id + ")")
})

//---------------------------------KOMUTLAR---------------------------------\\

client.on("guildCreate", guild => {
  var status = db.fetch(`promosyon_${guild.id}`)
  if (!status) {
    const defaultkanal = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    const mesaj = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(evt + " **|** Bot'u sunucunuza eklediğiniz için **2 JETON** promosyon sunucu sahibinin hesabına aktarılmıştır**!**")
    defaultkanal.send(mesaj);
    db.set(`promosyon_${guild.id}`, true)
    db.add(`jeton_${guild.ownerID}`, 2)
  }
})

client.on("guildDelete", guild => {
  db.add(`jeton_${guild.ownerID}`, -10)
})

//---------------------------------KOMUTLAR---------------------------------\\
