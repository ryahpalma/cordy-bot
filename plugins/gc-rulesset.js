const handler = async (m, {conn, args, usedPrefix, command}) => {
  m.reply('As regras precisam ser registradas no database.json');
};
handler.help = ['ruleset'];
handler.tags = ['group'];
handler.command = /^rulesset$/i;
handler.admin = true;
handler.botAdmin = true;
export default handler;
