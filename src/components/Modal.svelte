<script lang="ts">
  export let title
  export let show
  export let widthClass = 'sm:max-w-2xl'
  export let onCloseModal = () => {}
  export let showCloseButton = false

  import classes from 'svelte-transition-classes'
  import clickOutside from '$lib/clickOutside'

  import Button from '$components/Button.svelte'

  const closeModal = () => {
    onCloseModal()
  }
</script>

{#if show}
  <div
    in:classes={{
      duration: 100,
      base: 'ease-out duration-300',
      from: 'opacity-0',
      to: 'opacity-100'
    }}
    out:classes={{
      duration: 100,
      base: 'ease-in duration-200',
      from: 'opacity-100',
      to: 'opacity-0'
    }}
  >
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <!--
        Background backdrop, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <!--
            Modal panel, show/hide based on modal state.

            Entering: "ease-out duration-300"
              From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100 translate-y-0 sm:scale-100"
              To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          -->
          <div
            class={`relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 sm:min-w-[600px] ${widthClass}`}
            use:clickOutside
            on:click_outside={closeModal}
          >
            <!-- close button -->
            <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                on:click={closeModal}
                class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                <span class="sr-only">Close</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="sm:flex sm:items-start w-full">
              <div class="w-full">
                <h3 class="text-xl font-medium leading-6 text-gray-900">{title}</h3>
                <slot />
              </div>
            </div>

            {#if showCloseButton}
              <div class="px-4 pt-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Button title="Close" onClick={onCloseModal} />
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
