import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CategoriesPage extends BasePage {
  private get contentPageLocator() {
    return this.page.locator('.application-module__content');
  }
  // ---------------------------------------------------
  async pageHasLayout() {
    await expect(this.contentPageLocator).toHaveScreenshot('cateoriesPage.png', {
      maxDiffPixelRatio: 0.1,
      animations: 'disabled',
    });
  }

  async hideHeader() {
    await this.page.evaluate(() => {
      const header = document.querySelector('header');
      if (header) {
        header.style.display = 'none';
      }
    });
  }
}
