import {performance} from 'perf_hooks';

const handler = async (m, {conn, usedPrefix}) => {
  const memory = (Object.values(process.memoryUsage()).reduce((acc, curr) => acc + curr, 0) / (1024 * 1024)).toFixed(2);
  const _uptime = process.uptime() * 1000;
  const uptime = clockString(_uptime);
  const users = Object.keys(global.db.data.users).length;
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
  const groups = chats.filter(([id]) => id.endsWith('@g.us'));
  const {
    restrict,
    antiCall,
    antiprivate,
  } = global.db.data.settings[conn.user.jid] || {};
  const {autoread, gconly, pconly, self} = global.opts || {};
  const oldPerformance = performance.now();
  const newPerformance = performance.now();
  const responseTime = (newPerformance - oldPerformance).toFixed(2);
  const info = `
Resposta: ${responseTime}s
Funcionando: ${uptime}
Prefixo: ${usedPrefix}
Utilizando: ${memory}MB
Modo: ${self ? 'privado' : 'público'}
Total de usuários: ${users}
Conversas privadas: ${chats.length}
Grupos: ${groups.length}

Leitura automática: ${autoread ? 'ativo' : 'desativado'}
Restrição: ${restrict ? 'ativo' : 'desativado'}
Somente PC: ${pconly ? 'ativo' : 'desativado'}
Somente GC: ${gconly ? 'ativo' : 'desativado'}
Proibir PC: ${antiprivado ? 'ativo' : 'desativado'}
Proibir Ligação: ${antiCall ? 'ativo' : 'desativado'}`.trim();

  await m.reply(info);
};

handler.command = /^status$/i;
handler.rowner = true;
export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  console.log({ ms, h, m });
  return `${h.toString().padStart(2, '0')}h${m.toString().padStart(2, '0')}m`;
}
