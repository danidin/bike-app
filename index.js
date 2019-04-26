import { pushStateLocationPlugin, servicesPlugin, UIRouter } from '@uirouter/core';
import { Visualizer } from '@uirouter/visualizer';
import { naiveClearRenderedDom, naiveRenderIntoDom } from './render';

export function bootstrap() {
    return Promise.resolve();
}

export function mount() {
  // Create the router
  const router = new UIRouter();
  window.router = router;

  router.plugin(Visualizer);
  router.plugin(pushStateLocationPlugin);
  router.plugin(servicesPlugin);

  // This transition hook renders each active states' html property
  router.transitionService.onSuccess({}, (trans, state) => {
    trans.exiting().forEach(stateDef => naiveClearRenderedDom(stateDef));
    trans.entering().forEach(stateDef => naiveRenderIntoDom(stateDef));
  });

  // Register some sample states
  router.stateRegistry.register({ name: 'intro', url: '/bike-app', html:  'INTRO <a href="javascript:void(0)" onclick="router.stateService.go(\'page1\')">page 1</a>' });
  router.stateRegistry.register({ name: 'page1', url: '/bike-app/page1', html: 'PAGE 1 <a href="javascript:void(0)" onclick="router.stateService.go(\'intro\')">back to intro</a>' });

  // Start the router
  router.trace.enable(1);
  router.urlService.rules.initial({ state: 'intro' });
  router.urlService.listen();
  router.urlService.sync();

  return Promise.resolve().then(() => document.getElementById('content').innerHTML = '<ui-view id="root"></ui-view>');
}

export function unmount() {
    return Promise.resolve()
        .then(() => {
          delete window.router;
          document.getElementById('content').innerHTML = '';
        });
}
