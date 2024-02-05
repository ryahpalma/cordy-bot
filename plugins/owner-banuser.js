const handler = async (m, {conn, participants, usedPrefix, command}) => {
  const BANtext = `Mencione ou marque o usuário que deseja banir\n\nExemplo: _${usedPrefix + command} @${global.numberexample}_`;
  if (!m.mentionedJid[0] && !m.quoted) return m.reply(BANtext, m.chat, {mentions: conn.parseMention(BANtext)});
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
  else who = m.chat;
  const users = global.db.data.users;
  users[who].banned = true;
  m.reply('*Usuário banido com sucesso, ele não poderá mais utilizar o bot*\n');
};
handler.command = /^banuser$/i;
handler.rowner = true;
export default handler;
