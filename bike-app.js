import { createRouter } from './router';

export class BikeApp extends HTMLElement {
  router;

  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});
    const div = document.createElement('div');
    div.innerHTML = '<ui-view id="root"></ui-view>';
    shadow.appendChild(div);
  }

  connectedCallback() {
    console.log('bike-app custom element connected with window', window);
    this.router = createRouter(this.shadowRoot);
  }
}
