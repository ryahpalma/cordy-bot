import fs from 'fs';
import acrcloud from 'acrcloud';

const acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu',
});

const handler = async (m) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';
  if (/audio|video/.test(mime)) {
    if ((q.msg || q).seconds > 20) return m.reply('O arquivo é muito grande, não consigo descobrir que música é essa');
    const media = await q.download();
    const ext = mime.split('/')[1];
    fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media);
    const res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`));
    const {code, msg} = res.status;
    if (code !== 0) throw msg;
    const {title, artists, album, genres} = res.metadata.music[0];
    const txt = `
• 📌 Título ${title}
• 👨‍🎤 Artista ${artists !== undefined ? artists.map((v) => v.name).join(', ') : 'Não encontrado'}
• 💾 Album ${album.name || 'Não encontrado'}
• 🌐 Gênero: ${genres !== undefined ? genres.map((v) => v.name).join(', ') : 'Não encontrado'}
`.trim();
    fs.unlinkSync(`./tmp/${m.sender}.${ext}`);
    m.reply(txt);
  } else {
    throw 'Responda com um áudio ou vídeo';
  }
};
handler.command = /^whatmusic$/i;
export default handler;
