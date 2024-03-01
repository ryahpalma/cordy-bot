const handler = async (m) => {
  try {
    const participant = '@' + m.sender.split('@s.whatsapp.net')[0];
    const message = `Olá, ${participant}
O menu está em manutenção...`.trim();
    if (m.isGroup) {
      m.reply(message, null, {
        mentions: [m.sender],
      });
    } else {
      m.reply('Função apenas para grupos');
    }
  } catch (e) {
    m.reply('Erro ao acessar o menu principal');
    console.log(e);
  }
};
handler.command = /^(menu|commands)$/i;
handler.exp = 50;
handler.fail = null;
export default handler;
