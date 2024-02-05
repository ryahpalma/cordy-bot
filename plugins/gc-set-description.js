const handler = async (m, {conn, args}) => {
  await conn.groupUpdateDescription(m.chat, `${args.join(' ')}`);
  m.reply('Descrição do grupo alterada ✅');
};
handler.help = ['descricao <text>'];
handler.tags = ['group'];
handler.command = /^set-description$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = false;
export default handler;
