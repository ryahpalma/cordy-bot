const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `Não foi definido nenhum prefixo de comando, utilize por exemplo: * ${usedPrefix + command} /`;
  global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
  await m.reply(`O prefixo de comandos agora é ${text}`);
};
handler.help = ['prefixset'].map((v) => v + ' [prefix]');
handler.tags = ['owner'];
handler.command = /^prefixset$/i;
handler.rowner = true;
export default handler;
