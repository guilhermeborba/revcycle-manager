import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import type {
  RevenueCycle,
  Stage,
  ClaimStatus,
} from '../types/revenueCycle';

const stageOptions: Stage[] = ['PRE_AUTH', 'ATTENDANCE', 'BILLING', 'ADJUDICATION', 'PAYMENT'];
const claimStatusOptions: ClaimStatus[] = ['OPEN', 'DENIED', 'APPROVED', 'PAID', 'CANCELLED'];

const stageLabels: Record<Stage, string> = {
  PRE_AUTH: 'Pré-Autorização',
  ATTENDANCE: 'Atendimento',
  BILLING: 'Faturamento',
  ADJUDICATION: 'Análise/Glosa',
  PAYMENT: 'Pagamento',
};

const claimStatusLabels: Record<ClaimStatus, string> = {
  OPEN: 'Aberta',
  DENIED: 'Negada',
  APPROVED: 'Aprovada',
  PAID: 'Paga',
  CANCELLED: 'Cancelada',
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<RevenueCycle>) => void;
  initialData: Partial<RevenueCycle> | null;
  isLoading: boolean;
}

export function RevenueCycleModal({ isOpen, onClose, onSave, initialData, isLoading }: Props) {
  const [formData, setFormData] = useState<Partial<RevenueCycle>>({});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData, isOpen]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  const isEditMode = !!initialData?.id;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{isEditMode ? 'Editar Ciclo de Receita' : 'Novo Ciclo de Receita'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label htmlFor="patientId">ID do Paciente</label>
              <input
                id="patientId"
                style={styles.input}
                value={formData.patientId || ''}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="payer">Pagador</label>
              <input
                id="payer"
                style={styles.input}
                value={formData.payer || ''}
                onChange={(e) => setFormData({ ...formData, payer: e.target.value })}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="procedureCode">Código do Procedimento</label>
              <input
                id="procedureCode"
                style={styles.input}
                value={formData.procedureCode || ''}
                onChange={(e) => setFormData({ ...formData, procedureCode: e.target.value })}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="amount">Valor</label>
              <input
                id="amount"
                type="number"
                style={styles.input}
                value={formData.amount || ''}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="stage">Fase</label>
              <select
                id="stage"
                style={styles.input}
                value={formData.stage || ''}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value as Stage })}
                required
              >
                <option value="" disabled>Selecione uma fase</option>
                {stageOptions.map(opt => <option key={opt} value={opt}>{stageLabels[opt]}</option>)}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="claimStatus">Status da Cobrança</label>
              <select
                id="claimStatus"
                style={styles.input}
                value={formData.claimStatus || ''}
                onChange={(e) => setFormData({ ...formData, claimStatus: e.target.value as ClaimStatus })}
                required
              >
                <option value="" disabled>Selecione um status</option>
                {claimStatusOptions.map(opt => <option key={opt} value={opt}>{claimStatusLabels[opt]}</option>)}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="dueDate">Data de Vencimento</label>
              <input
                id="dueDate"
                type="date"
                style={styles.input}
                value={formData.dueDate || ''}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="paidDate">Data de Pagamento</label>
              <input
                id="paidDate"
                type="date"
                style={styles.input}
                value={formData.paidDate || ''}
                onChange={(e) => setFormData({ ...formData, paidDate: e.target.value })}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="notes">Notas</label>
            <textarea
              id="notes"
              style={{ ...styles.input, height: '80px', resize: 'vertical' }}
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div style={styles.buttonGroup}>
            <button type="button" onClick={onClose} style={styles.buttonSecondary} disabled={isLoading}>
              Cancelar
            </button>
            <button type="submit" style={styles.buttonPrimary} disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { background: 'white', padding: '24px', borderRadius: '8px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  formGroup: { marginBottom: '16px', display: 'flex', flexDirection: 'column' },
  input: { width: '100%', padding: '10px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ccc' },
  buttonGroup: { display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px' },
  buttonPrimary: { padding: '10px 16px', border: 'none', background: '#007bff', color: 'white', borderRadius: '4px', cursor: 'pointer' },
  buttonSecondary: { padding: '10px 16px', border: '1px solid #ccc', background: 'white', color: '#333', borderRadius: '4px', cursor: 'pointer' },
};