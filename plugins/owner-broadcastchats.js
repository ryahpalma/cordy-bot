import fs from 'fs';
const handler = async (m, {conn, text} ) => {
  const delay = (time) => new Promise((res) => setTimeout(res, time));
  const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
  if (!text) throw '*[❗𝐈𝐍𝐅𝐎❗] 𝙸𝙽𝙶𝚁𝙴𝚂𝙴 𝙴𝙻 𝙼𝙴𝙽𝚂𝙰𝙹𝙴 𝚀𝚄𝙴 𝚀𝚄𝙸𝙴𝚁𝙴 𝚃𝚁𝙰𝙼𝙸𝚃𝙴*';
  const cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m;
  const teks = text ? text : cc.text;
  for (const i of chats) {
    await delay(500);
    conn.relayMessage(i,
        {liveLocationMessage: {
          degreesLatitude: 35.685506276233525,
          degreesLongitude: 139.75270667105852,
          accuracyInMeters: 0,
          degreesClockwiseFromMagneticNorth: 2,
          caption: '[❗𝐂𝐎𝐌𝐔𝐍𝐈𝐂𝐀𝐃𝐎❗]\n\n' + teks + '\n\n𝙀𝙎𝙏𝙀 𝙀𝙎 𝙐𝙉 𝘾𝙊𝙈𝙐𝙉𝙄𝘾𝘼𝘿𝙊 𝙊𝙁𝙄𝘾𝙄𝘼𝙇',
          sequenceNumber: 2,
          timeOffset: 3,
          contextInfo: m,
        }}, {}).catch((_) => _);
  }
  m.reply(`Mensagem enviada para ${chats.length} conversas`);
};
handler.help = ['broadcastchats'].map((v) => v + ' <text>');
handler.tags = ['owner'];
handler.command = /^broadcast-chats$/i;
handler.rowner = true;
export default handler;

