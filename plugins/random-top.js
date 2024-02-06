const user = (a) => '@' + a.split('@')[0];

function handler(m, {groupMetadata, command, conn, text, usedPrefix}) {
  if (!text) throw `Para utilizar esse comando envie:\n${usedPrefix + command} *título*`;
  const participant = groupMetadata.participants.map((v) => v.id);
  const a = participant.getRandom();
  const b = participant.getRandom();
  const c = participant.getRandom();
  const d = participant.getRandom();
  const e = participant.getRandom();
  const f = participant.getRandom();
  const g = participant.getRandom();
  const h = participant.getRandom();
  const i = participant.getRandom();
  const j = participant.getRandom();
  const top = `*Top 10 ${text} 😎*
    
*1. ${user(a)}*
*2. ${user(b)}*
*3. ${user(c)}*
*4. ${user(d)}*
*5. ${user(e)}*
*6. ${user(f)}*
*7. ${user(g)}*
*8. ${user(h)}*
*9. ${user(i)}*
*10. ${user(j)}*`;
  m.reply(top, null, {mentions: [a, b, c, d, e, f, g, h, i, j]});
}

handler.help = handler.command = /^top$/i;
handler.tags = ['fun'];
handler.group = true;
handler.limit = 2;
export default handler;
