const handler = async (m, {conn, isAdmin}) => {
  if (m.fromMe) return;
  if (isAdmin) throw 'Você já é administrador do grupo';
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
  } catch {
    await m.reply('Erro, não foi possível te definir como administrador');
  }
};
handler.command = /^auto-admin$/i;
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;
export default handler;
