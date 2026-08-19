import { test } from '../../fixtures/fixtures';
test.describe.configure({ mode: 'serial' });

test('> Check categories structure for unauthorized user', async ({ categoriesPage }) => {
  await categoriesPage.hideElement('header');
  await categoriesPage.scrollToBottom();
  await categoriesPage.pageHasLayout(categoriesPage.contentPageLocator, 'cateoriesPage.png');
});
