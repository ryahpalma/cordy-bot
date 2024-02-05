import {generateWAMessageFromContent} from '@whiskeysockets/baileys';
import os from 'os';
import util from 'util';
import sizeFormatter from 'human-readable';
import MessageType from '@whiskeysockets/baileys';
import fs from 'fs';
import {performance} from 'perf_hooks';

const handler = async (m, {conn, usedPrefix}) => {
  const _uptime = process.uptime() * 1000;
  const uptime = clockString(_uptime);
  const totalusrReg = Object.values(global.db.data.users).filter((user) => user.registered == true).length;
  const totalusr = Object.keys(global.db.data.users).length;
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
  const groups = chats.filter(([id]) => id.endsWith('@g.us'));
  const used = process.memoryUsage();
  const {
    restrict,
    antiCall,
    antiprivado,
  } = global.db.data.settings[conn.user.jid] || {};
  const {autoread, gconly, pconly, self} = global.opts || {};
  const old = performance.now();
  const neww = performance.now();
  const rtime = (neww - old).toFixed(7);
  const info = `
Ping: ${rtime}
Uptime: ${uptime}
Prefixo: ${usedPrefix}
Modo: ${self ? 'privado' : 'público'}
Usuários registrados: ${totalusrReg}
Total de usuários: ${totalusr}
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

handler.command = /^ping$/i;
export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  console.log({ ms, h, m });
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}h`;
}
