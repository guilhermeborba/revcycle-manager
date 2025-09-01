import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import * as S from './styles';

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <S.Wrapper>
      <S.Header>
        <S.Nav>
          <h1>Gestão do Ciclo de Receita</h1>
        </S.Nav>
        
        <S.UserInfo>
          <S.UserName>Olá, {user?.name || user?.email}!</S.UserName>
          <S.LogoutButton onClick={logout}>Sair</S.LogoutButton>
        </S.UserInfo>
      </S.Header>

      <S.Main>
        <Outlet />
      </S.Main>
    </S.Wrapper>
  );
}