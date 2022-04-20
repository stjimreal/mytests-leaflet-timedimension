/*
 * @Date: 2022-04-17 22:50:49
 * @LastEditors: LIULIJING
 * @LastEditTime: 2022-04-21 00:22:20
 */
var startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);

var map = L.map('map', {
    zoom: 7,
    fullscreenControl: true,
    timeDimensionControl: true,
    timeDimensionControlOptions: {
        position: 'bottomleft',
        playerOptions: {
            transitionTime: 1000,
        }
    },
    timeDimension: true,
    timeDimensionOptions: {
        // timeInterval: startDate.toISOString() + "/PT72H",
        timeInterval: "2017-01-01/2021-10-30",
        period: "P1DT"
    },
    center: [39.3, 2.9]
});

var portusLayer = L.tileLayer('https://portus.puertos.es/Portus//pathtiles/wave/MED/VHM0/{d}{h}/map//{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://portus.puertos.es/Portus_RT/">Agencia Estatal de Meteorología (AEMET) y Puertos del Estado (OPPE)</a>',
    tms: true,
    maxZoom: 7,
});
var portusTimeLayer = L.timeDimension.layer.tileLayer.portus(portusLayer, {});

var portusBalLayer = L.tileLayer('https://portus.puertos.es/Portus//pathtiles/wave/S12B/VHM0/{d}{h}/map//{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://portus.puertos.es/Portus_RT/">Agencia Estatal de Meteorología (AEMET) y Puertos del Estado (OPPE)</a>',
    tms: true,
    minZoom: 8
});
var portusBalTimeLayer = L.timeDimension.layer.tileLayer.portus(portusBalLayer, {});

var overlayMaps = {
    "Mediterranean wave": portusTimeLayer,
    "Balearic wave": portusBalTimeLayer,
};

var baseLayers = getCommonBaseLayers(map); // see baselayers.js
L.control.layers(baseLayers, overlayMaps).addTo(map);

portusTimeLayer.addTo(map);
portusBalTimeLayer.addTo(map);
