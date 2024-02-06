import fetch from 'node-fetch';
const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
if (!db.data.chats[m.chat].porn && m.isGroup) throw `Os comandos +18 estão desativados neste grupo, envie _${usedPrefix}enable porn_ para ativar`;
  try {
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    const str = `Olá, ${taguser}\n\n
*Menu +18*`.trim();
    if (m.isGroup) {
      conn.reply(m.chat, str.trim(), m);
    } else {
      conn.reply(m.chat, 'Função apenas para grupos', m);
    }
  } catch (e) {
    conn.reply(m.chat, 'Erro ao acessar o menu de porno', m);
    console.log(e);
  }
};
handler.command = /^porn$/i;
handler.exp = 50;
handler.fail = null;
export default handler;

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}
