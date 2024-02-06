const handler = async (m, {conn, text, isROwner, isOwner}) => {
  if (text) {
    global.db.data.chats[m.chat].sWelcome = text;
    m.reply('Mensagem de bem-vindo alterada');
  } else throw 'Adicione a mensagem de boas vindas corretamente';
};
handler.help = ['set-welcome <text>'];
handler.tags = ['group'];
handler.command = ['set-welcome'];
handler.admin = true;
export default handler;
