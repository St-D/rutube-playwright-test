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

    // // 2. Последовательно обрабатываем попап куков, если он появился
    // try {
    //   await this.cookieCloseButton.waitFor({ state: 'visible', timeout: 25000 });
    //   await this.cookieCloseButton.click({ noWaitAfter: true });
    //   await this.cookieCloseButton.waitFor({ state: 'hidden', timeout: 2000 });
    //   console.log('--- [POM] Попап куков успешно закрыт ---');
    // } catch (e) {
    //   console.log('--- [POM] Попап куков не появился ---');
    // }

    // // 3. Последовательно обрабатываем попап рекламы, если он появился
    // try {
    //   await this.popupCloseButton.waitFor({ state: 'visible', timeout: 5000 });
    //   await this.popupCloseButton.click({ noWaitAfter: true });
    //   await this.popupCloseButton.waitFor({ state: 'hidden', timeout: 3000 });
    //   console.log('--- [POM] Попап рекламы успешно закрыт ---');
    // } catch (e) {
    //   console.log('--- [POM] Попап рекламы не появился ---');
    // }
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
}
