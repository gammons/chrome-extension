<script lang="ts">
  import Button from '@components/Button.svelte'
  import Logo from '@components/Logo.svelte'
  import Options from '@components/Options.svelte'
  import FindEmails from './FindEmails.svelte'

  import ApiBackend from '@data/backend/apiBackend'
  import { user } from '@/storage'

  console.log('$user', $user)

  const onLogin = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'login' }, async (response) => {
        if (response.token) {
          const backend = new ApiBackend(response.token)
          const res = await backend.apiRequest('me', 'GET')
          user.set({
            name: res.name,
            email: res.email,
            token: response.token
          })
        }
      })
    })
  }

  const onLogout = () => {
    user.set({})
  }
</script>

<div id="body" class="text-md flex flex-col h-screen m-4">
  <nav class="bg-white">
    <div class="flex flex-shrink-0 items-center">
      <Logo className="h-8 w-auto" />
      <span class="ml-2 mr-4 text-xl font-semibold text-gray-700">Truelist.io</span>
    </div>

    {#if $user.token}
      <Button onClick={onLogout}>Logout</Button>
      <p>you are logged in as {$user.name}</p>
    {:else}
      <Button onClick={onLogin}>Login</Button>
    {/if}
  </nav>
</div>

<style>
  #body {
    width: 640px;
    height: 400px;
    display: flex;
    flex-direction: column;
  }
</style>
