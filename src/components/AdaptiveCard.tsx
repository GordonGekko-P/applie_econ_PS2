import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useMCP } from '../context/MCPContext';
import { useTheme } from '../context/ThemeProvider';
import { useMCPAnimation } from '../hooks/useMCPAnimation';
import { useInteractionTracking } from '../hooks/useInteractionTracking';
import { useAdaptiveContent, createAdaptiveText } from '../hooks/useAdaptiveContent';
import { Card, Heading, Text, Button, Flex } from './styled';

// Styled components specific to this component
const StyledCard = styled(Card)<{ isActive: boolean; interactionCount: number }>`
  transition: all ${({ theme }) => theme.animation.speeds.medium} ease;
  transform: ${({ isActive }) => isActive ? 'scale(1.02)' : 'scale(1)'};
  border: ${({ theme, isActive, interactionCount }) => 
    isActive 
      ? `2px solid ${theme.colors.primary}` 
      : interactionCount > 5 
        ? `2px solid ${theme.colors.secondary}` 
        : 'none'
  };
  cursor: pointer;
`;

const CardContent = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.sm};
`;

const CardImage = styled.img<{ reducedMotion: boolean }>`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 6px;
  transition: transform ${({ theme }) => theme.animation.speeds.medium} ease;
  
  ${({ reducedMotion }) => !reducedMotion && `
    &:hover {
      transform: scale(1.05);
    }
  `}
`;

const CardFooter = styled(Flex)`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`;

interface AdaptiveCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags?: string[];
}

const AdaptiveCard: React.FC<AdaptiveCardProps> = ({
  id,
  title,
  description,
  image,
  tags = [],
}) => {
  const [expanded, setExpanded] = useState(false);
  const { state } = useMCP();
  const theme = useTheme();
  
  // Track interactions with this card
  const { ref, interactionCount, isActiveSection } = useInteractionTracking({
    elementId: `card-${id}`,
    trackHover: true,
    trackClick: true,
    trackInView: true,
  });
  
  // Get animation based on user preferences
  const animation = useMCPAnimation({
    variant: expanded ? 'scale' : 'fade',
    duration: state.user.animationSpeed,
  });
  
  // Adaptive content based on context
  const adaptiveTitle = useAdaptiveContent(
    createAdaptiveText(title, {
      mobile: title.length > 20 ? `${title.substring(0, 20)}...` : title,
      highInteraction: `✨ ${title}`,
    })
  );
  
  const adaptiveDescription = useAdaptiveContent(
    createAdaptiveText(description, {
      mobile: description.length > 80 ? `${description.substring(0, 80)}...` : description,
      tablet: description.length > 120 ? `${description.substring(0, 120)}...` : description,
      highInteraction: expanded ? description : `${description.substring(0, 100)}... (tap to read more)`,
    })
  );
  
  // Determine if we should show tags based on interaction count
  const shouldShowTags = interactionCount > 2 || expanded;
  
  // Handle card click
  const handleCardClick = () => {
    setExpanded(!expanded);
  };
  
  return (
    <StyledCard 
      ref={ref as React.RefObject<HTMLDivElement>}
      isActive={isActiveSection}
      interactionCount={interactionCount}
      onClick={handleCardClick}
    >
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animation.variants}
      >
        <CardImage 
          src={image} 
          alt={title}
          reducedMotion={state.user.reducedMotion}
        />
        
        <CardContent>
          <Heading level={3}>{adaptiveTitle}</Heading>
          <Text>{adaptiveDescription}</Text>
          
          {shouldShowTags && tags.length > 0 && (
            <Flex gap="xs" style={{ flexWrap: 'wrap' }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.onPrimary,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                  }}
                >
                  {tag}
                </span>
              ))}
            </Flex>
          )}
          
          <CardFooter justify="space-between">
            <Text size="small" style={{ margin: 0 }}>
              {interactionCount > 0 
                ? `Interactions: ${interactionCount}` 
                : 'Interact with me!'}
            </Text>
            
            {expanded && (
              <Button 
                variant="outline" 
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                }}
              >
                Collapse
              </Button>
            )}
          </CardFooter>
        </CardContent>
      </motion.div>
    </StyledCard>
  );
};

export default AdaptiveCard; 