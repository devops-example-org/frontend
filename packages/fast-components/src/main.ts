import { 
  provideFASTDesignSystem, 
  allComponents
} from '@microsoft/fast-components';
import { App } from './app';
import { MyTabs } from './my-tabs';
import { NameTag } from './name-tag';


provideFASTDesignSystem().register(allComponents, NameTag, MyTabs, App);
console.log('I AM FROM MAIN');