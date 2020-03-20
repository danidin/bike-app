import { BikeApp } from './bike-app';

export function bootstrap() {
  return Promise.resolve();
}

export function mount() {
  customElements.define('bike-app', BikeApp);
  return Promise.resolve()
    .then(() => document.getElementById('content').innerHTML = '<bike-app></bike-app>');
}

export function unmount() {
  return Promise.resolve()
    .then(() => {
      document.getElementById('content').innerHTML = '';
    });
}
