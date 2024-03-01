const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) return m.reply(`Digite \n\n_${usedPrefix + command} Acabei de peidar @${m.sender.split`@`[0]} E eu responderei_`, null, {mentions: [m.sender]});
  const cm = copy(m);
  let who;
  if (text.includes('@0')) {
    who = '0@s.whatsapp.net';
  } else if (m.isGroup) {
    who = cm.participant = m.mentionedJid[0];
  } else {
    who = m.chat;
  }
  if (!who) return m.reply(`Digite \n\n_${usedPrefix + command} Acabei de peidar @${m.sender.split`@`[0]} E eu responderei_`, null, {mentions: [m.sender]});
  cm.key.fromMe = false;
  cm.message[m.mtype] = copy(m.msg);
  const sp = '@' + who.split`@`[0];
  const [fake, ...real] = text.split(sp);
  conn.fakeReply(m.chat, real.join(sp).trimStart(), who, fake.trimEnd(), m.isGroup ? m.chat : false, {
    contextInfo: {
      mentionedJid: conn.parseMention(real.join(sp).trim()),
    },
  });
};
handler.help = ['fakereply <fakemessage> @user <myresponse>'];
handler.tags = ['tools'];
handler.command = /^fakereply$/;

export default handler;

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
