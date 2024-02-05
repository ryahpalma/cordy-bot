const handler = async (m, {conn}) => {
  const revoke = await conn.groupRevokeInvite(m.chat);
  await conn.reply(m.chat, `O link do grupo foi alterado.\nLink novo: ${'https://chat.whatsapp.com/' + revoke}`, m);
};
handler.command = /^reset-link?$/i;
handler.botAdmin = true;
handler.admin = true;
handler.group = true;
export default handler;
