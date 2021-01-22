const lookupForm = document.getElementById("lookupForm");
const map = L.map("map");
let markers = map ? new L.FeatureGroup().addTo(map) : null;
let marker;
const inputIp = document.querySelector("#inputIp");

lookupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(inputIp.value);
  const response = axios
    .get(`https://ipapi.co/${inputIp.value}/json`)
    .then((res) => {
      const {
        latitude,
        longitude,
        country_name,
        region,
        city,
        postal,
        ip,
      } = res.data;

      map.setView([latitude, longitude], 10);

      markers.clearLayers();

      marker = new L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(`${city}, ${region}, ${country_name}, ${postal}`)
        .openPopup();

      // asignar al contenedor markers
      markers.addLayer(marker);
    })
    .catch((err) => {
      console.log(err);
      marker
        .bindPopup("write or paste an valid ip")
        .openPopup();
    });
});


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

map.setView([51.505, -0.09], 13);

const response = axios
  .get("https://ipapi.co/json")
  .then((res) => {
    console.log(res);
    const {
      latitude,
      longitude,
      country_name,
      region,
      city,
      postal,
      ip,
    } = res.data;

    inputIp.value = ip;

    map.setView([latitude, longitude], 10);

    marker = new L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(`${city}, ${region}, ${country_name}, ${postal}`)
      .openPopup();

    // asignar al contenedor markers
    markers.addLayer(marker);
  })
  .catch((err) => {
    console.log(err);
  });
