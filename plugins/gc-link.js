const handler = async (m, {conn, args}) => {
  const group = m.chat;
  conn.reply(m.chat, 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group), m);
};
handler.help = ['link-group'];
handler.tags = ['group'];
handler.command = /^link-group?$/i;
handler.group = true;
handler.botAdmin = true;
export default handler;
