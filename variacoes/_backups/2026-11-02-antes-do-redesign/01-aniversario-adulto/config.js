/* NOITE DE CELEBRAÇÃO · dados do convite
   Para um cliente novo, altere somente este arquivo e as imagens em assets/fotos.
   Todos os dados abaixo são fictícios.                                           */

export default {
    id: 'noite-de-celebracao',

    pessoa: {
        nome: 'Marcela',
        sobrenome: 'Duarte',
        idade: 40,
        artigo: 'a',   /* 'a' ou 'o': aparece em "recado para a Marcela" */
    },

    evento: {
        titulo: 'Os 40 de Marcela',
        descricao: 'Traje: elegante, com cor.',
        inicio: '2027-03-20T20:00:00-03:00',
        fim: '2027-03-21T02:00:00-03:00',
        fuso: 'America/Sao_Paulo',
    },

    local: {
        nome: 'Casa Alcântara',
        endereco: 'Rua das Acácias, 318, Vila Madalena, São Paulo, SP',
        latitude: -23.5546,
        longitude: -46.6897,
        observacoes: 'Manobrista na porta. A entrada é pelo jardim lateral, depois do portão de ferro.',
        foto: 'assets/fotos/casa.webp',
        fotoAlt: 'Fachada à noite com quatro janelas em arco iluminadas',
    },

    /* DDI + DDD + número, por exemplo 5511999998888. Vazio ativa o modo demonstração. */
    whatsapp: '',

    apresentacao: {
        abertura: 'Quarenta anos pedem uma mesa comprida, boa música e as pessoas que estiveram por perto em cada uma das décadas.',
        texto: 'Reservei a Casa Alcântara por uma noite inteira. Vai ter jantar, vai ter discurso curto e vai ter pista até alguém acender a luz. Só falta você na lista.',
        assinatura: 'Marcela',
        foto: 'assets/fotos/sombra.webp',
        fotoAlt: 'Sombra de folhas de palmeira projetada em uma parede terracota',
    },

    programacao: [
        { hora: '20h', titulo: 'Portas abertas', detalhe: 'Drinques no jardim' },
        { hora: '21h', titulo: 'Jantar', detalhe: 'Três tempos, mesa única' },
        { hora: '22h30', titulo: 'O brinde', detalhe: 'Prometo ser breve' },
        { hora: '23h', titulo: 'Pista aberta', detalhe: 'Discotecagem de Nina Lobo' },
        { hora: '2h', titulo: 'Saideira', detalhe: 'Caldo quente antes de ir' },
    ],

    dressCode: {
        titulo: 'Elegante, com cor',
        texto: 'Pense em jantar importante, não em baile. Tecidos com caimento, sapato em que dê para dançar e, se quiser entrar na paleta da noite, um destes tons.',
        cores: [
            { nome: 'Vinho', hex: '#5A1F24' },
            { nome: 'Terracota', hex: '#A8482A' },
            { nome: 'Cobre', hex: '#C98B55' },
            { nome: 'Marfim', hex: '#F3EADB' },
        ],
    },

    /* Troque os arquivos por fotografias reais. `destaque` deixa a foto maior na grade. */
    galeria: [
        { src: 'assets/fotos/mesa.webp', alt: 'Duas taças de vinho entre velas acesas', legenda: 'A mesa posta', destaque: true },
        { src: 'assets/fotos/chama.webp', alt: 'Vela acesa em primeiro plano', legenda: 'Luz baixa, a noite toda' },
        { src: 'assets/fotos/brinde.webp', alt: 'Duas taças se tocando em um brinde', legenda: 'O brinde' },
        { src: 'assets/fotos/garrafas.webp', alt: 'Prateleiras com garrafas contra luz âmbar', legenda: 'O bar', destaque: true },
        { src: 'assets/fotos/linho.webp', alt: 'Dobras de um tecido de linho claro', legenda: 'Os detalhes', destaque: true },
    ],

    presentes: {
        titulo: 'Presente',
        texto: 'Sua presença já resolve. Se ainda assim quiser trazer algo, estas são as ideias que eu aceitaria sem cerimônia.',
        opcoes: [
            { titulo: 'Um vinho para a adega', detalhe: 'Tintos encorpados são sempre bem-vindos.' },
            { titulo: 'Um livro que mudou seu ano', detalhe: 'Com dedicatória, por favor.' },
            { titulo: 'Contribuição para a viagem', detalhe: 'Lisboa, em setembro.', pix: 'presente-marcela@exemplo.com' },
        ],
    },

    rsvp: {
        prazo: '2027-03-05T23:59:00-03:00',
        maxAcompanhantes: 3,
        nota: 'A mesa é fechada nesse dia.',
    },

    encerramento: {
        titulo: 'Até lá',
        texto: 'Confirme, escolha a roupa e venha com fome.',
    },

    textos: {
        depoisDoEvento: 'Essa noite já aconteceu. Obrigada a quem esteve lá.',
    },

    seo: {
        titulo: 'Os 40 de Marcela · 20 de março',
        descricao: 'Marcela Duarte convida para uma noite de jantar, brinde e pista em 20 de março de 2027, na Casa Alcântara.',
        imagem: 'assets/og.jpg',
        siteUrl: '',
    },

    /* Sobrescrevem as variáveis de estilo.css. Deixe vazio para usar a paleta padrão. */
    cores: {},

    /* Coloque `false` para retirar uma seção ou um botão do convite. */
    recursos: {
        contagem: true,
        programacao: true,
        dressCode: true,
        galeria: true,
        presentes: true,
        rsvp: true,
        calendario: true,
        compartilhar: true,
    },
};
