<script>
  export let id = ''
  export let name = ''
  export let value = ''
  export let onInput = () => {}
  export let supportText = ''
</script>

<select
  {id}
  {name}
  bind:value
  on:input={onInput}
  class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6"
>
  <slot />
</select>
{#if supportText}
  <p class="mt-2 text-sm text-gray-500">{supportText}</p>
{/if}
