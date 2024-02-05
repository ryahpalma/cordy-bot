const handler = async (m, {conn, participants, groupMetadata}) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || './src/avatar_contact.png';
  const {antiToxic, antiTraba, antidelete, antiviewonce, isBanned, welcome, detect, detect2, sWelcome, sBye, sPromote, sDemote, antiLink, antiLink2, porn, autosticker, modoadmin, audios, delete: del} = global.db.data.chats[m.chat];
  const groupAdmins = participants.filter((p) => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
  const text = `*Informação do grupo*\n
*𝙸𝙳𝙴𝙽𝚃𝙸𝙵𝙸𝙲𝙰𝙲𝙸𝙾𝙽 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾:* 
${groupMetadata.id}

*𝙽𝙾𝙼𝙱𝚁𝙴:* 
${groupMetadata.subject}

*𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽:* 
${groupMetadata.desc?.toString() || '𝚂𝙸𝙽 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽'}

*𝚃𝙾𝚃𝙰𝙻 𝙳𝙴 𝙿𝙰𝚁𝚃𝙸𝙲𝙸𝙿𝙰𝙽𝚃𝙴𝚂:*
${participants.length} Participantes

*𝙲𝚁𝙴𝙰𝙳𝙾𝚁 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾:* 
@${owner.split('@')[0]}

*𝙰𝙳𝙼𝙸𝙽𝚂 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾:*
${listAdmin}

*𝙾𝙿𝙲𝙸𝙾𝙽𝙴𝚂 𝙰𝚄𝚃𝙾𝙼𝙰𝚃𝙸𝙲𝙰𝚂:*
—◉ BEM VINDO: ${welcome ? '✅' : '❌'}
—◉ DETECTAR: ${detect ? '✅' : '❌'} 
—◉ DETECTAR 2: ${detect2 ? '✅' : '❌'} 
—◉ PROIBIDO LINK: ${antiLink ? '✅' : '❌'} 
—◉ PROIBIDO LINK 2: ${antiLink2 ? '✅' : '❌'} 
—◉ PORNO: ${porn ? '✅' : '❌'} 
—◉ FIGURINHA AUTOMATICA: ${autosticker ? '✅' : '❌'} 
—◉ AUDIOS: ${audios ? '✅' : '❌'} 
—◉ PROIBIDIR VISUALIZAÇÃO UNICA: ${antiviewonce ? '✅' : '❌'} 
—◉ PROIBIR DELETAR: ${antidelete ? '✅' : '❌'} 
—◉ PROIBIR PALAVRAS: ${antiToxic ? '✅' : '❌'} 
—◉ PROTEÇÃO A TRAVAS: ${antiTraba ? '✅' : '❌'} 
—◉ MODO ADMINISTRADOR: ${modoadmin ? '✅' : '❌'} 
`.trim();
  conn.sendFile(m.chat, pp, 'error.jpg', text, m, false, {mentions: [...groupAdmins.map((v) => v.id), owner]});
};
handler.help = ['infogrup'];
handler.tags = ['group'];
handler.command = /^(infogrupo|gro?upinfo|info(gro?up|gc))$/i;
handler.group = true;
export default handler;
