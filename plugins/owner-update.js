import {execSync} from 'child_process';

const handler = async (m, {conn, text}) => {
  try {
    const stdout = execSync('git fetch && git merge origin/master');
    conn.reply(m.chat, 'Atualização em andamento, aguarde alguns minutos', m);

    process.send('reset');
  } catch (e) {
    conn.reply(m.chat, `Erro ao tentar atualizar o código ${e}`, m);
  }
};
handler.command = /^update$/i;
handler.rowner = true;
export default handler;
