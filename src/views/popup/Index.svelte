<script lang="ts">
  import Button from '@components/Button.svelte'
  import Logo from '@components/Logo.svelte'
  import Options from '@components/Options.svelte'
  import FindEmails from './FindEmails.svelte'
  import Tabs from './Tabs.svelte'

  import VerifySingle from './verify-single/Index.svelte'
  import VerifyOnPage from './verify-on-page/Index.svelte'
  import Settings from './settings/Index.svelte'

  import ApiBackend from '@data/backend/apiBackend'
  import { user, currentRoute } from '@/storage'

  console.log('currentRoute = ', currentRoute)
</script>

<div id="body" class="text-md flex flex-col h-screen bg-gray-50">
  <nav class="bg-white px-4 pt-4">
    <div class="flex flex-shrink-0 items-center">
      <Logo className="h-8 w-auto" />
      <span class="ml-2 mr-4 text-xl font-semibold text-gray-700">Truelist.io</span>
    </div>

    <Tabs />
  </nav>

  <main class="pt-4 px-4">
    {#if $currentRoute === 'verify-single'}
      <VerifySingle />
    {:else if $currentRoute === 'verify-on-page'}
      <VerifyOnPage />
    {:else if $currentRoute === 'settings'}
      <Settings />
    {/if}
  </main>
</div>

<style>
  #body {
    width: 640px;
    height: 500px;
    display: flex;
    flex-direction: column;
  }
</style>
