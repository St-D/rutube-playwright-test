import { test, expect } from '../../fixtures/fixtures'; // Импортируем расширенный тест с фикстурами

test.describe.configure({ mode: 'serial' });

test('> Check user profile popUp for authorized user', async ({ authMainPage }) => {
  await authMainPage.openProfilePopup();
  await authMainPage.profilePopupSnapshot();
});
