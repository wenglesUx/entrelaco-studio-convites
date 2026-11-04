/* ELO · MULHERES QUE MOVEM · tema Verão na Itália
   Conteúdo transcrito do convite oficial publicado no Canva. Para outro evento,
   altere somente este arquivo e as imagens em assets/fotos.                      */

export default {
    id: 'elo-mulheres-que-movem',

    marca: {
        nome: 'Elo',
        assinatura: 'Mulheres que movem',
    },

    evento: {
        titulo: 'Elo · Mulheres que movem',
        inicio: '2026-11-15T14:00:00-03:00',
        /* O convite informa o encerramento às 18h. O fim abaixo é usado só na agenda. */
        fim: '2026-11-15T18:30:00-03:00',
        fuso: 'America/Sao_Paulo',
        descricao: 'Uma tarde de inspiração, conhecimento e conexões entre mulheres empreendedoras.',
    },

    local: {
        nome: 'Espaço Kzarão',
        bairro: 'Jardim Zuleika',
        /* Sem coordenadas no convite original: os mapas buscam pelo nome do espaço. */
        busca: 'Espaço Kzarão, Jardim Zuleika',
        foto: 'assets/fotos/espaco-kzarao.webp',
        fotoAlt: 'Entrada do Espaço Kzarão, com porta de madeira aberta para um corredor com limoeiros',
    },

    abertura: {
        chamada: 'Um encontro entre mulheres que escolheram construir, crescer e transformar.',
    },

    apresentacao: {
        titulo: 'Um encontro memorável',
        paragrafos: [
            'O Elo Mulheres que Movem nasceu para conectar mulheres, histórias, experiências e oportunidades. É um espaço para mulheres empreendedoras compartilharem conhecimentos, fortalecerem suas marcas e crescerem juntas.',
            'Porque quando uma mulher se movimenta, ela abre caminhos. Quando mulheres se conectam, elas multiplicam possibilidades.',
        ],
    },

    temas: {
        itens: ['Imagem', 'Mentalidade', 'Crescimento financeiro'],
        texto: 'Três dimensões que se conectam para fortalecer mulheres e seus negócios.',
    },

    programacao: {
        titulo: 'Programação',
        subtitulo: 'Uma tarde de inspiração, conhecimento e conexões entre mulheres empreendedoras.',
        /* `pessoa` aparece em destaque ao lado da atividade. */
        itens: [
            { hora: '14h', atividade: 'Recepção e boas-vindas' },
            { hora: '14h30', atividade: 'Abertura oficial', pessoa: 'Caroline' },
            { hora: '14h40', atividade: 'Apresentação das participantes' },
            { hora: '15h', atividade: 'Palestra', pessoa: 'Ju Cardoso' },
            { hora: '15h40', atividade: 'Momento de conexão entre as palestras' },
            { hora: '15h45', atividade: 'Palestra', pessoa: 'Walesca Borges' },
            { hora: '16h25', atividade: 'Momento especial', pessoa: 'Sabrina' },
            { hora: '17h10', atividade: 'Coffee break e networking' },
            { hora: '18h', atividade: 'Encerramento do encontro' },
        ],
    },

    palestrantes: [
        {
            nome: 'Ju Cardoso',
            palestra: 'Vista a sua marca.',
            descricao: 'Como sua imagem comunica o valor do seu negócio.',
            instagram: 'jucardoso.estilo',
            foto: 'assets/fotos/ju-cardoso.webp',
            fotoAlt: 'Ju Cardoso sorrindo, de vestido de cetim e blazer branco',
        },
        {
            nome: 'Walesca Borges',
            palestra: 'Pare de se sabotar.',
            descricao: 'Os bloqueios emocionais que impedem seu crescimento financeiro.',
            instagram: 'walescaborgesoficial',
            foto: 'assets/fotos/walesca-borges.webp',
            fotoAlt: 'Walesca Borges de blusa magenta, com a mão na cintura',
        },
    ],

    convite: {
        titulo: 'Você é convidada para esse dia mais que especial.',
        observacao: 'Este convite é individual e exclusivo para a pessoa mencionada. Não será permitida a entrada de acompanhantes ou crianças maiores de 1 ano.',
    },

    presenca: {
        titulo: 'Contamos com a sua presença!',
        foto: 'assets/fotos/anfitrias.webp',
        fotoAlt: 'Caroline e Sabrina de costas uma para a outra, erguendo taças de espumante',
        restricoes: 'Para informar qualquer restrição alimentar, solicitamos que entre em contato diretamente com Caroline ou Sabrina, com antecedência.',
    },

    /* Confirmação de presença. O convite original não tinha um destino configurado.
       - `link`: endereço do formulário que gera o QR code. Se preenchido, o botão leva até ele.
       - `whatsapp`: sem link, o convidado confirma por WhatsApp (DDI + DDD + número).
       Com os dois vazios, o formulário funciona em modo demonstração.                  */
    confirmacao: {
        link: '',
        textoComLink: 'Confirme sua presença e receba seu QR code.',
        textoWhatsapp: 'Confirme sua presença pelo WhatsApp.',
    },
    whatsapp: '',

    encerramento: {
        frases: ['Conhecimento que gera movimento.', 'Mulheres que movem o futuro.'],
    },

    realizacao: [
        { nome: 'Elo Cerimonial', logo: 'assets/fotos/logo-elo-cerimonial.webp' },
    ],
    parceria: [
        { nome: 'Sebrae', logo: 'assets/fotos/logo-sebrae.webp' },
        { nome: 'Feely Gully', logo: 'assets/fotos/logo-feely-gully.webp', redondo: true },
    ],

    /* Fotografias de ambientação (costa amalfitana, Positano, Ravello, Capri e Nápoles).
       Todas de licença livre; as que exigem crédito aparecem no rodapé. */
    ambientacao: {
        abertura: { src: 'assets/fotos/abertura-positano.webp', alt: 'Positano, com casas coloridas descendo a encosta até o mar' },
        encontro: { src: 'assets/fotos/terraco-buganvilias.webp', alt: 'Terraço com buganvílias sobre a praia de Positano' },
        temas: 'assets/fotos/guarda-sois-azuis.webp',
        programacao: 'assets/fotos/pergula-limoeiros.webp',
        majolicaVertical: 'assets/fotos/majolica-coluna.webp',
        majolicaFaixa: 'assets/fotos/majolica-faixa.webp',
        panorama: { src: 'assets/fotos/panorama-mar.webp', alt: 'Jardim de Ravello debruçado sobre o mar da costa amalfitana' },
        convite: { src: 'assets/fotos/terraco-ravello.webp', alt: 'Terraço com arco e estátuas em Ravello, de frente para o mar' },
        presenca: { src: 'assets/fotos/guarda-sois-listrados.webp', alt: 'Guarda-sóis listrados de amarelo e laranja na praia de Positano' },
        encerramento: 'assets/fotos/por-do-sol-capri.webp',
    },

    creditosFotos: [
        { autor: 'Bernard Gagnon', licenca: 'CC BY 4.0', fonte: 'https://commons.wikimedia.org/wiki/File:Positano_(Italy)_03.jpg' },
        { autor: 'Nan Palmero', licenca: 'CC BY 2.0', fonte: 'https://commons.wikimedia.org/wiki/File:Beach_Umbrellas_in_Positano_(41158690680).jpg' },
        { autor: 'Sailko', licenca: 'CC BY-SA 4.0', fonte: 'https://commons.wikimedia.org/wiki/File:Pescia,_Giardino_degli_agrumi_hesperidarium,_di_oscar_tintori_vivai,_16_citrus_limon_amalphitanum_(limone_di_amalfi).jpg' },
        { autor: 'Derbrauni', licenca: 'CC BY-SA 4.0', fonte: 'https://commons.wikimedia.org/wiki/File:Villa_Rufolo_-_terrace_garden_2.JPG' },
        { autor: 'Mihael Grmek', licenca: 'CC BY-SA 4.0', fonte: 'https://commons.wikimedia.org/wiki/File:Ravello_-_Villa_Rufolo_01.jpg' },
        { autor: 'Louis Molino', licenca: 'CC BY-SA 4.0', fonte: 'https://commons.wikimedia.org/wiki/File:Faraglioni_di_Capri_all%27_Alba_foto_di_Louis_Molino.jpg' },
        { autor: 'Punteador', licenca: 'CC BY-SA 4.0', fonte: 'https://commons.wikimedia.org/wiki/File:Santa_Chiara_(Naples)_%E2%80%93_majolica_cloister_%E2%80%93_tiled_pillars_and_cypresses.jpg' },
        { autor: 'Rudolfo Kithera', licenca: 'CC0', fonte: 'https://commons.wikimedia.org/wiki/File:Spiaggia_Grande_(Positano)_-_4.jpg' },
    ],

    seo: {
        titulo: 'Elo · Mulheres que movem · 15 de novembro',
        descricao: 'Você é convidada para o Elo Mulheres que Movem: uma tarde de inspiração, conhecimento e conexões entre mulheres empreendedoras, em 15 de novembro de 2026, no Espaço Kzarão.',
        imagem: 'assets/og.jpg',
        siteUrl: '',
    },

    cores: {},

    recursos: {
        contagem: true,
        temas: true,
        programacao: true,
        palestrantes: true,
        rsvp: true,
        calendario: true,
        compartilhar: true,
    },
};
