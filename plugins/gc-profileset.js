const handler = async (m, {conn, usedPrefix, command}) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';
  if (/image/.test(mime)) {
    let img = await q.download();
    if (!img) throw 'Adicione uma imagem';
    await conn.updateProfilePicture(m.chat, img).then(_ => m.reply('Imagem do grupo alterada ✅'));
  } else {
    m.reply('Adicione uma imagem');
  }
};
handler.command = /^profileset?$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
