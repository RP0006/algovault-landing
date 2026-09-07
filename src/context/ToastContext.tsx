import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, title?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info', title?: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast container floating at bottom right */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          pointerEvents: 'none',
          maxWidth: '400px',
          width: 'calc(100% - 48px)',
        }}
      >
        {toasts.map((t) => {
          const isSuccess = t.type === 'success';
          const isError = t.type === 'error';
          const borderColor = isSuccess ? 'rgba(16, 185, 129, 0.4)' : isError ? 'rgba(239, 68, 68, 0.4)' : 'rgba(0, 240, 255, 0.4)';
          const glowColor = isSuccess ? 'rgba(16, 185, 129, 0.15)' : isError ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 240, 255, 0.15)';
          const iconColor = isSuccess ? '#10b981' : isError ? '#ef4444' : '#00f0ff';

          return (
            <div
              key={t.id}
              className="glass-card"
              style={{
                pointerEvents: 'auto',
                padding: '16px 20px',
                borderRadius: '12px',
                border: `1px solid ${borderColor}`,
                background: 'rgba(11, 17, 34, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: `0 10px 30px -10px ${glowColor}, 0 4px 12px rgba(0,0,0,0.5)`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                animation: 'slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div style={{ marginTop: '2px', flexShrink: 0 }}>
                {isSuccess && <CheckCircle2 size={20} color={iconColor} />}
                {isError && <AlertCircle size={20} color={iconColor} />}
                {!isSuccess && !isError && <Info size={20} color={iconColor} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                {t.title && (
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#f8fafc', marginBottom: '2px' }}>
                    {t.title}
                  </div>
                )}
                <div style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.45 }}>{t.message}</div>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label="Close notification"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
