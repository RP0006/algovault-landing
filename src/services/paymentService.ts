import { INITIAL_PAYMENTS } from '../data/mockData';
import type { PaymentRecord } from '../data/mockData';
import { licenseService } from './licenseService';
import { trackEvent } from './analytics';

const PAYMENTS_DB_KEY = 'algovault_payments_db';

export const getPaymentsDb = (): PaymentRecord[] => {
  try {
    const raw = localStorage.getItem(PAYMENTS_DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(PAYMENTS_DB_KEY, JSON.stringify(INITIAL_PAYMENTS));
  return INITIAL_PAYMENTS;
};

const savePaymentsDb = (payments: PaymentRecord[]) => {
  localStorage.setItem(PAYMENTS_DB_KEY, JSON.stringify(payments));
};

export interface CheckoutOptions {
  planId: 'pro_lifetime' | 'pro_annual';
  planName: string;
  amount: number;
  currency?: string;
  userEmail: string;
  userName: string;
  userId: string;
  onSuccess: (licenseKey: string) => void;
  onError: (errorMsg: string) => void;
  onDismiss?: () => void;
}

export const paymentService = {
  getAllPayments: (): PaymentRecord[] => {
    return getPaymentsDb();
  },

  startCheckout: async (options: CheckoutOptions) => {
    trackEvent('checkout_start', {
      planId: options.planId,
      amount: options.amount,
      userEmail: options.userEmail,
    });

    const orderNumber = `ORD-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const gatewayOrderId = `order_RZP_${Date.now()}`;

    const fulfillPayment = async (paymentId: string, paymentMethod: 'UPI' | 'Credit Card' | 'NetBanking') => {
      const newLicense = await licenseService.createLicenseForUser(
        options.userId,
        options.userEmail,
        options.planId,
        orderNumber
      );

      const newPayment: PaymentRecord = {
        id: `pay_${Date.now()}`,
        orderNumber,
        userId: options.userId,
        userEmail: options.userEmail,
        userName: options.userName,
        gatewayOrderId,
        gatewayPaymentId: paymentId,
        amount: options.amount,
        currency: options.currency || 'INR',
        paymentMethod,
        status: 'captured',
        createdAt: new Date().toISOString(),
        planName: options.planName,
        receiptUrl: `https://algovault.dev/receipts/${orderNumber}.pdf`,
      };

      const payments = getPaymentsDb();
      payments.unshift(newPayment);
      savePaymentsDb(payments);

      trackEvent('checkout_completed', {
        orderNumber,
        planId: options.planId,
        amount: options.amount,
        licenseKey: newLicense.licenseKey,
      });

      options.onSuccess(newLicense.licenseKey);
    };

    return {
      orderNumber,
      gatewayOrderId,
      fulfillPayment,
    };
  },
};
