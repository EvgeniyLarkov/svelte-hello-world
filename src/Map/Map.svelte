<script lang="ts">
  import mapboxgl, { MapMouseEvent, EventData } from "mapbox-gl";
  import { markers } from "src/store";
  import { onMount } from "svelte";
  import "../styles/variables.css";
  
  function setMarker(event: MapMouseEvent & EventData) {
    const label = "my marker";
    const author = "me";

    const marker = {
      position: event.lngLat,
      label,
      author
    }

    markers.update(data => [...data, marker])
    console.log(marker)
  }

  onMount(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiamxhcmtvdiIsImEiOiJja283MjRqOGUxcnhvMnBzNWNnODh2M254In0.TN8lKNow2I5pAuozfLkmNg";

    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [30.3197, 59.9388], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    map.on("click", setMarker);
  });
</script>

<div class="container">
  <h2>Place your marker on the map</h2>
  <div id="map" />
</div>

<style>
  .container {
    padding: var(--spacing-xl);
  }

  #map {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
</style>
