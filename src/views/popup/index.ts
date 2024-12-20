import { mount } from 'svelte'
import Index from './Index.svelte'
import { count } from '@/storage.ts'
import '@/styles.css'

// Action popup
// https://developer.chrome.com/docs/extensions/reference/action/

function render() {
  const target = document.getElementById('app')

  if (target) {
    mount(Index, { target, props: { count } })
  }
}

document.addEventListener('DOMContentLoaded', render)
