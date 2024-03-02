import {execSync} from 'child_process';

const handler = async (m, {conn, text}) => {
  try {
    await execSync('git fetch && git merge origin/master');
    conn.reply(m.chat, 'Atualização feita com sucesso', m);
  } catch (e) {
    conn.reply(m.chat, `Erro ao tentar atualizar o código ${e}`, m);
  }
};
handler.command = /^update$/i;
handler.rowner = true;
export default handler;
