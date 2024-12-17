import type AccountModel from './account'
import type ApiKeyModel from './apiKey'

import BrowserStorage from '../storage/browserStorage'

export default class User {
  account: AccountModel
  apiKeys: ApiKeyModel[]

  name: string
  token: string
  email: string
  imageUrl: string
  uuid: string
  lastLoginAt: string
  timeZone: string
  tawkHash: string
  errors: string

  constructor(args) {
    this.account = args.account
    this.apiKeys = args.apiKeys

    this.name = args.name
    this.token = args.token
    this.email = args.email
    this.imageUrl = args.imageUrl
    this.uuid = args.uuid
    this.errors = args.errors
    this.lastLoginAt = args.lastLoginAt
    this.tawkHash = args.tawkHash
    this.timeZone = args.timeZone
  }
}

export const userToken = () => {
  const storage = new BrowserStorage()
  const token = storage.load('token')
  return token
}

export const isFree = () => {
  const storage = new BrowserStorage()
  const plan = storage.load('paymentPlan')
  return plan === 'free'
}

export const signOutUser = () => {
  const storage = new BrowserStorage()
  storage.clear()
  window.location.href = '/'
}
