import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MainPage extends BasePage {
  // private readonly headerLocator: Locator;
  // private readonly categoriesTabsLocator: Locator;
  // private readonly menuLocator: Locator;
  // private readonly headerAddBtnLocator: Locator;
  // private readonly headerNotificationBtnLocator: Locator;
  // private readonly headerLoginBtnLocator: Locator;

  // constructor(page: Page) {
  // super(page);
  // this.headerLocator = this.page.getByRole('banner');
  // this.categoriesTabsLocator = this.page.getByText('ГлавнаяЧМ-2026');
  // this.menuLocator = this.page.getByLabel('Облегченная панель навигации');
  // this.headerAddBtnLocator = this.page.getByRole('button', { name: 'Добавить' });
  // this.headerNotificationBtnLocator = this.page.getByRole('button', { name: 'Уведомления' });
  // this.headerLoginBtnLocator = this.page.getByRole('button', { name: 'Вход' });
  // }

  // ---------------------------------------------------
  private get headerLocator() {
    return this.page.getByRole('banner');
  }
  private get categoriesTabsLocator() {
    return this.page.getByTestId('homepage-navigation');
  }
  private get menuLocator() {
    return this.page.getByLabel('Облегченная панель навигации');
  }
  private get headerAddPopupLocator() {
    return this.page.getByRole('menu', { name: 'Добавить' });
  }
  private get headerAddBtnLocator() {
    return this.page.getByRole('button', { name: 'Добавить' });
  }
  private get headerNotificationBtnLocator() {
    return this.page.getByRole('button', { name: 'Уведомления' });
  }
  private get headerNotificationPopupLocator() {
    return this.page.getByRole('dialog');
  }

  private get fullMenuBtnLocator() {
    return this.page.getByRole('button', { name: 'Открыть меню навигации' });
  }
  private get fullMenuLocator() {
    return this.page.locator('.menu-content-module__content-wrapper');
  }

  private get headerSafeModeBtnLocator() {
    return this.page.getByRole('button', { name: 'перейти в безопасный режим' });
  }
  private get headerSafeModeBtnTooltipLocator() {
    return this.page.locator('[class*="safe-mode-header-entrypoint-module__content"]');
  }

  get popupCloseButton() {
    return this.page.getByTestId('popup').getByRole('button', { name: /Закрыть/ });
  }

  get cookieCloseButton() {
    return this.page.getByRole('button', { name: 'Ок', exact: true });
  }

  // ---------------------------------------------------

  async checkTitle() {
    await expect(this.page).toHaveTitle(/rutube/i);
  }

  async open() {
    // 1. Открываем страницу и ждем только базовый HTML-каркас
    await this.page.goto('https://rutube.ru', { waitUntil: 'domcontentloaded' });

    // 2. Последовательно обрабатываем попап куков, если он появился
    try {
      await this.cookieCloseButton.waitFor({ state: 'visible', timeout: 25000 });
      await this.cookieCloseButton.click({ noWaitAfter: true });
      await this.cookieCloseButton.waitFor({ state: 'hidden', timeout: 2000 });
      console.log('--- [POM] Попап куков успешно закрыт ---');
    } catch (e) {
      console.log('--- [POM] Попап куков не появился ---');
    }

    // 3. Последовательно обрабатываем попап рекламы, если он появился
    try {
      await this.popupCloseButton.waitFor({ state: 'visible', timeout: 25000 });
      await this.popupCloseButton.click({ noWaitAfter: true });
      await this.popupCloseButton.waitFor({ state: 'hidden', timeout: 2000 });
      console.log('--- [POM] Попап рекламы успешно закрыт ---');
    } catch (e) {
      console.log('--- [POM] Попап рекламы не появился ---');
    }
  }

  async headerHasAriaSnapshot() {
    await expect(this.headerLocator).toMatchAriaSnapshot({ name: 'headerAriaSnapshotc.aria.yml' });
  }
  async categoriesHasAriaSnapshot() {
    await expect(this.categoriesTabsLocator).toMatchAriaSnapshot({
      name: 'categoriesAriaSnapshot.aria.yml',
    });
  }
  async menuHasAriaSnapshot() {
    await expect(this.menuLocator).toMatchAriaSnapshot({ name: 'menuAriaSnapshot.aria.yml' });
  }

  // ---------------------------------------------------
  async hoverAddButton() {
    await this.headerAddBtnLocator.waitFor({ state: 'visible', timeout: 3000 });
    await this.headerAddBtnLocator.hover();
  }

  async headerAddButtonSnapshot() {
    await expect(this.headerAddBtnLocator).toMatchAriaSnapshot({
      name: 'headerAddButtonHoverSnapshot.aria.yml',
    });
  }

  async openAddPopup() {
    await this.headerAddBtnLocator.click({
      force: true, // 1. Игнорирует оверлеи рекламы, если они появятся
      noWaitAfter: true, // 2. Не ждет, пока страница "затихнет" после клика
    });
  }
  // ---------------------------------------------------

  async openNotificationBtnLocator() {
    await this.headerNotificationBtnLocator.click({
      force: true, // 1. Игнорирует оверлеи рекламы, если они появятся
      noWaitAfter: true, // 2. Не ждет, пока страница "затихнет" после клика
    });
  }

  async headerAddPopupSnapshot() {
    await expect(this.headerAddPopupLocator).toMatchAriaSnapshot({
      name: 'headerAddPopupSnapshot.aria.yml',
    });
  }

  // ---------------------------------------------------

  async headerNotificationPopupSnapshot() {
    await this.headerNotificationPopupLocator.waitFor({ state: 'visible', timeout: 3000 });
    await expect(this.headerNotificationPopupLocator).toMatchAriaSnapshot({
      name: 'headerNotificationPopupSnapshot.aria.yml',
    });
  }

  async hoverNotificationButton() {
    await this.headerNotificationBtnLocator.waitFor({ state: 'visible', timeout: 3000 });
    await this.headerNotificationBtnLocator.hover();
  }

  async headerNotificationButtonSnapshot() {
    await expect(this.headerNotificationBtnLocator).toMatchAriaSnapshot({
      name: 'headerNotificationButtonHoverSnapshot.aria.yml',
    });
  }
  // ---------------------------------------------------

  async hoverSafeModeButton() {
    await this.headerSafeModeBtnLocator.waitFor({ state: 'visible', timeout: 3000 });
    await this.headerSafeModeBtnLocator.hover();
  }

  async headerSafeModeButtonSnapshot() {
    await expect(this.headerSafeModeBtnTooltipLocator).toMatchAriaSnapshot({
      name: 'headerSafeModeButtonHoverSnapshot.aria.yml',
    });
  }

  // ---------------------------------------------------

  async openFullMenuBtn() {
    await this.fullMenuBtnLocator.click({ force: true, noWaitAfter: true });
  }

  async fullMenuSnapshot() {
    await this.fullMenuLocator.waitFor({ state: 'visible', timeout: 3000 });
    await expect(this.fullMenuLocator).toMatchAriaSnapshot({
      name: 'fullMenuLocatorSnapshot.aria.yml',
    });
  }

  // ---------------------------------------------------
}
