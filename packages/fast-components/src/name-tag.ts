import { FASTElement, customElement, attr } from '@microsoft/fast-element';
import { template } from './name-tag.template';

@customElement({
  name: 'name-tag',
  template
})
export class NameTag extends FASTElement {
  @attr greeting = 'Hello';
  @attr name = '';

  // optional method 
  greetingChanged() {

  }
}