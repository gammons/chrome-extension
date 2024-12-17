// Content script
import { user } from '../storage'

// Content scripts
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/

console.log('Content script loaded')

console.log('onMessage = ', chrome.runtime.onMessage)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message from background script:', request)

  if (request.action === 'findEmails') {
    const emails = findEmails()
    // Send the found emails back to the background or popup
    sendResponse({ mails: emails })
  }

  if (request.action === 'login') {
    // check that the url is either localhost or app.truelist.io
    if (
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== 'app.truelist.io'
    ) {
      console.error('Cannot login from this page')
      return
    }

    sendResponse({ token: window.localStorage.getItem('token') })
  }
})

const findEmails = () => {
  console.log('finding emails')
  const htmlSource = document.documentElement.innerHTML
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  const emails = htmlSource.match(emailRegex) || []
  return [...new Set(emails)] // Remove duplicates
}

// Listen for login message from the app
window.addEventListener('message', (event) => {
  if (event.data.type === 'login') {
    console.log('Received login message from the app:', event.data)
    user.set(event.data.user)
  }
})
