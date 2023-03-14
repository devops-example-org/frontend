import { customElement, FASTElement, html, observable } from "@microsoft/fast-element";

const template = html<App>`
<my-tabs :items=${x => x.contents}></my-tabs>
`;

@customElement({
  name: 'my-app',
  template
})
export class App extends FASTElement {
  @observable contents: Array<unknown> = [
    'unicorn', 'fuck!', 'Me'
  ];

}