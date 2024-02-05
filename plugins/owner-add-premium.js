const handler = async (m, {conn, text, usedPrefix, command}) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  else who = m.chat;
  const textpremERROR = `Envie a tag @ ou marque o membro para torna-lo um membro Premium`;
  if (!who) return m.reply(textpremERROR, null, {mentions: conn.parseMention(textpremERROR)});

  const user = global.db.data.users[who];
  const txt = text.replace('@' + who.split`@`[0], '').trim();
  // let name = await conn.getName(who)
  const name = await '@' + who.split`@`[0];

  const ERROR = `O membro ${'@' + who.split`@`[0]} não está na base de dados`;
  if (!user) return m.reply(ERROR, null, {mentions: conn.parseMention(ERROR)});

  const hour = 60 * 60 * 1000 * txt;
  const day = 24 * hour * txt;
  const month = 30 * day * txt;
  const now = Date.now();

  if (command == 'add-premium') {
    if (now < user.premiumTime) user.premiumTime += month;
    else user.premiumTime = now + month;
    user.premium = true;
    formatTime(user.premiumTime - now).then((timeleft) => {
      const response = `*🎟️ Novo Membro Premium*\n\n*✨ Usuário ${name}*\n*🕐 Tempo: ${txt} Mês(es)*\n*📉 ${timeleft}*`;
      m.reply(response, null, {mentions: conn.parseMention(response)});
    });
  }
};
handler.help = ['addprem [@user] <days>'];
handler.tags = ['owner'];
handler.command = ['add-premium'];
handler.owner = true;
export default handler;

async function formatTime(ms) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  seconds %= 60;
  minutes %= 60;
  hours %= 24;
  let timeString = '';
  if (days) {
    timeString += `${days} dia${days > 1 ? 's' : ''} `;
  }
  if (hours) {
    timeString += `${hours} hora${hours > 1 ? 's' : ''} `;
  }
  if (minutes) {
    timeString += `${minutes} minuto${minutes > 1 ? 's' : ''} `;
  }
  if (seconds) {
    timeString += `${seconds} segundo${seconds > 1 ? 's' : ''} `;
  }
  return timeString.trim();
}
