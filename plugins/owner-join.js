const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
let enviando;
const handler = async (m, {conn, text, isMods, isOwner, isPrems}) => {
  if (enviando) return;
  enviando = true;
  try {
    const link = text;
    if (!link || !link.match(linkRegex)) throw `Envie o comando e o link do grupo ${usedPrefix}join link do grupo_`;
    const [_, code] = link.match(linkRegex) || [];
    if (isPrems || isMods || isOwner || m.fromMe) {
      const res = await conn.groupAcceptInvite(code);
      await conn.sendMessage(m.chat, {text: 'Entrei no grupo com sucesso'}, {quoted: m});
      enviando = false;
    } else {
      conn.sendMessage(m.chat, {text: 'Seu link está sendo analisado pelo meu proprietário, aguarde um momento'}, {quoted: m});
      const data = global.owner.filter(([id]) => id)[0];
      const dataArray = Array.isArray(data) ? data : [data];
      for (const entry of dataArray) {
        await conn.sendMessage(entry + '@s.whatsapp.net', {
          text: 'Um usuário quer me adicionar ao grupo ' + '@' + m.sender.split('@')[0] + '\ne esse é o link' + link,
          mentions: [m.sender],
        }, {quoted: m});
      }
      enviando = false;
    }
  } catch {
    enviando = false;
    throw 'Houve um erro, tente novamente mais tarde!';
  }
};
handler.help = ['join [chat.whatsapp.com]'];
handler.tags = ['owner'];
handler.command = /^join$/i;
handler.private = true;
export default handler;
