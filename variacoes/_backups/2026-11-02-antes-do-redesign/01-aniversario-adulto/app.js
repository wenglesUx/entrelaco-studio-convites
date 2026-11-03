import config from './config.js';
import { $, $$, aplicarCores, aplicarSeo, ativo, esc, formatarData } from '../compartilhado/nucleo.js';
import { iniciarContagem, calcularRestante } from '../compartilhado/contagem.js';
import { linkGoogleAgenda } from '../compartilhado/calendario.js';
import { linkGoogleMaps, linkWaze } from '../compartilhado/mapas.js';
import { ligarAcoes } from '../compartilhado/acoes.js';
import { iniciarRsvp } from '../compartilhado/rsvp.js';
import { criarGaleria } from '../compartilhado/galeria.js';

const { pessoa, evento, local, apresentacao, dressCode, presentes, rsvp, encerramento } = config;
const f = (opcoes, iso = evento.inicio) => formatarData(iso, evento.fuso, opcoes);

const dia = f({ day: 'numeric' });
const mes = f({ month: 'long' });
const semana = f({ weekday: 'long' });
const hora = f({ hour: 'numeric' }).replace(/\D/g, '');
const prazo = rsvp.prazo ? f({ day: 'numeric', month: 'long' }, rsvp.prazo) : '';
const jaPassou = calcularRestante(evento.inicio).encerrado;

const eventoAgenda = {
    titulo: evento.titulo,
    inicio: evento.inicio,
    fim: evento.fim,
    local: `${local.nome}, ${local.endereco}`,
    descricao: evento.descricao,
};

const capa = `
<header class="capa">
    <h1 class="capa__titulo">
        <span class="capa__numero" aria-hidden="true">${esc(pessoa.idade)}</span>
        <span class="capa__nome">${esc(pessoa.nome)}<br>${esc(pessoa.sobrenome)}</span>
        <span class="so-leitor">faz ${esc(pessoa.idade)} anos</span>
    </h1>
    <p class="capa__data">${esc(dia)} de ${esc(mes)}, às ${esc(hora)}h<br>${esc(local.nome)}</p>
</header>`;

const apresentar = `
<section class="abertura" aria-label="Apresentação">
    <img class="abertura__foto" src="${esc(apresentacao.foto)}" alt="${esc(apresentacao.fotoAlt)}" width="960" height="1200" loading="lazy">
    <div class="abertura__texto">
        <p class="abertura__lide">${esc(apresentacao.abertura)}</p>
        <p>${esc(apresentacao.texto)}</p>
        <p class="abertura__assinatura">${esc(apresentacao.assinatura)}</p>
    </div>
</section>`;

const quando = `
<section class="quando" aria-labelledby="t-quando">
    <h2 id="t-quando" class="so-leitor">Data</h2>
    <p class="quando__dia" aria-hidden="true">${esc(dia)}</p>
    <p class="quando__mes"><span class="so-leitor">${esc(dia)} de </span>${esc(mes)}<span class="quando__semana">${esc(semana)}, às ${esc(hora)}h</span></p>
    ${ativo(config, 'contagem') ? '<p class="quando__contagem" id="contagem" role="timer"></p>' : ''}
    ${ativo(config, 'calendario') ? `
    <div class="botoes">
        <button type="button" class="botao botao--marfim" data-acao="calendario">Salvar na agenda</button>
        <a class="link-simples" href="${esc(linkGoogleAgenda(eventoAgenda))}" target="_blank" rel="noopener">Abrir no Google Agenda</a>
    </div>` : ''}
</section>`;

const onde = `
<section class="onde" aria-labelledby="t-onde">
    <img class="onde__foto" src="${esc(local.foto)}" alt="${esc(local.fotoAlt)}" width="1400" height="875" loading="lazy">
    <div class="onde__texto">
        <h2 id="t-onde" class="titulo">${esc(local.nome)}</h2>
        <address>${esc(local.endereco)}</address>
        <p class="onde__nota">${esc(local.observacoes)}</p>
        <div class="botoes">
            <a class="botao botao--cobre" href="${esc(linkGoogleMaps(local))}" target="_blank" rel="noopener">Google Maps</a>
            <a class="botao botao--linha" href="${esc(linkWaze(local))}" target="_blank" rel="noopener">Waze</a>
            <button type="button" class="link-simples" data-acao="copiar" data-copiar="${esc(local.endereco)}" data-aviso="Endereço copiado">Copiar endereço</button>
        </div>
    </div>
</section>`;

