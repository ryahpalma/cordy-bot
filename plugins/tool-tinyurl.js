import fetch from 'node-fetch';
const handler = async (m, {conn, args, text}) => {
  if (!text) throw 'Adicione a URL que deseja encurtar';
  const shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
  if (!shortUrl1) throw `Tem certeza que enviou uma URL? Envie corretamente`;
  const done = `Link Encurtado:\n${shortUrl1}`.trim();
  m.reply(done);
};
handler.help = ['tinyurl'].map((v) => v + ' <link>');
handler.tags = ['tools'];
handler.command = /^tinyurl$/i;
handler.fail = null;
export default handler;
