<script lang="ts">
  import Button from '@components/Button.svelte'
  import Results from './Results.svelte'
  import ApiBackend from '@data/backend/apiBackend'
  import { user } from '@/storage'

  let emailInput
  let submitButtonEnabled = true
  let showResults = false
  let error = null
  let email = null

  const onVerify = async (e) => {
    e.preventDefault()
    submitButtonEnabled = false

    const api = new ApiBackend($user.token)
    const resp = await api.apiRequest('api/v1/verify_single_email', 'POST', { email: emailInput })

    if (resp.error) {
      $: error = resp.error
      $: submitButtonEnabled = true
      $: showResults = false
      return
    }

    $: error = null
    $: email = resp.email
    $: emailInput = ''
    $: submitButtonEnabled = true
    $: showResults = true
  }
</script>

<pre>User = {JSON.stringify($user)}</pre>

<div class="p-4">
  <form class="w-full md:w-3/5" on:submit={onVerify}>
    <div class="flex gap-x-4">
      <label for="email-address" class="sr-only">Email address</label>
      <input
        id="email-address"
        bind:value={emailInput}
        name="email"
        type="email"
        autocomplete="email"
        class="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-md sm:leading-6"
        placeholder="Enter an email address"
      />
      <Button type="submit" disabled={!submitButtonEnabled}>
        {#if !submitButtonEnabled}
          <span
            class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
            role="status"
            aria-label="loading"
          >
            <span class="sr-only">Loading...</span>
          </span>
        {/if}
        Verify
      </Button>
    </div>
  </form>

  {#if showResults}
    <Results {email} />
  {/if}
</div>
