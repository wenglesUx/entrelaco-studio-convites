/* Visualização ampliada: teclado (setas e Esc), toque (arrastar) e foco preso no
   <dialog>, que devolve o foco ao botão de origem quando fecha. */

import { esc } from './nucleo.js';

export function criarGaleria(fotos) {
    const janela = document.createElement('dialog');
    janela.className = 'lb';
    janela.setAttribute('aria-label', 'Fotografia ampliada');
    janela.innerHTML = `
        <button type="button" class="lb__fechar" aria-label="Fechar">×</button>
        <button type="button" class="lb__seta lb__seta--anterior" aria-label="Foto anterior">‹</button>
        <figure class="lb__figura">
            <img class="lb__imagem" alt="">
            <figcaption class="lb__legenda"></figcaption>
        </figure>
        <button type="button" class="lb__seta lb__seta--proxima" aria-label="Próxima foto">›</button>
        <p class="lb__contador" aria-live="polite"></p>`;
    document.body.append(janela);

    const imagem = janela.querySelector('.lb__imagem');
    const legenda = janela.querySelector('.lb__legenda');
    const contador = janela.querySelector('.lb__contador');
    let atual = 0;

    const pre = (i) => { new Image().src = fotos[(i + fotos.length) % fotos.length].src; };

    function mostrar(indice) {
        atual = (indice + fotos.length) % fotos.length;
        const foto = fotos[atual];
        imagem.src = foto.src;
        imagem.alt = foto.alt ?? '';
        legenda.innerHTML = esc(foto.legenda ?? '');
        contador.textContent = `Foto ${atual + 1} de ${fotos.length}`;
        pre(atual + 1);
        pre(atual - 1);
    }

    function abrir(indice = 0) {
        mostrar(indice);
        janela.showModal();
        document.documentElement.classList.add('lb-aberta');
    }

    janela.addEventListener('close', () => document.documentElement.classList.remove('lb-aberta'));
    janela.querySelector('.lb__fechar').addEventListener('click', () => janela.close());
    janela.querySelector('.lb__seta--anterior').addEventListener('click', () => mostrar(atual - 1));
    janela.querySelector('.lb__seta--proxima').addEventListener('click', () => mostrar(atual + 1));
    janela.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') mostrar(atual - 1);
        if (e.key === 'ArrowRight') mostrar(atual + 1);
    });
    janela.addEventListener('click', (e) => { if (e.target === janela) janela.close(); });

    let inicioX = null;
    janela.addEventListener('pointerdown', (e) => { inicioX = e.clientX; });
    janela.addEventListener('pointerup', (e) => {
        if (inicioX === null) return;
        const distancia = e.clientX - inicioX;
        inicioX = null;
        if (Math.abs(distancia) > 48) mostrar(atual + (distancia < 0 ? 1 : -1));
    });

    return { abrir };
}
