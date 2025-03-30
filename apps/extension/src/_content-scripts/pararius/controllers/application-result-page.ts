import { ApplicationResultPageController } from '@features'

class ParariusController extends ApplicationResultPageController {
  constructor() {
    super()
  }

  async onPageMutation() {
    //
  }
}

export const applicationResultPageController = new ParariusController()
