// Gera uma pasta pronta para publicar um convite sozinho, sem depender do resto do projeto.
//   node variacoes/empacotar.mjs 02-festa-15-anos --url https://valentina15.netlify.app
// Resultado em variacoes/dist/<convite>/ : arraste a pasta para app.netlify.com/drop.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = dirname(fileURLToPath(import.meta.url));
const argumentos = process.argv.slice(2);
const pasta = argumentos.find((a) => !a.startsWith('--'));
const indiceUrl = argumentos.indexOf('--url');
const origem = pasta && join(raiz, pasta);

if (!pasta || !existsSync(join(origem, 'config.js'))) {
    console.error('Uso: node variacoes/empacotar.mjs <pasta-do-convite> [--url https://endereco-final]');
    console.error('Pastas: 01-aniversario-adulto, 02-festa-15-anos, 03-aniversario-infantil');
    process.exit(1);
}

const { default: config } = await import(pathToFileURL(join(origem, 'config.js')));
const url = (indiceUrl >= 0 ? argumentos[indiceUrl + 1] : config.seo.siteUrl)?.replace(/\/$/, '') ?? '';
const destino = join(raiz, 'dist', pasta);

rmSync(destino, { recursive: true, force: true });
mkdirSync(destino, { recursive: true });
cpSync(origem, destino, { recursive: true });
cpSync(join(raiz, 'compartilhado'), join(destino, 'compartilhado'), { recursive: true });

// o código compartilhado passa a morar dentro da pasta publicada
readdirSync(destino).filter((n) => /\.(html|js)$/.test(n)).forEach((nome) => {
    const arquivo = join(destino, nome);
    writeFileSync(arquivo, readFileSync(arquivo, 'utf8').replaceAll('../compartilhado/', './compartilhado/'));
});

// título, descrição e cartão de compartilhamento vêm do config.js
const atributo = (texto) => String(texto).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const paginaIndex = join(destino, 'index.html');
let html = readFileSync(paginaIndex, 'utf8');
const trocarMeta = (seletor, valor) => {
    html = html.replace(new RegExp(`(<meta ${seletor} content=")[^"]*(")`), `$1${atributo(valor)}$2`);
};
html = html.replace(/<title>[^<]*<\/title>/, `<title>${atributo(config.seo.titulo)}</title>`);
trocarMeta('name="description"', config.seo.descricao);
trocarMeta('property="og:title"', config.seo.titulo);
trocarMeta('property="og:description"', config.seo.descricao);
if (url) {
    trocarMeta('property="og:image"', `${url}/${config.seo.imagem}`);
    html = html.replace('<meta property="og:type"', `<meta property="og:url" content="${atributo(url)}/">\n    <meta property="og:type"`);
}
writeFileSync(paginaIndex, html);

console.log(`Pronto: ${destino}`);
if (!config.whatsapp) console.warn('Atenção: sem número de WhatsApp, a confirmação fica em modo demonstração.');
if (!url) console.warn('Atenção: sem --url, a imagem de compartilhamento não aparecerá no WhatsApp.');
