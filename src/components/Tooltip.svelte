<script>
  export let tip
  export let className = ''

  import Icon from '@components/Icon.svelte'
  import classes from 'svelte-transition-classes'

  let show = false

  className += ' cursor-pointer'

  const showTooltip = () => {
    $: show = true
  }

  const hideTooltip = () => {
    $: show = false
  }
</script>

<span on:mouseenter={showTooltip} on:mouseleave={hideTooltip}>
  <Icon name="help" {className} />
</span>

{#if show}
  <span
    in:classes={{
      duration: 300,
      base: 'ease-out duration-300',
      from: 'opacity-0',
      to: 'opacity-100'
    }}
    out:classes={{
      duration: 400,
      base: 'ease-in duration-200',
      from: 'opacity-100',
      to: 'opacity-0'
    }}
    class="transition-opacity absolute inline-block z-10 py-1 px-2 bg-gray-900 text-sm font-medium text-white rounded shadow-sm dark:bg-slate-700"
    role="tooltip"
  >
    {tip}
  </span>
{/if}
