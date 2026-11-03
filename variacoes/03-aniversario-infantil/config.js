/* PEQUENOS EXPLORADORES · dados do convite
   Para um cliente novo, altere somente este arquivo e as imagens em assets/fotos.
   Todos os dados abaixo são fictícios.                                           */

export default {
    id: 'pequenos-exploradores',

    crianca: {
        nome: 'Theo',
        idade: 5,
    },

    evento: {
        titulo: 'Expedição Safari do Theo',
        descricao: 'Traga uma muda de roupa e tênis fechado.',
        inicio: '2027-02-07T15:00:00-03:00',
        fim: '2027-02-07T19:00:00-03:00',
        fuso: 'America/Sao_Paulo',
    },

    local: {
        nome: 'Sítio Quintal da Mata',
        endereco: 'Estrada do Pinhal, 980, Santa Felicidade, Curitiba, PR',
        latitude: -25.4085,
        longitude: -49.3312,
        referencia: 'Portão verde depois da padaria. Há estacionamento dentro do sítio.',
    },

    /* DDI + DDD + número do responsável, por exemplo 5541999998888.
       Vazio ativa o modo demonstração. */
    whatsapp: '',

    apresentacao: {
        titulo: 'Chamada para a expedição',
        texto: 'O Theo descobriu que existe um mundo inteiro de bichos e decidiu conhecer todos. Para comemorar os 5 anos, ele está montando uma equipe de exploradores. Seu pequeno ou sua pequena já foi escolhido.',
    },

    brincadeira: {
        titulo: 'Tem alguém na mata',
        instrucao: 'Toque nas moitas para descobrir quem veio para a festa.',
        conclusao: 'Você achou todo mundo! Agora só falta confirmar a sua equipe.',
    },

    /* `animal`: leao, girafa, elefante, zebra ou macaco */
    animaisEscondidos: [
        { animal: 'leao', nome: 'Leão', som: 'Roooar!' },
        { animal: 'elefante', nome: 'Elefante', som: 'Prooom!' },
        { animal: 'macaco', nome: 'Macaco', som: 'U-u-a-a!' },
        { animal: 'zebra', nome: 'Zebra', som: 'Iiirrá!' },
        { animal: 'girafa', nome: 'Girafa', som: 'Oi lá de cima!' },
    ],

    atividades: [
        { hora: '15h', titulo: 'Chegada ao acampamento', detalhe: 'Cada criança ganha chapéu e binóculo' },
        { hora: '15h30', titulo: 'Trilha das pegadas', detalhe: 'Caça aos bichos pelo jardim' },
        { hora: '16h30', titulo: 'Pintura de bichos', detalhe: 'Rosto de leão, zebra ou o que pedirem' },
        { hora: '17h', titulo: 'Lanche na savana', detalhe: 'Mesa de frutas, sanduíches e suco' },
        { hora: '18h', titulo: 'Parabéns', detalhe: 'Bolo de cenoura, o favorito do Theo' },
    ],

    responsaveis: {
        titulo: 'Bilhete para os adultos',
        itens: [
            { titulo: 'Roupa', texto: 'Traga uma muda de roupa: a trilha tem grama e terra.' },
            { titulo: 'Sapato', texto: 'Tênis fechado é melhor que sandália.' },
            { titulo: 'Alergias', texto: 'Avise no formulário para adaptarmos o lanche.' },
            { titulo: 'Fraldário', texto: 'Há fraldário e área de sombra para bebês.' },
            { titulo: 'Acompanhamento', texto: 'Crianças até 3 anos ficam com um adulto.' },
            { titulo: 'Se chover', texto: 'A festa continua no galpão coberto do sítio.' },
        ],
    },

    /* Troque os arquivos por fotografias reais da criança. */
    galeria: [
        { src: 'assets/fotos/leao.svg', alt: 'Ilustração de um leão', legenda: 'O chefe da turma' },
        { src: 'assets/fotos/girafa.svg', alt: 'Ilustração de uma girafa', legenda: 'A mais alta da festa' },
        { src: 'assets/fotos/elefante.svg', alt: 'Ilustração de um elefante', legenda: 'Memória de elefante' },
        { src: 'assets/fotos/zebra.svg', alt: 'Ilustração de uma zebra', legenda: 'A mais listrada' },
    ],

    presentes: {
        titulo: 'Para a mochila do Theo',
        texto: 'Presente é opcional. Se quiser levar algo, ele anda gostando de:',
        ideias: ['Livros de bichos', 'Blocos de montar', 'Lupa e binóculo de brinquedo', 'Roupa tamanho 6', 'Tênis número 30'],
        pix: 'theo-presentes@exemplo.com',
    },

    rsvp: {
        prazo: '2027-01-28T23:59:00-03:00',
        maxAdultos: 4,
        maxCriancas: 5,
        nota: 'para reservarmos chapéu e binóculo.',
        destinatario: 'à família do Theo',
    },

    encerramento: {
        titulo: 'Te espero na trilha!',
        texto: 'Assinado: Theo, chefe da expedição.',
    },

    textos: {
        depoisDoEvento: 'A expedição terminou! Obrigado a toda a equipe de exploradores.',
    },

    seo: {
        titulo: 'Theo faz 5! Expedição Safari',
        descricao: 'Sua criança está convocada para a Expedição Safari do Theo: 7 de fevereiro de 2027, às 15h, no Sítio Quintal da Mata.',
        imagem: 'assets/og.jpg',
        siteUrl: '',
    },

    /* Sobrescrevem as variáveis de estilo.css. Deixe vazio para usar a paleta padrão. */
    cores: {},

    /* Coloque `false` para retirar uma seção ou um botão do convite. */
    recursos: {
        contagem: true,
        brincadeira: true,
        atividades: true,
        responsaveis: true,
        galeria: true,
        presentes: true,
        rsvp: true,
        calendario: true,
        compartilhar: true,
    },
};
