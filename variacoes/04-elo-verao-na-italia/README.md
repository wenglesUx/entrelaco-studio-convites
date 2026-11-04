# Elo · Mulheres que Movem · Verão na Itália

Convite digital do encontro **Elo Mulheres que Movem** (15 de novembro de 2026, a partir das 14h, Espaço Kzarão, Jardim Zuleika).

É uma releitura do convite oficial publicado no Canva, com tema Verão na Itália: mesma estrutura e mesmo conteúdo, com fotografias reais da costa amalfitana, programação em destaque e recursos que o original não tinha.

## Ver a página

Na raiz do projeto, com Node.js 20 ou superior:

```bash
node variacoes/servir.mjs
```

Abra http://localhost:4173/variacoes/04-elo-verao-na-italia/

A página usa módulos JavaScript, então não abre com duplo clique no `index.html`: use o servidor.

## Antes de enviar às convidadas

1. **Configure a confirmação de presença.** Hoje ela está em modo demonstração. Em `config.js`, preencha **um** destes campos:
   - `confirmacao.link`: o endereço do formulário que gera o QR code. O botão "Confirmar presença" passa a abrir esse formulário, e o texto volta a prometer o QR code.
   - `whatsapp`: número com DDI + DDD, por exemplo `5561999998888`. Sem link, a convidada preenche nome e resposta, e o WhatsApp abre com a mensagem pronta.

   No convite do Canva os botões "Localização" e "Confirmação" não tinham destino, por isso nenhum dos dois vem preenchido.
2. **Confira o local.** O convite original não informa endereço, então os botões de mapa buscam por "Espaço Kzarão, Jardim Zuleika". Com o endereço completo, troque `local.busca`.
3. **Confira o horário de término.** Na agenda o evento vai até 18h30 (`evento.fim`), porque o convite só informa o encerramento às 18h.
4. **Publique com o endereço final** (veja abaixo). Sem ele, a imagem de prévia não aparece quando o link é compartilhado no WhatsApp.

## Seções

| Seção | Conteúdo | Foto de fundo |
|---|---|---|
| Abertura | Marca Elo, chamada, data, local e botão de confirmação | Positano |
| Um encontro memorável | Apresentação do Elo | Terraço com buganvílias, em arco |
| Temas | Imagem, mentalidade e crescimento financeiro | Guarda-sóis azuis de Positano |
| Programação | Os nove horários do encontro, com destaque para as palestras | Pérgula de limoeiros e majólica |
| Palestrantes | Ju Cardoso e Walesca Borges, com Instagram | Panorama de Ravello na transição |
| Convite | Data, local, contagem regressiva, mapas, agenda e observação | Terraço de Ravello |
| Confirmação | Foto das anfitriãs, confirmação e aviso sobre restrição alimentar | Guarda-sóis listrados |
| Encerramento | Frases do evento, compartilhar, realização, parceria e créditos | Faraglioni de Capri |

## Funcionalidades

- Contagem regressiva até o início do encontro.
- Confirmação de presença por link externo ou pelo WhatsApp (veja acima).
- Google Maps e Waze a partir do nome do espaço.
- Arquivo `.ics` para a agenda do celular e link para o Google Agenda.
- Compartilhamento pelo celular, com cópia do link quando o navegador não oferece essa opção.
- Links para o Instagram das palestrantes.
- Respeito à preferência do sistema por menos movimento.
- Depois da data, a contagem e a confirmação são substituídas por uma mensagem de encerramento.

## Como alterar o conteúdo

Todo o conteúdo fica em `config.js`. Não é preciso mexer no HTML, no CSS nem no JavaScript.

| Campo | O que controla |
|---|---|
| `marca` | Nome da marca e assinatura da abertura |
| `evento` | Título, início, fim e fuso (para contagem e agenda) |
| `local` | Nome do espaço, bairro, texto da busca nos mapas e foto do espaço |
| `abertura`, `apresentacao`, `temas` | Textos das primeiras seções |
| `programacao.itens` | Horários. Use `pessoa` para destacar quem conduz. Itens com `atividade: 'Palestra'` e `pessoa` igual ao nome de uma palestrante viram cartão com foto e tema |
| `palestrantes` | Nome, palestra, descrição, Instagram (sem @) e foto |
| `convite`, `presenca` | Título, observação, foto das anfitriãs e aviso de restrição alimentar |
| `confirmacao`, `whatsapp` | Destino da confirmação de presença |
| `encerramento.frases` | Frases da seção final |
| `realizacao`, `parceria` | Logos do rodapé. `redondo: true` recorta o logo em círculo |
| `ambientacao` | Fotos de fundo de cada seção |
| `creditosFotos` | Créditos exibidos no rodapé |
| `seo` | Título e descrição da aba e da prévia de compartilhamento |
| `recursos` | Use `false` para esconder contagem, temas, programação, palestrantes, confirmação, agenda ou compartilhamento |

## Fotos

**Fotos do evento** (`assets/fotos/`): `ju-cardoso`, `walesca-borges`, `anfitrias`, `espaco-kzarao` e os três logos vieram do convite original. Duas fotos foram recortadas para tirar a interface do Instagram, e os logos tiveram o fundo bege removido.

**Fotos de ambientação:** fotografias reais de Positano, Ravello, Capri e da majólica do claustro de Santa Chiara, em Nápoles, baixadas do Wikimedia Commons com licenças livres (CC0, CC BY e CC BY-SA). As licenças CC BY e CC BY-SA exigem crédito ao autor, por isso o rodapé mostra os créditos com links. **Não remova essa linha** enquanto essas fotos estiverem no convite.

As aquarelas do convite do Canva não foram reaproveitadas, porque a licença do Canva não permite usar esses elementos fora da plataforma.

**Para trocar uma foto:** coloque o novo arquivo em `assets/fotos/`, de preferência em WebP com até 2000 px de largura, e atualize o caminho em `config.js`. Se a nova foto for de outra fonte, atualize também `creditosFotos`.

A imagem de prévia do WhatsApp é `assets/og.jpg` (1200 × 630 px).

## Publicar

Gere uma pasta pronta para publicar sozinha, com o endereço final do site:

```bash
node variacoes/empacotar.mjs 04-elo-verao-na-italia --url https://endereco-final.netlify.app
```

O resultado fica em `variacoes/dist/04-elo-verao-na-italia/`. Arraste essa pasta para [app.netlify.com/drop](https://app.netlify.com/drop) ou publique em qualquer hospedagem estática. O script avisa se faltar o WhatsApp ou o endereço final.

## Arquivos

| Arquivo | Função |
|---|---|
| `config.js` | Todo o conteúdo do convite |
| `index.html` | Título, descrição e prévia de compartilhamento |
| `app.js` | Montagem das seções e ligação com as funções compartilhadas |
| `estilo.css` | Visual da página |
| `ilustracoes.js` | Traço caligráfico da marca Elo |
| `assets/fontes/` | Bodoni Moda, Italiana e EB Garamond (licença SIL Open Font) |
| `assets/fotos/` | Fotos do evento, de ambientação e logos |

As funções de contagem, agenda, mapas, confirmação e compartilhamento ficam em `variacoes/compartilhado/` e são as mesmas dos outros convites.
