
export interface PageView {
  path: string
}

export interface AnalyticsService {
  sendPageView(pageView: PageView): void
}
