import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { getPreferences } from '../storage/preferences';
import { NotificationScheduler } from './NotificationScheduler';

const NOTIFICATION_CHANNEL_ID = 'place-reminders';

export async function setupNotificationChannel() {
  if (Platform.OS !== 'android') return;

  await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL_ID, {
    name: 'Place Reminders',
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

export async function requestReminderPermissions() {
  if (Platform.OS === 'web') return false;

  await setupNotificationChannel();
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;

  const next = await Notifications.requestPermissionsAsync();
  return next.granted;
}

export async function reconcileFestivalNotifications() {
  if (Platform.OS === 'web') return;

  const preferences = await getPreferences();
  if (!preferences.remindersEnabled) {
    await Notifications.cancelAllScheduledNotificationsAsync();
    return;
  }

  await setupNotificationChannel();
  await NotificationScheduler.scheduleAll();
}

export function extractNavigationTarget(response: Notifications.NotificationResponse) {
  const slug = response.notification.request.content.data?.slug as string | undefined;

  if (slug) {
    return { pathname: '/place/[slug]', params: { slug } };
  }

  return null;
}
