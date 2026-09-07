/**
 * Privacy-Conscious Commercial Analytics Tracker
 * Tracks essential funnel milestones without collecting PII or telemetry on user DSA problems.
 */

export type AnalyticsEventType =
  | 'page_view'
  | 'signup'
  | 'login'
  | 'pricing_view'
  | 'checkout_start'
  | 'checkout_completed'
  | 'download_clicked'
  | 'device_activated'
  | 'device_deactivated';

export interface AnalyticsEvent {
  id: string;
  eventType: AnalyticsEventType;
  timestamp: string;
  properties?: Record<string, any>;
}

const STORAGE_KEY = 'algovault_analytics_events';

export const trackEvent = (eventType: AnalyticsEventType, properties: Record<string, any> = {}) => {
  try {
    const event: AnalyticsEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      eventType,
      timestamp: new Date().toISOString(),
      properties,
    };

    const existingJson = localStorage.getItem(STORAGE_KEY);
    const events: AnalyticsEvent[] = existingJson ? JSON.parse(existingJson) : [];
    events.unshift(event);

    // Keep latest 100 events in client buffer
    if (events.length > 100) events.length = 100;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));

    // Optional console log in development
    if (import.meta.env.DEV) {
      console.log(`[Analytics: ${eventType}]`, properties);
    }
  } catch (e) {
    // Fail silently without disrupting user UX
  }
};

export const getStoredEvents = (): AnalyticsEvent[] => {
  try {
    const existingJson = localStorage.getItem(STORAGE_KEY);
    return existingJson ? JSON.parse(existingJson) : [];
  } catch {
    return [];
  }
};
