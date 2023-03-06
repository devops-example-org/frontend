import { PLATFORM } from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {

  private router: Router;

  public message: string;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Contacts';
    config.map([
      { route: ['', 'home'],          moduleId: PLATFORM.moduleName('routes/home/index'),     name: 'home',    nav: true,   title: 'Home' },
      //{ route: '/contacts',  moduleId: './contacts', name:'contacts', nav: true,   title: 'Contacts' }
    ]);

    this.router = router;
  }
}
