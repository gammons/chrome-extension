<script>
  export let email

  import Pill from '@components/Pill.svelte'

  import { formattedXmlTime } from '@lib/dateUtils'
</script>

<div class="overflow-auto max-h-[350px] mt-4 p-4 w-full bg-white">
  <div class="px-4 sm:px-0">
    <h3 class="text-lg font-medium leading-7 text-gray-900">
      Results for {email.address}

      {#if email.email_state == 'ok'}
        <Pill type="success" text="Ok" />
      {:else if email.email_state == 'risky'}
        <Pill type="warning" text="Risky" />
      {:else if email.email_state == 'email_invalid'}
        <Pill type="error" text="Invalid" />
      {:else if email.email_state == 'unknown'}
        <Pill type="gray" text="Unknown" />
      {/if}
    </h3>
  </div>
  <div class="mt-6">
    <div class="mt-6">
      <h3 class="text-sm font-semibold leading-7 text-gray-400 pb-2">Address Info</h3>
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Canonical address</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {email.canonical}
          </dd>
        </div>
        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Role address check</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {#if email.email_sub_state === 'is_role'}
              <Pill type="warning" text="Role address" />
            {:else}
              <Pill type="success" text="Ok" />
            {/if}
          </dd>
        </div>
        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Mailbox exists check</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {#if email.email_sub_state === 'failed_mx_check'}
              <Pill type="warning" text="Cannot check (no MX records)" />
            {:else if email.email_sub_state === 'failed_no_mailbox'}
              <Pill type="error" text="No mailbox" />
            {:else}
              <Pill type="success" text="Ok" />
            {/if}
          </dd>
        </div>
        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">SMTP check</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {#if email.email_sub_state === 'failed_mx_check'}
              <Pill type="warning" text="Cannot check (no MX records)" />
            {:else if email.email_sub_state === 'failed_smtp_check'}
              <Pill type="error" text="No mailbox" />
            {:else}
              <Pill type="success" text="Ok" />
            {/if}
          </dd>
        </div>
      </dl>
    </div>

    <div class="mt-6">
      <h3 class="text-sm font-semibold leading-7 text-gray-400 pb-2">Domain Info</h3>
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">MX Record check</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {#if email.email_sub_state === 'failed_mx_check'}
              <Pill type="error" text="Failed MX Check" />
            {:else}
              <Pill type="success" text="Ok" />
            {/if}
          </dd>
        </div>
      </dl>
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Disposable address check</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {#if email.email_sub_state === 'is_disposable'}
              <Pill type="error" text="Disposable address" />
            {:else}
              <Pill type="success" text="Ok" />
            {/if}
          </dd>
        </div>
      </dl>
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Accept-all address check</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {#if email.email_sub_state === 'failed_mx_check'}
              <Pill type="warning" text="Cannot check (no MX records)" />
            {:else if email.email_sub_state === 'accept_all'}
              <Pill type="warning" text="Accept-all domain detected" />
            {:else}
              <Pill type="success" text="Ok" />
            {/if}
          </dd>
        </div>
      </dl>
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Greylisting check</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {#if email.email_sub_state === 'failed_mx_check'}
              <Pill type="warning" text="Cannot check (no MX records)" />
            {:else if email.email_sub_state === 'failed_greylisted'}
              <Pill type="warning" text="Domain uses greylisting" />
            {:else}
              <Pill type="success" text="Ok" />
            {/if}
          </dd>
        </div>
      </dl>
    </div>
    <div class="mt-6">
      <h3 class="text-sm font-semibold leading-7 text-gray-400 pb-2">Processing Info</h3>
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Last verified at</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {formattedXmlTime(email.verified_at)}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</div>
