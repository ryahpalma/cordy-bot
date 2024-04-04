const handler = async (m, {conn, text}) => {
  const rules = global.db.data.chats[m.chat].sRules;
  (rules !== '') ? m.reply(rules) : m.reply('Sem regras no grupo ainda');
};
handler.help = ['rules'];
handler.tags = ['gc'];
handler.group = true;
handler.command = /^rules$/i;
handler.fail = null;
export default handler;
