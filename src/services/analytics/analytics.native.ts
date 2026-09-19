import { getAnalytics, logEvent } from '@react-native-firebase/analytics';
import { getCrashlytics, log, recordError } from '@react-native-firebase/crashlytics';

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

function sanitizeParams(params?: AnalyticsParams) {
  if (!params) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(params).filter((entry): entry is [string, string | number | boolean] => entry[1] !== undefined && entry[1] !== null)
  );
}

export const Analytics = {
  async track(eventName: string, params?: AnalyticsParams) {
    logEvent(getAnalytics(), eventName as never, sanitizeParams(params));
  },

  async logScreen(screenName: string) {
    logEvent(getAnalytics(), 'screen_view', {
      screen_name: screenName,
      screen_class: screenName,
    });
  },

  async recordError(error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    log(getCrashlytics(), message);

    if (error instanceof Error) {
      recordError(getCrashlytics(), error);
    }
  },
};
