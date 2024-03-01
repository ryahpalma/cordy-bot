import {promises as fs} from 'fs';
import path from 'path';

const handler = async (m, {conn, usedPrefix}) => {
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(m.chat, {text: 'Este comando só pode ser executado diretamente no meu chat'}, {quoted: m});
  }
  const chatId = m.isGroup ? [m.chat, m.sender] : [m.sender];
  const sessionPath = './session/';
  try {
    const files = await fs.readdir(sessionPath);
    let filesDeleted = 0;
    for (const file of files) {
      for (const id of chatId) {
        if (file.includes(id.split('@')[0])) {
          await fs.unlink(path.join(sessionPath, file));
          filesDeleted++;
          break;
        }
      }
    }
    if (filesDeleted === 0) {
      await conn.sendMessage(m.chat, {text: 'Não foi encontrado nenhum ID do chat'}, {quoted: m});
    } else {
      await conn.sendMessage(m.chat, {text: `Foi deletado ${filesDeleted} arquivos de sessão`}, {quoted: m});
    }
  } catch (err) {
    console.error('Não consegui ler os arquivos:', err);
    await conn.sendMessage(m.chat, {text: 'Não consegui deletar os arquivos de sessão'}, {quoted: m});
  }
  await conn.sendMessage(m.chat, {text: `Está conseguindo ver minha mensagem agora?`}, {quoted: m});
};
handler.help = ['fixwaiting'];
handler.tags = ['fix'];
handler.command = /^fixwaiting$/i;
export default handler;
