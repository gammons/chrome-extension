<script lang="ts">
  import Button from '../components/Button.svelte'
  import Logo from '../components/Logo.svelte'
  import Results from './Results.svelte'

  let foundEmails = []

  const onFindEmails = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log('tabs', tabs)
      chrome.tabs.sendMessage(tabs[0].id, { action: 'findEmails' }, (response) => {
        console.log('got response', response)
        console.log('Response from content script:', response.mails)
        $: foundEmails = response.mails
      })
    })
  }
</script>

<p class="text-gray-500 mb-3 text-sm">
  Click the button to find email addresses on the current page.
</p>

<div class="w-full flex justify-center">
  <Button onClick={onFindEmails}>Find Emails</Button>
</div>

{#if foundEmails.length > 0}
  <div class="flex-1 overflow-auto">
    <Results emails={foundEmails} />
  </div>
{/if}
