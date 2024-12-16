<script lang="ts">
  import Button from '../components/Button.svelte'
  import Logo from '../components/Logo.svelte'
  import Options from '../components/Options.svelte'
  import Results from './Results.svelte'

  let foundEmails = []
  // for (let i = 0; i < 100; i++) {
  //   foundEmails.push('grant@grant.dev')
  // }

  const onFindEmails = () => {
    console.log('onFindEmails')

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log('tabs', tabs)
      chrome.tabs.sendMessage(tabs[0].id, { action: 'findEmails' }, (response) => {
        console.log('got response', response)
        console.log('Response from content script:', response.mails)
        $: foundEmails = response.mails
      })
    })

    // chrome.runtime.sendMessage({ type: 'findEmails' }, (response) => {
    //   console.log('got response', response)
    //   console.log('Response from background script:', response.emails)
    // })
    // chrome.rumtime.sendMessage({ action: 'findEmails' })
  }
</script>

<div id="body" class="shadow text-md flex flex-col h-screen">
  <nav class="bg-white m-4">
    <div class="flex flex-shrink-0 items-center">
      <Logo className="h-8 w-auto" />
      <span class="ml-2 mr-4 text-xl font-semibold text-gray-700">Truelist.io</span>
    </div>
    <p class="text-gray-500 mb-3 text-sm">
      Click the button to find email addresses on the current page.
    </p>

    <hr class="mb-3" />

    <div class="w-full flex justify-center">
      <Button onClick={onFindEmails}>Find Emails</Button>
    </div>
  </nav>

  {#if foundEmails.length > 0}
    <div class="flex-1 overflow-auto">
      <Results emails={foundEmails} />
    </div>
  {/if}
</div>

<style>
  #body {
    width: 640px;
    min-height: 440px;
    display: flex;
    overflow: hidden;
    flex-direction: column;
  }
</style>
