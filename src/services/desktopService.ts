/**
 * Desktop Application Integration Layer
 * Connects the web platform with the AlgoVault Electron / Native desktop app.
 */

import { licenseService } from './licenseService';

export const desktopService = {
  /**
   * Generates a deep-link URL that desktop app intercepts (protocol handler: algovault://)
   * This eliminates the need for manual copy-pasting of license keys or order IDs.
   */
  generateActivationDeepLink: (licenseKey: string, userId: string): string => {
    const activationToken = btoa(JSON.stringify({ licenseKey, userId, timestamp: Date.now() }));
    return `algovault://activate?token=${encodeURIComponent(activationToken)}&client=web_dashboard`;
  },

  /**
   * Desktop App API Simulator: Simulates a request from desktop app to activate device
   */
  simulateDesktopActivation: async (
    licenseKey: string,
    deviceName: string,
    platform: 'macOS Apple Silicon' | 'macOS Intel' | 'Windows 11' | 'Linux'
  ) => {
    const licenses = licenseService.getAllLicenses();
    const license = licenses.find((l) => l.licenseKey === licenseKey && l.status === 'active');

    if (!license) {
      throw new Error('Invalid or revoked license key');
    }

    const device = await licenseService.registerDevice(
      license.id,
      deviceName,
      platform,
      platform.includes('macOS') ? 'macOS 15.2' : 'Windows 11 24H2'
    );

    const certificate = licenseService.generateSignedOfflineCertificate(license, device);

    return {
      success: true,
      device,
      certificate,
    };
  },

  /**
   * Check for latest desktop application releases
   */
  checkForUpdates: (currentVersion: string = '1.4.2') => {
    const latest = '1.4.2';
    return {
      hasUpdate: currentVersion !== latest,
      currentVersion,
      latestVersion: latest,
      releaseNotesUrl: '/changelog',
    };
  },
};
