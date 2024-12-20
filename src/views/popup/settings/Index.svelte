<script lang="ts">
  import Button from '@components/Button.svelte'
  import ApiBackend from '@data/backend/apiBackend'
  import { user } from '@/storage'

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

<main class="bg-white p-4">
  <h2 class="text-base font-semibold leading-7 text-gray-900">Login settings</h2>
  {#if $user.token}
    <p class="mt-1 leading-6">You are logged in as {$user.name}</p>
    <div class="mt-3">
      <Button onClick={onLogout}>Logout</Button>
    </div>
  {:else}
    <Button onClick={onLogin}>Login</Button>
  {/if}
</main>
