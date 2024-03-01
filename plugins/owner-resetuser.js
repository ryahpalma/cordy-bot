const handler = async (m, {conn, text}) => {
  const numberPattern = /\d+/g;
  let user = '';
  const numberMatches = text.match(numberPattern);
  if (numberMatches) {
    const number = numberMatches.join('');
    user = number + '@s.whatsapp.net';
  } else if (m.quoted && m.quoted.sender) {
    const quotedNumberMatches = m.quoted.sender.match(numberPattern);
    if (quotedNumberMatches) {
      const number = quotedNumberMatches.join('');
      user = number + '@s.whatsapp.net';
    } else {
      return conn.sendMessage(m.chat, {text: `Marque um membro ou coloque o número dele para realizar deletar seus dados`}, {quoted: m});
    }
  } else {
    return conn.sendMessage(m.chat, {text: `Marque um membro ou coloque o número dele para realizar deletar seus dados`}, {quoted: m});
  }
  const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {};
  const participants = m.isGroup ? groupMetadata.participants : [];
  const users = m.isGroup ? participants.find(u => u.jid == user) : {};
  const userNumber = user.split('@')[0];
  if (!global.global.db.data.users[user] || global.global.db.data.users[user] == '') {
    return conn.sendMessage(m.chat, {
      text: `O usuário @${userNumber} não está na minha base de dados`,
      mentions: [user],
    }, {quoted: m});
  }
  delete global.global.db.data.users[user];
  conn.sendMessage(m.chat, {
    text: `Todos os dados do usuário @${userNumber} foram removidos da minha base de dados`,
    mentions: [user],
  }, {quoted: m});
};
handler.tags = ['owner'];
handler.command = /resetuser$/i;
handler.rowner = true;
export default handler;
