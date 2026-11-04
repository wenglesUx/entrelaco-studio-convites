import config from './config.js';
import { $, aplicarCores, aplicarSeo, ativo, esc, formatarData } from '../compartilhado/nucleo.js';
import { calcularRestante, iniciarContagem } from '../compartilhado/contagem.js';
import { linkGoogleAgenda } from '../compartilhado/calendario.js';
import { linkGoogleMaps, linkWaze } from '../compartilhado/mapas.js';
import { ligarAcoes } from '../compartilhado/acoes.js';
import { iniciarRsvp } from '../compartilhado/rsvp.js';
import { tracoMarca } from './ilustracoes.js';

const { marca, evento, local, abertura, apresentacao, temas, programacao, convite, presenca, confirmacao, encerramento, ambientacao: foto } = config;
const f = (opcoes, iso = evento.inicio) => formatarData(iso, evento.fuso, opcoes);

const dia = f({ day: 'numeric' });
const mes = f({ month: 'long' });
const mesAno = `${mes} de ${f({ year: 'numeric' })}`;
const semana = f({ weekday: 'long' });
const hora = f({ hour: 'numeric' }).replace(/\D/g, '');
const jaPassou = calcularRestante(evento.inicio).encerrado;
const maiuscula = (t) => t.charAt(0).toLocaleUpperCase('pt-BR') + t.slice(1);

/* Sem coordenadas, os mapas buscam pelo nome do espaço. */
const lugar = { endereco: local.busca };
const eventoAgenda = { titulo: evento.titulo, inicio: evento.inicio, fim: evento.fim, local: local.busca, descricao: evento.descricao };

const capa = `
<header class="capa">
    <img class="capa__foto" src="${esc(foto.abertura.src)}" alt="${esc(foto.abertura.alt)}" width="2000" height="1226" fetchpriority="high">
    <div class="toldo" aria-hidden="true"></div>
    <div class="capa__conteudo">
        <h1 class="marca">
            <span class="marca__nome">${esc(marca.nome)}${tracoMarca()}</span>
            <span class="marca__assinatura">${esc(marca.assinatura)}</span>
        </h1>
        <p class="capa__chamada">${esc(abertura.chamada)}</p>
        <p class="capa__data">${esc(dia)} de ${esc(mesAno)}, a partir das ${esc(hora)}h<br>${esc(local.nome)}, ${esc(local.bairro)}</p>
        ${ativo(config, 'rsvp') && !jaPassou ? '<a class="botao botao--ouro" href="#confirmar">Confirmar presença</a>' : ''}
    </div>
    <div class="faixa-majolica" aria-hidden="true"></div>
</header>`;

const encontro = `
<section class="encontro" aria-labelledby="t-encontro">
    <img class="arco encontro__foto" src="${esc(foto.encontro.src)}" alt="${esc(foto.encontro.alt)}" width="1600" height="905" loading="lazy">
    <div class="encontro__texto">
        <h2 id="t-encontro" class="titulo">${esc(apresentacao.titulo)}</h2>
        ${apresentacao.paragrafos.map((p, i) => `<p${i === apresentacao.paragrafos.length - 1 ? ' class="encontro__destaque"' : ''}>${esc(p)}</p>`).join('')}
    </div>
</section>`;

const dimensoes = ativo(config, 'temas') ? `
<section class="temas" aria-labelledby="t-temas" style="--fundo:url('${esc(foto.temas)}')">
    <h2 id="t-temas" class="temas__lista">${temas.itens.map((t) => `<span>${esc(t)}</span>`).join('')}</h2>
    <p>${esc(temas.texto)}</p>
</section>` : '';

/* Cada linha da programação ganha um peso: palestra, momento conduzido por alguém ou item simples. */
function linhaProgramacao(item) {
    const palestrante = item.atividade === 'Palestra'
        ? config.palestrantes.find((p) => p.nome === item.pessoa) : null;
    if (palestrante) {
        return `
        <li class="etapa etapa--palestra">
            <time>${esc(item.hora)}</time>
            <div class="etapa__palestra">
                <img src="${esc(palestrante.foto)}" alt="" width="96" height="96" loading="lazy">
                <div>
                    <p class="etapa__tipo">${esc(item.atividade)}</p>
                    <p class="etapa__nome">${esc(palestrante.nome)}</p>
                    <p class="etapa__tema">${esc(palestrante.palestra)}</p>
                </div>
            </div>
        </li>`;
    }
    return `
        <li class="etapa${item.pessoa ? ' etapa--pessoa' : ''}">
            <time>${esc(item.hora)}</time>
            <p>${esc(item.atividade)}${item.pessoa ? `<strong>${esc(item.pessoa)}</strong>` : ''}</p>
        </li>`;
}

