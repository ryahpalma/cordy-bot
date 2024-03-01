const handler = async (m, {conn, isROwner, text}) => {
  if (!process.send) throw 'Erro';
  await m.reply('Reiniciando o bot, isso pode levar alguns minutos.');
  process.send('reset');
};
handler.help = ['restart'];
handler.tags = ['owner'];
handler.command = ['restart'];
handler.rowner = true;
export default handler;
