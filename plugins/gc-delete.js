/* Creditos a https://github.com/FG98F */

const handler = async (m, {conn, usedPrefix, command}) => {
  if (!m.quoted) throw `Responsa a mensagem que deseja deletar`;
  try {
    const participantId = m.message.extendedTextMessage.contextInfo.participant;
    const userId = m.message.extendedTextMessage.contextInfo.stanzaId;
    return conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: userId,
        participant: participantId,
      },
    });
  } catch {
    return conn.sendMessage(m.chat, {delete: m.quoted.vM.key});
  }
};
handler.help = ['delete'];
handler.tags = ['group'];
handler.command = /^delete$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
