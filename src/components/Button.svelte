<script lang="ts">
  export let title = ''
  export let type = 'button'
  export let className = ''
  export let disabled = ''
  export let onClick = null
  export let classType = 'primary'
  export let href = null

  console.log('onClick = ', onClick)

  const handleClick = () => {
    console.log('handleClick')
    if (href) {
      window.location = href
      return
    }
    if (onClick) {
      console.log('onclick')
      onClick()
    }
  }

  const classes = {
    primary: 'bg-sky-600 hover:bg-sky-700 text-white',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  }

  const classList = [
    'inline-flex',
    'items-center',
    'rounded-md',
    'px-3',
    'py-2',
    'text-sm',
    'font-semibold',
    'shadow-sm',
    'ring-1',
    'ring-inset',
    'ring-gray-300',
    'hover:bg-gray-50',
    'disabled:cursor-not-allowed',
    'disabled:bg-gray-100',
    'disabled:text-gray-500',
    classes[classType],
    className
  ]
</script>

<button {type} {disabled} on:click={handleClick} class={classList.join(' ')}>
  <slot />
  {#if title}
    <span>{title}</span>
  {/if}
</button>
