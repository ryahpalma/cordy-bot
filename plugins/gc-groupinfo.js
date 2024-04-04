const handler = async (m, {conn, participants, groupMetadata}) => {
  const {
    antiToxic,
    antilock,
    antidelete,
    antiviewonce,
    welcome,
    detect,
    detect2,
    antiLink,
    antiLink2,
    porn,
    autosticker,
    adminmode,
    audios,
    delete: del,
  } = global.db.data.chats[m.chat];
  const groupAdmins = participants.filter((p) => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
  const text = `*Informação do grupo*\n
*Nome* 
${groupMetadata.subject}

*Total de Participantes*
${participants.length}

*Criador do Grupo* 
@${owner.split('@')[0]}

*Administradores do Grupo*
${listAdmin}

*Opções*
> Boas vindas: ${welcome ? '✅' : '❌'}
> Detectar Mensagens v1: ${detect ? '✅' : '❌'} 
> Detectar Mensagens v2: ${detect2 ? '✅' : '❌'} 
> Proibir Link v1: ${antiLink ? '✅' : '❌'} 
> Proibir Link v2: ${antiLink2 ? '✅' : '❌'} 
> Porno: ${porn ? '✅' : '❌'} 
> Figurinhas Automáticas: ${autosticker ? '✅' : '❌'} 
> Áudios: ${audios ? '✅' : '❌'} 
> Revelar Visualização Única: ${antiviewonce ? '✅' : '❌'} 
> Revelar Mensagens Deletadas: ${antidelete ? '✅' : '❌'} 
> Proibir Tóxicos: ${antiToxic ? '✅' : '❌'} 
> Proteção de Travas: ${antilock ? '✅' : '❌'} 
> Modo Administrador: ${adminmode ? '✅' : '❌'} 
`.trim();
  m.reply(text);
};
handler.help = ['info'];
handler.tags = ['group'];
handler.command = /^(groupinfo)$/i;
handler.group = true;
export default handler;
