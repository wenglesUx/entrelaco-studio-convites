/* Confirmação de presença por WhatsApp. Não há backend: a resposta só chega ao
   organizador quando o convidado envia a mensagem que abrimos pronta no app.

   Cada convite escreve o próprio formulário no HTML, seguindo estas convenções:
     name="nome"                   obrigatório
     name="presenca" (sim | nao)   obrigatório
     [data-erro="campo"]           onde aparece o erro daquele campo
     [data-so-presenca]            só aparece quando a resposta é "sim"
     [data-contador]               seletor numérico com botões − e +              */

import { $, $$, mostrarAviso } from './nucleo.js';
import { copiarTexto } from './compartilhar.js';

/** Aceita qualquer formatação; devolve só dígitos, ou '' se não for um número usável. */
export function normalizarWhatsapp(numero) {
    const digitos = String(numero ?? '').replace(/\D/g, '');
    return digitos.length >= 10 && digitos.length <= 15 ? digitos : '';
}

export function linkWhatsapp(numero, mensagem) {
    const destino = normalizarWhatsapp(numero);
    if (!destino) return null;
    return `https://wa.me/${destino}?text=${encodeURIComponent(mensagem)}`;
}

export function ligarContadores(raiz) {
    $$('[data-contador]', raiz).forEach((contador) => {
        const campo = $('input', contador);
        const min = Number(campo.min);
        const max = Number(campo.max);
        const menos = $('[data-menos]', contador);
        const mais = $('[data-mais]', contador);
        const definir = (valor) => {
            const numero = Number.isFinite(valor) ? Math.trunc(valor) : min;
            campo.value = Math.min(max, Math.max(min, numero));
            menos.disabled = Number(campo.value) <= min;
            mais.disabled = Number(campo.value) >= max;
        };
        menos.addEventListener('click', () => definir(Number(campo.value) - 1));
        mais.addEventListener('click', () => definir(Number(campo.value) + 1));
        campo.addEventListener('change', () => definir(Number(campo.value)));
        definir(Number(campo.value));
    });
}

function validar(dados, regrasExtras) {
    const erros = {};
    if (dados.nome.replace(/[^\p{L}]/gu, '').length < 2) erros.nome = 'Informe seu nome.';
    if (!dados.presenca) erros.presenca = 'Escolha uma das opções.';
    return { ...erros, ...regrasExtras?.(dados) };
}

function mostrarErros(form, erros) {
    $$('[data-erro]', form).forEach((caixa) => {
        const campo = caixa.dataset.erro;
        const mensagem = erros[campo] ?? '';
        caixa.textContent = mensagem;
        caixa.hidden = !mensagem;
        form.elements[campo]?.forEach?.((opcao) => opcao.setAttribute('aria-invalid', String(Boolean(mensagem))));
        form.elements[campo]?.setAttribute?.('aria-invalid', String(Boolean(mensagem)));
    });
    const primeiro = Object.keys(erros)[0];
    if (!primeiro) return;
    const alvo = form.elements[primeiro];
    (alvo?.focus ? alvo : alvo?.[0])?.focus();
}

/**
 * @param {HTMLFormElement} form
 * @param {HTMLElement} painel onde aparece o resultado, com:
 *   [data-titulo], [data-texto], [data-link-whatsapp], [data-demo], [data-mensagem],
 *   [data-copiar-mensagem], [data-alterar]
 * @param {object} opcoes
 * @param {string} opcoes.whatsapp número configurado
 * @param {(dados)=>string} opcoes.montarMensagem texto enviado ao organizador
 * @param {(dados)=>{titulo, texto}} opcoes.resultado textos exibidos ao convidado
 * @param {(dados)=>object} [opcoes.validar] regras próprias do convite
 */
export function iniciarRsvp(form, painel, opcoes) {
    ligarContadores(form);

    const aoMudarPresenca = () => {
        const vem = form.elements.presenca.value !== 'nao';
        $$('[data-so-presenca]', form).forEach((bloco) => { bloco.hidden = !vem; });
    };
    $$('input[name="presenca"]', form).forEach((opcao) =>
        opcao.addEventListener('change', aoMudarPresenca));
    aoMudarPresenca();

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const bruto = Object.fromEntries(new FormData(form));
        const dados = { ...bruto, nome: String(bruto.nome ?? '').replace(/\s+/g, ' ').trim() };
        const erros = validar(dados, opcoes.validar);
        mostrarErros(form, erros);
        if (Object.keys(erros).length) return;

        const mensagem = opcoes.montarMensagem(dados);
        const link = linkWhatsapp(opcoes.whatsapp, mensagem);
        const { titulo, texto } = opcoes.resultado(dados, Boolean(link));

        $('[data-titulo]', painel).textContent = titulo;
        $('[data-texto]', painel).textContent = texto;
        $('[data-mensagem]', painel).textContent = mensagem;
        $('[data-demo]', painel).hidden = Boolean(link);
        const botaoLink = $('[data-link-whatsapp]', painel);
        botaoLink.hidden = !link;
        if (link) {
            botaoLink.href = link;
            window.open(link, '_blank', 'noopener');
        }

        form.hidden = true;
        painel.hidden = false;
        painel.focus({ preventScroll: true });
        painel.scrollIntoView({ block: 'center' });
    });

    $('[data-copiar-mensagem]', painel)?.addEventListener('click', async () => {
        const copiou = await copiarTexto($('[data-mensagem]', painel).textContent);
        mostrarAviso(copiou ? 'Mensagem copiada' : 'Não foi possível copiar. Selecione o texto.');
    });

    $('[data-alterar]', painel)?.addEventListener('click', () => {
        painel.hidden = true;
        form.hidden = false;
        form.elements.nome.focus();
    });
}
