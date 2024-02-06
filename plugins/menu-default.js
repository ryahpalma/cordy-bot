import fetch from 'node-fetch';

const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  try {
    const user = global.db.data.users[m.sender];
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    const str = `Olá, ${taguser}
*Premium:* ${user.premiumTime > 0 ? '✅' : (isPrems ? '✅' : '❌') || ''}
O menu tá vázio seu porra`.trim();
    if (m.isGroup) {
      conn.reply(m.chat, str.trim(), m);
    } else {
      conn.reply(m.chat, 'Função apenas para grupos', m);
    }
  } catch (e) {
    conn.reply(m.chat, 'Erro ao acessar o menu principal', m);
    console.log(e);
  }
};
handler.command = /^(menu|commands)$/i;
handler.exp = 50;
handler.fail = null;
export default handler;

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}
