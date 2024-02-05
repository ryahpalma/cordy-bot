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
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const message = args.join` `;
  const oi = `${message}\n\n`;
  let teks = `${oi} Membros:\n`;
  for (const mem of participants) {
    teks += `@${mem.id.split('@')[0]}\n`;
  }
  conn.sendMessage(m.chat, {
    text: teks,
    mentions: participants.map((a) => a.id),
  });
};
handler.help = ['tag-all <mesaje>'];
handler.tags = ['group'];
handler.command = /^tag-all$/i;
handler.admin = true;
handler.group = true;
export default handler;
