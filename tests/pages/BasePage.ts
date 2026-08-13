import { Page, expect, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  protected async checkAriaSnapshot(locator: Locator, ariaName: string, timeout?: number) {
    await locator.waitFor({ state: 'visible', timeout: timeout });
    await expect(locator).toMatchAriaSnapshot({
      name: ariaName,
      timeout: timeout,
    });
  }
}