const agenda = ativo(config, 'programacao') ? `
<section class="programa" aria-labelledby="t-programa" style="--fundo:url('${esc(foto.programacao)}')">
    <div class="programa__cabeca">
        <h2 id="t-programa" class="programa__titulo">${esc(programacao.titulo)}</h2>
        <p class="programa__sub">${esc(programacao.subtitulo)}</p>
        <p class="programa__quando">${esc(maiuscula(semana))}, ${esc(dia)} de ${esc(mes)}, a partir das ${esc(hora)}h</p>
    </div>
    <div class="programa__corpo">
        <img class="programa__majolica programa__majolica--vertical" src="${esc(foto.majolicaVertical)}" alt="" width="236" height="980" loading="lazy">
        <div class="programa__cartao">
            <img class="programa__majolica programa__majolica--faixa" src="${esc(foto.majolicaFaixa)}" alt="" width="980" height="236" loading="lazy">
            <ol class="cronograma">${programacao.itens.map(linhaProgramacao).join('')}</ol>
        </div>
    </div>
</section>
<figure class="panorama"><img src="${esc(foto.panorama.src)}" alt="${esc(foto.panorama.alt)}" width="2200" height="538" loading="lazy"></figure>` : '';

const falas = ativo(config, 'palestrantes') ? `
<section class="palestrantes" aria-labelledby="t-palestrantes">
    <h2 id="t-palestrantes" class="titulo">Palestrantes</h2>
    ${config.palestrantes.map((p) => `
    <article class="palestrante">
        <img class="arco" src="${esc(p.foto)}" alt="${esc(p.fotoAlt)}" width="480" height="590" loading="lazy">
        <div class="palestrante__texto">
            <h3>${esc(p.nome)}</h3>
            <p class="palestrante__palestra">${esc(p.palestra)}</p>
            <p>${esc(p.descricao)}</p>
            ${p.instagram ? `<a class="palestrante__insta" href="https://www.instagram.com/${esc(p.instagram)}/" target="_blank" rel="noopener">@${esc(p.instagram)}</a>` : ''}
        </div>
    </article>`).join('')}
</section>` : '';

const quando = `
<section class="convite" aria-labelledby="t-convite">
    <img class="faixa-foto" src="${esc(foto.convite.src)}" alt="${esc(foto.convite.alt)}" width="1800" height="1205" loading="lazy">
    <div class="convite__grade">
        <div class="convite__texto">
            <h2 id="t-convite" class="titulo">${esc(convite.titulo)}</h2>
            <p class="convite__data"><span class="convite__dia">${esc(dia)}</span><span>de ${esc(mesAno)}<br>${esc(semana)}, a partir das ${esc(hora)}h</span></p>
            <p class="convite__local">${esc(local.nome)}<span>${esc(local.bairro)}</span></p>
            ${ativo(config, 'contagem') ? '<p class="convite__contagem" id="contagem" role="timer"></p>' : ''}
            <div class="botoes">
                <a class="botao botao--ouro" href="${esc(linkGoogleMaps(lugar))}" target="_blank" rel="noopener">Ver no Google Maps</a>
                <a class="botao botao--linha" href="${esc(linkWaze(lugar))}" target="_blank" rel="noopener">Waze</a>
                ${ativo(config, 'calendario') ? '<button type="button" class="botao botao--linha" data-acao="calendario">Salvar na agenda</button>' : ''}
            </div>
            ${ativo(config, 'calendario') ? `<a class="link-simples" href="${esc(linkGoogleAgenda(eventoAgenda))}" target="_blank" rel="noopener">Abrir no Google Agenda</a>` : ''}
            <p class="convite__aviso">${esc(convite.observacao)}</p>
        </div>
        <img class="arco convite__foto" src="${esc(local.foto)}" alt="${esc(local.fotoAlt)}" width="600" height="800" loading="lazy">
    </div>
</section>`;

const formulario = `
<form class="ficha" id="rsvp" novalidate>
    <label class="campo">
        <span>Seu nome</span>
        <input name="nome" type="text" autocomplete="name" required>
    </label>
    <p class="erro" data-erro="nome" hidden></p>
    <fieldset class="escolha">
        <legend>Você vem?</legend>
        <label><input type="radio" name="presenca" value="sim"><span>Estarei presente</span></label>
        <label><input type="radio" name="presenca" value="nao"><span>Não poderei ir</span></label>
    </fieldset>
    <p class="erro" data-erro="presenca" hidden></p>
    <button type="submit" class="botao botao--ouro">Enviar pelo WhatsApp</button>
</form>
<div class="ficha" id="rsvp-painel" tabindex="-1" hidden>
    <h3 data-titulo></h3>
    <p data-texto></p>
    <div class="demo" data-demo hidden>
        <p>Modo demonstração: nenhum link de confirmação nem WhatsApp foi configurado, então nada foi enviado. Preencha <code>confirmacao.link</code> ou <code>whatsapp</code> em <code>config.js</code>. A mensagem seria esta:</p>
        <pre data-mensagem></pre>
        <button type="button" class="link-simples" data-copiar-mensagem>Copiar mensagem</button>
    </div>
    <a class="botao botao--ouro" data-link-whatsapp target="_blank" rel="noopener" hidden>Abrir o WhatsApp</a>
    <button type="button" class="link-simples" data-alterar>Alterar resposta</button>
</div>`;

