import { UserPreferences, DeviceContext } from '../types/mcp';

// Define our color palettes
const lightColors = {
  background: '#ffffff',
  surface: '#f5f5f5',
  primary: '#6200ee',
  primaryVariant: '#3700b3',
  secondary: '#03dac6',
  secondaryVariant: '#018786',
  error: '#b00020',
  onBackground: '#000000',
  onSurface: '#000000',
  onPrimary: '#ffffff',
  onSecondary: '#000000',
  onError: '#ffffff',
};

const darkColors = {
  background: '#121212',
  surface: '#1e1e1e',
  primary: '#bb86fc',
  primaryVariant: '#3700b3',
  secondary: '#03dac6',
  secondaryVariant: '#03dac6',
  error: '#cf6679',
  onBackground: '#ffffff',
  onSurface: '#ffffff',
  onPrimary: '#000000',
  onSecondary: '#000000',
  onError: '#000000',
};

// Color adjustments for color blindness modes
const protanopiaAdjustments = {
  primary: '#a48ee0',
  secondary: '#70c4c4',
};

const deuteranopiaAdjustments = {
  primary: '#9e94e8',
  secondary: '#7ac7c7',
};

const tritanopiaAdjustments = {
  primary: '#c77dff',
  secondary: '#00b3b3',
};

// Font size configurations
const fontSizes = {
  small: {
    h1: '1.75rem',
    h2: '1.5rem',
    h3: '1.25rem',
    body: '0.875rem',
    caption: '0.75rem',
  },
  medium: {
    h1: '2rem',
    h2: '1.75rem',
    h3: '1.5rem',
    body: '1rem',
    caption: '0.875rem',
  },
  large: {
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.75rem',
    body: '1.125rem',
    caption: '1rem',
  },
};

// Animation speed configurations
const animationSpeeds = {
  slow: {
    fast: '0.5s',
    medium: '0.75s',
    slow: '1s',
  },
  normal: {
    fast: '0.3s',
    medium: '0.5s',
    slow: '0.7s',
  },
  fast: {
    fast: '0.15s',
    medium: '0.25s',
    slow: '0.4s',
  },
};

// Spacing configurations
const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
};

// Breakpoints for responsive design
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
};

// Function to generate a theme based on user preferences and device context
export const generateTheme = (userPreferences: UserPreferences, deviceContext: DeviceContext) => {
  // Determine if we should use dark mode
  const useDarkMode = 
    userPreferences.theme === 'dark' || 
    (userPreferences.theme === 'system' && deviceContext.darkMode);
  
  // Get the base color palette
  const baseColors = useDarkMode ? darkColors : lightColors;
  
  // Apply color mode adjustments if needed
  let adjustedColors = { ...baseColors };
  if (userPreferences.colorMode === 'protanopia') {
    adjustedColors = { ...adjustedColors, ...protanopiaAdjustments };
  } else if (userPreferences.colorMode === 'deuteranopia') {
    adjustedColors = { ...adjustedColors, ...deuteranopiaAdjustments };
  } else if (userPreferences.colorMode === 'tritanopia') {
    adjustedColors = { ...adjustedColors, ...tritanopiaAdjustments };
  }
  
  // Get font sizes based on user preference
  const fontSize = fontSizes[userPreferences.fontSize];
  
  // Get animation speeds based on user preference
  const animationSpeed = animationSpeeds[userPreferences.animationSpeed];
  
  // Return the complete theme
  return {
    colors: adjustedColors,
    fonts: {
      sizes: fontSize,
      family: {
        primary: "'Inter', sans-serif",
        code: "'Fira Code', monospace",
      },
    },
    animation: {
      speeds: animationSpeed,
      reducedMotion: userPreferences.reducedMotion,
    },
    spacing,
    breakpoints,
    isDark: useDarkMode,
    highContrast: deviceContext.highContrast,
    deviceType: deviceContext.type,
  };
};

// Type definition for our theme
export type Theme = ReturnType<typeof generateTheme>; 