import AsyncStorage from '@react-native-async-storage/async-storage';
export interface UserPreferences {
  language: string;
  remindersEnabled: boolean;
  reminderHour: number;
  theme: string;
}

const STORAGE_KEY = 'bihar-explorer:user-preferences';

export const defaultPreferences: UserPreferences = {
  language: 'hi',
  remindersEnabled: true,
  reminderHour: 8,
  theme: 'light',
};

export async function getPreferences(): Promise<UserPreferences> {
  const storedValue = await AsyncStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    return defaultPreferences;
  }

  try {
    return {
      ...defaultPreferences,
      ...JSON.parse(storedValue),
    } as UserPreferences;
  } catch {
    return defaultPreferences;
  }
}

export async function updatePreferences(nextPreferences: Partial<UserPreferences>): Promise<UserPreferences> {
  const currentPreferences = await getPreferences();
  const mergedPreferences = {
    ...currentPreferences,
    ...nextPreferences,
  };

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mergedPreferences));
  return mergedPreferences;
}
