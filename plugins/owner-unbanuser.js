const handler = async (m, {conn, text}) => {
  if (!text) throw 'Adicione o @ do membro que deseja';
  let who;
  if (m.isGroup) {
    who = m.mentionedJid[0];
  } else {
    who = m.chat;
  }
  if (!who) throw 'Adicione o @ do membro que deseja';
  const users = global.db.data.users;
  users[who].banned = false;
  conn.reply(m.chat, `O usuário agora pode interagir comigo`, m);
};
handler.help = ['unbanuser'];
handler.tags = ['owner'];
handler.command = /^unbanuser$/i;
handler.rowner = true;
export default handler;