const confirmar = ativo(config, 'rsvp') ? `
<section class="presenca" id="confirmar" aria-labelledby="t-presenca">
    <img class="faixa-foto faixa-foto--baixa" src="${esc(foto.presenca.src)}" alt="${esc(foto.presenca.alt)}" width="1800" height="896" loading="lazy">
    <div class="presenca__grade">
        <img class="arco presenca__foto" src="${esc(presenca.foto)}" alt="${esc(presenca.fotoAlt)}" width="553" height="800" loading="lazy">
        <div class="presenca__texto">
            <h2 id="t-presenca" class="titulo">${esc(presenca.titulo)}</h2>
            ${jaPassou ? '<p>Esse encontro já aconteceu. Obrigada a todas que estiveram com a gente.</p>' : confirmacao.link ? `
            <p>${esc(confirmacao.textoComLink)}</p>
            <a class="botao botao--ouro" href="${esc(confirmacao.link)}" target="_blank" rel="noopener">Confirmar presença</a>` : `
            <p>${esc(confirmacao.textoWhatsapp)}</p>
            ${formulario}`}
            <p class="presenca__nota">${esc(presenca.restricoes)}</p>
        </div>
    </div>
</section>` : '';

const logos = (lista) => lista.map((l) =>
    `<img class="${l.redondo ? 'logo logo--redondo' : 'logo'}" src="${esc(l.logo)}" alt="${esc(l.nome)}" loading="lazy">`).join('');

const fim = `
<footer class="fim">
    <div class="fim__por-do-sol" style="--fundo:url('${esc(foto.encerramento)}')">
        <p class="fim__frases">${encerramento.frases.map((t) => `<span>${esc(t)}</span>`).join('')}</p>
        <p class="fim__data">${esc(dia)} de ${esc(mesAno)}, ${esc(hora)}h</p>
        ${ativo(config, 'compartilhar') ? '<button type="button" class="botao botao--claro" data-acao="compartilhar">Compartilhar convite</button>' : ''}
    </div>
    <div class="apoio">
        <div><p>Realização</p><div class="apoio__logos">${logos(config.realizacao)}</div></div>
        <div><p>Parceria</p><div class="apoio__logos">${logos(config.parceria)}</div></div>
    </div>
    <p class="creditos">Fotos de ambientação via Wikimedia Commons:
        ${config.creditosFotos.map((c) => `<a href="${esc(c.fonte)}" target="_blank" rel="noopener">${esc(c.autor)}</a> (${esc(c.licenca)})`).join(', ')}.</p>
    <div class="faixa-majolica" aria-hidden="true"></div>
</footer>`;

function iniciar() {
    aplicarCores(config.cores);
    aplicarSeo(config.seo);
    document.documentElement.style.setProperty('--majolica', `url('${foto.majolicaFaixa}')`);
    $('#convite').innerHTML = `${capa}<main>${encontro}${dimensoes}${agenda}${falas}${quando}${confirmar}</main>${fim}`;

    ligarAcoes({
        calendario: { id: config.id, eventos: [eventoAgenda] },
        compartilhamento: { titulo: config.seo.titulo, texto: 'Você é convidada para o Elo Mulheres que Movem:' },
    });

    const contagem = $('#contagem');
    if (contagem) {
        iniciarContagem(evento.inicio, (r) => {
            if (r.encerrado) { contagem.textContent = 'O encontro já começou.'; return; }
            const parte = (n, s, p) => `${n} ${n === 1 ? s : p}`;
            contagem.textContent = r.dias > 0
                ? `Faltam ${parte(r.dias, 'dia', 'dias')} e ${parte(r.horas, 'hora', 'horas')}.`
                : `Faltam ${parte(r.horas, 'hora', 'horas')} e ${parte(r.minutos, 'minuto', 'minutos')}.`;
        });
    }

    const form = $('#rsvp');
    if (form) {
        iniciarRsvp(form, $('#rsvp-painel'), {
            whatsapp: config.whatsapp,
            montarMensagem: (d) => [
                `*${evento.titulo}*`,
                `*Nome:* ${d.nome}`,
                `*Resposta:* ${d.presenca === 'sim' ? 'Estarei presente' : 'Não poderei ir'}`,
            ].join('\n'),
            resultado: (d, temLink) => {
                const primeiro = d.nome.split(' ')[0];
                if (!temLink) return { titulo: 'Resposta pronta', texto: `${primeiro}, sua resposta foi preenchida.` };
                return {
                    titulo: 'Falta um toque',
                    texto: `${primeiro}, abrimos o WhatsApp com sua resposta escrita. Toque em enviar para ela chegar à organização.`,
                };
            },
        });
    }
}

iniciar();
