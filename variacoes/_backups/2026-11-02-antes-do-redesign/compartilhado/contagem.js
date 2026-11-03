/* Contagem regressiva. A apresentação fica por conta de cada convite. */

/** Calcula o tempo restante. Nunca devolve valores negativos. */
export function calcularRestante(alvo, agora = Date.now()) {
    const destino = new Date(alvo).getTime();
    if (Number.isNaN(destino)) return null;
    const total = Math.max(0, Math.floor((destino - agora) / 1000));
    return {
        total,
        dias: Math.floor(total / 86400),
        horas: Math.floor(total / 3600) % 24,
        minutos: Math.floor(total / 60) % 60,
        segundos: total % 60,
        encerrado: destino <= agora,
    };
}

/** Chama `aoAtualizar` agora e a cada segundo. Para sozinha quando o evento chega. */
export function iniciarContagem(alvo, aoAtualizar) {
    let intervalo;
    const passo = () => {
        const restante = calcularRestante(alvo);
        if (!restante) { clearInterval(intervalo); return; }
        aoAtualizar(restante);
        if (restante.encerrado) clearInterval(intervalo);
    };
    intervalo = setInterval(passo, 1000);
    passo();
    return () => clearInterval(intervalo);
}

export const doisDigitos = (n) => String(n).padStart(2, '0');
