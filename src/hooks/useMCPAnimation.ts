import { useMemo } from 'react';
import { useTheme } from '../context/ThemeProvider';

// Animation variants for different elements
type AnimationVariant = 'fade' | 'slide' | 'scale' | 'rotate' | 'pulse';

// Animation directions
type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none';

// Animation options
interface AnimationOptions {
  variant: AnimationVariant;
  direction?: AnimationDirection;
  duration?: 'fast' | 'medium' | 'slow' | 'normal';
  delay?: number;
  repeat?: number | 'infinite';
  staggerChildren?: number;
}

// Default options
const defaultOptions: Partial<AnimationOptions> = {
  direction: 'none',
  duration: 'medium',
  delay: 0,
  repeat: 0,
};

/**
 * Custom hook for MCP-aware animations
 * This hook generates Framer Motion animation variants based on the current theme and user preferences
 */
export const useMCPAnimation = (options: AnimationOptions) => {
  const theme = useTheme();
  
  // Merge options with defaults
  const mergedOptions = { ...defaultOptions, ...options };
  
  // Map 'normal' to 'medium' for backward compatibility
  const normalizedDuration = mergedOptions.duration === 'normal' ? 'medium' : mergedOptions.duration;
  
  // Get animation duration from theme based on user preferences
  const duration = theme.animation.speeds[normalizedDuration || 'medium'];
  
  // Disable animations if user prefers reduced motion
  const shouldAnimate = !theme.animation.reducedMotion;
  
  // Generate animation variants based on options
  const variants = useMemo(() => {
    // If reduced motion is enabled, return minimal animations
    if (!shouldAnimate) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };
    }
    
    // Otherwise, generate full animations based on variant and direction
    switch (mergedOptions.variant) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { 
            opacity: 1,
            transition: { 
              duration: parseFloat(duration),
              delay: mergedOptions.delay,
            },
          },
          exit: { 
            opacity: 0,
            transition: { 
              duration: parseFloat(duration) * 0.75,
            },
          },
        };
        
      case 'slide':
        const getDirectionOffset = () => {
          switch (mergedOptions.direction) {
            case 'up': return { y: 50 };
            case 'down': return { y: -50 };
            case 'left': return { x: 50 };
            case 'right': return { x: -50 };
            default: return {};
          }
        };
        
        return {
          initial: { opacity: 0, ...getDirectionOffset() },
          animate: { 
            opacity: 1, 
            x: 0, 
            y: 0,
            transition: { 
              duration: parseFloat(duration),
              delay: mergedOptions.delay,
            },
          },
          exit: { 
            opacity: 0, 
            ...getDirectionOffset(),
            transition: { 
              duration: parseFloat(duration) * 0.75,
            },
          },
        };
        
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: parseFloat(duration),
              delay: mergedOptions.delay,
            },
          },
          exit: { 
            opacity: 0, 
            scale: 0.8,
            transition: { 
              duration: parseFloat(duration) * 0.75,
            },
          },
        };
        
      case 'rotate':
        return {
          initial: { opacity: 0, rotate: -10 },
          animate: { 
            opacity: 1, 
            rotate: 0,
            transition: { 
              duration: parseFloat(duration),
              delay: mergedOptions.delay,
            },
          },
          exit: { 
            opacity: 0, 
            rotate: 10,
            transition: { 
              duration: parseFloat(duration) * 0.75,
            },
          },
        };
        
      case 'pulse':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { 
            opacity: 1, 
            scale: [0.8, 1.05, 1],
            transition: { 
              duration: parseFloat(duration) * 1.5,
              delay: mergedOptions.delay,
              times: [0, 0.7, 1],
            },
          },
          exit: { 
            opacity: 0, 
            scale: 0.8,
            transition: { 
              duration: parseFloat(duration) * 0.75,
            },
          },
        };
        
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  }, [mergedOptions.variant, mergedOptions.direction, mergedOptions.delay, duration, shouldAnimate]);
  
  // Add staggering for children if specified
  const transition = useMemo(() => {
    if (mergedOptions.staggerChildren) {
      return {
        staggerChildren: mergedOptions.staggerChildren,
      };
    }
    return {};
  }, [mergedOptions.staggerChildren]);
  
  // Return animation variants and whether animations should be enabled
  return {
    variants,
    transition,
    shouldAnimate,
    duration,
  };
};

export default useMCPAnimation; 