/* Tudo que anima consulta esta preferência antes. */

export const menosMovimento = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Adiciona `.visivel` quando o elemento entra na tela (uma vez só). */
export function revelarAoRolar(elementos, opcoes = { threshold: 0.2 }) {
    if (menosMovimento() || !('IntersectionObserver' in window)) {
        elementos.forEach((el) => el.classList.add('visivel'));
        return;
    }
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            entrada.target.classList.add('visivel');
            observador.unobserve(entrada.target);
        });
    }, opcoes);
    elementos.forEach((el) => observador.observe(el));
}
