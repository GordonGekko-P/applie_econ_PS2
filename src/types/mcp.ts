/**
 * Model Context Protocol (MCP) Types
 * 
 * These types define the structure of our MCP implementation.
 */

// User preference settings
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  animationSpeed: 'slow' | 'normal' | 'fast';
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
  colorMode: 'default' | 'protanopia' | 'deuteranopia' | 'tritanopia';
}

// Device context information
export interface DeviceContext {
  type: 'mobile' | 'tablet' | 'desktop';
  orientation: 'portrait' | 'landscape';
  screenSize: {
    width: number;
    height: number;
  };
  darkMode: boolean;
  highContrast: boolean;
  connection: 'offline' | 'slow' | 'fast';
}

// User interaction patterns
export interface InteractionContext {
  lastActive: Date;
  activeSection: string;
  scrollPosition: number;
  interactionCount: number;
  interactionHistory: Array<{
    element: string;
    action: 'click' | 'hover' | 'scroll' | 'input';
    timestamp: Date;
  }>;
}

// The complete MCP context
export interface MCPContext {
  user: UserPreferences;
  device: DeviceContext;
  interaction: InteractionContext;
}

// MCP action types
export enum MCPActionType {
  UPDATE_USER_PREFERENCES = 'UPDATE_USER_PREFERENCES',
  UPDATE_DEVICE_CONTEXT = 'UPDATE_DEVICE_CONTEXT',
  UPDATE_INTERACTION_CONTEXT = 'UPDATE_INTERACTION_CONTEXT',
  RESET_CONTEXT = 'RESET_CONTEXT',
}

// MCP action interfaces
export interface UpdateUserPreferencesAction {
  type: MCPActionType.UPDATE_USER_PREFERENCES;
  payload: Partial<UserPreferences>;
}

export interface UpdateDeviceContextAction {
  type: MCPActionType.UPDATE_DEVICE_CONTEXT;
  payload: Partial<DeviceContext>;
}

export interface UpdateInteractionContextAction {
  type: MCPActionType.UPDATE_INTERACTION_CONTEXT;
  payload: Partial<InteractionContext>;
}

export interface ResetContextAction {
  type: MCPActionType.RESET_CONTEXT;
}

// Union type of all possible MCP actions
export type MCPAction =
  | UpdateUserPreferencesAction
  | UpdateDeviceContextAction
  | UpdateInteractionContextAction
  | ResetContextAction; 