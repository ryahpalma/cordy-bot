const handler = async (m, {conn, args, text}) => {
  if (!text) throw `Adicione o nome que deseja ao grupo`;
  try {
    const text = args.join` `;
    if (!args || !args[0]) {
    } else {
      conn.groupUpdateSubject(m.chat, text);
    }
  } catch (e) {
    throw 'Erro, o título precisa ter 25 caracteres';
  }
};
handler.help = ['nameset <text>'];
handler.tags = ['group'];
handler.command = /^nameset$/i;
handler.group = true;
handler.admin = true;
export default handler;
