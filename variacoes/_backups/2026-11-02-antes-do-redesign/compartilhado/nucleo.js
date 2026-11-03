/* Utilidades comuns a todos os convites. Nada aqui define aparência. */

export const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
export const $$ = (seletor, raiz = document) => [...raiz.querySelectorAll(seletor)];

/** Escapa texto para uso seguro dentro de templates HTML. */
export function esc(valor) {
    return String(valor ?? '').replace(/[&<>"']/g, (c) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
}

/** `cores` do config.js viram variáveis CSS: { fundo: '#000' } → --fundo: #000 */
export function aplicarCores(cores = {}) {
    Object.entries(cores).forEach(([nome, valor]) => {
        document.documentElement.style.setProperty(`--${nome}`, valor);
    });
}

/** Mantém título e descrição da aba alinhados ao config.js. */
export function aplicarSeo(seo = {}) {
    if (seo.titulo) document.title = seo.titulo;
    if (seo.descricao) $('meta[name="description"]')?.setAttribute('content', seo.descricao);
}

/** Um recurso só some quando o config diz `false` explicitamente. */
export const ativo = (config, recurso) => config.recursos?.[recurso] !== false;

/** Formata no fuso do evento: quem abre o convite de outro estado vê a hora do local da festa. */
export function formatarData(iso, fuso, opcoes) {
    return new Intl.DateTimeFormat('pt-BR', { timeZone: fuso, ...opcoes }).format(new Date(iso));
}

export function iniciais(texto = '') {
    return texto.charAt(0).toLocaleUpperCase('pt-BR') + texto.slice(1);
}

let temporizadorAviso;
export function mostrarAviso(texto) {
    let aviso = $('.aviso-global');
    if (!aviso) {
        aviso = document.createElement('div');
        aviso.className = 'aviso-global';
        aviso.setAttribute('role', 'status');
        aviso.setAttribute('aria-live', 'polite');
        document.body.append(aviso);
    }
    aviso.textContent = texto;
    aviso.classList.add('aberto');
    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(() => aviso.classList.remove('aberto'), 3200);
}
