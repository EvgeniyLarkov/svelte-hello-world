<script lang="ts">
  import mapboxgl, { MapMouseEvent, EventData } from "mapbox-gl";
  import { onMount } from "svelte";
  import appendMap from "./map";

  export let setData: (x: { [x: string]: any }) => void;
  let container: HTMLElement;
  let marker: mapboxgl.Marker | null = null;

  const setMapMarker = (map: mapboxgl.Map) => (
    event: MapMouseEvent & EventData
  ) => {
    if (marker !== null) {
      marker.remove();
    }
    marker = new mapboxgl.Marker().setLngLat(event.lngLat).addTo(map);
    setData({ position: marker.getLngLat() })
  };

  onMount(() => {
    const map = appendMap(container);

    map.on("click", setMapMarker(map));
  });
</script>

<div id="map" bind:this={container} />

<style>
  #map {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
</style>
