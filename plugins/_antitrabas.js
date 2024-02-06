export async function before(m, {conn, isAdmin, isBotAdmin, usedPrefix}) {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  if (!m.isGroup) return !1;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  const participantKey = m.key.participant;
  const messageKey = m.key.id;
  if (chat.antiTraba && m.text.length > 5000) {
    if (isAdmin) {
      return conn.sendMessage(m.chat, {
        text: `Segurança\n\nO administrador @${m.sender.split('@')[0]} enviou uma mensagem muito grande`,
        mentions: [m.sender],
      });
    }

    const optionsDanger = isBotAdmin ? '' : 'Não sou administrador, não posso fazer nada';
    conn.sendMessage(m.chat, `Ameaça detectada\n`, optionsDanger, m);

    if (isBotAdmin && bot.restrict) {
      conn.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: false,
          id: messageKey,
          participant: participantKey,
        },
      });
      setTimeout(() => {
        conn.sendMessage(m.chat, {
          text: `Mensagem de segurança\n${'\n'.repeat(400)}`,
          mentions: [m.sender],
        }, {quoted: fakemek});
      }, 0);
      setTimeout(() => {
        conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      }, 1000);
    } else if (!bot.restrict) return m.reply('É necessário habilitar o comando de restrição para deletar mensagens');
  }
  return !0;
}
