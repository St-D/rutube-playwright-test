import { BasePage, PageTestParams } from './BasePage';

export class ForCreatorsPage extends BasePage {
  get urlCreators() {
    return '/for_creators/';
  }

  get pageLocator() {
    return this.page.locator('#___gatsby');
  }

  static readonly creatorsPageTestParams: PageTestParams[] = [
    {
      name: 'Главная',
      urlTab: '#main',
      prtScrName: 'main.png',
    },
    {
      name: 'Первые шаги',
      urlTab: '#steps',
      prtScrName: 'steps.png',
    },
    {
      name: 'Как развивать канал',
      urlTab: '#faq',
      prtScrName: 'faq.png',
    },
    {
      name: 'Монетизация на RUTUBE',
      urlTab: '#monetization',
      prtScrName: 'monetization.png',
    },
    {
      name: 'Правила и рекомендации',
      urlTab: '#rules',
      prtScrName: 'rules.png',
    },
    {
      name: 'Академия Блогеров',
      urlTab: '#academy',
      prtScrName: 'academy.png',
    },
    {
      name: 'Уровни авторов',
      urlTab: '#grades',
      prtScrName: 'grades.png',
    },
  ];
}
