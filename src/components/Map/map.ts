import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamxhcmtvdiIsImEiOiJja283MjRqOGUxcnhvMnBzNWNnODh2M254In0.TN8lKNow2I5pAuozfLkmNg";

function appendMap (node: HTMLElement): mapboxgl.Map {
    return new mapboxgl.Map({
        container: node, // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [30.3197, 59.9388], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
}

export default appendMap;