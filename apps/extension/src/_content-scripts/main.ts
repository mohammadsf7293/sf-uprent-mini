import { parariusManager } from './pararius/manager'
import { initializeExtension } from './init'

const { host } = window.location

const main = () => {
  if (/pararius\./.test(host)) {
    initializeExtension(parariusManager)
    return
  }
}

main()
