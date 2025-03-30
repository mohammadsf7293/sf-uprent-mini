import { Controller } from './controller'
import { PLATFORM_PAGE } from '~core/database'

export abstract class PropertyListPageController extends Controller<PLATFORM_PAGE.PropertyListPage> {
  protected constructor() {
    super(PLATFORM_PAGE.PropertyListPage)
  }
}
