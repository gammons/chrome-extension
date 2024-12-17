<script lang="ts">
  import Button from '../components/Button.svelte'
  import Logo from '../components/Logo.svelte'
  import Options from '../components/Options.svelte'
  import FindEmails from './FindEmails.svelte'
  import { user } from '../storage'

  let token

  const onLogin = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'login' }, (response) => {
        if (response.token) {
          $: token = response.token
          user.set({ token: response.token })
        }
      })
    })
  }

  const onLogout = () => {
    user.set({})
    $: token = null
  }
</script>

<div id="body" class="text-md flex flex-col h-screen m-4">
  <nav class="bg-white">
    <div class="flex flex-shrink-0 items-center">
      <Logo className="h-8 w-auto" />
      <span class="ml-2 mr-4 text-xl font-semibold text-gray-700">Truelist.io</span>
    </div>

    {#if token}
      <Button onClick={onLogout}>Logout2</Button>
      <p>you are logged in</p>
    {:else}
      <Button onClick={onLogin}>Login2</Button>
    {/if}
  </nav>
</div>

<style>
  #body {
    width: 640px;
    min-height: 840px;
    display: flex;
    flex-direction: column;
  }
</style>
