import { AnalyticsService, PageView } from "../services/AnalyticsService";

export type GTag = (action: string, trackingId: string, config: object) => void

export class GoogleAnalyticsService implements AnalyticsService {
  private gtag: GTag
  private trackingId: string
  
  constructor(gtag: GTag, trackingId: string) {
    this.gtag = gtag
    this.trackingId = trackingId
  }

  sendPageView(pageView: PageView) {
    this.gtag('config', this.trackingId, {
      page_path: pageView.path
    })
  }
}