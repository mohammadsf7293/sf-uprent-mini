import { Controller } from './controller'
import { PLATFORM_PAGE } from '~core/database'

export abstract class ApplicationResultPageController extends Controller<PLATFORM_PAGE.ApplicationResultPage> {
  protected constructor() {
    super(PLATFORM_PAGE.ApplicationResultPage)
  }
}
