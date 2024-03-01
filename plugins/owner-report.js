const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `Adicione uma mensagem ao comando: _${usedPrefix + command} quero uma função nova_`;
  if (text.length < 10) throw `Adicione pelo menos 10 caracteres`;
  if (text.length > 1000) throw `Não pode passar de 1000 caracteres`;
  const message = `[Chamado/Reclamação Solicitado]\n\nNúmero: wa.me/${m.sender.split`@`[0]}\n\nMensagem: ${text}`;
  conn.reply('5512988878268@s.whatsapp.net', m.quoted ? message + m.quoted.text : message, null, {contextInfo: {mentionedJid: [m.sender]}});
  m.reply(`Seu chamado/reclamação foi enviada com sucesso! em breve terá respostas.`);
};
handler.help = ['report'].map((v) => v + ' <message>');
handler.tags = ['owner'];
handler.command = /^report$/i;
export default handler;
