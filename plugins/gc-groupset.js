const handler = async (m, {conn, args, usedPrefix, command}) => {
  const isClose = {
    'open': 'not_announcement',
    'close': 'announcement',
  }[(args[0] || '')];
  if (isClose === undefined) {
    throw `Para abrir ou fechar o grupo use os comandos\n\n${usedPrefix + command} open\n${usedPrefix + command} close`.trim();
  }
  await conn.groupSettingUpdate(m.chat, isClose);
  {
    if (args[0] === 'open') {
      m.reply('O grupo está aberto');
    } else {
      m.reply('O grupo está fechado');
    }
  }
};
handler.help = ['groupset open / close'];
handler.tags = ['group'];
handler.command = /^groupset$/i;
handler.admin = true;
handler.botAdmin = true;
export default handler;
