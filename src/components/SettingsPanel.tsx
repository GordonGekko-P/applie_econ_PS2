import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useMCP } from '../context/MCPContext';
import { MCPActionType, UserPreferences } from '../types/mcp';
import { Card, Heading, Button, Flex, Text } from './styled';
import { useMCPAnimation } from '../hooks/useMCPAnimation';

// Styled components specific to this component
const SettingsCard = styled(Card)`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 300px;
  max-width: calc(100vw - 40px);
  z-index: 100;
  overflow: hidden;
`;

const SettingsHeader = styled(Flex)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SettingRow = styled(Flex)`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SettingLabel = styled(Text)`
  margin: 0;
  font-weight: 500;
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  background-color: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${({ theme }) => theme.colors.onBackground};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useMCP();
  const animation = useMCPAnimation({
    variant: 'slide',
    direction: 'right',
    duration: 'fast',
  });
  
  // Handler for updating user preferences
  const handlePreferenceChange = (key: keyof UserPreferences, value: any) => {
    dispatch({
      type: MCPActionType.UPDATE_USER_PREFERENCES,
      payload: {
        [key]: value,
      },
    });
  };
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animation.variants}
    >
      <SettingsCard>
        <SettingsHeader justify="space-between" align="center">
          <Heading level={3}>Settings</Heading>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </SettingsHeader>
        
        <SettingRow justify="space-between" align="center">
          <SettingLabel>Theme</SettingLabel>
          <Select
            value={state.user.theme}
            onChange={(e) => handlePreferenceChange('theme', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </Select>
        </SettingRow>
        
        <SettingRow justify="space-between" align="center">
          <SettingLabel>Animation Speed</SettingLabel>
          <Select
            value={state.user.animationSpeed}
            onChange={(e) => handlePreferenceChange('animationSpeed', e.target.value)}
          >
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
            <option value="fast">Fast</option>
          </Select>
        </SettingRow>
        
        <SettingRow justify="space-between" align="center">
          <SettingLabel>Font Size</SettingLabel>
          <Select
            value={state.user.fontSize}
            onChange={(e) => handlePreferenceChange('fontSize', e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </Select>
        </SettingRow>
        
        <SettingRow justify="space-between" align="center">
          <SettingLabel>Color Mode</SettingLabel>
          <Select
            value={state.user.colorMode}
            onChange={(e) => handlePreferenceChange('colorMode', e.target.value)}
          >
            <option value="default">Default</option>
            <option value="protanopia">Protanopia</option>
            <option value="deuteranopia">Deuteranopia</option>
            <option value="tritanopia">Tritanopia</option>
          </Select>
        </SettingRow>
        
        <SettingRow align="center">
          <Checkbox
            checked={state.user.reducedMotion}
            onChange={(e) => handlePreferenceChange('reducedMotion', e.target.checked)}
            id="reduced-motion"
          />
          <SettingLabel as="label" htmlFor="reduced-motion">Reduce Motion</SettingLabel>
        </SettingRow>
        
        <Flex justify="center">
          <Button
            onClick={() => {
              dispatch({ type: MCPActionType.RESET_CONTEXT });
              onClose();
            }}
          >
            Reset to Defaults
          </Button>
        </Flex>
      </SettingsCard>
    </motion.div>
  );
};

export default SettingsPanel; 