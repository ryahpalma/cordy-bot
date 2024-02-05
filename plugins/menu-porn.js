import fetch from 'node-fetch';
const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
if (!db.data.chats[m.chat].porn && m.isGroup) throw `Os comandos +18 estão desativados neste grupo, envie _${usedPrefix}enable porn_ para ativar`;
  try {
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    const str = `Olá, ${taguser}\n\n
*Menu +18*

> 🔞 _${usedPrefix}pack_
> 🔞 _${usedPrefix}pack2_
> 🔞 _${usedPrefix}pack3_
> 🔞 _${usedPrefix}videoxxx_
> 🔞 _${usedPrefix}videolesbixxx_
> 🔞 _${usedPrefix}tetas_
> 🔞 _${usedPrefix}booty_
> 🔞 _${usedPrefix}ecchi_
> 🔞 _${usedPrefix}furro_
> 🔞 _${usedPrefix}imagenlesbians_
> 🔞 _${usedPrefix}panties_
> 🔞 _${usedPrefix}pene_
> 🔞 _${usedPrefix}porno_
> 🔞 _${usedPrefix}randomxxx_
> 🔞 _${usedPrefix}pechos_
> 🔞 _${usedPrefix}yaoi_
> 🔞 _${usedPrefix}yaoi2_
> 🔞 _${usedPrefix}yuri_
> 🔞 _${usedPrefix}yuri2_
> 🔞 _${usedPrefix}trapito_
> 🔞 _${usedPrefix}hentai_
> 🔞 _${usedPrefix}nsfwloli_
> 🔞 _${usedPrefix}nsfworgy_
> 🔞 _${usedPrefix}nsfwfoot_
> 🔞 _${usedPrefix}nsfwass_
> 🔞 _${usedPrefix}nsfwbdsm_
> 🔞 _${usedPrefix}nsfwcum_
> 🔞 _${usedPrefix}nsfwero_
> 🔞 _${usedPrefix}nsfwfemdom_
> 🔞 _${usedPrefix}nsfwglass_
> 🔞 _${usedPrefix}hentaipdf *<texto>*_
> 🔞 _${usedPrefix}hentaisearch *<texto>*_`.trim();
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
