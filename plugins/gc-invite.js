const {
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  proto,
} = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';

const {
  getBinaryNodeChild,
  getBinaryNodeChildren,
} = (await import('@whiskeysockets/baileys')).default;
const handler = async (m, {
  conn,
  usedPrefix,
  command,
  text,
  participants,
  args,
}) => {
  if (!global.db.data.settings[conn.user.jid].restrict) throw `Para habilitar este comando envie ${usedPrefix}enable restrict`;
  if (!args[0]) throw `Adicione o número do usuário que deseja convidar\n\nEnvie: _${usedPrefix + command} 5511999999999_`;
  try {
    const _participants = participants.map((user) => user.id);
    const users = (await Promise.all(
      text.split(',')
        .map((v) => v.replace(/[^0-9]/g, ''))
        .filter((v) => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
        .map(async (v) => [v, await conn.onWhatsApp(v + '@s.whatsapp.net')]))).filter((v) => v[1][0]?.exists).map((v) => v[0] + '@c.us');
    const response = await conn.query({
      tag: 'iq',
      attrs: {type: 'set', xmlns: 'w:g2', to: m.chat},
      content: users.map((jid) => ({
        tag: 'add',
        attrs: {},
        content: [{tag: 'participant', attrs: {jid}}],
      })),
    });
    const pp = await conn.profilePictureUrl(m.chat).catch((_) => null);
    const jpegThumbnail = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0);
    const add = getBinaryNodeChild(response, 'add');
    const participant = getBinaryNodeChildren(add, 'participant');
    for (const user of participant.filter((item) => item.attrs.error == 403)) {
      const jid = user.attrs.jid;
      const content = getBinaryNodeChild(user, 'add_request');
      const inviteCode = content.attrs.code;
      const inviteCodeExp = content.attrs.expiration;
      const captionn = `Olá, sou a Cordy, sou uma gerenciadora de grupos. Os responsáveis pelo grupo enviaram um convite para você. Estamos te esperando lá!`;
      await prepareWAMessageMedia({image: jpegThumbnail}, {upload: conn.waUploadToServer});
      const groupInvite = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
        groupInviteMessage: {
          groupJid: m.chat,
          inviteCode: inviteCode,
          inviteExpiration: inviteCodeExp,
          groupName: await conn.getName(m.chat),
          caption: captionn,
          jpegThumbnail: jpegThumbnail,
        },
      }), {userJid: jid});
      await conn.relayMessage(jid, groupInvite.message, {messageId: groupInvite.key.id});
    }
  } catch {
    throw 'Não foi possível adicionar o número, ocorreu um erro.';
  }
};
handler.help = ['invite'].map((v) => v + ' <number>');
handler.tags = ['group'];
handler.command = /^(invite|\+)$/i;
handler.admin = handler.group = handler.botAdmin = true;
export default handler;
