import { useEffect, useRef } from 'react';
import { useMCP } from '../context/MCPContext';
import { MCPActionType } from '../types/mcp';

interface InteractionTrackingOptions {
  elementId: string;
  trackHover?: boolean;
  trackClick?: boolean;
  trackFocus?: boolean;
  trackScroll?: boolean;
  trackInView?: boolean;
}

/**
 * Custom hook for tracking user interactions with elements
 * This hook automatically updates the MCP context with interaction data
 */
export const useInteractionTracking = (options: InteractionTrackingOptions) => {
  const { state, dispatch } = useMCP();
  const elementRef = useRef<HTMLElement | null>(null);
  
  // Set default options
  const {
    elementId,
    trackHover = true,
    trackClick = true,
    trackFocus = false,
    trackScroll = false,
    trackInView = false,
  } = options;
  
  // Track interactions
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Helper function to record an interaction
    const recordInteraction = (action: 'click' | 'hover' | 'scroll' | 'input') => {
      dispatch({
        type: MCPActionType.UPDATE_INTERACTION_CONTEXT,
        payload: {
          lastActive: new Date(),
          interactionCount: state.interaction.interactionCount + 1,
          interactionHistory: [
            ...state.interaction.interactionHistory,
            {
              element: elementId,
              action: action,
              timestamp: new Date(),
            },
          ].slice(-10), // Keep only the last 10 interactions
        },
      });
    };
    
    // Event handlers
    const handleClick = () => {
      if (trackClick) {
        recordInteraction('click');
      }
    };
    
    const handleMouseEnter = () => {
      if (trackHover) {
        recordInteraction('hover');
      }
    };
    
    const handleFocus = () => {
      if (trackFocus) {
        recordInteraction('input');
      }
    };
    
    const handleScroll = () => {
      if (trackScroll) {
        recordInteraction('scroll');
      }
    };
    
    // Set up intersection observer for tracking when element is in view
    let observer: IntersectionObserver | null = null;
    if (trackInView) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              dispatch({
                type: MCPActionType.UPDATE_INTERACTION_CONTEXT,
                payload: {
                  activeSection: elementId,
                },
              });
            }
          });
        },
        { threshold: 0.5 }
      );
      
      observer.observe(element);
    }
    
    // Add event listeners
    element.addEventListener('click', handleClick);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('focus', handleFocus);
    if (trackScroll) {
      element.addEventListener('scroll', handleScroll);
    }
    
    // Clean up
    return () => {
      element.removeEventListener('click', handleClick);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('focus', handleFocus);
      if (trackScroll) {
        element.removeEventListener('scroll', handleScroll);
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, [elementId, trackHover, trackClick, trackFocus, trackScroll, trackInView, dispatch, state.interaction.interactionCount, state.interaction.interactionHistory]);
  
  return {
    ref: elementRef,
    interactionCount: state.interaction.interactionCount,
    isActiveSection: state.interaction.activeSection === elementId,
  };
};

export default useInteractionTracking; 