const handler = async (m, {conn, text, command, usedPrefix}) => {
  if (m.mentionedJid.includes(conn.user.jid)) return;
  let who;
  if (m.isGroup) {
    who = m.mentionedJid[0] ?
      m.mentionedJid[0] :
      m.quoted ?
        m.quoted.sender :
        text;
  } else {
    who = m.chat;
  }
  const user = global.db.data.users[who];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const dReason = 'Nenhum';
  const msgtext = text || dReason;
  const sdms = msgtext.replace(/@\d+-?\d* /g, '');
  if (!who) {
    const warntext = `Marque o membro ou selecione uma mensagem para advertir\n\n*Exemplo:*\n_${usedPrefix + command} @${global.numberexample}_`;
    return m.reply(warntext, m.chat, {mentions: m});
  }
  user.warn += 1;
  await m.reply(`${user.warn == 1 ? `*@${who.split`@`[0]}*` : `*@${who.split`@`[0]}*`} recebeu uma advertência!\nMotivo: ${sdms}\n*Advertências: ${user.warn}/3*`, null, {mentions: [who]});
  if (user.warn >= 3) {
    if (!bot.restrict) {
      return m.reply('É necessário habilitar as restrições para utilizar este comando');
    }
    user.warn = 0;
    await m.reply(`Você foi avisado(a) várias vezes vezes... \n*@${who.split`@`[0]}* Você passou o limite de advertências, irei te remover.`, null, {mentions: [who]});
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
  }
  return !1;
};

handler.command = /^warn$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
