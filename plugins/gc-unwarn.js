const handler = async (m, {conn, text, command, usedPrefix}) => {
  let who;
  let message;

  if (m.isGroup) {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  } else {
    who = m.chat;
  }

  const user = global.db.data.users[who];
  const warntext = `Mencione ou marque um membro para retirar uma advertência\n\nExemplo: _${usedPrefix + command} @${global.numberexample}_`;
  if (!who) throw (warntext);
  if (m.mentionedJid.includes(conn.user.jid)) return;
  if (user.warnTimes === 0) throw ('O membro não tem nenhuma advertência');

  if (text === 'total') {
    user.warnTimes = 0;
    message = 'teve todas advertências removidas';
  } else {
    user.warnTimes -= 1;
    message = 'teve uma advertência removida';
  }

  await m.reply(`${user.warnTimes === 1 ? `*@${who.split`@`[0]}*` : `*@${who.split`@`[0]}*`} ${message}\n*Total ${user.warnTimes}/3*`, null, {mentions: [who]});
};
handler.command = /^unwarn$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
