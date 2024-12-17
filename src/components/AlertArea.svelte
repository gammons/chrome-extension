<script>
  import { alertStore } from '$data/stores'

  import Alert from './Alert.svelte'
  import BatchProgressAlert from './BatchProgressAlert.svelte'
</script>

<div
  aria-live="assertive"
  class="pointer-events-none fixed inset-0 flex items-end px-6 py-10 sm:p-24"
>
  <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
    {#each $alertStore as alert}
      {#if alert.type === 'batch_progress'}
        <BatchProgressAlert {alert} />
      {:else}
        <Alert {alert} />
      {/if}
    {/each}
  </div>
</div>
