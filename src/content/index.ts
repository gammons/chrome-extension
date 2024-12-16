import { mount } from 'svelte'
import Overlay from '../components/Overlay.svelte'
import { count } from '../storage'

// Content scripts
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/

// Some JS on the page
count.subscribe(console.log)

// Some svelte component on the page
//mount(Overlay, { target: document.body })
//

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message)

  // Process the message
  if (message.type === 'greet') {
    sendResponse({ reply: 'Hello from the background script!' })
  }
  // Return true if you want to send a response asynchronously
  return false
})

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log('Received message from background script:', request)
//   if (request.action === 'findEmails') {
//     const emails = findEmails()
//     // Send the found emails back to the background or popup
//     chrome.runtime.sendMessage({ mails: emails })
//   }
// })
//
// const findEmails = () => {
//   console.log('finding emails')
//   const htmlSource = document.documentElement.innerHTML
//   const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
//   const emails = htmlSource.match(emailRegex) || []
//   return [...new Set(emails)] // Remove duplicates
// }
