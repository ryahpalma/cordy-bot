const handler = async (m, {conn, text, isROwner, isOwner}) => {
  if (text) {
    global.db.data.chats[m.chat].sRules = text;
    m.reply('Mensagem de regras alterada');
  } else {
    throw 'Adicione a mensagem de regras corretamente';
  }
};
handler.help = ['ruleset <text>'];
handler.tags = ['group'];
handler.group = true;
handler.command = ['rulesset'];
handler.admin = true;
export default handler;
