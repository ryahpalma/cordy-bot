const handler = (m) => m;

const goodMorningMessages = [
  'Tenha um ótimo dia!',
  'Que seu dia seja cheio de alegria!',
  'Bom dia! Aproveite cada momento!',
  'Bom dia! Já fez seus cogumelos hoje?',
  'Bom dia! Um contaminante de cada vez...',
];

const goodAfternoonMessages = [
  'Tenha uma tarde maravilhosa!',
  'Que sua tarde seja produtiva!',
  'Desejo-lhe uma tarde cheia de boas energias!',
];

const goodEveningMessages = [
  'Tenha uma noite tranquila e repousante!',
  'Que sua noite seja repleta de paz e serenidade!',
  'Desejo-lhe uma noite cheia de bons sonhos!',
];

handler.before = async (m) => {
  if (/^(bom\s+dia)$/i.test(m.text)) {
    m.reply(goodMorningMessages[Math.floor(Math.random() * goodMorningMessages.length)]);
  } else if (/^(boa\s+tarde)$/i.test(m.text)) {
    m.reply(goodAfternoonMessages[Math.floor(Math.random() * goodAfternoonMessages.length)]);
  } else if (/^(boa\s+noite)$/i.test(m.text)) {
    m.reply(goodEveningMessages[Math.floor(Math.random() * goodEveningMessages.length)]);
  }
};

export default handler;
