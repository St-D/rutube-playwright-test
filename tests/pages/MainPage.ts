import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MainPage extends BasePage {
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

  //--authorized Page-----------------------------------
  // ---------------------------------------------------

  get profileInfoBtn() {
    return this.page.getByRole('button', { name: 'Открыть меню пользователя' });
  }

  get profilePopupLocator() {
    // return this.page.getByLabel('Меню пользователя');
    return this.page.getByRole('dialog', { name: 'Меню пользователя' });
  }
  // ---------------------------------------------------
  // ---------------------------------------------------

  // get popupCloseButton() {
  //   return this.page.getByTestId('popup').getByRole('button', { name: /Закрыть/ });
  // }

  // get cookieCloseButton() {
  //   return this.page.getByRole('button', { name: 'Ок', exact: true });
  // }

  // ---------------------------------------------------

  async checkTitle() {
    await expect(this.page).toHaveTitle(/rutube/i);
  }

  // async open() {
  //   await this.page.goto(process.env.BASE_URL!, { waitUntil: 'domcontentloaded' });

  //   // 2. Последовательно обрабатываем попап куков, если он появился
  //   try {
  //     await this.cookieCloseButton.waitFor({ state: 'visible', timeout: 25000 });
  //     await this.cookieCloseButton.click({ noWaitAfter: true });
  //     await this.cookieCloseButton.waitFor({ state: 'hidden', timeout: 2000 });
  //     console.log('--- [POM] Попап куков успешно закрыт ---');
  //   } catch (e) {
  //     console.log('--- [POM] Попап куков не появился ---');
  //   }

  //   // 3. Последовательно обрабатываем попап рекламы, если он появился
  //   try {
  //     await this.popupCloseButton.waitFor({ state: 'visible', timeout: 25000 });
  //     await this.popupCloseButton.click({ noWaitAfter: true });
  //     await this.popupCloseButton.waitFor({ state: 'hidden', timeout: 2000 });
  //     console.log('--- [POM] Попап рекламы успешно закрыт ---');
  //   } catch (e) {
  //     console.log('--- [POM] Попап рекламы не появился ---');
  //   }
  // }

  async headerHasAriaSnapshot() {
    await this.checkAriaSnapshot(this.headerLocator, 'headerAriaSnapshotc.aria.yml');
  }
  async categoriesHasAriaSnapshot() {
    await this.checkAriaSnapshot(this.categoriesTabsLocator, 'categoriesAriaSnapshot.aria.yml');
  }
  async menuHasAriaSnapshot() {
    await this.checkAriaSnapshot(this.menuLocator, 'menuAriaSnapshot.aria.yml', 10000);
  }

  // ---------------------------------------------------
  async hoverAddButton() {
    await this.headerAddBtnLocator.waitFor({ state: 'visible', timeout: 3000 });
    await this.headerAddBtnLocator.hover();
  }

  async headerAddButtonSnapshot() {
    await this.checkAriaSnapshot(this.headerAddBtnLocator, 'headerAddButtonHoverSnapshot.aria.yml');
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
    await this.checkAriaSnapshot(this.headerAddPopupLocator, 'headerAddPopupSnapshot.aria.yml');
  }

  // ---------------------------------------------------

  async headerNotificationPopupSnapshot() {
    await this.checkAriaSnapshot(
      this.headerNotificationPopupLocator,
      'headerNotificationPopupSnapshot.aria.yml',
      3000,
    );
  }

  async hoverNotificationButton() {
    await this.headerNotificationBtnLocator.waitFor({ state: 'visible', timeout: 3000 });
    await this.headerNotificationBtnLocator.hover();
  }

  async headerNotificationButtonSnapshot() {
    await this.checkAriaSnapshot(
      this.headerNotificationBtnLocator,
      'headerNotificationButtonHoverSnapshot.aria.yml',
    );
  }
  // ---------------------------------------------------

  async hoverSafeModeButton() {
    await this.headerSafeModeBtnLocator.waitFor({ state: 'visible', timeout: 3000 });
    await this.headerSafeModeBtnLocator.hover();
  }

  async headerSafeModeButtonSnapshot() {
    await this.checkAriaSnapshot(
      this.headerSafeModeBtnTooltipLocator,
      'headerSafeModeButtonHoverSnapshot.aria.yml',
    );
  }

  // ---------------------------------------------------

  async openFullMenuBtn() {
    await this.fullMenuBtnLocator.click({ force: true, noWaitAfter: true });
  }

  async fullMenuSnapshot() {
    await this.checkAriaSnapshot(this.fullMenuLocator, 'fullMenuLocatorSnapshot.aria.yml', 3000);
  }

  // ---------------------------------------------------

  //--authorized Page-----------------------------------
  // ---------------------------------------------------

  async openProfilePopup() {
    await this.profileInfoBtn.click({ force: true, noWaitAfter: true });
  }

  async profilePopupSnapshot() {
    await this.checkAriaSnapshot(
      this.profilePopupLocator,
      'profilePopupLocatorSnapshot.aria.yml',
      3000,
    );
  }
  // ---------------------------------------------------

  // ---------------------------------------------------
}
