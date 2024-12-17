<script>
  export let percentComplete = 0
</script>

<div
  class="flex w-full h-1 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
  role="progressbar"
  aria-valuenow="57"
  aria-valuemin="0"
  aria-valuemax="100"
>
  <div
    class="flex flex-col justify-center overflow-hidden bg-sky-700 text-xs text-white text-center whitespace-nowrap dark:bg-gray-200"
    style="width: {percentComplete}%"
  />
</div>
