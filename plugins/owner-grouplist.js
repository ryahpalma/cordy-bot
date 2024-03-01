const handler = async (m, {conn}) => {
  let txt = '';
  try {
    const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
    const totalGroups = groups.length;
    for (let i = 0; i < groups.length; i++) {
      const [jid, chat] = groups[i];
      const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
      const participants = groupMetadata.participants || [];
      const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
      const isBotAdmin = bot?.admin || false;
      const isParticipant = participants.some((u) => conn.decodeJid(u.id) === conn.user.jid);
      const participantStatus = isParticipant ? 'Sou participante' : 'Não sou participante';
      const totalParticipants = participants.length;
      txt += `Grupo ${i + 1}*
    > Nome: ${await conn.getName(jid)}
    > ID: ${jid}
    > Sou administradora: ${isBotAdmin ? 'Sim' : 'Não'}
    > Situação: ${participantStatus}
    > Total de Participantes: ${totalParticipants}
    > Link: ${isBotAdmin ? `https://chat.whatsapp.com/${await conn.groupInviteCode(jid) || '--- (Erro) ---'}` : '--- (Não sou administradora) ---'}\n\n`;
    }
    m.reply(`Lista de grupos que estou participando\n\nTotal: ${totalGroups}\n\n${txt}`.trim());
  } catch {
    const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
    const totalGroups = groups.length;
    for (let i = 0; i < groups.length; i++) {
      const [jid, chat] = groups[i];
      const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
      const participants = groupMetadata.participants || [];
      const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
      const isBotAdmin = bot?.admin || false;
      const isParticipant = participants.some((u) => conn.decodeJid(u.id) === conn.user.jid);
      const participantStatus = isParticipant ? 'Sou participante' : 'Não sou participante';
      const totalParticipants = participants.length;
      txt += `Grupo ${i + 1}*
    > Nome: ${await conn.getName(jid)}
    > ID: ${jid}
    > Sou administradora: ${isBotAdmin ? 'Sim' : 'Não'}
    > Situação: ${participantStatus}
    > Total de Participantes: ${totalParticipants}
    > Link: ${isBotAdmin ? `https://chat.whatsapp.com/${await conn.groupInviteCode(jid) || '--- (Erro) ---'}` : '--- (Não sou administradora) ---'}\n\n`;
    }
    m.reply(`Lista de grupos que estou participando\n\nTotal: ${totalGroups}\n\n${txt}`.trim());
  }
};
handler.help = ['grouplist'];
handler.tags = ['info'];
handler.command = /^(grouplist)$/i;
handler.rowner = true;
handler.private = true;
export default handler;
