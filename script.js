const cornerCoords = {
    nw: [-22.01459, -47.43843],
    ne: [-22.01459, -47.42704],
    se: [-22.02573, -47.42704],
    sw: [-22.02573, -47.43843]
};

function initMap() {
    const centerLat = (cornerCoords.sw[0] + cornerCoords.ne[0]) / 2;
    const centerLng = (cornerCoords.sw[1] + cornerCoords.ne[1]) / 2;

    const map = L.map('map', {
        center: [centerLat, centerLng],
        zoom: 17,
        maxBounds: [
            [cornerCoords.sw[0], cornerCoords.sw[1]],
            [cornerCoords.ne[0], cornerCoords.ne[1]]
        ],
        maxBoundsViscosity: 1.0
    });

    // Camada do mapa base
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        opacity: 0.8
    }).addTo(map);

    // Camada da imagem sobreposta
    const imageOverlay = L.imageOverlay('mapa-orientacao.png', [
        [cornerCoords.sw[0], cornerCoords.sw[1]],
        [cornerCoords.ne[0], cornerCoords.ne[1]]
    ], {
        opacity: 0.5,
        interactive: false
    }).addTo(map);

    // Marcadores nos cantos
    L.marker(cornerCoords.nw).addTo(map).bindPopup("Noroeste");
    L.marker(cornerCoords.ne).addTo(map).bindPopup("Nordeste");
    L.marker(cornerCoords.se).addTo(map).bindPopup("Sudeste");
    L.marker(cornerCoords.sw).addTo(map).bindPopup("Sudoeste");

    // Clique para mostrar coordenadas
    map.on('click', (e) => {
        L.popup()
            .setLatLng(e.latlng)
            .setContent(`📍 Lat: ${e.latlng.lat.toFixed(6)}<br>Lng: ${e.latlng.lng.toFixed(6)}`)
            .openOn(map);
    });

    // 🎚️ Controles de opacidade
    const mapSlider = document.getElementById('mapOpacity');
    const imageSlider = document.getElementById('imageOpacity');

    mapSlider.addEventListener('input', () => {
        tileLayer.setOpacity(parseFloat(mapSlider.value));
    });

    imageSlider.addEventListener('input', () => {
        imageOverlay.setOpacity(parseFloat(imageSlider.value));
    });

    return map;
}

document.addEventListener('DOMContentLoaded', () => {
    initMap();
});
