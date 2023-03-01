import { 
  provideFASTDesignSystem,   allComponents
} from '@microsoft/fast-components';
import { App } from './app';
import { MyTabs } from './my-tabs';
import { NameTag } from './name-tag';

//export {allComponents} from '@microsoft/fast-components';
export * from './my-tabs';
export * from './name-tag';
export * from './app';

provideFASTDesignSystem().register(allComponents, NameTag, MyTabs, App);

console.log('I AM FROM INDEX')