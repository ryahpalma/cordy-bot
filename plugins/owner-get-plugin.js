import cp, {exec as _exec} from 'child_process';
import {promisify} from 'util';
import fs from 'fs';
const exec = promisify(_exec).bind(cp);
const handler = async (m, {conn, isROwner, usedPrefix, command, text}) => {
  const ar = Object.keys(plugins);
  const ar1 = ar.map((v) => v.replace('.js', ''));
  if (!text) throw `Insira um nome de plug-in válido!\n\nLista dos plug-ins existentes: \n${ar1.map((v) => '->  ' + v).join`\n`}`;
  if (!ar1.includes(text)) return m.reply(`*[❗] 𝙽𝙾 𝚂𝙴 𝙴𝙽𝙲𝙾𝙽𝚃𝚁𝙾 𝙽𝙸𝙽𝙶𝚄𝙽 𝙿𝙻𝚄𝙶𝙸𝙽 (𝙰𝚁𝙲𝙷𝙸𝚅𝙾) 𝙻𝙻𝙰𝙼𝙰𝙳𝙾 "${text}", 𝙸𝙽𝙶𝚁𝙴𝚂𝙰 𝙰𝙻𝙶𝚄𝙽𝙾 𝙴𝚇𝙸𝚂𝚃𝙴𝙽𝚃𝙴*\n\n*==================================*\n\n*—◉ 𝙻𝙸𝚂𝚃𝙰 𝙳𝙴 𝙿𝙻𝚄𝙶𝙸𝙽𝚂 (𝙰𝚁𝙲𝙷𝙸𝚅𝙾𝚂) 𝙴𝚇𝙸𝚂𝚃𝙴𝙽𝚃𝙴𝚂:*\n*◉* ${ar1.map((v) => ' ' + v).join`\n*◉*`}`);
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
handler.help = ['get-plugin'].map((v) => v + ' *<name>*');
handler.tags = ['owner'];
handler.command = /^(get-plugin)$/i;
handler.rowner = true;
export default handler;
