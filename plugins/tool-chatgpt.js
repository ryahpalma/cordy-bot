import fetch from 'node-fetch';
import translate from '@vitalets/google-translate-api';

const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  if (!text) throw `É necessário enviar um texto junto ao comando\n\nExemplo: _${usedPrefix + command} Quanto quilômetros estamos de distância do sol?_`;
  try {
    conn.sendPresenceUpdate('composing', m.chat);
    let jailbreak = `Você agirá como um bot, responda questões de forma simples e simplificada`;

    async function getOpenAIChatCompletion(text) {
      let chgptdb = global.chatgpt.data.users[m.sender];
      chgptdb.push({role: 'user', content: text});
      let response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${global.openai_key}`,
        },
        body: JSON.stringify({
          'model': 'gpt-3.5-turbo',
          'messages': [{'role': 'system', 'content': jailbreak}, ...chgptdb],
        }),
      });

      let json = await response.json();
      return json.choices[0].message.content;
    }

    let chatResponse = await getOpenAIChatCompletion(text);
    if (chatResponse == 'error' || chatResponse == '' || !chatResponse) {
      return XD;
    } else {
      m.reply(`${chatResponse}`.trim());
    }
  } catch {
    try {
      conn.sendPresenceUpdate('composing', m.chat);

      let response = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=${lolkeysapi}&text=${text}&user=${m.sender}`);
      let json = await response.json();
      if (json.result == 'error' || json.result == '' || !json.result) return XD;
      let chatResponse = await translate(`${json.result}`, {
        to: 'pt',
        autoCorrect: true,
      });
      m.reply(`${response.text}`.trim());
    } catch {
      throw `Erro ao tentar acessar o servidor do ChatGPT`;
    }
  }
};
handler.command = /^chatgpt$/i;
export default handler;
