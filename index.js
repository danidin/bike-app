import { createRouter } from './router';

export function bootstrap() {
  return Promise.resolve();
}

export function mount() {
  // window.router = createRouter();
  createRouter();
  return Promise.resolve()
    .then(() => document.getElementById('content').innerHTML = '<ui-view id="root"></ui-view>');
}

export function unmount() {
  return Promise.resolve()
    .then(() => {
      // delete window.router;
      document.getElementById('content').innerHTML = '';
    });
}
