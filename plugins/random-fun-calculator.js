const handler = async (m, {conn, command, text, usedPrefix}) => {
  if (!text) throw `Você deve mencionar algum membro para eu calcular`;
  const percentages = (100).getRandom();
  let emoji = '';
  let description = '';
  switch (command) {
    case 'lesbica':
    case 'gay':
      emoji = '🏳️‍🌈';
      if (percentages < 50) {
        description = `Descobri que o(a) ${text} é ${percentages}% ${command} ${emoji}\nSó não saiu do armário ainda`;
      } else if (percentages >= 50) {
        description = `Descobri que o(a) ${text} é ${percentages}% ${command} ${emoji}\nNa verdade todo mundo já sabia`;
      }
      break;
    case 'safado':
    case 'safada':
      emoji = '😏💦';
      if (percentages < 50) {
        description = `Descobri que o(a) ${text} é ${percentages}% ${command} ${emoji}\nSó que é bem timido(a)`;
      } else if (percentages >= 50) {
        description = `Descobri que o(a) ${text} é ${percentages}% ${command} ${emoji}\nÉ o(a) mais safado(a) do Brasil`;
      }
      break;
    default:
      throw `Comando inválido`;
  }
  const sources = [
    'Minha cabeça',
    'Informação tirada pelo IBGE',
    'Informação tirada pelo formulário do Bolsa Família',
    'Informação tirada pelo formulário do SUS',
    'A turma do fundão me contou',
    'Me falaram no privado',
  ];
  const source = sources[Math.floor(Math.random() * sources.length)];
  const result = `${description}\n\nFonte: ${source}`.trim();

  async function loading() {
    var loading = [
      '█▒▒▒▒▒▒▒▒▒▒▒ 10%',
      '████▒▒▒▒▒▒▒▒ 30%',
      '███████▒▒▒▒▒ 50%',
      '██████████▒▒ 80%',
      '████████████ 100%',
    ];
    let {key} = await conn.sendMessage(m.chat, {
      text: `Calculando...`,
      mentions: conn.parseMention(result),
    }, {quoted: m});
    for (let i = 0; i < loading.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await conn.sendMessage(m.chat, {
        text: loading[i],
        edit: key,
        mentions: conn.parseMention(result),
      }, {quoted: m});
    }
    await conn.sendMessage(m.chat, {
      text: result,
      edit: key,
      mentions: conn.parseMention(result),
    }, {quoted: m});
  }

  loading();
};
handler.help = ['gay', 'lesbica', 'safado', 'safada'].map((v) => v + ' @tag | name');
handler.tags = ['calculator'];
handler.command = /^(gay|lesbica|safado|safada)$/i;
handler.group = true;
export default handler;
