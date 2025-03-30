import { Controller } from './controller'
import { PLATFORM_PAGE } from '~core/database'

export abstract class SinglePropertyPageController extends Controller<PLATFORM_PAGE.SinglePropertyPage> {
  protected constructor() {
    super(PLATFORM_PAGE.SinglePropertyPage)
  }
}
