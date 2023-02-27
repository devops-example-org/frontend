import { html, repeat } from "@microsoft/fast-element";
import { MyTabs } from "./my-tabs";

export const template = html<MyTabs>`
<fast-tabs>
    ${repeat(x => x.items, html<string>`
      <fast-tab slot="tab">${x => x}</fast-tab>
    `)}   
      
      ${repeat(x => x.items, html<string>`
      <fast-tab-panel slot="tabpanel">${x => x}</fast-tab-panel>
    `)}
  </fast-tabs>`;