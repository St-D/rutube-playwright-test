import { test, expect } from '../../fixtures/fixtures';
import { MainPage } from '../../pages/MainPage';

// Заставит тесты в этом конкретном файле идти один за другим
test.describe.configure({ mode: 'serial' });

test('> Check header elements avaliable for unauthorized user', async ({ mainPage }) => {
  await mainPage.headerHasAriaSnapshot();
});

test('> Check categories tab elements avaliable for unauthorized user', async ({ mainPage }) => {
  await mainPage.categoriesHasAriaSnapshot();
});

test('> Check menu tab elements avaliable for unauthorized user', async ({ mainPage }) => {
  await mainPage.menuHasAriaSnapshot();
});

test('> Check add button tooltip on hover and menu on click for unauthorized user', async ({
  mainPage,
}) => {
  await mainPage.hoverAddButton();
  await mainPage.headerAddButtonSnapshot();

  await mainPage.openAddPopup();
  await mainPage.headerAddPopupSnapshot();
});

test('> Check notification button tooltip on hover and popup on click for unauthorized user', async ({
  mainPage,
}) => {
  await mainPage.hoverNotificationButton();
  await mainPage.headerNotificationButtonSnapshot();

  await mainPage.openNotificationBtnLocator();
  await mainPage.headerNotificationPopupSnapshot();
});

test('> Check safe mode button tooltip on hover for unauthorized user', async ({ mainPage }) => {
  await mainPage.hoverSafeModeButton();
  await mainPage.headerSafeModeButtonSnapshot();
});

test('> Check full menu elements avaliable for unauthorized user', async ({ mainPage }) => {
  await mainPage.openFullMenuBtn();
  await mainPage.fullMenuSnapshot();
});
