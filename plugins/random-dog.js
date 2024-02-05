import fetch from 'node-fetch';
import spintax from 'mel-spintax';

const handler = async (m, {conn, text}) => {
  try {
    const res = await fetch('https://api.thedogapi.com/v1/images/search');
    const img = await res.json();
    const caption = spintax.unspin('{Cachorro fofinho né?|Au|Auau|Aauuuuu}').trim();
    conn.sendFile(m.chat, img[0].url, 'dog.jpg', caption, m);
  } catch (e) {
    throw 'Erro ao procurar os peludinhos';
  }
};
handler.help = ['dog'];
handler.tags = ['random'];
handler.command = /^dog$/i;
handler.fail = null;
export default handler;
