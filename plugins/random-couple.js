import fetch from 'node-fetch';
const handler = async (m, {
  conn,
  command,
}) => {
  const res = await fetch(`https://api.lolhuman.xyz/api/random/ppcouple?apikey=${lolkeysapi}`);
  if (res.status != 200) throw await res.text();
  const json = await res.json();
  if (!json.status) throw json;
  conn.sendFile(m.chat, json.result.female, 'image.jpg', '', m);
  conn.sendFile(m.chat, json.result.male, 'image.jpg', '', m);
};
handler.help = ['couple'];
handler.tags = ['internet'];
handler.command = /^couple$/i;
export default handler;
