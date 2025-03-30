import { PlatformManager } from '@features'
import { injectApp } from './lib'

export const initializeExtension = (manager: PlatformManager) => {
  injectApp()
  manager.init()
}
