import {performance} from 'perf_hooks';

const handler = async (m, {conn, usedPrefix}) => {
  const memory = (Object.values(process.memoryUsage()).reduce((acc, curr) => acc + curr, 0) / (1024 * 1024)).toFixed(2);
  const _uptime = process.uptime() * 1000;
  const uptime = clockString(_uptime);
  const oldPerformance = performance.now();
  const newPerformance = performance.now();
  const responseTime = (newPerformance - oldPerformance).toFixed(2);
  const info = `
Resposta: ${responseTime}s
Funcionando: ${uptime}
Utilizando: ${memory}MB
Prefixo: ${usedPrefix}`.trim();

  await m.reply(info);
};

handler.command = /^ping$/i;
export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  console.log({ms, h, m});
  return `${h.toString().padStart(2, '0')}h${m.toString().padStart(2, '0')}m`;
}
