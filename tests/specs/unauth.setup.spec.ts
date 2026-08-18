import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import path from 'path';

test('guest storageState with cookie consent', async ({ page, context }) => {
  const mainPage = new MainPage(page);
  await mainPage.open('/');
  await mainPage.dismissOverlays();

  const authFile = path.join(process.cwd(), 'playwright/.auth/guest.json');
  await context.storageState({ path: authFile });
  console.log(`✅ УСПЕХ: Сессия сохранена в ${authFile}`);
});
