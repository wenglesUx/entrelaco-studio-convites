# Catálogo de convites digitais · Entrelaço Studio

Três convites demonstrativos construídos sobre a mesma base funcional, cada um com identidade visual própria. O convite de casamento continua na raiz do projeto e não depende de nada desta pasta.

| Convite | Ocasião | Pasta | Ideia central |
|---|---|---|---|
| **Noite de Celebração** | Aniversários adultos, jantares | `01-aniversario-adulto/` | Editorial em blocos de cor ligados por imagens; o número da idade é preenchido por luz de velas |
| **Noite de Estrelas** | Festa de 15 anos | `02-festa-15-anos/` | A página é a noite: constelação na abertura, céu amanhecendo no fim da rolagem |
| **Pequenos Exploradores** | Infantil, tema Safari | `03-aniversario-infantil/` | Livro ilustrado com sol que nasce com a idade e bichos escondidos nas moitas |

## Como executar

Não há build nem dependências. É preciso Node.js 20 ou superior apenas para o servidor local e os scripts.

```bash
# na raiz do projeto
node variacoes/servir.mjs
```

| Versão | Endereço local |
|---|---|
| Casamento | http://localhost:4173/ |
| Aniversário adulto | http://localhost:4173/variacoes/01-aniversario-adulto/ |
| 15 anos | http://localhost:4173/variacoes/02-festa-15-anos/ |
| Infantil Safari | http://localhost:4173/variacoes/03-aniversario-infantil/ |

Os convites usam módulos JavaScript, então não abrem com duplo clique no arquivo: use o servidor.

Testes das funções compartilhadas (contagem, calendário, mapas e WhatsApp):

```bash
node --test variacoes/testes/
```

## Organização

```
variacoes/
├── compartilhado/          Funcionalidades, sem nenhuma decisão visual
│   ├── nucleo.js           Utilidades, cores do config, avisos, datas no fuso do evento
│   ├── contagem.js         Contagem regressiva
│   ├── calendario.js       Arquivo .ics e link do Google Agenda
│   ├── mapas.js            Links do Google Maps e do Waze
│   ├── rsvp.js             Validação e mensagem do WhatsApp
│   ├── compartilhar.js     Compartilhamento nativo e cópia
│   ├── acoes.js            Liga botões do HTML às funções acima
│   ├── galeria.js          Visualização ampliada
│   ├── movimento.js        Preferência de redução de movimento
│   └── base.css            Reset e estrutura da galeria e dos avisos
├── 0X-nome-do-convite/
│   ├── config.js           TODOS os dados do evento
│   ├── index.html          Metadados para buscadores e compartilhamento
│   ├── app.js              Composição do convite
│   ├── estilo.css          Sistema visual exclusivo
│   └── assets/             Fontes, imagens e imagem de compartilhamento
├── empacotar.mjs           Gera uma pasta publicável de um convite
├── servir.mjs              Servidor local
└── testes/                 Testes automatizados
```

O 02 tem ainda `constelacao.js` (abertura animada) e o 03 tem `ilustracoes.js` (os animais em SVG).

## Personalizar para um cliente

1. Copie a pasta do modelo, por exemplo `02-festa-15-anos` para `cliente-maria-15`.
2. Edite **somente** `config.js`: nomes, datas com fuso, locais, textos, programação e presentes. Ele está comentado.
3. Preencha `whatsapp` com DDI + DDD + número, como `5531999998888`.
4. Substitua as imagens (seção abaixo).
5. Publique (seção "Publicar").

### Recursos e cores

No `config.js`:

- `recursos`: coloque `false` para retirar uma seção ou um botão. Exemplo: `galeria: false`.
- `cores`: sobrescreve as variáveis do início de `estilo.css`. Exemplo no 01: `cores: { terracota: '#7a3b2e' }`.
- `etapas` (só no 02): uma ou duas etapas. Cada uma tem endereço, mapas e evento de agenda próprios. Com duas, os títulos ganham "Ato I" e "Ato II".
- `marco: true` em `programacao` (só no 02): destaca os itens que correspondem às etapas.
- `playlist.url` (só no 02): link externo. Vazio esconde o botão. Nunca há reprodução automática.

### Substituir fotografias e ilustrações

Todas as imagens dos convites 01 e 02 são **ilustrações demonstrativas geradas por código**. Não são fotografias reais e devem ser trocadas nos pedidos de clientes.

