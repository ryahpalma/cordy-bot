import {tmpdir} from 'os';
import {join} from 'path';
import {readdirSync, statSync, unlinkSync} from 'fs';

const handler = async (m, {conn, usedPrefix: _p, __dirname, args}) => {
  conn.reply(m.chat, 'Deixei tudo limpinho!', m);

  const tmp = [tmpdir(), join(__dirname, '../tmp')];
  const filename = [];
  tmp.forEach((dirname) => readdirSync(dirname).forEach((file) => filename.push(join(dirname, file))));
  return filename.map((file) => {
    const stats = statSync(file);
    unlinkSync(file);
  });
};
handler.help = ['tmpclear'];
handler.tags = ['owner'];
handler.command = /^tmpclear$/i;
handler.rowner = true;
export default handler;
