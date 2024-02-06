const handler = async (m, {conn, text, groupMetadata}) => {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  if (!m.isGroup) return !1;
  if (!text) throw 'Envie o texto para anunciar para todos os grupos';
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  const name = await conn.getName(m.sender);
  const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map((v) => v[0]);
  for (const id of groups) {
    await conn.sendMessage(id, {text: `${text}\n\nEntre em contato com ${name} - wa.me/${who.split`@`[0]}`});
    global.db.data.users[m.sender].msgwait = new Date * 1;
  }
};
handler.command = /^announce$/i;
handler.rowner = true;
export default handler;
