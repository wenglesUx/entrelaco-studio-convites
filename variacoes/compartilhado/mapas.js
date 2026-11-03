/* Links de rota. Coordenadas têm prioridade; sem elas, usa o endereço escrito. */

const temCoordenadas = ({ latitude, longitude } = {}) =>
    Number.isFinite(latitude) && Number.isFinite(longitude);

const enderecoCompleto = (local = {}) =>
    [local.nome, local.endereco].filter(Boolean).join(', ');

export function linkGoogleMaps(local) {
    const consulta = temCoordenadas(local)
        ? `${local.latitude},${local.longitude}`
        : enderecoCompleto(local);
    if (!consulta) return null;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consulta)}`;
}

export function linkWaze(local) {
    if (temCoordenadas(local)) {
        return `https://waze.com/ul?ll=${local.latitude},${local.longitude}&navigate=yes`;
    }
    const endereco = local?.endereco;
    return endereco ? `https://waze.com/ul?q=${encodeURIComponent(endereco)}&navigate=yes` : null;
}
