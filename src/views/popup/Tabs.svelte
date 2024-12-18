<script>
  import { currentRoute } from '@/storage'

  const selectedCss = 'border-indigo-500 text-indigo-600'
  const defaultCss = 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'

  $: route = $currentRoute
</script>

<div>
  <div class="hidden sm:block">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex" aria-label="Tabs">
        <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
        <a
          on:click|preventDefault={() => currentRoute.set('verify-single')}
          class={`cursor-pointer w-1/3 border-b-2 px-1 py-4 text-center text-sm font-medium ${route === 'verify-single' ? selectedCss : defaultCss}`}
          >Verify Single</a
        >
        <a
          on:click|preventDefault={() => currentRoute.set('verify-page')}
          class={`cursor-pointer w-1/3 border-b-2 px-1 py-4 text-center text-sm font-medium ${route === 'verify-page' ? selectedCss : defaultCss}`}
          >Verify on Page</a
        >
        <a
          on:click|preventDefault={() => currentRoute.set('settings')}
          class={`cursor-pointer w-1/3 border-b-2 px-1 py-4 text-center text-sm font-medium ${route === 'settings' ? selectedCss : defaultCss}`}
          aria-current="page">Settings</a
        >
      </nav>
    </div>
  </div>
</div>
