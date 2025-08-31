export type Stage =
  | 'PRE_AUTH'
  | 'ATTENDANCE'
  | 'BILLING'
  | 'ADJUDICATION'
  | 'PAYMENT';

export type ClaimStatus =
  | 'OPEN'
  | 'DENIED'
  | 'APPROVED'
  | 'PAID'
  | 'CANCELLED';

export type RevenueCycle = {
  id: number;
  patientId: string;
  payer: string;
  procedureCode: string;
  amount: number;
  stage: Stage;
  claimStatus: ClaimStatus;
  dueDate: string;
  paidDate: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateRevenueCyclePayload = Omit<RevenueCycle, 'id' | 'createdAt' | 'updatedAt'>;