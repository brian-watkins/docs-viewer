
export const findAll = (selector : string): NodeListOf<HTMLElement> => {
  return document.querySelectorAll(selector)
}

export const find = (selector: string): HTMLElement => {
  var el = document.querySelector(selector) as HTMLElement
  if (!el) {
    fail(`Could not find element for selector: ${selector}`)
  }
  return el
}

export const findWithin = (element: HTMLElement, selector: string): HTMLElement => {
  if (!element) {
    fail("Cannot find within null element!")
    return null
  }
  var el = element.querySelector(selector) as HTMLElement
  if (!el) {
    fail(`Could not find element within given element for selector: ${selector}`)
  }
  return el
}

export const textOf = (element: HTMLElement): string => {
  return element ? element.textContent : null
}

export const click = (element: HTMLElement) => {
  element.click()
}

export const expectLinkTo = (element: HTMLElement, expectedHref: string) => {
  expect(element.getAttribute("href")).toEqual(expectedHref)
}