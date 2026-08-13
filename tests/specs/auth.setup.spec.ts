// tests/specs/auth.setup.spec.ts
import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import path from 'path';

test.setTimeout(180000);

test('Генерация и сохранение сессии авторизации RUTUBE', async ({ page, context }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();

  console.log('👉 ОЖИДАНИЕ: Пожалуйста, войдите в аккаунт в окне браузера...');

  await expect(mainPage.profileInfoBtn).toBeVisible({ timeout: 120000 });

  const authFile = path.join(process.cwd(), 'playwright/.auth/user.json');
  await context.storageState({ path: authFile });
  console.log(`✅ УСПЕХ: Сессия сохранена в ${authFile}`);
});
