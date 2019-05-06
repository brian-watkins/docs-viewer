import * as React from "react"
import * as ReactDOM from "react-dom"
import { MemoryRouter } from "react-router-dom"
import { App } from "../../src/components/App"
import { ModuleDocumentation } from "../../src/model/ModuleDocumentation"
import { DocService } from "../../src/services/DocService";
import { AnalyticsService } from "../../src/services/AnalyticsService"
import { wait } from "./testHelpers";
import { Version } from "../../src/model/Version";
import { testDocs } from "../fixtures/testDocumentation";
import { Package } from "../../src/model/Package";

export interface TestData {
  docs: Array<ModuleDocumentation>,
  readme: string,
  packages?: Array<Package>
}

export interface FakeDependencies {
  fakeDocService: DocService,
  fakeAnalyticsService: AnalyticsService,
  packages: Array<Package>
}

export const defaultFakes = () : FakeDependencies => {
  return fakeDependencies({
    docs: testDocs,
    readme: "Here is the Readme content. And a [link](http://www.yahoo.com).",
    packages: [
      new Package("fake.package", [
        { major: 1, minor: 1, patch: 2}
      ])
    ]
  })
}

export type Spied<T> = {  
  [Method in keyof T]: jasmine.Spy;
};

export const fakeDependencies = (testData: TestData) : FakeDependencies => {
  const fakeDocService : Spied<DocService> = jasmine.createSpyObj("docService", [ "fetch" ])
  fakeDocService.fetch.and.returnValue(Promise.resolve({ readme: testData.readme, docs: testData.docs }))

  const fakeAnalyticsService : Spied<AnalyticsService> = jasmine.createSpyObj("analyticsService", [ "sendPageView" ])

  const packages = testData.packages || [ new Package("fake.package", [{ major: 1, minor: 0, patch: 0 }]) ]

  return { fakeDocService, fakeAnalyticsService, packages }
}

export const renderApp = (fakes: FakeDependencies, route: string = "/fake.package") => {
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
    <App
      docService={fakes.fakeDocService}
      analyticsService={fakes.fakeAnalyticsService}
      packages={fakes.packages}
    />
  </MemoryRouter>
)
