const handler = async (m, {conn}) => {
  conn.reply(m.chat, `Lista de comandos ${Object.entries(global.db.data.sticker).map(([key, value], index) => `*${index + 1}.-*\nComando: ${value.locked ? `*(Bloqueado)* ${key}` : key}\nComando/Texto: ${value.text}`).join('\n\n')}
`.trim(), null, {mentions: Object.values(global.db.data.sticker).map((x) => x.mentionedJid).reduce((a, b) => [...a, ...b], [])});
};
handler.command = ['cmdlist'];
handler.rowner = true;
export default handler;
