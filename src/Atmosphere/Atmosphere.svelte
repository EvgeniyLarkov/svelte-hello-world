<script lang="ts">
  let canvas: HTMLCanvasElement;
  const width = window.innerWidth;
  const height = 200;
</script>

<canvas bind:this={canvas} {width} {height} />
