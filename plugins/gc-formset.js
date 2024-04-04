const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (text) {
    global.db.data.chats[m.chat].sForm = text;
    m.reply('Link do formulário do Google Forms foi alterado');
  } else {
    throw 'Adicione um link junto ao comando';
  }
};
handler.help = ['formset <text>'];
handler.tags = ['group'];
handler.command = /^formset$/i;
handler.admin = true;
handler.botAdmin = true;
export default handler;
