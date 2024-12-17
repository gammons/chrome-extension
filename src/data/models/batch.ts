import { backendUrl } from '../backend/apiBackend'

export enum BatchState {
  Pending = 'pending',
  PendingProcessing = 'pending_processing',
  Processing = 'processing',
  Completed = 'completed'
}

export enum BatchType {
  UserImport = 0,
  ApiImport = 1,
  Integration = 2
}

export default class Batch {
  name: string
  uuid: string
  createdAt: string
  updatedAt: string
  processedCount: number
  emailCount: number
  duplicateCount: number
  batchState: BatchState
  batchType: BatchType
  greylisting: boolean
  csvFilesComplete: boolean
  percentComplete: number

  disposableCount: number
  roleCount: number
  failedSyntaxCheckCount: number
  failedMxCheckCount: number
  failedSmtpCheckCount: number
  failedNoMailboxCount: number
  okCount: number
  safestCount: number
  highestReachCount: number
  invalidCount: number

  timeEstimateInSeconds: number

  constructor(args) {
    this.name = args.name
    this.uuid = args.uuid
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
    this.processedCount = args.processedCount
    this.emailCount = args.emailCount
    this.duplicateCount = args.duplicateCount
    this.greylisting = args.greylisting || false
    this.batchType = args.batchType
    this.csvFilesComplete = args.csvFilesComplete
    this.disposableCount = args.disposableCount
    this.unknownCount = args.unknownCount
    this.roleCount = args.roleCount
    this.failedSyntaxCheckCount = args.failedSyntaxCheckCount
    this.failedMxCheckCount = args.failedMxCheckCount
    this.failedSmtpCheckCount = args.failedSmtpCheckCount
    this.failedNoMailboxCount = args.failedNoMailboxCount
    this.safestCount = args.safestCount
    this.highestReachCount = args.highestReachCount
    this.invalidCount = args.invalidCount
    this.okForAllCount = args.okForAllCount
    this.okCount = args.okCount
    this.batchState = args.batchState
    this.percentComplete = args.percentComplete
    this.timeEstimateInSeconds = args.timeEstimateInSeconds
  }

  created() {
    const date = new Date(Date.parse(this.createdAt))
    return date.toDateString()
  }

  url(): string {
    return `/api/v1/batches/${this.uuid}`
  }

  fullBackendUrl(): string {
    return `${backendUrl()}/api/v1/batches/${this.uuid}`
  }

  downloadLink(token: string): string {
    return `${backendUrl()}/reports/download.csv?key=${token}&batchUuid=${this.uuid}`
  }

  downloadCleanedLink(token: string): string {
    return `${backendUrl()}/reports/download.csv?emailState=ok&key=${token}&batchUuid=${this.uuid}`
  }

  riskCount(): number {
    return this.roleCount + this.disposableCount
  }

  okForAllCount(): number {
    return this.okForAllCount
  }

  unknownCount(): number {
    return this.unknownCount
  }

  alertable(): boolean {
    return (
      this.batchState === BatchState.Processing || this.batchState === BatchState.PendingProcessing
    )
  }

  timeEstimate(): string {
    const minutes = Math.floor(this.timeEstimateInSeconds / 60)
    if (minutes < 1) {
      return '< 1 minute'
    } else if (minutes > 60) {
      const hours = Math.floor(minutes / 60)
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`
    }
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
  }

  createdBeforeRefactor() {
    const refactorDate = new Date('2024-03-20')
    const createdDate = new Date(Date.parse(this.createdAt))

    return createdDate < refactorDate
  }
}
