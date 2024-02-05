// adartado por Diego (Aka: un ladrón de código)

import axios from 'axios';

let previousCommitSHA = '';
let previousUpdatedAt = '';
let previousCommitUser = '';
const owner = 'ryahpalma';
const repo = 'sgcpapi';
const handler = async (m, {conn, text, usedPrefix, command}) => {
  async function checkRepoUpdates() {
    try {
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`);
      const data = response.data[0];

      if (sha !== previousCommitSHA || message !== previousUpdatedAt) {
        previousCommitSHA = data.sha;
        previousUpdatedAt = data.message;
        previousCommitUser = data.login;
        conn.sendMessage(m.chat, {text: `*Repositório:* ${data.html_url}\n*Mensagem:* ${data.commit.message}\n*Commit:* ${data.author.login}`}, {quoted: m});
      }
    } catch (error) {
      m.reply('O repositório não existe ou está oculto');
    }
  }
};
handler.command = /^check-github/i;
handler.rowner = true;
export default handler;
