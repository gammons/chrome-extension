import { count } from '../storage'

// Content scripts
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/

// Some JS on the page
count.subscribe(console.log)

console.log('Content script loaded')

console.log('onMessage = ', chrome.runtime.onMessage)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message from background script:', request)
  if (request.action === 'findEmails') {
    const emails = findEmails()
    // Send the found emails back to the background or popup
    sendResponse({ mails: emails })
  }
})

const findEmails = () => {
  console.log('finding emails')
  const htmlSource = document.documentElement.innerHTML
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  const emails = htmlSource.match(emailRegex) || []
  return [...new Set(emails)] // Remove duplicates
}
