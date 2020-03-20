import { pushStateLocationPlugin, servicesPlugin, UIRouter } from '@uirouter/core';
import { Visualizer } from '@uirouter/visualizer';

function naiveRenderIntoDom(stateDef) {
  var state = stateDef.$$state();
  var parentId = state.parent.name || 'root';
  console.log(`rendering into ${parentId}`)
  var parent = document.getElementById(parentId);
  parent.innerHTML = state.html;
}

function naiveClearRenderedDom(stateDef) {
  var state = stateDef.$$state();
  var parentId = state.parent.name || 'root';
  console.log(`clearing ${parentId}`)
  var parent = document.getElementById(parentId);
  parent.innerHTML = ``;
}

export function createRouter() {
  const router = new UIRouter();

  router.plugin(Visualizer);
  router.plugin(pushStateLocationPlugin);
  router.plugin(servicesPlugin);

  // This transition hook renders each active states' html property
  router.transitionService.onSuccess({}, (trans, state) => {
    trans.exiting().forEach(stateDef => naiveClearRenderedDom(stateDef));
    trans.entering().forEach(stateDef => naiveRenderIntoDom(stateDef));
  });

  // Register states
  router.stateRegistry.register({ name: 'intro', url: '/bike-app', html:  'INTRO <a ui-sref="page1">page 1</a>' });
  router.stateRegistry.register({ name: 'page1', url: '/bike-app/page1', html: 'PAGE 1 <a ui-sref="intro">back to intro</a>' });

  // Start the router
  router.trace.enable(1);
  router.urlService.rules.initial({ state: 'intro' });
  router.urlService.listen();
  router.urlService.sync();

  return router;
}
