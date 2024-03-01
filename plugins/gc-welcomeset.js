const handler = async (m, {conn, text, isROwner, isOwner}) => {
  if (text) {
    global.db.data.chats[m.chat].sWelcome = text;
    m.reply('Mensagem de boas vindas alterada');
  } else {
    throw 'Adicione a mensagem de boas vindas corretamente';
  }
};
handler.help = ['welcomeset <text>'];
handler.tags = ['group'];
handler.command = ['welcomeset'];
handler.admin = true;
export default handler;
