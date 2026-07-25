// filepath: src/utils/storage.js
// Generic localStorage wrapper with JSON serialization.
export const storage = {
  get: (key, fallback = null) => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set: (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} },
  remove: (key) => localStorage.removeItem(key),
};
