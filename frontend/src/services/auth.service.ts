import { api } from "../api/axios";

export type User = { id: string; name: string; email: string };

export async function login(payload: { email: string; password: string }): Promise<{ token: string }> {
  const { data } = await api.post<{ access_token: string }>("/auth/login", payload);
  return { token: data.access_token };
}

export async function register(payload: { name: string; email: string; password: string }): Promise<{ user: User; token: string }> {
  const { data } = await api.post<{ id: string; name: string; email: string; access_token: string }>("/auth/register", payload);
  return { user: { id: data.id, name: data.name, email: data.email }, token: data.access_token };
}

export async function me(): Promise<User> {
  const { data } = await api.get<User>("/auth/me");
  return data;
}
