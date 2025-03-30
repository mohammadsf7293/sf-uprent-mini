import { SinglePropertyPageController } from '@features'
import { CommuteTime } from '@widgets'

class ParariusController extends SinglePropertyPageController {
  initialized = false

  constructor() {
    super()
  }

  onPageMutation() {
    if (this.initialized) {
      return
    }
    this.initialized = true

    const container = document.querySelector<HTMLDivElement>(
      '.agent-summary__buttons',
    )
    if (!container) return

    this.insertCommuteTime()
  }

  insertCommuteTime() {
    const commuteButtonContainer = document.querySelector(
      '.listing-detail-summary',
    )
    if (!commuteButtonContainer) return

    const travelTimeTarget = document.createElement('div')
    travelTimeTarget.classList.add('uprent-travel-time')
    travelTimeTarget.classList.add('uprent-pararius-travel-time')
    commuteButtonContainer.append(travelTimeTarget)

    new CommuteTime({
      target: travelTimeTarget,
    })
  }
}

export const singlePropertyPageController = new ParariusController()
