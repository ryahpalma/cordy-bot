import fetch from 'node-fetch';
const handler = async (m, {conn, args, usedPrefix, command}) => {
  if (args.length == 0) return conn.reply(m.chat, `Envie _${usedPrefix + command}_ ou _${usedPrefix + command} bts_`, m);
  if (args[0] == 'blackpink' || args[0] == 'exo' || args[0] == 'bts') {
    fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/' + args[0] + '.txt')
        .then((res) => res.text())
        .then((body) => {
          const randomkpop = body.split('\n');
          const randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)];
          conn.sendFile(m.chat, randomkpopx, '', '', m);
        })
        .catch(() => {
          conn.reply(m.chat, 'Ocorreu um erro', m);
        });
  } else {
    conn.reply(m.chat, `A busca não está disponível. Envie ${usedPrefix + command} para ver a lista disponível`, m);
  }
};
handler.help = ['kpop'].map((v) => v + ' <query>');
handler.tags = ['image'];
handler.command = /^(kpop)$/i;
export default handler;
