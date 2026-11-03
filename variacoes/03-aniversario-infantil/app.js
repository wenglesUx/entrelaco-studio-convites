import config from './config.js';
import { $, $$, aplicarCores, aplicarSeo, ativo, esc, formatarData } from '../compartilhado/nucleo.js';
import { calcularRestante, doisDigitos, iniciarContagem } from '../compartilhado/contagem.js';
import { linkGoogleMaps, linkWaze } from '../compartilhado/mapas.js';
import { ligarAcoes } from '../compartilhado/acoes.js';
import { iniciarRsvp } from '../compartilhado/rsvp.js';
import { criarGaleria } from '../compartilhado/galeria.js';
import { acacia, animais, folhagem, moita, pegada } from './ilustracoes.js';

const { crianca, evento, local, apresentacao, brincadeira, responsaveis, presentes, rsvp, encerramento } = config;
const f = (opcoes, iso = evento.inicio) => formatarData(iso, evento.fuso, opcoes);

const semana = f({ weekday: 'long' });
const dia = f({ day: 'numeric', month: 'long' });
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

const onda = (de, para, invertida = false) => `
<svg class="onda" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" style="background:${de}">
    <path fill="${para}" d="${invertida
        ? 'M0 40c180-50 420-40 640 0s520 50 800-10v60H0z'
        : 'M0 70c240-60 460-70 720-30s520 30 720-20v70H0z'}"/>
</svg>`;

const capa = `
<header class="capa" id="capa">
    <div class="capa__ceu" aria-hidden="true"></div>
    <div class="capa__sol">
        <span class="capa__idade" aria-hidden="true">${esc(crianca.idade)}</span>
    </div>
    <div class="capa__texto">
        <p class="capa__chamada">Expedição Safari</p>
        <h1 class="capa__nome">${esc(crianca.nome)}<span class="so-leitor"> faz ${esc(crianca.idade)} anos</span></h1>
        <p class="capa__data">${esc(dia)}, às ${esc(hora)}h</p>
    </div>
    <div class="capa__arvore" aria-hidden="true">${acacia()}</div>
    <div class="capa__colina capa__colina--fundo" aria-hidden="true"></div>
    <button type="button" class="bicho bicho--girafa" data-som="Oi lá de cima!" aria-label="Cumprimentar a girafa">${animais.girafa()}</button>
    <div class="capa__colina capa__colina--meio" aria-hidden="true"></div>
    <button type="button" class="bicho bicho--leao" data-som="Roooar!" aria-label="Cumprimentar o leão">${animais.leao()}</button>
    <button type="button" class="bicho bicho--zebra" data-som="Iiirrá!" aria-label="Cumprimentar a zebra">${animais.zebra()}</button>
    <div class="capa__colina capa__colina--frente" aria-hidden="true"></div>
    <div class="capa__folhas" aria-hidden="true">${folhagem('folhagem--esq')}${folhagem('folhagem--dir')}</div>
</header>`;

const chamada = `
<section class="chamada" aria-labelledby="t-chamada">
    <h2 id="t-chamada" class="titulo">${esc(apresentacao.titulo)}</h2>
    <p>${esc(apresentacao.texto)}</p>
</section>`;

const mata = ativo(config, 'brincadeira') ? `
<section class="mata" aria-labelledby="t-mata">
    <h2 id="t-mata" class="titulo">${esc(brincadeira.titulo)}</h2>
    <p>${esc(brincadeira.instrucao)}</p>
    <ul class="mata__moitas">
        ${config.animaisEscondidos.map((a, i) => `
        <li>
            <button type="button" class="esconderijo" data-nome="${esc(a.nome)}" aria-label="Moita ${i + 1}: ver quem está escondido" aria-pressed="false">
                <span class="esconderijo__animal">${animais[a.animal]()}</span>
                <span class="esconderijo__balao" aria-hidden="true">${esc(a.som)}</span>
                <span class="esconderijo__moita">${moita(i)}</span>
            </button>
        </li>`).join('')}
    </ul>
    <p class="mata__placar" id="placar" aria-live="polite">Nenhum bicho encontrado ainda.</p>
    <button type="button" class="botao-texto" id="esconder" hidden>Esconder de novo</button>
</section>` : '';

