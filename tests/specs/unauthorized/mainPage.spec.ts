import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';

test.beforeEach(async ({ page }) => {
  // Точный составной селектор на основе анализа тегов
  const popupCloseButton = page.locator(
    'div[data-testid="popup"] button[aria-label="Закрыть попап"]',
  );

  // Регистрируем фоновый обработчик прерываний (Interceptors)
  await page.addLocatorHandler(popupCloseButton, async (locator) => {
    await locator.click();
    console.log('--- [Playwright Auto-Close] Попап рекламы успешно закрыт ---');
  });
});

test('> Open main page', async ({ page }) => {
  const mainPage = new MainPage(page);

  await mainPage.open();
  await expect(page).toHaveTitle(/rutube/i);

  //   await page.waitForLoadState('networkidle');
});
