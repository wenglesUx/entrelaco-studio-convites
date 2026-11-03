/* Ilustrações do Safari, desenhadas à mão em SVG. Sem dependências de DOM, então
   também servem para gerar as imagens da galeria. Cada animal é um retrato com a
   base reta, feito para surgir de trás de moitas e colinas. */

const C = {
    oliva: '#5f6b38', olivaEscuro: '#3f4a28', salvia: '#a9b58c', areia: '#ecdcb9',
    terracota: '#c4673f', terracotaEscuro: '#9c4a2a', amarelo: '#efc66a', ouro: '#d9a04a',
    marfim: '#fbf5e8', tinta: '#35331f', cinza: '#aab09d', cinzaEscuro: '#8c937f',
};

const svg = (viewBox, conteudo, classe = '') =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" class="${classe}" aria-hidden="true" focusable="false">${conteudo}</svg>`;

const olhos = (xe, xd, y, r = 5) => `
    <g class="olhos">
        <circle cx="${xe}" cy="${y}" r="${r}" fill="${C.tinta}"/><circle cx="${xd}" cy="${y}" r="${r}" fill="${C.tinta}"/>
        <circle cx="${xe + 1.6}" cy="${y - 1.8}" r="${r * 0.32}" fill="#fff"/><circle cx="${xd + 1.6}" cy="${y - 1.8}" r="${r * 0.32}" fill="#fff"/>
    </g>`;

function leao() {
    const juba = Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const cx = (100 + Math.cos(a) * 64).toFixed(1);
        const cy = (112 + Math.sin(a) * 64).toFixed(1);
        return `<circle cx="${cx}" cy="${cy}" r="27"/>`;
    }).join('');
    return svg('0 0 200 220', `
        <g fill="${C.terracota}">${juba}<circle cx="100" cy="112" r="66"/><rect x="42" y="150" width="116" height="70"/></g>
        <circle cx="60" cy="66" r="16" fill="${C.ouro}"/><circle cx="60" cy="66" r="8" fill="${C.terracotaEscuro}"/>
        <circle cx="140" cy="66" r="16" fill="${C.ouro}"/><circle cx="140" cy="66" r="8" fill="${C.terracotaEscuro}"/>
        <ellipse cx="100" cy="116" rx="51" ry="49" fill="${C.amarelo}"/>
        <ellipse cx="100" cy="138" rx="28" ry="20" fill="${C.marfim}"/>
        <circle cx="66" cy="128" r="9" fill="${C.terracota}" opacity=".3"/><circle cx="134" cy="128" r="9" fill="${C.terracota}" opacity=".3"/>
        ${olhos(80, 120, 104)}
        <path d="M89 124q11-6 22 0q-2 11-11 14q-9-3-11-14z" fill="${C.terracotaEscuro}"/>
        <path d="M100 138v7m0 0q-9 9-17 2m17-2q9 9 17 2" fill="none" stroke="${C.tinta}" stroke-width="2.6" stroke-linecap="round"/>`, 'animal animal--leao');
}

function girafa() {
    const manchas = [[104, 150, 15, 12], [132, 186, 17, 14], [98, 212, 17, 14], [130, 246, 18, 14], [92, 268, 18, 14], [136, 292, 18, 12], [116, 118, 10, 9]]
        .map(([cx, cy, rx, ry], i) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${i * 37} ${cx} ${cy})"/>`).join('');
    return svg('0 0 200 310', `
        <path d="M84 96C78 170 68 240 58 310H170C160 240 152 170 144 96z" fill="${C.amarelo}"/>
        <g fill="${C.ouro}">${manchas}</g>
        <path d="M84 104l-4 200" stroke="${C.terracotaEscuro}" stroke-width="0" />
        <g fill="${C.terracotaEscuro}"><circle cx="94" cy="16" r="8"/><circle cx="130" cy="16" r="8"/></g>
        <path d="M94 18v26M130 18v26" stroke="${C.ouro}" stroke-width="7" stroke-linecap="round"/>
        <ellipse cx="60" cy="52" rx="24" ry="11" transform="rotate(-18 60 52)" fill="${C.amarelo}"/>
        <ellipse cx="60" cy="52" rx="13" ry="5" transform="rotate(-18 60 52)" fill="${C.terracota}" opacity=".55"/>
        <ellipse cx="164" cy="52" rx="24" ry="11" transform="rotate(18 164 52)" fill="${C.amarelo}"/>
        <ellipse cx="164" cy="52" rx="13" ry="5" transform="rotate(18 164 52)" fill="${C.terracota}" opacity=".55"/>
        <path d="M72 66C72 34 152 34 152 66C156 92 146 124 112 124C78 124 68 92 72 66z" fill="${C.amarelo}"/>
        <ellipse cx="112" cy="102" rx="33" ry="22" fill="#f6e2ad"/>
        <circle cx="100" cy="96" r="3.2" fill="${C.terracotaEscuro}"/><circle cx="124" cy="96" r="3.2" fill="${C.terracotaEscuro}"/>
        <path d="M98 108q14 11 28 0" fill="none" stroke="${C.tinta}" stroke-width="2.6" stroke-linecap="round"/>
        ${olhos(90, 134, 66)}`, 'animal animal--girafa');
}

