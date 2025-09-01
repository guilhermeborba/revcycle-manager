import api from '../api/axios';
import type { RevenueCycle, CreateRevenueCyclePayload } from '../types/revenueCycle';

export async function getAllRevenueCycles(): Promise<RevenueCycle[]> {
  const { data } = await api.get('/revenue-cycles');
  return data;
}

export async function getRevenueCycleById(id: number): Promise<RevenueCycle> {
  const { data } = await api.get(`/revenue-cycles/${id}`);
  return data;
}

export async function createRevenueCycle(payload: CreateRevenueCyclePayload): Promise<RevenueCycle> {
  const { data } = await api.post('/revenue-cycles', payload);
  return data;
}

export async function updateRevenueCycle(
  id: number,
  payload: Partial<CreateRevenueCyclePayload>
): Promise<RevenueCycle> {
  const { data } = await api.patch(`/revenue-cycles/${id}`, payload);
  return data;
}

export async function deleteRevenueCycle(id: number): Promise<void> {
  await api.delete(`/revenue-cycles/${id}`);
}

export async function advanceStage(id: number): Promise<RevenueCycle> {
  const { data } = await api.patch(`/revenue-cycles/${id}/advance-stage`);
  return data;
}

export async function advanceStatus(id: number): Promise<RevenueCycle> {
  const { data } = await api.patch(`/revenue-cycles/${id}/advance-status`);
  return data;
}