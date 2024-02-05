import {unwatchFile, watchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';

global.botnumber = '';
global.owner = [['5512988878268', 'Ryan Palma', true]];
global.numberexample = ['5511999999999'];
global.prems = ['5511999999999'];

global.packname = 'Sticker';
global.author = 'Cordy Bot';
global.titulowm = 'Cordy Bot';
global.wm = 'Cordy Bot';
global.wait = 'Carregando...';

global.mods = [];

//* *******Tiempo***************
global.d = new Date(new Date + 3600000);
global.locale = 'pt-BR';
global.gt = 'Cordy Bot';
global.md = 'https://github.com/ryahpalma/cordy-bot';
global.nomorown = '5511999999999';
//* ************************

const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright('Update \'config.js\''));
  import(`${file}?update=${Date.now()}`);
});
