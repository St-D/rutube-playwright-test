import { test as base } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { CategoriesPage } from '../pages/CategoriesPage';

// Declare the types of your fixtures.
type MyFixtures = {
  mainPage: MainPage;
  authMainPage: MainPage;
  categoriesPage: CategoriesPage;
};

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.open('/');
    await mainPage.dismissAdPopup();

    //----------------------------------------------------------------------------------
    // эта реализация не даёт снять снимки старницы для ariaSnapShot
    // Обработчик рекламы
    // await page.addLocatorHandler(mainPage.popupCloseButton, async (locator) => {
    //   try {
    //     // noWaitAfter предотвратит зависание обработчика, если анимация скрытия долгая
    //     await locator.click({ noWaitAfter: true });
    //   } catch (e) {
    //     console.log('Попап рекламы не удалось кликнуть или он исчез');
    //   }
    // });

    // // Обработчик куков
    // await page.addLocatorHandler(mainPage.cookieCloseButton, async (locator) => {
    //   try {
    //     await locator.click({ noWaitAfter: true });
    //   } catch (e) {
    //     console.log('Попап куков не удалось кликнуть или он исчез');
    //   }
    // });
    //----------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------

    // Use the fixture value in the test.
    await use(mainPage);

    // Clean up the fixture.
    // await todoPage.removeAll();
  },

  authMainPage: async ({ page }, use) => {
    const authMainPage = new MainPage(page);
    // await page.goto('/', { waitUntil: 'domcontentloaded' });
    await authMainPage.open('/');
    await authMainPage.dismissAdPopup();

    await use(authMainPage);
  },

  categoriesPage: async ({ page }, use) => {
    const categoriesPage = new CategoriesPage(page);
    await categoriesPage.open('/categories', { waitUntil: 'load' });
    await categoriesPage.dismissAdPopup();

    await use(categoriesPage);
  },
});
export { expect } from '@playwright/test';
