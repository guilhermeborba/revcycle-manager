import { useState, useEffect, useCallback } from 'react';
import * as revenueCycleService from '../../services/revenueCycle.service';
import type { RevenueCycle, CreateRevenueCyclePayload } from '../../types/revenueCycle';
import { stageLabels, claimStatusLabels } from '../../types/revenueCycle';
import { RevenueCycleModal } from '../../components/RevenueCycleModal';
import * as S from './styles';
import { FiChevronsRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

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
      toast.error("Não foi possível carregar os dados.");
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
    const isEditing = !!editingCycle?.id;
    
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

    const promise = isEditing
      ? revenueCycleService.updateRevenueCycle(editingCycle.id!, payload)
      : revenueCycleService.createRevenueCycle(payload as CreateRevenueCyclePayload);

    toast.promise(promise, {
      loading: 'Salvando...',
      success: (savedCycle) => {
        loadCycles();
        setIsModalOpen(false);
        return isEditing ? `Ciclo #${savedCycle.id} atualizado!` : `Ciclo #${savedCycle.id} criado!`;
      },
      error: 'Não foi possível salvar os dados.',
    });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      const promise = revenueCycleService.deleteRevenueCycle(id);
      toast.promise(promise, {
        loading: 'Deletando...',
        success: () => {
          loadCycles();
          return 'Item deletado com sucesso!';
        },
        error: 'Não foi possível deletar o item.',
      });
    }
  };

  const handleAdvanceStage = async (id: number) => {
    const promise = revenueCycleService.advanceStage(id);
    toast.promise(promise, {
      loading: 'Avançando fase...',
      success: () => {
        loadCycles();
        return 'Fase avançada com sucesso!';
      },
      error: 'Não foi possível avançar a fase.',
    });
  };

  const handleAdvanceStatus = async (id: number) => {
    const promise = revenueCycleService.advanceStatus(id);
    toast.promise(promise, {
      loading: 'Avançando status...',
      success: () => {
        loadCycles();
        return 'Status avançado com sucesso!';
      },
      error: 'Não foi possível avançar o status.',
    });
  };

  return (
    <S.Container>
      <S.Header>
        <h1>Gestão do Ciclo de Receita</h1>
        <div>
          <S.StyledLink to="/dashboard">Ir para o Dashboard</S.StyledLink>
        </div>
      </S.Header>
      <S.PrimaryButton onClick={handleOpenCreateModal}>
        Novo Ciclo
      </S.PrimaryButton>
      {loading && cycles.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <S.Table>
          <thead>
            <tr>
              <S.Th>ID</S.Th>
              <S.Th>Paciente</S.Th>
              <S.Th>Fase</S.Th>
              <S.Th>Status</S.Th>
              <S.Th>Ações</S.Th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <S.Td>{cycle.id}</S.Td>
                <S.Td>{cycle.patientId}</S.Td>
                <S.Td>
                  <S.StatusButton onClick={() => handleAdvanceStage(cycle.id)}>
                    {stageLabels[cycle.stage]} 
                    <span><FiChevronsRight size={18} /></span>
                  </S.StatusButton>
                </S.Td>
                <S.Td>
                  <S.StatusButton onClick={() => handleAdvanceStatus(cycle.id)}>
                    {claimStatusLabels[cycle.claimStatus]} <span><FiChevronsRight size={18} /></span>
                  </S.StatusButton>
                </S.Td>
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