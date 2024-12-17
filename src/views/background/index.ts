import { count } from '../../storage'

// Background service workers
// https://developer.chrome.com/docs/extensions/mv3/service_workers/

// chrome.runtime.onInstalled.addListener(() => {
//   console.log('background: onInstalled')
//   count.subscribe(console.log)
// })
//
// // NOTE: If you want to toggle the side panel from the extension's action button,
// // you can use the following code:
// // chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
// //    .catch((error) => console.error(error));
//
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log('Message received:', message)
//
//   // Process the message
//   if (message.type === 'greet') {
//     sendResponse({ reply: 'Hello from the background script!' })
//   }
//   if (message.type === 'findEmails') {
//     const emails = findEmails()
//     // Send the found emails back to the background or popup
//     sendResponse({ mails: emails })
//   }
//   // Return true if you want to send a response asynchronously
//   return false
// })
//
// const findEmails = () => {
//   console.log('finding emails')
//   const htmlSource = document.documentElement.innerHTML
//   const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
//   const emails = htmlSource.match(emailRegex) || []
//   return [...new Set(emails)] // Remove duplicates
// }
