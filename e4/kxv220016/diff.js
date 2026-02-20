/**
 * Convert a virtual DOM node (vNode) into a real DOM node.
 *
 * @param {Object|string} vNode - A virtual DOM node. Either:
 *   - string → represents a text node
 *   - object → { type: string, props: Object, children: Array }
 * @returns {Node} A real DOM Node (Element or Text)
 */
function createTree(vnode) {
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }

  const el = document.createElement(vnode.type);

  // set attributes
  for (const [key, value] of Object.entries(vnode.props || {})) {
    el.setAttribute(key, value);
  }

  // recursively create children
  (vnode.children || []).forEach(child => {
    el.appendChild(createTree(child));
  });

  return el;
}

/**
 * Diff two virtual DOM nodes and update the real DOM node accordingly.
 * @param {Object|string|null} oldVNode - Previous vDOM node.
 * @param {Object|string|null} newVNode - New vDOM node.
 * @param {Node|null} domNode - Real DOM node corresponding to oldVNode.
 */
function diff(oldVNode, newVNode, domNode) {

  // You may have to use some of these: appendChild(), removeChild(), 
  // replaceChild(), removeAttribute(), getAttribute(), textContent, childNodes[]


  // My implementation essentially returns null all the time except
  // for when we add a new node (aka when domNode is null). The reason
  // is that there is no way to reference the parent. Lowkey the function
  // signature should be changed to (oldVNode, newVNode, domNode, parent (= null))

  // Case 1: both are text (string), but may be different
  if (typeof oldVNode === "string" && typeof newVNode === "string") {
    if (oldVNode !== newVNode) {
      domNode.nodeValue = newVNode;
    }
    return null;
  }
  // getting the parent node will be useful
  const parent = domNode && domNode.parentNode;

  // Case 2: oldVnode is nullish -> append new to parent
  if (!oldVNode && newVNode) {
    const newDom = createTree(newVNode);
    return newDom;
  }

  // Case 3: newVnode is nullish -> remove
  if (oldVNode && !newVNode) {
    if (parent) { // for html element
      parent.removeChild(domNode);
    }
    return null;
  }

  // Case 4: Node type changed -> replace
  if (typeof oldVNode !== typeof newVNode ||
      (typeof oldVNode === 'object' && oldVNode.type !== newVNode.type)) {
    const newDom = createTree(newVNode);
    if (parent) {
      parent.replaceChild(newDom, domNode);
    }
    return null;
  }

  // Case 5: Update attributes
  if (typeof oldVNode === "object" && typeof newVNode === "object") {
    const oldProps = oldVNode.props || {};
    const newProps = newVNode.props || {};

    // add/update new attributes
    for (const prop in newProps) {
      if (domNode.getAttribute(prop) !== newProps[prop]) {
        domNode.setAttribute(prop, newProps[prop]);
      }
    }

    // remove old attributes
    for (const prop in oldProps) {
      if (!(prop in newProps)) {
        domNode.removeAttribute(prop);
      }
    }

  }
  // Recursively diff children
  const oldChildren = oldVNode.children || [];
  const newChildren = newVNode.children || [];
  const domChildren = Array.from(domNode.childNodes);

  const maxLength = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxLength; i++) {
    let newNode = diff(
      oldChildren[i],
      newChildren[i],
      domChildren[i]
    );

    if (newNode) {
      domNode.appendChild(newNode);
    }
  }

  return null;
}
