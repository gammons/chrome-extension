import { writable } from 'svelte/store'
import { get } from 'svelte/store'

export const userStore = writable(null)
export const batchesStore = writable(null)
export const modalShowStore = writable('')
export const socketStore = writable(null)
export const alertStore = writable([])
export const sidebarOpenStore = writable(false)
export const reportPageInfo = writable({})
export const downloadCurrentBatchStore = writable(null)

modalShowStore.openModal = (key) => {
  modalShowStore.set(key)
}

modalShowStore.closeModal = () => {
  modalShowStore.set('')
}

/*
 * addAlert
 * @param {Object} alert
 * @param {String} alert.title
 * @param {String} alert.text
 *
 * @returns {void}
 */
alertStore.addAlert = (alert) => {
  alert.uuid ||= Math.random().toString(36).substring(7)

  // if the alert exists already in the alertStore, then return early
  if (get(alertStore).find((a) => a.uuid === alert.uuid)) return

  alertStore.update((alerts) => [...alerts, alert])

  if (alert.type === 'batch_progress') return
  setTimeout(() => {
    alertStore.update((alerts) => alerts.filter((a) => a.uuid !== alert.uuid))
  }, 5000)
}
