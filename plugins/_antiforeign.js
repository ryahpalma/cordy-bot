const handler = (m) => m;
handler.before = async function(m, {
  conn,
  isAdmin,
  isBotAdmin,
  isOwner,
  isROwner,
}) {
  if (!m.isGroup) return !1;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[conn.user.jid] || {};
  if (isBotAdmin && chat.antiForeign && !isAdmin && !isOwner && !isROwner && bot.restrict) {
    const forbiddenPrefixes = ['212', '265', '92'];
    for (const prefix of forbiddenPrefixes) {
      if (m.sender.startsWith(prefix)) {
        m.reply('Não é permitido números estrangeiros neste grupo');

        const response = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        if (response[0].status === '404') return;
      }
    }
  }
};
export default handler;
