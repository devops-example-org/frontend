import { FASTElement, customElement, attr } from '@microsoft/fast-element';
import { template } from './name-tag.template';

@customElement({
  name: 'name-tag',
  template
})
export class NameTag extends FASTElement {
  @attr greeting: string = 'Hello';
  @attr name: string = '';

  // optional method 
  greetingChanged() {

  }
}