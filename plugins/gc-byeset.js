const handler = async (m, {conn, text, isROwner, isOwner}) => {
  if (text) {
    global.db.data.chats[m.chat].sBye = text;
    m.reply('Mensagem de boas vindas configuradas com sucesso');
  } else {
    throw `Insira a mensagem de boas vindas junto ao comando`;
  }
};
handler.help = ['byeset <text>'];
handler.tags = ['group'];
handler.command = ['byeset'];
handler.admin = true;
export default handler;
