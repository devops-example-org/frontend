import { customElement, FASTElement, observable } from "@microsoft/fast-element";
import { template } from "./my-tabs.template";

@customElement({
  name: 'my-tabs',
  template
})
export class MyTabs extends FASTElement {
  @observable items: Array<any> = [];

}