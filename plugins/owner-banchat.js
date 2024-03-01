const handler = async (m) => {
  global.db.data.chats[m.chat].isBanned = true;
  m.reply('Este chat foi banido com sucesso!');
};
handler.help = ['banchat'];
handler.tags = ['owner'];
handler.command = /^banchat$/i;
handler.rowner = true;
export default handler;
