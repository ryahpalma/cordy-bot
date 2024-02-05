const handler = async (m, {conn, text, command}) => {
  const id = text ? text : m.chat;
  await conn.reply(id, 'Estou saindo do grupo, até logo! (≧ω≦)ゞ');
  await conn.groupLeave(id);
};
handler.command = /^leave$/i;
handler.group = true;
handler.rowner = true;
export default handler;
