import React, { useState } from 'react';
import { Laptop, Apple, Monitor, Trash2, Plus, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { licenseService } from '../../services/licenseService';
import { DeviceRecord } from '../../data/mockData';
import { Modal } from '../../components/Modal';

export const DeviceManagement: React.FC = () => {
  const { user, license, refreshAuth } = useAuth();
  const { showToast } = useToast();

  const [devices, setDevices] = useState<DeviceRecord[]>(() => {
    return licenseService.getDevicesForLicense(license?.id || 'lic_rohit_pro');
  });

  const [deviceToDeactivate, setDeviceToDeactivate] = useState<DeviceRecord | null>(null);
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newPlatform, setNewPlatform] = useState<DeviceRecord['platform']>('macOS Apple Silicon');

  const maxDevices = license?.maxDevices || 3;
  const activeCount = devices.filter((d) => d.isActive).length;

  const handleConfirmDeactivate = async () => {
    if (!deviceToDeactivate) return;

    const success = await licenseService.deactivateDevice(deviceToDeactivate.id);
    if (success) {
      setDevices(licenseService.getDevicesForLicense(license?.id || 'lic_rohit_pro'));
      refreshAuth();
      showToast(`Deactivated ${deviceToDeactivate.deviceName}. Machine seat released!`, 'info');
    }
    setDeviceToDeactivate(null);
  };

  const handleAddDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeviceName.trim()) return;

    try {
      await licenseService.registerDevice(
        license?.id || 'lic_rohit_pro',
        newDeviceName.trim(),
        newPlatform,
        newPlatform.includes('macOS') ? 'macOS 15.2' : 'Windows 11 24H2'
      );
      setDevices(licenseService.getDevicesForLicense(license?.id || 'lic_rohit_pro'));
      refreshAuth();
      setShowAddDeviceModal(false);
      setNewDeviceName('');
      showToast('New device registered successfully!', 'success');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
            Device Management
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
            Manage the personal machines authorized to use your AlgoVault Pro license.
          </p>
        </div>

        <button
          onClick={() => setShowAddDeviceModal(true)}
          disabled={activeCount >= maxDevices}
          className="btn-primary"
          style={{
            padding: '10px 18px',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: activeCount >= maxDevices ? 0.6 : 1,
            cursor: activeCount >= maxDevices ? 'not-allowed' : 'pointer',
          }}
        >
          <Plus size={16} />
          <span>Register New Device</span>
        </button>
      </div>

      {/* Limit Status Bar */}
      <div
        className="glass-card"
        style={{
          padding: '20px 24px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          border: activeCount >= maxDevices ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(0, 240, 255, 0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Laptop size={22} color={activeCount >= maxDevices ? '#f59e0b' : '#00f0ff'} />
          <div>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
              {activeCount} of {maxDevices} Machine Seats in Use
            </div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              {activeCount >= maxDevices
                ? 'You have reached your seat limit. Deactivate an older device to connect a new one.'
                : `You can activate ${maxDevices - activeCount} more device(s) concurrently.`}
            </div>
          </div>
        </div>

        <div style={{ width: '140px' }}>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${(activeCount / maxDevices) * 100}%`,
                background: activeCount >= maxDevices ? '#f59e0b' : '#00f0ff',
              }}
            />
          </div>
        </div>
      </div>

      {/* Device List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {devices.map((device) => {
          const isMac = device.platform.toLowerCase().includes('mac');
          return (
            <div
              key={device.id}
              className="glass-card"
              style={{
                padding: '24px 28px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00f0ff',
                  }}
                >
                  {isMac ? <Apple size={24} /> : <Monitor size={24} />}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                      {device.deviceName}
                    </h3>
                    <span className="badge-status badge-active" style={{ fontSize: '0.72rem' }}>
                      Active
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <span>{device.platform} ({device.osVersion})</span>
                    <span>•</span>
                    <span>App v{device.appVersion}</span>
                    <span>•</span>
                    <span>Hardware ID: <code style={{ fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>{device.hardwareFingerprint}</code></span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#64748b' }}>
                  <div>Activated: {new Date(device.activatedAt).toLocaleDateString()}</div>
                  <div>Last sync: {new Date(device.lastActiveAt).toLocaleDateString()}</div>
                </div>

                <button
                  onClick={() => setDeviceToDeactivate(device)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#f87171',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  title="Deactivate this device"
                >
                  <Trash2 size={15} />
                  <span>Deactivate</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal for Deactivating */}
      {deviceToDeactivate && (
        <Modal
          isOpen={Boolean(deviceToDeactivate)}
          onClose={() => setDeviceToDeactivate(null)}
          title="Deactivate Device?"
        >
          <div style={{ padding: '6px 0' }}>
            <p style={{ color: '#cbd5e1', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Are you sure you want to deactivate <strong style={{ color: '#fff' }}>{deviceToDeactivate.deviceName}</strong>?
              This will release one machine seat on your Pro license. The offline cryptographic token on that device will be invalidated upon next launch.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => setDeviceToDeactivate(null)}
                className="btn-secondary"
                style={{ padding: '10px 18px', fontSize: '0.88rem', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeactivate}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  background: '#ef4444',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                }}
              >
                Deactivate Device
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Register New Device Modal */}
      {showAddDeviceModal && (
        <Modal
          isOpen={showAddDeviceModal}
          onClose={() => setShowAddDeviceModal(false)}
          title="Register Device Seat"
        >
          <form onSubmit={handleAddDevice}>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '18px' }}>
              Normally, devices are registered automatically when you log in to the desktop app. You can also manually allocate a seat here:
            </p>

            <div className="form-group">
              <label className="form-label">Device Name</label>
              <input
                type="text"
                required
                value={newDeviceName}
                onChange={(e) => setNewDeviceName(e.target.value)}
                placeholder="e.g. Workstation Laptop M3"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Operating System Platform</label>
              <select
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value as any)}
                className="form-input"
                style={{ background: 'rgba(10, 16, 32, 0.95)' }}
              >
                <option value="macOS Apple Silicon">macOS Apple Silicon (M1/M2/M3/M4)</option>
                <option value="macOS Intel">macOS Intel x64</option>
                <option value="Windows 11">Windows 10 / 11 64-bit</option>
                <option value="Linux">Linux (x86_64)</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
              <button
                type="button"
                onClick={() => setShowAddDeviceModal(false)}
                className="btn-secondary"
                style={{ padding: '10px 18px', fontSize: '0.88rem' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '10px 20px', fontSize: '0.88rem', cursor: 'pointer' }}
              >
                Register Seat
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
