import { renderApp, defaultFakes, FakeDependencies } from "./helpers/renderApp"
import { click, find, findAll, textOf, wait, expectAttribute, expectLink, findWithin } from "./helpers/testHelpers";

describe("when I click to see the versions", () => {
  let fakes: FakeDependencies

  beforeEach(async () => {
    fakes = defaultFakes()
    fakes.versions = [
      { major: 4, minor: 0, patch: 0 },
      { major: 3, minor: 0, patch: 0 },
      { major: 2, minor: 1, patch: 6 },
      { major: 1, minor: 0, patch: 0 }
    ]

    await renderApp(fakes)

    click(find("[data-versions-link]"))
  })

  it("shows a list of versions", () => {
    const versions = findAll("#versions li")

    expect(textOf(versions.item(0))).toContain("4.0.0")
    expect(textOf(versions.item(1))).toContain("3.0.0")
    expect(textOf(versions.item(2))).toContain("2.1.6")
    expect(textOf(versions.item(3))).toContain("1.0.0")
  })

  describe("when I click a version", () => {
    beforeEach(async () => {
      click(findAll("#versions li").item(2))
      await wait()
    })

    it("shows the home page for that version", () => {
      expect(textOf(find("#banner"))).toContain("2.1.6")
    })

    it("fetches the docs for that version", () => {
      expect(fakes.fakeDocService.fetch).toHaveBeenCalledWith({major: 2, minor: 1, patch: 6})
    })

    describe("when I click a module", () => {
      beforeEach(() => {
        const moduleList = findAll("#module-list li")
        click(moduleList.item(1))
      })

      it("links to a module at the right version", () => {
        expect(textOf(find("#banner"))).toContain("2.1.6")
      })
  
      it("refers to types at the right version", () => {
        var values = findAll("#documentation .value-block")
        expectAttribute(values.item(0), "id", "funcOne")
        expectLink(findWithin(values.item(0), "[data-type-name]"), "/versions/2.1.6/module/Module1.Module2#funcOne", "funcOne")
  
        expectAttribute(values.item(1), "id", "funcTwo")
        expectLink(findWithin(values.item(1), "[data-type-name]"), "/versions/2.1.6/module/Module1.Module2#funcTwo", "funcTwo")
      })

      describe("when I click the version number", () => {
        it("returns to the readme", () => {
          click(find("[data-readme-link]"))
          expect(textOf(find("#banner"))).toContain("2.1.6")
          expect(textOf(find("#readme"))).toContain("Here is the Readme content.")
        })
      })  
    })
  })
})

describe("when the version is not found", () => {
  let fakes: FakeDependencies

  beforeEach(async () => {
    fakes = defaultFakes()
    fakes.versions = [
      { major: 19, minor: 8, patch: 47 },
      { major: 4, minor: 0, patch: 0 },
      { major: 3, minor: 0, patch: 0 },
      { major: 2, minor: 1, patch: 6 },
      { major: 1, minor: 0, patch: 0 }
    ]
  })

  const expectLatestVersion = () => {
    expect(textOf(find("#banner"))).toContain("19.8.47")
    expect(textOf(find("#readme"))).toContain("Here is the Readme content.")
    expect(fakes.fakeDocService.fetch).toHaveBeenCalledWith({major: 19, minor: 8, patch: 47})
  }

  describe("when the version is unpareasble", () => {
    it("fetches the home page for the latest version", async () => {
      await renderApp(fakes, "/versions/19.x.32a")
      expectLatestVersion()
    })
  })

  describe("when the version is unparseable for a module", () => {
    it("fetches the home page for the latest version", async () => {
      await renderApp(fakes, "/versions/19.x.32a/module/Blah.Blah")
      expectLatestVersion()
    })
  })

  describe("when the version is not found", () => {
    it("fetches the home page for the latest version", async () => {
      await renderApp(fakes, "/versions/4.4.32")
      expectLatestVersion()
    })
  })

  describe("when the version is not found for a module", () => {
    it("fetches the home page for the latest version", async () => {
      await renderApp(fakes, "/versions/4.8.22/module/Blah.Blah")
      expectLatestVersion()
    })
  })
})