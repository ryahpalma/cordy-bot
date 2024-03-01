import translate from '@vitalets/google-translate-api';
import fetch from 'node-fetch';

const handler = async (m, {args, usedPrefix, command}) => {
  const msg = `Envie _${usedPrefix + command} pt mensagem_ para traduzir`;
  if (!args || !args[0]) return m.reply(msg);
  let lang = args[0];
  let text = args.slice(1).join(' ');
  const defaultLang = 'es';
  if ((args[0] || '').length !== 2) {
    lang = defaultLang;
    text = args.join(' ');
  }
  if (!text && m.quoted && m.quoted.text) text = m.quoted.text;
  try {
    let result = await translate(`${text}`, {to: lang, autoCorrect: true});
    await m.reply(result.text);
  } catch {
    try {
      let response = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkeysapi}&text=${text}`);
      let json = await response.json();
      let result = json.result.translated;
      await m.reply(result);
    } catch (e) {
      await m.reply('Erro:', e);
    }
  }
};
handler.command = /^translate$/i;
export default handler;
