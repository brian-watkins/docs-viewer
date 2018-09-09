
export const findAll = (selector : string): NodeListOf<HTMLElement> => {
  return document.querySelectorAll(selector)
}

export const find = (selector: string): HTMLElement => {
  return document.querySelector(selector)
}

export const textOf = (element: HTMLElement): string => {
  return element.textContent
}

export const click = (element: HTMLElement) => {
  element.click()
}