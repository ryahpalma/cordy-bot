import {googleImage} from '@bochilteam/scraper';

const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `Para usar o comando envie por exemplo _${usedPrefix + command} Minecraft_`;
  const res = await googleImage(text);
  const image = await res.getRandom();
  const link = image;

  if (!link) {
    conn.reply(m.chat, 'Essa imagem não existe', m);
  } else {
    conn.sendFile(m.chat, link, 'image.jpg', '', m);
  }
};
handler.help = ['image <query>'];
handler.tags = ['internet', 'tools'];
handler.command = /^(google|image|img)$/i;
export default handler;
