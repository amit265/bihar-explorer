import AsyncStorage from '@react-native-async-storage/async-storage';
import { featureFlags } from '../../utils/featureFlags';
import { Platform } from 'react-native';

const REMOTE_CONFIG_URL = 'https://mahavyomastudio.com/apps/bihar-explorer/config.json';
const CACHE_KEY = 'bihar-explorer-remote-config-v1';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

interface RemoteExtras {
  forceUpdateVersion: string | null;
  maintenanceMode: boolean;
  updatedAt: string | null;
}

let _extras: RemoteExtras = {
  forceUpdateVersion: null,
  maintenanceMode: false,
  updatedAt: null,
};

const _listeners: (() => void)[] = [];

function applyRemoteConfig(remote: Record<string, any>): void {
  if (typeof remote.crossPromotion === 'boolean') featureFlags.crossPromotion = remote.crossPromotion;
  if (typeof remote.reminders === 'boolean') featureFlags.reminders = remote.reminders;

  if (typeof remote.forceUpdateVersion === 'string' || remote.forceUpdateVersion === null) {
    _extras.forceUpdateVersion = remote.forceUpdateVersion;
  }
  if (typeof remote.maintenanceMode === 'boolean') {
    _extras.maintenanceMode = remote.maintenanceMode;
  }
  if (typeof remote.updatedAt === 'string') {
    _extras.updatedAt = remote.updatedAt;
  }

  _listeners.forEach((cb) => cb());
}

export const RemoteConfigService = {
  getExtras(): RemoteExtras {
    return _extras;
  },

  subscribe(callback: () => void): () => void {
    _listeners.push(callback);
    return () => {
      const idx = _listeners.indexOf(callback);
      if (idx !== -1) _listeners.splice(idx, 1);
    };
  },

  async loadCached(): Promise<void> {
    try {
      const raw = await AsyncStorage.getItem(CACHE_KEY);
      if (!raw) return;
      const { timestamp, config } = JSON.parse(raw) as { timestamp: number; config: Record<string, any> };
      if (Date.now() - timestamp < CACHE_TTL_MS) {
        applyRemoteConfig(config);
      }
    } catch {
      // Ignore
    }
  },

  async fetch(): Promise<void> {
    if (Platform.OS === 'web') return;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(REMOTE_CONFIG_URL, {
        signal: controller.signal,
        headers: { 'Cache-Control': 'no-cache' },
      });
      clearTimeout(timeout);
      if (!res.ok) return;
      const remote = await res.json() as Record<string, any>;
      applyRemoteConfig(remote);
      await AsyncStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), config: remote })
      );
    } catch {
      // Silent error fallback
    }
  },

  async initialize(): Promise<void> {
    await this.loadCached();
    void this.fetch();
  },
};