const contagem = `
<section class="tempo" aria-labelledby="t-tempo">
    <h2 id="t-tempo" class="titulo">A expedição começa em</h2>
    ${ativo(config, 'contagem') ? `
    <ol class="tempo__pegadas" id="contagem" role="timer">
        <li><div class="pata">${pegada()}<b data-parte="dias">0</b></div><span>dias</span></li>
        <li><div class="pata">${pegada()}<b data-parte="horas">00</b></div><span>horas</span></li>
        <li><div class="pata">${pegada()}<b data-parte="minutos">00</b></div><span>minutos</span></li>
        <li><div class="pata">${pegada()}<b data-parte="segundos">00</b></div><span>segundos</span></li>
    </ol>` : ''}
    <div class="ponto">
        <p class="ponto__data"><span>${esc(semana)}</span>${esc(dia)}, às ${esc(hora)}h</p>
        <p class="ponto__local">${esc(local.nome)}</p>
        <address>${esc(local.endereco)}</address>
        <p class="ponto__nota">${esc(local.referencia)}</p>
        <div class="botoes">
            <a class="botao" href="${esc(linkGoogleMaps(local))}" target="_blank" rel="noopener">Google Maps</a>
            <a class="botao botao--claro" href="${esc(linkWaze(local))}" target="_blank" rel="noopener">Waze</a>
            <button type="button" class="botao botao--claro" data-acao="copiar" data-copiar="${esc(local.endereco)}" data-aviso="Endereço copiado">Copiar endereço</button>
            ${ativo(config, 'calendario') ? '<button type="button" class="botao botao--claro" data-acao="calendario">Salvar na agenda</button>' : ''}
        </div>
    </div>
</section>`;

const roteiro = ativo(config, 'atividades') ? `
<section class="roteiro" aria-labelledby="t-roteiro">
    <h2 id="t-roteiro" class="titulo">O mapa da tarde</h2>
    <div class="roteiro__trilha">
        <svg class="roteiro__caminho" viewBox="0 0 100 500" preserveAspectRatio="none" aria-hidden="true">
            <path d="M30 0C95 60 95 90 60 120S0 200 40 250s65 70 40 130-50 80-40 120" fill="none" vector-effect="non-scaling-stroke"/>
        </svg>
        <ol>
            ${config.atividades.map((a) => `
            <li>
                <time>${esc(a.hora)}</time>
                <strong>${esc(a.titulo)}</strong>
                <span>${esc(a.detalhe)}</span>
            </li>`).join('')}
        </ol>
    </div>
</section>` : '';

const bilhete = ativo(config, 'responsaveis') ? `
<section class="adultos" aria-labelledby="t-adultos">
    <div class="bilhete">
        <h2 id="t-adultos" class="titulo">${esc(responsaveis.titulo)}</h2>
        <dl>
            ${responsaveis.itens.map((i) => `<div><dt>${esc(i.titulo)}</dt><dd>${esc(i.texto)}</dd></div>`).join('')}
        </dl>
    </div>
</section>` : '';

const album = ativo(config, 'galeria') && config.galeria.length ? `
<section class="album" aria-labelledby="t-album">
    <h2 id="t-album" class="titulo">Diário de campo</h2>
    <ul class="album__fotos">
        ${config.galeria.map((foto, i) => `
        <li>
            <button type="button" data-foto="${i}" aria-label="Ampliar: ${esc(foto.legenda ?? foto.alt)}">
                <img src="${esc(foto.src)}" alt="${esc(foto.alt)}" loading="lazy">
                <span>${esc(foto.legenda ?? '')}</span>
            </button>
        </li>`).join('')}
    </ul>
</section>` : '';

