import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MainPage extends BasePage {
  private readonly haederLocator: Locator;
  private readonly categoriesTabsLocator: Locator;
  private readonly menuLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.haederLocator = this.page.getByRole('banner');
    // this.ctegoriesTabsLocator = this.page.locator('section').filter({ hasText: /ГлавнаяЧМ-2026/ });
    this.categoriesTabsLocator = this.page.getByText('ГлавнаяЧМ-2026');
    this.menuLocator = this.page.getByLabel('Облегченная панель навигации');
  }

  async open() {
    await this.page.goto('https://rutube.ru/');
  }

  async headerHasAriaSnapshot() {
    await expect(this.haederLocator).toMatchAriaSnapshot();
  }
  async categoriesHasAriaSnapshot() {
    await expect(this.categoriesTabsLocator).toMatchAriaSnapshot();
  }
  async menuHasAriaSnapshot() {
    await expect(this.menuLocator).toMatchAriaSnapshot();
  }
}
