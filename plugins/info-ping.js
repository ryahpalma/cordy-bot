import {performance} from 'perf_hooks';

const handler = async (m, {conn, usedPrefix}) => {
  const oldPerformance = performance.now();
  const newPerformance = performance.now();
  const responseTime = (newPerformance - oldPerformance).toFixed(2);
  const info = `Resposta: ${responseTime}s`.trim();

  await m.reply(info);
};

handler.command = /^ping$/i;
export default handler;
