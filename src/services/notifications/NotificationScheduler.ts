import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { featureFlags } from '../../utils/featureFlags';
import { getPreferences } from '../storage/preferences';
import { mockPlaces } from '../../data';

const NOTIFICATIONS_SYNCED_KEY = '@bihar_explorer_notifications_synced_date';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export class NotificationScheduler {
  static async sync() {
    if (!featureFlags.reminders) return;

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted' && existingStatus !== 'denied') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') return;

      const lastSynced = await AsyncStorage.getItem(NOTIFICATIONS_SYNCED_KEY);
      const todayString = new Date().toISOString().split('T')[0];
      if (lastSynced === todayString) return;

      await this.scheduleAll();
      await AsyncStorage.setItem(NOTIFICATIONS_SYNCED_KEY, todayString);
    } catch (e) {
      console.warn('Failed to sync notifications:', e);
    }
  }

  static async scheduleAll() {
    await Notifications.cancelAllScheduledNotificationsAsync();

    const prefs = await getPreferences();
    if (!prefs.remindersEnabled) return;

    // TODO: Implement Bihar Explorer specific notifications if needed
    // The previous implementation was for upcoming dates.
  }
}
