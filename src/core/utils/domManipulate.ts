/**
 * [description `add` or `remove` className of element
 */
export const operateClassName = (element: any, ctrl: any, className: any) => {
  element.classList[ctrl](className)
}

export const insertBefore = (newNode: any, originNode: any) => {
  const parentNode = originNode.parentNode
  parentNode.insertBefore(newNode, originNode)
}

// DOM operations
export const insertAfter = (newNode: any, originNode: any) => {
  const parentNode = originNode.parentNode

  if (originNode.nextSibling) {
    parentNode.insertBefore(newNode, originNode.nextSibling)
  } else {
    parentNode.appendChild(newNode)
  }
}
