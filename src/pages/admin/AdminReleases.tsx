import React, { useState } from 'react';
import { getReleasesDb, adminService } from '../../services/adminService';
import { desktopService } from '../../services/desktopService';
import { Layers, Plus, Terminal, Play, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { ReleaseRecord } from '../../data/mockData';
import { Modal } from '../../components/Modal';

export const AdminReleases: React.FC = () => {
  const { showToast } = useToast();
  const [releases, setReleases] = useState<ReleaseRecord[]>(getReleasesDb());
  const [showAddModal, setShowAddModal] = useState(false);

  // New release form state
  const [version, setVersion] = useState('1.5.0');
  const [releaseTag, setReleaseTag] = useState('v1.5.0 Beta');
  const [notes, setNotes] = useState('Added automated Git commit on save and AST invariant parser.');

  // Desktop Simulator state
  const [simLicenseKey, setSimLicenseKey] = useState('ALGO-PRO-88F2-A4D1-9842');
  const [simDeviceName, setSimDeviceName] = useState('Tester MacBook Air M3');
  const [simPlatform, setSimPlatform] = useState<'macOS Apple Silicon' | 'Windows 11'>('macOS Apple Silicon');
  const [simOutput, setSimOutput] = useState<any | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleCreateRelease = (e: React.FormEvent) => {
    e.preventDefault();
    const newRel: ReleaseRecord = {
      version,
      releaseTag,
      releaseDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isLatest: true,
      highlights: notes.split('\n').filter(Boolean),
      macArm64: {
        url: `https://releases.algovault.dev/v${version}/AlgoVault-${version}-arm64.dmg`,
        sha256: 'mock_sha256_mac_arm64_' + Math.random().toString(36).substring(2, 10),
        size: '85.2 MB',
      },
      macIntel: {
        url: `https://releases.algovault.dev/v${version}/AlgoVault-${version}-x64.dmg`,
        sha256: 'mock_sha256_mac_x64_' + Math.random().toString(36).substring(2, 10),
        size: '90.1 MB',
      },
      windowsExe: {
        url: `https://releases.algovault.dev/v${version}/AlgoVault-Setup-${version}-x64.exe`,
        sha256: 'mock_sha256_win_exe_' + Math.random().toString(36).substring(2, 10),
        size: '92.4 MB',
      },
      windowsZip: {
        url: `https://releases.algovault.dev/v${version}/AlgoVault-${version}-portable.zip`,
        sha256: 'mock_sha256_win_zip_' + Math.random().toString(36).substring(2, 10),
        size: '95.1 MB',
      },
      linuxAppImage: {
        url: `https://releases.algovault.dev/v${version}/AlgoVault-${version}.AppImage`,
        sha256: 'mock_sha256_linux_' + Math.random().toString(36).substring(2, 10),
        size: '97.0 MB',
      },
    };

    adminService.addNewRelease(newRel);
    setReleases(getReleasesDb());
    setShowAddModal(false);
    showToast(`Published Release v${version}!`, 'success');
  };

  const handleRunDesktopSimulation = async () => {
    setIsSimulating(true);
    try {
      const res = await desktopService.simulateDesktopActivation(
        simLicenseKey,
        simDeviceName,
        simPlatform
      );
      setSimOutput(res);
      showToast('Desktop client activation simulated and verified!', 'success');
    } catch (err: any) {
      setSimOutput({ error: err.message });
      showToast(err.message, 'error');
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
            Release Deployment & Desktop APIs
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
            Manage desktop binary builds, update CDN artifacts, and test incoming desktop client integration requests.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
          style={{ padding: '10px 18px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={16} />
          <span>Deploy New Release</span>
        </button>
      </div>

      {/* Releases List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {releases.map((rel) => (
          <div key={rel.version} className="glass-card" style={{ padding: '26px', borderRadius: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>v{rel.version}</span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>({rel.releaseTag})</span>
                {rel.isLatest && (
                  <span className="badge-status badge-active" style={{ fontSize: '0.7rem' }}>
                    Production Active
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Released: {rel.releaseDate}</span>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.86rem', color: '#cbd5e1', marginBottom: '16px' }}>
              {rel.highlights.map((h, i) => (
                <li key={i}>• {h}</li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', fontSize: '0.78rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
              <span>macOS arm64: {rel.macArm64.size}</span>
              <span>•</span>
              <span>Windows x64: {rel.windowsExe.size}</span>
              <span>•</span>
              <span>Linux: {rel.linuxAppImage.size}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Desktop App Integration Simulator */}
      <div className="glass-card" style={{ padding: '32px', borderRadius: '20px', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <Terminal size={22} color="#00f0ff" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
            Desktop Client Activation Simulator (API Testing)
          </h3>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '22px' }}>
          Simulates how the desktop app calls <code>POST /api/v1/desktop/device/activate</code> to bind hardware seats and receive signed offline certificates.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label className="form-label">License Key</label>
            <input
              type="text"
              value={simLicenseKey}
              onChange={(e) => setSimLicenseKey(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Device Hostname</label>
            <input
              type="text"
              value={simDeviceName}
              onChange={(e) => setSimDeviceName(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Platform</label>
            <select
              value={simPlatform}
              onChange={(e) => setSimPlatform(e.target.value as any)}
              className="form-input"
              style={{ background: 'rgba(10, 16, 32, 0.95)' }}
            >
              <option value="macOS Apple Silicon">macOS Apple Silicon</option>
              <option value="Windows 11">Windows 11</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleRunDesktopSimulation}
          disabled={isSimulating}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '0.88rem', cursor: isSimulating ? 'not-allowed' : 'pointer' }}
        >
          <Play size={16} />
          <span>{isSimulating ? 'Simulating...' : 'Test Device Activation API'}</span>
        </button>

        {/* Live Output */}
        {simOutput && (
          <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
              Response Payload (JSON):
            </div>
            <pre
              style={{
                background: 'rgba(6, 10, 20, 0.9)',
                borderRadius: '10px',
                padding: '16px',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                color: simOutput.error ? '#f87171' : '#a7f3d0',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                overflowX: 'auto',
              }}
            >
              {JSON.stringify(simOutput, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Deploy Release Modal */}
      {showAddModal && (
        <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Deploy New Version Release">
          <form onSubmit={handleCreateRelease}>
            <div className="form-group">
              <label className="form-label">Version Number (e.g. 1.5.0)</label>
              <input
                type="text"
                required
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Release Tag (e.g. v1.5.0 Beta · April 2026)</label>
              <input
                type="text"
                required
                value={releaseTag}
                onChange={(e) => setReleaseTag(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Release Highlights (one per line)</label>
              <textarea
                required
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="form-input"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary" style={{ padding: '10px 18px' }}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Deploy to CDN
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
