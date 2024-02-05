import fetch from 'node-fetch';

const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems,}) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  try {
    const user = global.db.data.users[m.sender];
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    const str = `Olá, ${taguser}
*Premium:* ${user.premiumTime > 0 ? '✅' : (isPrems ? '✅' : '❌') || ''}
 
 *SOBRE O BOT*

  ▢ _${usedPrefix}terminosycondiciones_
  ▢ _${usedPrefix}grupos_
  ▢ _${usedPrefix}estado_
  ▢ _${usedPrefix}infobot_
  ▢ _${usedPrefix}speedtest_
  ▢ _${usedPrefix}donar_
  ▢ _${usedPrefix}owner_
  ▢ _${usedPrefix}script_
  ▢ _${usedPrefix}reporte *<txt>*_
  ▢ _${usedPrefix}join *<wagp_url>*_
  ▢ _${usedPrefix}fixmsgespera_
  ▢ _bot_ (sin prefijo)

 *FUNÇÕES*

  ▢ _${usedPrefix}enable restrict_
  ▢ _${usedPrefix}disable restrict_
  ▢ _${usedPrefix}enable autoread_
  ▢ _${usedPrefix}disable autoread_
  ▢ _${usedPrefix}enable antispam_
  ▢ _${usedPrefix}disable antispam_
  ▢ _${usedPrefix}enable anticall_
  ▢ _${usedPrefix}disable anticall_
  ▢ _${usedPrefix}enable audios_bot_
  ▢ _${usedPrefix}disable audios_bot_
  ▢ _${usedPrefix}enable antiprivado_
  ▢ _${usedPrefix}disable antiprivado_
  
 *DIVERSÃO*

  ▢ _${usedPrefix}fakereply *<mensagem> <@tag> <mensagem>*_
  ▢ _${usedPrefix}top *<titulo>*_

 *ATIVAR OU DESATIVAR FUNÇÕES*

  ▢ _${usedPrefix}enable *welcome*_
  ▢ _${usedPrefix}disable *welcome*_
  ▢ _${usedPrefix}enable *porn*_
  ▢ _${usedPrefix}disable *porn*_
  ▢ _${usedPrefix}enable *antilink*_
  ▢ _${usedPrefix}disable *antilink*_
  ▢ _${usedPrefix}enable *antilink2*_
  ▢ _${usedPrefix}disable *antilink2*_
  ▢ _${usedPrefix}enable *detect*_
  ▢ _${usedPrefix}disable *detect*_
  ▢ _${usedPrefix}enable *audios*_
  ▢ _${usedPrefix}disable *audios*_
  ▢ _${usedPrefix}enable *autosticker*_
  ▢ _${usedPrefix}disable *autosticker*_
  ▢ _${usedPrefix}enable *antiviewonce*_
  ▢ _${usedPrefix}disable *antiviewonce*_
  ▢ _${usedPrefix}enable *antitoxic*_
  ▢ _${usedPrefix}disable *antitoxic*_
  ▢ _${usedPrefix}enable *antitraba*_
  ▢ _${usedPrefix}disable *antitraba*_
  ▢ _${usedPrefix}enable *antiforeign*_
  ▢ _${usedPrefix}disable *antiforeign*_
  ▢ _${usedPrefix}enable *modoadmin*_
  ▢ _${usedPrefix}disable *modoadmin*_
  ▢ _${usedPrefix}enable *antidelete*_
  ▢ _${usedPrefix}disable *antidelete*_


 *BAIXADORES*

 ▢ _${usedPrefix}facebook *<url>*_
 ▢ _${usedPrefix}instagram *<url>*_
 ▢ _${usedPrefix}igstory *<usr>*_
 ▢ _${usedPrefix}tiktok *<url>*_
 ▢ _${usedPrefix}mediafire *<url>*_ 
 ▢ _${usedPrefix}pinterest *<txt>*_
 ▢ _${usedPrefix}twitter *<url>*_
 ▢ _${usedPrefix}xnxxdl *<url>*_ (🔞)
 ▢ _${usedPrefix}xvideosdl *<url>*_ (🔞)

 *BUSCADORES*

  ▢ _${usedPrefix}githubsearch *<txt>*_
  ▢ _${usedPrefix}animeinfo *<txt>*_
  ▢ _${usedPrefix}google-images *<txt>*_

 *COMANDOS PARA GRUPOS*

  ▢ _${usedPrefix}add *num>*_
  ▢ _${usedPrefix}kick *<@tag>*_
  ▢ _${usedPrefix}listanum *<txt>*_
  ▢ _${usedPrefix}kicknum *<txt>*_
  ▢ _${usedPrefix}set-grupo *open/close*_
  ▢ _${usedPrefix}set-group-time *open/close time*_
  ▢ _${usedPrefix}promote *<@tag>*_
  ▢ _${usedPrefix}remove-admin *<@tag>*_
  ▢ _${usedPrefix}info-group_
  ▢ _${usedPrefix}resetlink_
  ▢ _${usedPrefix}link_
  ▢ _${usedPrefix}setname *<txt>*_
  ▢ _${usedPrefix}setdesc *<txt>*_
  ▢ _${usedPrefix}invocar *<txt>*_
  ▢ _${usedPrefix}set-welcome *<txt>*_
  ▢ _${usedPrefix}set-bye *<txt>*_
  ▢ _${usedPrefix}hidetag *<txt>*_
  ▢ _${usedPrefix}hidetag *<audio>*_
  ▢ _${usedPrefix}hidetag *<video>*_
  ▢ _${usedPrefix}hidetag *<img>*_
  ▢ _${usedPrefix}warn *<@tag>*_
  ▢ _${usedPrefix}unwarn *<@tag>*_
  ▢ _${usedPrefix}listwarn_
  ▢ _${usedPrefix}ghosts_
  ▢ _${usedPrefix}unlock_
  ▢ _${usedPrefix}set-profile *<img>*_
  ▢ _admins *<txt>*_


 <CONVERSORES*

  ▢ _${usedPrefix}toanime *<img>*_
  ▢ _${usedPrefix}togifaud *<video>*_
  ▢ _${usedPrefix}toimg *<sticker>*_
  ▢ _${usedPrefix}tomp3 *<video>*_
  ▢ _${usedPrefix}tomp3 *<nota de voz>*_
  ▢ _${usedPrefix}toptt *<video / audio>*_
  ▢ _${usedPrefix}tovideo *<sticker>*_
  ▢ _${usedPrefix}tourl *<video / img / audio>*_
  ▢ _${usedPrefix}tts *<idioma> <txt>*_
  ▢ _${usedPrefix}tts *<efecto> <txt>*_

 *ALEATÓRIOS*

  ▢ _${usedPrefix}kpop *<blackpink/exo/bts>*_
  ▢ _${usedPrefix}cristianoronaldo_
  ▢ _${usedPrefix}messi_
  ▢ _${usedPrefix}cat_
  ▢ _${usedPrefix}dog_
  ▢ _${usedPrefix}meme_
  ▢ _${usedPrefix}itzy_
  ▢ _${usedPrefix}blackpink_

 *EFEITOS PARA AÚDIOS*

  ▢ _${usedPrefix}bass_
  ▢ _${usedPrefix}blown_
  ▢ _${usedPrefix}deep_
  ▢ _${usedPrefix}earrape_
  ▢ _${usedPrefix}fast_
  ▢ _${usedPrefix}fat_
  ▢ _${usedPrefix}nightcore_
  ▢ _${usedPrefix}reverse_
  ▢ _${usedPrefix}robot_
  ▢ _${usedPrefix}slow_
  ▢ _${usedPrefix}smooth_
  ▢ _${usedPrefix}tupai_

 *FERRAMENTAS*
 
  ▢ _${usedPrefix}inspect *<wagc_url>*_
  ▢ _${usedPrefix}chatgpt *<txt>*_
  ▢ _${usedPrefix}delchatgpt
  ▢ _${usedPrefix}gptvoz *<txt>*_
  ▢ _${usedPrefix}dall-e *<txt>*_
  ▢ _${usedPrefix}spamwa *num|txt|cant>*_
  ▢ _${usedPrefix}size *<cant> <img / video>*_
  ▢ _${usedPrefix}view *img/video*_
  ▢ _${usedPrefix}clima *<país> <ciudad>*_
  ▢ _${usedPrefix}encuesta *<txt1|txt2>*_
  ▢ _${usedPrefix}afk *<motivo>*_
  ▢ _${usedPrefix}ocr *<responde a img>*_
  ▢ _${usedPrefix}hd *<responde a img>*_
  ▢ _${usedPrefix}tinyurl *<url>*_
  ▢ _${usedPrefix}calc *<operacion>*_
  ▢ _${usedPrefix}del *<msj>*_
  ▢ _${usedPrefix}whatmusic *<audio>*_
  ▢ _${usedPrefix}readqr *<img>*_
  ▢ _${usedPrefix}qrcode *<txt>*_
  ▢ _${usedPrefix}readmore *<txt1|txt2>*_
  ▢ _${usedPrefix}styletext *<txt>*_
  ▢ _${usedPrefix}traducir *<txt>*_
  ▢ _${usedPrefix}nowa *num>*_
  ▢ _${usedPrefix}horario_
  ▢ _${usedPrefix}dropmail_
  ▢ _${usedPrefix}igstalk *<usr>*_
  ▢ _${usedPrefix}tiktokstalk *<usr>*_
  ▢ _${usedPrefix}img *<txt>*_


 *STICKERS*

  ▢ _${usedPrefix}sticker *<responder a img o video>*_
  ▢ _${usedPrefix}sticker *<url>*_
  ▢ _${usedPrefix}set-sticker-name *<packname>|<autor>*_

 *MODS*

  ▢ _> *<funcion>*_
  ▢ _=> *<funcion>*_
  ▢ _$ *<funcion>*_
  ▢ _${usedPrefix}dsowner_
  ▢ _${usedPrefix}setprefix *<prefijo>*_
  ▢ _${usedPrefix}resetprefix_
  ▢ _${usedPrefix}autoadmin_
  ▢ _${usedPrefix}grouplist_
  ▢ _${usedPrefix}chetar_
  ▢ _${usedPrefix}leavegc_
  ▢ _${usedPrefix}cajafuerte_
  ▢ _${usedPrefix}blocklist_
  ▢ _${usedPrefix}addowner *<@tag / num>*_
  ▢ _${usedPrefix}delowner *<@tag / num>*_
  ▢ _${usedPrefix}block *<@tag / num>*_
  ▢ _${usedPrefix}unblock *<@tag / num>*_
  ▢ _${usedPrefix}enable *restrict*_
  ▢ _${usedPrefix}disable *restrict*_
  ▢ _${usedPrefix}enable *autoread*_
  ▢ _${usedPrefix}disable *autoread*_
  ▢ _${usedPrefix}enable *public*_
  ▢ _${usedPrefix}disable *public*_
  ▢ _${usedPrefix}enable *pconly*_
  ▢ _${usedPrefix}disable *pconly*_
  ▢ _${usedPrefix}enable *gconly*_
  ▢ _${usedPrefix}disable *gconly*_
  ▢ _${usedPrefix}enable *anticall*_
  ▢ _${usedPrefix}disable *anticall*_
  ▢ _${usedPrefix}enable *antiprivado*_
  ▢ _${usedPrefix}disable *antiprivado*_
  ▢ _${usedPrefix}enable *audios_bot*_
  ▢ _${usedPrefix}disable *audios_bot*_
  ▢ _${usedPrefix}enable *antispam*_
  ▢ _${usedPrefix}disable *antispam*_
  ▢ _${usedPrefix}msg *<txt>*_
  ▢ _${usedPrefix}banchat_
  ▢ _${usedPrefix}unbanchat_
  ▢ _${usedPrefix}resetuser *<@tag>*_
  ▢ _${usedPrefix}banuser *<@tag>*_
  ▢ _${usedPrefix}unbanuser *<@tag>*_
  ▢ _${usedPrefix}dardiamantes *<@tag> <cant>*_
  ▢ _${usedPrefix}añadirxp *<@tag> <cant>*_
  ▢ _${usedPrefix}banuser *<@tag>*_
  ▢ _${usedPrefix}bc *<txt>*_
  ▢ _${usedPrefix}bcchats *<txt>*_
  ▢ _${usedPrefix}bcgc *<txt>*_
  ▢ _${usedPrefix}bcgc2 *<aud>*_
  ▢ _${usedPrefix}bcgc2 *<vid>*_
  ▢ _${usedPrefix}bcgc2 *<img>*_
  ▢ _${usedPrefix}bcbot *<txt>*_
  ▢ _${usedPrefix}cleartpm_
  ▢ _${usedPrefix}restart_
  ▢ _${usedPrefix}update_
  ▢ _${usedPrefix}banlist_
  ▢ _${usedPrefix}addprem *<@tag> <tiempo>*_
  ▢ _${usedPrefix}addprem2 *<@tag> <tiempo>*_
  ▢ _${usedPrefix}addprem3 *<@tag> <tiempo>*_
  ▢ _${usedPrefix}addprem4 *<@tag> <tiempo>*_
  ▢ _${usedPrefix}delprem *<@tag>*_
  ▢ _${usedPrefix}listcmd_
  ▢ _${usedPrefix}setppbot *<responder a img>*_
  ▢ _${usedPrefix}addcmd *<txt>*_
  ▢ _${usedPrefix}delcmd_
  ▢ _${usedPrefix}saveimage_
  ▢ _${usedPrefix}viewimage_`.trim();
    if (m.isGroup) {
      conn.reply(m.chat, str.trim(), m);
    } else {
      conn.reply(m.chat, 'Função apenas para grupos', m);
    }
  } catch (e) {
    conn.reply(m.chat, 'Erro ao acessar o menu principal', m);
    console.log(e);
  }
};
handler.command = /^(menu|commands)$/i;
handler.exp = 50;
handler.fail = null;
export default handler;

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}
