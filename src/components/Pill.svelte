<script>
  export let text = ''
  export let type = 'success'

  const classes = {
    success: 'text-green-700 bg-green-50 ring-green-600/20',
    warning: 'text-yellow-700 bg-yellow-50 ring-yellow-600/20',
    error: 'text-red-700 bg-red-50 ring-red-600/20',
    gray: 'text-gray-700 bg-gray-50 ring-gray-600/20'
  }
</script>

<p
  class="inline rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 font-medium ring-1 ring-inset {classes[
    type
  ]}"
>
  <slot>{text}</slot>
</p>
