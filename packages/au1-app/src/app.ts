import { PLATFORM } from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {

  private router: Router;

  public message: string;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Contacts';
    config.map([
      { route: ['', 'home'],          moduleId: PLATFORM.moduleName('routes/home/index'),     name: 'home',    nav: true,   title: 'Home' },
      { route: '/app-module-one',  moduleId: PLATFORM.moduleName('routes/app-module-one/index'), name:'app-module-one', nav: true,   title: 'The App Module #1' }
    ]);

    this.router = router;
  }
}
