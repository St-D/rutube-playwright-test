import { test } from '../../fixtures/fixtures';
import { ForCreatorsPage } from '../../pages/ForCreatorsPage';

ForCreatorsPage.creatorsPageTestParams.forEach(({ name, urlTab, prtScrName }) => {
  test(`> Check <${name}>-Page for unauthorized user`, async ({ page }) => {
    const forCreatorsPageInst = new ForCreatorsPage(page);
    const fullUrl = `${forCreatorsPageInst.urlCreators}${urlTab}`;

    await forCreatorsPageInst.open(fullUrl, { waitUntil: 'load' });
    await forCreatorsPageInst.hideElement('header');
    await forCreatorsPageInst.scrollToBottom();

    await forCreatorsPageInst.pageHasLayout(forCreatorsPageInst.pageLocator, prtScrName);
  });
});
