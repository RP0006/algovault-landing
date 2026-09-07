import { INITIAL_USERS } from '../data/mockData';
import type { UserRecord } from '../data/mockData';
import { trackEvent } from './analytics';

const CURRENT_USER_KEY = 'algovault_current_user';
const USERS_DB_KEY = 'algovault_users_db';

const getUsersDb = (): UserRecord[] => {
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(INITIAL_USERS));
  return INITIAL_USERS;
};

const saveUsersDb = (users: UserRecord[]) => {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
};

export const authService = {
  getCurrentUser: (): UserRecord | null => {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  login: async (email: string, _password?: string): Promise<UserRecord> => {
    await new Promise((r) => setTimeout(r, 450));

    const users = getUsersDb();
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!existing) {
      const newUser: UserRecord = {
        id: `usr_${Date.now()}`,
        email: email.trim(),
        fullName: email.split('@')[0].replace(/[._]/g, ' '),
        role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
        isEmailVerified: true,
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      saveUsersDb(users);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      trackEvent('login', { email, isNewUser: true });
      return newUser;
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(existing));
    trackEvent('login', { email: existing.email, role: existing.role });
    return existing;
  },

  signup: async (fullName: string, email: string, _password?: string): Promise<UserRecord> => {
    await new Promise((r) => setTimeout(r, 550));
    const users = getUsersDb();

    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email address already exists. Please log in.');
    }

    const newUser: UserRecord = {
      id: `usr_${Date.now()}`,
      email: email.trim(),
      fullName: fullName.trim(),
      role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
      isEmailVerified: false,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsersDb(users);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    trackEvent('signup', { email: newUser.email });
    return newUser;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  updateProfile: async (updates: Partial<UserRecord>): Promise<UserRecord> => {
    const current = authService.getCurrentUser();
    if (!current) throw new Error('Not authenticated');

    const updated = { ...current, ...updates };
    const users = getUsersDb().map((u) => (u.id === current.id ? updated : u));
    saveUsersDb(users);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated));
    return updated;
  },

  requestPasswordReset: async (_email: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 400));
  },

  verifyEmail: async (token: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 400));
    const current = authService.getCurrentUser();
    if (current) {
      current.isEmailVerified = true;
      authService.updateProfile({ isEmailVerified: true });
    }
    return Boolean(token);
  },
};
