<script>
  export let className = 'text-sky-600'
  export let heightClass = 'h-6'
  export let widthClass = 'w-6'
</script>

<div
  class={`animate-spin inline-block ${heightClass} ${widthClass} border-[3px] border-current border-t-transparent rounded-full ` +
    className}
  role="status"
  aria-label="loading"
>
  <span class="sr-only">Loading...</span>
</div>
