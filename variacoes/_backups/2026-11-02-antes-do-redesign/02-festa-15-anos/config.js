/* NOITE DE ESTRELAS · dados do convite
   Para um cliente novo, altere somente este arquivo e as imagens em assets/fotos.
   Todos os dados abaixo são fictícios.                                           */

export default {
    id: 'noite-de-estrelas',

    debutante: {
        nome: 'Valentina',
        sobrenome: 'Aguiar',
        idade: 15,
    },

    evento: {
        titulo: 'Os 15 anos de Valentina',
        fuso: 'America/Sao_Paulo',
        /* Referência da contagem regressiva: o início da primeira etapa. */
        inicio: '2027-05-15T18:30:00-03:00',
    },

    /* Uma ou duas etapas. Com uma só, o convite mostra um único local. */
    etapas: [
        {
            nome: 'Cerimônia',
            local: 'Capela de Santa Clara',
            endereco: 'Praça da Liberdade, 77, Funcionários, Belo Horizonte, MG',
            latitude: -19.9321,
            longitude: -43.9378,
            inicio: '2027-05-15T18:30:00-03:00',
            fim: '2027-05-15T19:30:00-03:00',
            descricao: 'Bênção e entrada da família.',
            foto: 'assets/fotos/capela.webp',
            fotoAlt: 'Três janelas altas em arco, iluminadas em uma capela escura',
        },
        {
            nome: 'Recepção',
            local: 'Salão Aurora',
            endereco: 'Avenida dos Ipês, 1500, Belvedere, Belo Horizonte, MG',
            latitude: -19.9742,
            longitude: -43.9416,
            inicio: '2027-05-15T20:30:00-03:00',
            fim: '2027-05-16T03:00:00-03:00',
            descricao: 'Jantar, valsa e festa.',
            foto: 'assets/fotos/salao.webp',
            fotoAlt: 'Salão de festa com lustres acesos e mesas à luz de velas',
        },
    ],

    /* DDI + DDD + número, por exemplo 5531999998888. Vazio ativa o modo demonstração. */
    whatsapp: '',

    abertura: {
        chamada: 'Uma noite para Valentina',
        botao: 'Abrir o convite',
        foto: 'assets/fotos/retrato.webp',
        fotoAlt: 'Silhueta de jovem de costas, em vestido longo, sob feixes de luz',
    },

    apresentacao: {
        titulo: 'Quinze anos cabem em uma noite',
        texto: 'Meus pais dizem que cresci rápido demais. Eu acho que foi no tempo certo, e quero comemorar com quem acompanhou cada ano. Vai ter valsa, vai ter pista e vai ter muita foto. Vem viver essa noite comigo.',
        assinatura: 'Valentina',
    },

    galeria: [
        { src: 'assets/fotos/retrato.webp', alt: 'Silhueta de vestido longo sob feixes de luz', legenda: 'O vestido' },
        { src: 'assets/fotos/lua.webp', alt: 'Lua crescente em céu estrelado', legenda: 'A noite escolhida' },
        { src: 'assets/fotos/paetes.webp', alt: 'Bordado de paetês em tons de ameixa e rosa', legenda: 'O bordado' },
        { src: 'assets/fotos/petalas.webp', alt: 'Pétalas rosadas caindo sobre um fundo desfocado', legenda: 'As flores' },
        { src: 'assets/fotos/seda.webp', alt: 'Dobras de seda ameixa', legenda: 'A seda' },
    ],

    programacao: [
        { hora: '18h30', titulo: 'Cerimônia', detalhe: 'Capela de Santa Clara' },
        { hora: '20h30', titulo: 'Recepção', detalhe: 'Coquetel no Salão Aurora' },
        { hora: '21h30', titulo: 'Entrada da debutante', detalhe: 'Luzes baixas, todos de pé' },
        { hora: '22h', titulo: 'Valsa', detalhe: 'Com o pai, os padrinhos e as amigas' },
        { hora: '22h30', titulo: 'Jantar', detalhe: 'Serviço à mesa' },
        { hora: '23h30', titulo: 'Pista', detalhe: 'Até o sol pensar em nascer' },
    ],

    dressCode: {
        titulo: 'Traje de gala',
        texto: 'Vestido longo ou midi para elas, terno escuro para eles. A noite pede brilho, e ninguém vai reclamar se você exagerar um pouco.',
        orientacoes: [
            'Rosa blush fica reservado à debutante e às damas.',
            'Branco e off-white ficam para outra festa.',
            'Salto fino afunda no jardim do Salão Aurora: prefira salto bloco.',
            'À noite a temperatura cai, então vale levar um casaco leve.',
        ],
    },

    presentes: {
        titulo: 'Presentes',
        texto: 'Sua presença é o melhor presente. Se quiser me dar algo, a viagem de formatura agradece.',
        pix: 'presente-valentina@exemplo.com',
        lista: '',
    },

    rsvp: {
        prazo: '2027-04-30T23:59:00-03:00',
        maxAcompanhantes: 2,
        destinatario: 'à família da Valentina',
    },

    /* Link externo; vazio esconde o botão. Nunca há reprodução automática. */
    playlist: {
        url: 'https://open.spotify.com/',
        rotulo: 'Ouvir a playlist da festa',
    },

    encerramento: {
        titulo: 'Te vejo sob as estrelas',
        texto: 'Até 15 de maio.',
    },

    textos: {
        depoisDoEvento: 'Essa noite já aconteceu e foi linda. Obrigada por fazer parte dela.',
    },

    seo: {
        titulo: 'Valentina, 15 anos · Noite de Estrelas',
        descricao: 'Valentina Aguiar convida para sua festa de 15 anos em 15 de maio de 2027: cerimônia na Capela de Santa Clara e recepção no Salão Aurora.',
        imagem: 'assets/og.jpg',
        siteUrl: '',
    },

    /* Sobrescrevem as variáveis de estilo.css. Deixe vazio para usar a paleta padrão. */
    cores: {},

    /* Coloque `false` para retirar uma seção ou um botão do convite. */
    recursos: {
        contagem: true,
        galeria: true,
        programacao: true,
        dressCode: true,
        presentes: true,
        rsvp: true,
        playlist: true,
        calendario: true,
        compartilhar: true,
    },
};
