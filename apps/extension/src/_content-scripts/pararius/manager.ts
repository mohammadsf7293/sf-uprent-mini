import { PlatformManager } from '@features'
import {
  applicationPageController,
  propertyListPageController,
  singlePropertyPageController,
  applicationResultPageController,
} from './controllers'
import { PLATFORM_PAGE } from '~core/database'
import { getPropertyPlatformId } from './utils'

export const parariusManager = new PlatformManager({
  singlePropertyPageController,
  propertyListPageController,
  applicationPageController,
  applicationResultPageController,
  pickController: () => {
    const { pathname } = window.location

    if (
      pathname.includes('/huurwoningen/') ||
      pathname.includes('/apartments/')
    ) {
      return PLATFORM_PAGE.PropertyListPage
    }

    if (
      getPropertyPlatformId(pathname) &&
      !pathname.includes('appartement-te-koop')
    ) {
      if (pathname.endsWith('/succes') || pathname.endsWith('/success')) {
        return PLATFORM_PAGE.ApplicationResultPage
      }

      return pathname.includes('/contact/')
        ? PLATFORM_PAGE.ApplicationPage
        : PLATFORM_PAGE.SinglePropertyPage
    }

    return null
  },
})
