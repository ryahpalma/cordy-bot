import cp, {exec as _exec} from 'child_process';
import {promisify} from 'util';
import fs from 'fs';
const exec = promisify(_exec).bind(cp);
const handler = async (m, {conn, isROwner, usedPrefix, command, text}) => {
  const ar = Object.keys(plugins);
  const ar1 = ar.map((v) => v.replace('.js', ''));
  if (!text) throw `Lista dos plug-ins existentes: \n${ar1.map((v) => '>  ' + v).join`\n`}`;
  if (!ar1.includes(text)) return m.reply(`Não foi encontrado nenhum plug-in com este nome "${text}", Lista de plug-ins existentes: \n> ${ar1.map((v) => ' ' + v).join`\n`}`);
  let o;
  try {
    o = await exec('cat plugins/' + text + '.js');
  } catch (e) {
    o = e;
  } finally {
    const {stdout, stderr} = o;
    if (stdout.trim()) {
      await conn.sendMessage(m.chat, {document: fs.readFileSync(`./plugins/${text}.js`), mimetype: 'application/javascript', fileName: `${text}.js`}, {quoted: m});
    }
    if (stderr.trim()) {
      await conn.sendMessage(m.chat, {document: fs.readFileSync(`./plugins/${text}.js`), mimetype: 'application/javascript', fileName: `${text}.js`}, {quoted: m});
    }
  }
};
handler.help = ['pluginget'].map((v) => v + ' *<name>*');
handler.tags = ['owner'];
handler.command = /^pluginget$/i;
handler.rowner = true;
export default handler;
