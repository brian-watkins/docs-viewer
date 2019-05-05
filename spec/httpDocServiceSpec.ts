import { HttpDocService } from "../src/adapters/HttpDocService";
import { ModuleDocumentation } from "../src/model/ModuleDocumentation";
import Axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { DocService } from "../src/services/DocService";

describe("Http Doc Service", () => {
  const testReadme = "Here is the test README content."
  let mock: MockAdapter
  let subject: DocService
  
  beforeEach(() => {
    mock = new MockAdapter(Axios)
    subject = new HttpDocService()
  })
  
  afterEach(() => {
    mock.restore()
  })

  describe("When both requests are successful", () => {
    const packageVersion = { name: "fake-package", version: {major: 9, minor: 2, patch: 1} }

    beforeEach(() => {
      mock.onGet('/docs/fake-package/9.2.1/README.md').reply(200, testReadme)
      mock.onGet('/docs/fake-package/9.2.1/docs.json').reply(200, fakeDocumentation())
    })

    it("fetches the docs in sorted ordered by name", (done) => {
      subject.fetch(packageVersion).then(response => {
        expect(response.docs).toEqual(orderedFakeDocumentation())
        done()
      })
    })
  
    it("fetches the readme", (done) => {
      subject.fetch(packageVersion).then(response => {
        expect(response.readme).toEqual(testReadme)
        done()
      })
    })
  })
})

const fakeDocumentation = (): Array<ModuleDocumentation> => (
  [
    mainFunModule(),
    mainModule()
  ]
)

const orderedFakeDocumentation = (): Array<ModuleDocumentation> => (
  [
    mainModule(),
    mainFunModule()
  ]
)

const mainFunModule = (): ModuleDocumentation => (
  {
    name: "Main.Fun",
    comment: "@docs FunFunction",
    values: [
      {
        name: "FunFunction",
        comment: "Represents something fun",
        type: "String.String"
      }
    ],
    aliases: [
      {
        name: "SuperAlias",
        comment: "Results in something super",
        type: "SuperArg",
        args: [ "msg" ]
      }
    ],
    unions: []
  }
)

const mainModule = (): ModuleDocumentation => (
  {
    name: "Main",
    comment: "@docs AwesomeAlias",
    values: [],
    aliases: [
      { name: "AwesomeAlias",
        comment: "Something awesome",
        type: "AwesomeArg",
        args: []
      }
    ],
    unions: []
  }
)