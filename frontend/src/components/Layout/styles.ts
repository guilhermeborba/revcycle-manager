import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.header`
  background: ${({ theme }) => theme.colors.white};
  padding: 0 2rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: bold;
  position: relative;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleX(0);
    transition: transform 0.2s ease-in-out;
  }

  &.active:after {
    transform: scaleX(1);
  }
`;

export const LogoutButton = styled.button`
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: bold;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.danger};
    }
`;

export const Main = styled.main`
  flex: 1;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

