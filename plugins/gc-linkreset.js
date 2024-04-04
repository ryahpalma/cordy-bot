const handler = async (m, {conn}) => {
  const revoke = await conn.groupRevokeInvite(m.chat);
  await conn.reply(m.chat, `O link do grupo foi alterado.\n\nLink novo: ${'https://chat.whatsapp.com/' + revoke}`, m);
};
handler.command = /^linkreset?$/i;
handler.botAdmin = true;
handler.admin = true;
handler.group = true;
export default handler;
