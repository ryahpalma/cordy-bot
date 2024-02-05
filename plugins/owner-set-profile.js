const handler = async (m, {conn, usedPrefix, command}) => {
  let bot = conn.user.jid;
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (/image/.test(mime)) {
    let img = await q.download();
    if (!img) throw `Você não enviou a imagem, envie o comando ${usedPrefix + command} junto a imagem`;
    await conn.updateProfilePicture(bot, img);
    conn.reply(m.chat, 'Imagem alterada com sucesso', m);
  } else {
    throw `Você não enviou a imagem, envie o comando ${usedPrefix + command} junto a imagem`;
  }
};

handler.command = /^set-profile-bot$/i;
handler.group = false;
handler.rowner = true;
export default handler;
