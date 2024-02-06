const toxicRegex = /viadinho|viado|puta|surdo|vagabunda|vadia|buceta|pauzao|gozar|bucetinha|cuzinho|vai se fuder/i;

export async function before(m, {isAdmin, isBotAdmin, isOwner}) {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  if (!m.isGroup) {
    return !1;
  }
  const user = global.db.data.users[m.sender];
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[mconn.conn.user.jid] || {};
  const isToxic = toxicRegex.exec(m.text);

  if (isToxic && chat.antiToxic) {
    user.warnTimes += 1;
    if (!(user.warnTimes >= 5)) await m.reply('Segurança\n\n' + `${user.warnTimes == 1 ? `@${m.sender.split`@`[0]}` : `@${m.sender.split`@`[0]}`}, enviar a palavra "${isToxic}" é proibida neste grupo.\n\n*Advertência:* ${user.warn}/5`, false, {mentions: [m.sender]});
  }

  if (user.warnTimes >= 5) {
    user.warnTimes = 0;
    await m.reply(`Segurança\n\nO participante @${m.sender.split('@')[0]}, passou das 5 advertências, e agora será removido do grupo`, false, {mentions: [m.sender]});
    user.banned = true;
    await mconn.conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
  }
  return !1;
}
