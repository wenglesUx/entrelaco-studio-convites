// Servidor local sem dependências. Na raiz do projeto:  node variacoes/servir.mjs [porta]
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const porta = Number(process.argv[2] ?? 4173);
const tipos = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
    '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.png': 'image/png', '.avif': 'image/avif', '.woff2': 'font/woff2', '.ics': 'text/calendar',
};

createServer((pedido, resposta) => {
    const caminho = decodeURIComponent(new URL(pedido.url, 'http://local').pathname);
    let arquivo = normalize(join(raiz, caminho));
    if (arquivo !== raiz && !arquivo.startsWith(raiz + sep)) {
        resposta.writeHead(403).end();
        return;
    }
    if (existsSync(arquivo) && statSync(arquivo).isDirectory()) {
        if (!caminho.endsWith('/')) {
            resposta.writeHead(301, { Location: `${caminho}/` }).end();
            return;
        }
        arquivo = join(arquivo, 'index.html');
    }
    if (!existsSync(arquivo)) {
        resposta.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Não encontrado');
        return;
    }
    resposta.writeHead(200, {
        'Content-Type': tipos[extname(arquivo).toLowerCase()] ?? 'application/octet-stream',
        'Cache-Control': 'no-cache',
    });
    createReadStream(arquivo).pipe(resposta);
}).listen(porta, () => {
    console.log(`Casamento:          http://localhost:${porta}/`);
    console.log(`Aniversário adulto: http://localhost:${porta}/variacoes/01-aniversario-adulto/`);
    console.log(`15 anos:            http://localhost:${porta}/variacoes/02-festa-15-anos/`);
    console.log(`Infantil Safari:    http://localhost:${porta}/variacoes/03-aniversario-infantil/`);
    console.log(`Elo, Verão na Itália: http://localhost:${porta}/variacoes/04-elo-verao-na-italia/`);
});
