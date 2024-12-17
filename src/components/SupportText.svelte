<script>
  export let className = ''

  let classNameText = 'mt-2 text-sm text-gray-500 ' + className
</script>

<p class={classNameText}>
  <slot />
</p>
