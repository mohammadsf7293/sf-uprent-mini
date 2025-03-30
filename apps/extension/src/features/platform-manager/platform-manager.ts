import {
  ApplicationPageController,
  PropertyListPageController,
  SinglePropertyPageController,
  ApplicationResultPageController,
} from './controllers'
import type { Controller } from './controllers/controller'
import { PLATFORM_PAGE } from '~core/database'

interface PlatformManagerArgs {
  singlePropertyPageController: SinglePropertyPageController
  applicationPageController: ApplicationPageController
  propertyListPageController: PropertyListPageController
  applicationResultPageController: ApplicationResultPageController
  pickController: () => PLATFORM_PAGE | null
}

/*
 * Rental platforms has different kind of pages. `PlatformManager` stores
 * controllers for each kind of page, and executes them accordingly.
 * On every page update, the `onPageMutation` method will be called
 * in the respective controller
 */
export class PlatformManager {
  private readonly singlePropertyPageController: SinglePropertyPageController
  private readonly propertyListPageController: PropertyListPageController
  private readonly applicationPageController: ApplicationPageController
  private readonly applicationResultPageController: ApplicationResultPageController
  private readonly pickController: () => PLATFORM_PAGE | null

  constructor(args: PlatformManagerArgs) {
    this.singlePropertyPageController = args.singlePropertyPageController
    this.propertyListPageController = args.propertyListPageController
    this.applicationPageController = args.applicationPageController
    this.applicationResultPageController = args.applicationResultPageController
    this.pickController = args.pickController
  }

  init() {
    this.onPageMutation()

    window.addEventListener('popstate', () => this.onPageMutation())

    const observer = new MutationObserver(this.onPageMutation.bind(this))
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    })
  }

  private getController() {
    let controller: Controller | null = null
    switch (this.pickController()) {
      case PLATFORM_PAGE.SinglePropertyPage:
        controller = this.singlePropertyPageController
        break
      case PLATFORM_PAGE.PropertyListPage:
        controller = this.propertyListPageController
        break
      case PLATFORM_PAGE.ApplicationPage:
        controller = this.applicationPageController
        break
      case PLATFORM_PAGE.ApplicationResultPage:
        controller = this.applicationResultPageController
    }

    return controller
  }

  private onPageMutation(mutations?: MutationRecord[]) {
    const controller = this.getController()
    controller?.onPageMutation(mutations)
  }
}
