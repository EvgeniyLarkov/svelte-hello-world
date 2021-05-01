<script lang="ts">
  import { onMount } from "svelte";
  import drowPlanet from "./core";

  let wrapper: HTMLElement;
  let setPlanetControl = (x: boolean) => {};

  function handleMouseEnter() {
    setPlanetControl(true);
  };

  const handleMouseLeave = () => {
    setPlanetControl(false);
  };

  onMount(() => {
    setPlanetControl = drowPlanet(wrapper);
  });
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
