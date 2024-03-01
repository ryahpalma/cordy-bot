const handler = async (m, {conn, isOwner}) => {
  const adv = Object.entries(global.db.data.users).filter((user) => user[1].warnTimes);
  const caption = `Lista de Advertidos\n 
Total: ${adv.length} membros  ${adv ? '\n' + adv.map(([jid, user], i) => `
1.- ${isOwner ? '@' + jid.split`@`[0] : jid} *(${user.warnTimes}/3)*\n║\n║ - - - - - - - - -`.trim()).join('\n') : ''}`;
  await conn.sendMessage(m.chat, {text: caption}, {quoted: m}, {mentions: await conn.parseMention(caption)});
};
handler.command = /^(warnlist)$/i;
handler.group = true;
handler.admin = true;
export default handler;
