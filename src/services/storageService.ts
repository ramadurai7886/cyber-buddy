/**
 * Resilient Local Storage Service
 * Handles corrupted JSON, quota limitations, and provides fallback values.
 */

const STORAGE_KEYS = {
  THEME: 'cyberbuddy_theme',
  LANGUAGE: 'cyberbuddy_lang',
  SESSION_USER: 'cyberbuddy_session_user',
  CHAT_HISTORY: 'cyberbuddy_chat_history',
  REGISTERED_USERS: 'cyberbuddy_demo_users',
} as const;

export const StorageService = {
  KEYS: STORAGE_KEYS,

  getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (item === null || item === undefined || item === '') {
        return defaultValue;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.warn(`[StorageService] Failed to read key "${key}":`, error);
      return defaultValue;
    }
  },

  setItem<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`[StorageService] Failed to write key "${key}":`, error);
      return false;
    }
  },

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`[StorageService] Failed to remove key "${key}":`, error);
    }
  },

  clearAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.SESSION_USER);
      localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
    } catch (error) {
      console.warn('[StorageService] Failed to clear session:', error);
    }
  }
};
