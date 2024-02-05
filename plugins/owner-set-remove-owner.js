const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  const why = `*[❗] Uso incorrecto del comando.*\n\n*—◉ Ejemplo de uso válido:*\n*◉ ${usedPrefix + command} @${m.sender.split('@')[0]}*\n*◉ ${usedPrefix + command} ${m.sender.split('@')[0]}*\n*◉ ${usedPrefix + command} <mensaje citado>*`;
  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
  if (!who) return conn.reply(m.chat, why, m, {mentions: [m.sender]});
  switch (command) {
    case 'addowner':
      const newNumber = who;
      global.owner.push([newNumber]);
      await conn.reply(m.chat, 'Número adicionado a lista de donos', m);
      break;
    case 'delowner':
      const removeNumber = who;
      const index = global.owner.findIndex(owner => owner[0] === removeNumber);
      if (index !== -1) {
        global.owner.splice(index, 1);
        await conn.reply(m.chat, 'Número removido da lista de donos', m);
      } else {
        await conn.reply(m.chat, 'O número não existe na lista de donos', m);
      }
      break;
  }
};
handler.command = /^(set-owner|remove-owner)$/i;
handler.rowner = true;
export default handler;
