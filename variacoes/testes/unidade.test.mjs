// Na raiz do projeto:  node --test variacoes/testes/
import test from 'node:test';
import assert from 'node:assert/strict';
import { calcularRestante } from '../compartilhado/contagem.js';
import { gerarIcs, linkGoogleAgenda } from '../compartilhado/calendario.js';
import { linkGoogleMaps, linkWaze } from '../compartilhado/mapas.js';
import { linkWhatsapp, normalizarWhatsapp } from '../compartilhado/rsvp.js';

const alvo = '2027-03-20T20:00:00-03:00';

test('contagem decompõe dias, horas, minutos e segundos', () => {
    const agora = new Date(alvo).getTime() - ((2 * 86400 + 3 * 3600 + 4 * 60 + 5) * 1000);
    const r = calcularRestante(alvo, agora);
    assert.deepEqual(
        [r.dias, r.horas, r.minutos, r.segundos, r.encerrado],
        [2, 3, 4, 5, false],
    );
});

test('contagem nunca fica negativa depois do evento', () => {
    const r = calcularRestante(alvo, new Date(alvo).getTime() + 86400000);
    assert.deepEqual(
        [r.total, r.dias, r.horas, r.minutos, r.segundos, r.encerrado],
        [0, 0, 0, 0, 0, true],
    );
});

test('contagem recusa data inválida', () => {
    assert.equal(calcularRestante('não é data'), null);
});

const evento = {
    titulo: 'Festa de Ana, com brinde; às 20h',
    inicio: alvo,
    fim: '2027-03-21T01:00:00-03:00',
    local: 'Casa Exemplo, Rua Fictícia, 100',
    descricao: 'Linha um\nLinha dois com acentuação çãõé repetida para forçar dobra de linha longa no arquivo gerado',
};

test('ics é válido: CRLF, horário em UTC, escapes e dobra de 75 bytes', () => {
    const ics = gerarIcs({ id: 'teste', eventos: [evento] }, new Date('2026-11-02T12:00:00Z'));
    assert.ok(ics.endsWith('\r\n'));
    assert.ok(!/[^\r]\n/.test(ics), 'toda quebra precisa ser CRLF');
    assert.match(ics, /DTSTART:20270320T230000Z/);
    assert.match(ics, /DTEND:20270321T040000Z/);
    assert.match(ics, /SUMMARY:Festa de Ana\\, com brinde\\; às 20h/);
    assert.match(ics, /TRIGGER:-PT24H/);
    const codificador = new TextEncoder();
    ics.split('\r\n').forEach((linha) => assert.ok(codificador.encode(linha).length <= 75, linha));
    const desdobrado = ics.replace(/\r\n /g, '');
    assert.match(desdobrado, /Linha um\\nLinha dois/);
});

test('ics aceita dois eventos com UIDs distintos', () => {
    const ics = gerarIcs({ id: 'x', eventos: [evento, evento] });
    assert.equal(ics.match(/BEGIN:VEVENT/g).length, 2);
    assert.match(ics, /UID:x-1@/);
    assert.match(ics, /UID:x-2@/);
});

test('link do Google Agenda usa intervalo em UTC', () => {
    assert.match(linkGoogleAgenda(evento), /dates=20270320T230000Z%2F20270321T040000Z/);
});

test('mapas priorizam coordenadas e caem para o endereço', () => {
    const comCoord = { nome: 'A', endereco: 'B', latitude: -23.5, longitude: -46.6 };
    assert.match(linkGoogleMaps(comCoord), /query=-23\.5%2C-46\.6/);
    assert.equal(linkWaze(comCoord), 'https://waze.com/ul?ll=-23.5,-46.6&navigate=yes');
    const semCoord = { nome: 'Casa', endereco: 'Rua X, 1' };
    assert.match(linkGoogleMaps(semCoord), /query=Casa%2C%20Rua%20X%2C%201/);
    assert.match(linkWaze(semCoord), /q=Rua%20X%2C%201/);
    assert.equal(linkGoogleMaps({}), null);
    assert.equal(linkWaze({}), null);
});

test('whatsapp normaliza formatos e rejeita número ausente ou curto', () => {
    assert.equal(normalizarWhatsapp('+55 (11) 90000-0000'), '5511900000000');
    assert.equal(normalizarWhatsapp(''), '');
    assert.equal(normalizarWhatsapp('12345'), '');
    assert.equal(linkWhatsapp('', 'oi'), null);
    assert.equal(
        linkWhatsapp('5511900000000', 'Olá, & tudo?\n2'),
        'https://wa.me/5511900000000?text=Ol%C3%A1%2C%20%26%20tudo%3F%0A2',
    );
});
