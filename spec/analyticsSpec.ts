import { renderApp, defaultFakes, FakeDependencies } from "./helpers/renderApp";
import { findAll, click, find } from "./helpers/testHelpers";

describe("Analytics", () => {
  let fakes: FakeDependencies
  
  beforeEach(() => {
    fakes = defaultFakes()
    fakes.versions = [
      { major: 9, minor: 1, patch: 2 }
    ]
  })

  describe("when I go the default page", () => {
    beforeEach(async () => { 
      await renderApp(fakes)
    })

    it("records a page view", () => {
      expect(fakes.fakeAnalyticsService.sendPageView).toHaveBeenCalledWith({ path: "/versions/9.1.2" })
    })
  })

  describe("when I go to the home page for a version", () => {
    beforeEach(async () => { 
      await renderApp(fakes, "/versions/9.1.2")
    })

    it("records a page view", () => {
      expect(fakes.fakeAnalyticsService.sendPageView).toHaveBeenCalledWith({ path: "/versions/9.1.2" })
    })

    describe("when I click a module", () => {
      beforeEach(() => {
        const moduleList = findAll("#module-list li")
        click(moduleList.item(1))
      })

      it("records a page view", () => {
        expect(fakes.fakeAnalyticsService.sendPageView).toHaveBeenCalledWith({ path: "/versions/9.1.2/module/Module1.Module2"})
      })
    })

    describe("when I click to see the versions", () => {
      beforeEach(() => {
        click(find("[data-versions-link]"))
      })

      it("records a page view", () => {
        expect(fakes.fakeAnalyticsService.sendPageView).toHaveBeenCalledWith({ path: "/versions" })
      })
    })
  })
})