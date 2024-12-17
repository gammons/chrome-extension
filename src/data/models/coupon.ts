type Coupon = {
  code: string
  description: string
  discountPercentage: number
}

type ConstructorArgs = {
  coupon: Coupon,
  active: boolean
}

export default class CouponModel {
  active: boolean
  coupon: Coupon

  constructor(args: ConstructorArgs) {
    this.coupon = {} as Coupon
    this.coupon.code = args.coupon.code
    this.coupon.description = args.coupon.description
    this.coupon.discountPercentage = args.coupon.discountPercentage || args.coupon.discount_percentage
    this.active = args.active
  }
}

