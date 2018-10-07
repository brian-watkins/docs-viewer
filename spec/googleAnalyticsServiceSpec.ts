import { GoogleAnalyticsService, GTag } from "../src/adapters/GoogleAnalyticsService";

describe("google analytics service", () => {
  let gtagSpy: GTag
  let subject: GoogleAnalyticsService

  beforeEach(() => {
    gtagSpy = jasmine.createSpy('gtag')
    subject = new GoogleAnalyticsService(gtagSpy, 'fake-tracking-id')
  })

  describe("#sendPageView", () => {
    beforeEach(() => {
      subject.sendPageView({ path: "/fun/awesome" })
    })

    it("records a page view", () => {
      expect(gtagSpy).toHaveBeenCalledWith('config', 'fake-tracking-id', { page_path: "/fun/awesome" })
    })
  })
})