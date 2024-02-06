import spintax from 'mel-spintax';

const handler = async (m, {conn, text}) => {
  try {
    const caption = spintax.unspin('{Ryan Palma|Ryan Gatinho}').trim();
    conn.sendFile(m.chat, 'https://avatars.githubusercontent.com/u/17382946?v=4', 'cat.jpg', caption, m);
  } catch (e) {
    console.log(e);
    throw 'Erro!';
  }
};
handler.help = ['owner'];
handler.tags = ['info'];
handler.command = /^owner$/i;
handler.fail = null;
export default handler;
