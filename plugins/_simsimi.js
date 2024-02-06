import axios from 'axios';
import spintax from 'mel-spintax';

const handler = (m) => m;

handler.before = async (m) => {
  const chat = global.db.data.chats[m.chat];
  const user = global.db.data.users[m.sender];

  if (chat.simi) {
    const currentTimestamp = new Date().getTime();
    const randomSecWait = Math.floor(Math.random() * (12000 - 7000 + 1)) + 7000;

    if (!m.quoted || currentTimestamp - user.lastCommandTime < randomSecWait || m.text.startsWith('.')) return true;

    try {
      conn.sendPresenceUpdate('composing', m.chat);

      axios.post('https://api.simsimi.vn/v2/simtalk', {
        text: encodeURIComponent(m.text),
        lc: 'pt',
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((response) => {
        user.lastCommandTime = Date.now();
        m.reply(`${response.data.message}`);
      });
    } catch {
      m.reply(spintax.unspin('{Estou doente, não quero conversar|Não quero conversar|Eu já disse que não vou conversar|Eu estou doente... não posso conversar agora}'));
    }
  }
};
export default handler;
