import { useState, useEffect, useCallback } from 'react';
import * as revenueCycleService from '../services/revenueCycle.service';
import type { RevenueCycle, CreateRevenueCyclePayload } from '../types/revenueCycle';
import { RevenueCycleModal } from '../components/RevenueCycleModal';

export function RevenueCyclePage() {
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

      const payload: Partial<CreateRevenueCyclePayload> = {
        patientId: data.patientId,
        payer: data.payer,
        procedureCode: data.procedureCode,
        amount: data.amount ? parseFloat(String(data.amount)) : 0,
        stage: data.stage,
        claimStatus: data.claimStatus,
        dueDate: data.dueDate,
        notes: data.notes,
      };
      
      if (data.paidDate) {
        payload.paidDate = data.paidDate;
      }

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
    <div style={{ padding: '24px' }}>
      <h1>Gestão do Ciclo de Receita</h1>
      <button onClick={handleOpenCreateModal} style={{ marginBottom: '16px', padding: '10px 16px' }}>
        Novo Ciclo
      </button>

      {loading && cycles.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Paciente</th>
              <th>Pagador</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.id}</td>
                <td>{cycle.patientId}</td>
                <td>{cycle.payer}</td>
                <td>{cycle.claimStatus}</td>
                <td>
                  <button onClick={() => handleOpenEditModal(cycle)}>Editar</button>
                  <button onClick={() => handleDelete(cycle.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <RevenueCycleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingCycle}
        isLoading={loading}
      />
    </div>
  );
}