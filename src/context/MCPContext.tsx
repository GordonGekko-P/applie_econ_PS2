import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { 
  MCPContext as MCPContextType, 
  MCPAction, 
  MCPActionType,
  UserPreferences,
  DeviceContext,
  InteractionContext
} from '../types/mcp';

// Default values for our context
const defaultUserPreferences: UserPreferences = {
  theme: 'system',
  animationSpeed: 'normal',
  reducedMotion: false,
  fontSize: 'medium',
  colorMode: 'default',
};

const defaultDeviceContext: DeviceContext = {
  type: 'desktop',
  orientation: 'landscape',
  screenSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  highContrast: window.matchMedia('(prefers-contrast: more)').matches,
  connection: navigator.onLine ? 'fast' : 'offline',
};

const defaultInteractionContext: InteractionContext = {
  lastActive: new Date(),
  activeSection: 'home',
  scrollPosition: 0,
  interactionCount: 0,
  interactionHistory: [],
};

// Initial state for our MCP context
const initialMCPContext: MCPContextType = {
  user: defaultUserPreferences,
  device: defaultDeviceContext,
  interaction: defaultInteractionContext,
};

// Create the context
const MCPContext = createContext<{
  state: MCPContextType;
  dispatch: React.Dispatch<MCPAction>;
}>({
  state: initialMCPContext,
  dispatch: () => null,
});

// Reducer function to handle state updates
const mcpReducer = (state: MCPContextType, action: MCPAction): MCPContextType => {
  switch (action.type) {
    case MCPActionType.UPDATE_USER_PREFERENCES:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case MCPActionType.UPDATE_DEVICE_CONTEXT:
      return {
        ...state,
        device: {
          ...state.device,
          ...action.payload,
        },
      };
    case MCPActionType.UPDATE_INTERACTION_CONTEXT:
      return {
        ...state,
        interaction: {
          ...state.interaction,
          ...action.payload,
        },
      };
    case MCPActionType.RESET_CONTEXT:
      return initialMCPContext;
    default:
      return state;
  }
};

// Provider component
export const MCPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(mcpReducer, initialMCPContext);

  // Effect to update device context when window is resized
  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: MCPActionType.UPDATE_DEVICE_CONTEXT,
        payload: {
          screenSize: {
            width: window.innerWidth,
            height: window.innerHeight,
          },
          orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
          type: window.innerWidth < 768 
            ? 'mobile' 
            : window.innerWidth < 1024 
              ? 'tablet' 
              : 'desktop',
        },
      });
    };

    // Effect to update device context when color scheme changes
    const handleColorSchemeChange = (e: MediaQueryListEvent) => {
      dispatch({
        type: MCPActionType.UPDATE_DEVICE_CONTEXT,
        payload: {
          darkMode: e.matches,
        },
      });
    };

    // Effect to update device context when online status changes
    const handleOnlineStatusChange = () => {
      dispatch({
        type: MCPActionType.UPDATE_DEVICE_CONTEXT,
        payload: {
          connection: navigator.onLine ? 'fast' : 'offline',
        },
      });
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleColorSchemeChange);
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    // Clean up event listeners
    return () => {
      window.removeEventListener('resize', handleResize);
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleColorSchemeChange);
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  // Effect to track user interactions
  useEffect(() => {
    const handleScroll = () => {
      dispatch({
        type: MCPActionType.UPDATE_INTERACTION_CONTEXT,
        payload: {
          scrollPosition: window.scrollY,
          lastActive: new Date(),
        },
      });
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const elementId = target.id || target.tagName.toLowerCase();
      
      dispatch({
        type: MCPActionType.UPDATE_INTERACTION_CONTEXT,
        payload: {
          lastActive: new Date(),
          interactionCount: state.interaction.interactionCount + 1,
          interactionHistory: [
            ...state.interaction.interactionHistory,
            {
              element: elementId,
              action: 'click' as const,
              timestamp: new Date(),
            },
          ].slice(-10), // Keep only the last 10 interactions
        },
      });
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);

    // Clean up event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, [state.interaction.interactionCount, state.interaction.interactionHistory]);

  return (
    <MCPContext.Provider value={{ state, dispatch }}>
      {children}
    </MCPContext.Provider>
  );
};

// Custom hook to use the MCP context
export const useMCP = () => useContext(MCPContext);

export default MCPContext; 