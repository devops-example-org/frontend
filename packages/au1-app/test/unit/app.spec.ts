import {bootstrap} from 'aurelia-bootstrapper';
import {ComponentTester, StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';

describe('Stage App Component', () => {
  let component: ComponentTester<any>;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('app'))
      .inView('<app></app>');
  });

  afterEach(() => component.dispose());

  it('should render message', done => {
    component.create(bootstrap).then(() => {
      const view = component.element;
      expect(view.textContent!.trim()).toBe('Hello World!');
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
