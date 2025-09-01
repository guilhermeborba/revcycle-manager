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

export const stageLabels: Record<Stage, string> = {
  PRE_AUTH: 'Pré-Autorização',
  ATTENDANCE: 'Atendimento',
  BILLING: 'Faturamento',
  ADJUDICATION: 'Análise/Glosa',
  PAYMENT: 'Pagamento',
};

export const claimStatusLabels: Record<ClaimStatus, string> = {
  OPEN: 'Aberta',
  DENIED: 'Negada',
  APPROVED: 'Aprovada',
  PAID: 'Paga',
  CANCELLED: 'Cancelada',
};

export type CreateRevenueCyclePayload = Omit<RevenueCycle, 'id' | 'createdAt' | 'updatedAt'>;