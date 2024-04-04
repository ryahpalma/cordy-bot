const handler = async (m, {conn, text, isROwner, isOwner}) => {
  if (text) {
    global.db.data.chats[m.chat].sProhibited = text;
    m.reply('Mensagem proibidas foram alteradas');
  } else {
    m.reply('Adicione as mensagens proibidas corretamente');
  }
};
handler.help = ['prohibitedset <text>'];
handler.tags = ['group'];
handler.group = true;
handler.command = ['prohibitedset'];
handler.admin = true;
export default handler;
