const handler = async (m, {conn, text, command, usedPrefix}) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  else who = m.chat;
  const user = global.db.data.users[who];
  const warntext = `Mencione ou marque um membro para retirar uma advertência*\n\nExemplo: _${usedPrefix + command} @${global.numberexample}_`;
  if (!who) throw m.reply(warntext, m.chat, {mentions: m});
  if (m.mentionedJid.includes(conn.user.jid)) return;
  if (user.warnTimes == 0) throw 'O membro não tem nenhuma advertência';
  user.warn -= 1;
  await m.reply(`${user.warn == 1 ? `*@${who.split`@`[0]}*` : `*@${who.split`@`[0]}*`} teve uma advertência removida\n*Total ${user.warn}/3*`, null, {mentions: [who]});
};
handler.command = /^unwarn$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
