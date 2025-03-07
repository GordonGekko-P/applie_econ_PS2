import React, { useState } from 'react';
import styled from 'styled-components';
import { MCPProvider } from './context/MCPContext';
import { ThemeProvider } from './context/ThemeProvider';
import EconometricsSolutions from './components/EconometricsSolutions';
import PalantirEconometricsSolutions from './components/PalantirEconometricsSolutions';
import PelgoraEconometricsSolutions from './components/PelgoraEconometricsSolutions';

// Styled components
const AppWrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  color: #4a9fff;
  font-size: 1.5rem;
  font-weight: 500;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavItem = styled.div`
  position: relative;
  color: white;
  cursor: pointer;
  padding: 0.5rem 1rem;
  
  &:hover {
    color: #4a9fff;
  }
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0.5rem;
  display: ${props => props.isOpen ? 'block' : 'none'};
  min-width: 200px;
`;

const DropdownItem = styled.div<{ active?: boolean }>`
  color: ${props => props.active ? '#4a9fff' : 'white'};
  padding: 0.5rem 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(74, 159, 255, 0.1);
  }
`;

const MainContent = styled.main`
  padding-top: 80px; // Account for fixed header
`;

type StyleView = 'apple' | 'palantir' | 'pelgora';

const AppContent: React.FC = () => {
  const [styleView, setStyleView] = useState<StyleView>('apple');
  const [isStyleMenuOpen, setIsStyleMenuOpen] = useState(false);
  
  const renderEconometricsSolution = () => {
    switch (styleView) {
      case 'apple':
        return <EconometricsSolutions />;
      case 'palantir':
        return <PalantirEconometricsSolutions />;
      case 'pelgora':
        return <PelgoraEconometricsSolutions />;
      default:
        return <EconometricsSolutions />;
    }
  };
  
  return (
    <AppWrapper>
      <Header>
        <Logo>Econometrics Solutions</Logo>
        <Nav>
          <NavItem onClick={() => setIsStyleMenuOpen(!isStyleMenuOpen)}>
            Style Options
            <Dropdown isOpen={isStyleMenuOpen}>
              <DropdownItem 
                active={styleView === 'apple'}
                onClick={() => setStyleView('apple')}
              >
                Apple Style
              </DropdownItem>
              <DropdownItem 
                active={styleView === 'palantir'}
                onClick={() => setStyleView('palantir')}
              >
                Palantir Style
              </DropdownItem>
              <DropdownItem 
                active={styleView === 'pelgora'}
                onClick={() => setStyleView('pelgora')}
              >
                Pelgora Style
              </DropdownItem>
            </Dropdown>
          </NavItem>
        </Nav>
      </Header>
      <MainContent>
        {renderEconometricsSolution()}
      </MainContent>
    </AppWrapper>
  );
};

const App: React.FC = () => {
  return (
    <MCPProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </MCPProvider>
  );
};

export default App; 