import { Controller } from './controller'
import { PLATFORM_PAGE } from '~core/database'

export abstract class ApplicationPageController extends Controller<PLATFORM_PAGE.ApplicationPage> {
  protected constructor() {
    super(PLATFORM_PAGE.ApplicationPage)
  }
}
