import { INITIAL_USERS, INITIAL_RELEASES } from '../data/mockData';
import type { UserRecord, ReleaseRecord } from '../data/mockData';
import { getLicensesDb, saveLicensesDb, getDevicesDb, saveDevicesDb } from './licenseService';
import { getPaymentsDb } from './paymentService';

const USERS_DB_KEY = 'algovault_users_db';
const RELEASES_DB_KEY = 'algovault_releases_db';

export const getReleasesDb = (): ReleaseRecord[] => {
  try {
    const raw = localStorage.getItem(RELEASES_DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(RELEASES_DB_KEY, JSON.stringify(INITIAL_RELEASES));
  return INITIAL_RELEASES;
};

export const adminService = {
  getStats: () => {
    const rawUsers = localStorage.getItem(USERS_DB_KEY);
    const users: UserRecord[] = rawUsers ? JSON.parse(rawUsers) : INITIAL_USERS;
    const licenses = getLicensesDb();
    const payments = getPaymentsDb();
    const devices = getDevicesDb();

    const activeLicenses = licenses.filter((l) => l.status === 'active');
    const totalRevenueInr = payments
      .filter((p) => p.status === 'captured')
      .reduce((acc, p) => acc + p.amount, 0);

    const activeDevicesCount = devices.filter((d) => d.isActive).length;

    return {
      totalUsers: users.length,
      paidUsers: activeLicenses.length,
      activeLicenses: activeLicenses.length,
      totalRevenueInr,
      activeDevices: activeDevicesCount,
      estimatedDownloads: 3420 + activeLicenses.length * 2,
    };
  },

  getAllUsers: (): UserRecord[] => {
    const raw = localStorage.getItem(USERS_DB_KEY);
    return raw ? JSON.parse(raw) : INITIAL_USERS;
  },

  revokeLicense: (licenseId: string) => {
    const licenses = getLicensesDb();
    const lic = licenses.find((l) => l.id === licenseId);
    if (lic) {
      lic.status = 'revoked';
      saveLicensesDb(licenses);
    }
  },

  reactivateLicense: (licenseId: string) => {
    const licenses = getLicensesDb();
    const lic = licenses.find((l) => l.id === licenseId);
    if (lic) {
      lic.status = 'active';
      saveLicensesDb(licenses);
    }
  },

  forceDeactivateDevice: (deviceId: string) => {
    const devices = getDevicesDb();
    const dev = devices.find((d) => d.id === deviceId);
    if (dev) {
      dev.isActive = false;
      saveDevicesDb(devices);
    }
  },

  addNewRelease: (release: ReleaseRecord) => {
    const releases = getReleasesDb();
    releases.unshift(release);
    localStorage.setItem(RELEASES_DB_KEY, JSON.stringify(releases));
  },
};
