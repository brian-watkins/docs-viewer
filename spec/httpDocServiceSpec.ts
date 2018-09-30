import { HttpDocService } from "../src/services/DocService";
import { ModuleDocumentation } from "../src/model/ModuleDocumentation";
import Axios from "axios"
import MockAdapter from "axios-mock-adapter"

describe("Http Doc Service", () => {
  const testReadme = "Here is the test README content."
  let mock: MockAdapter
  let subject: HttpDocService
  
  beforeEach(() => {
    mock = new MockAdapter(Axios)
    subject = new HttpDocService()
  })
  
  afterEach(() => {
    mock.restore()
  })

  describe("When both requests are successful", () => {
    beforeEach(() => {
      mock.onGet('/docs/4.0.0/README.md').reply(200, testReadme)
      mock.onGet('/docs/4.0.0/docs.json').reply(200, fakeDocumentation())  
    })

    it("fetches the docs", (done) => {
      subject.fetch().then(response => {
        expect(response.docs).toEqual(fakeDocumentation())
        done()
      })
    })
  
    it("fetches the readme", (done) => {
      subject.fetch().then(response => {
        expect(response.readme).toEqual(testReadme)
        done()
      })
    })
  })
})

const fakeDocumentation = (): Array<ModuleDocumentation> => (
  [
    { 
      name: "Main.Module",
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
      ]
    }
  ]
)