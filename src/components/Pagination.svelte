<script>
  export let page
  export let totalCount
  export let perPage
  export let onClickNext
  export let onClickPrevious

  let hasNextPage
  $: hasNextPage = page * perPage + perPage < totalCount
</script>

<nav
  class="flex items-center justify-between border-t border-gray-200 bg-white pt-6 pb-3 px-4"
  aria-label="Pagination"
>
  <div class="hidden sm:block">
    <p class="text-sm text-gray-700">
      Showing
      <span class="font-medium">
        {page * perPage + 1}
      </span>
      to
      <span class="font-medium">
        {#if hasNextPage}
          {page * perPage + perPage}
        {:else}
          {totalCount}
        {/if}
      </span>
      of
      <span class="font-medium">
        {totalCount}
      </span>
      results
    </p>
  </div>
  <div class="flex flex-1 justify-between sm:justify-end">
    {#if page > 0}
      <a
        on:click={onClickPrevious}
        class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 cursor-pointer"
        >Previous</a
      >
    {/if}
    {#if hasNextPage}
      <a
        on:click={onClickNext}
        class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 cursor-pointer"
        >Next</a
      >
    {/if}
  </div>
</nav>
