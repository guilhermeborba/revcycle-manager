import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { RevenueCycleModal } from './RevenueCycleModal';

describe('RevenueCycleModal', () => {

  it('should render the form correctly for a new cycle', () => {
    const onSaveMock = vi.fn();
    const onCloseMock = vi.fn();

    render(
      <RevenueCycleModal
        isOpen={true}
        onClose={onCloseMock}
        onSave={onSaveMock}
        initialData={null}
        isLoading={false}
      />
    );

    expect(screen.getByText('Novo Ciclo de Receita')).toBeInTheDocument();
    expect(screen.getByLabelText('ID do Paciente')).toHaveValue('');
    expect(screen.getByLabelText('Pagador')).toHaveValue('');
  });

  it('should call onSave with the correct payload when form is filled and submitted', async () => {
    const user = userEvent.setup();
    const onSaveMock = vi.fn();
    const onCloseMock = vi.fn();
    
    render(
      <RevenueCycleModal
        isOpen={true}
        onClose={onCloseMock}
        onSave={onSaveMock}
        initialData={null}
        isLoading={false}
      />
    );
    
    await user.type(screen.getByLabelText('ID do Paciente'), 'PATIENT-123');
    await user.type(screen.getByLabelText('Pagador'), 'Health Insure Co.');
    await user.type(screen.getByLabelText('Código do Procedimento'), 'PROC-XYZ');
    await user.type(screen.getByLabelText('Valor'), '150.50');
    await user.selectOptions(screen.getByLabelText('Fase'), 'BILLING');
    await user.selectOptions(screen.getByLabelText('Status da Cobrança'), 'OPEN');
    
    const dueDateInput = screen.getByLabelText('Data de Vencimento');
    await user.type(dueDateInput, '2025-09-30');
    
    await user.click(screen.getByRole('button', { name: /salvar/i }));

    expect(onSaveMock).toHaveBeenCalledOnce();
    expect(onSaveMock).toHaveBeenCalledWith(
      expect.objectContaining({
        patientId: 'PATIENT-123',
        payer: 'Health Insure Co.',
        procedureCode: 'PROC-XYZ',
        amount: 150.5,
        stage: 'BILLING',
        claimStatus: 'OPEN',
        dueDate: '2025-09-30',
      })
    );
  });
  
  it('should have buttons disabled when isLoading is true', () => {
    render(
      <RevenueCycleModal
        isOpen={true}
        onClose={() => {}}
        onSave={() => {}}
        initialData={null}
        isLoading={true}
      />
    );

    expect(screen.getByRole('button', { name: /salvando/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeDisabled();
  });
});