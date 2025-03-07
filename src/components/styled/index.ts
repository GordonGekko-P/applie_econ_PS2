import styled from 'styled-components';
import { motion } from 'framer-motion';

// Container components
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const FlexContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const GridContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(6, 1fr);
    gap: ${({ theme }) => theme.spacing.sm};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

// Section components
export const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

export const Hero = styled(Section)`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryVariant} 100%)`};
  color: ${({ theme }) => theme.colors.onPrimary};
`;

// Card components
export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.onSurface};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform ${({ theme }) => theme.animation.speeds.medium} ease, 
              box-shadow ${({ theme }) => theme.animation.speeds.medium} ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const AnimatedCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.onSurface};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Button components
export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.animation.speeds.fast} ease,
              transform ${({ theme }) => theme.animation.speeds.fast} ease;
  
  ${({ theme, variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.onPrimary};
          border: none;
          
          &:hover {
            background-color: ${theme.colors.primaryVariant};
            transform: translateY(-2px);
          }
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.onSecondary};
          border: none;
          
          &:hover {
            background-color: ${theme.colors.secondaryVariant};
            transform: translateY(-2px);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};
          
          &:hover {
            background-color: rgba(98, 0, 238, 0.1);
            transform: translateY(-2px);
          }
        `;
      default:
        return '';
    }
  }}
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const AnimatedButton = styled(motion.button)<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  
  ${({ theme, variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.onPrimary};
          border: none;
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.onSecondary};
          border: none;
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};
        `;
      default:
        return '';
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Typography components
export const Heading = styled.h1<{ level?: 1 | 2 | 3 | 4 | 5 | 6 }>`
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  font-weight: 700;
  line-height: 1.2;
  
  ${({ theme, level = 1 }) => {
    switch (level) {
      case 1:
        return `font-size: ${theme.fonts.sizes.h1};`;
      case 2:
        return `font-size: ${theme.fonts.sizes.h2};`;
      case 3:
        return `font-size: ${theme.fonts.sizes.h3};`;
      default:
        return `font-size: ${theme.fonts.sizes.body};`;
    }
  }}
`;

export const Text = styled.p<{ size?: 'small' | 'medium' | 'large' }>`
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  line-height: 1.5;
  
  ${({ theme, size = 'medium' }) => {
    switch (size) {
      case 'small':
        return `font-size: ${theme.fonts.sizes.caption};`;
      case 'large':
        return `font-size: calc(${theme.fonts.sizes.body} * 1.2);`;
      default:
        return `font-size: ${theme.fonts.sizes.body};`;
    }
  }}
`;

// Input components
export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${({ theme }) => theme.colors.onBackground};
  transition: border-color ${({ theme }) => theme.animation.speeds.fast} ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

// Layout components
export const Flex = styled.div<{ 
  direction?: 'row' | 'column',
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch',
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  align-items: ${({ align = 'stretch' }) => align};
  gap: ${({ theme, gap = 'md' }) => theme.spacing[gap]};
`;

export const Grid = styled.div<{
  columns?: number,
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}>`
  display: grid;
  grid-template-columns: repeat(${({ columns = 1 }) => columns}, 1fr);
  gap: ${({ theme, gap = 'md' }) => theme.spacing[gap]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(${({ columns = 1 }) => Math.min(columns, 2)}, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

// Animation wrapper
export const AnimationWrapper = styled(motion.div)`
  width: 100%;
`; 