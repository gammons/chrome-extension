import { redirect } from '@sveltejs/kit'

import { signOutUser, userToken } from '$data/models/user'
import ApiBackend from '$data/backend/apiBackend'
import { alertStore, batchesStore } from '$data/stores'
import BatchModel from '$data/models/batch'

const hydrateBatches = async (): Promise<void> => {
  const api = new ApiBackend(userToken())

  const query = `
    query {
      batches {
        uuid
        name
        createdAt
        updatedAt
        emailCount
        batchState
        batchType
        roleCount
        disposableCount
        failedSyntaxCheckCount
        failedMxCheckCount
        failedSmtpCheckCount
        failedNoMailboxCount
        unknownCount
        processedCount
        percentComplete
        okForAllCount
        okCount
        csvFilesComplete
        greylisting
        highestReachCount
        invalidCount
        safestCount
      }
    }
  `
  const resp = await api.apiRequest('graphql', 'POST', { query: query })
  if (resp.error) {
    signOutUser()
    throw redirect(302, '/login')
  }

  const batchModels = resp.data.batches.map((batch) => new BatchModel(batch))
  batchesStore.set(batchModels)

  batchModels
    .filter((batch) => {
      return batch.alertable()
    })
    .forEach((batch) => {
      alertStore.addAlert({
        title: 'Batch started',
        type: 'batch_progress',
        uuid: batch.uuid,
        batch
      })
    })
}

export default hydrateBatches
