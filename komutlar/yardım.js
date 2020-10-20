const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
const db = require('quick.db')
exports.run = async(client, message, args) => {

  let pre = ayarlar.prefix
  let hyr = '<:hyr:720713864395620445>'
  let evt = '<:evt:720713765192204378>'
  let kraken = '<:giftt:738328853537226763>'

  const embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setTitle(kraken + " | Gifts+ Yardım")
    .setDescription(`
𝐕𝐞𝐫𝐬𝐢𝐨𝐧: \`v0.1b\`**,** 𝐏𝐫𝐞𝐟𝐢𝐱: \`${pre}\`**,** 𝐃𝐢𝐥: \`Türkçe\`

**𝐊𝐎𝐌𝐔𝐓𝐋𝐀𝐑** *(<> **➙** Gerekli)* *([] **➙** Opsiyonel)*

\`${pre}istatistik\` **➙** Botun istatistiklerini gösterir.
\`${pre}jeton\` **➙** Günlük 1 veya 2 jeton alırsınız.
\`${pre}market []\` **➙** Jeton miktarınızı ve marketi gösterir.
\`${pre}oyun\` **➙** Jeton karşılığı rastgele oyun atar.
\`${pre}sponsor <>\` **➙** Bize hediye kodu gönderirsiniz.
\`${pre}stok\` **➙** Sistemdeki mevcut kod sayısını atar.
\`${pre}yardım\` **➙** Botun yardım menüsünü gösterir.
\`${pre}öde <> <>\` **➙** Bir kişiye jeton gönderirsiniz.


**𝐆𝐄𝐋𝐈𝐒𝐓𝐈𝐑𝐈𝐂𝐈 𝐊𝐎𝐌𝐔𝐓𝐋𝐀𝐑𝐈** *(<> **➙** Gerekli)* *([] **➙** Opsiyonel)*

\`${pre}bakım <> <>\` **➙** Botun bakım modunu düzenler.
\`${pre}beyazliste <>\` **➙** Birini karaliste'den çıkarır.
\`${pre}karaliste <>\` **➙** Birini karaliste'ye ekler.
\`${pre}durum <>\` **➙** Botun oynuyor kısmını ayarlar.
\`${pre}eval <>\` **➙** Yazılan bir kodu çalıştırır.
\`${pre}ekle <>\` **➙** Sisteme hediye kodu ekler.
`)
    .setFooter('・ Gifts+', client.user.avatarURL())
    .setTimestamp()

  message.channel.send(embed)

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["y"],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'yardım',
  usage: 'yardım'
};
