import fetch from 'node-fetch';
import spintax from 'mel-spintax';

const handler = async (m, {conn, text}) => {
  try {
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    const img = await res.json();
    const caption = spintax.unspin('{Gatinho fofinho né?|Miau|Miaaauu|Minhaauu}').trim();
    conn.sendFile(m.chat, img[0].url, 'cat.jpg', caption, m);
  } catch (e) {
    throw 'Erro ao procurar os peludinhos';
  }
};
handler.help = ['cat'];
handler.tags = ['random'];
handler.command = /^cat$/i;
handler.fail = null;
export default handler;
