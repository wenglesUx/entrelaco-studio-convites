import config from './config.js';
import { $, $$, aplicarCores, aplicarSeo, ativo, esc, formatarData } from '../compartilhado/nucleo.js';
import { calcularRestante, doisDigitos, iniciarContagem } from '../compartilhado/contagem.js';
import { linkGoogleMaps, linkWaze } from '../compartilhado/mapas.js';
import { ligarAcoes } from '../compartilhado/acoes.js';
import { iniciarRsvp } from '../compartilhado/rsvp.js';
import { criarGaleria } from '../compartilhado/galeria.js';
import { menosMovimento, revelarAoRolar } from '../compartilhado/movimento.js';
import { abrirConstelacao } from './constelacao.js';

const { debutante, evento, etapas, abertura, apresentacao, dressCode, presentes, rsvp, encerramento } = config;
const f = (opcoes, iso = evento.inicio) => formatarData(iso, evento.fuso, opcoes);
const horaDe = (iso) => f({ hour: '2-digit', minute: '2-digit' }, iso).replace(':00', 'h').replace(':', 'h');

const diaExtenso = f({ day: 'numeric', month: 'long' });
const ano = f({ year: 'numeric' });
const semana = f({ weekday: 'long' });
const prazo = rsvp.prazo ? f({ day: 'numeric', month: 'long' }, rsvp.prazo) : '';
const jaPassou = calcularRestante(evento.inicio).encerrado;
const nomeEtapas = etapas.length > 1 ? 'Cada etapa tem seu próprio endereço.' : '';

const eventosAgenda = etapas.map((etapa) => ({
    titulo: `${etapa.nome}: ${evento.titulo}`,
    inicio: etapa.inicio,
    fim: etapa.fim,
    local: `${etapa.local}, ${etapa.endereco}`,
    descricao: `${etapa.descricao} Traje: ${dressCode.titulo}.`,
}));

const entrada = `
<div class="cortina" id="cortina">
    <canvas class="cortina__estrelas" aria-hidden="true"></canvas>
    <div class="cortina__conteudo">
        <p class="cortina__chamada">${esc(abertura.chamada)}</p>
        <button type="button" class="cortina__botao" id="abrir">${esc(abertura.botao)}</button>
    </div>
</div>`;

const capa = `
<header class="capa">
    <img class="capa__foto" src="${esc(abertura.foto)}" alt="${esc(abertura.fotoAlt)}" width="1050" height="1400" fetchpriority="high">
    <div class="capa__texto">
        <p class="capa__idade">${esc(debutante.idade)} anos</p>
        <h1 class="capa__nome">${esc(debutante.nome)}</h1>
        <p class="capa__data">${esc(diaExtenso)} de ${esc(ano)}</p>
    </div>
</header>`;

const fala = `
<section class="fala" aria-labelledby="t-fala">
    <h2 id="t-fala" class="fala__titulo">${esc(apresentacao.titulo)}</h2>
    <p class="leitura">${esc(apresentacao.texto)}</p>
    <p class="fala__assinatura">${esc(apresentacao.assinatura)}</p>
</section>`;

const contagem = `
<section class="data" aria-labelledby="t-data">
    <h2 id="t-data" class="data__titulo"><span>${esc(semana)}</span>${esc(diaExtenso)}</h2>
    ${ativo(config, 'contagem') ? `
    <div class="relogio" id="relogio" role="timer" aria-label="Tempo até a festa">
        <p><b data-parte="dias">0</b><span>dias</span></p>
        <p><b data-parte="horas">00</b><span>horas</span></p>
        <p><b data-parte="minutos">00</b><span>min</span></p>
        <p><b data-parte="segundos">00</b><span>seg</span></p>
    </div>` : ''}
    ${ativo(config, 'calendario') ? `<button type="button" class="botao" data-acao="calendario">Salvar na agenda</button>` : ''}
</section>`;

const galeria = ativo(config, 'galeria') && config.galeria.length ? `
<section class="album" aria-label="Fotografias">
    <ul class="album__trilho" id="trilho" tabindex="0" aria-label="Fotos. Use as setas ou deslize para navegar.">
        ${config.galeria.map((foto, i) => `
        <li>
            <button type="button" data-foto="${i}" aria-label="Ampliar: ${esc(foto.legenda ?? foto.alt)}">
                <img src="${esc(foto.src)}" alt="${esc(foto.alt)}" loading="lazy">
            </button>
            <p>${esc(foto.legenda ?? '')}</p>
        </li>`).join('')}
    </ul>
    <div class="album__controles">
        <button type="button" id="foto-anterior" aria-label="Foto anterior">‹</button>
        <p id="foto-posicao" aria-live="polite">1 de ${config.galeria.length}</p>
        <button type="button" id="foto-proxima" aria-label="Próxima foto">›</button>
    </div>
</section>` : '';

const ATOS = ['I', 'II'];

