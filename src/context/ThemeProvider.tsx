import React, { createContext, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useMCP } from './MCPContext';
import { generateTheme, Theme } from '../styles/theme';

// Create a context for the theme
const ThemeContext = createContext<Theme | undefined>(undefined);

// Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useMCP();
  
  // Generate the theme based on MCP context
  const theme = generateTheme(state.user, state.device);
  
  return (
    <ThemeContext.Provider value={theme}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => {
  const theme = useContext(ThemeContext);
  
  if (theme === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return theme;
};

export default ThemeProvider; 