<script lang="typescript">
  import { markers } from "src/store";
  import { onDestroy, onMount } from "svelte";
  import drowPlanet from "./core";
  import { MarkerOptions } from "./core/markers";

  let wrapper: HTMLElement;
  let setPlanetControl = (x: boolean) => {};
  let setMarker = (options: MarkerOptions) => {};

  function handleMouseEnter() {
    setPlanetControl(true);
  }

  const handleMouseLeave = () => {
    setPlanetControl(false);
  };

  const unsubscribe = markers.subscribe((value) => {
    if (value.length > 0) {
      const marker = value[value.length - 1];
      setMarker({
        longitude: marker.position.lng,
        latitude: marker.position.lat,
        size: 0.05,
        color: "red",
        radius: 0.5,
        height: 0.2,
      });
    }
  });

  onMount(() => {
    [setPlanetControl, setMarker] = drowPlanet(wrapper);
  });

  onDestroy(unsubscribe);
</script>

<div
  bind:this={wrapper}
  on:mouseover={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
/>

<style>
  div {
    position: absolute;
    width: 500px;
    height: 500px;
  }
</style>
