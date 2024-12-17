<script lang="ts">
  export let alert

  import { alertStore, batchesStore, downloadCurrentBatchStore, modalShowStore } from '$data/stores'

  import classes from 'svelte-transition-classes'
  import Icon from '@components/Icon.svelte'
  import Spinner from '@components/Spinner.svelte'
  import Tooltip from '@components/Tooltip.svelte'
  import { DownloadBatchModalKey } from '$constants'
  import ProgressBar from '@components/ProgressBar.svelte'

  let batch
  let completed = false

  const closeModal = () => {
    alertStore.update((alerts) => alerts.filter((a) => a.uuid !== alert.uuid))
  }

  const onOpenDownloadBatchModal = () => {
    downloadCurrentBatchStore.set(batch)
    modalShowStore.openModal(DownloadBatchModalKey)
  }

  const unsubscribe = batchesStore.subscribe((batches) => {
    const processingBatch = batches.find((b) => b.uuid === alert.uuid)
    if (processingBatch) {
      $: batch = processingBatch
    }

    if (batch.batchState === 'completed') {
      $: completed = true
      setTimeout(closeModal, 30000)
      unsubscribe()
    }
  })
</script>

<div
  in:classes={{
    duration: 300,
    base: 'transition ease-out duration-300',
    from: 'transform opacity-0',
    to: 'transform opacity-100'
  }}
  out:classes={{
    duration: 500,
    base: 'transition ease-in duration-200',
    from: 'transform opacity-100',
    to: 'transform opacity-0'
  }}
  class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border-2 border-gray-400 bg-white shadow-lg ring-2 ring-black ring-opacity-5"
>
  <div class="flex p-4">
    <div class="flex-shrink-0">
      {#if completed}
        <Icon name="done" className="text-green-400" />
      {:else}
        <Spinner />
      {/if}
    </div>

    <div class="grow ms-3 me-5">
      <h3 class="text-gray-800 font-medium text-sm dark:text-white">
        {#if batch.batchState === 'pending_processing'}
          Preparing {batch.name}
        {/if}
        {#if batch.batchState === 'processing'}
          Processing {batch.name}
        {/if}
        {#if batch.batchState === 'completed'}
          Completed {batch.name}
        {/if}
      </h3>

      <!-- Progress -->
      {#if batch.batchState === 'pending_processing'}
        <span class="block mt-3 mb-1.5 text-xs text-gray-500 dark:text-gray-400">
          This will take just a moment...
        </span>
      {:else}
        <div class="mt-2 flex flex-col gap-x-3">
          <span class="block mb-1.5 text-xs text-gray-500 dark:text-gray-400"
            >{batch.percentComplete}%</span
          >
          {#if batch.batchState !== 'completed'}
            <ProgressBar percentComplete={batch.percentComplete} />
          {/if}
        </div>
      {/if}
      <!-- End Progress -->

      {#if batch.greylisting}
        <span class="block mt-3 mb-1.5 text-xs text-gray-500 dark:text-gray-400 flex flex-row">
          <Tooltip
            className="text-base mr-2"
            tip="For the best accuracy, Truelist will wait up to 10 minutes to validate email addresses on servers that use greylisting."
          />
          <span
            ><a
              class="underline"
              href="https://truelist.io/docs/fundamentals/what-is-greylisting"
              target="_blank">Greylisting</a
            > detected - will wait up to 10 minutes longer to validate greylisted emails</span
          >
        </span>
      {/if}

      {#if completed}
        <div class="mt-5 flex space-x-7">
          <button
            type="button"
            on:click={onOpenDownloadBatchModal}
            class="rounded-md bg-white text-sm font-medium text-sky-600 hover:text-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >Download Cleaned List</button
          >
        </div>
      {/if}
    </div>
  </div>
</div>
<!-- End Toast -->
