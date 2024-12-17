import { redirect } from '@sveltejs/kit'

import { signOutUser, userToken } from '$data/models/user'
import ApiBackend from '$data/backend/apiBackend'
import UserModel from '$data/models/user'
import AccountModel from '$data/models/account'
import { userStore } from '$data/stores'

const hydrateUser = async (): Promise<void> => {
  const api = new ApiBackend(userToken())

  const query = `
  fragment userFields on User {
    uuid
    name
    email
    lastLoginAt
    imageUrl
    lastActiveAt
    timeZone
    tawkHash
    errors

    apiKeys {
      id
      name
      active
      token
      createdAt
      lastUsedAt
    }
  }
  query {
    user {
      ...userFields

      account {
        name
        hasCardOnFile
        paymentPlan
        errors
        revalidateAfter

        users {
          ...userFields
        }
      }
    }
  }
  `
  const resp = await api.apiRequest('graphql', 'POST', { query: query })
  if (resp.error) {
    signOutUser()
    throw redirect(302, '/login')
  }

  const userData = resp.data.user
  const accountData = resp.data.user.account
  const user = new UserModel({
    name: userData.name,
    token: userToken(),
    email: userData.email,
    imageUrl: userData.imageUrl,
    uuid: userData.uuid,
    lastLoginAt: userData.lastLoginAt,
    timeZone: userData.timeZone,
    tawkHash: userData.tawkHash,
    errors: userData.errors,

    account: new AccountModel({
      uuid: accountData.uuid,
      name: accountData.name,
      paymentPlan: accountData.paymentPlan,
      hasCardOnFile: accountData.hasCardOnFile,
      errors: accountData.errors,
      revalidateAfter: accountData.revalidateAfter,
      users: accountData.users.map((user) => new UserModel(user))
    }),
    apiKeys: userData.apiKeys.map((apiKey) => {
      return {
        id: apiKey.id,
        name: apiKey.name,
        active: apiKey.active,
        token: apiKey.token,
        createdAt: apiKey.createdAt,
        lastUsedAt: apiKey.lastUsedAt
      }
    })
  })
  userStore.set(user)
}

export default hydrateUser
