import {existsSync, promises as fs} from 'fs';
import path from 'path';

const handler = async (m, {conn, usedPrefix}) => {
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(m.chat, {text: 'Utilize o comando diretamente pelo meu número'}, {quoted: m});
  }
  await conn.sendMessage(m.chat, {text: '*Iniciando processo para limpar a sessão'}, {quoted: m});
  const sessionPath = './session/';
  try {
    if (!existsSync(sessionPath)) {
      return await conn.sendMessage(m.chat, {text: 'Não foi encontrada nenhuma sessão registrada'}, {quoted: m});
    }
    const files = await fs.readdir(sessionPath);
    let filesDeleted = 0;
    for (const file of files) {
      if (file !== 'creds.json') {
        await fs.unlink(path.join(sessionPath, file));
        filesDeleted++;
      }
    }
    if (filesDeleted === 0) {
      await conn.sendMessage(m.chat, {text: 'Não há arquivos de sessão'}, {quoted: m});
    } else {
      await conn.sendMessage(m.chat, {text: `Eliminados ${filesDeleted} arquivos de sessão, exceto o creds.json`}, {quoted: m});
    }
  } catch (err) {
    console.error('Erro:', err);
    await conn.sendMessage(m.chat, {text: 'Ocorreu um erro inexperado'}, {quoted: m});
  }
  await conn.sendMessage(m.chat, {text: `Agora está funcionando?`}, {quoted: m});
};
handler.help = ['clear-session'];
handler.tags = ['owner'];
handler.command = /^clear-session$/i;
handler.rowner = true;
export default handler;
