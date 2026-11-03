/* Copiar para a área de transferência e compartilhar pelo sistema. */

export async function copiarTexto(texto) {
    try {
        await navigator.clipboard.writeText(texto);
        return true;
    } catch {
        /* navegador sem permissão ou sem HTTPS: tenta o método antigo */
    }
    const campo = document.createElement('textarea');
    campo.value = texto;
    campo.setAttribute('readonly', '');
    campo.style.cssText = 'position:fixed;opacity:0;top:0';
    document.body.append(campo);
    campo.select();
    let copiou = false;
    try { copiou = document.execCommand('copy'); } catch { copiou = false; }
    campo.remove();
    return copiou;
}

/** Devolve 'compartilhado', 'cancelado', 'copiado' ou 'falhou'. */
export async function compartilhar({ titulo, texto, url }) {
    if (navigator.share) {
        try {
            await navigator.share({ title: titulo, text: texto, url });
            return 'compartilhado';
        } catch (erro) {
            if (erro?.name === 'AbortError') return 'cancelado';
            /* outro erro: cai na cópia do link */
        }
    }
    return (await copiarTexto(url)) ? 'copiado' : 'falhou';
}
