/* Liga botões declarados no HTML às funções comuns:
     <button data-acao="copiar" data-copiar="texto" data-aviso="Endereço copiado">
     <button data-acao="compartilhar">
     <button data-acao="calendario">                                             */

import { mostrarAviso } from './nucleo.js';
import { baixarIcs } from './calendario.js';
import { compartilhar, copiarTexto } from './compartilhar.js';

export function ligarAcoes({ calendario, compartilhamento }) {
    document.addEventListener('click', async (evento) => {
        const botao = evento.target.closest('[data-acao]');
        if (!botao) return;

        if (botao.dataset.acao === 'copiar') {
            const copiou = await copiarTexto(botao.dataset.copiar);
            mostrarAviso(copiou ? (botao.dataset.aviso ?? 'Copiado') : 'Não foi possível copiar. Selecione o texto e copie manualmente.');
        }

        if (botao.dataset.acao === 'calendario') {
            baixarIcs(calendario, `${calendario.id}.ics`);
            mostrarAviso('Arquivo da agenda baixado. Abra-o para salvar o evento.');
        }

        if (botao.dataset.acao === 'compartilhar') {
            const url = location.href.split('#')[0];
            const resultado = await compartilhar({ ...compartilhamento, url });
            if (resultado === 'copiado') mostrarAviso('Link do convite copiado');
            if (resultado === 'falhou') mostrarAviso(`Copie o link: ${url}`);
        }
    });
}
