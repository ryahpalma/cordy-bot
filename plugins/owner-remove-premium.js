const handler = async (m, {conn, text, usedPrefix, command}) => {
  let who;
  if (m.isGroup) {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  } else {
    who = m.chat;
  }
  const user = global.db.data.users[who];
  if (!who) throw `Mencione o membro ou responda a uma mensagem com esse comando para remover da lista premium`;
  if (!user) throw `O membro não foi encontrado na base de dados`;
  if (user.premiumTime = 0) throw 'O membro selecionado não é mais premium';

  user.premiumTime = 0;
  user.isPremium = false;

  m.reply(`@${who.split`@`[0]} foi removido da lista de membros premium`, null, {mentions: conn.parseMention(text)});
};
handler.help = ['remove-premium <@user>'];
handler.tags = ['owner'];
handler.command = /^remove-premium$/i;
handler.group = true;
handler.rowner = true;
export default handler;
