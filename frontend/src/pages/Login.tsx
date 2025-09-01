import { useState } from 'react';
import type { FormEvent } from 'react';
import axios, { type AxiosError } from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom'; 
import { AuthContainer } from './AuthStyles';

function getErrorMessage(err: unknown, fallback = 'Falha no login. Verifique suas credenciais.') {
  if (axios.isAxiosError(err)) {
    const aerr = err as AxiosError<{ message?: string; error?: string }>;
    if (aerr.response?.data?.message) {
      if (Array.isArray(aerr.response.data.message)) {
        return aerr.response.data.message.join('; ');
      }
      return aerr.response.data.message;
    }
    return aerr.response?.data?.error ?? aerr.message ?? fallback;
  }
  if (err instanceof Error) return err.message ?? fallback;
  return fallback;
}

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const from = location.state?.from?.pathname || '/revenue-cycles';

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password); 
      navigate(from, { replace: true }); 
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContainer>
      <h1>Gestão do Ciclo de Receita</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@exemplo.com"
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p>
        Não tem conta? <Link to="/register">Cadastrar</Link>
      </p>
    </AuthContainer>
  );
}