function elefante() {
    return svg('0 0 200 220', `
        <path d="M60 56C18 34 2 78 8 112c6 34 32 50 56 38z" fill="${C.cinzaEscuro}"/>
        <path d="M58 72C34 58 20 84 24 108c4 22 22 32 36 24z" fill="#dcae97"/>
        <path d="M140 56c42-22 58 22 52 56-6 34-32 50-56 38z" fill="${C.cinzaEscuro}"/>
        <path d="M142 72c24-14 38 12 34 36-4 22-22 32-36 24z" fill="#dcae97"/>
        <path d="M100 30c-40 0-58 34-54 72 2 26 12 50 28 66h52c16-16 26-40 28-66 4-38-14-72-54-72z" fill="${C.cinza}"/>
        <path d="M100 118c-17 0-24 12-22 28l6 74h32l6-74c2-16-5-28-22-28z" fill="${C.cinza}"/>
        <path d="M81 164q19 7 38 0M83 180q17 6 34 0M84 196q16 5 32 0" fill="none" stroke="${C.cinzaEscuro}" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M70 148c-1 16-8 24-18 28 4-12 4-22 2-32zM130 148c1 16 8 24 18 28-4-12-4-22-2-32z" fill="${C.marfim}"/>
        <circle cx="66" cy="118" r="9" fill="${C.terracota}" opacity=".26"/><circle cx="134" cy="118" r="9" fill="${C.terracota}" opacity=".26"/>
        <path d="M88 32q6-16 12 0q6-14 12 0" fill="none" stroke="${C.tinta}" stroke-width="3" stroke-linecap="round"/>
        ${olhos(76, 124, 96)}`, 'animal animal--elefante');
}

function zebra() {
    return svg('0 0 200 240', `
        <path d="M66 30l-12-26c20 2 32 12 34 30zM134 30l12-26c-20 2-32 12-34 30z" fill="${C.marfim}"/>
        <path d="M68 28l-8-16c10 3 19 9 22 18zM132 28l8-16c-10 3-19 9-22 18z" fill="${C.terracota}" opacity=".5"/>
        <path d="M100 6c-8 0-11 10-11 24h22c0-14-3-24-11-24z" fill="${C.tinta}"/>
        <path d="M100 24c-34 0-48 26-46 58 2 28 12 44 16 78 1 20 2 40 2 80h56c0-40 1-60 2-80 4-34 14-50 16-78 2-32-12-58-46-58z" fill="${C.marfim}"/>
        <g fill="${C.tinta}">
            <path d="M100 24c-8 0-13 1-18 3 2 14 8 26 18 32 10-6 16-18 18-32-5-2-10-3-18-3z"/>
            <path d="M55 72c12 2 22 8 28 18-12 2-22-2-29-9zM145 72c-12 2-22 8-28 18 12 2 22-2 29-9z"/>
            <path d="M60 108c10 0 18 4 24 12-10 3-18 1-22-3zM140 108c-10 0-18 4-24 12 10 3 18 1 22-3z"/>
            <path d="M68 142c6 0 14 2 18 8-7 3-14 2-17-2zM132 142c-6 0-14 2-18 8 7 3 14 2 17-2z"/>
        </g>
        <path d="M72 158c-2 34 2 82 2 82h52s4-48 2-82c-6-6-16-10-28-10s-22 4-28 10z" fill="#6f6d57"/>
        <ellipse cx="88" cy="182" rx="5" ry="7" fill="${C.tinta}"/><ellipse cx="112" cy="182" rx="5" ry="7" fill="${C.tinta}"/>
        <path d="M84 206q16 10 32 0" fill="none" stroke="${C.tinta}" stroke-width="3" stroke-linecap="round"/>
        ${olhos(72, 128, 94, 5.5)}`, 'animal animal--zebra');
}

function macaco() {
    return svg('0 0 200 220', `
        <rect x="46" y="160" width="108" height="60" rx="30" fill="#7b4f31"/>
        <circle cx="30" cy="104" r="26" fill="#7b4f31"/><circle cx="30" cy="104" r="14" fill="#e6c195"/>
        <circle cx="170" cy="104" r="26" fill="#7b4f31"/><circle cx="170" cy="104" r="14" fill="#e6c195"/>
        <circle cx="100" cy="96" r="74" fill="#7b4f31"/>
        <path d="M100 18q-4-16 12-16q-8 8 0 18z" fill="#7b4f31"/>
        <path d="M100 82C86 52 44 62 46 96c0 12 6 20 12 26-2 26 18 44 42 44s44-18 42-44c6-6 12-14 12-26 2-34-40-44-54-14z" fill="#e6c195"/>
        <circle cx="66" cy="126" r="9" fill="${C.terracota}" opacity=".32"/><circle cx="134" cy="126" r="9" fill="${C.terracota}" opacity=".32"/>
        <circle cx="93" cy="118" r="2.6" fill="${C.tinta}"/><circle cx="107" cy="118" r="2.6" fill="${C.tinta}"/>
        <path d="M72 134q28 22 56 0" fill="none" stroke="${C.tinta}" stroke-width="3" stroke-linecap="round"/>
        ${olhos(76, 124, 98, 5.5)}`, 'animal animal--macaco');
}

