<script lang="ts">
  import { onMount } from "svelte";
  import Sky from "./Cosmos/Sky.svelte";
  import Planet from "./Planet/Planet.svelte";
  let name: string = "world";

</script>

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte 04k01</a> to learn how
    to build Svelte apps.
  </p>
</main>
<div class="bg-cosmos">
  <Sky />
  <Planet />
</div>

<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    width: 100%;
    height: 2000px;
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
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>
