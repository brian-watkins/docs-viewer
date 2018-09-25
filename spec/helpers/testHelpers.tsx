
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

export const findAllWithin = (element: HTMLElement, selector: string): NodeListOf<HTMLElement> => {
  if (!element) {
    fail("Cannot find all within null element!")
    return null
  }
  return element.querySelectorAll(selector)
}

export const textOf = (element: HTMLElement): string => {
  return element ? element.textContent : null
}

export const click = (element: HTMLElement) => {
  element.click()
}

export const expectLink = (element: HTMLElement, expectedHref: string, expectedText: string) => {
  expect(element.getAttribute("href")).toEqual(expectedHref)
  expect(textOf(element)).toContain(expectedText)
}

export const expectNotWithin = (element: HTMLElement, selector: string) => {
  expect(element.querySelector(selector)).toBeNull()
}

export const expectAttribute = (element: HTMLElement, name: string, expectedValue: string) => {
  expect(element.getAttribute(name)).toEqual(expectedValue)
}

export type TypeExpectation = TypeVariableExpectation | SingleTypeExpectation | ComplexTypeExpectation | TupleTypeExpectation | SaturatedTypeExpectation

export interface TypeVariableExpectation {
  kind: "variable",
  name: string
}

export interface SingleTypeExpectation {
  kind: 'single',
  name: string,
  args: Array<TypeExpectation>
}

export interface ComplexTypeExpectation {
  kind: 'complex',
  types: Array<TypeExpectation>
}

export interface TupleTypeExpectation {
  kind: 'tuple',
  left: TypeExpectation,
  right: TypeExpectation
}

export interface SaturatedTypeExpectation {
  kind: 'saturated',
  name: string,
  types: Array<TypeExpectation>
}

export const typeOf = (name: string, args?: Array<TypeExpectation>): TypeExpectation => {
  return { kind: 'single', name, args }
}

export const tupleTypeOf = (left: TypeExpectation, right: TypeExpectation): TypeExpectation => {
  return { kind: 'tuple', left, right }
}

export const complexTypeOf = (types: Array<TypeExpectation>): TypeExpectation => {
  return { kind: 'complex', types }
}

export const typeVariableOf = (name: string): TypeExpectation => {
  return { kind: "variable", name }
}

export const expectTypeDefinition = (element: HTMLElement, expectedTypes: Array<TypeExpectation>) => {
  const actualTypes = findAllWithin(element, ":scope > .type-designation")
  expectedTypes.map((expectedType, index) => {
    const actualType = actualTypes.item(index)
    switch (expectedType.kind) {
      case "single":
        if (expectedType.name) {
          expect(textOf(findWithin(actualType, ".type-name"))).toEqual(expectedType.name)
        }
        if (expectedType.args) {
          expectTypeDefinition(findWithin(actualType, "[data-type-args]"), expectedType.args)
        } else {
          expect(findWithin(actualType, "[data-type-args]").children.length).toEqual(0)
        }
        break;

      case "variable":
        expect(textOf(actualType)).toEqual(expectedType.name)
        break;

      case "tuple":
        const tupleParts = findAllWithin(actualType, ".tuple-part")
        expectTypeDefinition(tupleParts.item(0), [ expectedType.left ])
        expectTypeDefinition(tupleParts.item(1), [ expectedType.right ])
        break;

      case "complex":
        expectTypeDefinition(actualType, expectedType.types)
        break;
    }
  })
}
