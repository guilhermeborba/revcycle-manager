import { useState } from "react";
import type { FormEvent } from "react";
import axios, { type AxiosError } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { AuthContainer } from "./AuthStyles";

function getErrorMessage(err: unknown, fallback = "Falha no cadastro. Verifique os dados.") {
  if (axios.isAxiosError(err)) {
    const aerr = err as AxiosError<{ message?: string | string[]; error?: string }>;
    const msg = aerr.response?.data?.message ?? aerr.response?.data?.error ?? aerr.message;
    if (Array.isArray(msg)) return msg.join("; ");
    return msg ?? fallback;
  }
  if (err instanceof Error) return err.message ?? fallback;
  return fallback;
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);
      await register(name, email, password);
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContainer>
      <h1>Cadastre-se</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Seu nome</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@exemplo.com"
            autoComplete="email"
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
            autoComplete="new-password"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </AuthContainer>
  );
}
