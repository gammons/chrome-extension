import type CouponModel from './coupon'
import type UserModel from './user'

type ConstructorArgs = {
  uuid: string
  name: string
  errors?: string
  hasCardOnFile: boolean
  cancelled_at?: string
  users: UserModel[]
  revalidateAfter: string
  paymentPlan: string
  stripeSubscriptionName: string
  stripeSubscriptionPeriod: string
  dailyCreditAddition: number
  isUnpaid: boolean
}

export default class Account {
  uuid: string
  errors: string
  name: string
  users: Array<UserModel>
  hasCardOnFile: boolean
  revalidateAfter: string
  paymentPlan: string
  stripeSubscriptionName: string
  stripeSubscriptionPeriod: string
  isUnpaid: boolean

  constructor(args: ConstructorArgs) {
    this.uuid = args.uuid
    this.name = args.name
    this.errors = args.errors || ''
    this.users = args.users || []
    this.hasCardOnFile = args.hasCardOnFile
    this.revalidateAfter = args.revalidateAfter
    this.paymentPlan = args.paymentPlan
    this.stripeSubscriptionName = args.stripeSubscriptionName
    this.stripeSubscriptionPeriod = args.stripeSubscriptionPeriod
    this.isUnpaid = args.isUnpaid
  }

  get emailsValidatedPerSecond() {
    console.log('this.paymentPlan', this.paymentPlan)
    switch (this.paymentPlan) {
      case 'free':
        return '1 email every 10 seconds (max 250/day)'
      case 'basic':
        return '1 email every second'
      case 'growth':
        return '5 emails per second'
      case 'pro':
        return '10 emails per second'
      case 'enterprise':
        return '25 emails per second'
    }
  }
}
