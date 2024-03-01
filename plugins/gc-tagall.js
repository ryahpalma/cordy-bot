const handler = async (m, {
  isOwner,
  isAdmin,
  conn,
  text,
  participants,
  args,
  command,
  usedPrefix,
}) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  let message = `*Atenção Mensagem Importante*`;
  conn.sendMessage(m.chat, {
    text: message,
    mentions: participants.map((a) => a.id),
  });
};
handler.help = ['tag-all <mesaje>'];
handler.tags = ['group'];
handler.command = /^tagall$/i;
handler.admin = true;
handler.group = true;
export default handler;
