/**
 * RemoteConfigContext
 *
 * Provides a `configVersion` counter that increments each time
 * RemoteConfigService applies new values. Any component that calls
 * `useRemoteConfig()` will automatically re-render and pick up the
 * latest featureFlags values.
 *
 * Usage:
 *   const { configVersion } = useRemoteConfig();
 *   // configVersion changes → re-render → featureFlags has latest values
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { RemoteConfigService } from '../services/remoteConfig/RemoteConfigService';

interface RemoteConfigContextValue {
  /** Increments every time remote config is applied. Use as a dep or key. */
  configVersion: number;
}

const RemoteConfigContext = createContext<RemoteConfigContextValue>({ configVersion: 0 });

export function RemoteConfigProvider({ children }: { children: React.ReactNode }) {
  const [configVersion, setConfigVersion] = useState(0);

  useEffect(() => {
    // Subscribe to config updates — bump version to trigger re-renders
    const unsubscribe = RemoteConfigService.subscribe(() => {
      setConfigVersion((v) => v + 1);
    });
    return unsubscribe;
  }, []);

  return (
    <RemoteConfigContext.Provider value={{ configVersion }}>
      {children}
    </RemoteConfigContext.Provider>
  );
}

export function useRemoteConfig(): RemoteConfigContextValue {
  return useContext(RemoteConfigContext);
}
