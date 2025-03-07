import { useMemo } from 'react';
import { useMCP } from '../context/MCPContext';

// Types of content adaptation
type AdaptationType = 'device' | 'theme' | 'interaction' | 'accessibility';

// Content variants for different contexts
interface ContentVariants<T> {
  default: T;
  mobile?: T;
  tablet?: T;
  desktop?: T;
  dark?: T;
  light?: T;
  highInteraction?: T;
  lowInteraction?: T;
  reducedMotion?: T;
  highContrast?: T;
  [key: string]: T | undefined;
}

/**
 * Custom hook for adaptive content based on MCP context
 * This hook returns the appropriate content variant based on the current context
 */
export const useAdaptiveContent = <T>(
  variants: ContentVariants<T>,
  adaptationTypes: AdaptationType[] = ['device', 'theme', 'interaction', 'accessibility']
): T => {
  const { state } = useMCP();
  
  return useMemo(() => {
    // Start with the default variant
    let selectedVariant = variants.default;
    
    // Apply device-based adaptations
    if (adaptationTypes.includes('device')) {
      if (state.device.type === 'mobile' && variants.mobile) {
        selectedVariant = variants.mobile;
      } else if (state.device.type === 'tablet' && variants.tablet) {
        selectedVariant = variants.tablet;
      } else if (state.device.type === 'desktop' && variants.desktop) {
        selectedVariant = variants.desktop;
      }
    }
    
    // Apply theme-based adaptations
    if (adaptationTypes.includes('theme')) {
      if (state.device.darkMode && variants.dark) {
        selectedVariant = variants.dark;
      } else if (!state.device.darkMode && variants.light) {
        selectedVariant = variants.light;
      }
    }
    
    // Apply interaction-based adaptations
    if (adaptationTypes.includes('interaction')) {
      const isHighInteraction = state.interaction.interactionCount > 10;
      if (isHighInteraction && variants.highInteraction) {
        selectedVariant = variants.highInteraction;
      } else if (!isHighInteraction && variants.lowInteraction) {
        selectedVariant = variants.lowInteraction;
      }
    }
    
    // Apply accessibility-based adaptations
    if (adaptationTypes.includes('accessibility')) {
      if (state.user.reducedMotion && variants.reducedMotion) {
        selectedVariant = variants.reducedMotion;
      }
      
      if (state.device.highContrast && variants.highContrast) {
        selectedVariant = variants.highContrast;
      }
    }
    
    return selectedVariant;
  }, [
    variants,
    adaptationTypes,
    state.device.type,
    state.device.darkMode,
    state.device.highContrast,
    state.interaction.interactionCount,
    state.user.reducedMotion,
  ]);
};

/**
 * Helper function to create adaptive text content
 */
export const createAdaptiveText = (
  defaultText: string,
  variants: Partial<ContentVariants<string>>
): ContentVariants<string> => {
  return {
    default: defaultText,
    ...variants,
  };
};

/**
 * Helper function to create adaptive component props
 */
export const createAdaptiveProps = <T extends object>(
  defaultProps: T,
  variants: Partial<ContentVariants<Partial<T>>>
): ContentVariants<T> => {
  const result: ContentVariants<T> = {
    default: defaultProps,
  };
  
  // Merge each variant with the default props
  Object.entries(variants).forEach(([key, value]) => {
    if (value) {
      result[key] = {
        ...defaultProps,
        ...value,
      } as T;
    }
  });
  
  return result;
};

export default useAdaptiveContent; 