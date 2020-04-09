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

    this.shadowRoot.addEventListener('click', event => {
      const path = event.path[0].dataset.path;
      if (path) {
        this.navigate(path);
      }
    });

    this.addEventListener('navigate', (event) => {
      this.router.stateService.go(event.detail.path);
    });
  }

  navigate(path) {
    this.dispatchEvent(new CustomEvent('navigate', { detail: { path }}));
  }
}
