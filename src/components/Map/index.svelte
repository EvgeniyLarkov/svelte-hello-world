<script lang="ts">
  import Map from "./Map.svelte";
  import MapForm from "./MapForm.svelte";
  import "../../styles/variables.css";
  import { markers } from "src/store";
  import FormNotification from "./FormNotification.svelte";

  let messages: Array<{
    msg: string;
    type: "error" | "success" | "warning";
  }> = [];

  let data: {
    position: mapboxgl.LngLat | null;
    author: string | null;
    text: string | null;
  } = {
    position: null,
    author: null,
    text: null,
  };

  const setData = (x: Partial<typeof data>) => {
    data = { ...data, ...x };
  };

  const addMarker = () => {
    const { position, author, text } = data;
    markers.update((items) => [
      ...items,
      {
        position,
        author,
        text,
      },
    ]);
  };

  const submitForm = () => {
    addMarker();
    addMessage({
      msg: "Marker added",
      type: "success",
    });
  };

  const addMessage = (...msg: typeof messages) => {
    messages = [...messages, ...msg];
  };
</script>

<div class="container">
  <h2>Place your marker on the map</h2>
  <Map {setData} />
  {#if messages.length > 0}
    {#each messages as message}
      <FormNotification variant={message.type}>
        <span>{message.msg}</span>
      </FormNotification>
    {/each}
  {/if}
  <MapForm {setData} {addMessage} {submitForm} />
</div>

<style>
  .container {
    padding: var(--spacing-xl);
  }
</style>
