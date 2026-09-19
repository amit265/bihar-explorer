/**
 * Centralized app constants for Bihar Explorer — re-exports from links.ts
 * Strictly adhering to Shiv Charcha latest standards.
 */
import { APP_CONFIG, APP_LINKS } from './links';

export const APP_PACKAGE = APP_CONFIG.packageName;
export const PLAY_STORE_URL = APP_LINKS.playStoreUrl;
export const APP_WEBSITE_URL = APP_LINKS.appLandingPage;
export const PRIVACY_URL = APP_LINKS.privacyPolicyUrl;
export const TERMS_URL = APP_LINKS.termsOfServiceUrl;
export const SUPPORT_PAGE_URL = APP_LINKS.supportPageUrl;

export const SUPPORT_EMAIL = APP_CONFIG.supportEmail;
export const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}`;

export const APP_NAME = APP_CONFIG.appName;
export const APP_NAME_SHORT = APP_CONFIG.appNameShort;

export const DEVELOPER_NAME = APP_CONFIG.developerName;
export const DEVELOPER_EMAIL = 'mahavyomastudio@gmail.com';
