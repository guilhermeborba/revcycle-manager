import { useState, useEffect, useCallback } from 'react';
import * as revenueCycleService from '../../services/revenueCycle.service';
import type { RevenueCycle, CreateRevenueCyclePayload } from '../../types/revenueCycle';
import { RevenueCycleModal } from '../../components/RevenueCycleModal';
import * as S from './styles';

export default function RevenueCyclePage() {
  const [cycles, setCycles] = useState<RevenueCycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCycle, setEditingCycle] = useState<Partial<RevenueCycle> | null>(null);

  const loadCycles = useCallback(async () => {
    try {
      setLoading(true);
      const data = await revenueCycleService.getAllRevenueCycles();
      setCycles(data);
    } catch (error) {
      console.error("Falha ao buscar ciclos de receita", error);
      alert("Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCycles();
  }, [loadCycles]);

  const handleOpenCreateModal = () => {
    setEditingCycle(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cycle: RevenueCycle) => {
    setEditingCycle(cycle);
    setIsModalOpen(true);
  };

  const handleSave = async (data: Partial<RevenueCycle>) => {
    try {
      setLoading(true);

      const payload = {
        patientId: data.patientId,
        payer: data.payer,
        procedureCode: data.procedureCode,
        amount: data.amount ? parseFloat(String(data.amount)) : 0,
        stage: data.stage,
        claimStatus: data.claimStatus,
        dueDate: data.dueDate,
        notes: data.notes || null,
        paidDate: data.paidDate || null,
      };

      if (editingCycle?.id) {
        await revenueCycleService.updateRevenueCycle(editingCycle.id, payload);
      } else {
        await revenueCycleService.createRevenueCycle(payload as CreateRevenueCyclePayload);
      }

      setIsModalOpen(false);
      loadCycles();
    } catch (error) {
      console.error("Falha ao salvar ciclo de receita", error);
      alert("Não foi possível salvar os dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        setLoading(true);
        await revenueCycleService.deleteRevenueCycle(id);
        loadCycles();
      } catch (error) {
        console.error("Falha ao deletar ciclo de receita", error);
        alert("Não foi possível deletar o item.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.PrimaryButton onClick={handleOpenCreateModal}>
          Novo Ciclo
        </S.PrimaryButton>
      </S.Header>


      {loading && cycles.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <S.Table>
          <thead>
            <tr>
              <S.Th>ID</S.Th>
              <S.Th>Paciente</S.Th>
              <S.Th>Pagador</S.Th>
              <S.Th>Status</S.Th>
              <S.Th>Ações</S.Th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <S.Td>{cycle.id}</S.Td>
                <S.Td>{cycle.patientId}</S.Td>
                <S.Td>{cycle.payer}</S.Td>
                <S.Td>{cycle.claimStatus}</S.Td>
                <S.Td>
                  <S.ActionsContainer>
                    <S.EditButton onClick={() => handleOpenEditModal(cycle)}>
                      Editar
                    </S.EditButton>
                    <S.DeleteButton onClick={() => handleDelete(cycle.id)}>
                      Excluir
                    </S.DeleteButton>
                  </S.ActionsContainer>
                </S.Td>
              </tr>
            ))}
          </tbody>
        </S.Table>
      )}
      
      <RevenueCycleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingCycle}
        isLoading={loading}
      />
    </S.Container>
  );
}