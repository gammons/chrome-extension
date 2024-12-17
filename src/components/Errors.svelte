<script>
  export let title = ''
  export let supportText = ''
  export let errors = ''

  import Icon from '$components/Icon.svelte'
</script>

<div class="rounded-md bg-red-50 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <Icon name="error" className="mx-auto text-red-400 text-4xl" />
    </div>
    <div class="ml-3">
      <h3 class="text-sm font-medium text-red-800">
        {title}
      </h3>
      <div class="mt-2 text-sm text-red-700">
        <slot>
          <ul class="list-disc pl-5 space-y-1">
            {#if typeof errors === 'object'}
              {#each Object.entries(errors) as [key, value]}
                {#if typeof value === 'object'}
                  {#each Object.entries(value) as [key2, value2]}
                    <li>
                      <span class="font-semibold">{key}</span>: {value2}
                    </li>
                  {/each}
                {:else}
                  <li>
                    <span class="font-semibold">{key}</span>: {value}
                  </li>
                {/if}
              {/each}
            {:else}
              <li>{errors}</li>
            {/if}
          </ul>
        </slot>
      </div>
      <h3 class="mt-2 text-sm font-medium text-red-800">
        {supportText}
      </h3>
    </div>
  </div>
</div>
