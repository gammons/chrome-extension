<script>
  export let emails = []
</script>

<div class="mt-5 px-4 sm:px-6 lg:px-8 overflow-auto">
  <h2 class="text-2xl font-semibold text-gray-900">Results</h2>
  <div class="-mx-4 mt-5 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
    <table class="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            scope="col"
            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Email</th
          >
          <th
            scope="col"
            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >Status</th
          >
          <th
            scope="col"
            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >Sub-status</th
          >
        </tr>
      </thead>
      <tbody>
        {#each emails as email}
          <tr>
            <td class="relative py-4 pl-4 pr-3 text-sm sm:pl-6">
              <div class="font-medium text-gray-900">{email}</div>
            </td>
            <td class="px-3 py-3.5 text-sm text-gray-500 lg:table-cell">pending</td>
            <td class="px-3 py-3.5 text-sm text-gray-500 lg:table-cell">pending</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
