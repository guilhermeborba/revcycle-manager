import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: 720, margin: "48px auto", background: "#fff", borderRadius: 12, padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Bem-vindo{user ? `, ${user.name}` : ""}!</p>

      <div style={{ marginTop: 16 }}>
        <button onClick={logout}>Sair</button>
      </div>
    </div>
  );
}
