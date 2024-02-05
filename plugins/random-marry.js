const toM = (a) => '@' + a.split('@')[0];

function handler(m, {groupMetadata}) {
  const participant = groupMetadata.participants.map((v) => v.id);
  let a = participant.getRandom();
  let b;
  do {
    b = participant.getRandom();
  } while (b === a);

  const message = [
    `${toM(a)} e ${toM(b)} formam um lindo casal 💍💓`,
    `${toM(a)} e ${toM(b)} deveriam casar 💍💓`,
    `${toM(a)} e ${toM(b)} é o casal mais lindo que eu já vi 🥰`,
    `E o casal do ano vai para ${toM(a)} e ${toM(b)} 🥰`,
    `Não vou montar casal, porque eu que vou casar com você 😍`,
  ];

  m.reply(message.getRandom(), null, {
    mentions: [a, b],
  });
}

handler.help = ['marry'];
handler.tags = ['fun'];
handler.command = /^marry$/i;
handler.group = true;
export default handler;
