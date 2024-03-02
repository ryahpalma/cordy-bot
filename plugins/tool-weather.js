import axios from 'axios';

const handler = async (m, {args}) => {
  if (!args[0]) throw 'Informe o nome da sua cidade';
  try {
    const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`);
    const res = await response;
    const name = res.data.name;
    const temperature = res.data.main.temp;
    let message;
    if (temperature < 18) {
      message = 'credo! é no polo norte essa cidade?';
    } else if (temperature >= 18) {
      message = 'essa cidade tem o nome estranho';
    } else if (temperature > 30) {
      message = 'que horror de cidade, como quem mora lá ainda não derreteu?';
    } else {
      message = 'é o pior lugar de todos até agora! esse lugar deve ser uma estufa só pode';
    }
    m.reply(`Em ${name} está ${temperature}º graus, ${message}`);
  } catch {
    return 'Sem resultados';
  }
};
handler.help = ['weather <city>'];
handler.tags = ['tool'];
handler.command = /^weather$/i;
export default handler;
