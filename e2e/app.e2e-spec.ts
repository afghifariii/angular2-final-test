import { Angular2FinalTestPage } from './app.po';

describe('angular2-final-test App', () => {
  let page: Angular2FinalTestPage;

  beforeEach(() => {
    page = new Angular2FinalTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
