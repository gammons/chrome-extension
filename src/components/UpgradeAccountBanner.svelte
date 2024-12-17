<script>
  import Icon from '@components/Icon.svelte'
  import Button from '@components/Button.svelte'
  import { modalShowStore } from '$data/stores'
  import { PurchaseSubscriptionModalKey } from '$constants'
  import { trackEvent } from '$lib/analytics'

  const onOpenCreateSubscriptionPage = async () => {
    trackEvent('event', 'conversion', { send_to: 'AW-1066511287/Z5OACNfEj-wZELfXxvwD' })
    modalShowStore.openModal(PurchaseSubscriptionModalKey)
  }
</script>

<div class="rounded-md bg-green-50 border border-green-500 p-4">
  <div class="flex">
    <div class="flex-shrink-0 mt-1">
      <Icon name="bolt" className="h-2 w-2 text-green-700" />
    </div>
    <div class="ml-5 w-full text-md">
      <h3 class="text-xl font-bold text-green-800">Upgrade your account</h3>
      <div class="mt-2 text-green-700">
        <p>Purchase a Truelist subscription to unlock:</p>
      </div>
      <div class="flex flex-row w-full mt-3">
        <div class="w-full mt-4">
          <ul class="list-inside text-green-700">
            <li class="flex align-center mb-3 font-bold">
              <Icon name="check" className="h-4 w-4 text-green-800 mr-3" />
              API Access and no-code integrations
            </li>
            <li class="flex align-center mb-3 font-bold">
              <Icon name="check" className="h-4 w-4 text-green-800 mr-3" />
              List validations of any size
            </li>
            <li class="flex align-center mb-3 font-bold">
              <Icon name="check" className="h-4 w-4 text-green-800 mr-3" />
              Advanced reporting and analytics
            </li>
          </ul>
        </div>
        <div class="w-full mt-4">
          <ul class="list-inside text-green-700 font-bold">
            <li class="flex align-center mb-3 font-bold">
              <Icon name="check" className="h-4 w-4 text-green-800 mr-3" />
              Faster validation speeds
            </li>
            <li class="flex align-center mb-3">
              <Icon name="check" className="h-4 w-4 text-green-800 mr-3" />
              Truelist chrome extension
            </li>
            <li class="flex align-center mb-3 font-bold">
              <Icon name="check" className="h-4 w-4 text-green-800 mr-3" />
              Chat-based support
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-3">
        <Button
          classType=""
          onClick={onOpenCreateSubscriptionPage}
          className="bg-green-600 hover:bg-green-700 text-white flex flex-row align-center font-md"
        >
          <Icon name="bolt" className="h-5 w-5 text-green-800 mr-3 text-white" />
          Upgrade Account
        </Button>
      </div>
    </div>
  </div>
</div>
