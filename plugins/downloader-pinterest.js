import {pinterest} from '@bochilteam/scraper';

const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `*Para usar esse comando utilize ${usedPrefix + command} Linus Torvalds*`;
  const json = await pinterest(text);
  conn.sendFile(m.chat, json.getRandom(), 'image.jpg', '', m);
};
handler.help = ['pinterest <keyword>'];
handler.tags = ['internet'];
handler.command = /^(pinterest)$/i;
export default handler;