const programa = ativo(config, 'programacao') ? `
<section class="programa" aria-labelledby="t-programa">
    <h2 id="t-programa" class="titulo">A noite</h2>
    <ol class="programa__lista">
        ${config.programacao.map((item) => `
        <li>
            <time class="programa__hora">${esc(item.hora)}</time>
            <p><strong>${esc(item.titulo)}</strong>${esc(item.detalhe)}</p>
        </li>`).join('')}
    </ol>
</section>` : '';

const traje = ativo(config, 'dressCode') ? `
<section class="traje" aria-labelledby="t-traje">
    <ul class="traje__amostras">
        ${dressCode.cores.map((cor) => `
        <li style="--amostra:${esc(cor.hex)}"><span>${esc(cor.nome)}</span></li>`).join('')}
    </ul>
    <div class="traje__texto">
        <h2 id="t-traje" class="titulo">${esc(dressCode.titulo)}</h2>
        <p>${esc(dressCode.texto)}</p>
    </div>
</section>` : '';

const galeria = ativo(config, 'galeria') && config.galeria.length ? `
<section class="fotos" aria-label="Galeria de fotografias">
    <ul class="fotos__grade">
        ${config.galeria.map((foto, i) => `
        <li class="${foto.destaque ? 'fotos__item--grande' : ''}">
            <button type="button" data-foto="${i}" aria-label="Ampliar: ${esc(foto.legenda ?? foto.alt)}">
                <img src="${esc(foto.src)}" alt="${esc(foto.alt)}" loading="lazy">
            </button>
        </li>`).join('')}
    </ul>
</section>` : '';

const presente = ativo(config, 'presentes') ? `
<section class="presente" aria-labelledby="t-presente">
    <h2 id="t-presente" class="titulo">${esc(presentes.titulo)}</h2>
    <div class="presente__corpo">
        <p class="presente__intro">${esc(presentes.texto)}</p>
        <ul class="presente__lista">
            ${presentes.opcoes.map((opcao) => `
            <li>
                <strong>${esc(opcao.titulo)}</strong>
                <span>${esc(opcao.detalhe)}</span>
                ${opcao.pix ? `<button type="button" class="link-simples" data-acao="copiar" data-copiar="${esc(opcao.pix)}" data-aviso="Chave Pix copiada">Copiar chave Pix</button>` : ''}
            </li>`).join('')}
        </ul>
    </div>
</section>` : '';

const formularioRsvp = `
<form class="reserva__form" id="rsvp" novalidate>
    <label class="campo">
        <span>Seu nome</span>
        <input name="nome" type="text" autocomplete="name" required>
    </label>
    <p class="erro" data-erro="nome" hidden></p>

    <fieldset class="escolha">
        <legend>Você vem?</legend>
        <label><input type="radio" name="presenca" value="sim"><span>Estarei lá</span></label>
        <label><input type="radio" name="presenca" value="nao"><span>Não poderei ir</span></label>
    </fieldset>
    <p class="erro" data-erro="presenca" hidden></p>

    <div class="campo campo--contador" data-so-presenca data-contador>
        <label for="acompanhantes">Acompanhantes</label>
        <div class="contador">
            <button type="button" data-menos aria-label="Remover acompanhante">−</button>
            <input id="acompanhantes" name="acompanhantes" type="number" inputmode="numeric" min="0" max="${esc(rsvp.maxAcompanhantes)}" value="0">
            <button type="button" data-mais aria-label="Adicionar acompanhante">+</button>
        </div>
    </div>

    <label class="campo">
        <span>Um recado para ${esc(pessoa.artigo)} ${esc(pessoa.nome)} (opcional)</span>
        <textarea name="recado" rows="2" maxlength="300"></textarea>
    </label>

    <button type="submit" class="botao botao--terracota">Enviar pelo WhatsApp</button>
</form>
<div class="reserva__painel" id="rsvp-painel" tabindex="-1" hidden>
    <h3 data-titulo></h3>
    <p data-texto></p>
    <div class="demo" data-demo hidden>
        <p>Modo demonstração: nenhum número de WhatsApp foi configurado, então nada foi enviado. Para ativar, preencha <code>whatsapp</code> em <code>config.js</code>. A mensagem seria esta:</p>
        <pre data-mensagem></pre>
        <button type="button" class="link-simples" data-copiar-mensagem>Copiar mensagem</button>
    </div>
    <a class="botao botao--terracota" data-link-whatsapp target="_blank" rel="noopener" hidden>Abrir o WhatsApp</a>
    <button type="button" class="link-simples" data-alterar>Alterar resposta</button>
</div>`;

