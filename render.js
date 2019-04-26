export const naiveRenderIntoDom = (stateDef) => {
  var state = stateDef.$$state();
  var parentId = state.parent.name || 'root';
  console.log(`rendering into ${parentId}`)
  var parent = document.getElementById(parentId);
  parent.innerHTML = state.html;
}

export const naiveClearRenderedDom = (stateDef) => {
  var state = stateDef.$$state();
  var parentId = state.parent.name || 'root';
  console.log(`clearing ${parentId}`)
  var parent = document.getElementById(parentId);
  parent.innerHTML = ``;
}
