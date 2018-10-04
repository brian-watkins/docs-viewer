import * as React from "react"
import * as ReactDOM from "react-dom"
import { MemoryRouter } from "react-router-dom"
import { App } from "../../src/components/App"
import { ModuleDocumentation } from "../../src/model/ModuleDocumentation"
import { DocService } from "../../src/services/DocService";
import { FakeDocService } from "../fakes/FakeDocService";
import { wait } from "./testHelpers";
import { Version } from "../../src/model/Version";
import { testDocs } from "../fixtures/testDocumentation";

export interface TestData {
  docs: Array<ModuleDocumentation>,
  readme: string,
  versions?: Array<Version>
}

export interface FakeDependencies {
  fakeDocService: DocService,
  versions: Array<Version>
}

export const defaultFakes = () : FakeDependencies => {
  return fakeDependencies({
    docs: testDocs,
    readme: "Here is the Readme content.",
    versions: [
      { major: 1, minor: 1, patch: 2 }
    ] 
  })
}

export type Spied<T> = {  
  [Method in keyof T]: jasmine.Spy;
};

export const fakeDependencies = (testData: TestData) : FakeDependencies => {
  const fakeDocService : Spied<DocService> = jasmine.createSpyObj("docService", [ "fetch" ])
  fakeDocService.fetch.and.returnValue(Promise.resolve({ readme: testData.readme, docs: testData.docs }))
  // const fakeDocService = new FakeDocService()
  // fakeDocService.readme = testData.readme
  // fakeDocService.docs = testData.docs

  const versions = testData.versions || [{ major: 1, minor: 0, patch: 0 }]

  return { fakeDocService, versions }
}

export const renderApp = (fakes: FakeDependencies, route: string = "/") => {
  var div = document.querySelector("#react-test-app")
  if (div) {
    ReactDOM.unmountComponentAtNode(div);
  }
  else {
    div = document.createElement('div');
    div.id = "react-test-app"
    document.querySelector("body").appendChild(div)  
  }

  ReactDOM.render(app(fakes, route), div)

  return wait()
}

const app = (fakes: FakeDependencies, route: string) => (
  <MemoryRouter initialEntries={[route]}>
    <App docService={fakes.fakeDocService} versions={fakes.versions} />
  </MemoryRouter>
)
