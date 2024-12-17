<script>
  export let open

  import classes from 'svelte-transition-classes'
</script>

{#if open}
  <div
    in:classes={{
      duration: 100,
      base: 'transition ease-out duration-100',
      from: 'transform opacity-0 scale-95',
      to: 'transform opacity-100 scale-100'
    }}
    out:classes={{
      duration: 100,
      base: 'transition ease-in duration-75',
      from: 'transform opacity-100 scale-100',
      to: 'transform opacity-0 scale-95'
    }}
  >
    <div
      class="border-gray-300 border absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu-0-button"
      tabindex="-1"
    >
      <slot />
    </div>
  </div>
{/if}
