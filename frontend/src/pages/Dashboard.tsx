import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Dashboard() {
  const { user, logout } = useAuth();
  
  const linkStyle: React.CSSProperties = {
    display: 'block',
    padding: '24px',
    margin: '16px 0',
    background: 'white',
    color: '#333',
    textDecoration: 'none',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  return (
    <div style={{ padding: 24, maxWidth: '800px', margin: 'auto' }}>
      <h1>Dashboard</h1>
      <p style={{ marginBottom: '24px' }}>
        Bem-vindo, <b>{user?.name || user?.email}</b>!
      </p>
      
      <nav>
        <Link to="/revenue-cycles" style={linkStyle}>
          Acessar Gestão de Ciclos de Receita
        </Link>
      </nav>

      <button onClick={logout} style={{ marginTop: 24, padding: "8px 12px" }}>
        Sair
      </button>
    </div>
  );
}