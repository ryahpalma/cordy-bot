const handler = async (m, {usedPrefix}) => {
  try {
    delete global.chatgpt.data.users[m.sender];
    m.reply(`Todas as conversas com o ChatGPT foram limpas`);
  } catch (error1) {
    console.log(error1);
    throw `Erro ao tentar limpar as conversas com o ChatGPT`;
  }
};
handler.command = ['chatgptclear'];
handler.group = true;
export default handler;