const reserva = ativo(config, 'rsvp') ? `
<section class="reserva" id="confirmar" aria-labelledby="t-reserva">
    <div class="reserva__cabeca">
        <h2 id="t-reserva" class="titulo">Guardo seu lugar?</h2>
        ${!jaPassou && prazo ? `<p>Responda até ${esc(prazo)}. ${esc(rsvp.nota)}</p>` : ''}
    </div>
    ${jaPassou ? `<p class="reserva__encerrado">${esc(config.textos.depoisDoEvento)}</p>` : formularioRsvp}
</section>` : '';

const fim = `
<footer class="fim">
    <p class="fim__titulo">${esc(encerramento.titulo)}</p>
    <p class="fim__texto">${esc(encerramento.texto)}</p>
    ${ativo(config, 'compartilhar') ? '<button type="button" class="botao botao--marfim" data-acao="compartilhar">Compartilhar convite</button>' : ''}
</footer>`;

const barra = ativo(config, 'rsvp') && !jaPassou ? `
<a class="barra" id="barra" href="#confirmar">Confirmar presença</a>` : '';

function iniciar() {
    aplicarCores(config.cores);
    aplicarSeo(config.seo);
    $('#convite').innerHTML = `${capa}<main>${apresentar}${quando}${onde}${programa}${traje}${galeria}${presente}${reserva}</main>${fim}${barra}`;

    ligarAcoes({
        calendario: { id: config.id, eventos: [eventoAgenda] },
        compartilhamento: {
            titulo: config.seo.titulo,
            texto: `${pessoa.nome} faz ${pessoa.idade}. O convite está aqui:`,
        },
    });

    const contagem = $('#contagem');
    if (contagem) {
        iniciarContagem(evento.inicio, (r) => {
            if (r.encerrado) { contagem.textContent = config.textos.depoisDoEvento; return; }
            const parte = (n, s, p) => `${n} ${n === 1 ? s : p}`;
            contagem.textContent = `Faltam ${parte(r.dias, 'dia', 'dias')}, ${parte(r.horas, 'hora', 'horas')}, ${parte(r.minutos, 'minuto', 'minutos')} e ${parte(r.segundos, 'segundo', 'segundos')}.`;
        });
    }

    if (ativo(config, 'galeria') && config.galeria.length) {
        const visor = criarGaleria(config.galeria);
        $$('[data-foto]').forEach((botao) =>
            botao.addEventListener('click', () => visor.abrir(Number(botao.dataset.foto))));
    }

    const form = $('#rsvp');
    if (form) {
        iniciarRsvp(form, $('#rsvp-painel'), {
            whatsapp: config.whatsapp,
            montarMensagem: (d) => [
                `*${evento.titulo}*`,
                `*Nome:* ${d.nome}`,
                `*Resposta:* ${d.presenca === 'sim' ? 'Estarei lá' : 'Não poderei ir'}`,
                ...(d.presenca === 'sim' ? [`*Acompanhantes:* ${d.acompanhantes}`] : []),
                ...(d.recado?.trim() ? [`*Recado:* ${d.recado.trim()}`] : []),
            ].join('\n'),
            resultado: (d, temLink) => {
                const primeiro = d.nome.split(' ')[0];
                if (!temLink) return { titulo: 'Resposta pronta', texto: `${primeiro}, sua resposta foi preenchida.` };
                return {
                    titulo: 'Falta um toque',
                    texto: `${primeiro}, abrimos o WhatsApp com sua resposta escrita. Toque em enviar para ela chegar ${pessoa.artigo === 'o' ? 'ao' : 'à'} ${pessoa.nome}.`,
                };
            },
        });
    }

    const barraFixa = $('#barra');
    if (barraFixa) {
        const visiveis = new Set();
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach((e) => (e.isIntersecting ? visiveis.add(e.target) : visiveis.delete(e.target)));
            barraFixa.classList.toggle('visivel', visiveis.size === 0);
        });
        ['.capa', '#confirmar', '.fim'].forEach((s) => observador.observe($(s)));
    }
}

iniciar();