const mochila = ativo(config, 'presentes') ? `
<section class="mochila" aria-labelledby="t-mochila">
    <h2 id="t-mochila" class="titulo">${esc(presentes.titulo)}</h2>
    <p>${esc(presentes.texto)}</p>
    <ul>${presentes.ideias.map((ideia) => `<li>${esc(ideia)}</li>`).join('')}</ul>
    ${presentes.pix ? `<button type="button" class="botao botao--claro" data-acao="copiar" data-copiar="${esc(presentes.pix)}" data-aviso="Chave Pix copiada">Copiar chave Pix</button>` : ''}
</section>` : '';

const contador = (id, rotulo, min, max, valor, nomeSingular) => `
<div class="campo campo--linha" data-so-presenca data-contador>
    <label for="${id}">${rotulo}</label>
    <div class="contador">
        <button type="button" data-menos aria-label="Remover ${nomeSingular}">−</button>
        <input id="${id}" name="${id}" type="number" inputmode="numeric" min="${min}" max="${max}" value="${valor}">
        <button type="button" data-mais aria-label="Adicionar ${nomeSingular}">+</button>
    </div>
</div>`;

const formulario = `
<form class="passaporte" id="rsvp" novalidate>
    <label class="campo">
        <span>Nome do responsável</span>
        <input name="nome" type="text" autocomplete="name" required>
    </label>
    <p class="erro" data-erro="nome" hidden></p>

    <fieldset class="escolha">
        <legend>A equipe vem?</legend>
        <label><input type="radio" name="presenca" value="sim"><span>Vamos, sim</span></label>
        <label><input type="radio" name="presenca" value="nao"><span>Não poderemos</span></label>
    </fieldset>
    <p class="erro" data-erro="presenca" hidden></p>

    <label class="campo" data-so-presenca>
        <span>Nome das crianças</span>
        <input name="criancasNomes" type="text">
    </label>
    ${contador('adultos', 'Adultos', 0, rsvp.maxAdultos, 1, 'adulto')}
    ${contador('criancas', 'Crianças', 0, rsvp.maxCriancas, 1, 'criança')}
    <p class="erro" data-erro="adultos" hidden></p>

    <label class="campo" data-so-presenca>
        <span>Alergias ou recados (opcional)</span>
        <textarea name="observacoes" rows="2" maxlength="300"></textarea>
    </label>

    <button type="submit" class="botao botao--cheio">Enviar pelo WhatsApp</button>
</form>
<div class="passaporte" id="rsvp-painel" tabindex="-1" hidden>
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
    <h2 id="t-confirmar" class="titulo">Monte sua equipe</h2>
    ${!jaPassou && prazo ? `<p>Responda até ${esc(prazo)} ${esc(rsvp.nota)}</p>` : ''}
    ${jaPassou ? `<p class="confirmar__fim">${esc(config.textos.depoisDoEvento)}</p>` : formulario}
</section>` : '';

const final = `
<footer class="final">
    <div class="final__bichos" aria-hidden="true">${animais.macaco()}${animais.elefante()}${animais.leao()}</div>
    <p class="final__titulo">${esc(encerramento.titulo)}</p>
    <p>${esc(encerramento.texto)}</p>
    ${ativo(config, 'compartilhar') ? '<button type="button" class="botao" data-acao="compartilhar">Compartilhar convite</button>' : ''}
</footer>`;

function ligarBichosDaCapa() {
    $$('.bicho').forEach((bicho) => {
        const balao = document.createElement('span');
        balao.className = 'balao';
        balao.setAttribute('aria-hidden', 'true');
        balao.textContent = bicho.dataset.som;
        bicho.append(balao);
        bicho.addEventListener('click', () => {
            bicho.classList.remove('falando');
            void bicho.offsetWidth; /* reinicia a animação em toques seguidos */
            bicho.classList.add('falando');
        });
        bicho.addEventListener('animationend', (e) => {
            if (e.target === balao) bicho.classList.remove('falando');
        });
    });
}

