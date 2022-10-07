import {
  init,
  classModule,
  attributesModule,
  datasetModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h as sh,
  toVNode as sToVNode,
} from "snabbdom";

export const patch = init([
  classModule,
  attributesModule,
  styleModule,
  propsModule,
  datasetModule,
  eventListenersModule,
]);

export const h = sh;
export const toVnode = sToVNode;

import _toHTML from "snabbdom-to-html";
export const toHTML = _toHTML;
// export const toHTML = import("snabbdom-to-html"); // helper function for convert vnode to HTML string
export const htmlToVNode = (html) => {
  // helper function for convert html to vnode
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;

  return toVnode(wrapper).children;
};
