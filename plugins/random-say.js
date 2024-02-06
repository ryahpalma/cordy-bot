function handler(m, {command, conn, text, usedPrefix}) {
  if (!text) throw `Para utilizar esse comando envie:\n_${usedPrefix + command} mensagem_`;

  conn.sendPresenceUpdate('composing', m.chat);

  setTimeout(async () => {
    await conn.sendMessage(m.chat, {text: text});
  }, 5000);
}

handler.help = handler.command = /^say$/i;
handler.tags = ['say'];
handler.group = false;
handler.limit = 2;
export default handler;
