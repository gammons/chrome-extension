type ConstructorArgs = {
  id: string
  name: string
  token: string
  active: boolean
  createdAt: string
  lastUsedDate: string
  last_used_date: string
  created_at: string
}

export default class ApiKey {
  id: string
  name: string
  token: string
  active: boolean
  lastUsedDate: string
  createdAt: string

  constructor(args: ConstructorArgs) {
    this.id = args.id
    this.name = args.name
    this.token = args.token
    this.active = args.active
    this.lastUsedDate = args.lastUsedDate || args.last_used_date
    this.createdAt = args.createdAt || args.created_at
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      token: this.token,
      active: this.active,
      lastUsedDate: this.lastUsedDate
    }
  }
}
