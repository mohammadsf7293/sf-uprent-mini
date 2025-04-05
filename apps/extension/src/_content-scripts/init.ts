import { PlatformManager } from '@features'
import { injectApp } from './lib'
import './lib/events'  // Import events to initialize message listeners

export const initializeExtension = (manager: PlatformManager) => {
  injectApp()
  manager.init()
}