function ligarMata() {
    const esconderijos = $$('.esconderijo');
    if (!esconderijos.length) return;
    const placar = $('#placar');
    const refazer = $('#esconder');
    const total = esconderijos.length;

    const atualizar = (ultimo) => {
        const achados = esconderijos.filter((e) => e.getAttribute('aria-pressed') === 'true').length;
        const completo = achados === total;
        placar.textContent = completo ? brincadeira.conclusao : ultimo
            ? `${ultimo} encontrado! Faltam ${total - achados}.`
            : 'Nenhum bicho encontrado ainda.';
        placar.classList.toggle('completo', completo);
        refazer.hidden = achados === 0;
    };

    esconderijos.forEach((esconderijo) => {
        esconderijo.addEventListener('click', () => {
            const achado = esconderijo.getAttribute('aria-pressed') === 'true';
            if (achado) {
                esconderijo.classList.remove('sacudir');
                void esconderijo.offsetWidth;
                esconderijo.classList.add('sacudir');
                return;
            }
            esconderijo.setAttribute('aria-pressed', 'true');
            esconderijo.setAttribute('aria-label', `${esconderijo.dataset.nome} encontrado`);
            atualizar(esconderijo.dataset.nome);
        });
    });

    refazer.addEventListener('click', () => {
        esconderijos.forEach((e, i) => {
            e.setAttribute('aria-pressed', 'false');
            e.setAttribute('aria-label', `Moita ${i + 1}: ver quem está escondido`);
        });
        atualizar();
        esconderijos[0].focus();
    });
}

function iniciar() {
    aplicarCores(config.cores);
    aplicarSeo(config.seo);
    const areia = '#f3e3bf';
    const salvia = '#c8d0ad';
    const oliva = '#5f6b38';
    const marfim = '#fbf5e8';
    $('#convite').innerHTML = `${capa}<main>${chamada}${mata}${onda(areia, oliva)}${contagem}${onda(oliva, salvia, true)}${roteiro}${bilhete}${album}${onda(salvia, marfim)}${mochila}${confirmar}</main>${onda(marfim, oliva, true)}${final}`;

    ligarAcoes({
        calendario: { id: config.id, eventos: [eventoAgenda] },
        compartilhamento: {
            titulo: config.seo.titulo,
            texto: `${crianca.nome} faz ${crianca.idade} e está convocando exploradores. O convite está aqui:`,
        },
    });

    ligarBichosDaCapa();
    ligarMata();

    const relogio = $('#contagem');
    if (relogio) {
        iniciarContagem(evento.inicio, (r) => {
            if (r.encerrado) { relogio.outerHTML = `<p class="tempo__fim">${esc(config.textos.depoisDoEvento)}</p>`; return; }
            $('[data-parte="dias"]', relogio).textContent = r.dias;
            $('[data-parte="horas"]', relogio).textContent = doisDigitos(r.horas);
            $('[data-parte="minutos"]', relogio).textContent = doisDigitos(r.minutos);
            $('[data-parte="segundos"]', relogio).textContent = doisDigitos(r.segundos);
        });
    }

    if (ativo(config, 'galeria') && config.galeria.length) {
        const visor = criarGaleria(config.galeria);
        $$('[data-foto]').forEach((b) => b.addEventListener('click', () => visor.abrir(Number(b.dataset.foto))));
    }

    const form = $('#rsvp');
    if (form) {
        iniciarRsvp(form, $('#rsvp-painel'), {
            whatsapp: config.whatsapp,
            validar: (d) => (d.presenca === 'sim' && Number(d.adultos) + Number(d.criancas) < 1
                ? { adultos: 'Informe ao menos uma pessoa na equipe.' }
                : {}),
            montarMensagem: (d) => {
                const vem = d.presenca === 'sim';
                return [
                    `*${evento.titulo}*`,
                    `*Responsável:* ${d.nome}`,
                    `*Resposta:* ${vem ? 'Vamos, sim' : 'Não poderemos ir'}`,
                    ...(vem && d.criancasNomes?.trim() ? [`*Crianças:* ${d.criancasNomes.trim()}`] : []),
                    ...(vem ? [`*Quantidade:* ${d.adultos} adulto(s) e ${d.criancas} criança(s)`] : []),
                    ...(vem && d.observacoes?.trim() ? [`*Observações:* ${d.observacoes.trim()}`] : []),
                ].join('\n');
            },
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
