<script lang="ts">
  import Button from '@components/Button.svelte'
  let emails = []
  const onFindEmails = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'findEmails' }, async (response) => {
        $: emails = response.emails
      })
    })
  }
</script>

<h2 class="text-base font-semibold leading-7 text-gray-900 mt-4">Verify emails on current tab</h2>

<div class="mt-3">
  <Button onClick={onFindEmails}>Find emails</Button>
  <pre>{JSON.stringify(emails, null, 2)}</pre>

  <div class="bg-white inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
    <table class="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            scope="col"
            class="pt-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >Email
          </th>
          <th scope="col" class="px-3 pt-3.5 text-left text-sm font-semibold text-gray-900"
            >Status
          </th>
          <th scope="col" class="px-3 pt-3.5 text-left text-sm font-semibold text-gray-900"
            >Sub-Status
          </th>
        </tr>
      </thead>

      <tbody>
        {#each emails as email}
          <pre>{JSON.stringify(email, null, 2)}</pre>
          <tr class="bg-white">
            <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{email.email}</td>
            <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{email.status}</td>
            <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{email.sub_status}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
