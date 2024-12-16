<script lang="ts">
  import Button from '../components/Button.svelte'
  import Logo from '../components/Logo.svelte'
  import Options from '../components/Options.svelte'
  import FindEmails from './FindEmails.svelte'
  import { user } from '../storage'

  console.log('user = ', $user)

  user.subscribe((value) => {
    console.log('user value = ', value)
  })

  const onLogin = () => {
    console.log('onLogin')
    $user = { name: 'John Doe' }

    // open a tab to truelist.io login page
    chrome.tabs.create({ url: 'https://app.truelist.io/login' })
  }
</script>

<div id="body" class="text-md flex flex-col h-screen m-4">
  <nav class="bg-white">
    <div class="flex flex-shrink-0 items-center">
      <Logo className="h-8 w-auto" />
      <span class="ml-2 mr-4 text-xl font-semibold text-gray-700">Truelist.io</span>
    </div>

    <Button onClick={onLogin}>Login</Button>
  </nav>
</div>

<style>
  #body {
    border: 1px solid red;
    width: 640px;
    min-height: 840px;
    display: flex;
    flex-direction: column;
  }
</style>
