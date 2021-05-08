<script lang="ts">
  import "../../styles/variables.css";

  export let variant: "error" | "success" | "warning" | null;
</script>

<div
  class="pure-u-1 notification"
  class:notification-error={variant === "error"}
  class:notification-success={variant === "success"}
  class:notification-warning={variant === "warning"}
>
  <slot />
</div>

<style>
  .notification {
    border-radius: var(--radius-m);
    padding: var(--spacing-m);
  }

  .notification-error {
    background-color: var(--error);
  }

  .notification-success {
    background-color: var(--success);
  }

  .notification-warning {
    background-color: var(--warning);
  }
</style>
