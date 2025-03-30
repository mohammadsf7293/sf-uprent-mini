import { PLATFORM_PAGE } from '~core/database'

export abstract class Controller<
  TVariant extends PLATFORM_PAGE = PLATFORM_PAGE,
> {
  readonly variant: TVariant

  protected constructor(variant: TVariant) {
    this.variant = variant
  }

  abstract onPageMutation(mutations?: MutationRecord[]): void
}
