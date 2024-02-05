import {addExif} from '../lib/sticker.js';

const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!m.quoted) throw `Mencione o sticker que deseja adicionar um nome de pacote e um nome de autor, exemplo: \n_${usedPrefix}${command} packname|author_`;
  let sticker = false;
  try {
    let [packname, ...author] = text.split('|');
    author = (author || []).join('|');
    const mime = m.quoted.mimetype || '';
    if (!/webp/.test(mime)) throw 'Mencione o sticker que deseja adicionar um nome de pacote e um nome de autor';
    const img = await m.quoted.download();
    if (!img) throw 'Mencione o sticker que deseja adicionar um nome de pacote e um nome de autor';
    sticker = await addExif(img, packname || global.packname, author || global.author);
  } catch (e) {
    console.error(e);
    if (Buffer.isBuffer(e)) sticker = e;
  } finally {
    if (sticker) {
      conn.sendFile(m.chat, sticker, 'wm.webp', '', m, false, {asSticker: true});
    } else {
      throw 'Ocorreu um erro, isso só funciona com stickers e você precisa mencionar eles';
    }
  }
};
handler.help = ['set-sticker-name <packname>|<author>'];
handler.tags = ['sticker'];
handler.command = /^set-sticker-name$/i;
export default handler;
