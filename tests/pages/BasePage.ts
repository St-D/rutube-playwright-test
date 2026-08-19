import { Page, expect, Locator } from '@playwright/test';

export interface PageTestParams {
  name: string;
  urlTab: string;
  prtScrName: string;
}

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

  private get popupCloseButton() {
    return this.page.getByTestId('popup').getByRole('button', { name: /Закрыть/ });
  }

  private get cookieCloseButton() {
    return this.page.getByRole('button', { name: 'Ок', exact: true });
  }

  async dismissAdPopup(timeout = 5000) {
    await this.dismissIfVisible(this.popupCloseButton, 'рекламы', timeout);
  }
  async dismissCookieBanner(timeout = 5000) {
    await this.dismissIfVisible(this.cookieCloseButton, 'куков', timeout);
  }

  async dismissOverlays(options?: {
    cookies?: boolean;
    ad?: boolean;
    cookieTimeout?: number;
    adTimeout?: number;
  }) {
    if (options?.cookies !== false) {
      await this.dismissCookieBanner(options?.cookieTimeout ?? 5000);
    }
    if (options?.ad !== false) {
      await this.dismissAdPopup(options?.adTimeout ?? 5000);
    }
  }

  private async dismissIfVisible(locator: Locator, label: string, timeout: number) {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      await locator.click({ noWaitAfter: true });
      await locator.waitFor({ state: 'hidden', timeout: 3000 });
      console.log(`--- [POM] Попап ${label} успешно закрыт ---`);
    } catch {
      console.log(`--- [POM] Попап ${label} не появился ---`);
    }
  }

  async open(
    url: string,
    waitUntilOptions: Parameters<Page['goto']>[1] = { waitUntil: 'domcontentloaded' },
  ) {
    await this.page.goto(url, waitUntilOptions);
  }

  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await this.page.waitForTimeout(3000);
  }

  async hideElement(element: string) {
    await this.page.evaluate((element) => {
      const elemForHide = document.querySelector(element);
      if (elemForHide) {
        (elemForHide as HTMLElement).style.display = 'none';
      }
    }, element);
  }

  async pageHasLayout(locator: Locator, prtScrName: string) {
    await expect(locator).toHaveScreenshot(prtScrName, {
      maxDiffPixelRatio: 0.1,
      animations: 'disabled',
    });
  }
}
