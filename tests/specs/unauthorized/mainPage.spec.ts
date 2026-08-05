import { test, expect } from '../../fixtures/fixtures';
import { MainPage } from '../../pages/MainPage';

// test.beforeEach(async ({ page }) => {
//   const popupCloseButton = page.getByTestId('popup').getByRole('button', { name: 'Закрыть попап' });
//   const cookieCloseButton = page.getByRole('button', { name: 'Ок', exact: true });

//   // Регистрируем фоновый обработчик прерываний (Interceptors)
//   await page.addLocatorHandler(popupCloseButton, async (locator) => {
//     await locator.click();
//     console.log('--- [Playwright Auto-Close] Попап рекламы успешно закрыт ---');
//   });

//   await page.addLocatorHandler(cookieCloseButton, async (locator) => {
//     await locator.click();
//     console.log('--- [Playwright Auto-Close] Попап куков успешно закрыт ---');
//   });
// });

// Заставит тесты в этом конкретном файле идти один за другим
test.describe.configure({ mode: 'serial' });

test('> Check header elements avaliable', async ({ mainPage }) => {
  await mainPage.headerHasAriaSnapshot();
});

test('> Check categories tab elements avaliable', async ({ mainPage }) => {
  await mainPage.categoriesHasAriaSnapshot();
});

test('> Check menu tab elements avaliable', async ({ mainPage }) => {
  await mainPage.menuHasAriaSnapshot();
});

test('> Check add popup elements avaliable', async ({ mainPage }) => {
  await mainPage.openAddPopup();
  await mainPage.headerAddPopupSnapshot();
});

test('> Check notification popup elements avaliable', async ({ mainPage }) => {
  await mainPage.openNotificationBtnLocator();
  await mainPage.headerNotificationPopupSnapshot();
});
