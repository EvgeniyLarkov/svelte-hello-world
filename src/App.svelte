<script lang="ts">
  import Sky from "./components/Cosmos/Sky.svelte";
  import Map from "./components/Map";
  import Planet from "./components/Planet/Planet.svelte";
  let name: string = "world";
</script>

<main>
  <h1>Hello {name}!</h1>
</main>
<div class="bg-cosmos">
  <Sky width={window.innerWidth} minHeight={window.innerHeight} />
  <Planet />
</div>
<Map />

<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    width: 100%;
    overflow: hidden;

    h1 {
      color: #ff3e00;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
    }

    @media (min-width: 640px) {
      max-width: none;
    }
  }
  .bg-cosmos {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
