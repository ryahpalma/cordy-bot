const handler = async (m, {conn, args, isPrems}) => {
  const usuario = global.db.data.users[m.sender].premiumTime;
  const user = Object.entries(global.db.data.users).filter((user) => user[1].premiumTime).map(([key, value]) => {
    return {...value, jid: key};
  });
  const premTime = global.db.data.users[m.sender].premiumTime;
  const prem = global.db.data.users[m.sender].premium;
  const userr = await '@' + m.sender.split`@`[0];
  const waktu = clockString(`${premTime - new Date() * 1} `);
  const sortedP = user.map(toNumber('premiumTime')).sort(sort('premiumTime'));
  const len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedP.length);
  let infoprem = `Usuário: ${userr}
${prem ? `*Tempo restante:*\n${clockString(usuario - new Date() * 1)}` : (isPrems ? `*Tempo restante:*\n- Você é um usuário premium por tempo ilimitado` : '- Não é um usuário premium ❌')}

*Membros Premium*${sortedP.slice(0, len).map(({
    jid,
    name,
    premiumTime,
    prem,
    registered,
  }, i) => `

Usuário: ${'@' + jid.split`@`[0]}
${premiumTime > 0 ? `*Tempo restante:*\n${clockString(premiumTime - new Date() * 1)}` : '- Não é um usuário premium ❌'}`).join('')}`.trim();

  if (sortedP.filter((user) => user.premiumTime).length === 0) {
    infoprem = `Usuário: ${userr}\n\n${prem ? `*Tempo restante:*\n${clockString(usuario - new Date() * 1)}` : '- Usted no es un usuario premium ❌'}\n\n*Membros Premium*\n- Não há nenhum...`.trim();
  }

  m.reply(infoprem, null, {mentions: conn.parseMention(infoprem)});
};
handler.help = ['list-premium [member]'];
handler.tags = ['info'];
handler.command = /^list-premium$/i;
export default handler;

function clockString(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  return `- Ano(s): ${years}\n- Mês(es): ${months}\n- Semana(s): ${weeks}\n- Dia(s): ${days}\n- Hora(s): ${hours % 24}\n- Minuto(s): ${minutes % 60}\n- Segundo(s): ${seconds % 60}`;
}

function sort(property, ascending = true) {
  if (property) {
    return (...args) => args[ascending & 1][property] - args[!ascending & 1][property];
  } else {
    return (...args) => args[ascending & 1] - args[!ascending & 1];
  }
}

function toNumber(property, _default = 0) {
  if (property) {
    return (a, i, b) => {
      return {
        ...b[i],
        [property]: a[property] === undefined ? _default : a[property],
      };
    };
  } else {
    return (a) => a === undefined ? _default : a;
  }
}
