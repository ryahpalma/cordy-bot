import {toDataURL} from 'qrcode';

const handler = async (message, {text, conn}) => {
  if (!text) {
    throw 'Envie o texto ou link para transformar em QR Code';
  }

  try {
    const imageDataURL = await generateQRCode(text);
    conn.sendFile(message.chat, imageDataURL, 'qrcode.png', null, message);
  } catch (error) {
    throw 'Ocorreu um erro ao gerar o QR Code. Por favor, tente novamente.';
  }
};

handler.help = ['', 'code'].map((variant) => `qr${variant} <teks>`);
handler.tags = ['tools'];
handler.command = /^qr(code)?$/i;
export default handler;

async function generateQRCode(data) {
  const options = {scale: 8};
  const truncatedData = data.slice(0, 2048);

  return await toDataURL(truncatedData, options);
}
