/* Geração de arquivo .ics (RFC 5545) e link para o Google Agenda. */

const emUtc = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

function escaparTexto(texto = '') {
    return String(texto)
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\r?\n/g, '\\n');
}

/** Dobra linhas em até 75 bytes, sem partir caracteres acentuados. */
function dobrarLinha(linha) {
    const codificador = new TextEncoder();
    const partes = [];
    let atual = '';
    let bytes = 0;
    for (const caractere of linha) {
        const tamanho = codificador.encode(caractere).length;
        const limite = partes.length ? 74 : 75;
        if (bytes + tamanho > limite) {
            partes.push(atual);
            atual = '';
            bytes = 0;
        }
        atual += caractere;
        bytes += tamanho;
    }
    partes.push(atual);
    return partes.join('\r\n ');
}

/**
 * @param {object} dados
 * @param {string} dados.id identificador estável do convite (repete o UID ao baixar de novo,
 *                          assim a agenda atualiza o evento em vez de duplicá-lo)
 * @param {Array}  dados.eventos [{ titulo, inicio, fim, local, descricao }]
 * @param {number} [dados.lembreteHoras] alerta antes do início
 */
export function gerarIcs({ id, eventos, lembreteHoras = 24 }, agora = new Date()) {
    const linhas = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Entrelaco Studio//Convites digitais//PT-BR',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
    ];
    eventos.forEach((evento, i) => {
        linhas.push(
            'BEGIN:VEVENT',
            `UID:${id}-${i + 1}@convites.entrelaco.studio`,
            `DTSTAMP:${emUtc(agora)}`,
            `DTSTART:${emUtc(evento.inicio)}`,
            `DTEND:${emUtc(evento.fim)}`,
            `SUMMARY:${escaparTexto(evento.titulo)}`,
        );
        if (evento.local) linhas.push(`LOCATION:${escaparTexto(evento.local)}`);
        if (evento.descricao) linhas.push(`DESCRIPTION:${escaparTexto(evento.descricao)}`);
        if (lembreteHoras) {
            linhas.push(
                'BEGIN:VALARM',
                `TRIGGER:-PT${lembreteHoras}H`,
                'ACTION:DISPLAY',
                `DESCRIPTION:${escaparTexto(evento.titulo)}`,
                'END:VALARM',
            );
        }
        linhas.push('END:VEVENT');
    });
    linhas.push('END:VCALENDAR');
    return `${linhas.map(dobrarLinha).join('\r\n')}\r\n`;
}

export function baixarIcs(dados, nomeArquivo = 'convite.ics') {
    const arquivo = new Blob([gerarIcs(dados)], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(arquivo);
    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export function linkGoogleAgenda({ titulo, inicio, fim, local = '', descricao = '' }) {
    const parametros = new URLSearchParams({
        action: 'TEMPLATE',
        text: titulo,
        dates: `${emUtc(inicio)}/${emUtc(fim)}`,
        location: local,
        details: descricao,
    });
    return `https://calendar.google.com/calendar/render?${parametros}`;
}
