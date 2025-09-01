import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;
`;

export const Th = styled.th`
  padding: 1.25rem 2rem;
  text-align: left;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Td = styled.td`
  padding: 1.25rem 2rem;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};

  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const BaseButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 0;
  font-weight: bold;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

export const EditButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.gray300};
  color: ${({ theme }) => theme.colors.text};
`;

export const DeleteButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledLink = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  text-decoration: none;
  background: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.text};
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.95);
  }
`;

export const StatusButton = styled(BaseButton)`
  width: 100%;
  background: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  text-align: center;
  line-height: 25px;

  span {
    top: 4px;
    left: 4px;
    position:relative;    
  }
  &:hover {
    filter: brightness(0.95);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;