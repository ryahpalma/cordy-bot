const handler = async (m, {conn, participants, usedPrefix, command}) => {
  if (!global.db.data.settings[conn.user.jid].restrict) throw `Para habilitar este comando envie ${usedPrefix}enable restrict`;
  const kicktext = `Marque o membro que deseja remover \n\nExemplo: \n_${usedPrefix + command} @${global.numberexample}_`;
  if (!m.mentionedJid[0] && !m.quoted) return m.reply(kicktext, m.chat, {mentions: m});
  if (m.mentionedJid.includes(conn.user.jid)) return;
  const user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
  const owr = m.chat.split`-`[0];
  await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
};
handler.command = /^remove$/i;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;
export default handler;
