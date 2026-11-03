/* Abertura: o céu desenha um "15" em constelação; ao tocar no botão, as estrelas se
   afastam do centro e revelam o convite. O canvas só anima enquanto está na tela. */

import { menosMovimento } from '../compartilhado/movimento.js';

/* Traços do número em unidades de 0 a 100. */
const TRACOS = [
    [[16, 26], [28, 14], [28, 86]],
    [[84, 14], [52, 14], [48, 46], [62, 41], [80, 47], [86, 64], [76, 82], [58, 87], [44, 78]],
];

function criarEstrelas(largura, altura) {
    const quantidade = Math.min(170, Math.round((largura * altura) / 5200));
    return Array.from({ length: quantidade }, () => ({
        x: Math.random() * largura,
        y: Math.random() * altura,
        r: 0.4 + Math.random() * Math.random() * 1.5,
        fase: Math.random() * 6.28,
    }));
}

export function abrirConstelacao(cortina, botao, aoAbrir) {
    const canvas = cortina.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const reduzir = menosMovimento();
    const escala = Math.min(devicePixelRatio || 1, 2);
    let largura; let altura; let estrelas; let pontos; let quadro;
    let inicio = performance.now();
    let abrindo = null;

    function medir() {
        largura = cortina.clientWidth;
        altura = cortina.clientHeight;
        canvas.width = largura * escala;
        canvas.height = altura * escala;
        ctx.setTransform(escala, 0, 0, escala, 0, 0);
        estrelas = criarEstrelas(largura, altura);
        const lado = Math.min(largura * 0.76, altura * 0.46);
        const ox = (largura - lado) / 2;
        const oy = altura * 0.4 - lado / 2;
        pontos = TRACOS.map((traco) => traco.map(([x, y]) => [ox + (x / 100) * lado, oy + (y / 100) * lado]));
    }

    function desenhar(agora) {
        const t = agora - inicio;
        const saida = abrindo === null ? 0 : Math.min(1, (agora - abrindo) / 1100);
        const avanco = saida * saida;
        const cx = largura / 2;
        const cy = altura * 0.4;
        ctx.clearRect(0, 0, largura, altura);

        estrelas.forEach((s) => {
            const brilho = reduzir ? 0.7 : 0.45 + 0.4 * Math.sin(t / 900 + s.fase);
            const x = s.x + (s.x - cx) * avanco * 2.6;
            const y = s.y + (s.y - cy) * avanco * 2.6;
            ctx.globalAlpha = Math.max(0, brilho) * (1 - saida);
            ctx.fillStyle = '#f4ead8';
            ctx.beginPath();
            ctx.arc(x, y, s.r * (1 + avanco * 2), 0, 6.3);
            ctx.fill();
        });

        const total = pontos.reduce((soma, traco) => soma + traco.length - 1, 0);
        const desenho = reduzir ? 1 : Math.min(1, t / 2600);
        let segmentosVistos = desenho * total;
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#e8d5b5';
        pontos.forEach((traco) => {
            for (let i = 0; i < traco.length; i += 1) {
                const [x, y] = traco[i];
                if (i > 0 && segmentosVistos > 0) {
                    const parcial = Math.min(1, segmentosVistos);
                    const [ax, ay] = traco[i - 1];
                    ctx.globalAlpha = 0.55 * (1 - saida);
                    ctx.beginPath();
                    ctx.moveTo(ax, ay);
                    ctx.lineTo(ax + (x - ax) * parcial, ay + (y - ay) * parcial);
                    ctx.stroke();
                    segmentosVistos -= 1;
                }
                if (i === 0 || segmentosVistos >= 0) {
                    ctx.globalAlpha = 1 - saida;
                    ctx.fillStyle = '#fff6e6';
                    ctx.beginPath();
                    ctx.arc(x, y, 2.4, 0, 6.3);
                    ctx.fill();
                    ctx.globalAlpha = 0.2 * (1 - saida);
                    ctx.beginPath();
                    ctx.arc(x, y, 7, 0, 6.3);
                    ctx.fill();
                }
            }
        });
        ctx.globalAlpha = 1;

        if (saida < 1 && !(reduzir && abrindo === null)) quadro = requestAnimationFrame(desenhar);
    }

    function abrir() {
        botao.disabled = true;
        window.removeEventListener('resize', aoRedimensionar);
        if (reduzir) { concluir(); return; }
        abrindo = performance.now();
        document.querySelector('.capa')?.classList.add('revelada');
        cortina.classList.add('abrindo');
        aoAbrir();
        setTimeout(concluir, 1300);
    }

    function concluir() {
        cancelAnimationFrame(quadro);
        aoAbrir();
        cortina.remove();
        document.querySelector('.capa')?.classList.add('revelada');
        document.querySelector('.capa__nome')?.setAttribute('tabindex', '-1');
        document.querySelector('.capa__nome')?.focus({ preventScroll: true });
    }

    function aoRedimensionar() {
        medir();
        if (reduzir) desenhar(performance.now());
    }

    medir();
    quadro = requestAnimationFrame(desenhar);
    window.addEventListener('resize', aoRedimensionar);
    botao.addEventListener('click', abrir);
    botao.focus({ preventScroll: true });

    /* Link direto para uma seção (#confirmar) não passa pela abertura. */
    if (location.hash) {
        const destino = location.hash;
        concluir();
        document.querySelector(destino)?.scrollIntoView();
    }
}
