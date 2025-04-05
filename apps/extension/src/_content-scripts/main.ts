import { parariusManager } from './pararius/manager'
import { initializeExtension } from './init'

const { host } = window.location

const main = () => {
  // Initialize extension for all domains
  initializeExtension(parariusManager)
  
  // Add domain-specific logic
  if (/pararius\./.test(host)) {
    // Additional pararius-specific initialization if needed
    return
  }
}

main()
