import { BasePage } from './BasePage';

export class CategoriesPage extends BasePage {
  get contentPageLocator() {
    return this.page.locator('.application-module__content');
  }
}
