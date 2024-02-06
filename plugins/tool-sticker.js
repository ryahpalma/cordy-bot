import {sticker} from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import {webp2png} from '../lib/webp2mp4.js';

const handler = async (m, {conn, args, usedPrefix, command}) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  let stickerImage = false;
  const user = db.data.users[m.sender];
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/webp|image|video/g.test(mime)) {
      const img = await q.download?.();
      if (!img) throw `Selecione ou envie a imagem que deseja criar a figurinha, utilize o comando: ${usedPrefix + command}*`;
      let out;
      try {
        stickerImage = await sticker(img, false, global.packname, global.author);
      } catch (e) {
        console.error(e);
      } finally {
        if (!stickerImage) {
          if (/webp/g.test(mime)) {
            out = await webp2png(img);
          } else if (/image/g.test(mime)) {
            out = await uploadImage(img);
          } else if (/video/g.test(mime)) out = await uploadFile(img);
          if (typeof out !== 'string') out = await uploadImage(img);
          stickerImage = await sticker(false, out, global.packname, global.author);
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        stickerImage = await sticker(false, args[0], global.packname, global.author);
      } else {
        return m.reply(`O link não é válido, você deve enviar um arquivo JPG para transformar em sticker, exemplo: \n_${usedPrefix + command} https://telegra.ph/file/0dc687c61410765e98de2.jpg_`);
      }
    }
  } catch (e) {
    console.error(e);
    if (!stickerImage) stickerImage = e;
  } finally {
    if (stickerImage) {
      conn.sendFile(m.chat, stickerImage, 'sticker.webp', '', m);
    } else {
      throw 'Selecione ou envie a imagem que deseja criar a figurinha';
    }
  }
};
handler.help = ['sticker', 'gif'];
handler.tags = ['sticker'];
handler.command = /^sticker|gif$/i;

export default handler;

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'));
};
