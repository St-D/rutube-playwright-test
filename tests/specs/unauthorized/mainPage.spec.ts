import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';

test.beforeEach(async ({ page }) => {
  const popupCloseButton = page.getByTestId('popup').getByRole('button', { name: 'Закрыть попап' });
  const cookieCloseButton = page.getByRole('button', { name: 'Ок', exact: true });

  // Регистрируем фоновый обработчик прерываний (Interceptors)
  await page.addLocatorHandler(popupCloseButton, async (locator) => {
    await locator.click();
    console.log('--- [Playwright Auto-Close] Попап рекламы успешно закрыт ---');
  });

  await page.addLocatorHandler(cookieCloseButton, async (locator) => {
    await locator.click();
    console.log('--- [Playwright Auto-Close] Попап куков успешно закрыт ---');
  });
});

test('> Open main page', async ({ page }) => {
  const mainPage = new MainPage(page);

  await mainPage.open();
  await expect(page).toHaveTitle(/rutube/i);

  await page.waitForLoadState();
});

test('> Check header elements avaliable', async ({ page }) => {
  const mainPage = new MainPage(page);

  await mainPage.open();
  // await page.getByRole('button', { name: 'Ок', exact: true }).click();

  await mainPage.headerHasAriaSnapshot();
});

test('> Check categories tab elements avaliable', async ({ page }) => {
  const mainPage = new MainPage(page);

  await mainPage.open();

  await mainPage.categoriesHasAriaSnapshot();
});

test('> Check menu tab elements avaliable', async ({ page }) => {
  const mainPage = new MainPage(page);

  await mainPage.open();

  await mainPage.menuHasAriaSnapshot();
});
