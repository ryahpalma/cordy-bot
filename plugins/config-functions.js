const handler = async (m, {
  conn,
  usedPrefix,
  command,
  args,
  isOwner,
  isAdmin,
  isROwner,
}) => {
  const optionsFull = `*Comandos*\n 
*Título:* Boas Vindas
*Comando:* ${usedPrefix + command} welcome
*Descrição:* Ativa ou desativa a função de boas vindas no grupo.

--------------------------------

*Título:* Proibir Links v1
*Comando:* ${usedPrefix + command} antilink
*Descrição:* Permite ou não permite aos membros do grupo a enviar links de WhatsApp
*Nota:* Precisa da função restrict habilitada

--------------------------------

*Título:* Proibir Links v2
*Comando:* ${usedPrefix + command} antilink2
*Descrição:* Permite ou não permite aos membros do grupo a enviar links que comecem com HTTPS
*Nota:* Precisa da função restrict habilitada

--------------------------------

*Título:* Detectar Mensagens v1
*Comando:* ${usedPrefix + command} detect
*Descrição:* Ativa ou desativa as notificações de grupos

--------------------------------

*Título:* Detectar Mensagens v2
*Comando:* ${usedPrefix + command} detect2
*Descrição:* Detecta todas notificações do grupo e possui uma gestão melhor

--------------------------------

*Título:* Permissão de Áudios
*Comando:* ${usedPrefix + command} audios
*Descrição:* Permite ou não permite aos membros do grupo a enviar áudios

--------------------------------

*Título:* Figurinhas Automáticas
*Comando:* ${usedPrefix + command} autosticker 
*Descrição:* Crie automaticamente figurinha de qualquer imagem enviada ao grupo

--------------------------------

*Título:* Previnir Visualização Única
*Comando:* ${usedPrefix + command} antiviewonce
*Descrição:* Todas mídias enviadas no modo de visualização única serão reenviadas

--------------------------------

*Título:* Anti Mensagens Tóxicas
*Comando:* ${usedPrefix + command} antitoxic
*Descrição:* Detecta mensagens proibidas e envia um aviso ao membro
*Nota:* Precisa da função restrict habilitada

--------------------------------

*Título:* Anti Mensagens de Trava
*Comando:* ${usedPrefix + command} antilock
*Descrição:* Detecta mensagens que travam o grupo e evita problemas
*Nota:* Precisa da função restrict habilitada

--------------------------------

*Título:* Proibir Estrangeiros
*Comando:* ${usedPrefix + command} antiforeigns
*Descrição:* Irá remover qualquer estrangeiro automaticamente do grupo
*Nota:* Precisa da função restrict habilitada

--------------------------------

*Título:* Modo Administrador
*Comando:* ${usedPrefix + command} adminmode
*Descrição:* Irá responder apenas mensagens dos administradores

--------------------------------

*Título:* Prevenir Mensagens Deletadas
*Comando:* ${usedPrefix + command} antidelete
*Descrição:* Mensagens deletadas serão reenviadas`.trim();

  const isEnable = /true|enable|(turn)?on|1/i.test(command);
  const chat = global.db.data.chats[m.chat];
  const user = global.db.data.users[m.sender];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const type = (args[0] || '').toLowerCase();
  let isAll = false;
  const isUser = false;
  switch (type) {
    case 'welcome':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!(isAdmin || isOwner || isROwner)) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.welcome = isEnable;
      break;
    case 'detect':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.detect = isEnable;
      break;
    case 'detect2':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.detect2 = isEnable;
      break;
    case 'simsimi':
      if (m.isGroup) {
        if (!(isAdmin || isROwner || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.simi = isEnable;
      break;
    case 'antiporn':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antiporn = isEnable;
      break;
    case 'delete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.delete = isEnable;
      break;
    case 'antidelete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antidelete = isEnable;
      break;
    case 'public':
      isAll = true;
      if (!isROwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      global.opts['self'] = !isEnable;
      break;
    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antiLink = isEnable;
      break;
    case 'antilink2':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antiLink2 = isEnable;
      break;
    case 'antiviewonce':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antiviewonce = isEnable;
      break;
    case 'porn':
      if (m.isGroup) {
        if (!(isAdmin || isROwner || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.porn = isEnable;
      break;
    case 'adminmode':
      if (m.isGroup) {
        if (!(isAdmin || isROwner || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.adminmode = isEnable;
      break;
    case 'autosticker':
      if (m.isGroup) {
        if (!(isAdmin || isROwner || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.autosticker = isEnable;
      break;
    case 'audios':
      if (m.isGroup) {
        if (!(isAdmin || isROwner || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.audios = isEnable;
      break;
    case 'restrict':
      isAll = true;
      if (!(isROwner || isOwner)) {
        global.dfail('owner', m, conn);
        throw false;
      }
      bot.restrict = isEnable;
      break;
    case 'autoread':
      isAll = true;
      if (!(isROwner || isOwner)) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      bot.autoread2 = isEnable;
      break;
    case 'pconly':
    case 'privateonly':
      isAll = true;
      if (!isROwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      global.opts['pconly'] = isEnable;
      break;
    case 'gconly':
    case 'grouponly':
      isAll = true;
      if (!isROwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      global.opts['gconly'] = isEnable;
      break;
    case 'swonly':
    case 'statusonly':
      isAll = true;
      if (!isROwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      global.opts['swonly'] = isEnable;
      break;
    case 'anticall':
      isAll = true;
      if (!(isROwner || isOwner)) {
        global.dfail('owner', m, conn);
        throw false;
      }
      bot.antiCall = isEnable;
      break;
    case 'antiprivate':
      isAll = true;
      if (!(isROwner || isOwner)) {
        global.dfail('owner', m, conn);
        throw false;
      }
      bot.antiPrivate = isEnable;
      break;
    case 'antispam':
      isAll = true;
      if (!(isROwner || isOwner)) {
        global.dfail('owner', m, conn);
        throw false;
      }
      bot.antispam = isEnable;
      break;
    case 'antitoxic':
      if (m.isGroup) {
        if (!(isAdmin || isROwner || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antiToxic = isEnable;
      break;
    case 'antilock':
      if (m.isGroup) {
        if (!(isAdmin || isROwner || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antilock = isEnable;
      break;
    case 'antiforeign':
      if (m.isGroup) {
        if (!(isAdmin || isROwner || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antiForeign = isEnable;
      break;
    default:
      if (!/[01]/.test(command)) return await conn.sendMessage(m.chat, {text: optionsFull}, {quoted: m});
      throw false;
  }
  conn.sendMessage(m.chat, {text: `A opção _${type}_ foi ${isEnable ? 'ativada' : 'desativada'} para este ${isAll ? 'bot' : isUser ? '' : 'grupo'}`}, {quoted: m});
};
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?[01])$/i;
export default handler;
