const Discord = require('discord.js')
const util = require('util');
const db = require('quick.db')
const tokenuyari = `SyntaxError: Unexpected token`

exports.run = async (client, message, args) => {
    if(!args[0]) {
        const embed = new Discord.MessageEmbed()
            .setDescription(`Çalıştırmak için bir kod yazmalısın!`)
            .setColor("BLACK")
            .setTimestamp()
        message.channel.send({embed})
        return
    }
    const code = args.join(' ');
    if(code.match(/(client.token)/g)) {
        const newEmbed = new Discord.MessageEmbed()
            .addField('Hata çıktı;', `\`\`\`xl\n${tokenuyari}\`\`\``)
            .setColor("BLACK");
        message.channel.send(newEmbed);
        return
    }

    function clean(text) {
        if (typeof text !== 'string')
            text = require('util').inspect(text, { depth: 0 })
        text = text
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
        return text;
    };

    const evalEmbed = new Discord.MessageEmbed().setColor("BLACK")
    try {
        var evaled = clean(await eval(code));
        if(evaled.startsWith('NTQ3M')) evaled = tokenuyari;
        if (evaled.constructor.name === 'Promise') evalEmbed.setDescription(`\`\`\`\n${evaled}\n\`\`\``)
        else evalEmbed.setDescription(`\`\`\`js\n${evaled}\n\`\`\``)
        const newEmbed = new Discord.MessageEmbed()
            .addField('📥 Giriş', `\`\`\`javascript\n${code}\n\`\`\``)
            .addField('📤 Çıkış', `\`\`\`js\n${evaled}\`\`\``)
            .setColor("BLACK")
        message.channel.send(newEmbed);
    }
    catch (err) {
        evalEmbed.addField('Hata çıktı;', `\`\`\`js\n${err}\n\`\`\``);
        evalEmbed.setColor('BLACK');
        message.channel.send(evalEmbed);
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 8
}

exports.help = {
    name: 'eval',
    description: 'Yazılan kodu çalıştırır.',
    usage: 'eval [kod]'
}