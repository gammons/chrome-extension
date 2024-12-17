<script lang="ts">
  export let alert

  import classes from 'svelte-transition-classes'
  import Icon from '@/components/Icon.svelte'

  const closeModal = () => {}
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
  <div class="p-4">
    <div class="flex items-start">
      <div class="flex-shrink-0">
        {#if alert.type === 'error'}
          <Icon name="error" className="text-red-400" />
        {:else if alert.type === 'warning'}
          <Icon name="warning" className="text-yellow-400" />
        {:else if alert.type === 'success'}
          <Icon name="done" className="text-green-400" />
        {/if}
      </div>
      <div class="ml-3 w-0 flex-1 pt-0.5">
        <p class="text-sm font-medium text-gray-900">{alert.title}</p>
        <p class="mt-1 text-sm text-gray-500">{alert.text}</p>
      </div>
    </div>
  </div>
</div>