const locais = `
<section class="atos" aria-label="Onde será">
    ${nomeEtapas ? `<p class="so-leitor">${esc(nomeEtapas)}</p>` : ''}
    ${etapas.map((etapa, i) => `
    <article class="ato">
        <img class="ato__foto" src="${esc(etapa.foto)}" alt="${esc(etapa.fotoAlt)}" width="1400" height="875" loading="lazy">
        <div class="ato__texto">
            <h2>${etapas.length > 1 ? `<span class="ato__numero">Ato ${ATOS[i]}</span>` : ''}${esc(etapa.nome)}</h2>
            <p class="ato__hora">${esc(horaDe(etapa.inicio))}</p>
            <p class="ato__local">${esc(etapa.local)}</p>
            <address>${esc(etapa.endereco)}</address>
            <div class="botoes">
                <a class="botao" href="${esc(linkGoogleMaps(etapa))}" target="_blank" rel="noopener" aria-label="Google Maps: ${esc(etapa.local)}">Google Maps</a>
                <a class="botao" href="${esc(linkWaze(etapa))}" target="_blank" rel="noopener" aria-label="Waze: ${esc(etapa.local)}">Waze</a>
                <button type="button" class="botao-texto" data-acao="copiar" data-copiar="${esc(etapa.endereco)}" data-aviso="Endereço copiado" aria-label="Copiar endereço: ${esc(etapa.local)}">Copiar endereço</button>
            </div>
        </div>
    </article>`).join('')}
</section>`;

const programa = ativo(config, 'programacao') ? `
<section class="noite" aria-labelledby="t-noite">
    <h2 id="t-noite" class="titulo">A noite, hora a hora</h2>
    <ol class="noite__linha">
        ${config.programacao.map((item) => `
        <li class="noite__item${item.marco ? ' noite__item--marco' : ''}">
            <time>${esc(item.hora)}</time>
            <div><strong>${esc(item.titulo)}</strong><span>${esc(item.detalhe)}</span></div>
        </li>`).join('')}
    </ol>
</section>` : '';

const traje = ativo(config, 'dressCode') ? `
<section class="traje" aria-labelledby="t-traje">
    ${dressCode.foto ? `<img class="traje__foto" src="${esc(dressCode.foto)}" alt="${esc(dressCode.fotoAlt)}" width="900" height="1200" loading="lazy">` : ''}
    <div class="traje__texto">
        <h2 id="t-traje" class="titulo">${esc(dressCode.titulo)}</h2>
        <p class="leitura">${esc(dressCode.texto)}</p>
        <ul>${dressCode.orientacoes.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
    </div>
</section>` : '';

const presente = ativo(config, 'presentes') ? `
<section class="presente" aria-labelledby="t-presente">
    <h2 id="t-presente" class="titulo">${esc(presentes.titulo)}</h2>
    <p class="leitura">${esc(presentes.texto)}</p>
    <div class="botoes">
        ${presentes.pix ? `<button type="button" class="botao" data-acao="copiar" data-copiar="${esc(presentes.pix)}" data-aviso="Chave Pix copiada">Copiar chave Pix</button>` : ''}
        ${presentes.lista ? `<a class="botao" href="${esc(presentes.lista)}" target="_blank" rel="noopener">Ver lista de presentes</a>` : ''}
    </div>
</section>` : '';

const formulario = `
<form class="ficha" id="rsvp" novalidate>
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

    <div class="campo campo--linha" data-so-presenca data-contador>
        <label for="acompanhantes">Acompanhantes</label>
        <div class="contador">
            <button type="button" data-menos aria-label="Remover acompanhante">−</button>
            <input id="acompanhantes" name="acompanhantes" type="number" inputmode="numeric" min="0" max="${esc(rsvp.maxAcompanhantes)}" value="0">
            <button type="button" data-mais aria-label="Adicionar acompanhante">+</button>
        </div>
    </div>

    <label class="campo" data-so-presenca>
        <span>Nome dos acompanhantes (opcional)</span>
        <input name="nomesAcompanhantes" type="text">
    </label>

    <button type="submit" class="botao botao--cheio">Enviar pelo WhatsApp</button>
</form>
<div class="ficha" id="rsvp-painel" tabindex="-1" hidden>
    <h3 data-titulo></h3>
    <p data-texto></p>
    <div class="demo" data-demo hidden>
        <p>Modo demonstração: nenhum número de WhatsApp foi configurado, então nada foi enviado. Para ativar, preencha <code>whatsapp</code> em <code>config.js</code>. A mensagem seria esta:</p>
        <pre data-mensagem></pre>
        <button type="button" class="botao-texto" data-copiar-mensagem>Copiar mensagem</button>
    </div>
    <a class="botao botao--cheio" data-link-whatsapp target="_blank" rel="noopener" hidden>Abrir o WhatsApp</a>
    <button type="button" class="botao-texto" data-alterar>Alterar resposta</button>
</div>`;

const confirmar = ativo(config, 'rsvp') ? `
<section class="confirmar" id="confirmar" aria-labelledby="t-confirmar">
    <div class="confirmar__cabeca">
        <h2 id="t-confirmar" class="titulo">Posso contar com você?</h2>
        ${!jaPassou && prazo ? `<p>Confirme até ${esc(prazo)}.</p>` : ''}
    </div>
    ${jaPassou ? `<p class="confirmar__fim">${esc(config.textos.depoisDoEvento)}</p>` : `<div class="confirmar__corpo">${formulario}</div>`}
</section>` : '';

