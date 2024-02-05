const handler = async (m, {
  conn,
  isAdmin,
  isOwner,
  args,
  usedPrefix,
  command,
}) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  const isClose = {
    'open': 'not_announcement',
    'close': 'announcement',
  }[(args[0] || '')];
  if (isClose === undefined) {
    throw `Para abrir ou fechar o grupo com hora determinada use os comandos\n\n${usedPrefix + command} open 1\n${usedPrefix + command} close 1`.trim();
  }
  const timeoutset = 86400000 * args[1] / 24;
  await conn.groupSettingUpdate(m.chat, isClose).then(async (_) => {
    m.reply(`O grupo ficará ${isClose == 'announcement' ? 'fechado' : 'aberto'} ${args[1] ? `por ${clockString(timeoutset)}h` : ''}`);
  });
  if (args[1]) {
    setTimeout(async () => {
      await conn.groupSettingUpdate(m.chat, `${isClose == 'announcement' ? 'not_announcement' : 'announcement'}`).then(async (_) => {
        conn.reply(m.chat, `${isClose == 'not_announcement' ? '*El grupo ha sido cerrado, ¡ahora solo los administradores pueden enviar mensajes!*' : '*El grupo se ha abierto, ¡ahora todos los miembros pueden enviar mensajes!*'}!`);
      });
    }, timeoutset);
  }
};
handler.help = ['set-group-time *<open/close>* *<número>*'];
handler.tags = ['group'];
handler.command = /^set-group-time$/i;

handler.botAdmin = true;
handler.group = true;

export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  console.log({ms, h, m});
  return [h, m].map((v) => v.toString().padStart(2, 0)).join(':');
}
