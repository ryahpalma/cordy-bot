const handler = async (m, {conn, args, usedPrefix, command}) => {
  m.reply('Erro ao tentar adicionar o link do formulário do Google Forms');
};
handler.help = ['formset <text>'];
handler.tags = ['group'];
handler.command = /^formset$/i;
handler.admin = true;
handler.botAdmin = true;
export default handler;
