const handler = async (m, {conn, args}) => {
  m.reply('As regras precisam ser registradas no database.json');
};
handler.help = ['rules'];
handler.tags = ['group'];
handler.command = /^rules$/i;
handler.botAdmin = true;
export default handler;