const final = `
<footer class="final">
    <p class="final__titulo">${esc(encerramento.titulo)}</p>
    <p>${esc(encerramento.texto)}</p>
    <div class="botoes botoes--centro">
        ${ativo(config, 'playlist') && config.playlist?.url ? `<a class="botao" href="${esc(config.playlist.url)}" target="_blank" rel="noopener">${esc(config.playlist.rotulo)}</a>` : ''}
        ${ativo(config, 'compartilhar') ? '<button type="button" class="botao" data-acao="compartilhar">Compartilhar convite</button>' : ''}
    </div>
</footer>`;

/* O céu amanhece conforme a rolagem: a noite do convite anda junto com a da festa. */
function ligarAmanhecer() {
    const camada = $('.ceu__alvorada');
    let pendente = false;
    const atualizar = () => {
        pendente = false;
        const total = document.documentElement.scrollHeight - innerHeight;
        const progresso = total > 0 ? scrollY / total : 0;
        camada.style.opacity = Math.max(0, (progresso - 0.45) / 0.55).toFixed(3);
    };
    addEventListener('scroll', () => {
        if (pendente) return;
        pendente = true;
        requestAnimationFrame(atualizar);
    }, { passive: true });
    atualizar();
}

function ligarAlbum() {
    const trilho = $('#trilho');
    if (!trilho) return;
    const visor = criarGaleria(config.galeria);
    $$('[data-foto]').forEach((b) => b.addEventListener('click', () => visor.abrir(Number(b.dataset.foto))));

    const itens = $$('li', trilho);
    const posicao = $('#foto-posicao');
    const atual = () => {
        const centro = trilho.scrollLeft + trilho.clientWidth / 2;
        return itens.reduce((melhor, item, i) => {
            const distancia = Math.abs(item.offsetLeft + item.offsetWidth / 2 - centro);
            return distancia < melhor.distancia ? { i, distancia } : melhor;
        }, { i: 0, distancia: Infinity }).i;
    };
    const irPara = (i) => {
        const alvo = itens[(i + itens.length) % itens.length];
        trilho.scrollTo({
            left: alvo.offsetLeft - (trilho.clientWidth - alvo.offsetWidth) / 2,
            behavior: menosMovimento() ? 'auto' : 'smooth',
        });
    };
    let espera;
    trilho.addEventListener('scroll', () => {
        clearTimeout(espera);
        espera = setTimeout(() => { posicao.textContent = `${atual() + 1} de ${itens.length}`; }, 80);
    }, { passive: true });
    $('#foto-anterior').addEventListener('click', () => irPara(atual() - 1));
    $('#foto-proxima').addEventListener('click', () => irPara(atual() + 1));
    trilho.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); irPara(atual() - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); irPara(atual() + 1); }
    });
}

function iniciar() {
    aplicarCores(config.cores);
    aplicarSeo(config.seo);
    $('#convite').innerHTML = `${entrada}${capa}<main><div class="preludio">${fala}${contagem}</div>${galeria}${locais}${programa}${traje}${presente}${confirmar}</main>${final}`;

    ligarAcoes({
        calendario: { id: config.id, eventos: eventosAgenda },
        compartilhamento: {
            titulo: config.seo.titulo,
            texto: `${debutante.nome} faz ${debutante.idade} anos. O convite está aqui:`,
        },
    });

    abrirConstelacao($('#cortina'), $('#abrir'), () => document.body.classList.remove('fechado'));
    ligarAmanhecer();
    ligarAlbum();
    revelarAoRolar($$('.noite__item'), { threshold: 0.7 });

    const relogio = $('#relogio');
    if (relogio) {
        iniciarContagem(evento.inicio, (r) => {
            if (r.encerrado) { relogio.outerHTML = `<p class="data__fim">${esc(config.textos.depoisDoEvento)}</p>`; return; }
            $('[data-parte="dias"]', relogio).textContent = r.dias;
            $('[data-parte="horas"]', relogio).textContent = doisDigitos(r.horas);
            $('[data-parte="minutos"]', relogio).textContent = doisDigitos(r.minutos);
            $('[data-parte="segundos"]', relogio).textContent = doisDigitos(r.segundos);
        });
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
                ...(d.presenca === 'sim' && d.nomesAcompanhantes?.trim() ? [`*Nomes:* ${d.nomesAcompanhantes.trim()}`] : []),
            ].join('\n'),
            resultado: (d, temLink) => {
                const primeiro = d.nome.split(' ')[0];
                if (!temLink) return { titulo: 'Resposta pronta', texto: `${primeiro}, sua resposta foi preenchida.` };
                return {
                    titulo: 'Falta um toque',
                    texto: `${primeiro}, abrimos o WhatsApp com sua resposta escrita. Toque em enviar para ela chegar ${rsvp.destinatario}.`,
                };
            },
        });
    }
}

iniciar();
