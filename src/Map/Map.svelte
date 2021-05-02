<script lang="ts">
  import mapboxgl from "mapbox-gl";
  import { onMount } from "svelte";
  import "../styles/variables.css";

  onMount(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiamxhcmtvdiIsImEiOiJja283MjRqOGUxcnhvMnBzNWNnODh2M254In0.TN8lKNow2I5pAuozfLkmNg";
  
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  });
</script>
<div class="container">
  <h2>Place your marker on the map</h2>
  <div id="map" />
</div>


<style>
  .container {
    padding: var(--spacing-xl)
  }

  #map {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
</style>
