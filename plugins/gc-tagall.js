const handler = async (m, {
  isOwner,
  isAdmin,
  conn,
  participants,
}) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  conn.sendMessage(m.chat, {
    text: '*Atenção Mensagem Importante*',
    mentions: participants.map((participant) => participant.id),
  });
};
handler.help = ['tagall'];
handler.tags = ['group'];
handler.command = /^tagall$/i;
handler.admin = true;
handler.group = true;
export default handler;