- Coloque as fotos em `assets/fotos/` e atualize `src`, `alt` e `legenda` no `config.js`.
- Tamanho sugerido: até 1400 px no lado maior, em WebP ou JPG, com até 150 KB por foto.
- Galeria do 01: na grade, `destaque: true` ocupa dois blocos de largura e dois de altura, e `larga: true` ocupa dois de largura. Com quatro fotos, use uma de cada e duas simples.
- Programação do 01: `programacaoFoto` define a foto vertical ao lado dos horários. Sem ela, a seção fica só com o texto.
- Capa do 01: `assets/fotos/velas-numero.webp` preenche o número. Use uma imagem clara e quente, ou o número perde leitura contra o fundo.
- Capa do 02: `abertura.foto` funciona melhor em retrato vertical com fundo escuro. O texto fica sobre a parte inferior.
- Galeria do 02: no desktop, a primeira e a terceira fotos ficam maiores. Evite repetir a foto da capa.
- Traje do 02: `dressCode.foto` define a imagem ao lado das orientações. Sem ela, a seção fica só com o texto.
- Galeria do 03: aceita fotos reais no lugar dos SVG. Os animais da capa e das moitas vêm de `ilustracoes.js`.
- Imagem de compartilhamento: troque `assets/og.jpg`, em 1200 × 630 px. Sem isso, o WhatsApp mostrará a prévia do modelo.

## Backups

A pasta `_backups/` guarda versões anteriores, cada uma com a própria cópia de `compartilhado/` para abrir sozinha. O `LEIAME.txt` de cada backup explica como ver e restaurar. Ela não é usada pelos convites atuais e não entra nos pacotes gerados por `empacotar.mjs`.

## Publicar

Cada convite pode ser publicado sozinho:

```bash
node variacoes/empacotar.mjs 02-festa-15-anos --url https://endereco-final.netlify.app
```

O resultado fica em `variacoes/dist/02-festa-15-anos/`. Arraste essa pasta para [app.netlify.com/drop](https://app.netlify.com/drop) ou publique-a em qualquer hospedagem estática.

O script copia o código compartilhado para dentro do pacote, sincroniza título e descrição com o `config.js` e grava os endereços absolutos que o WhatsApp exige para exibir a imagem. Ele avisa se faltar número de WhatsApp ou URL.

> **Atenção:** o `netlify.toml` da raiz publica a pasta inteira (`publish = "."`). Se o projeto for implantado da raiz, os convites demonstrativos ficam acessíveis no site do casamento, em `/variacoes/...`.

## Funcionalidades

| Funcionalidade | 01 | 02 | 03 |
|---|---|---|---|
| Contagem regressiva, sem negativos após o evento | ✓ | ✓ | ✓ |
| RSVP por WhatsApp com presença ou ausência | ✓ | ✓ | ✓ |
| Acompanhantes | ✓ | ✓ com nomes | adultos e crianças |
| Responsável, nomes das crianças e alergias | | | ✓ |
| Agenda: arquivo `.ics` | ✓ | ✓ um evento por etapa | ✓ |
| Agenda: link do Google | ✓ | | |
| Google Maps, Waze e copiar endereço | ✓ | ✓ por etapa | ✓ |
| Compartilhar, com cópia do link como alternativa | ✓ | ✓ | ✓ |
| Galeria ampliada: teclado, toque e foco | ✓ com legendas | ✓ carrossel no celular, grade no desktop | ✓ |
| Programação | ✓ | ✓ linha do tempo | ✓ mapa |
| Dress code | ✓ paleta | ✓ orientações | |
| Presentes e chave Pix | ✓ | ✓ | ✓ |
| Confirmar a partir da capa e barra fixa | ✓ | | |
| Abertura com revelação | | ✓ | ✓ entrada animada |
| Céu que muda com a rolagem | | ✓ | |
| Playlist externa | | ✓ | |
| Bichos que respondem ao toque e moitas | | | ✓ |
| Informações para os responsáveis | | | ✓ |
| Redução de movimento respeitada | ✓ | ✓ | ✓ |

## Dependem de configuração

| Item | Onde | Sem configurar |
|---|---|---|
| Número de WhatsApp | `whatsapp` | Modo demonstração: mostra a mensagem, avisa que falta o número e não abre nenhum contato |
| Endereço final | `seo.siteUrl` ou `--url` | A imagem não aparece ao compartilhar no WhatsApp |
| Coordenadas | `latitude` e `longitude` | Os mapas usam o endereço escrito, com menor precisão |
| Chave Pix | `pix` | O botão de copiar some |
| Playlist | `playlist.url` | O botão some |

## O que ainda não está implementado

- **Não há banco de dados nem painel.** A resposta só chega ao organizador se o convidado tocar em enviar no WhatsApp. O convite não sabe quem confirmou.
- Não há lista de presentes com reserva de itens, como a do casamento. Os presentes são apenas sugestões e chave Pix.
- Não há convite individual por link nem nome do convidado preenchido automaticamente.
- Não há pagamento: o Pix é só cópia da chave.
- O número da constelação da abertura do 02 está fixo em "15".

## Licenças

As fontes são distribuídas sob a SIL Open Font License e estão em cada `assets/fontes/`: Gloock, Schibsted Grotesk, Bodoni Moda, Jost, Caprasimo e Alegreya. Imagens e ilustrações foram criadas para este projeto. Todos os nomes, endereços, coordenadas e chaves Pix são fictícios.
