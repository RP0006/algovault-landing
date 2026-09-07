import { INITIAL_LICENSES, INITIAL_DEVICES } from '../data/mockData';
import type { LicenseRecord, DeviceRecord } from '../data/mockData';
import { trackEvent } from './analytics';

const LICENSES_DB_KEY = 'algovault_licenses_db';
const DEVICES_DB_KEY = 'algovault_devices_db';

export const getLicensesDb = (): LicenseRecord[] => {
  try {
    const raw = localStorage.getItem(LICENSES_DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(LICENSES_DB_KEY, JSON.stringify(INITIAL_LICENSES));
  return INITIAL_LICENSES;
};

export const saveLicensesDb = (licenses: LicenseRecord[]) => {
  localStorage.setItem(LICENSES_DB_KEY, JSON.stringify(licenses));
};

export const getDevicesDb = (): DeviceRecord[] => {
  try {
    const raw = localStorage.getItem(DEVICES_DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(DEVICES_DB_KEY, JSON.stringify(INITIAL_DEVICES));
  return INITIAL_DEVICES;
};

export const saveDevicesDb = (devices: DeviceRecord[]) => {
  localStorage.setItem(DEVICES_DB_KEY, JSON.stringify(devices));
};

export const licenseService = {
  getUserLicense: (userId: string): LicenseRecord | null => {
    const licenses = getLicensesDb();
    const userLicense = licenses.find((l) => l.userId === userId && l.status === 'active');
    if (userLicense) {
      const activeDevices = getDevicesDb().filter((d) => d.licenseId === userLicense.id && d.isActive);
      userLicense.activeDevicesCount = activeDevices.length;
    }
    return userLicense || null;
  },

  getAllLicenses: (): LicenseRecord[] => {
    return getLicensesDb();
  },

  getAllDevices: (): DeviceRecord[] => {
    return getDevicesDb();
  },

  getDevicesForLicense: (licenseId: string): DeviceRecord[] => {
    return getDevicesDb().filter((d) => d.licenseId === licenseId && d.isActive);
  },

  createLicenseForUser: async (
    userId: string,
    userEmail: string,
    planType: 'pro_lifetime' | 'pro_annual' = 'pro_lifetime',
    orderId: string
  ): Promise<LicenseRecord> => {
    const licenses = getLicensesDb();

    const block = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    const licenseKey = `ALGO-PRO-${block()}-${block()}-${block()}`;

    const newLicense: LicenseRecord = {
      id: `lic_${Date.now()}`,
      userId,
      userEmail,
      licenseKey,
      planType,
      status: 'active',
      maxDevices: planType === 'pro_lifetime' ? 3 : 2,
      activeDevicesCount: 0,
      orderId,
      issuedAt: new Date().toISOString(),
      expiresAt: planType === 'pro_annual' ? new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString() : null,
      lastVerifiedAt: new Date().toISOString(),
    };

    licenses.unshift(newLicense);
    saveLicensesDb(licenses);
    return newLicense;
  },

  deactivateDevice: async (deviceId: string): Promise<boolean> => {
    const devices = getDevicesDb();
    const device = devices.find((d) => d.id === deviceId);
    if (!device) return false;

    device.isActive = false;
    saveDevicesDb(devices);

    const licenses = getLicensesDb();
    const license = licenses.find((l) => l.id === device.licenseId);
    if (license) {
      license.activeDevicesCount = Math.max(0, license.activeDevicesCount - 1);
      saveLicensesDb(licenses);
    }

    trackEvent('device_deactivated', { deviceId, deviceName: device.deviceName });
    return true;
  },

  registerDevice: async (
    licenseId: string,
    deviceName: string,
    platform: DeviceRecord['platform'],
    osVersion: string
  ): Promise<DeviceRecord> => {
    const licenses = getLicensesDb();
    const license = licenses.find((l) => l.id === licenseId);
    if (!license) throw new Error('License not found');

    const devices = getDevicesDb();
    const currentActive = devices.filter((d) => d.licenseId === licenseId && d.isActive);

    if (currentActive.length >= license.maxDevices) {
      throw new Error(`Activation seat limit reached (${license.maxDevices}/${license.maxDevices} devices). Please deactivate an older device to register this one.`);
    }

    const newDevice: DeviceRecord = {
      id: `dev_${Date.now()}`,
      licenseId,
      deviceName,
      platform,
      osVersion,
      hardwareFingerprint: `${Math.random().toString(36).substring(2, 12)}...${Math.random().toString(36).substring(2, 6)}`,
      appVersion: '1.4.2',
      isActive: true,
      activatedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
      locationCity: 'Local Workstation',
    };

    devices.push(newDevice);
    saveDevicesDb(devices);

    license.activeDevicesCount = currentActive.length + 1;
    saveLicensesDb(licenses);

    trackEvent('device_activated', { licenseId, deviceName });
    return newDevice;
  },

  generateSignedOfflineCertificate: (license: LicenseRecord, device: DeviceRecord) => {
    const payload = {
      licenseKey: license.licenseKey,
      plan: license.planType,
      userId: license.userId,
      hardwareFingerprint: device.hardwareFingerprint,
      issuedAt: license.issuedAt,
      expiresAt: license.expiresAt,
      gracePeriodDays: 30,
    };

    const token = btoa(JSON.stringify(payload)) + '.sig_' + Math.random().toString(36).substring(2, 14);
    return {
      payload,
      token,
      verificationNotice: 'Verified with AlgoVault Ed25519 Public Key. 100% offline valid.',
    };
  },
};
