import { html } from "@microsoft/fast-element";
import { NameTag } from "./name-tag";

export const template = html<NameTag>`
  <div class="header">
    <h3>${x => x.greeting.toUpperCase()}</h3>
    <h4>my name is ${x => x.name}</h4>
  </div>
  <div class="body">TODO: Name Here</div>
  <div class="footer"></div>
`;

