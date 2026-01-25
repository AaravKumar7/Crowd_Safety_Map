const map = L.map("map").setView([28.6139, 77.2090], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

fallbackUnsafeAreas.forEach(area => {
  L.marker([area.lat, area.lng])
    .addTo(map)
    .bindPopup(`<strong>Unsafe Area</strong><br>${area.reason}`);
});