export const animais = { leao, girafa, elefante, zebra, macaco };

export const moita = (variante = 0) => {
    const tom = [C.oliva, C.olivaEscuro, '#73803f'][variante % 3];
    const claro = [C.salvia, '#7f8d58', '#b9c295'][variante % 3];
    return svg('0 0 200 124', `
        <g fill="${tom}">
            <circle cx="46" cy="78" r="44"/><circle cx="100" cy="56" r="56"/><circle cx="156" cy="78" r="44"/>
            <rect x="4" y="80" width="192" height="44" rx="6"/>
        </g>
        <g fill="none" stroke="${claro}" stroke-width="5" stroke-linecap="round">
            <path d="M58 58q9-14 22-16M112 28q12 2 18 14M38 92q4-10 14-14M150 74q10 0 16 10M92 86q8-8 18-6"/>
        </g>`, 'moita');
};

export const acacia = () => svg('0 0 320 240', `
    <path d="M152 240c4-40 2-70-6-96l-46-40 8-6 42 30 4-46h12l2 50 42-34 8 7-46 44c-6 26-8 56-2 91z" fill="${C.olivaEscuro}"/>
    <path d="M20 84c-6-26 34-40 56-30 12-30 62-44 92-26 24-16 74-6 86 22 28-6 58 14 44 36-12 18-60 10-92 8-40 4-96 10-126 6-26 6-56 4-60-16z" fill="${C.oliva}"/>
    <path d="M60 74c30-10 70-14 98-12M180 56c26-4 56 0 76 10" fill="none" stroke="${C.salvia}" stroke-width="4" stroke-linecap="round" opacity=".55"/>`, 'acacia');

export const pegada = () => svg('0 0 120 120', `
    <path d="M60 50c-22 0-40 24-38 42 2 16 20 16 38 12 18 4 36 4 38-12 2-18-16-42-38-42z"/>
    <ellipse cx="22" cy="46" rx="11" ry="15" transform="rotate(-24 22 46)"/>
    <ellipse cx="46" cy="24" rx="11" ry="16" transform="rotate(-8 46 24)"/>
    <ellipse cx="76" cy="24" rx="11" ry="16" transform="rotate(8 76 24)"/>
    <ellipse cx="100" cy="46" rx="11" ry="15" transform="rotate(24 100 46)"/>`, 'pegada');

export const folhagem = (classe = '') => svg('0 0 180 240', `
    <g fill="none" stroke-linecap="round">
        <path d="M60 240C66 170 96 90 150 16" stroke="${C.olivaEscuro}" stroke-width="5"/>
    </g>
    <g fill="${C.oliva}">
        <path d="M70 196C34 190 14 170 8 142c34 2 56 22 62 54z"/><path d="M84 150C48 134 34 108 36 80c30 10 50 36 48 70z"/>
        <path d="M106 106C76 86 68 58 76 32c26 16 38 44 30 74z"/>
    </g>
    <g fill="${C.salvia}">
        <path d="M74 186c30-20 58-22 84-10-20 22-54 26-84 10z"/><path d="M92 138c28-20 54-22 78-12-18 22-50 26-78 12z"/>
        <path d="M114 94c20-22 38-28 60-24-12 22-36 32-60 24z"/>
    </g>`, `folhagem ${classe}`);

/* Cenas usadas como "fotografias" demonstrativas da galeria. */
export const cenas = {
    leao: { fundo: C.amarelo, chao: C.oliva, animal: leao },
    girafa: { fundo: C.salvia, chao: C.olivaEscuro, animal: girafa },
    elefante: { fundo: '#e7b48f', chao: C.oliva, animal: elefante },
    zebra: { fundo: C.oliva, chao: C.olivaEscuro, animal: zebra },
    macaco: { fundo: C.areia, chao: C.terracota, animal: macaco },
};

export function cenaSvg(nome) {
    const { fundo, chao, animal } = cenas[nome];
    const interno = (texto) => texto.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
    const marcado = animal();
    const caixa = marcado.match(/viewBox="0 0 (\d+) (\d+)"/);
    const escala = 340 / Number(caixa[2]);
    const largura = Number(caixa[1]) * escala;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480">
        <rect width="480" height="480" fill="${fundo}"/>
        <circle cx="372" cy="104" r="58" fill="${C.marfim}" opacity=".55"/>
        <g transform="translate(${(480 - largura) / 2} 70) scale(${escala})">${interno(marcado)}</g>
        <path d="M0 402c80-34 170-26 240-8s170 18 240-14v100H0z" fill="${chao}"/>
    </svg>`;
}
