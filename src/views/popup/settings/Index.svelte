<script lang="ts">
  import Button from '@components/Button.svelte'
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

<p>Settings</p>

{#if $user.token}
  <Button onClick={onLogout}>Logout</Button>
  <p>you are logged in as {$user.name}</p>
{:else}
  <Button onClick={onLogin}>Login</Button>
{/if}
