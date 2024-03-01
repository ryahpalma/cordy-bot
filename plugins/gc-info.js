const handler = async (m, {conn, participants, groupMetadata}) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || './src/avatar_contact.png';
  const {
    antiToxic,
    antilock,
    antidelete,
    antiviewonce,
    isBanned,
    welcome,
    detect,
    detect2,
    sWelcome,
    sBye,
    sPromote,
    sDemote,
    antiLink,
    antiLink2,
    porn,
    autosticker,
    modoadmin,
    audios,
    delete: del,
  } = global.db.data.chats[m.chat];
  const groupAdmins = participants.filter((p) => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
  const text = `*Informação do grupo*\n

*Nome* 
${groupMetadata.subject}

*Descrição* 
${groupMetadata.desc?.toString() || '𝚂𝙸𝙽 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽'}

*Total de Participantes*
${participants.length}

*Criador do Grupo* 
@${owner.split('@')[0]}

*Administradores do Grupo*
${listAdmin}

*𝙾𝙿𝙲𝙸𝙾𝙽𝙴𝚂 𝙰𝚄𝚃𝙾𝙼𝙰𝚃𝙸𝙲𝙰𝚂:*
> BEM VINDO: ${welcome ? '✅' : '❌'}
> DETECTAR MENSAGEM: ${detect ? '✅' : '❌'} 
> DETECTAR MENSAGEM 2: ${detect2 ? '✅' : '❌'} 
> PROIBIDO LINK: ${antiLink ? '✅' : '❌'} 
> PROIBIDO LINK 2: ${antiLink2 ? '✅' : '❌'} 
> PORNO: ${porn ? '✅' : '❌'} 
> FIGURINHA AUTOMATICA: ${autosticker ? '✅' : '❌'} 
> AUDIOS: ${audios ? '✅' : '❌'} 
> PROIBIR VISUALIZAÇÃO UNICA: ${antiviewonce ? '✅' : '❌'} 
> PROIBIR DELETAR MENSAGENS: ${antidelete ? '✅' : '❌'} 
> PROIBIR PALAVRAS: ${antiToxic ? '✅' : '❌'} 
> PROTEÇÃO A TRAVAS: ${antilock ? '✅' : '❌'} 
> MODO ADMINISTRADOR: ${modoadmin ? '✅' : '❌'} 
`.trim();
  conn.sendFile(m.chat, pp, 'image.jpg', text, m, false, {mentions: [...groupAdmins.map((v) => v.id), owner]});
};
handler.help = ['info'];
handler.tags = ['group'];
handler.command = /^(infogroup)$/i;
handler.group = true;
export default handler;
