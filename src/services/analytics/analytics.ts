type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

export const Analytics = {
  track(_eventName: string, _params?: AnalyticsParams) {
    return Promise.resolve();
  },

  logScreen(_screenName: string) {
    return Promise.resolve();
  },

  recordError(_error: unknown) {
    return Promise.resolve();
  },
};
